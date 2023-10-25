import React, { useState, useEffect } from "react";
import { Input } from "@material-tailwind/react";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "react-modal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { TablePagination } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button } from "@mui/base";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";

function UserResultList() {
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

  const axiosPrivate = useAxiosPrivate();

  const [data, setData] = useState([]);

  const [records, setRecords] = useState([]);

  const [showMuteModal, setShowMuteModal] = useState(false);

  const [muteDuration, setMuteDuration] = useState(1);

  const [isMuted, setIsMuted] = useState({});

  const [selectedUserId, setSelectedUserId] = useState("");

  const [selectedUsername, setSelectedUsername] = useState("");

  const [mutedUserIds, setMutedUserIds] = useState([]);

  const [editingUserId, setEditingUserId] = useState(null);

  const [newRole, setNewRole] = useState("");

  const [showRoleSuccessModal, setShowRoleSuccessModal] = useState(false);

  const [originalRole, setOriginalRole] = useState(""); // Biến lưu trữ vai trò ban đầu

  const [isBanning, setIsBanning] = useState(false);

  const [isBanningId, setIsBanningId] = useState(null);

  const [banStatus, setBanStatus] = useState(
    JSON.parse(localStorage.getItem("banStatus")) || {}
  );

  //Split page
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  //Popup thêm người dùng mới
  const [open, setOpen] = useState(false);

  //Regex
  const usernameRegex = /.+/; // Non-empty field
  const usernameErrorMessage = "Tên tài khoản không được bỏ trống";

  const passwordRegex = /.+/; // Non-empty field
  const passwordErrorMessage = "Mật khẩu không được bỏ trống";

  const fullnameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/; // Letters with diacritics, spaces, hyphens, and apostrophes
  const fullnameErrorMessage = "Tên đầy đủ không hợp lệ";

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const emailErrorMessage = "Địa chỉ email không hợp lệ";

  const phoneRegex = /^\d{1,10}$/; // Maximum of 10 digits
  const phoneErrorMessage = "Số điện thoại tối đa 10 số";

  const roleRegex = /.+/; // Non-empty field
  const roleErrorMessage = "Vai trò không được bỏ trống";

  //All Handle
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleAddUser = () => {
    if (data.some((user) => user.username === formData.username)) {
      setFormErrors({ ...formErrors, username: "Tên tài khoản đã tồn tại" });
      return;
    }
    if (!usernameRegex.test(formData.username)) {
      setFormErrors({ ...formErrors, username: usernameErrorMessage });
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      setFormErrors({ ...formErrors, password: passwordErrorMessage });
      return;
    }

    if (!fullnameRegex.test(formData.fullname)) {
      setFormErrors({ ...formErrors, fullname: fullnameErrorMessage });
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setFormErrors({ ...formErrors, email: emailErrorMessage });
      return;
    }

    if (!phoneRegex.test(formData.phone)) {
      setFormErrors({ ...formErrors, phone: phoneErrorMessage });
      return;
    }

    if (!roleRegex.test(formData.role)) {
      setFormErrors({ ...formErrors, role: roleErrorMessage });
      return;
    }
    axiosPrivate
      .post("admin/register", formData)
      .then((response) => {
        // Xử lý phản hồi từ máy chủ nếu cần
        console.log("Thêm mới thành công!");
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Lỗi khi thêm mới người dùng:", error);
      });
    handleClose();
  };

  const resetForm = () => {
    setFormData(initialUser);
    setFormData(initialUser);
  };

  //Call api get user list
  useEffect(() => {
    axiosPrivate.get("admin/users").then((res) => {
      setData(res.data);
      setRecords(res.data);
      console.log(res.data);
    });
  }, []);

  //Store ban/unban state to localStorage
  useEffect(() => {
    localStorage.setItem("banStatus", JSON.stringify(banStatus));
  }, [banStatus]);

  //Store mute/unmute state to localStorage
  useEffect(() => {
    const storedIsMuted = JSON.parse(localStorage.getItem("isMuted"));
    if (storedIsMuted) {
      setIsMuted(storedIsMuted);
    }
  }, []);

  const handleSearch = (event) => {
    const filteredData = data.filter((item) =>
      item.username.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(filteredData);
  };

  //Popup form input time to mute
  const openMuteModal = (id) => {
    setSelectedUserId(id);
    const selectedUser = data.find((user) => user.id === id);
    if (selectedUser) {
      setSelectedUsername(selectedUser.username);
    }
    setShowMuteModal(true);
  };

  const closeMuteModal = () => {
    setShowMuteModal(false);
  };

  //Function mute
  const muteUser = () => {
    const duration = parseInt(muteDuration, 10);
    if (selectedUserId) {
      axiosPrivate
        .post("admin/mute-user", { id: selectedUserId, muteDuration: duration })
        .then((res) => {
          // Tạo một bản sao của đối tượng isMuted
          const updatedIsMuted = { ...isMuted };
          updatedIsMuted[selectedUserId] = true;

          // Lưu updatedIsMuted vào localStorage
          localStorage.setItem("isMuted", JSON.stringify(updatedIsMuted));

          // Cập nhật state
          setIsMuted(updatedIsMuted);

          setShowMuteModal(false);

          toast.success(`Mute ${selectedUsername} thành công!`, {
            position: "top-right",
            autoClose: 3000,
          });
        });
    }
  };

  //Funtion unmute
  const unmuteUser = (userId) => {
    axiosPrivate.post("admin/unmute-user", { id: userId }).then((res) => {
      // Tạo một bản sao của đối tượng isMuted
      const updatedIsMuted = { ...isMuted };
      updatedIsMuted[userId] = false;

      // Lưu updatedIsMuted vào localStorage
      localStorage.setItem("isMuted", JSON.stringify(updatedIsMuted));

      // Cập nhật state
      setIsMuted(updatedIsMuted);

      setShowMuteModal(false);

      toast.success(`Unmute ${selectedUsername} thành công!`, {
        position: "top-right",
        autoClose: 3000,
      });
    });
  };

  //Set Role
  const startEditing = (userId, currentRole) => {
    setEditingUserId(userId);
    setNewRole(currentRole);
    setOriginalRole(currentRole); // Lưu vai trò ban đầu
  };

  const saveRoleChanges = (userId) => {
    axiosPrivate
      .post("admin/set-role", { id: userId, role: newRole })
      .then((res) => {
        setEditingUserId(null);
        setShowRoleSuccessModal(true);
        updateRecordRole(userId, newRole);
        toast.success("Sửa vai trò thành công", {
          position: "top-right",
          autoClose: 3000,
        });
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật vai trò:", error);
      });
  };

  const cancelEditing = () => {
    setEditingUserId(null);
  };

  // Hàm cập nhật vai trò người dùng trong danh sách
  const updateRecordRole = (userId, newRole) => {
    setRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.id === userId
          ? { ...record, role: { roleName: newRole } }
          : record
      )
    );
  };

  //Ban-Unban
  const handleBanButtonClick = (id) => {
    if (banStatus[id]) {
      unbanAccount(id);
    } else {
      banAccount(id);
    }
  };

  const banAccount = (id) => {
    setIsBanning(true);
    setIsBanningId(id);
    axiosPrivate
      .post("admin/ban-user", { id })
      .then((res) => {
        toast.success("Cấm tài khoản thành công", {
          position: "top-right",
          autoClose: 3000,
        });
        setRecords((prevRecords) => {
          const updatedRecords = prevRecords.map((item) => {
            if (item.id === id) {
              return { ...item, isBan: true };
            }
            return item;
          });
          return updatedRecords;
        });
        setIsBanning(false);
        setIsBanningId(null);
        setBanStatus({ ...banStatus, [id]: true });
      })
      .catch((error) => {
        toast.error("Cấm tài khoản xảy ra lỗi", {
          position: "top-right",
          autoClose: 3000,
        });
        setIsBanning(false);
        setIsBanningId(null);
        console.error(error);
      });
  };

  const unbanAccount = (id) => {
    axiosPrivate
      .post("admin/unban-user", { id })
      .then((res) => {
        toast.success("Bỏ cấm tài khoản thành công", {
          position: "top-right",
          autoClose: 3000,
        });
        setRecords((prevRecords) => {
          const updatedRecords = prevRecords.map((item) => {
            if (item.id === id) {
              return { ...item, isBan: false };
            }
            return item;
          });
          return updatedRecords;
        });
        setBanStatus({ ...banStatus, [id]: false });
        setIsBanning(false);
        setIsBanningId(null);
      })
      .catch((error) => {
        toast.error("Bỏ cấm tài khoản không thành công", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error("Lỗi khi bỏ cấm tài khoản:", error);
      });
  };

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  return (
    <div className="m-5">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Danh sách người dùng</h2>
      </div>
      <div className="flex justify-between py-4">
        <div className="w-1/3">
          <Input
            icon={<SearchIcon className="h-5 w-5" />}
            label="Tìm kiếm người dùng..."
            type="text"
            onChange={handleSearch}
          />
        </div>
        <div>
          <form className="rounded-lg">
            <Button
              className="px-4 h-12 rounded-lg shadow-md bg-custom text-white text-center"
              onClick={handleClickOpen}
            >
              <AddCircleIcon className="mr-2" />
              Thêm người dùng mới
            </Button>
            <Dialog open={open} onClose={handleClose}>
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
                  error={Boolean(formErrors.username)}
                  helperText={formErrors.username}
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
                  error={Boolean(formErrors.email)}
                  helperText={formErrors.email}
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
                  <option value="">Chọn vai trò</option>
                  <option value="Admin">Admin</option>
                  <option value="Mentor">Mentor</option>
                  <option value="Lecturer">Lecturer</option>
                  <option value="Student">Student</option>
                </select>
              </DialogContent>
              <DialogActions style={{ paddingTop: "10px" }}>
                <Button onClick={handleClose}>Hủy thêm</Button>
                <Button
                  onClick={handleAddUser}
                  className="bg-green-500 rounded h-8 w-20 text-white"
                >
                  Thêm mới
                </Button>
              </DialogActions>
            </Dialog>
          </form>
        </div>
      </div>
      <div className="bg-white shadow overflow-x-auto rounded-xl">
        <table className="table-auto w-full text-left border">
          <thead className="bg-gray-500">
            <tr className="border-b">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Tài khoản</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Số điện thoại</th>
              <th className="px-4 py-2">Vai trò</th>
              <th className="px-4 py-2">Trạng thái</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {records
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-4">{item.id}</td>
                  <td className="p-4">{item.username}</td>
                  <td className="p-4">{item.email}</td>
                  <td className="p-4">{item.phone}</td>
                  <td className="p-4 w-100">
                    {editingUserId === item.id ? (
                      <div>
                        <select
                          value={newRole}
                          onChange={(e) => setNewRole(e.target.value)}
                          className="mr-4"
                        >
                          <option value="admin">Admin</option>
                          <option value="mentor">Mentor</option>
                          <option value="lecturer">Lecturer</option>
                          <option value="student">Student</option>
                        </select>
                        <CheckCircleIcon
                          className="text-green-500 cursor-pointer"
                          onClick={() => saveRoleChanges(item.id)}
                        />
                        <CancelIcon
                          className="text-red-500 cursor-pointer"
                          onClick={cancelEditing}
                        />
                      </div>
                    ) : (
                      <div className="">
                        {item.role.roleName}
                        <EditIcon
                          onClick={() =>
                            startEditing(item.id, item.role.roleName)
                          }
                          sx={{
                            width: "18px",
                            height: "18px",
                            paddingLeft: "1px",
                            marginLeft: "2px",
                          }}
                        />
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <div>
                        {banStatus[item.id] ? "Đang bị cấm" : "Bình thường"}
                      </div>
                      <div>{isMuted[item.id] ? "Đang bị hạn chế" : ""}</div>
                    </div>
                  </td>
                  <td className="p-4 flex items-center">
                    <div className="flex flex-col">
                      <div className="pb-1">
                        {banStatus[item.id] ? ( // If banStatus is true for this row, show "Bỏ cấm tài khoản" button
                          <button
                            className={`${
                              isBanning && isBanningId === item.id
                                ? "bg-blue-500"
                                : "bg-green-500"
                            } text-white text-xs px-2 py-1 rounded-lg`}
                            onClick={() => handleBanButtonClick(item.id)}
                          >
                            {isBanning && isBanningId === item.id
                              ? "Đang cấm..."
                              : "Bỏ cấm tài khoản"}
                          </button>
                        ) : (
                          // If banStatus is false for this row, show "Cấm tài khoản" button
                          <button
                            className={`${
                              isBanning && isBanningId === item.id
                                ? "bg-blue-500"
                                : "bg-red-500"
                            } text-white text-xs px-2 py-1 rounded-lg`}
                            onClick={() => handleBanButtonClick(item.id)}
                          >
                            {isBanning && isBanningId === item.id
                              ? "Đang cấm..."
                              : "Cấm tài khoản"}
                          </button>
                        )}
                      </div>
                      {isMuted[item.id] ? (
                        <>
                          <button
                            className="text-white text-xs px-2 py-1 rounded-lg bg-green-500"
                            onClick={() => unmuteUser(item.id)}
                          >
                            Hủy hạn chế tài khoản
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="text-white text-xs px-2 py-1 rounded-lg bg-red-500"
                            onClick={() => openMuteModal(item.id)}
                          >
                            Hạn chế tài khoản
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={records.length}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </div>

      <Modal
        isOpen={showMuteModal}
        onRequestClose={closeMuteModal}
        style={{
          content: {
            maxWidth: "400px",
            margin: "auto",
            maxHeight: "100px",
          },
        }}
      >
        <h3>Nhập thời gian mute (giờ)</h3>
        <input
          type="number"
          value={muteDuration}
          onChange={(e) => setMuteDuration(e.target.value)}
        />
        <button onClick={muteUser}>OK</button>
      </Modal>
      <ToastContainer position="top-right" autoClose={3000} closeOnClick />
    </div>
  );
}

export default UserResultList;
