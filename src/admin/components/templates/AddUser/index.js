import { useState } from "react";

import { axiosConfig } from "../../../api/axios";
import useAuth from "../../../../user/hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddNewUser = () => {
  const initialUser = {
    username: "",
    password: "",
    fullname: "",
    email: "",
    phone: "",
    role: "",
  };

  const [user, setUser] = useState(initialUser);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
    phone: "",
    role: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    // Clear any previous validation error for the input
    setErrors({ ...errors, [name]: "" });
  };

  const { auth } = useAuth();

  const headers = {
    Authorization: `Bearer ${auth.token}`,
  };

  // Function to reset the form
  const resetForm = () => {
    setUser(initialUser);
    setErrors(initialUser);
  };

  function handleSubmit(e) {
    e.preventDefault();

    // Regex
    const phonePattern = /^\d{10}$/;
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const namePattern = /^[A-Za-z\s]+$/;

    const newErrors = {};

    if (!user.username) {
      newErrors.username = "Tài khoản không được bỏ trống.";
    }

    if (!user.password) {
      newErrors.password = "Mật khẩu không được bỏ trống.";
    }

    if (!user.role) {
      newErrors.role = "Vai trò không được bỏ trống.";
    }

    if (!phonePattern.test(user.phone)) {
      newErrors.phone = "Số điện thoại phải có 10 số.";
    }

    if (!emailPattern.test(user.email)) {
      newErrors.email = "Email phải có ký tự @.";
    }

    if (!namePattern.test(user.fullname)) {
      newErrors.fullname = "Tên đầy đủ không được chứa số.";
    }

    // If there are errors, do not submit the form
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Reset the form and display a success message
      axiosConfig
        .post("admin/register", user, { headers })
        .then((res) => {
          console.log(res);
          resetForm(); // Reset the form
          toast.success("Thêm tài khoản thành công", {
            position: "top-right",
            autoClose: 3000,
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Thêm thẻ thất bại, đã có lỗi xảy ra!!!", {
            position: "top-right",
            autoClose: 3000,
          });
        });
    }
  }

  return (
    <div className="w-full max-w-full h-full items-center bg-background">
      <form
        className="h-full bg-white p-10 rounded-lg border border-gray-200"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Thêm tài khoản mới</h2>
        {/* Username */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            className={`border p-2 rounded-lg ${
              errors.username && "border-red-500"
            }`}
            type="text"
            onChange={handleInput}
            placeholder="Tài khoản"
            name="username"
          />
          {errors.username && (
            <div className="text-red-500">{errors.username}</div>
          )}
        </div>
        {/* Password */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            className={`border p-2 rounded-lg ${
              errors.password && "border-red-500"
            }`}
            type="password"
            onChange={handleInput}
            placeholder="Mật khẩu"
            name="password"
          />
          {errors.password && (
            <div className="text-red-500">{errors.password}</div>
          )}
        </div>
        {/* Full Name */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            className={`border p-2 rounded-lg ${
              errors.fullname && "border-red-500"
            }`}
            type="text"
            onChange={handleInput}
            placeholder="Tên đầy đủ"
            name="fullname"
          />
          {errors.fullname && (
            <div className="text-red-500">{errors.fullname}</div>
          )}
        </div>
        {/* Email */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            className={`border p-2 rounded-lg ${
              errors.email && "border-red-500"
            }`}
            type="email"
            onChange={handleInput}
            placeholder="Email"
            name="email"
          />
          {errors.email && <div className="text-red-500">{errors.email}</div>}
        </div>
        {/* Phone */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            className={`border p-2 rounded-lg ${
              errors.phone && "border-red-500"
            }`}
            type="text"
            onChange={handleInput}
            placeholder="Số điện thoại"
            name="phone"
          />
          {errors.phone && <div className="text-red-500">{errors.phone}</div>}
        </div>
        {/* Role */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <select
            className={`border p-2 w-full rounded-lg ${
              errors.role && "border-red-500"
            }`}
            name="role"
            onChange={handleInput}
          >
            <option value="">Chọn vai trò</option>
            <option value="Admin">Admin</option>
            <option value="Mentor">Mentor</option>
            <option value="Lecturer">Lecturer</option>
            <option value="Student">Student</option>
          </select>
          {errors.role && <div className="text-red-500">{errors.role}</div>}
        </div>
        <button className="bg-buttonSubmit text-white py-2 px-4 rounded">
          Thêm tài khoản
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} closeOnClick />
    </div>
  );
};
