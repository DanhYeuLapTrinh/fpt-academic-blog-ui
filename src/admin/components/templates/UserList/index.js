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

function UserResultList() {
  const { auth } = useAuth();
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
  const [showMuteModal, setShowMuteModal] = useState(false);
  const [muteDuration, setMuteDuration] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [mutedUserIds, setMutedUserIds] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [showRoleSuccessModal, setShowRoleSuccessModal] = useState(false);
  const [originalRole, setOriginalRole] = useState(""); // Biến lưu trữ vai trò ban đầu

  const headers = {
    Authorization: `Bearer ${auth.token}`,
  };

  useEffect(() => {
    axiosConfig.get("admin/users", { headers }).then((res) => {
      setData(res.data);
      setRecords(res.data);
    });
  }, []);

  const handleSearch = (event) => {
    const filteredData = data.filter((item) =>
      item.username.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(filteredData);
  };

  const openMuteModal = (id) => {
    setSelectedUserId(id);
    setShowMuteModal(true);
  };

  const closeMuteModal = () => {
    setShowMuteModal(false);
  };

  const openSuccessModal = () => {
    setShowSuccessModal(true);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const closeRoleSuccessModal = () => {
    setShowRoleSuccessModal(false);
  };

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
          const updatedMutedUserIds = [...mutedUserIds, selectedUserId];
          setMutedUserIds(updatedMutedUserIds);
          setIsMuted(true);
          setShowMuteModal(false);
          openSuccessModal();
        });
    }
  };

  const unmuteUser = () => {
    if (selectedUserId) {
      axiosConfig
        .post("admin/unmute-user", { id: selectedUserId }, { headers })
        .then((res) => {
          const updatedMutedUserIds = mutedUserIds.filter(
            (userId) => userId !== selectedUserId
          );
          setMutedUserIds(updatedMutedUserIds);
          setIsMuted(false);
          setShowMuteModal(false);
        });
    }
  };

  const startEditing = (userId, currentRole) => {
    setEditingUserId(userId);
    setNewRole(currentRole);
    setOriginalRole(currentRole); // Lưu vai trò ban đầu
  };

  const saveRoleChanges = (userId) => {
    axiosConfig
      .post("admin/set-role", { id: userId, role: newRole }, { headers })
      .then((res) => {
        setEditingUserId(null);
        setShowRoleSuccessModal(true);
        updateRecordRole(userId, newRole);
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

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  return (
    <div className="m-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">User List</h2>

        <div className="w-1/3">
          <Input
            icon={<SearchIcon className="h-5 w-5" />}
            label="Search"
            type="text"
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="bg-white shadow overflow-x-auto rounded-xl">
        <table className="table-auto w-full text-left border">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {records.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-4">{item.id}</td>
                <td className="p-4">{item.username}</td>
                <td className="p-4">{item.email}</td>
                <td className="p-4">{item.phone}</td>
                <td className="p-4">{item.role.roleName}</td>
                <td className="p-4">{item.status}</td>
                <td className="p-4 flex items-center">
                  {editingUserId === item.id ? (
                    <>
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
                    </>
                  ) : mutedUserIds.includes(item.id) ? (
                    <>
                      <VolumeOffIcon
                        className="text-red-500 cursor-pointer"
                        onClick={unmuteUser}
                      />
                      <EditIcon
                        onClick={() =>
                          startEditing(item.id, item.role.roleName)
                        }
                      />
                    </>
                  ) : (
                    <>
                      <VolumeUpIcon
                        className="text-green-500 cursor-pointer"
                        onClick={() => openMuteModal(item.id)}
                      />
                      <EditIcon
                        onClick={() =>
                          startEditing(item.id, item.role.roleName)
                        }
                      />
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

      <Modal
        isOpen={showSuccessModal}
        onRequestClose={closeSuccessModal}
        style={{
          content: {
            maxWidth: "400px",
            margin: "auto",
            maxHeight: "100px",
          },
        }}
      >
        <h3>Mute người dùng thành công!</h3>
        <button onClick={closeSuccessModal}>OK</button>
      </Modal>

      <Modal
        isOpen={showRoleSuccessModal}
        onRequestClose={closeRoleSuccessModal}
        style={{
          content: {
            maxWidth: "400px",
            margin: "auto",
            maxHeight: "100px",
          },
        }}
      >
        <h3>Thay đổi vai trò người dùng thành công!</h3>
        <button onClick={closeRoleSuccessModal}>OK</button>
      </Modal>
    </div>
  );
}

export default UserResultList;
