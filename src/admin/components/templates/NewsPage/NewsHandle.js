import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import { DataGrid } from "@mui/x-data-grid";
import { LinearProgress, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import DeleteNewHandle from "../DeleteNewHandle/DeleteNewHandle";
import { useNewsContext } from "../../../context/NewsContext";
import CustomNoRowsOverlay from "../../molecules/CustomNoRowsOverlay/CustomNoRowsOverlay";
function NewsHandle() {
  const axiosPrivate = useAxiosPrivate();

  const { news, setNews } = useNewsContext();

  const [loading, setLoading] = useState(false);

  const [noRows, setNoRows] = useState(false);

  const fetchData = async () => {
    try {
      const newsRes = await axiosPrivate.get("news/list");

      if (!newsRes.length) {
        setNoRows(true);
      }

      if (newsRes.status === 200) {
        setNews(newsRes.data);
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

  const columns = [
    { field: "newsAt", headerName: "Thời gian", sortable: false, width: 160 },
    {
      field: "title",
      headerName: "Tiêu đề",
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <Link to={`/news/view/${params.row.newsId}`}>
          <Typography sx={{ color: "#333", fontSize: "16px" }}>
            {params.value}
          </Typography>
        </Link>
      ),
    },
    {
      field: "",
      headrName: "",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <DeleteNewHandle id={params.row.newsId} fetchData={fetchData} />
      ),
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
        Danh sách tin tức
      </Typography>
      <DataGrid
        rows={news}
        getRowId={(row) => row.newsId}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
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
        pageSizeOptions={[5, 10, 25]}
        autoHeight
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnFilter
      />
    </>
  );
}

export default NewsHandle;
