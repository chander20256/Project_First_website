// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Layout from './layout';
// import LandingPage from './pages/LandingPage';
// import AboutPage from './pages/AboutPage';
// import ContactPage from './pages/ContactPage';
// import BlogPage from './pages/BlogPage';

// function App() {
//   return (
//     <ThemeProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Layout />}>
//             <Route index element={<LandingPage />} />
//             <Route path="about" element={<AboutPage />} />
//             <Route path="contact" element={<ContactPage />} />
//             <Route path="blog" element={<BlogPage />} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </ThemeProvider>
//   );
// }

// export default App;




import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="blog" element={<BlogPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;