import { Link as RouterLink } from "react-router-dom";
import React from "react";

// @mui
import { styled } from "@mui/material/styles";
import { Card, Link, Container, Typography } from "@mui/material";
// hooks
import useResponsive from "../hooks/useResponsive";
// components
import Page from "../components/Page";
import Logo from "../components/Logo";
// sections
import { RegisterForm } from "../sections/auth/register";
import AuthSocial from "../sections/auth/AuthSocial";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

const Register = () => {
  const smUp = useResponsive("up", "sm");

  const mdUp = useResponsive("up", "md");

  return (
    <Page title="Register">
      <RootStyle>
        <HeaderStyle>
          <Logo />
          <Typography variant="body2" sx={{ mt: { md: -2 } }}>
            Already have an account? {""}
            <Link variant="subtitle2" component={RouterLink} to="/login">
              Login
            </Link>
          </Typography>
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h5" sx={{ px: 5, mt: 20, mb: 2 }}>
              Connect and Interact with your friends with Konnect
            </Typography>
            <img alt="register" src="/static/illustrations/illustration_register.png" style={{ objectFit: "contain" }} />
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Get started
            </Typography>

            <Typography sx={{ color: "text.secondary", mb: 5 }}>Meet with other developers</Typography>

            <AuthSocial />

            <RegisterForm />

            <Typography variant="body2" align="center" sx={{ color: "text.secondary", mt: 3 }}>
              By registering, I agree to Devconnect&nbsp;
              <Link underline="always" color="text.primary" href="#">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link underline="always" color="text.primary" href="#">
                Privacy Policy
              </Link>
              .
            </Typography>

            {!smUp && (
              <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
                Already have an account?{" "}
                <Link variant="subtitle2" to="/login" component={RouterLink}>
                  Login
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
};
export default Register;

// import logo from "../images/logo.png";

// const Register = () => {
//   const { auth, alert } = useSelector((state) => state);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const initialState = {
//     fullname: "",
//     username: "",
//     email: "",
//     password: "",
//     cf_password: "",
//     gender: "male",
//   };
//   const [userData, setUserData] = useState(initialState);
//   const { fullname, username, email, password, cf_password } = userData;

//   const [typePass, setTypePass] = useState(false);
//   const [typeCfPass, setTypeCfPass] = useState(false);

//   useEffect(() => {
//     if (auth.token) navigate("/");
//   }, [auth.token, navigate]);

//   const handleChangeInput = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(register(userData));
//   };

//   return (
//     <div className="auth_page">
//       <form onSubmit={handleSubmit}>
//         <div className="d-flex align-items-center justify-content-center mb-4 w-full">
//           <img src={logo} alt="" height={"60px"} width={"auto"} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="fullname">Full Name</label>
//           <input type="text" className="form-control" id="fullname" name="fullname" onChange={handleChangeInput} value={fullname} style={{ background: `${alert.fullname ? "#fd2d6a14" : ""}` }} />

//           <small className="form-text text-danger">{alert.fullname ? alert.fullname : ""}</small>
//         </div>

//         <div className="form-group">
//           <label htmlFor="username">User Name</label>
//           <input type="text" className="form-control" id="username" name="username" onChange={handleChangeInput} value={username.toLowerCase().replace(/ /g, "")} style={{ background: `${alert.username ? "#fd2d6a14" : ""}` }} />

//           <small className="form-text text-danger">{alert.username ? alert.username : ""}</small>
//         </div>

//         <div className="form-group">
//           <label htmlFor="exampleInputEmail1">Email address</label>
//           <input type="email" className="form-control" id="exampleInputEmail1" name="email" onChange={handleChangeInput} value={email} style={{ background: `${alert.email ? "#fd2d6a14" : ""}` }} />

//           <small className="form-text text-danger">{alert.email ? alert.email : ""}</small>
//         </div>

//         <div className="form-group">
//           <label htmlFor="exampleInputPassword1">Password</label>

//           <div className="pass">
//             <input type={typePass ? "text" : "password"} className="form-control" id="exampleInputPassword1" onChange={handleChangeInput} value={password} name="password" style={{ background: `${alert.password ? "#fd2d6a14" : ""}` }} />

//             <small onClick={() => setTypePass(!typePass)}>{typePass ? "Hide" : "Show"}</small>
//           </div>

//           <small className="form-text text-danger">{alert.password ? alert.password : ""}</small>
//         </div>

//         <div className="form-group">
//           <label htmlFor="cf_password">Confirm Password</label>

//           <div className="pass">
//             <input type={typeCfPass ? "text" : "password"} className="form-control" id="cf_password" onChange={handleChangeInput} value={cf_password} name="cf_password" style={{ background: `${alert.cf_password ? "#fd2d6a14" : ""}` }} />

//             <small onClick={() => setTypeCfPass(!typeCfPass)}>{typeCfPass ? "Hide" : "Show"}</small>
//           </div>

//           <small className="form-text text-danger">{alert.cf_password ? alert.cf_password : ""}</small>
//         </div>

//         <div className="row justify-content-between mx-0 mb-1">
//           <label htmlFor="male">
//             Male: <input type="radio" id="male" name="gender" value="male" defaultChecked onChange={handleChangeInput} />
//           </label>

//           <label htmlFor="female">
//             Female: <input type="radio" id="female" name="gender" value="female" onChange={handleChangeInput} />
//           </label>

//           <label htmlFor="other">
//             Other: <input type="radio" id="other" name="gender" value="other" onChange={handleChangeInput} />
//           </label>
//         </div>

//         <button type="submit" className="btn btn-dark w-100">
//           Register
//         </button>

//         <p className="my-2">
//           Already have an account?{" "}
//           <Link to="/" style={{ color: "crimson" }}>
//             Login Now
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Register;
