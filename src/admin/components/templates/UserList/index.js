import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "react-modal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { TablePagination } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import AddNewButton from "../../atoms/AddNewButton";
import AddUserForm from "../../../utils/User/AddUserAction";
import { handleSearch } from "../../../utils/User/SearchUserByFullname";
import BanUnbanUser from "../../../utils/User/BanUnbanAction";
import { DataGrid } from "@mui/x-data-grid";
import "./styles.scss";

function UserResultList() {
  const axiosPrivate = useAxiosPrivate();

  const [isAddUserFormOpen, setAddUserFormOpen] = useState(false);

  const [data, setData] = useState([]);

  const [records, setRecords] = useState([]);

  const [showMuteModal, setShowMuteModal] = useState(false);

  const [muteDuration, setMuteDuration] = useState(1);

  const [isMuted, setIsMuted] = useState({});

  const [selectedUserId, setSelectedUserId] = useState("");

  const [selectedUsername, setSelectedUsername] = useState("");

  const [editingUserId, setEditingUserId] = useState(null);

  const [newRole, setNewRole] = useState("");

  const [showRoleSuccessModal, setShowRoleSuccessModal] = useState(false);

  const [originalRole, setOriginalRole] = useState("");

  const [banStatus, setBanStatus] = useState(
    JSON.parse(localStorage.getItem("banStatus")) || {}
  );

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenAddUserForm = () => {
    setAddUserFormOpen(true);
  };

  const handleCloseAddUserForm = () => {
    setAddUserFormOpen(false);
  };

  const handleAddUser = (userData) => {
    axiosPrivate
      .post(process.env.REACT_APP_NEW_USER, userData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Thêm mới người dùng thành công", {
            position: "top-right",
            autoClose: 3000,
          });
        }
        const newData = [...data, userData];

        const newRecords = [...records, userData];

        setData(newData);
        setRecords(newRecords);
      })
      .catch((error) => {
        console.error("Lỗi khi thêm mới người dùng:", error);
        if (error.response.status === 401) {
          toast.error("Hãy điền đầy đủ thông tin", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      });
  };

  //Call api get user list
  useEffect(() => {
    axiosPrivate.get(process.env.REACT_APP_USER_LIST).then((res) => {
      setData(res.data);
      setRecords(res.data);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("banStatus", JSON.stringify(banStatus));
  }, [banStatus]);

  useEffect(() => {
    const storedIsMuted = JSON.parse(localStorage.getItem("isMuted"));
    if (storedIsMuted) {
      setIsMuted(storedIsMuted);
    }
  }, []);

  const handleSearchUser = (event) => {
    handleSearch(event, data, setRecords);
  };

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

  const muteUser = () => {
    const duration = parseInt(muteDuration, 10);
    if (selectedUserId) {
      axiosPrivate
        .post(process.env.REACT_APP_MUTE_ACCOUNT, {
          id: selectedUserId,
          muteDuration: duration,
        })
        .then((res) => {
          // Tạo một bản sao của đối tượng isMuted
          const updatedIsMuted = { ...isMuted };
          updatedIsMuted[selectedUserId] = true;

          // Lưu updatedIsMuted vào localStorage
          localStorage.setItem("isMuted", JSON.stringify(updatedIsMuted));

          // Cập nhật state
          setIsMuted(updatedIsMuted);

          setShowMuteModal(false);

          toast.success(`Hạn chế ${selectedUsername} thành công!`, {
            position: "top-right",
            autoClose: 3000,
          });
        });
    }
  };

  const unmuteUser = (userId) => {
    axiosPrivate
      .post(process.env.REACT_APP_UNMUTE_ACCOUNT, { id: userId })
      .then((res) => {
        // Tạo một bản sao của đối tượng isMuted
        const updatedIsMuted = { ...isMuted };
        updatedIsMuted[userId] = false;

        // Lưu updatedIsMuted vào localStorage
        localStorage.setItem("isMuted", JSON.stringify(updatedIsMuted));

        // Cập nhật state
        setIsMuted(updatedIsMuted);

        setShowMuteModal(false);

        toast.warn(`Hủy hạn chế ${selectedUsername} thành công!`, {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  const startEditing = (userId, currentRole) => {
    setEditingUserId(userId);
    setNewRole(currentRole);
    setOriginalRole(currentRole); // Lưu vai trò ban đầu
  };

  const saveRoleChanges = (userId) => {
    axiosPrivate
      .post(process.env.REACT_APP_SET_ROLE, { id: userId, role: newRole })
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

  const updateRecordRole = (userId, newRole) => {
    setRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.id === userId
          ? { ...record, role: { roleName: newRole } }
          : record
      )
    );
  };

  const banAccount = (id) => {
    return axiosPrivate.post(process.env.REACT_APP_BAN_ACCOUNT, { id });
  };

  const unbanAccount = (id) => {
    return axiosPrivate.post(process.env.REACT_APP_UNBAN_ACCOUNT, { id });
  };

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "username", headerName: "Tài khoản", width: 150 },
    { field: "fullName", headerName: "Tên đầy đủ", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "role",
      headerName: "Vai trò",
      valueGetter: (params) => params.row.role.roleName,
      width: 120,
    },
    {
      field: "banned",
      headerName: "Trạng thái",
      renderCell: (params) => {
        return params.value ? "Bị cấm" : "Hoạt động";
      },
    },
  ];

  return (
    <>
      <div className="header-title">
        <h2 className="title">Danh sách người dùng</h2>
      </div>
      <div className="header-actions">
        <div className="search-box">
          <div className="search-box">
            <TextField
              className="search-input"
              placeholder="Tìm kiếm người dùng..."
              type="text"
              variant="outlined"
              onChange={handleSearchUser}
              InputProps={{
                startAdornment: <SearchIcon className="search-icon" />,
              }}
            />
          </div>
        </div>
        <div>
          <form className="rounded-form">
            <AddNewButton
              title="Thêm người dùng mới"
              handleClick={handleOpenAddUserForm}
              className="custom-add-button"
            />
            <AddUserForm
              open={isAddUserFormOpen}
              onClose={handleCloseAddUserForm}
              data={data}
              onAddUser={handleAddUser}
            />
          </form>
        </div>
      </div>

      <DataGrid
        rows={records}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 25]}
        pagination
      />
    </>
  );
}

export default UserResultList;
