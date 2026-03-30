// LOCATION: src/components/admin/tasks/AdminAddTaskForm.jsx

import { useState, useEffect, useRef } from "react";
import { Save, X, Link, Calendar, Upload, Clock } from "lucide-react";

const BASE = "http://localhost:5000";

const Field = ({ label, required, hint, error, children }) => (
  <div>
    <label className="mb-1 block text-xs font-semibold text-gray-600">
      {label} {required && <span className="text-orange-500">*</span>}
    </label>
    {hint && <p className="mb-1 text-[11px] text-gray-400">{hint}</p>}
    {children}
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

const inputCls = (err) =>
  `w-full rounded-lg border ${err ? "border-red-400" : "border-gray-200"} bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-orange-300 focus:ring-1 focus:ring-orange-100 transition-colors`;

const EMPTY = {
  title: "", description: "", platform: "", reward: "",
  timeMinutes: "1", link: "", expiresAt: "", thumbnail: "",
};

const AddTaskForm = ({ editTask, onSaved, onCancel }) => {
  const [form,    setForm]    = useState(EMPTY);
  const [errors,  setErrors]  = useState({});
  const [saving,  setSaving]  = useState(false);
  const [toast,   setToast]   = useState(null);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);

  // Populate form when editing
  useEffect(() => {
    if (editTask) {
      setForm({
        title:       editTask.title        || "",
        description: editTask.description  || "",
        platform:    editTask.platform     || "",
        reward:      editTask.reward       || "",
        timeMinutes: editTask.timeMinutes  != null ? String(editTask.timeMinutes) : "1",
        link:        editTask.link         || "",
        expiresAt:   editTask.expiresAt
          ? new Date(editTask.expiresAt).toISOString().slice(0, 16)
          : "",
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

  // ── Image upload ─────────────────────────────────────────────────────────
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

  const clearImage = () => {
    setPreview(null);
    setForm((p) => ({ ...p, thumbnail: "" }));
    if (fileRef.current) fileRef.current.value = "";
  };

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.title.trim())    e.title    = "Title is required";
    if (!form.platform.trim()) e.platform = "Platform is required";
    if (!form.reward || isNaN(form.reward) || parseFloat(form.reward) <= 0)
                               e.reward   = "Enter a valid reward > 0";
    if (!form.timeMinutes || isNaN(form.timeMinutes) || parseInt(form.timeMinutes) < 0)
                               e.timeMinutes = "Enter a valid time (0 = no limit)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSaving(true);

    const payload = {
      title:       form.title.trim(),
      description: form.description.trim(),
      platform:    form.platform.trim(),
      reward:      parseFloat(form.reward),
      timeMinutes: parseInt(form.timeMinutes) || 0,
      link:        form.link.trim(),
      expiresAt:   form.expiresAt ? new Date(form.expiresAt).toISOString() : null,
      thumbnail:   form.thumbnail,
    };

    try {
      const url    = editTask ? `${BASE}/api/admin/tasks/${editTask._id}` : `${BASE}/api/admin/tasks`;
      const method = editTask ? "PUT" : "POST";
      const res    = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setToast({ msg: editTask ? "Task updated!" : "Task created!", type: "success" });
      setTimeout(() => setToast(null), 3000);

      if (!editTask) { setForm(EMPTY); setPreview(null); }
      onSaved?.();
    } catch (err) {
      setToast({ msg: err.message || "Save failed", type: "error" });
      setTimeout(() => setToast(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {toast && (
        <div className={`fixed top-4 right-4 z-50 rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-lg ${toast.type === "error" ? "bg-red-500" : "bg-green-500"}`}>
          {toast.msg}
        </div>
      )}

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">{editTask ? "Edit Task" : "Create New Task"}</h2>
            <p className="text-orange-100 text-xs mt-0.5">
              {editTask ? "Update task details" : "Add a task for users to complete and earn credits"}
            </p>
          </div>
          {editTask && onCancel && (
            <button onClick={onCancel} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors">
              <X size={15} />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">

          {/* ── Thumbnail upload ── */}
          <Field label="Task Image" hint="Upload your own banner image for this task">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              id="task-thumbnail"
              className="hidden"
              onChange={handleImageChange}
            />
            {preview ? (
              <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <img src={preview} alt="Task preview" className="w-full h-40 object-cover" />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 shadow transition-colors"
                >
                  <X size={13} />
                </button>
                <label
                  htmlFor="task-thumbnail"
                  className="absolute bottom-2 right-2 flex cursor-pointer items-center gap-1.5 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-semibold text-white hover:bg-black/80 transition-colors"
                >
                  <Upload size={11} /> Change
                </label>
              </div>
            ) : (
              <label
                htmlFor="task-thumbnail"
                className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 py-8 hover:border-orange-300 hover:bg-orange-50/30 transition-colors"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                  <Upload size={20} className="text-orange-500" />
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
            <input
              value={form.title}
              onChange={set("title")}
              placeholder="e.g., Follow us on Instagram"
              className={inputCls(errors.title)}
            />
          </Field>

          {/* ── Description ── */}
          <Field label="Description">
            <textarea
              value={form.description}
              onChange={set("description")}
              rows={2}
              placeholder="Brief description of what the user needs to do"
              className={inputCls(false)}
            />
          </Field>

          {/* ── Platform (free text) + Reward ── */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Platform / Category" required error={errors.platform} hint="Type anything — Instagram, YouTube, Survey, etc.">
              <input
                value={form.platform}
                onChange={set("platform")}
                placeholder="e.g., Instagram"
                className={inputCls(errors.platform)}
              />
            </Field>
            <Field label="Reward (TKN)" required error={errors.reward}>
              <input
                type="number"
                min="1"
                step="1"
                value={form.reward}
                onChange={set("reward")}
                placeholder="50"
                className={inputCls(errors.reward)}
              />
            </Field>
          </div>

          {/* ── Time limit + Link ── */}
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Time Limit (minutes)"
              required
              error={errors.timeMinutes}
              hint="Countdown starts when user opens task. 0 = no limit."
            >
              <div className="relative">
                <Clock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={form.timeMinutes}
                  onChange={set("timeMinutes")}
                  placeholder="1"
                  className={`${inputCls(errors.timeMinutes)} pl-8`}
                />
              </div>
            </Field>

            <Field label="Task Link">
              <div className="relative">
                <Link size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={form.link}
                  onChange={set("link")}
                  placeholder="https://…"
                  className={`${inputCls(false)} pl-8`}
                />
              </div>
            </Field>
          </div>

          {/* ── Expiry ── */}
          <Field
            label="Expiry Date & Time"
            hint="Task auto-hides from user dashboard and shows in admin expired section after this."
          >
            <div className="relative">
              <Calendar size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="datetime-local"
                value={form.expiresAt}
                onChange={set("expiresAt")}
                className={`${inputCls(false)} pl-8`}
              />
            </div>
          </Field>

          {/* ── Submit ── */}
          <div className="flex gap-2 pt-2">
            {editTask && onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-orange-500 py-2.5 text-sm font-bold text-white hover:bg-orange-600 disabled:opacity-60 transition-colors"
            >
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