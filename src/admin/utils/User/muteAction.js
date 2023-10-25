import React, { useState } from "react";

function MuteUser({ userId, onSuccess }) {
  const [muteDuration, setMuteDuration] = useState(1);

  const muteUser = () => {
    // Gọi API mute tài khoản ở đây và thực hiện hành động cần thiết
    // Sau khi mute thành công, gọi onSuccess(userId) để thông báo cho UserResultList
    onSuccess(userId);
  }

  return (
    <div>
      <h3>Nhập thời gian mute (giờ)</h3>
      <input
        type="number"
        value={muteDuration}
        onChange={(e) => setMuteDuration(e.target.value)}
      />
      <button onClick={muteUser}>OK</button>
    </div>
  );
}

export default MuteUser;
