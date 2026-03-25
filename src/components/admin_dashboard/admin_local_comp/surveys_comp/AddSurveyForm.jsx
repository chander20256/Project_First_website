import { useState } from "react";
import axios from "axios"; // Axios import kiya

const AddSurveyForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    reward: 0,
    questions: 5,
    category: "general",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Backend api par data bhej rahe hain
      // Note: Agar aapka backend localhost:5000 par hai toh URL us hisab se set karein
      const response = await axios.post("http://localhost:5000/api/surveys/add", form);
      
      alert("Survey added successfully!");
      // Form reset kar do
      setForm({ title: "", description: "", reward: 0, questions: 5, category: "general" });
    } catch (error) {
      console.error("Error saving survey:", error);
      alert("Failed to add survey. Please check backend.");
    } finally {
      setLoading(false);
    }
  };

  // Niche ka pura return statement aapke original code jaisa hi rahega. 
  // Bas button mein 'loading' state add kar di hai text change karne ke liye.
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Create New Survey</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Survey Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="px-4 py-2 border rounded-lg bg-white">
            <option value="general">General</option>
            <option value="customer">Customer Satisfaction</option>
            <option value="market">Market Research</option>
            <option value="product">Product Feedback</option>
          </select>
          <input type="number" placeholder="Number of Questions" value={form.questions} onChange={(e) => setForm({ ...form, questions: parseInt(e.target.value) })} className="px-4 py-2 border rounded-lg" min="1" />
          <input type="number" step="0.1" placeholder="Reward per Survey ($)" value={form.reward} onChange={(e) => setForm({ ...form, reward: parseFloat(e.target.value) })} className="px-4 py-2 border rounded-lg" required />
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="px-4 py-2 border rounded-lg md:col-span-2" rows="3" required />
        </div>
        <button type="submit" disabled={loading} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400">
          {loading ? "Creating..." : "Create Survey"}
        </button>
      </form>
    </div>
  );
};

export default AddSurveyForm;