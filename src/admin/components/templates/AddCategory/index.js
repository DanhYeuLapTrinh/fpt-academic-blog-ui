import React, { useEffect, useState } from "react";
import { axiosConfig } from "../../../api/axios";
import useAuth from "../../../../user/hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCategory() {
  const [cateList, setCateList] = useState([]);
  const { auth } = useAuth();

  const headers = {
    Authorization: `Bearer ${auth.token}`,
  };

  useEffect(() => {
    axiosConfig.get("admin/categories", { headers }).then((res) => {
      setCateList(res.data);
      console.log(res.data);
    });
  }, []); // Đảm bảo sử dụng [] để chỉ gọi useEffect sau khi component được render

  return (
    <div className="w-full max-w-full h-full items-center bg-background">
      <form className="h-full bg-white p-10 rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Thêm danh mục mới</h2>
        <p className="text-red-500"></p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <select className="border p-2 rounded-lg" name="cateIdChuyenNganh">
            <option value="">Chọn chuyên ngành</option>
            {cateList.map((cate) => (
              <option key={cate.id} value={cate.id}>
                {cate.categoryName}
              </option>
            ))}
          </select>
          <select className="border p-2 rounded-lg" name="cateId">
            <option value="">Chọn học kỳ</option>
            {cateList.map((cate) => (
              <React.Fragment key={cate.id}>
                {cate.childCategories.map((childCate) => (
                  <option key={childCate.id} value={childCate.id}>
                    {childCate.categoryName}
                  </option>
                ))}
              </React.Fragment>
            ))}
          </select>

          <input
            className={`border p-2 rounded-lg`}
            type="text"
            placeholder="Tên môn học"
            name="cateName"
          />
        </div>
        <button className="bg-buttonSubmit text-white py-2 px-4 rounded">
          Thêm thẻ
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} closeOnClick />
    </div>
  );
}

export default AddCategory;
