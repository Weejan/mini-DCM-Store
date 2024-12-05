import { useParams } from "react-router-dom";
import useStore from "../store";
import { useEffect } from "react";
import InfoCard from "./infoCard";
import { HomeRepairServiceOutlined } from "@mui/icons-material";
import Studies from "./studies";

function Patient() {
  const { patientId } = useParams();
  const { getSinglePatient, currentPatient } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      await getSinglePatient({ patientId: parseInt(patientId!) });
    };
    fetchData();
  }, [getSinglePatient]);

  return (
    <div className="   flex flex-col w-full min-h-[93vh] bg-blue-50">
      <div className="w-[97%] mx-auto mt-6">
        <InfoCard
          currentElement={currentPatient}
          contextMenuItems={[
            {
              icon: <HomeRepairServiceOutlined />,
              label: "update",
              onClick: () => console.log("chalyo"),
            },
            {
              icon: <HomeRepairServiceOutlined />,
              label: "delete",
              onClick: () => console.log("chalyo"),
              color: "error",
            },
          ]}
          entity="patient"
          permissions={["update"]}
        />
      </div>

      <div className="w-[97%] mx-auto mt-6">
        <Studies />
      </div>
    </div>
  );
}
export default Patient;
