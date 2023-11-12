import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import { useReportedProfileContext } from "../../../context/ReportedProfileContext";
function BanReportedProfile({
  userId,
  banUserCallback,
  banStatus,
  onBanSuccess,
}) {
  const [isBanning, setIsBanning] = useState(false);

  const { reportedProfile } = useReportedProfileContext();

  const { fullname } = reportedProfile;

  const navigate = useNavigate();

  const handleBanClick = () => {
    setIsBanning(true);
    banUserCallback(userId)
      .then(() => {
        toast.success(`Cấm tài khoản ${fullname} thành công`);
        onBanSuccess();
      })
      .catch((error) => {
        toast.error(`Cấm tài khoản ${fullname} xảy ra lỗi`);
        console.error(error);
      })
      .finally(() => {
        setIsBanning(false);
        navigate("/reported-profile");
      });
  };
  return (
    <div>
      <Button
        variant="contained"
        sx={{
          borderRadius: "20px",
          marginLeft: "20px",
          backgroundColor: "#cc0000",
          "&:hover": {
            backgroundColor: "#ff0000",
          },
        }}
        onClick={handleBanClick}
      >
        {isBanning ? "Đang xử lý..." : "Cấm tài khoản"}
      </Button>
    </div>
  );
}

export default BanReportedProfile;
