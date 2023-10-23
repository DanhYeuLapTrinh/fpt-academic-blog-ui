import React, { useState, useEffect } from "react";
import { axiosConfig } from "../../../api/axios";
import useAuth from "../../../../user/hooks/useAuth";
import { Checkbox } from "@material-tailwind/react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CateList() {
  const { auth } = useAuth();

  const [majors, setMajors] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSemesters, setSelectedSemesters] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const headers = {
    Authorization: `Bearer ${auth.token}`,
  };

  const fetchData = async () => {
    const majorsRes = await axiosConfig.get("/admin/majors", { headers });
    setMajors(majorsRes.data);

    const categoriesRes = await axiosConfig.get("/categories", {
      headers,
    });
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

  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

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
        // Start the delete process, prevent further deletions until it's complete
        setDeleting(true);

        // Determine whether the item to delete is a major or subject
        const isMajor = majors.some((major) => major.id === itemToDelete.id);

        // Set the appropriate confirmation message
        const confirmationMessage = isMajor
          ? "Nếu bạn xóa danh mục chuyên ngành thì các danh mục phụ cũng sẽ bị xóa. Bạn có chắc chắn muốn tiếp tục?"
          : "Bạn có chắc chắn muốn xóa môn học này không?";

        // Send a request to delete the selected item
        await axiosConfig.post(
          "/admin/delete-category",
          {
            id: itemToDelete.id,
          },
          { headers }
        );

        // Handle the response as needed (e.g., update state)
        toast.success(`Đã xóa thành công: ${itemToDelete.categoryName}`);

        // Close the delete confirmation dialog
        closeDeleteConfirmation();

        // Fetch the latest data from the server and update the state
        fetchData();

        // Finish the delete process
        setDeleting(false);
      } catch (error) {
        // Handle any error that may occur during the deletion process
        toast.error(`Xóa thất bại: ${itemToDelete.categoryName}`);

        // Finish the delete process in case of an error
        setDeleting(false);
      }
    }
  };

  return (
    <div className="bg-gray-100 p-8 grid grid-cols-3 gap-6">
      {majors.map((major) => (
        <div key={major.id} className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-4">{major.majorName}</h1>
          <h2 className="text-lg font-semibold mb-2">Chuyên ngành</h2>
          {categories
            .filter((c) => c.majorName === major.majorName)
            .map((specialization) => (
              <div
                key={specialization.id}
                className="flex items-center justify-between mb-2"
              >
                <div className="flex items-center">
                  <Checkbox
                    checked={selectedCategories.includes(specialization.id)}
                    onChange={() => toggleCategorySelection(specialization)}
                    color="green"
                  />
                  <div
                    className="cursor-pointer px-3 py-1 rounded bg-blue-500 text-white mb-2"
                    onClick={() => handleMajorClick(specialization)}
                  >
                    {specialization.categoryName}
                  </div>
                </div>
                <DeleteForeverIcon
                  onClick={() => openDeleteConfirmation(specialization)} // Open delete confirmation
                  className="cursor-pointer text-red-600"
                />
              </div>
            ))}

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
                      className="cursor-pointer px-3 py-1 rounded bg-gray-200 hover-bg-gray-300 mb-2"
                      onClick={() => handleSemesterClick(semester)}
                    >
                      {semester.categoryName}
                    </div>
                  </div>
                  <DeleteForeverIcon
                    onClick={() => openDeleteConfirmation(semester)} // Open delete confirmation
                    className="cursor-pointer text-red-600"
                  />
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
                        <div className="cursor-pointer px-3 py-1 rounded bg-gray-200 hover-bg-gray-300 mb-2">
                          {subject.categoryName}
                        </div>
                      </div>
                      <DeleteForeverIcon
                        onClick={() => openDeleteConfirmation(subject)} // Open delete confirmation
                        className="cursor-pointer text-red-600"
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      ))}

      {/* Delete Confirmation Dialog */}
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
                className={`bg-red-500 text-white px-4 py-2 rounded mr-2 hover-bg-red-600 ${
                  deleting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleDelete} // Confirm deletion
                disabled={deleting}
              >
                {deleting ? "Đang xóa..." : "Có"}
              </button>
              <button
                className={`bg-gray-500 text-white px-4 py-2 rounded hover-bg-gray-600 ${
                  deleting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={closeDeleteConfirmation} // Cancel deletion
                disabled={deleting}
              >
                Không
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default CateList;
