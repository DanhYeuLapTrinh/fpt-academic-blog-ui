import { useState } from "react";
import { axiosConfig } from "../../../api/axios";
import useAuth from "../../../../user/hooks/useAuth";

export const AddTag = () => {
  const [tag, setTag] = useState({
    tagName: "",
  });

  const handleInput = (e) => {
    setTag({ ...tag, [e.target.name]: e.target.value });
  };

  const { auth } = useAuth();

  const headers = {
    Authorization: `Bearer ${auth.token}`,
  };

  function handleSubmit(e) {
    e.preventDefault();
    axiosConfig
      .post("admin/new-tag", tag, { headers })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <div className="w-full max-w-full h-full items-center bg-background">
      <form
        className="h-full bg-white p-10 rounded-lg border border-gray-200"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Thêm thẻ mới</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            className="border p-2 rounded-lg"
            type="text"
            onChange={handleInput}
            placeholder="Tên thẻ"
            name="tagName"
          />
        </div>
        <button className="bg-buttonSubmit text-white py-2 px-4 rounded">
          Thêm thẻ
        </button>
      </form>
    </div>
  );
};
