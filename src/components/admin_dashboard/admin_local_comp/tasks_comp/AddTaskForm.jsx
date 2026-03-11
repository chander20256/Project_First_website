import { useState } from "react";

const AddTaskForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    reward: 0,
    type: "daily",
    category: "general",
    target: 1,
    expiry: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call would go here
    console.log("New task:", form);
    alert("Task added (demo)");
    setForm({
      title: "",
      description: "",
      reward: 0,
      type: "daily",
      category: "general",
      target: 1,
      expiry: "",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Task Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="px-4 py-2 border rounded-lg bg-white"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="one-time">One-Time</option>
            <option value="achievement">Achievement</option>
          </select>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="px-4 py-2 border rounded-lg bg-white"
          >
            <option value="general">General</option>
            <option value="social">Social</option>
            <option value="game">Game Related</option>
            <option value="survey">Survey Related</option>
          </select>
          <input
            type="number"
            step="0.1"
            placeholder="Reward ($)"
            value={form.reward}
            onChange={(e) => setForm({ ...form, reward: parseFloat(e.target.value) })}
            className="px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="number"
            placeholder="Target (e.g., times to complete)"
            value={form.target}
            onChange={(e) => setForm({ ...form, target: parseInt(e.target.value) })}
            className="px-4 py-2 border rounded-lg"
            min="1"
          />
          <input
            type="date"
            placeholder="Expiry Date (optional)"
            value={form.expiry}
            onChange={(e) => setForm({ ...form, expiry: e.target.value })}
            className="px-4 py-2 border rounded-lg"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="px-4 py-2 border rounded-lg md:col-span-2"
            rows="3"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;