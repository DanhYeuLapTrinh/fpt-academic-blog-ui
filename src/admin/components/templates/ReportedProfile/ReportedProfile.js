import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";

import { DataGrid } from "@mui/x-data-grid";
import { Button, LinearProgress, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function ReportedProfile() {
  const axiosPrivate = useAxiosPrivate();

  const [reportedProfiles, setReportedProfiles] = useState([]);

  //----------------------------------------------------------------

  const fetchData = async () => {
    const reportedProfilesRes = await axiosPrivate.get(
      process.env.REACT_APP_VIEW_REPORT_PROFILES
    );
    setReportedProfiles(reportedProfilesRes.data);
    console.log(reportedProfilesRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //----------------------------------------------------------------

  const columns = [
    { field: "fullName", headerName: "Tên hồ sơ", width: 150 },
    {
      field: "profileUrl",
      headerName: "Hình ảnh",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value ? params.value : "/assets/img/blank.png"}
          alt="ProfileURL"
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    { field: "reasonOfReport", headerName: "Lý do báo cáo", width: 300 },
    {
      field: "action",
      headerName: "",
      width: 150,
      renderCell: (params) => (
        <Link to={`report-profile/${params.row.reportedUserId}`}>
          <Button
            sx={{
              backgroundColor: "#4caf50",
              color: "#fff",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
              "&:hover": {
                backgroundColor: "#357a38",
              },
            }}
          >
            Xem hồ sơ
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
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
        Danh sách các hồ sơ bị báo cáo
      </Typography>
      <DataGrid
        loading={reportedProfiles.length === 0}
        getRowId={(row) => row.reportedUserId}
        rows={reportedProfiles}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
        }}
        slots={{
          loadingOverlay: LinearProgress,
        }}
        pageSizeOptions={[5, 10, 25]}
        autoHeight
        disableRowSelectionOnClick
      />
    </div>
  );
}

export default ReportedProfile;
