import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <p>Header</p>
      <Outlet />
    </>
  );
}

export default AppLayout;
