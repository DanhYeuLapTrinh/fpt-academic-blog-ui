import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import { addUserSchema } from "../../components/atoms/AddUserValidation";
import useAxiosPrivate from "../../../user/hooks/useAxiosPrivate";

function AddUserForm({ open, onClose, onAddUser, isLoading, data }) {
  const [selectedRole, setSelectedRole] = useState("");

  const [majors, setMajors] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate
      .get(process.env.REACT_APP_MAJORS_LIST)
      .then((response) => {
        setMajors(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải danh sách majors", error);
      });
  }, []);

  const initialUser = {
    username: "",
    password: "",
    fullname: "",
    email: "",
    phone: "",
    role: "",
    majorID: "",
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      fullname: "",
      email: "",
      phone: "",
      role: "",
      majorID: "",
    },
    validationSchema: addUserSchema,

    handleChange: (e) => {
      const { name, value } = e.target;

      formik.setFieldValue(name, value);

      formik.setFieldError(name, null);

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },

    onSubmit: (values) => {
      let hasError = false;

      const usernames = data.map((user) => user.username);
      if (usernames.includes(values.username)) {
        formik.setFieldError("username", "Tên tài khoản đã tồn tại");
        hasError = true;
      }

      const phone = data.map((user) => user.phone);
      if (phone.includes(values.phone)) {
        formik.setFieldError("phone", "Số diện thoại đã tồn tại");
        hasError = true;
      }

      const email = data.map((user) => user.email);
      if (email.includes(values.email)) {
        formik.setFieldError("email", "Email đã tồn tại");
        hasError = true;
      }

      if (!values.majorID) {
        formik.setFieldError("majorID", "Vui lòng chọn ngành");
        hasError = true;
      }

      if (!hasError) {
        onAddUser({
          ...values,
          role: selectedRole || "",
          majorID: values.majorID || null,
        });

        onClose();

        formik.resetForm();
      }
    },
  });

  const [formData, setFormData] = useState(initialUser);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message = "Nếu F5 thì dữ liệu đang nhập sẽ mất";
      event.returnValue = message;
      return message;
    };

    if (open) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    } else {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [open]);

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
            onChange={(e) => {
              formik.handleChange(e);
              setSelectedRole(e.target.value);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.role}
            error={formik.touched.role && !!formik.errors.role}
          >
            <MenuItem value="">
              <em>Chọn vai trò</em>
            </MenuItem>
            <MenuItem value="lecturer">lecturer</MenuItem>
            <MenuItem value="mentor">mentor</MenuItem>
            <MenuItem value="student">student</MenuItem>
          </Select>
          {formik.touched.role && formik.errors.role ? (
            <FormHelperText error>{formik.errors.role}</FormHelperText>
          ) : null}
        </FormControl>

        <FormControl required fullWidth sx={{ paddingTop: "5px" }}>
          <InputLabel>Ngành</InputLabel>
          <Select
            name="majorID"
            onChange={formik.handleChange}
            value={formik.values.majorID}
            error={formik.errors.majorID}
            helpertext={formik.errors.majorID}
          >
            <MenuItem value="">
              <em>Chọn ngành</em>
            </MenuItem>
            {majors.map((major) => (
              <MenuItem key={major.id} value={major.id}>
                {major.majorName}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.majorID && formik.errors.majorID ? (
            <FormHelperText error>{formik.errors.majorID}</FormHelperText>
          ) : null}
        </FormControl>
      </DialogContent>
      <DialogActions style={{ paddingTop: "10px" }}>
        <Button
          sx={{
            bgcolor: "red",
            borderRadius: "2rem",
            height: "2rem",
            width: "6rem",
            color: "white",
            "&:hover": {
              bgcolor: "red",
            },
          }}
          onClick={onClose}
        >
          Hủy
        </Button>
        <Button
          sx={{
            bgcolor: "#34D399",
            borderRadius: "2rem",
            height: "2rem",
            width: "6rem",
            color: "white",
            "&:hover": {
              bgcolor: "#34D399",
              opacity: !formik.isValid ? 0.5 : 1,
            },
          }}
          onClick={formik.handleSubmit}
          disabled={!formik.isValid || isLoading}
        >
          {!isLoading ? (
            "Thêm mới"
          ) : (
            <CircularProgress size={20} sx={{ color: "white" }} />
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddUserForm;
