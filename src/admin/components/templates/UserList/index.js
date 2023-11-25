import React, { useState, useEffect } from "react";

import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import AddNewButton from "../../atoms/ButtonHeader/AddNewButton";
import AddUserForm from "../../../utils/User/AddUserAction";
import { handleSearch } from "../../../utils/User/SearchUserByFullname";
import BanUnbanUser from "../../../utils/User/BanUnbanAction/BanUnbanAction";
import { toast } from "react-toastify";
import MuteModal from "../../atoms/MuteModal/MuteModal";
import CustomNoRowsOverlay from "../../molecules/CustomNoRowsOverlay/CustomNoRowsOverlay";
import { useUserContext } from "../../../context/UserContext";

import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "react-modal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import {
  Grid,
  LinearProgress,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Box,
} from "@mui/material";

import "./styles.scss";
import { Link } from "react-router-dom";

function UserResultList() {
  const axiosPrivate = useAxiosPrivate();

  const [isAddUserFormOpen, setAddUserFormOpen] = useState(false);

  const { data, setData } = useUserContext();

  const [records, setRecords] = useState([]);

  const [showMuteModal, setShowMuteModal] = useState(false);

  const [muteDuration, setMuteDuration] = useState(1);

  const [isMuted, setIsMuted] = useState({});

  const [isMutedChanged, setIsMutedChanged] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState("");

  const [selectedUsername, setSelectedUsername] = useState("");

  const [editingUserId, setEditingUserId] = useState(null);

  const [role, setRole] = useState("");

  const [newRole, setNewRole] = useState("");

  const [originalRole, setOriginalRole] = useState("");

  const [loading, setLoading] = useState(false);

  const [noRows, setNoRows] = useState(false);

  const [banStatus, setBanStatus] = useState({});

  const [banStatusChanged, setBanStatusChanged] = useState(false);

  const [setRoleChanged, setSetRoleChanged] = useState(false);

  const [value, setValue] = useState(0);

  const [filterRole, setFilterRole] = useState("");

  const allUsers = filterRole
    ? records.filter((user) => user.role.roleName === filterRole)
    : records.filter(
        (user) => user.isBanned === false && user.isMuted === false
      );
  const bannedUsers = records.filter((user) => user.isBanned === true);

  //----------------------------------------------------------------------------

  const fetchData = async () => {
    setLoading(true);
    const res = await axiosPrivate.get(process.env.REACT_APP_USER_LIST);
    if (!records.length) {
      setNoRows(true);
    }
    setData(res.data);
    setRecords(res.data);

    const banStatusObj = {};
    res.data.forEach((item) => {
      banStatusObj[item.id] = item.isBanned;
    });
    setBanStatus(banStatusObj);

    const isMutedObj = {};
    res.data.forEach((item) => {
      isMutedObj[item.id] = item.isMuted;
    });
    setIsMuted(isMutedObj);

    setLoading(false);
    console.log(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [banStatusChanged]);

  useEffect(() => {
    fetchData();
  }, [setRoleChanged]);

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

          const newData = [...data, userData];
          const newRecords = [...records, userData];

          setData(newData);
          setRecords(newRecords);
        }
      })
      .catch((error) => {
        console.error("Lỗi khi thêm mới người dùng:", error);
        if (error.response && error.response.status === 401) {
          if (error.response.data.message === "Mail exist") {
            toast.error("Email đã tồn tại");
          } else {
            toast.error("Hãy điền đầy đủ thông tin");
          }
        }
      });
  };

  const handleSearchUser = (event) => {
    handleSearch(event, data, setRecords);
  };

  const handleChangeFilter = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeSetRole = (event) => {
    const role = event.target.value;

    setFilterRole(role);
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
        setSetRoleChanged(!setRoleChanged);
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

  const banAccount = async (id) => {
    return await axiosPrivate
      .post(process.env.REACT_APP_BAN_ACCOUNT, { id })
      .then(() => {
        setBanStatusChanged(!banStatusChanged);
      });
  };

  const unbanAccount = async (id) => {
    return await axiosPrivate
      .post(process.env.REACT_APP_UNBAN_ACCOUNT, { id })
      .then(() => setBanStatusChanged(!banStatusChanged));
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

          setIsMuted(updatedIsMuted);

          setShowMuteModal(false);

          setIsMutedChanged(!isMutedChanged);

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

        setIsMuted(updatedIsMuted);

        setShowMuteModal(false);

        setIsMutedChanged(!isMutedChanged);

        toast.success(`Hủy hạn chế ${selectedUsername} thành công!`);
      });
  };

  //----------------------------------------------------------------------------

  const columns = [
    {
      field: "username",
      headerClassName: "super-app-theme--header",
      headerName: "Tài khoản",
      sortable: false,
      width: 150,
    },
    {
      field: "fullname",
      headerClassName: "super-app-theme--header",
      headerName: "Tên đầy đủ",
      sortable: false,
      width: 150,
    },
    {
      field: "email",
      headerClassName: "super-app-theme--header",
      headerName: "Email",
      sortable: false,
      width: 300,
    },
    {
      field: "role",
      headerClassName: "super-app-theme--header",
      headerName: "Vai trò",
      sortable: false,
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
      headerClassName: "super-app-theme--header",
      headerName: "Trạng thái",
      sortable: false,
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
      headerClassName: "super-app-theme--header",
      headerName: "Hành động",
      sortable: false,
      width: 120,
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
        </Grid>
      ),
    },

    {
      field: "detail",
      headerClassName: "super-app-theme--header",
      headerName: "",
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <Link to={`/users/view/${params.row.id}`}>
          <Button
            sx={{
              backgroundColor: "#5927e5",
              color: "#fff",
              border: "none",
              padding: "5px 10px",
              fontSize: "12px",
              borderRadius: "20px",
              cursor: "pointer",
              marginRight: "10px",
              "&:hover": {
                backgroundColor: "#357a38",
              },
            }}
          >
            Xem hồ sơ
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <>
      <div className="header-title">
        <h2 className="title">Danh sách tài khoản</h2>

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

      <Tabs value={value} onChange={handleChangeFilter}>
        <Tab label="Tất cả" className="tab" />
        <Tab label="Bị cấm" className="tab" />
      </Tabs>

      <Grid container>
        <Grid item xs={2}>
          <FormControl
            variant="outlined"
            sx={{ display: "flex", flex: 1, padding: 1.5 }}
          >
            <InputLabel id="role-label" sx={{ mt: 1.8, ml: 1, fontSize: 13 }}>
              Vai trò
            </InputLabel>
            <Select
              labelId="role-label"
              id="role-select"
              value={filterRole}
              onChange={handleChangeSetRole}
              label="Role"
            >
              <MenuItem value="">Chọn vai trò</MenuItem>
              <MenuItem value="lecturer">Lecturer</MenuItem>
              <MenuItem value="mentor">Mentor</MenuItem>
              <MenuItem value="student">Student</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={10}>
          <TextField
            className="search-input"
            placeholder="Tìm kiếm tài khoản..."
            type="text"
            variant="outlined"
            fullWidth
            sx={{
              padding: 1.5,
              fontSize: 13,
            }}
            onChange={handleSearchUser}
            InputProps={{
              startAdornment: <SearchIcon sx={{ marginRight: 1 }} />,
            }}
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          width: "100%",
          "& .super-app-theme--header": {
            backgroundColor: "rgb(193, 195, 196)",
          },
        }}
      >
        {value === 0 && (
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
              noRowsOverlay: () =>
                noRows && <CustomNoRowsOverlay title="Không có dữ liệu" />,
              loadingOverlay: () => loading && <LinearProgress />,
            }}
            rows={allUsers}
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
            disableColumnMenu
            disableColumnFilter
          />
        )}

        {value === 1 && (
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
            rows={bannedUsers}
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
            disableColumnMenu
            disableColumnFilter
          />
        )}
      </Box>

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
