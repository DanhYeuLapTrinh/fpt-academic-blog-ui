import React, { useState } from "react";
import { Button } from "@mui/base";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useFormik } from "formik";
import { addUserSchema } from "../../components/atoms/AddUserValidation";
function AddUserForm({ open, onClose, onAddUser, data }) {
  const initialUser = {
    username: "",
    password: "",
    fullname: "",
    email: "",
    phone: "",
    role: "",
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      fullname: "",
      email: "",
      phone: "",
      role: "",
    },
    validationSchema: addUserSchema,

    handleChange: (e) => {
      const { name, value } = e.target;

      // Cập nhật giá trị vào form values
      formik.setFieldValue(name, value);

      // Set lỗi field thành null
      formik.setFieldError(name, null);

      // Cập nhật state formData
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },

    onSubmit: (values) => {
      // Khai báo biến kiểm tra có lỗi hay không
      let hasError = false;

      // Kiểm tra trùng username
      const usernames = data.map((user) => user.username);
      if (usernames.includes(values.username)) {
        formik.setFieldError("username", "Tên tài khoản đã tồn tại");
        hasError = true;
      }

      // Kiểm tra email trùng
      const email = data.map((user) => user.email);
      if (email.includes(values.email)) {
        formik.setFieldError("email", "Email đã tồn tại");
        hasError = true;
      }

      // Nếu không có lỗi thì cho phép submit form
      if (!hasError) {
        // Call API submit form
        onAddUser(values);

        // Đóng dialog
        onClose();

        // Reset form
        formik.resetForm();
      }
    },
  });

  const [formData, setFormData] = useState(initialUser);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{ fontSize: "30px", fontWeight: "bold", textAlign: "center" }}
      >
        Thêm người dùng mới
      </DialogTitle>
      <DialogContent style={{ paddingBottom: "5px" }}>
        <TextField
          margin="dense"
          label="Tên tài khoản *"
          type="text"
          name="username"
          fullWidth
          variant="outlined"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.errors.username}
          helperText={formik.errors.username}
        />

        <TextField
          margin="dense"
          label="Nhập mật khẩu *"
          type="password"
          name="password"
          fullWidth
          variant="outlined"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
          helperText={formik.errors.password}
        />

        <TextField
          margin="dense"
          label="Tên đầy đủ *"
          type="text"
          name="fullname"
          fullWidth
          variant="outlined"
          value={formik.values.fullname}
          onChange={formik.handleChange}
          error={formik.errors.fullname}
          helperText={formik.errors.fullname}
        />

        <TextField
          margin="dense"
          label="Địa chỉ email *"
          type="email"
          name="email"
          fullWidth
          variant="outlined"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
          helperText={formik.errors.email}
        />

        <TextField
          margin="dense"
          label="Nhập số điện thoại *"
          type="tel"
          name="phone"
          fullWidth
          variant="outlined"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.errors.phone}
          helperText={formik.errors.phone}
        />
        <FormControl required fullWidth sx={{ paddingTop: "5px" }}>
          <InputLabel>Vai trò</InputLabel>
          <Select
            name="role"
            onChange={formik.handleChange}
            value={formik.values.role}
            error={formik.errors.role}
            helpertext={formik.errors.role}
          >
            <MenuItem value="admin">admin</MenuItem>
            <MenuItem value="lecturer">lecturer</MenuItem>
            <MenuItem value="mentor">mentor</MenuItem>
            <MenuItem value="student">student</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions style={{ paddingTop: "10px" }}>
        <Button onClick={onClose}>Hủy</Button>
        <Button
          onClick={formik.handleSubmit}
          disabled={!formik.isValid}
          className={`bg-green-500 rounded h-8 w-24 text-white ${
            !formik.isValid && "opacity-50"
          }`}
        >
          Thêm mới
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddUserForm;
