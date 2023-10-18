import React, { useState, useEffect } from "react";
import { axiosConfig } from "../../../api/axios";
import useAuth from "../../../../user/hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const DeleteTag = () => {
  const [tagId, setTagId] = useState(""); // Thêm state để lưu trữ tagId
  const [tagList, setTagList] = useState([]); // Danh sách các tag
  const { auth } = useAuth();
  useEffect(() => {
    // Lấy danh sách các thẻ từ backend
    axiosConfig
      .get("admin/tags", { headers })
      .then((res) => {
        setTagList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const headers = {
    Authorization: `Bearer ${auth.token}`,
  };

  const handleDelete = () => {
    if (!tagId) {
      // Không có tagId được chọn
      alert("Vui lòng chọn một thẻ để xóa.");
      return;
    }
    // Gửi yêu cầu xóa thẻ dựa trên tagId sử dụng phương thức POST
    axiosConfig
      .post("admin/delete-tag", { tagId }, { headers }) // Sử dụng POST để xóa thẻ
      .then((res) => {
        toast.success(`Xóa thẻ thành công`, {
          position: "top-right",
          autoClose: 3000, // Tự đóng thông báo sau 3 giây
        });
        console.log(res);
        // Sau khi xóa thành công, cập nhật danh sách thẻ
        setTagList((prevTags) => prevTags.filter((tag) => tag.id !== tagId));
        setTagId(""); // Đặt tagId về trạng thái ban đầu
      })
      .catch((err) => {
        toast.error(`Xóa thẻ thất bại`, {
          position: "top-right",
          autoClose: 3000,
        });
        console.log(err);
      });
  };

  return (
    <div className="w-full max-w-full h-full items-center bg-background">
      <div className="bg-white p-10 rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Xóa thẻ</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <select
            className="border p-2 rounded-lg"
            onChange={(e) => setTagId(e.target.value)}
            value={tagId}
          >
            <option value="">Chọn một thẻ</option>
            {tagList.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.tagName}
              </option>
            ))}
          </select>
          <button
            className="bg-buttonSubmit text-white py-2 px-4 rounded"
            onClick={handleDelete}
          >
            Xóa thẻ
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} closeOnClick />
    </div>
  );
};
