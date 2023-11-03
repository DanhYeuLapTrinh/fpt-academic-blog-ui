import { Container, FormControl, MenuItem, Select, Stack } from "@mui/material";
import React from "react";
import useManagePost from "../hooks/useManagePost";
import { Link, Outlet } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Text from "../components/atoms/Text/Text";
export default function ManagePostLayout() {
  const { pendingPosts, approvedPosts, sort, setSort, amount, approvedAmount } =
    useManagePost();
  return (
    <Container sx={{ mt: "30px", minHeight: "calc(100vh - 93px)" }}>
      <Stack
        spacing={1}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <FormControl>
          <Select
            sx={{ height: "30px", pr: "5px" }}
            IconComponent={KeyboardArrowDownIcon}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <MenuItem value="Mới nhất">
              <Text fontSize="14px">Mới nhất</Text>
            </MenuItem>
            <MenuItem value="Cũ nhất">
              <Text fontSize="14px">Cũ nhất</Text>
            </MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Outlet />
    </Container>
  );
}
