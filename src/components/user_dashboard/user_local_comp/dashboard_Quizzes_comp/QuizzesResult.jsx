const QuizzesResult = ({ result, onClose }) => {
  // Add error handling for undefined result
  if (!result) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <p className="text-gray-600">No result data available</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Back to Quizzes
        </button>
      </div>
    );
  }

  // Safely access properties with fallbacks
  const percentage = result.totalQuestions 
    ? (result.score / result.totalQuestions) * 100 
    : 0;
  
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
      <div className="mb-6">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
        <p className="text-gray-600">{result.quizTitle || 'Quiz'}</p>
      </div>

      <div className="mb-6">
        <div className="text-4xl font-bold text-blue-600 mb-2">
          {result.score || 0} / {result.totalQuestions || 0}
        </div>
        <div className="text-gray-600 mb-4">
          {percentage.toFixed(0)}% Correct
        </div>
        <div className="bg-yellow-100 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-700">
            +{result.earnedCoins || 0} 🪙
          </div>
          <div className="text-sm text-yellow-600">Coins Earned!</div>
        </div>
      </div>

      <button
        onClick={onClose}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Back to Quizzes
      </button>
    </div>
  );
};

export default QuizzesResult;