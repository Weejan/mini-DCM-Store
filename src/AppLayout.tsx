import { Outlet } from "react-router-dom";
import Header from "./pages/header";

function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default AppLayout;
