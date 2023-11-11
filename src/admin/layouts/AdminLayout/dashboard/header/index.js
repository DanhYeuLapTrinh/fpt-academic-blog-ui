import PropTypes from "prop-types";

import { styled } from "@mui/material/styles";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";
import { Box, Stack, AppBar, Toolbar, IconButton } from "@mui/material";

import { bgBlur } from "../../../../components/molecules/CssStyles/cssStyle";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import { breadCrumbsRoutes } from "./Breadcrumbs";
import { useLocation } from "react-router-dom";

import Iconify from "../../../../components/atoms/Iconify";
import AccountPopover from "./AccountPopover";
import Link from "@mui/material/Link";

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: "none",
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
  borderBottom: `solid 1px ${theme.palette.divider}`,
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const location = useLocation();

  const currentRoute = location.pathname;

  const routes = breadCrumbsRoutes.filter((route) => {
    return currentRoute.includes(route.path);
  });

  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: "text.primary",
            display: { lg: "none" },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            underline="none"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>
          {routes.map((route, index) => (
            <Link
              key={index}
              color="inherit"
              underline="none"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {route.icon}
              {route.label}
            </Link>
          ))}
        </Breadcrumbs>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
