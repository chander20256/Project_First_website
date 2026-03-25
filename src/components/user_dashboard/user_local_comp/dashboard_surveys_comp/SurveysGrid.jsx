import { useState, useEffect } from "react";
import axios from "axios";
import SurveyCard from "./SurveyCard";

const SurveysGrid = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  // Jab component load hoga, tab backend se data aayega
  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/surveys/all");
        // Sirf active surveys dikhayenge user ko
        const activeSurveys = response.data.filter(survey => survey.active === true);
        setSurveys(activeSurveys);
      } catch (error) {
        console.error("Error fetching surveys:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Available Surveys</h2>
      
      {loading ? (
        <p className="text-gray-500">Loading surveys...</p>
      ) : surveys.length === 0 ? (
        <p className="text-gray-500">No active surveys available right now.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {surveys.map((survey) => (
            // Hum backend se aayi 'id' (_id hoti hai mongoDB mein) aur baaki details bhej rahe hain
            <SurveyCard 
              key={survey._id} 
              survey={{
                id: survey._id,
                title: survey.title,
                reward: `${survey.reward} tokens`, // Format adjust kiya
                time: `${survey.questions * 1} min` // Dummy time estimate logic (1 min per question)
              }} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SurveysGrid;