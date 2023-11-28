import React, { useState } from "react";
import { motion } from "framer-motion";
import TitleHeader from "../../atoms/TitleHeader/TitleHeader";
import { Chip, Box, TextField, Typography } from "@mui/material";
import AddNewButton from "../../atoms/ButtonHeader/AddNewButton";
import AddSkillForm from "../../molecules/Skills/AddSkillForm";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import ConfirmDialog from "../../molecules/ReportedComment/ConfirmDialog";
import { toast } from "react-toastify";
import { useSkillsContext } from "../../../context/SkillsContext";
import SearchIcon from "@mui/icons-material/Search";
import {
  skillsContainer,
  skillItem,
  container,
  item,
  divHeader,
} from "./StylesSx";

const SkillsPage = ({ fetchData }) => {
  const axiosPrivate = useAxiosPrivate();

  const {
    skillsData,
    setSkillsData,
    open,
    setOpen,
    idToDelete,
    setIdToDelete,
    newSkillName,
    setNewSkillName,
    errorMessage,
    setErrorMessage,
    deleteDialogOpen,
    setDeleteDialogOpen,
  } = useSkillsContext();

  const [searchTerm, setSearchTerm] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewSkillName("");
    setErrorMessage("");
  };

  const handleAddSkill = async () => {
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

    await axiosPrivate
      .post(process.env.REACT_APP_ADD_SKILL, { skillName: newSkillName })
      .then((response) => {
        const newSkill = response.data;
        setSkillsData([...skillsData, newSkill]);
        toast.success(`Thêm thẻ thành công`);
        fetchData();
        handleClose();
      })
      .catch((error) => {
        console.error("Error adding tag: " + error);
        toast.error(`Thêm thẻ không thành công`);
      });
  };

  const handleDeleteSkill = async () => {
    try {
      await axiosPrivate
        .post(process.env.REACT_APP_DELETE_SKILL, { id: idToDelete })
        .then((response) => {
          if (response.status === 200) {
            toast.success(`Xóa thẻ thành công`);
            setSkillsData(
              skillsData.filter((skill) => skill.id !== idToDelete)
            );
          }
          setDeleteDialogOpen(false);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            toast.error(`Không tìm thấy kỹ năng`);
          } else if (error.response.status === 409) {
            toast.error(`Không thể xóa do kỹ năng đã được sử dụng`);
          } else {
            toast.error(`Xóa thẻ không thành công`);
          }
          setDeleteDialogOpen(false);
        });
    } catch (error) {
      console.error("Error deleting skill: " + error);
      toast.error(`Xóa thẻ không thành công`);
      setDeleteDialogOpen(false);
    }
  };

  const openDelete = (id) => {
    setIdToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleSearchSkill = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const filteredSkills = skillsData.filter((skill) =>
    skill.skillName.toLowerCase().includes(searchTerm)
  );

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

      <TextField
        className="search-input"
        placeholder="Tìm kiếm kỹ năng..."
        type="text"
        variant="outlined"
        fullWidth
        sx={{
          padding: 1.5,
          fontSize: 13,
        }}
        onChange={handleSearchSkill}
        InputProps={{
          startAdornment: <SearchIcon sx={{ marginRight: 1 }} />,
        }}
      />

      <Box border={1} borderColor="#ddd" borderRadius={2} p={2}>
        <motion.ul
          variants={container}
          initial="hidden"
          animate="show"
          style={skillsContainer}
        >
          {filteredSkills.length > 0 ? (
            filteredSkills.map((skill) => (
              <motion.li variants={item} key={skill.id}>
                <Chip
                  style={skillItem}
                  label={
                    searchTerm.length > 0 ? (
                      <span>
                        {skill.skillName
                          .split(new RegExp(`(${searchTerm})`, "gi"))
                          .map((part, index) =>
                            part.toLowerCase() === searchTerm.toLowerCase() ? (
                              <mark key={index}>{part}</mark>
                            ) : (
                              part
                            )
                          )}
                      </span>
                    ) : (
                      skill.skillName
                    )
                  }
                  onDelete={() => openDelete(skill.id)}
                />
              </motion.li>
            ))
          ) : (
            <Box mt={2}>
              <Typography variant="body1">
                Không tìm thấy kỹ năng nào.
              </Typography>
            </Box>
          )}
        </motion.ul>
      </Box>

      <ConfirmDialog
        open={deleteDialogOpen}
        onConfirm={handleDeleteSkill}
        onCancel={handleCancel}
        title="Xóa kỹ năng"
        content={
          <span>
            Bạn có chắc chắn <span style={{ fontWeight: "bolder" }}>XÓA</span>{" "}
            kỹ năng này?
          </span>
        }
      />
    </>
  );
};

export default SkillsPage;
