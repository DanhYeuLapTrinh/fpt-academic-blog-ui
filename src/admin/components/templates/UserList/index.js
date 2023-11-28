import React, { useState, useEffect } from "react";

import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import AddNewButton from "../../atoms/ButtonHeader/AddNewButton";
import AddUserForm from "../../../utils/User/AddUserAction";
import TabsTable from "../../organisms/UserList/TabsTable";
import SearchUserByFullname from "../../organisms/UserList/SearchUserByFullname";
import FilterRole from "../../organisms/UserList/FilterRole";
import UserListTable from "../../organisms/UserList/UserList";
import { handleSearch } from "../../../utils/User/SearchUserByFullname";
import BanUnbanUser from "../../../utils/User/BanUnbanAction/BanUnbanAction";
import { toast } from "react-toastify";
import { useUserContext } from "../../../context/UserContext";

import EditIcon from "@mui/icons-material/Edit";
import Modal from "react-modal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import Button from "@mui/material/Button";
import { Grid, Box } from "@mui/material";

import "./styles.scss";
import { Link } from "react-router-dom";

function UserResultList() {
  const axiosPrivate = useAxiosPrivate();

  const {
    data,
    setData,
    records,
    setRecords,
    isAddUserFormOpen,
    setAddUserFormOpen,
    isMuted,
    setIsMuted,
    editingUserId,
    setEditingUserId,
    newRole,
    setNewRole,
    setOriginalRole,
    loading,
    setLoading,
    noRows,
    setNoRows,
    banStatus,
    setBanStatus,
    banStatusChanged,
    setBanStatusChanged,
    setRoleChanged,
    setSetRoleChanged,
    addUserChanged,
    setAddUserChanged,
    value,
    setValue,
    filterRole,
    setFilterRole,
    isLoading,
    setIsLoading,
    allUsersCount,
    setAllUsersCount,
    bannedUsersCount,
    setBannedUsersCount,
    allUsers,
    bannedUsers,
  } = useUserContext();

  //----------------------------------------------------------------------------

  const fetchData = async () => {
    try {
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

      const notBannedUsers = res.data.filter(
        (user) => !user.isBanned && !user.isMuted
      );

      const bannedUsers = res.data.filter((user) => user.isBanned);

      setAllUsersCount(notBannedUsers.length);
      setBannedUsersCount(bannedUsers.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [banStatusChanged || setRoleChanged || addUserChanged]);

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
    setIsLoading(true);
    axiosPrivate
      .post(process.env.REACT_APP_NEW_USER, userData)
      .then((response) => {
        setIsLoading(false);
        if (response.status === 200) {
          toast.success("Thêm mới người dùng thành công");

          const newData = [...data, userData];
          const newRecords = [...records, userData];

          setData(newData);
          setRecords(newRecords);
          setAddUserChanged(!addUserChanged);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Lỗi khi thêm mới người dùng:", error);
        if (error?.response && error?.response?.status === 401) {
          if (error?.response?.data?.message === "Mail exist") {
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
              isLoading={isLoading}
            />
          </form>
        </div>
      </div>

      <Box
        sx={{
          border: "1px",
          borderRadius: "20px",
          boxShadow: 2,
          mt: 5,
        }}
      >
        <TabsTable
          value={value}
          handleChangeFilter={handleChangeFilter}
          allUsersCount={allUsersCount}
          bannedUsersCount={bannedUsersCount}
        />

        <Grid container margin={1}>
          <FilterRole
            filterRole={filterRole}
            handleChangeSetRole={handleChangeSetRole}
          />

          <SearchUserByFullname handleSearchUser={handleSearchUser} />
        </Grid>

        <Box
          sx={{
            width: "100%",
            "& .super-app-theme--header": {
              backgroundColor: "rgb(244, 246, 248)",
            },
          }}
        >
          {value === 0 && (
            <UserListTable
              loading={loading}
              noRows={noRows}
              users={allUsers}
              columns={columns}
              banAccount={banAccount}
              unbanAccount={unbanAccount}
              banStatus={banStatus}
              setBanStatus={setBanStatus}
            />
          )}

          {value === 1 && (
            <UserListTable
              loading={loading}
              noRows={noRows}
              users={bannedUsers}
              columns={columns}
              banAccount={banAccount}
              unbanAccount={unbanAccount}
              banStatus={banStatus}
              setBanStatus={setBanStatus}
            />
          )}
        </Box>
      </Box>
    </>
  );
}

export default UserResultList;
