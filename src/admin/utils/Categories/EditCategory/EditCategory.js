import React, { useState } from "react";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import { useCategoriesContext } from "../../../context/CategoriesContext";
import { toast } from "react-toastify";
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
  majors,
}) {
  const axiosPrivate = useAxiosPrivate();

  const { setSemesterVisible, setSubjectVisible } = useCategoriesContext();

  const [categoryName, setCategoryName] = useState(category.categoryName);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      let existingSemester;

      const isCategoryNameConflict = categories.some(
        (c) => c.categoryName === categoryName && c.id !== category.id
      );

      if (isCategoryNameConflict) {
        toast.error("Chuyên ngành đã tồn tại");
        return;
      }

      let existingCategory;

      const isSubjectNameConflict = categories.some((c) =>
        c.childCategories
          ? c.childCategories.some(
              (semester) =>
                semester.childCategories &&
                semester.childCategories.some(
                  (subject) =>
                    subject.categoryName === categoryName &&
                    subject.id !== category.id
                )
            )
          : false
      );

      if (isSubjectNameConflict) {
        const existingSubject = categories.find((c) =>
          c.childCategories
            ? c.childCategories.some(
                (semester) =>
                  semester.childCategories &&
                  semester.childCategories.some(
                    (subject) =>
                      subject.categoryName === categoryName &&
                      subject.id !== category.id
                  )
              )
            : false
        );

        existingSemester = existingSubject.childCategories.find(
          (semester) =>
            semester.childCategories &&
            semester.childCategories.some(
              (subject) =>
                subject.categoryName === categoryName &&
                subject.id !== category.id
            )
        );

        existingCategory = categories.find((c) =>
          c.childCategories
            ? c.childCategories.some(
                (semester) =>
                  semester.childCategories &&
                  semester.childCategories.some(
                    (subject) =>
                      subject.categoryName === categoryName &&
                      subject.id !== category.id
                  )
              )
            : false
        );

        toast.error(
          `Môn học đã tồn tại trong ${existingSemester.categoryName} của chuyên ngành ${existingCategory.categoryName}`
        );
        return;
      }

      const res = await axiosPrivate.post(process.env.REACT_APP_EDIT_CATEGORY, {
        id: category.id,
        categoryName: categoryName,
      });

      if (res.status === 200) {
        toast.success(
          `Cập nhật thành công: "${category.categoryName}" thành "${categoryName}"`
        );
        fetchData();
        setSemesterVisible(false);
        setSubjectVisible(false);
        closeModal();
      } else {
        toast.error("Lỗi khi cập nhật danh mục");
        setSemesterVisible(false);
        setSubjectVisible(false);
        closeModal();
      }
    } catch (error) {
      console.error("Error editing category:", error);
      toast.error("Lỗi khi cập nhật danh mục");
      setSemesterVisible(false);
      setSubjectVisible(false);
      closeModal();
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
