import React from "react";

import { DataGrid } from "@mui/x-data-grid";
import { LinearProgress } from "@mui/material";

function TagListTable({ tagData, columns }) {
  return (
    <DataGrid
      loading={tagData.length === 0}
      sx={{
        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
          outline: "none !important",
        },
      }}
      slots={{
        loadingOverlay: LinearProgress,
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
