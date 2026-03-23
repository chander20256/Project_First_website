import QuizCard from './QuizCard';

const QuizzesGrid = ({ quizzes, onStartQuiz }) => {
  // Add loading and error handling
  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No quizzes available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quizzes.map((quiz) => (
        <QuizCard key={quiz._id} quiz={quiz} onStart={onStartQuiz} />
      ))}
    </div>
  );
};

export default QuizzesGrid;