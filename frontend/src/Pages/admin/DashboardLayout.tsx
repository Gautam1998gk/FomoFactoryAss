import HeaderLayout from "../../components/shared/admin/layout/HeaderLayout";
import { Outlet } from "react-router-dom";




const DashboardLayout = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-56  md:overflow-hidden">
        <div className="md:overflow-hidden md:w-56 md:fixed md:h-screen">
          <HeaderLayout />
        </div>
      </div>
      <div className="w-full md:ml-12">
        <Outlet />
        </div>
    </div>
  );
};

export default DashboardLayout;

