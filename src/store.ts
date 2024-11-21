import { create } from "zustand";
import createLoginSlice, { IAuthState } from "./state/authSlice";
import { devtools } from "zustand/middleware";
import createWorkshopSlice, { IWorkspaceState } from "./state/workspaceSlice";

export interface ICombinedState extends IAuthState, IWorkspaceState {}

const store = create<ICombinedState>()(
  devtools((...a) => ({
    ...createLoginSlice(...a),
    ...createWorkshopSlice(...a),
  }))
);

export default store;
