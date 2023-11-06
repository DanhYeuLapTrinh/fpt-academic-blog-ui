import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Text from "../components/atoms/Text/Text";
import { Container, FormControl, MenuItem, Select, Stack } from "@mui/material";
import useManagePost from "../hooks/useManagePost";
export default function ManagePostLayout() {
  const { sort, setSort, type, setType, amount, approvedAmount } =
    useManagePost();
  const navigate = useNavigate();
  useEffect(() => {
    if (type === "Bài viết đang chờ") {
      navigate("/pending-posts");
    } else {
      navigate("/approved-posts");
    }
  }, [type]);
  return (
    <Container sx={{ mt: "30px", minHeight: "calc(100vh - 93px)" }}>
      <Stack
        spacing={1}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} spacing={1}>
          <FormControl>
            <Select
              sx={{ height: "30px", pr: "5px" }}
              IconComponent={KeyboardArrowDownIcon}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="Bài viết đang chờ">
                <Link to={"/pending-posts"} style={{ textDecoration: "none" }}>
                  <Text fontSize="14px">Bài viết đang chờ</Text>
                </Link>
              </MenuItem>
              <MenuItem value="Bài viết đã duyệt">
                <Link to={"/approved-posts"} style={{ textDecoration: "none" }}>
                  <Text fontSize="14px">Bài viết đã duyệt</Text>
                </Link>
              </MenuItem>
            </Select>
          </FormControl>
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
        <Text fontSize="13px">
          {type === "Bài viết đang chờ"
            ? `Đang chờ: ${amount}`
            : `Đã duyệt: ${approvedAmount}`}
        </Text>
      </Stack>
      <Outlet />
    </Container>
  );
}
