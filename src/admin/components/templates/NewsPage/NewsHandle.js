import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import { DataGrid } from "@mui/x-data-grid";
import { LinearProgress, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import DeleteNewHandle from "../DeleteNewHandle/DeleteNewHandle";
import { useNewsContext } from "../../../context/NewsContext";
function NewsHandle() {
  const axiosPrivate = useAxiosPrivate();

  const { news, setNews } = useNewsContext();
  
  const fetchData = async () => {
    const newsRes = await axiosPrivate.get("news/list");
    setNews(newsRes.data);
    console.log(newsRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { field: "newsAt", headerName: "Thời gian", width: 160 },
    {
      field: "title",
      headerName: "Tiêu đề",
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
        Danh sách tin tức nóng hổi vừa mới ra lò
      </Typography>
      <DataGrid
        loading={news.length === 0}
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
    </>
  );
}

export default NewsHandle;
