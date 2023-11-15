import React from "react";
import Paper from "@mui/material/Paper";
import Text from "../../atoms/Text/Text";
import { Link } from "react-router-dom";
import { Button, Stack } from "@mui/material";
export default function PopupEdit(props) {
  return (
    <Paper
      sx={{
        mt: "20px",
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack spacing={1} direction={"row"}>
        <Stack>
          <Text fontSize="30px">Thông báo</Text>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Text fontWeight="400">
              Đây là một bài viết đã được chỉnh sửa dựa trên bài có tên:{" "}
            </Text>
            <Link
              to={`/view/${props.oldLink}`}
              style={{ textDecoration: "none" }}
            >
              <Text
                color="secondary.main"
                padding="4px 8px"
                bgcolor="primary.main"
                borderRadius="10px"
              >
                {props.oldName}
              </Text>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}
