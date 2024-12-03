import { StateCreator } from "zustand";
import patientPromise, { IPatient } from "../mockResponse/patientResponse";
import { ICombinedState } from "../store";

export interface IPatientState {
  patientError: string | null;
  patientLoading: boolean;
  currentPatient: IPatient | null;
  allPatient: IPatient[] | null;
  getAllPatients: () => Promise<IPatient[]>;
  getSinglePatient: (data: IGetSinglePatientRequestBody) => Promise<IPatient>;
}

export interface IGetAllPatientResponseBody {
  patients: IPatient[];
}

export interface IGetSinglePatientRequestBody {
  patientId: number;
}

const createPatientSlice: StateCreator<
  ICombinedState,
  [],
  [],
  IPatientState
> = (set) => ({
  patientError: null,
  patientLoading: false,
  allPatient: null,
  currentPatient: null,

  getAllPatients: async () => {
    const response = await patientPromise();
    const patientList = response
      .map((patient) => patient)
      .flat()
      .filter((patient) => patient !== null) as IPatient[];
    set({ allPatient: patientList.length > 0 ? patientList : null });
    return patientList;
  },

  getSinglePatient: async (data) => {
    const response = await patientPromise();

    const { patientId } = data;

    const patient = response.find((patient) => patient.id === patientId)!;
    set({ currentPatient: patient });

    return patient;
  },
});
export default createPatientSlice;
