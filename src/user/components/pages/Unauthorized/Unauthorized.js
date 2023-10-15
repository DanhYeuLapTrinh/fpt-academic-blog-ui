import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <div>
      Bạn không có quyền truy cập trang này
      <Button onClick={goBack}>Go back</Button>
    </div>
  );
}
