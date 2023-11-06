import React, { useState } from "react";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Modal,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";

export default function EditCategoryModal({
  category,
  closeModal,
  open,
  categories,
  fetchData,
}) {
  const [categoryName, setCategoryName] = useState(category.categoryName);
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (categories && categories.length > 0) {
      const isCategoryNameConflict = categories.some(
        (cat) => cat.categoryName === categoryName && cat.id !== category.id
      );

      if (isCategoryNameConflict) {
        toast.error("Category name already exists");
      } else {
        const isSubjectNameConflict = categories.some(
          (cat) =>
            cat.subjects &&
            cat.subjects.some(
              (subject) =>
                subject.categoryName === categoryName && cat.id !== category.id
            )
        );

        if (isSubjectNameConflict) {
          toast.error("Category name conflicts with subjects");
        } else {
          try {
            await axiosPrivate.post(process.env.REACT_APP_EDIT_CATEGORY, {
              id: category.id,
              categoryName: categoryName,
            });
            fetchData();
            toast.success("Category updated successfully");
            closeModal();
          } catch (error) {
            toast.error("Failed to update category");
          }
        }
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="edit-category-modal"
      aria-describedby="edit-category-description"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FormControl
        sx={{
          bgcolor: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "400px",
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormHelperText
          variant="h1"
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: 5,
            color: "black",
          }}
          id="my-helper-text"
        >
          Nhập tên danh mục mới
        </FormHelperText>
        <TextField
          variant="outlined"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />

        <div style={{ display: "flex" }}>
          <Button
            sx={{
              marginTop: 2,
              marginRight: 2,
              bgcolor: "green",
              color: "white",
              "&:hover": {
                bgcolor: "green",
                transform: "scale(1.1)",
              },
            }}
            type="submit"
            onClick={handleSubmit}
          >
            Lưu
          </Button>
          <Button
            sx={{
              marginTop: 2,
              bgcolor: "red",
              color: "white",
              "&:hover": {
                bgcolor: "red",
                transform: "scale(1.1)",
              },
            }}
            onClick={closeModal}
          >
            Hủy
          </Button>
        </div>
      </FormControl>
    </Modal>
  );
}
