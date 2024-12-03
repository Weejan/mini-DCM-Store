import { useParams } from "react-router-dom";
import useStore from "../store";
import { useEffect } from "react";
import InfoCard from "./infoCard";
import Patients from "./patients";

function Patient() {
  const { patientId } = useParams();
  const { getSinglePatient, currentPatient } = useStore();
  console.log(currentPatient);

  useEffect(() => {
    const fetchData = async () => {
      await getSinglePatient({ patientId: parseInt(patientId!) });
    };
    fetchData();
  }, [getSinglePatient]);

  return (
    <div className="   flex flex-col w-full min-h-[93vh] bg-blue-50">
      <div className="w-[97%] mx-auto mt-6">
        <InfoCard currentElement={currentPatient} />
      </div>

      <div className="w-[97%] mx-auto mt-6">
        <Patients />
      </div>
    </div>
  );
}
export default Patient;
