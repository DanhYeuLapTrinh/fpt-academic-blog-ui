import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import AddCategory from "../../../utils/Categories/AddCategory";
import AddNewButton from "../../atoms/AddNewButton";
import ViewCategoriesList from "../../organisms/Category/ViewCategoriesList";
import DeleteSpecPopup from "../../molecules/Category/DeleteSpecPopup";
import DeleteSubjectPopup from "../../molecules/Category/DeleteSubjectPopup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  return (
    <div className="m-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Danh sách các danh mục</h2>
        <div className="col-span-1">
          <AddNewButton
            title="Thêm danh mục mới"
            handleClick={openAddCategoryModal}
          />
        </div>
      </div>

      {isAddCategoryModalOpen && (
        <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <AddCategory
              closeAddCategoryModal={closeAddCategoryModal}
              fetchData={fetchData}
            />
          </div>
        </div>
      )}

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
          handleDeleteCategory={handleDeleteCategory}
          closeDeleteModal={closeDeleteModal}
        />
      )}

      {isDeleteSubjectModalOpen && (
        <DeleteSubjectPopup
          handleDeleteSubject={handleDeleteSubject}
          closeDeleteSubjectModal={closeDeleteSubjectModal}
        />
      )}
      <ToastContainer position="top-right" autoClose="3000" />
    </div>
  );
}

export default CateList;
