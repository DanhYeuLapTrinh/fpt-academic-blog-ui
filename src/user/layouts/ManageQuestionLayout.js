import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Text from "../components/atoms/Text/Text";
import { Container, FormControl, MenuItem, Select, Stack } from "@mui/material";
import useManagePost from "../hooks/useManagePost";
export default function ManageQuestionLayout() {
  const { sort, setSort, questionType, setQuestionType, qAmount, qApprovedAmount } =
    useManagePost();
  const navigate = useNavigate();
  useEffect(() => {
    if (questionType === "Câu hỏi đang chờ") {
      navigate("/pending-questions");
    } else {
      navigate("/approved-questions");
    }
  }, [questionType]);
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
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
            >
              <MenuItem value="Câu hỏi đang chờ">
                <Link to={"/pending-questions"} style={{ textDecoration: "none" }}>
                  <Text fontSize="14px">Câu hỏi đang chờ</Text>
                </Link>
              </MenuItem>
              <MenuItem value="Câu hỏi đã duyệt">
                <Link to={"/approved-questions"} style={{ textDecoration: "none" }}>
                  <Text fontSize="14px">Câu hỏi đã duyệt</Text>
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
          {questionType === "Câu hỏi đang chờ"
            ? `Đang chờ: ${qAmount}`
            : `Đã duyệt: ${qApprovedAmount}`}
        </Text>
      </Stack>
      <Outlet />
    </Container>
  );
}
