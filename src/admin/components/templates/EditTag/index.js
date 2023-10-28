import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";

export const EditTag = () => {
  const axiosPrivate = useAxiosPrivate();
  const [tag, setTag] = useState({
    tagId: "",
    tagName: "",
  });

  const [tagList, setTagList] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (e) => {
    setTag({ ...tag, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axiosPrivate
      .get(process.env.REACT_APP_TAGS_LIST)
      .then((res) => {
        setTagList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const isDuplicate = tagList.some((t) => t.tagName === tag.tagName);
    if (isDuplicate) {
      setErrorMessage("Tên thẻ đã tồn tại.");
      return;
    }
    axiosPrivate
      .post(process.env.REACT_APP_EDIT_TAG, tag)
      .then((res) => {
        // Cập nhật danh sách thẻ sau khi cập nhật thành công
        const updatedTagList = [...tagList];
        const index = updatedTagList.findIndex((t) => t.id === tag.tagId);
        if (index !== -1) {
          updatedTagList[index].tagName = tag.tagName;
        }
        setTagList(updatedTagList);

        toast.success("Chỉnh sửa thẻ thành công", {
          position: "top-right",
          autoClose: 3000,
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="w-full max-w-full h-full items-center bg-background">
      <form
        className="h-full bg-white p-10 rounded-lg border border-gray-200"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Cập nhật thẻ</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <select
            className="border p-2 rounded-lg"
            onChange={handleInput}
            name="tagId"
          >
            <option value="">Chọn một thẻ</option>
            {tagList.map((t) => (
              <option key={t.id} value={t.id}>
                {t.tagName}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            className="border p-2 rounded-lg"
            type="text"
            onChange={handleInput}
            placeholder="Nhập nội dung thay đổi thẻ"
            name="tagName"
          />
        </div>
        <p style={{ color: "red" }}>{errorMessage}</p>
        <button className="bg-buttonSubmit text-white py-2 px-4 mt-3 rounded">
          Cập nhật thẻ
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} closeOnClick />
    </div>
  );
};
