

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import LandingPage from "./pages/LandingPage";
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from "./pages/userdashboard/DashboardPage";
import DashboardWallet from "./pages/userdashboard/DashboardWallet";
import DashboardGames from "./pages/userdashboard/DashboardGames";
import DashboardSurveys from "./pages/userdashboard/DashboardSurveys";
import DashboardTasks from "./pages/userdashboard/DashboardTasks";
import DashboardLeaderboard from "./pages/userdashboard/DashboardLeaderboard";
import DashboardReferrals from "./pages/userdashboard/DashboardReferrals";
import DashboardQuizzes from "./pages/userdashboard/DashboardQuizzes";
import DashboardSettings from "./pages/userdashboard/DashboardSettings";
import Infopage from "./pages/Infopage";
 import NotFoundPage from "./pages/NotFoundPage";

import { i } from "framer-motion/client";




import AdminDashboardLayout from "./layouts/AdminDashboardLayout";
// import AdminDashboardPage from "./pages/admin_dashboard/AdminDashboardPage";
import AdminWallet from "./pages/admin_dashboard/AdminWallet";
import AdminGames from "./pages/admin_dashboard/AdminGames";
// import AdminOverview from "./pages/admin_dashboard/AdminOverview";
// import AdminSurveys from "./pages/admin_dashboard/AdminSurveys";
import AdminUsers from "./pages/admin_dashboard/AdminUsers";
import AdminSettings from "./pages/admin_dashboard/AdminSettings";
import AdminProfile from "./pages/admin_dashboard/AdminProfile";
import AdminDashboardPage from "./pages/admin_dashboard/AdminDashboardPage";
import AdminReports from "./pages/admin_dashboard/AdminReports";
import Adminleaderboard from "./pages/admin_dashboard/Adminleaderboard";
import AdminReferrals from "./pages/admin_dashboard/AdminReferrals";
import AdminQuizzes from "./pages/admin_dashboard/AdminQuizzes";
import AdminSurveys from "./pages/admin_dashboard/AdminSurveys";
import AdminTask from "./pages/admin_dashboard/AdminTask";
import DashboardProfile from "./pages/userdashboard/DashboardProfile";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="Infopage" element={<Infopage />} />
          <Route path="AuthPage" element={<AuthPage />} />
        </Route>


        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="wallet" element={<DashboardWallet />} />
          <Route path="games" element={<DashboardGames />} />
          <Route path="surveys" element={<DashboardSurveys />} />
          <Route path="tasks" element={<DashboardTasks />} />
          <Route path="leaderboard" element={<DashboardLeaderboard />} />
          <Route path="referrals" element={<DashboardReferrals />} />
          <Route path="quizzes" element={<DashboardQuizzes />} />
          <Route path="quizes" element={<DashboardQuizzes />} /> {/* Fallback for typo */}
          <Route path="settings" element={<DashboardSettings />} />
          <Route path="profile" element={<DashboardProfile />} />
          {/* Add more dashboard routes as needed */}

        </Route>


        <Route path="/Admin" element={<AdminDashboardLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="wallet" element={<AdminWallet />} />
          <Route path="games" element={<AdminGames />} />
          <Route path="users" element={<AdminUsers />} />
          {/* <Route path="overview" element={<AdminOverview />} /> */}
          <Route path="surveys" element={<AdminSurveys />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="quizzes" element={<AdminQuizzes />} />
          <Route path="quizes" element={<AdminQuizzes />} /> {/* Fallback for typo */}
          <Route path="reports" element={<AdminReports />} />
          <Route path="leaderboard" element={<Adminleaderboard />} />
          <Route path="referrals" element={<AdminReferrals />} />
          <Route path="tasks" element={<AdminTask />} />


        </Route>


        {/* 404 Not Found Route - MUST BE LAST */}
        <Route path="*" element={<NotFoundPage />} />
    
      </Routes>

      
    </BrowserRouter>
  );
}

export default App;