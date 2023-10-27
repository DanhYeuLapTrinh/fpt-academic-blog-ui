import React, { useState, useEffect } from "react";
import { Button } from "@mui/base";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SearchNotFound from "../../components/atoms/SearchNotFound";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
function AddUserForm({ open, onClose, onAddUser, data }) {
  const [hasErrors, setHasErrors] = useState(false);

  const [isValid, setIsValid] = useState(true);

  const nonEmptyRegex = /.+/;
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const phoneRegex = /^0\d{9}$/ || /^\d{10}$/;
  const fullnameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
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

  useEffect(() => {
    // Check for form validity whenever formData changes
    const isFormValid = () => {
      if (
        formData.username.match(nonEmptyRegex) &&
        formData.password.match(nonEmptyRegex) &&
        formData.fullname.match(fullnameRegex) &&
        formData.email.match(nonEmptyRegex) &&
        formData.email.match(emailRegex) &&
        (!formData.phone || formData.phone.match(phoneRegex)) &&
        formData.role.match(nonEmptyRegex)
      ) {
        return true;
      }
      return false;
    };

    setIsValid(isFormValid());
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setFormErrors({ ...formErrors, [name]: null });
  };

  const handleAddUser = () => {
    setHasErrors(false);

    const validationErrors = {};

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

    // Kiểm tra isValid và hasErrors
    if (isValid && !hasErrors) {
      // Kiểm tra xem có username trùng hay không
      if (data.some((user) => user.username === formData.username)) {
        setFormErrors({
          ...formErrors,
          username: "Tên tài khoản đã tồn tại",
        });
      } else {
        // Không trùng thì gửi dữ liệu về backend
        onAddUser(formData);
        onClose();
        setFormData(initialUser);
        setFormErrors({});
        setIsValid(true);
      }
    }
  };

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
          value={formData.username}
          onChange={handleInputChange}
          error={Boolean(formErrors.username)}
          helperText={formErrors.username}
        />

        <TextField
          margin="dense"
          label="Nhập mật khẩu *"
          type="password"
          name="password"
          fullWidth
          variant="outlined"
          value={formData.password}
          onChange={handleInputChange}
          error={Boolean(formErrors.password)}
          helperText={formErrors.password}
        />

        <TextField
          margin="dense"
          label="Tên đầy đủ *"
          type="text"
          name="fullname"
          fullWidth
          variant="outlined"
          value={formData.fullname}
          onChange={handleInputChange}
          error={Boolean(formErrors.fullname)}
          helperText={formErrors.fullname}
        />

        <TextField
          margin="dense"
          label="Địa chỉ email *"
          type="email"
          name="email"
          fullWidth
          variant="outlined"
          value={formData.email}
          onChange={handleInputChange}
          error={Boolean(formErrors.email)}
          helperText={formErrors.email}
        />

        <TextField
          margin="dense"
          label="Nhập số điện thoại *"
          type="tel"
          name="phone"
          fullWidth
          variant="outlined"
          value={formData.phone}
          onChange={handleInputChange}
          error={Boolean(formErrors.phone)}
          helperText={formErrors.phone}
        />
        <FormControl required fullWidth sx={{ paddingTop: "5px" }}>
          <InputLabel>Vai trò</InputLabel>
          <Select
            name="role"
            onChange={handleInputChange}
            value={formData.role}
            error={Boolean(formErrors.role)}
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Mentor">Lecturer</MenuItem>
            <MenuItem value="Lecturer">Mentor</MenuItem>
            <MenuItem value="Student">Student</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions style={{ paddingTop: "10px" }}>
        <Button onClick={onClose}>Hủy</Button>
        <Button
          onClick={handleAddUser}
          disabled={!isValid}
          className={`bg-green-500 rounded h-8 w-24 text-white ${
            !isValid && "opacity-50"
          }`}
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
    item.fullName.toLowerCase().includes(event.target.value.toLowerCase())
  );
  setRecords(filteredData);

  const isNotFound = !filteredData.length;

  {
    isNotFound && <SearchNotFound filteredData={filteredData} />;
  }
};
