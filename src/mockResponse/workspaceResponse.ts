import { TEntityType, TPermissionType } from "../state/authSlice";

export interface IWorkspace {
  id: number;
  name: string;
  code: string;
}

export interface IGetWorkspaceRequestBody {
  id: number;
}

export interface IWorkspaceState {
  error: string | null;
  loading: boolean;
  currentWorkspace: IWorkspace | null;
}

const mockWorkspaces: IWorkspace[] = [
  {
    id: 1,
    name: "Workspace 1",
    code: "mw1",
  },
  {
    id: 2,
    name: "Workspace 2",
    code: "mw2",
  },
  {
    id: 3,
    name: "mock workspace with limited access",
    code: "mw3",
  },
];
