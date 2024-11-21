import { create } from "zustand";
import createLoginSlice, { IAuthState } from "./state/authSlice";
import { devtools } from "zustand/middleware";
import { IWorkspaceState } from "./state/workspaceSlice";

export interface ICombinedState extends IAuthState, IWorkspaceState {}

const store = create<ICombinedState>()(
  devtools((...a) => ({
    ...createLoginSlice(...a),
    loading: false,
  }))
);

export default store;
