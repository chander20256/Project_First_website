const QuizCard = ({ quiz, onStart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
      <p className="text-gray-600 mb-4">{quiz.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-yellow-600 font-medium">
          🪙 {quiz.reward} coins
        </span>
        <button
          onClick={() => onStart(quiz._id)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizCard;