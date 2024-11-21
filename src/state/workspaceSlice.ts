import { StateCreator } from "zustand";
import workshopsPromise, {
  IGetWorkspaceRequestBody,
  IWorkspace,
} from "../mockResponse/workspaceResponse";
import { ICombinedState } from "../store";

export interface IWorkspaceState {
  wsError: string | null;
  wsLoading: boolean;
  currentWorkspace: IWorkspace | null;
  workspaces: IWorkspace[] | null;
  getWorkspaces: () => Promise<IWorkspace[] | null>;
  getSingleWorkspace: (
    data: IGetWorkspaceRequestBody
  ) => Promise<IWorkspace | null>;
}

const createWorkshopSlice: StateCreator<
  ICombinedState,
  [],
  [],
  IWorkspaceState
> = (set) => ({
  // Initial state
  wsLoading: false,
  wsError: null,
  currentWorkspace: null,
  workspaces: null,

  getWorkspaces: async () => {
    set({ wsLoading: true, wsError: null });
    try {
      const response = await workshopsPromise();
      set({
        wsLoading: false,
        wsError: null,
        workspaces: response,
      });
      return response;
    } catch (error) {
      set({ wsError: JSON.stringify(error), wsLoading: false });
      return null;
    }
  },

  getSingleWorkspace: async (data) => {
    set({ wsLoading: true, wsError: null });
    const { id } = data;

    const response = await workshopsPromise();

    response.find((workspace) => workspace.id === id)!;
    try {
      const requiredWorkspace = response.find(
        (workspace) => workspace.id === id
      )!;

      set({
        currentWorkspace: requiredWorkspace,
        wsLoading: false,
        wsError: null,
      });
      return requiredWorkspace;
    } catch (error) {
      set({ wsError: JSON.stringify(error), wsLoading: false });
      return null;
    }
  },
});

export default createWorkshopSlice;
