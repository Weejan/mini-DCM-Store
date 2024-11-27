import { StateCreator } from "zustand";
import { ILoginReqBody, ILoginResBody } from "../mockResponse/loginResponse";
import loginResponsePromise from "../mockResponse/loginResponse";
import useStore, { ICombinedState } from "../store";
import permissionsPromise, {
  IPermissionResponse,
} from "../mockResponse/mockPermissions";

export type TEntityType = "workspace" | "patient" | "study" | "report";
export type TPermissionType = "create" | "view" | "update" | "delete";
export type TUserType = "superadmin" | "admin" | "annotator";

export interface IAuthState {
  authLoading: boolean;
  authError: string | null;
  token: string | null;
  userType: TUserType | null;
  wsPermissions: Record<TEntityType, TPermissionType[]> | null;
  doLogin: (data: ILoginReqBody) => Promise<ILoginResBody | undefined>;
  setAuthLoading: (loading: boolean) => void;
  setAuthError: (error: string | null) => void;
  getPermission: (userTyper: TUserType) => Promise<IPermissionResponse>;
  doLogout: () => void;
}

const createAuthSlice: StateCreator<ICombinedState, [], [], IAuthState> = (
  set
) => ({
  // Initial state
  authLoading: false,
  authError: null,
  token: null,
  userType: null,
  wsPermissions: null,

  // Actions
  setAuthLoading: (authLoading) => set({ authLoading }),
  setAuthError: (authError) => set({ authError }),

  doLogin: async (data: ILoginReqBody) => {
    set({ authLoading: true, authError: null });

    const response = await loginResponsePromise(data);

    try {
      localStorage.setItem("token", response.token);
      localStorage.setItem("userType", response.role);
      set({
        token: response.token,
        userType: response.role as TUserType,
        authLoading: false,
        authError: null,
      });
      console.log(response);
      return response;
    } catch (error) {
      set({ authError: JSON.stringify(error), authLoading: false });
      console.log("errorrr");
    }
  },
  getPermission: async (userType: TUserType) => {
    set({ authLoading: true, authError: null });

    const response = await permissionsPromise(userType);

    set({
      wsPermissions: response.permission,
      authLoading: false,
      authError: null,
    });
    return response;
  },
  doLogout: () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
      console.log("Before clearing storage:", localStorage.getItem("store"));
      useStore.persist.clearStorage();
      console.log("After clearing storage:", localStorage.getItem("store"));

      set({
        token: null,
        userType: null,
        authLoading: false,
        authError: null,
        currentWorkspace: null,
        wsPermissions: null,
        studys: null,
      });
    } catch (error) {
      set({ authError: JSON.stringify(error), authLoading: false });
      console.log("errorrr");
    }
  },
});

export default createAuthSlice;
