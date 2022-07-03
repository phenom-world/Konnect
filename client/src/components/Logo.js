import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  const logo = <Box component="img" src="/static/logo.png" height={{ xs: 40, md: 40, lg: 60 }} width="auto" padding="0px" style={{ filter: "invert(25%) sepia(77%) saturate(4623%) hue-rotate(200deg) brightness(99%) contrast(80%)" }} />;

  if (disabledLink) {
    return <>{logo}</>;
  }
  return <RouterLink to="/">{logo}</RouterLink>;
}
