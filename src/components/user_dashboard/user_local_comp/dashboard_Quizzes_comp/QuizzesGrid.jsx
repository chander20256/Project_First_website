import QuizCard from "./QuizCard";

const QuizzesGrid = () => {
  const quizzes = [
    {
      id: 1,
      title: "Gaming Knowledge Quiz",
      reward: "30 tokens",
      time: "5 min",
    },
    { id: 2, title: "Esports Trivia", reward: "40 tokens", time: "7 min" },
    { id: 3, title: "Game Mechanics Quiz", reward: "25 tokens", time: "4 min" },
    { id: 4, title: "Game Genres Test", reward: "50 tokens", time: "8 min" },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Available Quizzes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
};

export default QuizzesGrid;
