import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CategoryTitle from "../../atoms/CategoryTitle/CategoryTitle";

import { useCategoriesContext } from "../../../context/CategoriesContext";

function ViewCategoriesList({
  categories,
  selectedCategory,
  selectedSemester,
  selectedSubject,
  handleSelectCategory,
  handleSelectSemester,
  handleRadioCategoryChange,
  handleRadioSubjectChange,
  openDeleteModal,
  openDeleteSubjectModal,
  openEditCategoryModal,
  selectedRadioCategory,
  setSelectedRadioCategory,
  selectedRadioSubject,
  setSelectedRadioSubject,
  setIsEditCategoryModalOpen,
}) {
  const {
    isSemesterVisible,
    setSemesterVisible,
    isSubjectVisible,
    setSubjectVisible,
  } = useCategoriesContext();

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      handleSelectCategory(null);
      setSemesterVisible(false);
      setSubjectVisible(false);
      setSelectedRadioCategory(null);
    } else {
      handleSelectCategory(category);
      setSemesterVisible(true);
      setSelectedRadioCategory(null);
    }
  };

  const handleSemesterClick = (semester) => {
    if (selectedSemester === semester) {
      handleSelectSemester(null);
      setSubjectVisible(false);
    } else {
      handleSelectSemester(semester);
      setSubjectVisible(true);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <CategoryTitle title="Chuyên ngành" />

        <List>
          {categories.map((category) => (
            <ListItem
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              sx={{
                cursor: "pointer",
                boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
                margin: "8px 0",
                borderRadius: "20px",
                backgroundColor:
                  selectedCategory === category ? "primary.light" : "inherit",
              }}
            >
              <ListItemIcon>
                <Radio
                  checked={selectedRadioCategory === category.id}
                  onChange={() => {
                    if (selectedRadioCategory !== category.id) {
                      handleRadioCategoryChange(category);
                    }
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={category.categoryName} />
              {selectedRadioCategory === category.id && (
                <>
                  <EditIcon
                    onClick={() => openEditCategoryModal(category)}
                    sx={{ cursor: "pointer", color: "primary.main" }}
                  />
                  <DeleteIcon
                    onClick={() => openDeleteModal(category)}
                    sx={{ cursor: "pointer", color: "error.main" }}
                  />
                </>
              )}
            </ListItem>
          ))}
        </List>
      </Grid>

      {isSemesterVisible && (
        <Grid item xs={12} md={4}>
          <CategoryTitle title="Học kỳ" />
          <List>
            {selectedCategory &&
              selectedCategory.childCategories.map((semester) => (
                <ListItem
                  key={semester.id}
                  onClick={() => handleSemesterClick(semester)}
                  sx={{
                    cursor: "pointer",
                    boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
                    margin: "8px 0",
                    borderRadius: "20px",
                    backgroundColor:
                      selectedSemester === semester
                        ? "primary.light"
                        : "inherit",
                  }}
                >
                  <ListItemText primary={semester.categoryName} />
                </ListItem>
              ))}
          </List>
        </Grid>
      )}

      {isSubjectVisible && (
        <Grid item xs={12} md={4}>
          <CategoryTitle title="Môn học" />
          <List>
            {selectedSemester &&
              selectedSemester.childCategories.map((subject) => (
                <ListItem
                  key={subject.id}
                  sx={{
                    cursor: "pointer",
                    boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
                    margin: "8px 0",
                    borderRadius: "20px",
                  }}
                >
                  <ListItemIcon>
                    <Radio
                      checked={selectedRadioSubject === subject.id}
                      onChange={() => {
                        if (selectedRadioSubject !== subject.id) {
                          handleRadioSubjectChange(subject);
                        }
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={subject.categoryName}
                    sx={{ flexGrow: 1 }}
                  />
                  {selectedRadioSubject === subject.id && (
                    <>
                      <EditIcon
                        onClick={() => openEditCategoryModal(subject)}
                        sx={{ cursor: "pointer", color: "primary.main" }}
                      />
                      <DeleteIcon
                        onClick={() => openDeleteSubjectModal(subject)}
                        sx={{ cursor: "pointer", color: "error.main" }}
                      />
                    </>
                  )}
                </ListItem>
              ))}
          </List>
        </Grid>
      )}
    </Grid>
  );
}

export default ViewCategoriesList;
