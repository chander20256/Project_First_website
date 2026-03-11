import { useState } from "react";
import { FiEdit2, FiTrash2, FiToggleLeft, FiToggleRight, FiEye } from "react-icons/fi";

const sampleSurveys = [
  { id: 1, title: "Customer Satisfaction", category: "customer", questions: 10, responses: 234, reward: 2.5, active: true },
  { id: 2, title: "Product Feedback", category: "product", questions: 8, responses: 89, reward: 1.0, active: true },
  { id: 3, title: "Market Research", category: "market", questions: 12, responses: 12, reward: 5.0, active: false },
  { id: 4, title: "Employee Engagement", category: "general", questions: 15, responses: 45, reward: 3.0, active: true },
];

const SurveysTable = () => {
  const [surveys, setSurveys] = useState(sampleSurveys);

  const toggleActive = (id) => {
    setSurveys(surveys.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  const deleteSurvey = (id) => {
    if (window.confirm("Delete this survey?")) {
      setSurveys(surveys.filter(s => s.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Questions</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Responses</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reward</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y">
          {surveys.map((survey) => (
            <tr key={survey.id}>
              <td className="px-6 py-4 whitespace-nowrap font-medium">{survey.title}</td>
              <td className="px-6 py-4 whitespace-nowrap capitalize">{survey.category}</td>
              <td className="px-6 py-4 whitespace-nowrap">{survey.questions}</td>
              <td className="px-6 py-4 whitespace-nowrap">{survey.responses}</td>
              <td className="px-6 py-4 whitespace-nowrap">${survey.reward.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  survey.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {survey.active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => toggleActive(survey.id)}
                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                  title={survey.active ? 'Deactivate' : 'Activate'}
                >
                  {survey.active ? <FiToggleRight className="w-5 h-5" /> : <FiToggleLeft className="w-5 h-5" />}
                </button>
                <button className="text-yellow-600 hover:text-yellow-900 mr-3" title="Edit">
                  <FiEdit2 className="w-5 h-5" />
                </button>
                <button className="text-blue-600 hover:text-blue-900 mr-3" title="View Responses">
                  <FiEye className="w-5 h-5" />
                </button>
                <button
                  onClick={() => deleteSurvey(survey.id)}
                  className="text-red-600 hover:text-red-900"
                  title="Delete"
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SurveysTable;