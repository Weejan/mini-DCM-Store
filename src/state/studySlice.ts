import { StateCreator } from "zustand";
import { IStudyBody } from "../mockResponse/studyResponse";
import patientPromise from "../mockResponse/patientResponse";

export interface IStudyState extends IGetStudyResponse {
  studyLoading: boolean;
  studyError: string | null;
  getAllStudy: () => Promise<IStudyBody[]>;
}

interface IGetStudyResponse {
  studys: IStudyBody[] | null;
}

const createStudySlice: StateCreator<IStudyState> = (set) => ({
  studyError: null,
  studyLoading: false,
  studys: null,

  getAllStudy: async () => {
    const response = await patientPromise();
    console.log(response);
    const studyList = response
      .map((patient) => patient.study)
      .flat()
      .filter((study) => study !== null) as IStudyBody[];
    console.log(studyList);
    set({ studys: studyList.length > 0 ? studyList : null });
    return studyList;
  },
});

export default createStudySlice;
