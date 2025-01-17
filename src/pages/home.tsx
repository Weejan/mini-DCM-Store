import Studies from "./studies";
import Workspaces from "./workspaces";
function Home() {
  return (
    <div className="flex flex-col w-full min-h-[93vh] bg-blue-50">
      <div className="w-[97%] mx-auto mt-6">
        <Workspaces />
      </div>

      <div className="w-[97%] mx-auto  mt-6">
        <Studies />
      </div>
    </div>
  );
}

export default Home;
