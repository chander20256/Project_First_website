// LOCATION: src/components/admin/tasks/AdminAddTaskForm.jsx

import { useState, useEffect, useRef } from "react";
import { Save, X, Link, Calendar, Upload, Clock } from "lucide-react";

const BASE = "http://localhost:5000";

const CATEGORIES = [
  { value: "ptc",        label: "PTC (Pay To Click)",  icon: "💰", desc: "User visits your URL and stays for set time" },
  { value: "captcha",    label: "Captcha",              icon: "🤖", desc: "User solves a captcha to earn reward" },
  { value: "lucky-draw", label: "Lucky Draw",           icon: "🎰", desc: "User participates in a lucky draw spin" },
  { value: "short-link", label: "Short Link",           icon: "🔗", desc: "User visits a short link and waits" },
];

const Field = ({ label, required, hint, error, children }) => (
  <div>
    <label className="mb-1 block text-xs font-semibold text-gray-600">
      {label} {required && <span className="text-orange-500">*</span>}
    </label>
    {hint && <p className="mb-1.5 text-[11px] text-gray-400 leading-relaxed">{hint}</p>}
    {children}
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

const inputCls = (err) =>
  `w-full rounded-lg border ${err ? "border-red-400" : "border-gray-200"} bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-orange-300 focus:ring-1 focus:ring-orange-100 transition-colors`;

const EMPTY = { title: "", description: "", platform: "", reward: "", timeMinutes: "30", link: "", expiresAt: "", thumbnail: "" };

const AddTaskForm = ({ editTask, onSaved, onCancel }) => {
  const [form,    setForm]    = useState(EMPTY);
  const [errors,  setErrors]  = useState({});
  const [saving,  setSaving]  = useState(false);
  const [toast,   setToast]   = useState(null);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  useEffect(() => {
    if (editTask) {
      setForm({
        title:       editTask.title        || "",
        description: editTask.description  || "",
        platform:    editTask.platform     || "",
        reward:      editTask.reward       || "",
        timeMinutes: editTask.timeMinutes  != null ? String(editTask.timeMinutes) : "30",
        link:        editTask.link         || "",
        expiresAt:   editTask.expiresAt ? new Date(editTask.expiresAt).toISOString().slice(0, 16) : "",
        thumbnail:   editTask.thumbnail    || "",
      });
      setPreview(editTask.thumbnail || null);
    } else {
      setForm(EMPTY);
      setPreview(null);
    }
    setErrors({});
  }, [editTask]);

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setToast({ msg: "Image must be under 5 MB", type: "error" });
      setTimeout(() => setToast(null), 3000);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setForm((p) => ({ ...p, thumbnail: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim())    e.title    = "Title is required";
    if (!form.platform)        e.platform = "Category is required";
    if (!form.reward || isNaN(form.reward) || parseFloat(form.reward) <= 0) e.reward = "Valid reward > 0 required";
    if (["ptc", "short-link"].includes(form.platform) && !form.link.trim()) e.link = "Link is required for this category";
    if (!form.timeMinutes || isNaN(form.timeMinutes) || parseInt(form.timeMinutes) < 0) e.timeMinutes = "Enter valid seconds (0 = no limit)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSaving(true);
    const payload = {
      title: form.title.trim(), description: form.description.trim(),
      platform: form.platform, reward: parseFloat(form.reward),
      timeMinutes: parseInt(form.timeMinutes) || 0,
      link: form.link.trim(),
      expiresAt: form.expiresAt ? new Date(form.expiresAt).toISOString() : null,
      thumbnail: form.thumbnail,
    };
    try {
      const url    = editTask ? `${BASE}/api/admin/tasks/${editTask._id}` : `${BASE}/api/admin/tasks`;
      const method = editTask ? "PUT" : "POST";
      const res    = await fetch(url, { method, headers: getAuthHeaders(), body: JSON.stringify(payload) });
      const data   = await res.json();
      if (!res.ok) throw new Error(data.message);
      setToast({ msg: editTask ? "Task updated!" : "Task created!", type: "success" });
      setTimeout(() => setToast(null), 3000);
      if (!editTask) { setForm(EMPTY); setPreview(null); }
      onSaved?.();
    } catch (err) {
      setToast({ msg: err.message || "Save failed", type: "error" });
      setTimeout(() => setToast(null), 3000);
    } finally { setSaving(false); }
  };

  const selectedCat = CATEGORIES.find((c) => c.value === form.platform);
  const needsLink   = ["ptc", "short-link"].includes(form.platform);

  return (
    <>
      {toast && (
        <div className={`fixed top-4 right-4 z-50 rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-lg ${toast.type === "error" ? "bg-red-500" : "bg-green-500"}`}>
          {toast.msg}
        </div>
      )}

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">{editTask ? "Edit Task" : "Create New Task"}</h2>
            <p className="text-orange-100 text-xs mt-0.5">Fill in all details below</p>
          </div>
          {editTask && onCancel && (
            <button onClick={onCancel} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors">
              <X size={15} />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">

          {/* ── Category select ── */}
          <Field label="Task Category" required error={errors.platform}>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, platform: cat.value }))}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 text-center transition-all duration-150 ${
                    form.platform === cat.value
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 bg-gray-50 hover:border-orange-200"
                  }`}
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <span className={`text-[11px] font-bold leading-tight ${form.platform === cat.value ? "text-orange-600" : "text-gray-600"}`}>
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>
            {selectedCat && (
              <p className="mt-2 text-[11px] text-gray-400 flex items-center gap-1">
                <span>{selectedCat.icon}</span> {selectedCat.desc}
              </p>
            )}
          </Field>

          {/* ── Thumbnail ── */}
          <Field label="Task Banner Image">
            <input ref={fileRef} type="file" accept="image/*" id="task-thumbnail" className="hidden" onChange={handleImageChange} />
            {preview ? (
              <div className="relative rounded-xl overflow-hidden border border-gray-200">
                <img src={preview} alt="preview" className="w-full h-36 object-cover" />
                <button type="button" onClick={() => { setPreview(null); setForm((p) => ({ ...p, thumbnail: "" })); }}
                  className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 shadow">
                  <X size={13} />
                </button>
                <label htmlFor="task-thumbnail" className="absolute bottom-2 right-2 flex cursor-pointer items-center gap-1.5 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-semibold text-white hover:bg-black/80 transition-colors">
                  <Upload size={11} /> Change
                </label>
              </div>
            ) : (
              <label htmlFor="task-thumbnail" className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 py-7 hover:border-orange-300 hover:bg-orange-50/30 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
                  <Upload size={18} className="text-orange-500" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-600">Click to upload image</p>
                  <p className="text-xs text-gray-400 mt-0.5">PNG, JPG up to 5 MB</p>
                </div>
              </label>
            )}
          </Field>

          {/* ── Title ── */}
          <Field label="Task Title" required error={errors.title}>
            <input value={form.title} onChange={set("title")} placeholder="e.g., Visit our sponsor website" className={inputCls(errors.title)} />
          </Field>

          {/* ── Description ── */}
          <Field label="Description">
            <textarea value={form.description} onChange={set("description")} rows={2} placeholder="What the user needs to do" className={inputCls(false)} />
          </Field>

          {/* ── Reward + Time ── */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Reward (TKN)" required error={errors.reward}>
              <input type="number" min="1" step="1" value={form.reward} onChange={set("reward")} placeholder="50" className={inputCls(errors.reward)} />
            </Field>
            <Field
              label={form.platform === "ptc" ? "View Time (seconds)" : "Time Limit (minutes)"}
              required
              error={errors.timeMinutes}
              hint={form.platform === "ptc" ? "How long user must stay on your tab" : "0 = no limit"}
            >
              <div className="relative">
                <Clock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="number" min="0" step="1" value={form.timeMinutes} onChange={set("timeMinutes")} placeholder={form.platform === "ptc" ? "30" : "1"} className={`${inputCls(errors.timeMinutes)} pl-8`} />
              </div>
            </Field>
          </div>

          {/* ── Link (PTC / Short Link) ── */}
          {(needsLink || form.link) && (
            <Field label="External URL" required={needsLink} error={errors.link} hint={form.platform === "ptc" ? "This site opens in a new tab when user starts the task" : "Short link destination"}>
              <div className="relative">
                <Link size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={form.link} onChange={set("link")} placeholder="https://…" className={`${inputCls(errors.link)} pl-8`} />
              </div>
            </Field>
          )}

          {/* ── Expiry ── */}
          <Field label="Expiry Date & Time" hint="Task auto-hides from users after this date">
            <div className="relative">
              <Calendar size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="datetime-local" value={form.expiresAt} onChange={set("expiresAt")} className={`${inputCls(false)} pl-8`} />
            </div>
          </Field>

          <div className="flex gap-2 pt-2">
            {editTask && onCancel && (
              <button type="button" onClick={onCancel} className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            )}
            <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-orange-500 py-2.5 text-sm font-bold text-white hover:bg-orange-600 disabled:opacity-60 transition-colors">
              <Save size={14} className={saving ? "animate-pulse" : ""} />
              {saving ? "Saving…" : editTask ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTaskForm;