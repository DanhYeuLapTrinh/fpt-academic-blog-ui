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
  const [isFormOpen, setIsFormOpen] = useState(false);

  //--------------------------------------------------------------

  useEffect(() => {
    axiosPrivate.get(process.env.REACT_APP_CATEGORIES_LIST).then((res) => {
      setCateList(res.data);
      console.log(res.data);
    });

    axiosPrivate.get(process.env.REACT_APP_MAJORS_LIST).then((res) => {
      setMajorList(res.data);
    });
  }, []);

  //--------------------------------------------------------------

  const handleAddCategory = (e) => {
    e.preventDefault();

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

        closeAddCategoryModal();
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
    }

    setSelectedCategory(e.target.value);
  };

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
  };

  const handleCloseModal = () => {
    closeAddCategoryModal();
  };

  //--------------------------------------------------------------

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
          disabled={!selectedCategory || !selectedMajorID}
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

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
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
        backgroundColor: isFormOpen ? "rgba(255, 255, 255, 0.8)" : "white",
        padding: 2,
        borderRadius: 2,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        position: "relative",
        opacity: isFormOpen ? 0.5 : 1,
        zIndex: isFormOpen ? 1 : "auto",
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
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Chọn chuyên ngành</option>
          {cateList.map((cate) => (
            <option key={cate.id} value={cate.categoryName}>
              {cate.categoryName}
            </option>
          ))}
        </Select>
      </FormControl>
      {renderSemesterSelect()}
      <TextField
        label="Tên môn học"
        variant="outlined"
        name="cateMonHoc"
        value={selectedSubject}
        onChange={(e) => setSelectedSubject(e.target.value)}
        disabled={!selectedCategory || !selectedMajorID || !selectedSemester}
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
