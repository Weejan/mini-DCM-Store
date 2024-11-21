import { Route } from "react-router-dom";
import Workspace from "../pages/workspace";

const useRoutes = () => {
  return (
    <>
      <Route path="" element={<Workspace />} />
    </>
  );
};

export default useRoutes;
