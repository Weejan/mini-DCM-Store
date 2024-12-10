import { Button, TextField } from "@mui/material";
import { useState } from "react";
import useStore from "../store";
import { useNavigate } from "react-router-dom";
import { TUserType } from "../state/authSlice";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const { doLogin, getPermission } = useStore();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await doLogin(form);
    if (response) {
      const permissionResponse = await getPermission(
        response.role as TUserType
      );
      if (permissionResponse) {
        navigate("/");
      }
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center gap-12 p-10">
      <h1 className="font-medium text-[40px]">Mini DCM Store</h1>
      <h1 className="font-medium text-[30px]">Login</h1>
      <form
        className="flex  flex-col justify-center items-center gap-4 w-[400px] border-2 rounded-xl px-4 py-10  drop-shadow-sm "
        onSubmit={handleSubmit}
      >
        <TextField
          className="w-full"
          id="email"
          name="email"
          label="email"
          variant="filled"
          onChange={handleChange}
          value={form.email}
        />
        <TextField
          className="w-full"
          id="password"
          label="password"
          name="password"
          variant="filled"
          value={form.password}
          onChange={handleChange}
        />

        <Button variant="contained" type="submit">
          login
        </Button>
      </form>
    </div>
  );
}

export default Login;
