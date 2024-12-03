import { Route } from "react-router-dom";
import Home from "../pages/home";
import Workspace from "../pages/workspace";
import Patient from "../pages/patient";
import Patients from "../pages/patients";

const useRoutes = () => {
  return (
    <>
      <Route path="" element={<Home />} />
      <Route path="workspace" element={<Home />} />
      <Route path="workspace/:workspaceId" element={<Workspace />} />
      <Route path="workspace/:workspaceId/patient" element={<Patients />} />
      <Route
        path="workspace/:workspaceId/patient/:patientId"
        element={<Patient />}
      />
    </>
  );
};

export default useRoutes;
