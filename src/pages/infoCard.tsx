import { useEffect, useState } from "react";
import ContextMenu from "./contextMenu";
import { HomeRepairServiceOutlined } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IWorkspace } from "../mockResponse/workspaceResponse";
import { IPatient } from "../mockResponse/patientResponse";

interface InfoCardProps {
  currentElement: IWorkspace | IPatient | null; // Pass the workspace data as a prop
}

function InfoCard({ currentElement }: InfoCardProps) {
  const [data, setData] = useState<IWorkspace | IPatient | null>(null);

  useEffect(() => {
    setData(currentElement);
  }, [currentElement]);
  console.log(data);

  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>();
  const menuVisible = Boolean(anchorElement);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElement(event.currentTarget);

  const handleMenuClose = () => setAnchorElement(null);
  if (!data) return;
  return (
    <>
      <ContextMenu
        anchorElement={anchorElement ?? null}
        open={menuVisible}
        onClose={handleMenuClose}
        items={[
          {
            icon: <HomeRepairServiceOutlined />,
            label: "repair",
            onClick: () => console.log("chalyo"),
          },
          {
            icon: <HomeRepairServiceOutlined />,
            label: "repair",
            onClick: () => console.log("chalyo"),
            color: "error",
          },
        ]}
      />
      <div className=" flex flex-col min-h-[150px] rounded-2xl shadow-lg w-full bg-white py-6 px-7 gap-5">
        <div className="flex justify-between">
          <div className="font-medium text-2xl">{data?.name}</div>
          <div onClick={handleMenuClick}>
            <MoreVertIcon></MoreVertIcon>
          </div>
        </div>
        <div className="flex">
          {Object.keys(data).map((key) => {
            const propertyKey = key as keyof typeof data;
            return (
              <ul className="w-full flex justify-between">
                <li key={key} className="flex flex-col justify-between">
                  <span className="font-meduium text-gray-400 capitalize">
                    {key}
                  </span>
                  <span>
                    {typeof data[propertyKey] === "object"
                      ? JSON.stringify(data[propertyKey])
                      : data[propertyKey]}
                  </span>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default InfoCard;
