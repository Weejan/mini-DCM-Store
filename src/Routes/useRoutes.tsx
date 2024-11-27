import { Route } from "react-router-dom";
import Home from "../pages/home";
import Workspace from "../pages/workspace";
import Patient from "../pages/patient";

const useRoutes = () => {
  return (
    <>
      <Route path="" element={<Home />} />
      <Route path="workspace/:workspaceId" element={<Workspace />} />
      <Route path="workspace/:workspaceId/patient" element={<Patient />} />
      <Route
        path="workspace/:workspaceId/patient/:patientId"
        element={<Patient />}
      />
    </>
  );
};

export default useRoutes;
