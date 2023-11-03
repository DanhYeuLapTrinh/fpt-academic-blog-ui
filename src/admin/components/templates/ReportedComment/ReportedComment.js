import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import ConfirmDialog from "../../molecules/ReportedComment/ConfirmDialog";

import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

function ReportedComment() {
  const axiosPrivate = useAxiosPrivate();

  const [reportedComments, setReportedComments] = useState([]);

  const [open, setOpen] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  //-------------------------------------------------------------------------

  const fetchData = async () => {
    const reportedCommentsRes = await axiosPrivate.get(
      process.env.REACT_APP_VIEW_REPORT_COMMENTS
    );
    setReportedComments(reportedCommentsRes.data);
    console.log(reportedCommentsRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //-------------------------------------------------------------------------

  const openConfirm = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  //-------------------------------------------------------------------------

  const handleConfirm = async () => {
    await axiosPrivate
      .post(process.env.REACT_APP_CONFIRM_REPORT_COMMENT, {
        reportedCommentId: selectedId,
      })
      .then((res) => {
        toast.success("Xóa bình luận thành công");
        fetchData();
      })
      .catch((err) => {
        toast.error("Xóa bình luận thất thất bại");
      });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const columns = [
    { field: "reporterName", headerName: "Người báo cáo", width: 200 },
    { field: "reportDate", headerName: "Ngày báo cáo", width: 200 },
    { field: "reasonOfReport", headerName: "Lý do báo cáo", width: 200 },
    { field: "content", headerName: "Nội dung bình luận", width: 500 },
    {
      field: "action",
      headerName: "Hành động",
      renderCell: (params) => {
        return (
          <>
            <CheckIcon
              sx={{
                color: "#4caf50",
                cursor: "pointer",
                marginRight: "10px",
              }}
              onClick={() => openConfirm(params.row.reportedCommentId)}
            />
            <CloseIcon
              sx={{
                color: "#f44336",
                cursor: "pointer",
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          color: "#333",
          fontSize: "24px",
          marginBottom: "20px",
        }}
        component="h4"
        gutterBottom
      >
        Danh sách các bình luận bị báo cáo
      </Typography>
      <DataGrid
        sx={{
          "& .MuiDataGrid-cell": {
            display: "flex",
            padding: "8px",
            whiteSpace: "normal",
            wordWrap: "break-word",
          },
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
        }}
        getRowId={(row) => row.reportId}
        rows={reportedComments}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        autoHeight
        disableRowSelectionOnClick
      />

      <ConfirmDialog
        open={open}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title="Xác nhận"
        content="Bạn có chắc chắn muốn xóa bình luận này?"
      />
    </>
  );
}

export default ReportedComment;
