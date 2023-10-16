import React, { useState, useEffect } from "react";
import { axiosConfig } from "../../../api/axios";
import useAuth from "../../../../user/hooks/useAuth";

export const EditTag = () => {
  const [tag, setTag] = useState({
    tagId: "",
    tagName: "",
  });

  const { auth } = useAuth();

  const headers = {
    Authorization: `Bearer ${auth.token}`,
  };

  const [tagList, setTagList] = useState([]);

  const handleInput = (e) => {
    setTag({ ...tag, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axiosConfig
      .get("admin/tags", { headers })
      .then((res) => {
        setTagList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    axiosConfig
      .post("admin/edit-tag", tag, { headers })
      .then((res) => console.log(res))
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
          <input
            className="border p-2 rounded-lg"
            type="text"
            onChange={handleInput}
            placeholder="Nhập nội dung thay đổi thẻ"
            name="tagName"
          />
        </div>
        <button className="bg-buttonSubmit text-white py-2 px-4 rounded">
          Cập nhật thẻ
        </button>
      </form>
    </div>
  );
};
