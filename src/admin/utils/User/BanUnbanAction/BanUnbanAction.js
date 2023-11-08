import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import {
  banButtonSx,
  unbanButtonSx,
} from "../../../components/atoms/BanUnbanButtonColor";

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
        toast.success("Cấm tài khoản thành công");
        setBanStatus({ ...banStatus, [userId]: true });
      })
      .catch((error) => {
        toast.error("Cấm tài khoản xảy ra lỗi");
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
        toast.warn("Bỏ cấm tài khoản thành công");
        setBanStatus({ ...banStatus, [userId]: false });
      })
      .catch((error) => {
        toast.error("Bỏ cấm tài khoản không thành công");
        console.error("Lỗi khi bỏ cấm tài khoản:", error);
      })
      .finally(() => {
        setIsBanning(false);
      });
  };

  return (
    <div>
      {isBanned ? (
        <Button sx={banButtonSx} onClick={handleUnbanClick}>
          {isBanning ? "Đang xử lý..." : "Gỡ cấm tài khoản"}
        </Button>
      ) : (
        <Button sx={unbanButtonSx} onClick={handleBanClick}>
          {isBanning ? "Đang xử lý..." : "Cấm tài khoản"}
        </Button>
      )}
    </div>
  );
};

export default BanUnbanUser;
