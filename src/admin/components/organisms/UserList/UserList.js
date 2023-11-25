import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import CustomNoRowsOverlay from "../../molecules/CustomNoRowsOverlay/CustomNoRowsOverlay";
import BanUnbanUser from "../../../utils/User/BanUnbanAction/BanUnbanAction";
import { Link } from "react-router-dom";
import { Button, Grid } from "@mui/material";

function UserList({
  loading,
  noRows,
  users,
  columns,
  banAccount,
  unbanAccount,
  banStatus,
  setBanStatus,
}) {
  return (
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
        ".MuiDataGrid-columnHeaderTitle": {
          fontWeight: "bold",
        },
      }}
      slots={{
        noRowsOverlay: () =>
          noRows && <CustomNoRowsOverlay title="Không có dữ liệu" />,
        loadingOverlay: () => loading && <LinearProgress />,
      }}
      rows={users}
      rowHeight={75}
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
  );
}

export default UserList;
