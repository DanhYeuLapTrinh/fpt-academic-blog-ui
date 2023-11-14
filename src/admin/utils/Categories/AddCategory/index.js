import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@mui/material";

function AddCategory({ closeAddCategoryModal }) {
  const axiosPrivate = useAxiosPrivate();
  const [cateList, setCateList] = useState([]);
  const [majorList, setMajorList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedMajorID, setSelectedMajorID] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [isNewCategoryOption, setIsNewCategoryOption] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message = "Nếu F5 dữ liệu bạn đang nhập sẽ mất";
      event.returnValue = message;
      return message;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    axiosPrivate.get(process.env.REACT_APP_CATEGORIES_LIST).then((res) => {
      setCateList(res.data);
    });

    axiosPrivate.get(process.env.REACT_APP_MAJORS_LIST).then((res) => {
      setMajorList(res.data);
    });
  }, []);

  const isCategoryNameExists = (categoryName) => {
    return cateList.some(
      (specialization) => specialization.categoryName === categoryName
    );
  };

  const isSubjectExists = (subject) => {
    return cateList.some((category) =>
      category.childCategories.some((semester) =>
        semester.childCategories.some(
          (subjectObj) => subjectObj.categoryName === subject
        )
      )
    );
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!selectedSubject) {
      setSubjectError("Danh mục không được để trống");
      return;
    } else {
      setSubjectError("");
    }

    let data = {};

    if (isNewCategoryOption) {
      const newMajorName = newCategoryName.trim();

      if (isCategoryNameExists(newMajorName)) {
        toast.error("Chuyên ngành mới đã tồn tại.");
        return;
      }

      try {
        const response = await axiosPrivate.post("admin/new-major", {
          majorName: newMajorName,
        });
        const newMajorId = response.data.id;

        data = {
          specialization: newMajorName,
          semester: selectedSemester,
          subject: selectedSubject,
          majorId: newMajorId,
        };
      } catch (error) {
        toast.error("Lỗi khi thêm chuyên ngành mới.");
        return;
      }
    } else {
      if (isSubjectExists(selectedSubject)) {
        toast.error("Môn học đã tồn tại.");
        return;
      }

      data = {
        specialization: selectedCategory,
        semester: selectedSemester,
        subject: selectedSubject,
        majorId: selectedMajorID,
      };
    }

    try {
      const response = await axiosPrivate.post(
        process.env.REACT_APP_ADD_NEW_CATEGORY,
        data
      );
      toast.success("Thêm danh mục thành công!");
      closeAddCategoryModal();
    } catch (error) {
      toast.error("Lỗi khi thêm danh mục.");
    }
  };

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue === "newCategory") {
      setIsNewCategoryOption(true);
    } else {
      setIsNewCategoryOption(false);
      setSelectedCategory(selectedValue);

      const selectedCate = cateList.find(
        (cate) => cate.categoryName === selectedValue
      );
      const matchedMajor = majorList.find(
        (major) => major.majorName === selectedCate.majorName
      );

      if (matchedMajor) {
        setSelectedMajorID(matchedMajor.id);
      }
    }
  };

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
  };

  const handleNewCategoryChange = (e) => {
    setNewCategoryName(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleCloseModal = () => {
    closeAddCategoryModal();
  };

  const renderCategoryOptions = () => {
    return (
      <>
        <option value="">Chọn chuyên ngành</option>
        {cateList.map((cate) => (
          <option key={cate.id} value={cate.categoryName}>
            {cate.categoryName}
          </option>
        ))}
        <option value="newCategory">Thêm chuyên ngành mới</option>
      </>
    );
  };

  const renderNewCategoryInput = () => {
    return (
      <TextField
        label="Chuyên ngành mới"
        variant="outlined"
        fullWidth
        name="newCategoryName"
        value={newCategoryName}
        onChange={handleNewCategoryChange}
        sx={{ marginBottom: 2 }}
      />
    );
  };

  const renderSemesterSelect = () => {
    const semesters = Array.from({ length: 9 }, (_, i) => i + 1);

    return (
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel htmlFor="semester-select">Chọn học kỳ</InputLabel>
        <Select
          native
          id="semester-select"
          value={selectedSemester}
          onChange={handleSemesterChange}
          disabled={!selectedCategory && !newCategoryName}
        >
          <option value="">Chọn học kỳ</option>
          {semesters.map((semester) => (
            <option key={semester} value={`Kỳ ${semester}`}>
              Kỳ {semester}
            </option>
          ))}
        </Select>
      </FormControl>
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        padding: 2,
        borderRadius: 2,
        position: "relative",
        opacity: 1,
        zIndex: "auto",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Thêm danh mục mới
      </Typography>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel htmlFor="category-select">Chọn chuyên ngành</InputLabel>
        <Select
          native
          id="category-select"
          value={isNewCategoryOption ? "newCategory" : selectedCategory}
          onChange={handleCategoryChange}
        >
          {renderCategoryOptions()}
        </Select>
      </FormControl>
      {isNewCategoryOption && renderNewCategoryInput()}
      {renderSemesterSelect()}
      <TextField
        label="Tên môn học"
        variant="outlined"
        fullWidth
        name="cateMonHoc"
        value={selectedSubject}
        onChange={handleSubjectChange}
        disabled={!selectedSemester}
        sx={{ marginBottom: 2 }}
      />
      {subjectError && (
        <Typography variant="body2" sx={{ color: "error" }}>
          {subjectError}
        </Typography>
      )}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 2,
          marginBottom: 2,
        }}
      >
        <Button variant="contained" color="primary" onClick={handleAddCategory}>
          Thêm danh mục
        </Button>
        <Button variant="contained" color="error" onClick={handleCloseModal}>
          Hủy
        </Button>
      </Box>
    </Box>
  );
}

export default AddCategory;
