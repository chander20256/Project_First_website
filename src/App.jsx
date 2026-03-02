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
      <HowItWorks />
    </BrowserRouter>
  );
}