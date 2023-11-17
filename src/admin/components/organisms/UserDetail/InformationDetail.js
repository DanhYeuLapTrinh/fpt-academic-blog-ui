import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../context/UserContext";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import {
  Box,
  Paper,
  Stack,
  TextField,
  Autocomplete,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { PaperSx, BoxSx } from "./StylesSx";

function InformationDetail() {
  const { id } = useParams();

  const { getUserById } = useUserContext();

  const user = getUserById(id);

  const [majors, setMajors] = useState([]);

  const [skills, setSkills] = useState([]);

  const [selectedSkills, setSelectedSkills] = useState([]);

  const [open, setOpen] = useState(false);

  const [selectedMajor, setSelectedMajor] = useState(user.major);

  const defaultPrevMajor = null;

  const [prevMajor, setPrevMajor] = useState(
    user.major?.id || defaultPrevMajor
  );

  const prevMajorId = prevMajor ?? defaultPrevMajor;

  const [prevSkills, setPrevSkills] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  const getMajorName = (majors) => {
    if (!majors) return "Chưa có chuyên ngành";

    return majors.majorName;
  };

  const getMajorId = (majors) => {
    if (!majors) return null;

    return majors.id;
  };

  const majorDefault = getMajorName(user.major);

  //---------------------------------------------------------------------------------------

  const fetchData = async () => {
    try {
      const resMajor = await axiosPrivate.get(
        process.env.REACT_APP_MAJORS_LIST
      );
      setMajors(resMajor.data);

      const resSkill = await axiosPrivate.get(
        process.env.REACT_APP_VIEW_SKILLS_LIST
      );
      setSkills(resSkill.data);
    } catch (error) {
      console.error("Có lỗi xảy ra trong quá trình lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //---------------------------------------------------------------------------------------

  const handleSkillOpen = () => {
    setOpen(true);
  };

  const handleSkillClose = () => {
    setOpen(false);
  };

  const handleSkillAdd = (skill) => {
    setSelectedSkills((prev) => [...prev, skill]);
    setPrevSkills((prev) => [...prev, skill.id]);
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleSkillRemove = (skill) => {
    setSelectedSkills((prev) => prev.filter((s) => s !== skill));
    setPrevSkills((prev) => prev.filter((s) => s !== skill.id));
    setSkills((prev) => [...prev, skill]);
  };

  const updateSkills = async (userId, skillList) => {
    try {
      const res = await axiosPrivate.post(process.env.REACT_APP_SET_SKILL, {
        userId,
        skillList,
      });

      if (res.status === 200) {
        toast.success("Cập nhật kỹ năng thành công!");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật kỹ năng:", error);
    }
  };

  const updateMajor = async (userId, majorID) => {
    try {
      const res = await axiosPrivate.post(process.env.REACT_APP_SET_MAJOR, {
        id: userId,
        majorID,
      });

      if (res.status === 200) {
        toast.success("Cập nhật ngành thành công!");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật ngành", error);
    }
  };

  const handleMajorChange = (event, newValue) => {
    setPrevMajor(newValue.id || defaultPrevMajor);
    setSelectedMajor(newValue);
  };

  const handleSubmit = () => {
    const userId = user.id;
    const selectedMajorId = selectedMajor.id;
    const skillList = selectedSkills.map((skill) => skill.id);

    updateMajor(userId, selectedMajorId);

    if (!arraysEqual(skillList, prevSkills)) {
      updateSkills(userId, skillList);
    }
  };

  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  //---------------------------------------------------------------------------------------

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
          value={selectedMajor}
          getOptionSelected={(option, value) => option.id === value.id}
          onChange={handleMajorChange}
          renderInput={(params) => (
            <TextField {...params} label={majorDefault} />
          )}
        />

        <TextField label="Vai trò" value={user.role.roleName} disabled />
      </Box>

      {user.role.roleName === "lecturer" && (
        <>
          <Typography variant="h6" mt={4}>
            Kỹ năng
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            sx={{
              padding: "1rem",
              border: "1px solid #ccc",
              mt: 0.5,
              borderRadius: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {selectedSkills.map((skill) => (
                <Chip
                  key={skill.id}
                  label={skill.skillName}
                  onDelete={() => handleSkillRemove(skill)}
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>

            <IconButton onClick={handleSkillOpen}>
              <AddIcon />
            </IconButton>

            <Dialog
              open={open}
              onClose={handleSkillClose}
              sx={{
                "& .MuiDialog-paper": {
                  p: 2,
                  maxWidth: "xs",
                },
              }}
            >
              <DialogTitle>Chọn kỹ năng</DialogTitle>
              <DialogContent>
                {skills.map((skill) => (
                  <Button key={skill.id} onClick={() => handleSkillAdd(skill)}>
                    {skill.skillName}
                  </Button>
                ))}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleSkillClose}>Đóng</Button>
              </DialogActions>
            </Dialog>
          </Stack>
        </>
      )}

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          mt: 5,
          bgcolor: "black",
          color: "white",
          "&:hover": { bgcolor: "black" },
        }}
      >
        Lưu thay đổi
      </Button>
    </Paper>
  );
}

export default InformationDetail;
