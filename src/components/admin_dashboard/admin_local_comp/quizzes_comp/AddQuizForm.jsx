import { useState } from "react";

const AddQuizForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    reward: 0,
    questions: 5,
    category: "general",
    difficulty: "medium",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Quiz Created");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">

      <h2 className="text-xl font-semibold mb-4">
        Create New Quiz
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Quiz Title"
          className="w-full border p-2 rounded"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          Create Quiz
        </button>

      </form>

    </div>
  );
};

export default AddQuizForm;