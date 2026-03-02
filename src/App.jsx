<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/globalcomp/Navbar";
import Hero from "./components/globalcomp/Pages/Hero";
import Blog from "./components/globalcomp/Pages/Blog";
import About from "./components/globalcomp/Pages/About";
import Contact from "./components/globalcomp/Pages/Contact";
import HowItWorks from "./components/landingcomp/HowItWorks/HowItWorks";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/auth" element={<AuthPage />} />  */}
        <Route path="/blog" element={<Blog />} /> 
      </Routes>
      <Routes>
         <Route path="/" element={<HowItWorks />} />
      </Routes>
      
      
    </BrowserRouter>
  );
}
=======

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/landingcomp/context/ThemeContext';
import Layout from './layout';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import UserDashboardPage from './pages/UserDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="dashboard/user" element={<UserDashboardPage />} />
            <Route path="dashboard/admin" element={<AdminDashboardPage />} />
            {/* Add more routes as needed */}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );

}

export default App;
>>>>>>> 54c4f12 (pull by kapil)
