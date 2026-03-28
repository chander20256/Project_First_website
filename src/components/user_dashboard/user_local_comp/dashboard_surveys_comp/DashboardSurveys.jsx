import React, { useEffect } from "react";
import { useSurvey } from "../../../../hooks/useSurveyApi"; 

import SurveysHeader from "./SurveysHeader";
import SurveysStats from "./SurveysStats";
// ❌ SurveysQuickActions ka import yahan se hata diya hai
import SurveysGrid from "./SurveysGrid";
import ActiveSurvey from "./ActiveSurvey";
import SurveysResult from "./SurveyResults";

const DashboardSurveys = () => {
  const {
    surveys, activeSurvey, currentQuestionIndex, userAnswers, result, loading, error, 
    userStats, completedSurveyIds, 
    loadSurveys, startSurvey, answerQuestion, nextQuestion, prevQuestion, submitSurvey, closeSurvey
  } = useSurvey();

  useEffect(() => {
    loadSurveys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading && surveys.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <SurveysHeader />
      
      {!activeSurvey && !result && (
        <SurveysStats available={surveys.length} completed={userStats.completed} earned={userStats.earned} />
      )}

      {error && <div className="bg-red-50 p-4 mb-4 rounded-md text-red-700 font-bold">{error}</div>}

      {!activeSurvey && !result && (
        <SurveysGrid surveys={surveys} onStartSurvey={startSurvey} completedSurveyIds={completedSurveyIds} />
      )}

      {activeSurvey && !result && (
        <ActiveSurvey
          survey={activeSurvey} currentQuestionIndex={currentQuestionIndex} userAnswers={userAnswers}
          onAnswer={answerQuestion} onNext={nextQuestion} onPrev={prevQuestion} onSubmit={submitSurvey}
        />
      )}

      {result && <SurveysResult result={result} onClose={closeSurvey} />}
      
      {/* ❌ Quick Actions (Recommended, Top Earners, Bonus etc.) yahan se remove kar diya hai */}
    </div>
  );
};

export default DashboardSurveys;