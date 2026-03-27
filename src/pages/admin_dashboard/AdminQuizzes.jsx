import { useQuiz } from "../../hooks/useQuiz";
import { useEffect } from "react";

import QuizzesHeader from "../../components/admin_dashboard/admin_local_comp/quizzes_comp/QuizzesHeader";
import AddQuizForm from "../../components/admin_dashboard/admin_local_comp/quizzes_comp/AddQuizForm";
import QuizzesTable from "../../components/admin_dashboard/admin_local_comp/quizzes_comp/QuizzesTable";

const AdminQuizzes = () => {
  const { quizzes, loading, error, loadQuizzes, removeQuiz } = useQuiz();

  // Load quizzes on component mount
  useEffect(() => {
    loadQuizzes();
  }, []);

  const handleDelete = async (quizId) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      await removeQuiz(quizId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <QuizzesHeader totalQuizzes={quizzes.length} />

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4 text-red-700">
          {error}
        </div>
      )}

      {loading && quizzes.length === 0 ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <AddQuizForm onQuizCreated={loadQuizzes} />
          <QuizzesTable quizzes={quizzes} onDelete={handleDelete} />
        </>
      )}
    </div>
  );
};

export default AdminQuizzes;
