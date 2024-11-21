import { StateCreator } from "zustand";
import { ILoginReqBody, ILoginResBody } from "../mockResponse/loginResponse";
import loginResponsePromise from "../mockResponse/loginResponse";
import permissionsPromise, {
  IPermissionResponse,
} from "../mockResponse/mockPermissions";

export type TEntityType = "workspace" | "patient" | "study" | "report";
export type TPermissionType = "create" | "view" | "update" | "delete";
export type TUserType = "superadmin" | "admin" | "annotator";

export interface IGetWorkspaceRequestBody {
  id: number;
}

export interface IAuthState {
  authLoading: boolean;
  authError: string | null;
  token: string | null;
  userType: TUserType | null;
  wsPermissions: Record<TEntityType, TPermissionType[]> | null;
  login: (data: ILoginReqBody) => Promise<ILoginResBody | undefined>;
  setAuthLoading: (loading: boolean) => void;
  setAuthError: (error: string | null) => void;
  permission: (userTyper: TUserType) => Promise<IPermissionResponse>;
}

const createAuthSlice: StateCreator<IAuthState> = (set) => ({
  // Initial state
  authLoading: false,
  authError: null,
  token: null,
  userType: null,
  wsPermissions: null,

  // Actions
  setAuthLoading: (authLoading) => set({ authLoading }),
  setAuthError: (authError) => set({ authError }),

  login: async (data: ILoginReqBody) => {
    set({ authLoading: true, authError: null });

    const response = await loginResponsePromise(data);
    try {
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
  permission: async (userType: TUserType) => {
    set({ authLoading: true, authError: null });

    const response = await permissionsPromise(userType);

    set({
      wsPermissions: response.permission,
      authLoading: false,
      authError: null,
    });
    console.log(response, userType);
    return response;

    // return permissionsPromise(userType)
    //   .then((response) => {
    //     set({
    //       wsPermissions: response.permission,
    //       authLoading: false,
    //       authError: null,
    //     });
    //     console.log("permission aayo");
    //   })
    //   .catch((error) => {
    //     set({ authError: error, authLoading: false });
    //     console.log("no permission");
    //   });
  },
});

export default createAuthSlice;
