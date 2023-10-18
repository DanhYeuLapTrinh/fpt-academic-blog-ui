import React, { useState, useEffect } from "react";
import { Input } from "@material-tailwind/react";
import SearchIcon from "@mui/icons-material/Search";
import { axiosConfig } from "../../../api/axios";
import useAuth from "../../../../user/hooks/useAuth";
import { TablePagination } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BanAccountList() {
  const { auth } = useAuth();
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
  const [isBanning, setIsBanning] = useState(false);
  const [isBanningId, setIsBanningId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [banStatus, setBanStatus] = useState(
    JSON.parse(localStorage.getItem("banStatus")) || {}
  );

  const headers = {
    Authorization: `Bearer ${auth.token}`,
  };

  useEffect(() => {
    axiosConfig.get("admin/users", { headers }).then((res) => {
      setData(res.data);
      setRecords(res.data);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("banStatus", JSON.stringify(banStatus));
  }, [banStatus]);

  const handleSearch = (event) => {
    const filteredData = data.filter((item) =>
      item.username.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(filteredData);
  };

  const handleBanButtonClick = (id) => {
    if (banStatus[id]) {
      unbanAccount(id);
    } else {
      banAccount(id);
    }
  };

  const banAccount = (id) => {
    setIsBanning(true);
    setIsBanningId(id);
    axiosConfig
      .post("admin/ban-user", { id }, { headers })
      .then((res) => {
        toast.success("Cấm tài khoản thành công", {
          position: "top-right",
          autoClose: 3000,
        });
        setRecords((prevRecords) => {
          const updatedRecords = prevRecords.map((item) => {
            if (item.id === id) {
              return { ...item, isBan: true };
            }
            return item;
          });
          return updatedRecords;
        });
        setIsBanning(false);
        setIsBanningId(null);
        setBanStatus({ ...banStatus, [id]: true });
      })
      .catch((error) => {
        toast.error("Cấm tài khoản xảy ra lỗi", {
          position: "top-right",
          autoClose: 3000,
        });
        setIsBanning(false);
        setIsBanningId(null);
        console.error(error);
      });
  };

  const unbanAccount = (id) => {
    axiosConfig
      .post("admin/unban-user", { id }, { headers })
      .then((res) => {
        toast.success("Bỏ cấm tài khoản thành công", {
          position: "top-right",
          autoClose: 3000,
        });
        setRecords((prevRecords) => {
          const updatedRecords = prevRecords.map((item) => {
            if (item.id === id) {
              return { ...item, isBan: false };
            }
            return item;
          });
          return updatedRecords;
        });
        setBanStatus({ ...banStatus, [id]: false });
        setIsBanning(false);
        setIsBanningId(null);
      })
      .catch((error) => {
        toast.error("Bỏ cấm tài khoản không thành công", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error("Lỗi khi bỏ cấm tài khoản:", error);
      });
  };

  return (
    <div className="m-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Danh sách người dùng</h2>

        <div className="w-1/3">
          <Input
            icon={<SearchIcon className="h-5 w-5" />}
            label="Tìm kiếm người dùng..."
            type="text"
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="bg-white shadow overflow-x-auto rounded-xl">
        <table className="table-auto w-full text-left border">
          <thead className="bg-gray-500">
            <tr className="border-b">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {records
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-4">{item.id}</td>
                  <td className="p-4">{item.username}</td>
                  <td className="p-4">{item.role.roleName}</td>
                  <td className="p-4">
                    {banStatus[item.id] ? "Bị cấm" : "Bình thường"}
                  </td>
                  <td className="p-4 flex items-center">
                    {banStatus[item.id] ? ( // If banStatus is true for this row, show "Bỏ cấm tài khoản" button
                      <button
                        className={`${
                          isBanning && isBanningId === item.id
                            ? "bg-blue-500"
                            : "bg-green-500"
                        } text-white px-4 py-2 rounded-lg`}
                        onClick={() => handleBanButtonClick(item.id)}
                      >
                        {isBanning && isBanningId === item.id
                          ? "Đang cấm..."
                          : "Bỏ cấm tài khoản"}
                      </button>
                    ) : (
                      // If banStatus is false for this row, show "Cấm tài khoản" button
                      <button
                        className={`${
                          isBanning && isBanningId === item.id
                            ? "bg-blue-500"
                            : "bg-red-500"
                        } text-white px-4 py-2 rounded-lg`}
                        onClick={() => handleBanButtonClick(item.id)}
                      >
                        {isBanning && isBanningId === item.id
                          ? "Đang cấm..."
                          : "Cấm tài khoản"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={records.length}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </div>
      <ToastContainer position="top-right" autoClose={3000} closeOnClick />
    </div>
  );
}

export default BanAccountList;
