import React, { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import { toast } from "react-toastify";
function DeleteNewHandle({ id, fetchData }) {
  const [open, setOpen] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await axiosPrivate
      .post(process.env.REACT_APP_DELETE_NEWS, { newsId: id })
      .then((response) => {
        fetchData();
        toast.success("Xóa tin tức thành công");
        handleClose();
      })
      .catch((error) => {
        toast.error("Xóa tin tức thất bại");
        handleClose();
      });
  };

  return (
    <>
      <DeleteForeverIcon
        sx={{ cursor: "pointer", color: "red" }}
        onClick={handleOpen}
      />

      <Modal open={open} onClose={handleClose}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            height: "200px",
            outline: "none",
            backgroundColor: "white",
            borderRadius: "20px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6">Xác nhận xóa tin tức</Typography>
          <Typography variant="body2" sx={{ margin: "16px 0" }}>
            Bạn có chắc chắn muốn xóa tin tức này?
          </Typography>
          <div style={{ display: "flex", gap: "16px" }}>
            <Button
              onClick={handleDelete}
              variant="contained"
              sx={{
                bgcolor: "#34D399",
                borderRadius: "2rem",
                height: "2rem",
                width: "6rem",
                color: "white",
                "&:hover": {
                  bgcolor: "#34D399",
                  opacity: 1,
                },
              }}
            >
              Xóa
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{
                bgcolor: "red",
                borderRadius: "2rem",
                height: "2rem",
                width: "6rem",
                color: "white",
                "&:hover": {
                  bgcolor: "red",
                },
              }}
            >
              Hủy
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default DeleteNewHandle;
