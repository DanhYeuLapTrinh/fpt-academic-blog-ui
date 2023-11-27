import React from "react";

import { DataGrid } from "@mui/x-data-grid";
import { LinearProgress } from "@mui/material";
import CustomNoRowsOverlay from "../../molecules/CustomNoRowsOverlay/CustomNoRowsOverlay";

function TagListTable({ tagData, columns, loading, noRows }) {
  return (
    <DataGrid
      loading={loading}
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
      rows={tagData}
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

export default TagListTable;
