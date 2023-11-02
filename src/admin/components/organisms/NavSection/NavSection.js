import React from "react";
import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";

import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";

import {
  StyledNavItem,
  StyledNavItemIcon,
} from "../../atoms/NavSection/Styles";

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  const [openItems, setOpenItems] = React.useState({});

  const handleClick = (item) => {
    setOpenItems((prevOpenItems) => ({
      ...prevOpenItems,
      [item.title]: !prevOpenItems[item.title],
    }));
  };

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => {
          const isItemOpen = openItems[item.title];

          if (item.items) {
            return (
              <React.Fragment key={item.title}>
                <ListItemButton onClick={() => handleClick(item)}>
                  <ListItemIcon>{item.icon && item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                  {isItemOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={isItemOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.items.map((subItem) => (
                      <ListItemButton
                        key={subItem.title}
                        sx={{ pl: 4 }}
                        component={RouterLink}
                        to={subItem.path}
                      >
                        <ListItemIcon>{subItem.icon}</ListItemIcon>
                        <ListItemText primary={subItem.title} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            );
          } else {
            return (
              <ListItemButton
                key={item.title}
                component={RouterLink}
                to={item.path}
                sx={{
                  "&.active": {
                    color: "text.primary",
                    bgcolor: "action.selected",
                    fontWeight: "fontWeightBold",
                  },
                }}
              >
                <ListItemIcon>{item.icon && item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
                {item.info && item.info}
              </ListItemButton>
            );
          }
        })}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        "&.active": {
          color: "text.primary",
          bgcolor: "action.selected",
          fontWeight: "fontWeightBold",
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
