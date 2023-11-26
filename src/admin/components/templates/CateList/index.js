import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import AddCategory from "../../../utils/Categories/AddCategory";
import AddNewButton from "../../atoms/ButtonHeader/AddNewButton";
import ViewCategoriesList from "../../organisms/Category/ViewCategoriesList";
import DeleteSpecPopup from "../../molecules/Category/DeleteSpecPopup";
import DeleteSubjectPopup from "../../molecules/Category/DeleteSubjectPopup";
import { toast } from "react-toastify";
import EditCategoryModal from "../../../utils/Categories/EditCategory/EditCategory";
import { useCategoriesContext } from "../../../context/CategoriesContext";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";

import "./styles.scss";
import { Card } from "@mui/material";

function CateList() {
  const axiosPrivate = useAxiosPrivate();

  const {
    categories,
    setCategories,
    setMajors,
    selectedCategory,
    setSelectedCategory,
    selectedSemester,
    setSelectedSemester,
    selectedSubject,
    setSelectedSubject,
    isAddCategoryModalOpen,
    setIsAddCategoryModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    categoryToDelete,
    setCategoryToDelete,
    isDeleteSubjectModalOpen,
    setIsDeleteSubjectModalOpen,
    subjectToDelete,
    setSubjectToDelete,
    selectedRadioCategory,
    setSelectedRadioCategory,
    selectedRadioSubject,
    setSelectedRadioSubject,
    isEditCategoryModalOpen,
    setIsEditCategoryModalOpen,
    categoryToEdit,
    setCategoryToEdit,
    categoryStatusChanged,
    setCategoryStatusChanged,
  } = useCategoriesContext();

  //-----------------------------------------------------------------------------------

  const fetchData = async () => {
    const categoriesRes = await axiosPrivate.get(
      process.env.REACT_APP_CATEGORIES_LIST
    );
    setCategories(categoriesRes.data);

    const majorsRes = await axiosPrivate.get(process.env.REACT_APP_MAJORS_LIST);
    setMajors(majorsRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [categoryStatusChanged]);

  //-----------------------------------------------------------------------------------

  const openAddCategoryModal = () => {
    setIsAddCategoryModalOpen(true);
  };

  const closeAddCategoryModal = () => {
    setIsAddCategoryModalOpen(false);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setSelectedSemester(null);
    setSelectedSubject(null);
  };

  const handleSelectSemester = (semester) => {
    setSelectedSemester(semester);
    setSelectedSubject(null);
  };

  const openDeleteModal = (category) => {
    setIsDeleteModalOpen(true);
    setCategoryToDelete(category);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCategoryToDelete(null);
  };

  const openEditCategoryModal = (category) => {
    setIsEditCategoryModalOpen(true);
    if (selectedRadioCategory) {
      setCategoryToEdit(selectedCategory);
    } else if (selectedRadioSubject) {
      setCategoryToEdit(selectedSubject);
    }
  };

  const closeEditCategoryModal = () => {
    setIsEditCategoryModalOpen(false);
  };

  const openDeleteSubjectModal = (subject) => {
    setIsDeleteSubjectModalOpen(true);
    setSubjectToDelete(subject);
  };

  const closeDeleteSubjectModal = () => {
    setIsDeleteSubjectModalOpen(false);
    setSubjectToDelete(null);
  };

  //-----------------------------------------------------------------------------------
  const handleDeleteCategory = async () => {
    if (categoryToDelete) {
      try {
        const res = await axiosPrivate.post(
          process.env.REACT_APP_DELETE_CATEGORY,
          {
            id: categoryToDelete.id,
          }
        );

        if (res.status === 200) {
          toast.success(
            `Xóa chuyên ngành "${categoryToDelete.categoryName}" thành công`
          );
          setCategoryStatusChanged((prev) => !prev);
          closeDeleteModal();
        }
      } catch (error) {
        if (error.response.status === 409) {
          toast.error(
            "Không thể xóa chuyên ngành này vì đã được sử dụng trong bài viết"
          );
        } else {
          toast.error("Xóa danh mục xảy ra lỗi");
        }
        console.error("Error deleting category:", error);
      }
    }
  };

  const handleDeleteSubject = async () => {
    if (subjectToDelete) {
      try {
        const res = await axiosPrivate.post(
          process.env.REACT_APP_DELETE_CATEGORY,
          {
            id: subjectToDelete.id,
          }
        );
        if (res.status === 200) {
          toast.success(
            `Xóa môn học "${subjectToDelete.categoryName}" thành công`
          );
          closeDeleteSubjectModal();
          setCategoryStatusChanged((prev) => !prev);
        }
      } catch (error) {
        if (error.response.status === 409) {
          toast.error(
            "Không thể xóa môn học này vì đã được sử dụng trong bài viết"
          );
        } else {
          toast.error("Xóa danh mục xảy ra lỗi");
        }
        console.error("Error deleting subject:", error);
      }
    }
  };

  const handleRadioCategoryChange = (category) => {
    if (selectedRadioCategory === category.id) {
      setSelectedRadioCategory(null);
    } else {
      setSelectedRadioCategory(category.id);
      setSelectedCategory(category);
      setSelectedRadioSubject(null);
    }
  };

  const handleRadioSubjectChange = (subject) => {
    if (selectedRadioSubject === subject.id) {
      setSelectedRadioSubject(null);
    } else {
      setSelectedRadioSubject(subject.id);
      setSelectedSubject(subject);
      setSelectedRadioCategory(null);
    }
  };

  const renderAddCategoryModal = () => {
    return (
      <Modal
        open={isAddCategoryModalOpen}
        BackdropComponent={Paper}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Card
          sx={{
            backgroundColor: "white",
            padding: 2,
            borderRadius: 2,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          <AddCategory closeAddCategoryModal={closeAddCategoryModal} />
        </Card>
      </Modal>
    );
  };

  return (
    <div className="container-category">
      <div className="content-category">
        <h2 className="category-title">Danh sách các danh mục</h2>
        <div className="add-new-button">
          <AddNewButton
            title="Thêm danh mục mới"
            handleClick={openAddCategoryModal}
          />
        </div>
      </div>
      {renderAddCategoryModal()}
      <ViewCategoriesList
        {...{
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
        }}
      />

      {isDeleteModalOpen && (
        <DeleteSpecPopup
          open={isDeleteModalOpen}
          handleDeleteCategory={handleDeleteCategory}
          closeDeleteModal={closeDeleteModal}
        />
      )}

      {isDeleteSubjectModalOpen && (
        <DeleteSubjectPopup
          open={isDeleteSubjectModalOpen}
          handleDeleteSubject={handleDeleteSubject}
          closeDeleteSubjectModal={closeDeleteSubjectModal}
        />
      )}

      {isEditCategoryModalOpen && (
        <EditCategoryModal
          category={categoryToEdit}
          closeModal={closeEditCategoryModal}
          open={isEditCategoryModalOpen}
          categories={categories}
          fetchData={fetchData}
        />
      )}
    </div>
  );
}

export default CateList;
