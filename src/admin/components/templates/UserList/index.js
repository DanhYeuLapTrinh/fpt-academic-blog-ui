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
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import AddNewButton from "../../atoms/AddNewButton";
import AddUserForm from "../../../utils/User/AddUserAction";
import { handleSearch } from "../../../utils/User/SearchUser";
import BanUnbanUser from "../../../utils/User/BanUnbanAction";

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

  return (
    <div className="m-5">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Danh sách người dùng</h2>
      </div>
      <div className="flex justify-between py-4">
        <div className="w-1/3">
          <Input
            icon={<SearchIcon className="h-5 w-5" />}
            label="Tìm kiếm người dùng..."
            type="text"
            onChange={handleSearchUser}
          />
        </div>
        <div>
          <form className="rounded-lg">
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
      <div className="bg-white shadow overflow-x-auto rounded-xl">
        <table className="table-auto w-full text-left border">
          <thead className="bg-gray-500">
            <tr className="border-b">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Tài khoản</th>
              <th className="px-4 py-2">Tên đầy đủ</th>
              <th className="px-4 py-2">Email</th>
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
                  <td className="p-4">{item.fullName}</td>
                  <td className="p-4">{item.email}</td>
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
                    <div>
                      {banStatus[item.id] && isMuted[item.id]
                        ? "Đang bị cấm và đang bị hạn chế"
                        : banStatus[item.id]
                        ? "Đang bị cấm"
                        : isMuted[item.id]
                        ? "Đang bị hạn chế"
                        : "Bình thường"}
                    </div>
                  </td>
                  <td className="p-4 flex items-center">
                    <div className="flex flex-col">
                      <td className="p-1">
                        <BanUnbanUser
                          userId={item.id}
                          isBanned={banStatus[item.id]}
                          banUserCallback={banAccount}
                          unbanUserCallback={unbanAccount}
                          banStatus={banStatus}
                          setBanStatus={setBanStatus}
                        />
                      </td>
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
            maxHeight: "200px",
          },
        }}
      >
        <h3 className="text-center text-2xl font-bold mb-5">
          Nhập thời gian hạn chế (giờ)
        </h3>
        <div className="grid grid-cols-3 mt-10">
          <input
            type="number"
            value={muteDuration}
            onChange={(e) => setMuteDuration(e.target.value)}
            className="col-span-2 text-center border-2 border-black border-solid rounded-lg"
          />
          <button
            onClick={muteUser}
            className="col-span-1 bg-green-500 text-white rounded-lg mx-4"
          >
            OK
          </button>
        </div>
      </Modal>
      <ToastContainer position="top-right" autoClose={3000} closeOnClick />
    </div>
  );
}

export default UserResultList;
