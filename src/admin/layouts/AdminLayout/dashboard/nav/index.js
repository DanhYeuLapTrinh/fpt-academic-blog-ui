import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import { Box, Button, Drawer, Typography, Avatar, Stack } from "@mui/material";

import useResponsive from "../../../../components/hooks/useResponsivee";

import Logo from "../../../../components/atoms/LogoNav";
import NavSection from "../../../../components/organisms/NavSection/NavSection";

import navConfig from "./config";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderContent = (
    <>
      <Box sx={{ px: 2.5, py: 3, textAlign: "center" }}>
        <Link to={"/welcome"}>
          <Typography
            variant="h3"
            sx={{
              color: "#5927e5",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Fblog
          </Typography>
          {/* <Logo /> */}
        </Link>
      </Box>

      <NavSection data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
