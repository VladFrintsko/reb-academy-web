import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Outlet />
    </div>
  );
};
