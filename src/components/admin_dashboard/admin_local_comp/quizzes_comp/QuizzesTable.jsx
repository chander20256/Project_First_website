const QuizzesTable = ({ quizzes, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left">Title</th>
            <th className="px-6 py-3 text-left">Questions</th>
            <th className="px-6 py-3 text-left">Reward</th>
            <th className="px-6 py-3 text-left">Created</th>
          </tr>
        </thead>
        <tbody>
          {quizzes?.map((quiz) => (
            <tr key={quiz._id} className="border-t hover:bg-gray-50">
              <td className="px-6 py-4">{quiz.title}</td>
              <td className="px-6 py-4">{quiz.questions?.length || 0}</td>
              <td className="px-6 py-4">🪙 {quiz.reward}</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(quiz.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizzesTable;