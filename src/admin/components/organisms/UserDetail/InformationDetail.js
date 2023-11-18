import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../context/UserContext";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import InformationDetailChildren from "../../molecules/InformationDetail/InformationDetail";
import { toast } from "react-toastify";
import {
  Box,
  Paper,
  TextField,
  Autocomplete,
  Button,
  Chip,
} from "@mui/material";

import { PaperSx, BoxSx, chipStyles } from "./StylesSx";

function InformationDetail() {
  const axiosPrivate = useAxiosPrivate();

  const { id } = useParams();

  const { getUserById, data, setData } = useUserContext();

  const user = getUserById(id);

  const [open, setOpen] = useState(false);

  //---------------------------------------------------------------------------------------

  const [majors, setMajors] = useState([]);

  const [selectedMajor, setSelectedMajor] = useState(user.major);

  const defaultPrevMajor = null;

  const [prevMajor, setPrevMajor] = useState(
    user.major?.id || defaultPrevMajor
  );

  const prevMajorId = prevMajor ?? defaultPrevMajor;

  //---------------------------------------------------------------------------------------

  const [skills, setSkills] = useState([]);

  const [selectedSkills, setSelectedSkills] = useState([]);

  const [filteredSkills, setFilteredSkills] = useState([]);

  const [prevSkills, setPrevSkills] = useState([]);

  //---------------------------------------------------------------------------------------

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

  useEffect(() => {
    if (skills.length && user.skills.length) {
      const userSkillNames = user.skills.map((skill) => skill.skillName);
      const newSkills = skills.filter(
        (skill) => !userSkillNames.includes(skill.skillName)
      );
      setFilteredSkills(newSkills);
    } else {
      setFilteredSkills(skills);
    }
  }, [skills, user.skills]);

  //---------------------------------------------------------------------------------------

  const handleSkillOpen = () => {
    setOpen(true);
  };

  const handleSkillClose = () => {
    setOpen(false);
  };

  const handleDialogSkillAdd = (skill) => {
    setSelectedSkills((prev) => [...prev, skill]);
    setFilteredSkills((prev) => prev.filter((s) => s.id !== skill.id));
  };

  const handleSkillRemove = (skill) => {
    const { id: userId } = user;
    const { id: skillId } = skill;

    const isSkillSelected = selectedSkills.some(
      (selected) => selected.id === skill.id
    );

    if (isSkillSelected) {
      setSelectedSkills((prev) => prev.filter((s) => s.id !== skill.id));
      setPrevSkills((prev) => prev.filter((s) => s !== skill.id));
      setSkills((prev) => [...prev, skill]);
    } else if (window.confirm("Bạn có chắc chắn muốn xóa kỹ năng này?")) {
      handleConfirmRemove(userId, skillId);
    }
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
    console.log("newValue:", newValue);
    setSelectedMajor(newValue);
    // setPrevMajor(newValue.id || defaultPrevMajor);
  };

  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  const handleSubmit = () => {
    const userId = user.id;
    const selectedMajorId = selectedMajor.id;
    const skillList = selectedSkills.map((skill) => skill.id);

    const isMajorChanged = selectedMajorId !== prevMajorId;
    const areSkillsChanged = !arraysEqual(skillList, prevSkills);

    if (isMajorChanged) {
      updateMajor(userId, selectedMajorId);
    } else if (areSkillsChanged) {
      updateSkills(userId, skillList);
    } else if (!isMajorChanged && !areSkillsChanged) {
      toast.info("Không có thay đổi nào được cập nhật.");
    }
  };

  const handleConfirmRemove = async (userId, skillId) => {
    try {
      const res = await axiosPrivate.post(
        process.env.REACT_APP_REMOVE_USER_SKILL,
        { userId, skillId }
      );
      if (res.status === 200) {
        toast.success("Kỹ năng đã được xóa thành công!");

        const updatedData = data.map((user) => {
          if (user.id === userId) {
            const updatedSkills = user.skills.filter(
              (skill) => skill.id !== skillId
            );
            return { ...user, skills: updatedSkills };
          }
          return user;
        });
        setData(updatedData);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa kỹ năng:", error);
    }
  };

  //---------------------------------------------------------------------------------------

  const renderSelectedSkills = () => {
    const allSkills = [...user.skills, ...selectedSkills];
    return allSkills.map((skill) => (
      <Chip
        key={skill.id}
        label={skill.skillName}
        onDelete={() => handleSkillRemove(skill)}
        sx={chipStyles}
      />
    ));
  };

  const renderDialogSkills = () => {
    return filteredSkills.map((skill) => {
      if (!selectedSkills.some((selected) => selected.id === skill.id)) {
        return (
          <Button key={skill.id} onClick={() => handleDialogSkillAdd(skill)}>
            {skill.skillName}
          </Button>
        );
      }
      return null;
    });
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
          disableClearable
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={handleMajorChange}
          renderInput={(params) => (
            <TextField {...params} label={majorDefault} />
          )}
        />

        <TextField label="Vai trò" value={user.role.roleName} disabled />
      </Box>

      {user.role.roleName === "lecturer" && (
        <InformationDetailChildren
          open={open}
          handleSkillOpen={handleSkillOpen}
          handleSkillClose={handleSkillClose}
          renderSelectedSkills={renderSelectedSkills}
          renderDialogSkills={renderDialogSkills}
        />
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
