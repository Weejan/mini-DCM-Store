import { Outlet } from "react-router-dom";
import Header from "./pages/header";
import BreadCrumbs from "./pages/breadcrumb";

function AppLayout() {
  return (
    <>
      <Header />
      <div className="w-full pt-6 bg-blue-50">
        <div className="w-[97%] mx-auto  ">
          <BreadCrumbs />
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default AppLayout;
