import { useEffect, useState } from "react";
import { IWorkspace } from "../mockResponse/workspaceResponse";
import { Button } from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import useStore from "../store";
import { useNavigate } from "react-router-dom";

function Workspaces() {
  const navigate = useNavigate();
  const [workspaces, setWorkspaces] = useState<IWorkspace[] | null>(null);
  const { getWorkspaces } = useStore();

  useEffect(() => {
    const fetchWorkspaces = async () => {
      const data = await getWorkspaces();
      setWorkspaces(data);
    };
    fetchWorkspaces();
  }, [getWorkspaces]);

  return (
    <div className=" shadow-lg    rounded-2xl  flex flex-col justify-center items-center px-6 py-7 bg-white mt-6 gap-5">
      <section className="flex justify-between w-full">
        <h1 className="text-2xl font-light">Recent Workspaces</h1>
        <Button variant="contained">View All</Button>
      </section>
      <section id="recent-workshops" className="flex gap-6  w-full">
        {workspaces ? (
          workspaces.map((workspace) => (
            <div
              className="w-[225px] border   h-[107px] flex flex-col justify-center rounded-md bg-blue-700 shadow-md"
              onClick={() => navigate(`/workspace/${workspace.id}`)}
            >
              <div
                className="w-[224px] border h-[100px] rounded-md bg-white flex flex-col justify-center p-4 gap-2"
                key={workspace.id}
              >
                <div>
                  {workspace.name} ({workspace.code})
                  <div className="text-sm text-gray-600 align-baseline">
                    <PeopleAltOutlinedIcon /> {workspace.patients} Patients
                  </div>
                </div>

                <div className="text-xs text-gray-400">
                  {workspace.dateOfCreation}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </div>
  );
}

export default Workspaces;
