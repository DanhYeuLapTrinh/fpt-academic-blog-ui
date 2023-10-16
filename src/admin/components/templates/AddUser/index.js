import { useState } from "react";

import { axiosConfig } from "../../../api/axios";
import useAuth from "../../../../user/hooks/useAuth";

export const AddNewUser = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
    phone: "",
    role: "",
  });

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value }); // Use e.target.name instead of e.target.value
  };

  const { auth } = useAuth();

  const headers = {
    Authorization: `Bearer ${auth.token}`, // Use template literals to include the token
  };

  function handleSubmit(e) {
    e.preventDefault();
    axiosConfig
      .post("admin/register", user, { headers }) // Send user directly without JSON.stringify
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <div className="w-full max-w-full h-full items-center bg-background">
      <form
        className="h-full bg-white p-10 rounded-lg border border-gray-200"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Thêm tài khoản mới</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            className="border p-2 rounded-lg"
            type="text"
            onChange={handleInput}
            placeholder="Tài khoản"
            name="username" // Set name attribute to match the user object key
          />
          <input
            className="border p-2 rounded-lg"
            type="password"
            onChange={handleInput}
            placeholder="Mật khẩu"
            name="password" // Set name attribute to match the user object key
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            className="border p-2 rounded-lg"
            type="text"
            onChange={handleInput}
            placeholder="Tên đầy đủ"
            name="fullname" // Set name attribute to match the user object key
          />
          <input
            className="border p-2 rounded-lg"
            type="email"
            onChange={handleInput}
            placeholder="Email"
            name="email" // Set name attribute to match the user object key
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            className="border p-2 rounded-lg"
            type="text"
            onChange={handleInput}
            placeholder="Số điện thoại"
            name="phone" // Set name attribute to match the user object key
          />
          <select
            className="border p-2 w-full rounded-lg"
            name="role" // Set name attribute to match the user object key
            onChange={handleInput}
          >
            <option>Chọn vai trò</option>
            <option>Admin</option>
            <option>Mentor</option>
            <option>Lecturer</option>
            <option>Student</option>
          </select>
        </div>
        <button className="bg-buttonSubmit text-white py-2 px-4 rounded">
          Thêm tài khoản
        </button>
      </form>
    </div>
  );
};
