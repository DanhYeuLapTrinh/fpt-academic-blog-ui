import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TitleHeader from "../../atoms/TitleHeader/TitleHeader";
import { Chip, Box, Typography } from "@mui/material";
import AddNewButton from "../../atoms/ButtonHeader/AddNewButton";
import AddSkillForm from "../../molecules/Skills/AddSkillForm";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import {
  skillsContainer,
  skillItem,
  container,
  item,
  divHeader,
} from "./StylesSx";

const SkillsPage = ({ skillsData, setSkillsData }) => {
  const axiosPrivate = useAxiosPrivate();

  const [open, setOpen] = useState(false);

  const [newSkillName, setNewSkillName] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewSkillName("");
    setErrorMessage("");
  };

  const handleAddSkill = () => {
    if (newSkillName.trim() === "") {
      setErrorMessage("Kỹ năng không được bỏ trống.");
      return;
    }

    const isDuplicate = skillsData.some(
      (skill) => skill.skillName === newSkillName
    );
    if (isDuplicate) {
      setErrorMessage("Kỹ năng đã tồn tại.");
      return;
    }

    axiosPrivate
      .post(process.env.REACT_APP_ADD_SKILL, { skillName: newSkillName })
      .then((response) => {
        const newSkill = response.data;
        setSkillsData([...skillsData, newSkill]);
        handleClose();
        toast.success(`Thêm thẻ "${newSkillName}" thành công`);
      })
      .catch((error) => {
        console.error("Error adding tag: " + error);
        toast.error(`Thêm thẻ "${newSkillName}" không thành công`);
      });
  };

  return (
    <>
      <div style={divHeader}>
        <TitleHeader title="Danh sách kỹ năng" />
        <AddNewButton title="Thêm kỹ năng mới" handleClick={handleClickOpen} />
        <AddSkillForm
          open={open}
          handleClose={handleClose}
          handleAddSkill={handleAddSkill}
          errorMessage={errorMessage}
          newSkillName={newSkillName}
          skillsData={(e) => setNewSkillName(e.target.value)}
        />
      </div>
      <Box border={1} borderColor="#ddd" borderRadius={2} p={2}>
        <motion.ul
          variants={container}
          initial="hidden"
          animate="show"
          style={skillsContainer}
        >
          {skillsData.map((skill) => (
            <motion.li variants={item} key={skill.id}>
              <Chip style={skillItem} label={skill.skillName} />
            </motion.li>
          ))}
        </motion.ul>
      </Box>
    </>
  );
};

export default SkillsPage;
