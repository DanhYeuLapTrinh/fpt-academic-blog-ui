import * as Yup from "yup";

export const addUserSchema = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Tên tài khoản không được bỏ trống hoặc chứa kí tự đặc biệt"
    )
    .required("Tên tài khoản không được bỏ trống"),
  password: Yup.string().required("Mật khẩu không được bỏ trống"),
  fullname: Yup.string()
    .matches(/^[a-zA-Z\s\u00C0-\u1EF9]+$/, "Tên đầy đủ không hợp lệ")
    .required("Tên đầy đủ không được bỏ trống"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Email không được bỏ trống"),
  phone: Yup.string()
    .matches(/^0[0-9]{9}$/, "Số điện thoại không hợp lệ (tối đa 10 số)")
    .required("Số điện thoại không được bỏ trống"),
  role: Yup.string().required("Vai trò không được bỏ trống"),
});
