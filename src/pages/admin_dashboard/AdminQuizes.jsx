// import React from 'react'

// const AdminQuizes = () => {
//   return (
//     <div>
//       <h1>Admin Quizes</h1>
//     </div>
//   )
// }

// export default AdminQuizes






import QuizzesHeader from "../../components/admin_dashboard/admin_local_comp/quizzes_comp/QuizzesHeader";
import QuizzesStats from "../../components/admin_dashboard/admin_local_comp/quizzes_comp/QuizzesStats";
import AddQuizForm from "../../components/admin_dashboard/admin_local_comp/quizzes_comp/AddQuizForm";
import QuizzesTable from "../../components/admin_dashboard/admin_local_comp/quizzes_comp/QuizzesTable";
import QuizzesQuickActions from "../../components/admin_dashboard/admin_local_comp/quizzes_comp/QuizzesQuickActions";

const AdminQuizzes = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <QuizzesHeader />
      <QuizzesStats />
      <AddQuizForm />
      <QuizzesTable />
      <QuizzesQuickActions />
    </div>
  );
};

export default AdminQuizzes;