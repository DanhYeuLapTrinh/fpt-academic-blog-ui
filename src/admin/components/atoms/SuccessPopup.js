import React from "react";

const SuccessPopup = ({ message, onClose }) => {
  return (
    <div className="success-popup">
      <p>{message}</p>
      <button onClick={onClose}>Đóng</button>
    </div>
  );
};

export default SuccessPopup;
