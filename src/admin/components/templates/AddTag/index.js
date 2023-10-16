import { useState } from "react";
import { axiosConfig } from "../../../api/axios";
import useAuth from "../../../../user/hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddTag = () => {
  const [tag, setTag] = useState({
    tagName: "",
  });

  const [error, setError] = useState("");

  const handleInput = (e) => {
    setTag({ ...tag, [e.target.name]: e.target.value });
  };

  const { auth } = useAuth();

  const headers = {
    Authorization: `Bearer ${auth.token}`,
  };

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const regex = /^[A-Za-z0-9\s]+$/;

    if (!tag.tagName || !regex.test(tag.tagName)) {
      setError("Tên thẻ không hợp lệ");
      return;
    }

    axiosConfig
      .post("admin/new-tag", tag, { headers })
      .then((res) => {
        // Thông báo thành công bằng toast message
        toast.success(`Thêm thẻ ${tag.tagName} thành công`, {
          position: "top-right",
          autoClose: 3000, // Tự đóng thông báo sau 3 giây
        });
        console.log(res);
      })
      .catch((err) => {
        toast.error(`Thêm thẻ ${tag.tagName} thất bại`, {
          position: "top-right",
          autoClose: 3000,
        });
        console.log(err);
      });
  }

  return (
    <div className="w-full max-w-full h-full items-center bg-background">
      <form
        className="h-full bg-white p-10 rounded-lg border border-gray-200"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Thêm thẻ mới</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            className={`border p-2 rounded-lg ${error ? "border-red-500" : ""}`}
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
      <ToastContainer position="top-right" autoClose={3000} closeOnClick />
    </div>
  );
};
