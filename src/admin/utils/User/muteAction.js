import { useState } from "react";
import Modal from "react-modal";

function MuteUser({
  userId,
  username,
  onMute,
  showMuteModalProp,
  setShowMuteModalProp,
  data,
}) {
  const [muteDuration, setMuteDuration] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUsername, setSelectedUsername] = useState("");

  const handleMute = () => {
    onMute(selectedUserId, muteDuration)
      .then(() => {
        // Gọi API thành công, sau đó đóng modal và cập nhật giá trị
        closeMuteModalInternal();
        setMuteDuration(1);
        setSelectedUserId("");
        setSelectedUsername("");
      })
      .catch((error) => {
        // Xử lý lỗi khi gọi API
        console.error("Lỗi khi Mute:", error);
      });
  };

  const openMuteModalInternal = (id) => {
    setSelectedUserId(id);
    const selectedUser = data.find((user) => user.id === id);
    if (selectedUser) {
      setSelectedUsername(selectedUser.username);
    }
    setShowMuteModalProp(true);
  };

  const closeMuteModalInternal = () => {
    setShowMuteModalProp(false);
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      width: "300px",
      background: "#fff",
      border: "1px solid #ccc",
      borderRadius: "4px",
      padding: "20px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
  };

  return (
    <div>
      <button onClick={openMuteModalInternal}>Mute User</button>

      <Modal
        isOpen={showMuteModalProp}
        onRequestClose={closeMuteModalInternal}
        style={customStyles}
      >
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Nhập thời gian Mute</h2>
          <input
            type="number"
            value={muteDuration}
            onChange={(e) => setMuteDuration(e.target.value)}
            className="w-20 text-center text-sm border border-gray-300 p-2 rounded mb-4"
          />
          <button
            onClick={handleMute}
            className="bg-blue-500 text-white text-sm p-2 rounded"
          >
            Mute
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default MuteUser;
