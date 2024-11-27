export interface IStudyBody {
  id: string;
  name: string;
  patientName: string;
  status: string;
}

export const mockStudies: IStudyBody[] = [
  {
    id: "1",
    name: "Cardiology Study A",
    patientName: "wizzy",
    status: "Active",
  },
  {
    id: "2",
    name: "Neurology Study B",
    patientName: "wizzy",
    status: "Pending",
  },
  {
    id: "3",
    name: "Oncology Study C",
    patientName: "tevv",
    status: "Completed",
  },
  {
    id: "4",
    name: "Genetics Study D",
    patientName: "tevv",
    status: "Active",
  },
  {
    id: "5",
    name: "Immunology Study E",
    patientName: "tevv",
    status: "Pending",
  },
];
