// import React from 'react'

// const AdminSurveys = () => {
//   return (
//     <div>
//       <h1>Admin Surveys</h1>
//     </div>
//   )
// }

// export default AdminSurveys







import SurveysHeader from "../../components/admin_dashboard/admin_local_comp/surveys_comp/SurveysHeader";
import SurveysStats from "../../components/admin_dashboard/admin_local_comp/surveys_comp/SurveysStats";
import AddSurveyForm from "../../components/admin_dashboard/admin_local_comp/surveys_comp/AddSurveyForm";
import SurveysTable from "../../components/admin_dashboard/admin_local_comp/surveys_comp/SurveysTable";
import SurveysQuickActions from "../../components/admin_dashboard/admin_local_comp/surveys_comp/SurveysQuickActions";

const AdminSurveys = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <SurveysHeader />
      <SurveysStats />
      <AddSurveyForm />
      <SurveysTable />
      <SurveysQuickActions />
    </div>
  );
};

export default AdminSurveys;