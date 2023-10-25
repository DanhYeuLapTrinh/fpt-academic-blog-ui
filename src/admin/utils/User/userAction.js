import React, { useState } from "react";
import { Button } from "@mui/base";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function AddUserForm({ open, onClose, onAddUser, data }) {
  const [duplicateUsernameError, setDuplicateUsernameError] = useState("");
  const [duplicateEmailError, setDuplicateEmailError] = useState("");
  const [allFieldsEmpty, setAllFieldsEmpty] = useState(true);
  const [hasErrors, setHasErrors] = useState(false); // Biến để kiểm tra lỗi tổng thể

  const nonEmptyRegex = /.+/; // Non-empty field
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const phoneRegex = /^\d{1,10}$/;
  const fullnameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/; // Letters with diacritics, spaces, hyphens, and apostrophes
  const usernameErrorMessage = "Tên tài khoản không được bỏ trống";
  const passwordErrorMessage = "Mật khẩu không được bỏ trống";
  const fullnameErrorMessage = "Tên đầy đủ không hợp lệ";
  const emailErrorMessage = "Địa chỉ email không hợp lệ";
  const phoneErrorMessage = "Số điện thoại tối đa 10 số";
  const roleErrorMessage = "Vai trò không được bỏ trống";

  const initialUser = {
    username: "",
    password: "",
    fullname: "",
    email: "",
    phone: "",
    role: "",
  };
  const [formData, setFormData] = useState(initialUser);

  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
    phone: "",
    role: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleAddUser = () => {
    setHasErrors(false); // Đặt lại biến hasErrors

    const validationErrors = {}; // Create an object to collect validation errors

    // Validate and collect errors
    if (!formData.username.match(nonEmptyRegex)) {
      validationErrors.username = usernameErrorMessage;
      setHasErrors(true);
    }

    if (!formData.password.match(nonEmptyRegex)) {
      validationErrors.password = passwordErrorMessage;
      setHasErrors(true);
    }

    if (!formData.fullname.match(fullnameRegex)) {
      validationErrors.fullname = fullnameErrorMessage;
      setHasErrors(true);
    }

    if (
      !formData.email.match(nonEmptyRegex) ||
      !formData.email.match(emailRegex)
    ) {
      validationErrors.email = emailErrorMessage;
      setHasErrors(true);
    }

    if (formData.phone && !formData.phone.match(phoneRegex)) {
      validationErrors.phone = phoneErrorMessage;
      setHasErrors(true);
    }

    if (!formData.role.match(nonEmptyRegex)) {
      validationErrors.role = roleErrorMessage;
      setHasErrors(true);
    }

    // Check for duplicate username and email
    if (data.some((user) => user.username === formData.username)) {
      validationErrors.duplicateUsername = "Tên tài khoản đã tồn tại";
      setHasErrors(true);
    }

    if (data.some((user) => user.email === formData.email)) {
      validationErrors.duplicateEmail = "Email đã tồn tại";
      setHasErrors(true);
    }

    if (hasErrors) {
      // If there are errors, set the validation errors
      setFormErrors(validationErrors);
    } else {
      // If there are no errors, proceed with adding the user
      onAddUser(formData);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Thêm người dùng mới</DialogTitle>
      <DialogContent style={{ paddingBottom: "5px" }}>
        <TextField
          margin="dense"
          label="Tên tài khoản"
          type="text"
          name="username"
          fullWidth
          variant="standard"
          value={formData.username}
          onChange={handleInputChange}
          error={
            Boolean(formErrors.username) || Boolean(duplicateUsernameError)
          }
          helperText={formErrors.username || duplicateUsernameError}
        />

        <TextField
          margin="dense"
          label="Nhập mật khẩu"
          type="password"
          name="password"
          fullWidth
          variant="standard"
          value={formData.password}
          onChange={handleInputChange}
          error={Boolean(formErrors.password)}
          helperText={formErrors.password}
        />

        <TextField
          margin="dense"
          label="Tên đầy đủ"
          type="text"
          name="fullname"
          fullWidth
          variant="standard"
          value={formData.fullname}
          onChange={handleInputChange}
          error={Boolean(formErrors.fullname)}
          helperText={formErrors.fullname}
        />

        <TextField
          margin="dense"
          label="Địa chỉ email"
          type="email"
          name="email"
          fullWidth
          variant="standard"
          value={formData.email}
          onChange={handleInputChange}
          error={Boolean(formErrors.email) || Boolean(duplicateEmailError)}
          helperText={formErrors.email || duplicateEmailError}
        />

        <TextField
          margin="dense"
          label="Nhập số điện thoại"
          type="tel"
          name="phone"
          fullWidth
          variant="standard"
          value={formData.phone}
          onChange={handleInputChange}
          error={Boolean(formErrors.phone)}
          helperText={formErrors.phone}
        />

        <select
          className="mt-4 border-b-2 border-solid outline-0 w-full"
          name="role"
          onChange={handleInputChange}
          value={formData.role}
          error={Boolean(formErrors.role)}
        >
          <option value="" className="text-form">
            Chọn vai trò
          </option>
          <option value="Admin">Admin</option>
          <option value="Mentor">Mentor</option>
          <option value="Lecturer">Lecturer</option>
          <option value="Student">Student</option>
        </select>
      </DialogContent>
      <DialogActions style={{ paddingTop: "10px" }}>
        <Button onClick={onClose}>Hủy thêm</Button>
        <Button
          onClick={handleAddUser}
          className="bg-green-500 rounded h-8 w-20 text-white"
        >
          Thêm mới
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddUserForm;

export const handleSearch = (event, data, setRecords) => {
  const filteredData = data.filter((item) =>
    item.username.toLowerCase().includes(event.target.value.toLowerCase())
  );
  setRecords(filteredData);
};
