import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Grid,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  Paper,
  Snackbar,
  InputLabel,
} from "@mui/material";

import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import { toast } from "react-toastify";

export const EditSkill = () => {
  const axiosPrivate = useAxiosPrivate();
  const [skill, setSkill] = useState({
    id: "",
    skillName: "",
  });

  const [skillList, setSkillList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (e) => {
    setSkill({ ...skill, [e.target.name]: e.target.value });
  };

  const fetchData = async () => {
    const res = await axiosPrivate.get(process.env.REACT_APP_VIEW_SKILLS_LIST);
    setSkillList(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (!skill.id) {
      setErrorMessage("Vui lòng chọn một kỹ năng trước khi cập nhật.");
      return;
    }

    if (!skill.skillName) {
      setErrorMessage("Vui lòng nhập thông tin mới cho kỹ năng.");
      return;
    }

    const isDuplicate = skillList.some(
      (sk) => sk.skillName === skill.skillName
    );
    if (isDuplicate) {
      setErrorMessage("Kỹ năng đã tồn tại.");
      return;
    }
    axiosPrivate
      .post(process.env.REACT_APP_EDIT_SKILL, skill)
      .then((res) => {
        const updatedSkillList = [...skillList];
        const index = updatedSkillList.findIndex((sk) => sk.id === skill.id);
        if (index !== -1) {
          updatedSkillList[index].skillName = skill.skillName;
        }
        setSkillList(updatedSkillList);
        setSkill({ id: "", skillName: "" });
        toast.success("Chỉnh sửa kỹ năng thành công");
      })
      .catch((err) => {
        console.log(err);
        toast.success("Chỉnh sửa kỹ năng thất bại");
      });
  }
  const handleSkillSelect = () => {
    if (errorMessage === "Vui lòng chọn một kỹ năng trước khi cập nhật.") {
      setErrorMessage("");
    }
  };

  const handleSkillInput = () => {
    if (errorMessage === "Vui lòng nhập thông tin mới cho kỹ năng.") {
      setErrorMessage("");
    }
  };

  return (
    <Container maxWidth="md">
      <Paper
        sx={{
          padding: 3,
          borderRadius: 1,
          boxShadow: 1,
          backgroundColor: "background.paper",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 4, fontWeight: "bold" }}
        >
          Cập nhật kỹ năng
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <InputLabel>Danh sách kỹ năng đã có: </InputLabel>
            <Select
              fullWidth
              variant="outlined"
              name="id"
              value={skill.id}
              onChange={handleInput}
              onFocus={handleSkillSelect}
            >
              <MenuItem disabled value="">
                Chọn một kỹ năng
              </MenuItem>
              {skillList.map((sk) => (
                <MenuItem key={sk.id} value={sk.id}>
                  {sk.skillName}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={6}>
            <InputLabel>Nội dung kỹ năng mới: </InputLabel>
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              placeholder="Nhập nội dung thay đổi kỹ năng"
              name="skillName"
              value={skill.skillName}
              onChange={handleInput}
              onFocus={handleSkillInput}
            />
          </Grid>
        </Grid>

        <Box mt={3} sx={{ color: "red" }}>
          {errorMessage}
        </Box>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSubmit}
          sx={{ mt: 3, borderRadius: 20 }}
        >
          Cập nhật kỹ năng
        </Button>
      </Paper>
    </Container>
  );
};
