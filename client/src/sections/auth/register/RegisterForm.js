import { useEffect, useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
// material
import { Stack, TextField, IconButton, InputAdornment, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component
import Iconify from "../../../components/Iconify";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../redux/actions/authAction";
import { initialRegisterValues, RegisterSchema } from "./register.schema";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { auth } = useSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.token) navigate("/");
  }, [auth.token, navigate]);
  console.log(auth.token);

  const formik = useFormik({
    initialValues: initialRegisterValues,
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      await dispatch(register(values));
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField fullWidth label="First name" {...getFieldProps("firstname")} error={Boolean(touched.firstname && errors.firstname)} helperText={touched.firstname && errors.firstname} />

            <TextField fullWidth label="Last name" {...getFieldProps("lastname")} error={Boolean(touched.lastname && errors.lastname)} helperText={touched.lastname && errors.lastname} />
          </Stack>

          <TextField fullWidth autoComplete="email" type="email" label="Email address" {...getFieldProps("email")} error={Boolean(touched.email && errors.email)} helperText={touched.email && errors.email} />
          <TextField fullWidth autoComplete="username" type="username" label="Username" {...getFieldProps("username")} error={Boolean(touched.username && errors.username)} helperText={touched.username && errors.username} />
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group" {...getFieldProps("gender")}>
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField fullWidth type={"password"} label="Confirm Password" {...getFieldProps("confirmPassword")} error={Boolean(touched.confirmPassword && errors.confirmPassword)} helperText={touched.confirmPassword && errors.confirmPassword} />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default RegisterForm;
