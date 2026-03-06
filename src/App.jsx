// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// // import Layout from './layout';
// import Layout from './layouts/PublicLayout';
// import LandingPage from './pages/LandingPage';
// import AboutPage from './pages/AboutPage';
// import ContactPage from './pages/ContactPage';
// import BlogPage from './pages/BlogPage';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<LandingPage />} />
//           <Route path="about" element={<AboutPage />} />
//           <Route path="contact" element={<ContactPage />} />
//           <Route path="blog" element={<BlogPage />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

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
        <Route path="settings" element={<DashboardSettings />} />
        <Route path="profile" element={<DashboardSettings />} />
          {/* Add more dashboard routes as needed */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;