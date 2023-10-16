import React, { useEffect, useState } from "react";
import useAuth from "../../../../user/hooks/useAuth";
import { axiosConfig } from "../../../api/axios";
import { TablePagination } from "@mui/material";
function TagList() {
  const [tagData, setTagData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { auth } = useAuth();
  const headers = {
    Authorization: `Bearer ${auth.token}`,
  };
  useEffect(() => {
    axiosConfig
      .get("admin/tags", { headers })
      .then((response) => {
        setTagData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: " + error);
      });
  }, []);

  return (
    <div className="m-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Tất cả thẻ</h2>
      </div>

      <div className="bg-white shadow overflow-x-auto rounded-xl">
        <table className="table-auto w-full text-left border">
          <thead className="bg-gray-500">
            <tr className="border-b">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Tag Name</th>
              <th className="px-4 py-2">Creation Date</th>
            </tr>
          </thead>
          <tbody>
            {tagData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((tag) => (
                <tr key={tag.id} className="border-b">
                  <td className="px-4 py-2">{tag.id}</td>
                  <td className="px-4 py-2">{tag.tagName}</td>
                  <td className="px-4 py-2">{tag.creationDate}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tagData.length} // Tổng số hàng
          page={page} // Trang hiện tại
          onPageChange={(event, newPage) => setPage(newPage)} // Xử lý khi thay đổi trang
          rowsPerPage={rowsPerPage} // Số hàng mỗi trang
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </div>
    </div>
  );
}

export default TagList;
