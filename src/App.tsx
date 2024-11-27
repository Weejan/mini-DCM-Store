import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import useRoutes from "./Routes/useRoutes";
import AppLayout from "./AppLayout";
import useStore from "./store";

interface IProtectedRoutesProps {
  token: string | null;
}

const ProtectedRoutes = ({ token }: IProtectedRoutesProps) => {
  if (!token) return <Navigate to="/login" replace />;
  return <AppLayout />;
};

function App() {
  const { token } = useStore();
  const routes = useRoutes();
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoutes token={token} />}>
          {routes}
        </Route>
      </Routes>
    </>
  );
}

export default App;
