import React, { useState, useEffect } from "react";

import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import AddNewButton from "../../atoms/ButtonHeader/AddNewButton";
import AddUserForm from "../../../utils/User/AddUserAction";
import { handleSearch } from "../../../utils/User/SearchUserByFullname";
import BanUnbanUser from "../../../utils/User/BanUnbanAction/BanUnbanAction";
import { toast } from "react-toastify";
import MuteModal from "../../atoms/MuteModal/MuteModal";
import CustomNoRowsOverlay from "../../molecules/CustomNoRowsOverlay/CustomNoRowsOverlay";
import {
  muteButtonSx,
  unmuteButtonSx,
} from "../../atoms/MuteUnmuteButtonColor";

import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "react-modal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { Grid, LinearProgress } from "@mui/material";

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

  const [originalRole, setOriginalRole] = useState("");

  const [loading, setLoading] = useState(false);

  const [noRows, setNoRows] = useState(false);

  const [banStatus, setBanStatus] = useState(
    JSON.parse(localStorage.getItem("banStatus")) || {}
  );

  //----------------------------------------------------------------------------

  const fetchData = async () => {
    setLoading(true);
    const res = await axiosPrivate.get(process.env.REACT_APP_USER_LIST);
    if (!records.length) {
      setNoRows(true);
    }
    setData(res.data);
    // setData(res.data.map((user) => ({ ...user, id: user._id })));
    setRecords(res.data);
    setLoading(false);
    console.log(res.data);
  };

  useEffect(() => {
    fetchData();
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

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  //----------------------------------------------------------------------------

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
          toast.success("Thêm mới người dùng thành công");
        }
        const newData = [...data, userData];

        const newRecords = [...records, userData];

        setData(newData);
        setRecords(newRecords);
      })
      .catch((error) => {
        console.error("Lỗi khi thêm mới người dùng:", error);
        if (error.response.status === 401) {
          toast.error("Hãy điền đầy đủ thông tin");
        }
      });
  };

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

  //----------------------------------------------------------------------------

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

          toast.success(`Hạn chế ${selectedUsername} thành công!`);
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

        toast.warn(`Hủy hạn chế ${selectedUsername} thành công!`);
      });
  };

  //----------------------------------------------------------------------------

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
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
                {banStatus[params.row.id] === true ? null : (
                  <EditIcon
                    sx={{ marginLeft: "10px", float: "right", padding: "3px" }}
                    onClick={() =>
                      startEditing(params.row.id, params.row.role.roleName)
                    }
                  />
                )}
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
          ? "Đang bị cấm và hạn chế"
          : banStatus[params.row.id]
          ? "Đang bị cấm"
          : isMuted[params.row.id]
          ? "Đang bị hạn chế"
          : "Bình thường",
    },
    {
      field: "action",
      headerName: "Hành động",
      width: 150,
      renderCell: (params) => (
        <Grid container direction="row" spacing={1}>
          <Grid item xs={12}>
            <BanUnbanUser
              userId={params.row.id}
              isBanned={banStatus[params.row.id]}
              banUserCallback={banAccount}
              unbanUserCallback={unbanAccount}
              banStatus={banStatus}
              setBanStatus={setBanStatus}
            />
          </Grid>
          <Grid item xs={12}>
            {banStatus[params.row.id] === true ? null : isMuted[
                params.row.id
              ] ? (
              <Button
                sx={unmuteButtonSx}
                onClick={() => unmuteUser(params.row.id)}
              >
                Gỡ hạn chế tài khoản
              </Button>
            ) : (
              <Button
                sx={muteButtonSx}
                onClick={() => openMuteModal(params.row.id)}
              >
                Hạn chế tài khoản
              </Button>
            )}
          </Grid>
        </Grid>
      ),
    },
  ];

  return (
    <>
      <div className="header-title">
        <h2 className="title">Danh sách tài khoản</h2>
      </div>
      <div className="header-actions">
        <div className="container-search-box">
          <div className="search-box">
            <TextField
              className="search-input"
              placeholder="Tìm kiếm tài khoản..."
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
        getRowId={(row) => row.id || row.username}
        loading={loading}
        sx={{
          "& .MuiDataGrid-cell": {
            display: "flex",
            padding: "8px",
            whiteSpace: "normal",
            wordWrap: "break-word",
          },
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
        }}
        slots={{
          noRowsOverlay: () => noRows && <CustomNoRowsOverlay />,
          loadingOverlay: () => loading && <LinearProgress />,
        }}
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
        autoHeight
        disableRowSelectionOnClick
      />

      <MuteModal
        isOpen={showMuteModal}
        onRequestClose={closeMuteModal}
        muteDuration={muteDuration}
        onMuteDurationChange={setMuteDuration}
        onMuteUser={muteUser}
      />
    </>
  );
}

export default UserResultList;
