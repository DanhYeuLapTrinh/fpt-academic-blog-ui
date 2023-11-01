import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/base";

const BanUnbanUser = ({
  userId,
  isBanned,
  banUserCallback,
  unbanUserCallback,
  banStatus,
  setBanStatus,
}) => {
  const [isBanning, setIsBanning] = useState(false);

  const handleBanClick = () => {
    setIsBanning(true);
    banUserCallback(userId)
      .then(() => {
        toast.success("Cấm tài khoản thành công", {
          position: "top-right",
          autoClose: 3000,
        });
        setBanStatus({ ...banStatus, [userId]: true });
      })
      .catch((error) => {
        toast.error("Cấm tài khoản xảy ra lỗi", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error(error);
      })
      .finally(() => {
        setIsBanning(false);
      });
  };

  const handleUnbanClick = () => {
    setIsBanning(true);
    unbanUserCallback(userId)
      .then(() => {
        toast.warn("Bỏ cấm tài khoản thành công", {
          position: "top-right",
          autoClose: 3000,
        });
        setBanStatus({ ...banStatus, [userId]: false });
      })
      .catch((error) => {
        toast.error("Bỏ cấm tài khoản không thành công", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error("Lỗi khi bỏ cấm tài khoản:", error);
      })
      .finally(() => {
        setIsBanning(false);
      });
  };

  return (
    <div>
      {isBanned ? (
        <Button
          className={`${
            isBanning ? "bg-blue-500" : "bg-green-500"
          } text-white text-xs px-2 py-1 rounded-lg`}
          onClick={handleUnbanClick}
        >
          {isBanning ? "Đang xử lý..." : "Bỏ cấm tài khoản"}
        </Button>
      ) : (
        <Button
          className={`${
            isBanning ? "bg-blue-500" : "bg-red-500"
          } text-white text-xs px-2 py-1 rounded-lg`}
          onClick={handleBanClick}
        >
          {isBanning ? "Đang xử lý..." : "Cấm tài khoản"}
        </Button>
      )}
    </div>
  );
};

export default BanUnbanUser;
