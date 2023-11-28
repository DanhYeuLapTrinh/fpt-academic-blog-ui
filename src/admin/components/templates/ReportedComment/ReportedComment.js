import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import ConfirmDialog from "../../molecules/ReportedComment/ConfirmDialog";
import DismissDialog from "../../molecules/ReportedComment/DismissDialog";
import CustomNoRowsOverlay from "../../molecules/CustomNoRowsOverlay/CustomNoRowsOverlay";

import { DataGrid } from "@mui/x-data-grid";
import { LinearProgress, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

function ReportedComment() {
  const axiosPrivate = useAxiosPrivate();

  const [reportedComments, setReportedComments] = useState([]);

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const [dismissDialogOpen, setDismissDialogOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [noRows, setNoRows] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  //-------------------------------------------------------------------------

  const fetchData = async () => {
    try {
      setLoading(true);
      const reportedCommentsRes = await axiosPrivate.get(
        process.env.REACT_APP_VIEW_REPORT_COMMENTS
      );

      if (!reportedCommentsRes.length) {
        setNoRows(true);
      }

      if (reportedCommentsRes.status === 200) {
        setReportedComments(reportedCommentsRes.data);
        setLoading(false);
      }
    } catch (error) {
      if (error.request) {
        console.log("Server không phản hồi");
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //-------------------------------------------------------------------------

  const openConfirm = async (id) => {
    setSelectedId(id);
    setConfirmDialogOpen(true);
  };

  const openDismiss = async (id) => {
    setSelectedId(id);
    setDismissDialogOpen(true);
  };

  //-------------------------------------------------------------------------

  const handleConfirm = async () => {
    await axiosPrivate
      .post(process.env.REACT_APP_DELETE_REPORTED_COMMENT, {
        reportedCommentId: selectedId,
      })
      .then((res) => {
        fetchData();
        toast.success("Xóa bình luận thành công");
        setConfirmDialogOpen(false);
      })
      .catch((err) => {
        toast.error("Xóa bình luận thất thất bại");
      });
  };

  const handleDismiss = async () => {
    await axiosPrivate
      .post("admin/dismiss-reported-comment", {
        reportedCommentId: selectedId,
      })
      .then((res) => {
        fetchData();
        toast.success("Hủy báo cáo bình luận thành công");
        setDismissDialogOpen(false);
      })
      .catch((err) => {
        toast.error("Hủy báo cáo bình luận thất thất bại");
      });
  };

  const handleCancel = () => {
    setConfirmDialogOpen(false);
    setDismissDialogOpen(false);
  };

  const columns = [
    {
      field: "reporterName",
      headerName: "Người báo cáo",
      sortable: false,
      width: 200,
    },
    {
      field: "reportDate",
      headerName: "Ngày báo cáo",
      sortable: false,
      width: 200,
    },
    {
      field: "reasonOfReport",
      headerName: "Lý do báo cáo",
      sortable: false,
      width: 200,
    },
    {
      field: "content",
      headerName: "Nội dung bình luận",
      sortable: false,
      width: 500,
    },
    {
      field: "action",
      headerName: "Hành động",
      sortable: false,
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
              onClick={() => openDismiss(params.row.reportedCommentId)}
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
        loading={loading}
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
        slots={{
          noRowsOverlay: () =>
            noRows && <CustomNoRowsOverlay title="Không có dữ liệu" />,
          loadingOverlay: () => loading && <LinearProgress />,
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
        disableColumnMenu
        disableColumnFilter
      />

      <ConfirmDialog
        open={confirmDialogOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title="Xác nhận"
        content={
          <span>
            Bạn có chắc chắn <span style={{ fontWeight: "bolder" }}>XÓA</span>{" "}
            bình luận này?
          </span>
        }
      />

      <DismissDialog
        open={dismissDialogOpen}
        onDismiss={handleDismiss}
        onCancel={handleCancel}
        title="Xác nhận"
        content={
          <span>
            Bạn có chắc chắn <span style={{ fontWeight: "bolder" }}>HỦY</span>{" "}
            báo cáo bình luận này?
          </span>
        }
      />
    </>
  );
}

export default ReportedComment;
