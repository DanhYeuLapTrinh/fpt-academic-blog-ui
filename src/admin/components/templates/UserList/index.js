import React, { useState, useEffect } from "react";
import { Input } from "@material-tailwind/react";
import SearchIcon from "@mui/icons-material/Search";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import EditIcon from "@mui/icons-material/Edit";
import { axiosConfig } from "../../../api/axios";
import useAuth from "../../../../user/hooks/useAuth";
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
import { Popover } from "@headlessui/react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
    phone: "",
    role: "",
  });

  const { auth } = useAuth();

  const [data, setData] = useState([]);

  const [records, setRecords] = useState([]);

  const [showMuteModal, setShowMuteModal] = useState(false);

  const [muteDuration, setMuteDuration] = useState(1);

  const [isMuted, setIsMuted] = useState({});

  const [selectedUserId, setSelectedUserId] = useState("");

  const [selectedUsername, setSelectedUsername] = useState("");

  //Split page
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  //Popup thêm người dùng mới
  const [open, setOpen] = useState(false);

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

    setErrors({ ...errors, [name]: "" });
  };

  const handleAddUser = () => {
    axiosConfig
      .post("admin/register", formData, { headers })
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
    setErrors(initialUser);
  };

  const headers = {
    Authorization: `Bearer ${auth.token}`,
  };

  //Call api get user list
  useEffect(() => {
    axiosConfig.get("admin/users", { headers }).then((res) => {
      setData(res.data);
      setRecords(res.data);
      console.log(res.data);
    });
  }, []);

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
      axiosConfig
        .post(
          "admin/mute-user",
          { id: selectedUserId, muteDuration: duration },
          { headers }
        )
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
    axiosConfig
      .post("admin/unmute-user", { id: userId }, { headers })
      .then((res) => {
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

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  return (
    <div className="m-5">
      <div className="flex justify-between items-center mb-5">
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
                />
                <select
                  className="mt-4 border-b-2 border-solid outline-0 w-full"
                  name="role"
                  onChange={handleInputChange}
                  value={formData.role}
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
                  <td className="p-4">{item.role.roleName}</td>
                  <td className="p-4">{item.status}</td>
                  <td className="p-4 flex items-center">
                    <Popover className="relative">
                      {({ open }) => (
                        <>
                          <Popover.Button>
                            <MoreVertIcon className="h-5 w-5 cursor-pointer text-gray-500" />
                          </Popover.Button>
                          {open && (
                            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                              <div className="py-1">
                                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                  Set Role
                                </button>
                                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                  Ban Account
                                </button>
                                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                  Mute Account
                                </button>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </Popover>
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
