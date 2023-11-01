import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";

function AddCategory({ closeAddCategoryModal }) {
  const [cateList, setCateList] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");

  const [selectedSemester, setSelectedSemester] = useState("");

  const [selectedMajorID, setSelectedMajorID] = useState("");

  const [majorList, setMajorList] = useState([]);

  const [selectedSubject, setSelectedSubject] = useState("");

  const [subjectError, setSubjectError] = useState("");

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

  const handleAddCategory = (e) => {
    e.preventDefault();

    if (
      cateList.some(
        (cate) =>
          cate.subject === selectedSubject && cate.semester === selectedSemester
      )
    ) {
      setSubjectError("Môn học đã tồn tại ở học kỳ này");
      return;
    } else {
      setSubjectError("");
    }

    if (!selectedSubject) {
      setSubjectError("Danh mục không được để trống");
      return;
    } else {
      setSubjectError("");
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

  const handleCategoryChange = (e) => {
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
    } else if (e.target.value === "addNew") {
    }

    setSelectedCategory(e.target.value);
  };

  const renderSemesterSelect = () => {
    const semesters = Array.from({ length: 9 }, (_, i) => i + 1);

    return (
      <select
        className="border p-2 rounded-lg w-full"
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
    closeAddCategoryModal();
  };

  return (
    <>
      <form className="w-full h-full bg-white p-10 rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Thêm danh mục mới</h2>
        <div className="mb-4">
          <select
            className="border p-2 rounded-lg w-full"
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
        </div>

        <div className="mb-4 ">{renderSemesterSelect()}</div>
        <div className=" mb-4">
          <input
            className="border p-2 rounded-lg w-full"
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
          <button
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={handleCloseModal}
          >
            Hủy
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} closeOnClick />
    </>
  );
}

export default AddCategory;
