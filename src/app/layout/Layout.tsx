import { Outlet } from "react-router-dom";
import { Sidebar } from "../../docs/components/Sidebar";

export const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};
