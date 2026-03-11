import { useState } from "react";
import { FiEdit2, FiTrash2, FiToggleLeft, FiToggleRight, FiEye } from "react-icons/fi";

const sampleTasks = [
  { id: 1, title: "Play 3 Games", type: "daily", category: "game", reward: 0.5, target: 3, completed: 234, active: true },
  { id: 2, title: "Complete a Survey", type: "daily", category: "survey", reward: 1.0, target: 1, completed: 89, active: true },
  { id: 3, title: "Refer a Friend", type: "one-time", category: "social", reward: 5.0, target: 1, completed: 45, active: true },
  { id: 4, title: "Play 10 Games in a Week", type: "weekly", category: "game", reward: 3.0, target: 10, completed: 12, active: false },
  { id: 5, title: "Complete 5 Surveys", type: "weekly", category: "survey", reward: 2.5, target: 5, completed: 7, active: true },
];

const TasksTable = () => {
  const [tasks, setTasks] = useState(sampleTasks);

  const toggleActive = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, active: !t.active } : t));
  };

  const deleteTask = (id) => {
    if (window.confirm("Delete this task?")) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reward</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Target</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Completed</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y">
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="px-6 py-4 whitespace-nowrap font-medium">{task.title}</td>
              <td className="px-6 py-4 whitespace-nowrap capitalize">{task.type}</td>
              <td className="px-6 py-4 whitespace-nowrap capitalize">{task.category}</td>
              <td className="px-6 py-4 whitespace-nowrap">${task.reward.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{task.target}</td>
              <td className="px-6 py-4 whitespace-nowrap">{task.completed}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  task.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {task.active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => toggleActive(task.id)}
                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                  title={task.active ? 'Deactivate' : 'Activate'}
                >
                  {task.active ? <FiToggleRight className="w-5 h-5" /> : <FiToggleLeft className="w-5 h-5" />}
                </button>
                <button className="text-yellow-600 hover:text-yellow-900 mr-3" title="Edit">
                  <FiEdit2 className="w-5 h-5" />
                </button>
                <button className="text-blue-600 hover:text-blue-900 mr-3" title="View Progress">
                  <FiEye className="w-5 h-5" />
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
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

export default TasksTable;