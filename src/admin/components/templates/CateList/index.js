import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import AddCategory from "../../../utils/Categories/AddCategory";
import AddNewButton from "../../atoms/ButtonHeader/AddNewButton";
import ViewCategoriesList from "../../organisms/Category/ViewCategoriesList";
import DeleteSpecPopup from "../../molecules/Category/DeleteSpecPopup";
import DeleteSubjectPopup from "../../molecules/Category/DeleteSubjectPopup";
import { ToastContainer, toast } from "react-toastify";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";

import "react-toastify/dist/ReactToastify.css";
import "./styles.scss";

function CateList() {
  const axiosPrivate = useAxiosPrivate();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [isDeleteSubjectModalOpen, setIsDeleteSubjectModalOpen] =
    useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState(null);

  const [selectedRadioCategory, setSelectedRadioCategory] = useState(null);
  const [selectedRadioSubject, setSelectedRadioSubject] = useState(null);

  const openAddCategoryModal = () => {
    setIsAddCategoryModalOpen(true);
  };

  const closeAddCategoryModal = () => {
    setIsAddCategoryModalOpen(false);
  };

  const fetchData = async () => {
    const categoriesRes = await axiosPrivate.get(
      process.env.REACT_APP_CATEGORIES_LIST
    );
    setCategories(categoriesRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const openDeleteSubjectModal = (subject) => {
    setIsDeleteSubjectModalOpen(true);
    setSubjectToDelete(subject);
  };

  const closeDeleteSubjectModal = () => {
    setIsDeleteSubjectModalOpen(false);
    setSubjectToDelete(null);
  };

  const handleDeleteCategory = async () => {
    if (categoryToDelete) {
      try {
        await axiosPrivate.post(process.env.REACT_APP_DELETE_CATEGORY, {
          id: categoryToDelete.id,
        });

        fetchData();
        toast.success(
          `Xóa chuyên ngành "${categoryToDelete.categoryName}" thành công`
        );
        closeDeleteModal();
      } catch (error) {
        if (error.response.status === 409) {
          toast.error(
            "Không thể xóa chuyên ngành này vì đã được sử dụng trong bài viết"
          );
        }
        console.error("Error deleting category:", error);
      }
    }
  };

  const handleDeleteSubject = async () => {
    if (subjectToDelete) {
      try {
        await axiosPrivate.post(process.env.REACT_APP_DELETE_CATEGORY, {
          id: subjectToDelete.id,
        });

        fetchData();
        toast.success(
          `Xóa môn học "${subjectToDelete.categoryName}" thành công`
        );
        closeDeleteSubjectModal();
      } catch (error) {
        if (error.response.status === 409) {
          toast.error(
            "Không thể xóa môn học này vì đã được sử dụng trong bài viết"
          );
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
    }
  };

  const handleRadioSubjectChange = (subject) => {
    if (selectedRadioSubject === subject.id) {
      setSelectedRadioSubject(null);
    } else {
      setSelectedRadioSubject(subject.id);
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
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: 2,
            borderRadius: 2,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <AddCategory
            closeAddCategoryModal={closeAddCategoryModal}
            fetchData={fetchData}
          />
        </Box>
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
        }}
        selectedRadioCategory={selectedRadioCategory}
        selectedRadioSubject={selectedRadioSubject}
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
      <ToastContainer position="top-right" autoClose="3000" />
    </div>
  );
}

export default CateList;
