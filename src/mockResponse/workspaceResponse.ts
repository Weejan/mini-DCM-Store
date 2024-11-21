export interface IWorkspace {
  id: number;
  name: string;
  code: string;
  patients: number | null;
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
    name: "My Workspace 1",
    code: "mw1",
    patients: null,
  },
  {
    id: 2,
    name: "My Workspace 2",
    code: "mw2",
    patients: null,
  },
  {
    id: 3,
    name: "My Workspace 3",
    code: "mw3",
    patients: null,
  },
  {
    id: 4,
    name: "My Workspace 4",
    code: "mw4",
    patients: null,
  },
  {
    id: 5,
    name: "My Workspace 5",
    code: "mw5",
    patients: null,
  },
];

function workshopsPromise(): Promise<IWorkspace[]> {
  return new Promise((resolve, reject) => {
    if (mockWorkspaces) {
      resolve(mockWorkspaces);
    } else {
      reject("Fetching Workspace Error");
    }
  });
}

export default workshopsPromise;
