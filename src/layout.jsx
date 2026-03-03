import { Outlet } from 'react-router-dom';
import Navbar from './components/globalcomp/Navbar';
import Footer from './components/globalcomp/Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;