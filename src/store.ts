import { create } from "zustand";
import createLoginSlice, { IAuthState } from "./state/authSlice";
import { devtools, persist } from "zustand/middleware";
import createWorkshopSlice, { IWorkspaceState } from "./state/workspaceSlice";
import createStudySlice, { IStudyState } from "./state/studySlice";
import createPatientSlice, { IPatientState } from "./state/patientSlice";

export interface ICombinedState
  extends IAuthState,
    IWorkspaceState,
    IStudyState,
    IPatientState {}

// Create the Zustand store instance
const useStore = create<ICombinedState>()(
  devtools(
    persist(
      (...a) => ({
        ...createLoginSlice(...a),
        ...createWorkshopSlice(...a),
        ...createStudySlice(...a),
        ...createPatientSlice(...a),
      }),
      { name: "store" }
    )
  )
);

export default useStore;
