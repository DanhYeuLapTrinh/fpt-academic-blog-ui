import React from "react";
import { TablePagination } from "@mui/material";
function HandleTablePagination({
  rowsPerPageOptions,
  component,
  data,
  page,
  setPage,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
}) {
  return (
    <TablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      component={component}
      count={data}
      page={page}
      setPage={setPage}
      onPageChange={onPageChange}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  );
}

export default HandleTablePagination;
