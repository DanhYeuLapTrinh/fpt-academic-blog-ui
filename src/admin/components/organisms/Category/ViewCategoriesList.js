import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

function ViewCategoriesList({
  categories,
  selectedCategory,
  selectedSemester,
  selectedSubject,
  selectedRadioCategory,
  selectedRadioSubject,
  handleSelectCategory,
  handleSelectSemester,
  handleRadioCategoryChange,
  handleRadioSubjectChange,
  openDeleteModal,
  openDeleteSubjectModal,
}) {
  const [isSemesterVisible, setSemesterVisible] = useState(false);
  const [isSubjectVisible, setSubjectVisible] = useState(false);

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      handleSelectCategory(null);
      setSemesterVisible(false);
      setSubjectVisible(false);
    } else {
      handleSelectCategory(category);
      setSemesterVisible(true);
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
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
          border: "1px solid #ccc",
          margin: 2,
          borderRadius: 8,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Chuyên ngành
        </Typography>
        <List>
          {categories.map((category) => (
            <ListItem
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              button
              sx={{
                cursor: "pointer",
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
                <DeleteIcon
                  onClick={() => openDeleteModal(category)}
                  sx={{ cursor: "pointer", color: "error.main" }}
                />
              )}
            </ListItem>
          ))}
        </List>
      </Grid>

      {isSemesterVisible && (
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
            border: "1px solid #ccc",
            margin: 2,
            borderRadius: 8,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Học kỳ
          </Typography>
          <List>
            {selectedCategory &&
              selectedCategory.childCategories.map((semester) => (
                <ListItem
                  key={semester.id}
                  onClick={() => handleSemesterClick(semester)}
                  button
                  sx={{
                    cursor: "pointer",
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
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
            border: "1px solid #ccc",
            margin: 2,
            borderRadius: 8,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Môn học
          </Typography>
          <List>
            {selectedSemester &&
              selectedSemester.childCategories.map((subject) => (
                <ListItem
                  key={subject.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 2,
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
                    <DeleteIcon
                      onClick={() => openDeleteSubjectModal(subject)}
                      sx={{ cursor: "pointer", color: "error.main" }}
                    />
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
