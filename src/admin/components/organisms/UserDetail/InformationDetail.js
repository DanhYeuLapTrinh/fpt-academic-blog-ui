import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../context/UserContext";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import {
  Box,
  Paper,
  Stack,
  TextField,
  Autocomplete,
  Button,
} from "@mui/material";

import { PaperSx, BoxSx } from "./StylesSx";

function InformationDetail() {
  const { id } = useParams();

  const { getUserById } = useUserContext();

  const user = getUserById(id);

  const [majors, setMajors] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate
      .get(process.env.REACT_APP_MAJORS_LIST)
      .then((response) => {
        setMajors(response.data);
        console.log("Danh sách majors", response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải danh sách majors", error);
      });
  }, []);

  const handleChange = (event) => {
    // Handle changes here
  };

  const handleSubmit = () => {
    // Handle submit action here
  };

  return (
    <Paper sx={PaperSx}>
      <Box sx={BoxSx}>
        <TextField label="Tên tài khoản" value={user.username} disabled />
        <TextField label="Tên đầy đủ" value={user.fullname} disabled />
        <TextField label="Số điện thoại" value={user.phone || ""} disabled />
        <TextField label="Email" value={user.email} disabled />
        <Autocomplete
          options={majors}
          getOptionLabel={(option) => option.majorName}
          renderInput={(params) => <TextField {...params} label="Ngành" />}
        />
        <TextField label="Vai trò" value={user.role.roleName} disabled />
      </Box>

      <Stack direction="row" justifyContent="flex-end">
        <div>Đây là skill của user</div>
        <Button variant="contained" onClick={handleSubmit}>
          Lưu thay đổi
        </Button>
      </Stack>
    </Paper>
  );
}

export default InformationDetail;
