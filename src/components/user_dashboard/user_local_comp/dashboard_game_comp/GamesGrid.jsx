import GameCard from "./GameCard";

const GamesGrid = () => {
  const games = [
    { id: 1, name: "Snake Game", reward: "50 tokens" },
    { id: 2, name: "Memory Game", reward: "40 tokens" },
    { id: 3, name: "Quiz Battle", reward: "70 tokens" },
    { id: 4, name: "Puzzle Challenge", reward: "60 tokens" },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Available Games</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default GamesGrid;
