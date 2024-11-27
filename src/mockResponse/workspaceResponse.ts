export interface IWorkspace {
  id: number;
  name: string;
  code: string;
  patients: number;
  dateOfCreation: string;
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
    patients: 120,
    dateOfCreation: "2024 Jan 1",
  },
  {
    id: 2,
    name: "My Workspace 2",
    code: "mw2",
    patients: 120,
    dateOfCreation: "2024 Jan 1",
  },
  {
    id: 3,
    name: "My Workspace 3",
    code: "mw3",
    patients: 120,
    dateOfCreation: "2024 Jan 1",
  },
  {
    id: 4,
    name: "My Workspace 4",
    code: "mw4",
    patients: 10,
    dateOfCreation: "2024 Jan 1",
  },
  {
    id: 5,
    name: "My Workspace 5",
    code: "mw5",
    patients: 250,
    dateOfCreation: "2024 Jan 1",
  },
];

function workshopsPromise(): Promise<IWorkspace[]> {
  return new Promise((resolve, reject) => {
    if (mockWorkspaces) {
      resolve(mockWorkspaces);
    } else {
      reject("Fetching Workspace Error");
      console.log("workspace error");
    }
  });
}

export default workshopsPromise;
