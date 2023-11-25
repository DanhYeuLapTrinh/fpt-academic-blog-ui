import { Box, Tab, Tabs } from "@mui/material";
import React from "react";

function TabsTable({
  value,
  handleChangeFilter,
  allUsersCount,
  bannedUsersCount,
}) {
  return (
    <Tabs
      value={value}
      onChange={handleChangeFilter}
      variant="scrollable"
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        ".MuiTabs-indicator": {
          height: 2,
        },
        ".Mui-selected": {
          color: "primary.main",
        },
      }}
    >
      <Tab
        iconPosition="end"
        label={
          <>
            Tất cả
            <Box
              sx={{
                ml: 1,
                py: 0.5,
                px: 1,
                borderRadius: 1,
                color: "white",
                bgcolor: "primary.main",
              }}
            >
              {allUsersCount}
            </Box>
          </>
        }
        sx={{
          py: 2,
          minWidth: 0,
          color: "text.primary",
          fontWeight: "bold",
          textTransform: "none",
          fontSize: "1rem",
        }}
      />

      <Tab
        iconPosition="end"
        label={
          <>
            Bị cấm
            <Box
              sx={{
                ml: 1,
                py: 0.5,
                px: 1,
                borderRadius: 1,
                color: "white",
                bgcolor: "error.main",
              }}
            >
              {bannedUsersCount}
            </Box>
          </>
        }
        sx={{
          py: 2,
          minWidth: 0,
          color: "text.primary",
          fontWeight: "bold",
          textTransform: "none",
          fontSize: "1rem",
        }}
      />
    </Tabs>
  );
}

export default TabsTable;
