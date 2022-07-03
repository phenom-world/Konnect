import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  firstname: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("First name required"),
  lastname: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Last name required"),
  email: Yup.string().email("Email must be a valid email address").required("Email is required"),
  username: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Username is required"),
  gender: Yup.string().required("Gender is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/^(?=.{8,})/, "Must Contain 8 Characters or more"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Password confirm is required"),
});

export const initialRegisterValues = {
  firstname: "",
  lastname: "",
  username: "",
  gender: "",
  email: "",
  password: "",
  confirmPassword: "",
};
