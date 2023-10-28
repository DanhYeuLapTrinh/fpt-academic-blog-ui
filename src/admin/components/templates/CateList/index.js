import React, { useState, useEffect } from "react";
import { Checkbox } from "@material-tailwind/react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/base";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import AddCategory from "../AddCategory";
import AddNewButton from "../../atoms/AddNewButton";

function CateList() {
  const axiosPrivate = useAxiosPrivate();

  const [majors, setMajors] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSemesters, setSelectedSemesters] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [expandedMajors, setExpandedMajors] = useState({});

  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editableItemId, setEditableItemId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const [isEditConfirmationOpen, setIsEditConfirmationOpen] = useState(false);

  const openAddCategoryModal = () => {
    setIsAddCategoryModalOpen(true);
  };

  const closeAddCategoryModal = () => {
    setIsAddCategoryModalOpen(false);
  };

  const fetchData = async () => {
    const majorsRes = await axiosPrivate.get(process.env.REACT_APP_MAJORS_LIST);
    setMajors(majorsRes.data);

    const categoriesRes = await axiosPrivate.get(
      process.env.REACT_APP_CATEGORIES_LIST
    );
    setCategories(categoriesRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMajorClick = (major) => {
    setSelectedMajor(major);
    setSelectedSemester(null);
  };

  const handleSemesterClick = (semester) => {
    setSelectedSemester(semester);
  };

  const toggleCategorySelection = (category) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(category.id)) {
        return prevSelected.filter((id) => id !== category.id);
      }
      return [...prevSelected, category.id];
    });
  };

  const toggleSemesterSelection = (semester) => {
    setSelectedSemesters((prevSelected) => {
      if (prevSelected.includes(semester.id)) {
        return prevSelected.filter((id) => id !== semester.id);
      }
      return [...prevSelected, semester.id];
    });
  };

  const toggleSubjectSelection = (subject) => {
    setSelectedSubjects((prevSelected) => {
      if (prevSelected.includes(subject.id)) {
        return prevSelected.filter((id) => id !== subject.id);
      }
      return [...prevSelected, subject.id];
    });
  };

  const toggleMajorExpansion = (major) => {
    setExpandedMajors((prevExpanded) => ({
      ...prevExpanded,
      [major.id]: !prevExpanded[major.id],
    }));
  };

  const openDeleteConfirmation = (item) => {
    setItemToDelete(item);
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setItemToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const handleDelete = async () => {
    if (itemToDelete && !deleting) {
      try {
        setDeleting(true);

        await axiosPrivate.post(process.env.REACT_APP_DELETE_CATEGORY, {
          id: itemToDelete.id,
        });

        toast.success(`Đã xóa thành công: ${itemToDelete.categoryName}`);

        closeDeleteConfirmation();

        fetchData();

        setDeleting(false);
      } catch (error) {
        if (error.response.status === 409) {
          toast.error(
            `Xóa thất bại, do ${itemToDelete.categoryName} đã tồn tại trong bài viết.`
          );
        }

        setDeleting(false);
      }
    }
  };

  const renderAddCategoryModal = () => {
    return (
      <div>
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
      </div>
    );
  };

  const openEditCategoryModal = () => {
    if (selectedCategories.length === 1) {
      setIsEditModalOpen(true);
      setEditableItemId(selectedCategories[0]);
    } else if (selectedSubjects.length === 1) {
      setIsEditModalOpen(true);
      setEditableItemId(selectedSubjects[0]);
    } else {
      toast.error("Chỉ có thể chỉnh sửa một danh mục mỗi lần.");
    }
  };

  const closeEditCategoryModal = () => {
    setIsEditModalOpen(false);
    setEditableItemId(null);
    setEditedCategoryName("");
  };

  const openEditConfirmation = () => {
    setIsEditConfirmationOpen(true);
  };

  const closeEditConfirmation = () => {
    setIsEditConfirmationOpen(false);
  };

  const handleEditCategory = async () => {
    try {
      if (editableItemId) {
        const response = await axiosPrivate.post(
          process.env.REACT_APP_EDIT_CATEGORY,
          {
            id: editableItemId,
            categoryName: editedCategoryName,
          }
        );

        if (response.status === 200) {
          toast.success(`Đã chỉnh sửa thành công: ${editedCategoryName}`);
          closeEditConfirmation();
          closeEditCategoryModal();
          fetchData();
        } else {
          toast.error(`Chỉnh sửa thất bại: ${editedCategoryName}`);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Có lỗi xảy ra khi chỉnh sửa danh mục.");
    }
  };

  function hasSpecializationsForMajor(major) {
    return categories.some((c) => c.majorName === major.majorName);
  }

  return (
    <div className="m-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Danh sách các danh mục</h2>
        <div className="col-span-1">
          {(selectedCategories.length === 1 ||
            selectedSubjects.length === 1) && (
            <Button
              className="px-4 h-12 rounded-lg shadow-md bg-custom text-white text-center mr-4"
              onClick={openEditCategoryModal}
            >
              <EditIcon className="mr-2" />
              Chỉnh sửa danh mục
            </Button>
          )}
          <AddNewButton
            title="Thêm danh mục mới"
            handleClick={openAddCategoryModal}
          />
        </div>
      </div>

      {renderAddCategoryModal()}
      <div className="grid grid-cols-3 gap-6">
        {majors.map((major) => (
          <div key={major.id} className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">{major.majorName}</h1>
            {hasSpecializationsForMajor(major) && (
              <>
                <h2 className="text-lg font-semibold mb-2">Chuyên ngành</h2>
                {categories
                  .filter((c) => c.majorName === major.majorName)
                  .map((specialization) => (
                    <>
                      <div
                        key={specialization.id}
                        className="flex items-center justify-between mb-2"
                      >
                        <div className="flex items-center">
                          <Checkbox
                            checked={selectedCategories.includes(
                              specialization.id
                            )}
                            onChange={() =>
                              toggleCategorySelection(specialization)
                            }
                            color="green"
                          />
                          <div
                            className="cursor-pointer px-3 py-1 rounded bg-blue-500 text-white"
                            onClick={() => handleMajorClick(specialization)}
                          >
                            {specialization.categoryName}
                          </div>
                        </div>
                        {selectedCategories.includes(specialization.id) && (
                          <DeleteForeverIcon
                            onClick={() =>
                              openDeleteConfirmation(specialization)
                            }
                            className="cursor-pointer text-red-600"
                          />
                        )}
                      </div>
                    </>
                  ))}
              </>
            )}

            {selectedMajor?.majorName === major.majorName && (
              <>
                <h2 className="text-lg font-semibold mb-2">Học kỳ</h2>
                {selectedMajor.childCategories.map((semester) => (
                  <div
                    key={semester.id}
                    className="flex items-center justify-between mb-2"
                  >
                    <div className="flex items-center">
                      <Checkbox
                        checked={selectedSemesters.includes(semester.id)}
                        onChange={() => toggleSemesterSelection(semester)}
                        color="green"
                      />
                      <div
                        className="cursor-pointer px-3 py-1 rounded hover-bg-gray-300"
                        onClick={() => handleSemesterClick(semester)}
                      >
                        {semester.categoryName}
                      </div>
                    </div>
                  </div>
                ))}

                {selectedSemester && (
                  <div>
                    <h2 className="text-lg font-semibold mb-2">Môn học</h2>
                    {selectedSemester.childCategories.map((subject) => (
                      <div
                        key={subject.id}
                        className="flex items-center justify-between mb-2"
                      >
                        <div className="flex items-center">
                          <Checkbox
                            checked={selectedSubjects.includes(subject.id)}
                            onChange={() => toggleSubjectSelection(subject)}
                            color="green"
                          />
                          <div className="cursor-pointer px-3 py-1 rounded bg-gray-200 hover-bg-gray-300">
                            {subject.categoryName}
                          </div>
                        </div>
                        {selectedSubjects.includes(subject.id) && (
                          <DeleteForeverIcon
                            onClick={() => openDeleteConfirmation(subject)}
                            className="cursor-pointer text-red-600"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}

        {isDeleteConfirmationOpen && (
          <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-md">
              <p className="text-lg font-semibold mb-4 text-center">
                {itemToDelete
                  ? itemToDelete.childCategories
                    ? "Nếu bạn xóa danh mục chuyên ngành thì các danh mục phụ cũng sẽ bị xóa. Bạn có chắc chắn muốn tiếp tục?"
                    : "Bạn có chắc chắn muốn xóa môn học này không?"
                  : null}
              </p>
              <div className="text-center">
                <button
                  className={`bg-red-500 text-white px-4 py-2 rounded mr-2 ${
                    deleting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? "Đang xóa..." : "Có"}
                </button>
                <button
                  className={`bg-gray-500 text-white px-4 py-2 rounded hover-bg-gray-600 ${
                    deleting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={closeDeleteConfirmation}
                  disabled={deleting}
                >
                  Không
                </button>
              </div>
            </div>
          </div>
        )}

        {isEditModalOpen && (
          <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div>
                <input
                  type="text"
                  value={editedCategoryName}
                  onChange={(e) => setEditedCategoryName(e.target.value)}
                  placeholder="Nhập tên danh mục mới"
                />
              </div>
              <div className="mt-4">
                <button
                  onClick={openEditConfirmation}
                  className="mr-4 bg-green-500 w-12 h-8 text-white rounded-lg"
                >
                  Lưu
                </button>
                <button onClick={closeEditCategoryModal}>Hủy</button>
              </div>
            </div>
          </div>
        )}

        {isEditConfirmationOpen && (
          <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-md">
              <p className="text-lg font-semibold mb-4 text-center">
                Bạn có chắc chắn muốn lưu thay đổi?
              </p>
              <div className="text-center">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                  onClick={handleEditCategory}
                >
                  Đồng ý
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={closeEditConfirmation}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </div>
  );
}

export default CateList;
