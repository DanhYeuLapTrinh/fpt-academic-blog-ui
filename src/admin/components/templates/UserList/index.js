import React, { useState, useEffect } from "react";

import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import AddNewButton from "../../atoms/ButtonHeader/AddNewButton";
import AddUserForm from "../../../utils/User/AddUserAction";
import { handleSearch } from "../../../utils/User/SearchUserByFullname";
import BanUnbanUser from "../../../utils/User/BanUnbanAction/BanUnbanAction";
import { ToastContainer, toast } from "react-toastify";

import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "react-modal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { Typography, Grid } from "@mui/material";

import "./styles.scss";
import "react-toastify/dist/ReactToastify.css";

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

  const [originalRole, setOriginalRole] = useState("");

  const [banStatus, setBanStatus] = useState(
    JSON.parse(localStorage.getItem("banStatus")) || {}
  );

  useEffect(() => {
    localStorage.setItem("banStatus", JSON.stringify(banStatus));
  }, [banStatus]);

  useEffect(() => {
    const storedIsMuted = JSON.parse(localStorage.getItem("isMuted"));
    if (storedIsMuted) {
      setIsMuted(storedIsMuted);
    }
  }, []);

  useEffect(() => {
    axiosPrivate.get(process.env.REACT_APP_USER_LIST).then((res) => {
      setData(res.data);
      setRecords(res.data);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

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

  const handleSearchUser = (event) => {
    handleSearch(event, data, setRecords);
  };

  const startEditing = (userId, currentRole) => {
    setEditingUserId(userId);
    setNewRole(currentRole);
    setOriginalRole(currentRole);
  };

  const saveRoleChanges = (userId) => {
    axiosPrivate
      .post(process.env.REACT_APP_SET_ROLE, { id: userId, role: newRole })
      .then((res) => {
        setEditingUserId(null);
        updateRecordRole(userId, newRole);
        toast.success("Sửa vai trò thành công");
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
          const updatedIsMuted = { ...isMuted };
          updatedIsMuted[selectedUserId] = true;

          localStorage.setItem("isMuted", JSON.stringify(updatedIsMuted));

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
        const updatedIsMuted = { ...isMuted };
        updatedIsMuted[userId] = false;

        localStorage.setItem("isMuted", JSON.stringify(updatedIsMuted));

        setIsMuted(updatedIsMuted);

        setShowMuteModal(false);

        toast.warn(`Hủy hạn chế ${selectedUsername} thành công!`, {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  const buttonSx = {
    width: "auto",
    fontSize: "0.75rem",
    padding: "2px 4px",
    borderRadius: "8px",
  };

  const columns = [
    { field: "id", headerName: "ID", width: 25 },
    { field: "username", headerName: "Tài khoản", width: 150 },
    { field: "fullName", headerName: "Tên đầy đủ", width: 150 },
    { field: "email", headerName: "Email", width: 300 },
    {
      field: "role",
      headerName: "Vai trò",
      valueGetter: (params) => params.row.role.roleName,
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {editingUserId === params.row.id ? (
              <>
                <select
                  className="select-role"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="lecturer">Lecturer</option>
                  <option value="mentor">Mentor</option>
                  <option value="student">Student</option>
                </select>

                <CheckCircleIcon
                  sx={{ color: "green", marginLeft: "5px" }}
                  onClick={() => saveRoleChanges(params.row.id)}
                />
                <CancelIcon sx={{ color: "red" }} onClick={cancelEditing} />
              </>
            ) : (
              <div className="role-col">
                {params.row.role.roleName}

                <EditIcon
                  sx={{ marginLeft: "10px", float: "right", padding: "3px" }}
                  onClick={() =>
                    startEditing(params.row.id, params.row.role.roleName)
                  }
                />
              </div>
            )}
          </>
        );
      },
    },
    {
      field: "banned",
      headerName: "Trạng thái",
      width: 200,
      renderCell: (params) =>
        banStatus[params.row.id] && isMuted[params.row.id]
          ? "Đang bị cấm và đang bị hạn chế"
          : banStatus[params.row.id]
          ? "Đang bị cấm"
          : isMuted[params.row.id]
          ? "Đang bị hạn chế"
          : "Bình thường",
    },
    {
      field: "action",
      headerName: "Hành động",
      width: 200,
      renderCell: (params) => (
        <div>
          <BanUnbanUser
            userId={params.row.id}
            isBanned={banStatus[params.row.id]}
            banUserCallback={banAccount}
            unbanUserCallback={unbanAccount}
            banStatus={banStatus}
            setBanStatus={setBanStatus}
          />
          {isMuted[params.row.id] ? (
            <>
              <Button
                sx={{ ...buttonSx, backgroundColor: "#4CAF50" }}
                onClick={() => unmuteUser(params.row.id)}
              >
                Hủy hạn chế tài khoản
              </Button>
            </>
          ) : (
            <>
              <Button
                sx={{ ...buttonSx, backgroundColor: "#F44336" }}
                onClick={() => openMuteModal(params.row.id)}
              >
                Hạn chế tài khoản
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="header-title">
        <h2 className="title">Danh sách người dùng</h2>
      </div>
      <div className="header-actions">
        <div className="container-search-box">
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
        <div className="header-action">
          <form>
            <AddNewButton
              title="Thêm người dùng mới"
              handleClick={handleOpenAddUserForm}
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
        rowHeight={75}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
      />

      <Modal
        isOpen={showMuteModal}
        onRequestClose={closeMuteModal}
        style={{
          content: {
            maxWidth: "400px",
            margin: "auto",
            maxHeight: "200px",
          },
        }}
      >
        <Grid container direction="column" alignItems="center">
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            Nhập thời gian hạn chế (giờ)
          </Typography>
          <Grid container item direction="row" spacing={2}>
            <Grid item xs={8}>
              <TextField
                type="number"
                value={muteDuration}
                onChange={(e) => setMuteDuration(e.target.value)}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <Button onClick={muteUser} variant="contained" color="primary">
                OK
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Modal>

      <ToastContainer position="top-right" autoClose="3000" />
    </>
  );
}

export default UserResultList;
