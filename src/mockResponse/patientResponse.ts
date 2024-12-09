import { IStudyBody, mockStudies } from "./studyResponse";

export interface IPatient {
  id: number;
  name: string;
  study: IStudyBody[] | null;
  report: IReport[] | null;
  age: number;
  gender: "Male" | "Female";
  address: string;
  contact: string;
}

export interface IPatientState {
  error: string | null;
  loading: boolean;
  currentPatient: IPatient | null;
  allPatient: IPatient[] | null;
}

export interface IGetAllPatientResponseBody {
  patients: IPatient[];
}

export interface IGetSinglePatientRequestBody {
  patientId: number;
}

export interface IReport {
  id: number;
  data: string;
}

export interface IReportState {
  reports: IReport[];
  updateReport: () => void;
}

export const mockPatient: IPatient[] = [
  {
    id: 1,
    name: "Wizzy",
    study: [mockStudies[0]],
    report: [{ id: 1, data: "report" }],
    age: 45,
    gender: "Male",
    address: "123 Main St, Springfieldd fsadfsfsfs",
    contact: "123-456-7890",
  },
  {
    id: 2,
    name: "Limits",
    study: null,
    report: null,
    age: 37,
    gender: "Female",
    address: "456 Elm St, Metropolis",
    contact: "987-654-3210",
  },
  {
    id: 3,
    name: "Tev",
    study: [mockStudies[1]],
    report: [
      { id: 1, data: "report" },
      { id: 2, data: "yui" },
    ],
    age: 29,
    gender: "Male",
    address: "789 Oak St, Gotham",
    contact: "555-123-4567",
  },
  {
    id: 4,
    name: "Axel",
    study: [mockStudies[2]],
    report: [{ id: 3, data: "analysis pending" }],
    age: 52,
    gender: "Male",
    address: "321 Pine St, Star City",
    contact: "444-987-6543",
  },
  {
    id: 5,
    name: "Blaze",
    study: [mockStudies[3]],
    report: [{ id: 4, data: "finalized" }],
    age: 40,
    gender: "Male",
    address: "111 Maple St, Central City",
    contact: "333-654-9870",
  },
  {
    id: 6,
    name: "Nova",
    study: [mockStudies[4]],
    report: [
      { id: 5, data: "initial draft" },
      { id: 6, data: "revised report" },
    ],
    age: 34,
    gender: "Female",
    address: "222 Birch St, Coast City",
    contact: "222-321-8765",
  },
];

function patientPromise(): Promise<IPatient[]> {
  return new Promise((resolve, reject) => {
    if (mockPatient) {
      resolve(mockPatient);
    } else {
      reject("Fetching Workspace Error");
      console.log("patient error");
    }
  });
}

export default patientPromise;
