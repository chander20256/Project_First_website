// import { Outlet } from "react-router-dom";
// import AdminHeader from "../components/admin_dashboard/admin_global_comp/AdminHeader";
// import AdminSidebar from "../components/admin_dashboard/admin_global_comp/AdminSidebar";
// import Footer from "../components/globalcomp/Footer";

// const AdminDashboardLayout = () => {
//   return (
//     <div className="min-h-screen flex flex-col bg-gray-950">
//       <AdminHeader />

//       <div className="flex flex-1 pt-[65px]">
//         <AdminSidebar />

//         <main className="flex-1 p-6 bg-white">
//           <Outlet />
//         </main>
//       </div>

//       <Footer/>
//     </div>
//   );
// };

// export default AdminDashboardLayout;




import { Outlet } from "react-router-dom";
import AdminHeader from "../components/admin_dashboard/admin_global_comp/AdminHeader";
import AdminSidebar from "../components/admin_dashboard/admin_global_comp/AdminSidebar";
import Footer from "../components/globalcomp/Footer";
import ScrollToTop from "../components/globalcomp/ScrollToTop";

const AdminDashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <ScrollToTop />
      <AdminHeader />
      <div className="flex flex-1 pt-[65px]">
        <AdminSidebar />
        <main className="flex-1 p-6 bg-white">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboardLayout;