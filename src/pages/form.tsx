import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
  gender: "male" | "female";
  address?: string;
  contact: string;
}

interface IFormProp {
  toggle: () => void;
}

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  age: yup
    .number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer"),
  gender: yup
    .mixed<"male" | "female">()
    .oneOf(["male", "female"], "Gender must be male or female")
    .required(),
  address: yup.string(),
  contact: yup
    .string()
    .required("Contact is required")
    .matches(/^[0-9]+$/, "Contact must be a valid number")
    .min(10, "Contact must be at least 10 digits"),
});
function BasicForm({ toggle }: IFormProp) {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    toggle();
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" flex flex-col justify-center p-6 shadow-2xl rounded-lg"
    >
      <div className="flex text-center">
        <h1 className="text-2xl font-medium">Add Study</h1>
        <div className="w-full justify-end flex my-auto">
          <Button variant="contained" onClick={toggle}>
            Exit
          </Button>
        </div>
      </div>
      <div className="grid grid-flow-row grid-cols-2 gap-8 mt-6">
        <Controller
          name="firstName"
          defaultValue=""
          control={control}
          render={({ field }) => {
            return (
              <TextField
                label="First Name"
                {...field}
                variant="filled"
                error={!!errors.firstName}
                helperText={errors.firstName ? errors.firstName.message : ""}
              />
            );
          }}
        />
        <Controller
          name="lastName"
          defaultValue=""
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                label="Last Name"
                variant="filled"
                error={!!errors.lastName}
                helperText={errors.lastName ? errors.lastName.message : ""}
              />
            );
          }}
        />
        <Controller
          name="age"
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                label="Age"
                variant="filled"
                error={!!errors.age}
                helperText={errors.age ? errors.age.message : ""}
              />
            );
          }}
        />

        <Controller
          name="address"
          defaultValue=""
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                label="Address"
                variant="filled"
                error={!!errors.address}
                helperText={errors.address ? errors.address.message : ""}
              />
            );
          }}
        />

        <Controller
          name="contact"
          defaultValue=""
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                label="Contact"
                variant="filled"
                error={!!errors.contact}
                helperText={errors.contact ? errors.contact.message : ""}
              />
            );
          }}
        />
        <Controller
          name="gender"
          defaultValue="female"
          control={control}
          render={({ field }) => {
            return (
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  {...field}
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            );
          }}
        />
      </div>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}

export default BasicForm;
