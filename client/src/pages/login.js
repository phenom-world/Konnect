import React from "react";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Card, Link, Container, Typography } from "@mui/material";
// hooks
import useResponsive from "../hooks/useResponsive";
// components
import Page from "../components/Page";
import Logo from "../components/Logo";
// sections
import { LoginForm } from "../sections/auth/login";
import AuthSocial from "../sections/auth/AuthSocial";

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
  margin: theme.spacing(2, 0, 2, 2),
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

const Login = () => {
  const smUp = useResponsive("up", "sm");

  const mdUp = useResponsive("up", "md");

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Logo />
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Don’t have an account? {""}
              <Link variant="subtitle2" component={RouterLink} to="/register">
                Get started
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h5" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/static/illustrations/illustration_login.png" alt="login" />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Typography variant="h5" gutterBottom>
              Sign in to Konnect
            </Typography>

            <Typography sx={{ color: "text.secondary", mb: 5 }}>Enter your details below.</Typography>

            <AuthSocial />

            <LoginForm />

            {!smUp && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?{" "}
                <Link variant="subtitle2" component={RouterLink} to="/register">
                  Get started
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
  // return (
  //   <div className="auth_page">
  //     <form onSubmit={handleSubmit}>
  //       <div className="d-flex align-items-center justify-content-center mb-4 w-full">
  //         <img src={logo} alt="" height={"60px"} width={"auto"} />
  //       </div>

  //       <div className="form-group">
  //         <label htmlFor="exampleInputEmail1">Email address</label>
  //         <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" onChange={handleChangeInput} value={email} />

  //         <small id="emailHelp" className="form-text text-muted">
  //           We'll never share your email with anyone else.
  //         </small>
  //       </div>

  //       <div className="form-group">
  //         <label htmlFor="exampleInputPassword1">Password</label>

  //         <div className="pass">
  //           <input type={typePass ? "text" : "password"} className="form-control" id="exampleInputPassword1" onChange={handleChangeInput} value={password} name="password" />

  //           <small onClick={() => setTypePass(!typePass)}>{typePass ? "Hide" : "Show"}</small>
  //         </div>
  //       </div>

  //       <button type="submit" className="btn btn-dark w-100" disabled={email && password ? false : true}>
  //         Login
  //       </button>

  //       <p className="my-2">
  //         You don't have an account?{" "}
  //         <Link to="/register" style={{ color: "crimson" }}>
  //           Register Now
  //         </Link>
  //       </p>
  //     </form>
  //   </div>
  // );
};

export default Login;
