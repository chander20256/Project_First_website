const QuizCard = ({ quiz }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow border hover:shadow-lg transition">
      <div className="h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
        📝 Quiz Preview
      </div>
      <h3 className="font-semibold">{quiz.title}</h3>
      <p className="text-sm text-gray-500 mt-1">Reward: {quiz.reward}</p>
      <p className="text-xs text-gray-400 mt-1">Estimated time: {quiz.time}</p>
      <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
        Start Quiz
      </button>
    </div>
  );
};

export default QuizCard;
