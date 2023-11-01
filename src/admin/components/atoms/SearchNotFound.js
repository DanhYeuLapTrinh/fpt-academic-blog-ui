import React, { useState } from "react";
import {
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

function SearchNotFound({ filteredData }) {
  return (
    <TableBody>
      <TableRow>
        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
          <Paper
            sx={{
              textAlign: "center",
            }}
          >
            <Typography variant="h6" paragraph>
              Not found
            </Typography>

            <Typography variant="body2">
              No results found for &nbsp;
              <strong>&quot;{filteredData}&quot;</strong>.
              <br /> Try checking for typos or using complete words.
            </Typography>
          </Paper>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

export default SearchNotFound;
