import QuizzesHeader from "../../components/user_dashboard/user_local_comp/dashboard_Quizzes_comp/QuizzesHeader";
import QuizzesStats from "../../components/user_dashboard/user_local_comp/dashboard_Quizzes_comp/QuizzesStats";
import QuizzesGrid from "../../components/user_dashboard/user_local_comp/dashboard_Quizzes_comp/QuizzesGrid";
import ActiveQuiz from "../../components/user_dashboard/user_local_comp/dashboard_Quizzes_comp/ActiveQuiz";
import QuizzesQuickActions from "../../components/user_dashboard/user_local_comp/dashboard_Quizzes_comp/QuizzesQuickActions";

const DashboardQuizzes = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <QuizzesHeader />
      <QuizzesStats />
      <QuizzesGrid />
      <ActiveQuiz />
      <QuizzesQuickActions />
    </div>
  );
};

export default DashboardQuizzes;
