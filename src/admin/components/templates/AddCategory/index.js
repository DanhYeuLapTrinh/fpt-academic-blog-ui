import React, { useEffect, useState } from "react";
import { axiosConfig } from "../../../api/axios";
import useAuth from "../../../../user/hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "@mui/material";

function AddCategory() {
  const [cateList, setCateList] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");

  const [selectedSemester, setSelectedSemester] = useState("");

  const [selectedMajorID, setSelectedMajorID] = useState("");

  const [selectedMajorIdModal, setSelectedMajorIdModal] = useState("");

  const [majorList, setMajorList] = useState([]);

  const [newMajor, setNewMajor] = useState("");

  const [isMajorModalOpen, setIsMajorModalOpen] = useState(false);

  const [showMajorInput, setShowMajorInput] = useState(false); // To show the input for adding a new major

  const [selectedSubject, setSelectedSubject] = useState("");

  const { auth } = useAuth();

  const headers = {
    Authorization: `Bearer ${auth.token}`,
  };

  useEffect(() => {
    axiosConfig.get("/categories", { headers }).then((res) => {
      setCateList(res.data);
    });

    axiosConfig.get("admin/majors", { headers }).then((res) => {
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

    // Check if you are adding a new specialization
    const isNewCategory = selectedCategory === "addNew";

    let majorId = selectedCategory === "addNew" ? selectedMajorID : null;
    let specialization =
      selectedCategory === "addNew" ? newMajor : selectedCategory;

    if (!selectedSemester || !selectedSubject) {
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (isNewCategory && !specialization) {
      toast.error("Vui lòng nhập tên chuyên ngành mới.");
      return;
    }

    // Call the API to add the specialization
    axiosConfig
      .post(
        "admin/new-category",
        {
          specialization,
          semester: selectedSemester,
          subject: selectedSubject,
          majorId,
        },
        { headers }
      )
      .then((res) => {
        toast.success("Thêm thành công!");
      })
      .catch((err) => {
        toast.error("Có lỗi xảy ra");
      });
  };

  // Hàm xử lý khi chọn majorName từ modal
  const handleMajorSelection = (major) => {
    setSelectedMajorIdModal(major.id);
    closeMajorModal();
    setShowMajorInput(true);
  };

  // Hàm xử lý khi chọn chuyên ngành
  const handleCategoryChange = (e) => {
    if (cateList.some((cate) => cate.categoryName === e.target.value)) {
      const selectedCate = cateList.find(
        (cate) => cate.categoryName === e.target.value
      );
      setSelectedCategory(selectedCate.categoryName);

      // Tìm major có cùng tên với category đã chọn
      const matchedMajor = majorList.find(
        (major) => major.majorName === selectedCate.majorName
      );

      // Xử lý khi chọn thêm chuyên ngành mới
    } else if (e.target.value === "addNew") {
      openMajorModal();
      setSelectedCategory("addNew");
    }
  };

  // Hàm xử lý khi chọn học kỳ
  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
  };

  const renderSemesterSelect = () => {
    if (selectedCategory == "addNew") {
      // Nếu chọn thêm chuyên ngành, hiển thị 9 học kỳ từ 1 đến 9
      return (
        <select
          className="border p-2 rounded-lg"
          value={selectedSemester}
          onChange={handleSemesterChange}
        >
          <option value="">Chọn học kỳ</option>
          {Array.from({ length: 9 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              Kỳ {i + 1}
            </option>
          ))}
        </select>
      );
    } else {
      // Nếu chọn từ danh mục API, hiển thị danh sách học kỳ từ childCategories
      const selectedCategoryObj = cateList.find(
        (cate) => cate.categoryName == selectedCategory
      );
      if (selectedCategoryObj) {
        const semesterOptions = selectedCategoryObj.childCategories
          .filter((childCate) => childCate.categoryType == "Semester")
          .map((childCate) => (
            <option key={childCate.id} value={childCate.categoryName}>
              {childCate.categoryName}
            </option>
          ));
        return (
          <select
            className="border p-2 rounded-lg"
            value={selectedSemester}
            onChange={handleSemesterChange}
          >
            <option value="">Chọn học kỳ</option>
            {semesterOptions}
          </select>
        );
      }
    }
  };

  return (
    <div className="w-full max-w-full h-full items-center bg-background">
      <form className="h-full bg-white p-10 rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Thêm danh mục mới</h2>
        <p className="text-red-500"></p>
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

              <option value="addNew">Thêm chuyên ngành</option>
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
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button
            className="bg-buttonSubmit text-white py-2 px-4 rounded"
            onClick={handleAddCategory} // Gọi hàm khi nhấn nút "Thêm danh mục"
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
                onClick={() => handleMajorSelection(major.id)}
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
