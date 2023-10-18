import React, { useEffect, useState } from "react";
import { axiosConfig } from "../../../api/axios";
import useAuth from "../../../../user/hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCategory() {
  const [cateList, setCateList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  const { auth } = useAuth();

  const headers = {
    Authorization: `Bearer ${auth.token}`,
  };

  useEffect(() => {
    axiosConfig.get("admin/categories", { headers }).then((res) => {
      setCateList(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className="w-full max-w-full h-full items-center bg-background">
      <form className="h-full bg-white p-10 rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Thêm danh mục mới</h2>
        <p className="text-red-500"></p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <select
            className="border p-2 rounded-lg"
            name="cateChuyenNganh"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Chọn chuyên ngành</option>
            {cateList.map((cate) => (
              <option key={cate.id} value={cate.id}>
                {cate.categoryName}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded-lg"
            name="cateHocKy"
            onChange={(e) => setSelectedSemester(e.target.value)}
            disabled={!selectedCategory}
          >
            <option value="">Chọn học kỳ</option>
            {selectedCategory &&
              cateList
                .find((cate) => cate.id === selectedCategory)
                ?.childCategories.map((childCate) =>
                  childCate.categoryType === "Semester" ? (
                    <option key={childCate.id} value={childCate.id}>
                      {childCate.categoryName}
                    </option>
                  ) : null
                )}
          </select>

          <input
            className="border p-2 rounded-lg"
            type="text"
            placeholder="Tên môn học"
            name="cateMonHoc"
            disabled={!selectedCategory || !selectedSemester}
          />
        </div>
        <button className="bg-buttonSubmit text-white py-2 px-4 rounded">
          Thêm danh mục
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} closeOnClick />
    </div>
  );
}

export default AddCategory;
