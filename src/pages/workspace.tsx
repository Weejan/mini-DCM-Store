import { useEffect, useState } from "react";
import store from "../store";
import { IWorkspace } from "../mockResponse/workspaceResponse";

function Workspace() {
  const [workspaces, setWorkspaces] = useState<IWorkspace[] | null>(null);
  const { getWorkspaces } = store();

  useEffect(() => {
    const fetchWorkspaces = async () => {
      const data = await getWorkspaces();
      setWorkspaces(data);
    };
    fetchWorkspaces();
  }, [getWorkspaces]);

  return (
    <div id="recent-workshops" className="flex gap-6">
      {workspaces ? (
        workspaces.map((workspace) => (
          <div className="w-[30rem] border   h-[107px] flex flex-col justify-center rounded-sm">
            <div
              className="w-[225px] border h-[100px] rounded-sm "
              key={workspace.id}
            >
              {workspace.name} {workspace.code}
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Workspace;
