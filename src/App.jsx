import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";

// Public pages
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import AuthPage from "./pages/AuthPage";
import Infopage from "./pages/Infopage";
import NotFoundPage from "./pages/NotFoundPage";

// Blog
import { BlogInit } from "./components/blogcomp/Blog";        // ← adjust path to match your folder
import BlogPostPage from "./pages/Blogpostpage";

// User dashboard pages
import DashboardPage from "./pages/userdashboard/DashboardPage";
import DashboardWallet from "./pages/userdashboard/DashboardWallet";
import DashboardGames from "./pages/userdashboard/DashboardGames";
import DashboardSurveys from "./pages/userdashboard/DashboardSurveys";
import DashboardTasks from "./pages/userdashboard/DashboardTasks";
import DashboardLeaderboard from "./pages/userdashboard/DashboardLeaderboard";
import DashboardReferrals from "./pages/userdashboard/DashboardReferrals";
import DashboardQuizzes from "./pages/userdashboard/DashboardQuizzes";
import DashboardSettings from "./pages/userdashboard/DashboardSettings";
import DashboardProfile from "./pages/userdashboard/DashboardProfile";

// Admin dashboard pages
import AdminDashboardPage from "./pages/admin_dashboard/AdminDashboardPage";
import AdminWallet from "./pages/admin_dashboard/AdminWallet";
import AdminGames from "./pages/admin_dashboard/AdminGames";
import AdminUsers from "./pages/admin_dashboard/AdminUsers";
import AdminSurveys from "./pages/admin_dashboard/AdminSurveys";
import AdminSettings from "./pages/admin_dashboard/AdminSettings";
import AdminProfile from "./pages/admin_dashboard/AdminProfile";
import AdminQuizzes from "./pages/admin_dashboard/AdminQuizzes";
import AdminReports from "./pages/admin_dashboard/AdminReports";
import Adminleaderboard from "./pages/admin_dashboard/Adminleaderboard";
import AdminReferrals from "./pages/admin_dashboard/AdminReferrals";
import AdminTask from "./pages/admin_dashboard/AdminTask";

function App() {
  return (
    <BrowserRouter>
         {/* ── Blog Initialization ── */}
      <BlogInit />

      <Routes>
        {/* ── Public Routes ── */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="Infopage" element={<Infopage />} />
          <Route path="AuthPage" element={<AuthPage />} />
        </Route>

        {/* ── User Dashboard Routes ── */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="wallet" element={<DashboardWallet />} />
          <Route path="games" element={<DashboardGames />} />
          <Route path="surveys" element={<DashboardSurveys />} />
          <Route path="tasks" element={<DashboardTasks />} />
          <Route path="leaderboard" element={<DashboardLeaderboard />} />
          <Route path="referrals" element={<DashboardReferrals />} />
          <Route path="quizzes" element={<DashboardQuizzes />} />
          <Route path="quizes" element={<DashboardQuizzes />} />
          <Route path="settings" element={<DashboardSettings />} />
          <Route path="profile" element={<DashboardProfile />} />
        </Route>

        {/* ── Admin Dashboard Routes ── */}
        <Route path="/Admin" element={<AdminDashboardLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="wallet" element={<AdminWallet />} />
          <Route path="games" element={<AdminGames />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="surveys" element={<AdminSurveys />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="quizzes" element={<AdminQuizzes />} />
          <Route path="quizes" element={<AdminQuizzes />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="leaderboard" element={<Adminleaderboard />} />
          <Route path="referrals" element={<AdminReferrals />} />
          <Route path="tasks" element={<AdminTask />} />
        </Route>

        {/* ── 404 — must be last ── */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;