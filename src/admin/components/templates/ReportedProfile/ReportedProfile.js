import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import { useReportedProfileContext } from "../../../context/ReportedProfileContext";
import { DataGrid } from "@mui/x-data-grid";
import { Button, LinearProgress, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import CustomNoRowsOverlay from "../../molecules/CustomNoRowsOverlay/CustomNoRowsOverlay";

function ReportedProfile() {
  const axiosPrivate = useAxiosPrivate();

  const { reportedProfiles, setReportedProfiles } = useReportedProfileContext();

  const [loading, setLoading] = useState(false);

  const [noRows, setNoRows] = useState(false);

  //----------------------------------------------------------------

  const fetchData = async () => {
    try {
      setLoading(true);
      const reportedProfilesRes = await axiosPrivate.get(
        process.env.REACT_APP_VIEW_REPORT_PROFILES
      );
      if (!reportedProfilesRes.length) {
        setNoRows(true);
      }

      setReportedProfiles(reportedProfilesRes.data);
      setLoading(false);
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

  //----------------------------------------------------------------

  const columns = [
    { field: "fullName", headerName: "Tên hồ sơ", sortable: false, width: 150 },
    {
      field: "profileUrl",
      headerName: "Ảnh đại diện",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value ? params.value : "/assets/img/blank.png"}
          alt="ProfileURL"
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      field: "reasonOfReport",
      headerName: "Lý do báo cáo",
      sortable: false,
      width: 300,
    },
    {
      field: "action",
      headerName: "",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <Link to={`/reported-profile/view/${params.row.reportedUserId}`}>
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
        loading={loading}
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
          noRowsOverlay: () =>
            noRows && <CustomNoRowsOverlay title="Không có dữ liệu" />,
          loadingOverlay: () => loading && <LinearProgress />,
        }}
        pageSizeOptions={[5, 10, 25]}
        autoHeight
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnFilter
      />
    </div>
  );
}

export default ReportedProfile;
