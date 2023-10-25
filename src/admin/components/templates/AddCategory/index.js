import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";

function AddCategory({ closeAddCategoryModal }) {
  const [cateList, setCateList] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");

  const [selectedSemester, setSelectedSemester] = useState("");

  const [selectedMajor, setSelectedMajor] = useState("");

  const [selectedMajorID, setSelectedMajorID] = useState(""); // To store the selected major's ID

  const [majorList, setMajorList] = useState([]);

  const [newMajor, setNewMajor] = useState("");

  const [isMajorModalOpen, setIsMajorModalOpen] = useState(false);

  const [showMajorInput, setShowMajorInput] = useState(false); // To show the input for adding a new major

  const [selectedSubject, setSelectedSubject] = useState("");

  const [subjectError, setSubjectError] = useState("");

  const [categoryError, setCategoryError] = useState("");

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate.get(process.env.REACT_APP_CATEGORIES_LIST).then((res) => {
      setCateList(res.data);
      console.log(res.data);
    });

    axiosPrivate.get(process.env.REACT_APP_MAJORS_LIST).then((res) => {
      setMajorList(res.data);
    });
  }, []);

  // Hàm để mở và đóng modal danh sách majorName
  const openMajorModal = () => {
    setIsMajorModalOpen(true);
  };

  const closeMajorModal = () => {
    setIsMajorModalOpen(false);
  };

  // Hàm xử lý khi nhấn "Thêm danh mục"
  const handleAddCategory = (e) => {
    e.preventDefault();

    // Kiểm tra môn học trùng và lỗi môn học
    if (
      cateList.some(
        (cate) =>
          cate.subject === selectedSubject && cate.semester === selectedSemester
      )
    ) {
      setSubjectError("Môn học đã tồn tại ở học kỳ này");
      return;
    } else {
      setSubjectError(""); // Xóa lỗi môn học nếu không trùng
    }

    // Kiểm tra danh mục trống và lỗi danh mục
    if (!selectedSubject) {
      setSubjectError("Danh mục không được để trống");
      return;
    } else {
      setSubjectError(""); // Xóa lỗi danh mục nếu không trống
    }

    const data = {
      specialization: selectedCategory,
      semester: selectedSemester,
      subject: selectedSubject,
      majorId: selectedMajorID || selectedCategory,
    };

    axiosPrivate
      .post(process.env.REACT_APP_ADD_NEW_CATEGORY, data)
      .then((response) => {
        toast.success("Thêm danh mục thành công!");
      })
      .catch((error) => {
        toast.error("Lỗi khi thêm danh mục.");
      });
  };

  // Hàm xử lý khi chọn majorName từ modal
  const handleMajorSelection = (major, majorName) => {
    setSelectedMajor(majorName);
    setSelectedMajorID(major.id); // Store the selected major's ID
    closeMajorModal();
    setShowMajorInput(true); // Show the input for adding a new major
  };

  // Hàm xử lý khi chọn chuyên ngành
  const handleCategoryChange = (e) => {
    // Nếu chọn chuyên ngành có sẵn
    if (cateList.some((cate) => cate.categoryName === e.target.value)) {
      const selectedCate = cateList.find(
        (cate) => cate.categoryName === e.target.value
      );
      const matchedMajor = majorList.find(
        (major) => major.majorName === selectedCate.majorName
      );
      if (matchedMajor) {
        setSelectedMajorID(matchedMajor.id);
      }

      // Nếu chọn chuyên ngành mới
    } else if (e.target.value === "addNew") {
      openMajorModal();
    }

    setSelectedCategory(e.target.value);
    //...
  };

  // Hàm xử lý khi chọn học kỳ
  const renderSemesterSelect = () => {
    const semesters = Array.from({ length: 9 }, (_, i) => i + 1);

    return (
      <select
        className="border p-2 rounded-lg"
        value={selectedSemester}
        onChange={handleSemesterChange}
        disabled={!selectedCategory || !selectedMajorID}
      >
        <option value="">Chọn học kỳ</option>
        {semesters.map((semester) => (
          <option key={semester} value={`Kỳ ${semester}`}>
            Kỳ {semester}
          </option>
        ))}
      </select>
    );
  };

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
  };

  const handleCloseModal = () => {
    closeAddCategoryModal(); // Gọi hàm để đóng modal ở đây
  };

  return (
    <div className="w-full max-w-full h-full items-center bg-background">
      <form className="h-full bg-white p-10 rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Thêm danh mục mới</h2>
        <button
          onClick={handleCloseModal}
          className="absolute top-0 right-0 p-2 cursor-pointer"
        >
          <CancelIcon className="text-red-500" />
        </button>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {showMajorInput ? ( // Show input when a major is selected
            <input
              className="border-2 border-solid p-2 rounded-lg"
              type="text"
              placeholder="Tên chuyên ngành mới"
              name="cateChuyenNganh"
              value={newMajor}
              onChange={(e) => setNewMajor(e.target.value)}
            />
          ) : (
            <select
              className="border p-2 rounded-lg"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Chọn chuyên ngành</option>
              {cateList.map((cate) => (
                <option key={cate.id} value={cate.categoryName}>
                  {cate.categoryName}
                </option>
              ))}
              {selectedMajorID ? (
                <option value={selectedMajorID}>{selectedMajor}</option>
              ) : (
                <option value="addNew">Thêm chuyên ngành</option>
              )}
            </select>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {renderSemesterSelect()}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            className="border p-2 rounded-lg"
            type="text"
            placeholder="Tên môn học"
            name="cateMonHoc"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            disabled={
              !selectedCategory || !selectedMajorID || !selectedSemester
            }
          />
        </div>
        {subjectError && <p className="text-red-500">{subjectError}</p>}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button
            className="bg-buttonSubmit text-white py-2 px-4 rounded"
            onClick={handleAddCategory}
          >
            Thêm danh mục
          </button>
        </div>
      </form>

      {/* Modal danh sách majorName */}
      <Modal
        open={isMajorModalOpen}
        onClose={closeMajorModal}
        aria-labelledby="major-modal-title"
        aria-describedby="major-modal-description"
        className="modal fixed flex items-center justify-center inset-0"
      >
        <div className="major-modal bg-white p-4 rounded-lg">
          <h2 id="major-modal-title" className="text-2xl font-bold mb-2">
            Danh sách majorName
          </h2>
          <ul id="major-modal-description" className="space-y-2">
            {majorList.map((major) => (
              <li
                key={major.id}
                onClick={() => handleMajorSelection(major.id, major.majorName)}
                className="cursor-pointer hover:bg-gray-200 p-2 rounded"
              >
                {major.majorName}
              </li>
            ))}
          </ul>
        </div>
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} closeOnClick />
    </div>
  );
}

export default AddCategory;
