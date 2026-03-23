const ActiveQuiz = ({
  quiz,
  currentQuestionIndex,
  userAnswers,
  onAnswer,
  onNext,
  onPrev,
  onSubmit
}) => {
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const currentAnswer = userAnswers[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const allAnswered = userAnswers.every(answer => answer !== null);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
          <span>{userAnswers.filter(a => a !== null).length} answered</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 rounded-full h-2 transition-all"
            style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">{currentQuestion.text}</h3>
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => onAnswer(option)}
              className={`w-full text-left p-3 rounded-lg border transition ${
                currentAnswer === option
                  ? 'bg-blue-100 border-blue-500'
                  : 'hover:bg-gray-50 border-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between gap-4">
        <button
          onClick={onPrev}
          disabled={isFirstQuestion}
          className={`px-6 py-2 rounded transition ${
            isFirstQuestion
              ? 'bg-gray-200 cursor-not-allowed'
              : 'bg-gray-600 hover:bg-gray-700 text-white'
          }`}
        >
          Previous
        </button>
        
        {!isLastQuestion ? (
          <button
            onClick={onNext}
            disabled={!currentAnswer}
            className={`px-6 py-2 rounded transition ${
              !currentAnswer
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => onSubmit()}
            disabled={!allAnswered}
            className={`px-6 py-2 rounded transition ${
              !allAnswered
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default ActiveQuiz;