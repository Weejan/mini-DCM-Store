import { IWorkspace } from "../mockResponse/workspaceResponse";
import useStore from "../store";

function InfoCard() {
  const { currentWorkspace } = useStore();
  if (!currentWorkspace) return;
  return (
    <div className=" flex flex-col h-[150px] rounded-2xl shadow-lg w-full bg-white py-6 px-7 gap-5">
      <div className="flex justify-between">
        <div className="font-medium text-2xl">{currentWorkspace?.name}</div>
      </div>
      <div className="flex">
        {Object.keys(currentWorkspace!).map((key) => (
          <ul className="w-full flex justify-between">
            <li key={key} className="flex flex-col justify-between">
              <span className="font-meduium text-gray-400 capitalize">
                {key}
              </span>
              <span>{currentWorkspace![key as keyof IWorkspace]}</span>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default InfoCard;
