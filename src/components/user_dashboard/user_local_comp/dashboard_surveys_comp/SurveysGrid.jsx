import SurveyCard from "./SurveyCard";

const SurveysGrid = () => {
  const surveys = [
    {
      id: 1,
      title: "Gaming Habits Survey",
      reward: "30 tokens",
      time: "5 min",
    },
    { id: 2, title: "Mobile App Usage", reward: "40 tokens", time: "7 min" },
    { id: 3, title: "Esports Interest", reward: "25 tokens", time: "4 min" },
    {
      id: 4,
      title: "Game Spending Survey",
      reward: "50 tokens",
      time: "8 min",
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Available Surveys</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {surveys.map((survey) => (
          <SurveyCard key={survey.id} survey={survey} />
        ))}
      </div>
    </div>
  );
};

export default SurveysGrid;
