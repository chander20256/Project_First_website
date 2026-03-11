import { useState } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiToggleLeft,
  FiToggleRight,
  FiEye,
  FiList,
} from "react-icons/fi";

const sampleQuizzes = [
  { id: 1, title: "General Knowledge Quiz", category: "general", difficulty: "medium", questions: 10, reward: 5.0, attempts: 345, avgScore: 72, active: true },
  { id: 2, title: "Science Trivia", category: "science", difficulty: "hard", questions: 15, reward: 8.0, attempts: 123, avgScore: 68, active: true },
  { id: 3, title: "History Challenge", category: "history", difficulty: "easy", questions: 8, reward: 3.0, attempts: 567, avgScore: 85, active: true },
];

const QuizzesTable = () => {
  const [quizzes, setQuizzes] = useState(sampleQuizzes);

  const toggleActive = (id) => {
    setQuizzes(quizzes.map(q => q.id === id ? { ...q, active: !q.active } : q));
  };

  const deleteQuiz = (id) => {
    if (window.confirm("Delete this quiz?")) {
      setQuizzes(quizzes.filter(q => q.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium">Difficulty</th>
            <th className="px-6 py-3 text-left text-xs font-medium">Questions</th>
            <th className="px-6 py-3 text-left text-xs font-medium">Reward</th>
            <th className="px-6 py-3 text-left text-xs font-medium">Attempts</th>
            <th className="px-6 py-3 text-left text-xs font-medium">Avg Score</th>
            <th className="px-6 py-3 text-left text-xs font-medium">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium">Actions</th>
          </tr>
        </thead>

        <tbody>
          {quizzes.map((quiz) => (
            <tr key={quiz.id}>
              <td className="px-6 py-4">{quiz.title}</td>
              <td className="px-6 py-4 capitalize">{quiz.category}</td>
              <td className="px-6 py-4 capitalize">{quiz.difficulty}</td>
              <td className="px-6 py-4">{quiz.questions}</td>
              <td className="px-6 py-4">${quiz.reward}</td>
              <td className="px-6 py-4">{quiz.attempts}</td>
              <td className="px-6 py-4">{quiz.avgScore}%</td>

              <td className="px-6 py-4">
                {quiz.active ? "Active" : "Inactive"}
              </td>

              <td className="px-6 py-4 text-right space-x-3">
                <button onClick={() => toggleActive(quiz.id)}>
                  {quiz.active ? <FiToggleRight /> : <FiToggleLeft />}
                </button>

                <button>
                  <FiEdit2 />
                </button>

                <button>
                  <FiList />
                </button>

                <button>
                  <FiEye />
                </button>

                <button onClick={() => deleteQuiz(quiz.id)}>
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizzesTable;