import { createContext, useContext, useState } from "react";

const CategoriesContext = createContext();

export const useCategoriesContext = () => {
  return useContext(CategoriesContext);
};

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [majors, setMajors] = useState([]);
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

  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const [categoryStatusChanged, setCategoryStatusChanged] = useState(false);

  const [isSemesterVisible, setSemesterVisible] = useState(false);

  const [isSubjectVisible, setSubjectVisible] = useState(false);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        setCategories,
        majors,
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
        isSemesterVisible,
        setSemesterVisible,
        isSubjectVisible,
        setSubjectVisible,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
