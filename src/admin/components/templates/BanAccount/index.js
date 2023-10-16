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
  const [bannedAccounts, setBannedAccounts] = useState([]);
  const [isBanning, setIsBanning] = useState(false); // Biến để kiểm tra xem có đang trong quá trình cấm tài khoản hay không

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const headers = {
    Authorization: `Bearer ${auth.token}`,
  };

  useEffect(() => {
    axiosConfig.get("admin/users", { headers }).then((res) => {
      setData(res.data);
      setRecords(res.data);

      // Tạo danh sách tài khoản bị cấm
      const banned = res.data.filter((item) => item.isBan);
      setBannedAccounts(banned);

      console.log(res.data);
      console.log(res.data.isBan);
    });
  }, []);

  const handleSearch = (event) => {
    const filteredData = data.filter((item) =>
      item.username.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(filteredData);
  };

  const toggleBanStatus = (id) => {
    setIsBanning(true); // Bắt đầu quá trình cấm tài khoản
    axiosConfig
      .post("admin/ban-user", { id }, { headers })
      .then((res) => {
        toast.success("Cấm tài khoản thành công", {
          position: "top-right",
          autoClose: 3000,
        });
        // Cập nhật lại trạng thái cấm tài khoản trong danh sách
        setRecords((prevRecords) => {
          const updatedRecords = prevRecords.map((item) => {
            if (item.id === id) {
              return { ...item, isBan: !item.isBan };
            }
            return item;
          });
          return updatedRecords;
        });
        setIsBanning(false); // Kết thúc quá trình cấm tài khoản
      })
      .catch((error) => {
        toast.success("Cấm tài khoản xảy ra lỗi", {
          position: "top-right",
          autoClose: 3000,
        });
        setIsBanning(false); // Kết thúc quá trình cấm tài khoản (trong trường hợp lỗi)
        console.log(error);
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
        // Cập nhật lại danh sách tài khoản và danh sách tài khoản bị cấm
        setRecords((prevRecords) => {
          const updatedRecords = prevRecords.map((item) => {
            if (item.id === id) {
              return { ...item, isBan: false };
            }
            return item;
          });
          return updatedRecords;
        });
        setBannedAccounts((prevBanned) =>
          prevBanned.filter((bannedId) => bannedId !== id)
        );
      })
      .catch((error) => {
        toast.success("Bỏ cấm tài khoản không thành công", {
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
                  <td className="p-4">{item.isBan ? "Cấm" : "Bình thường"}</td>

                  <td className="p-4 flex items-center">
                    {isBanning ? ( // Kiểm tra nếu đang trong quá trình cấm tài khoản
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        disabled
                      >
                        Đang cấm...
                      </button>
                    ) : item.isBan ? (
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded-lg"
                        onClick={() => unbanAccount(item.id)}
                      >
                        Bỏ cấm tài khoản
                      </button>
                    ) : (
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                        onClick={() => toggleBanStatus(item.id)}
                      >
                        Cấm tài khoản
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
          count={records.length} // Tổng số hàng
          page={page} // Trang hiện tại
          onPageChange={(event, newPage) => setPage(newPage)} // Xử lý khi thay đổi trang
          rowsPerPage={rowsPerPage} // Số hàng mỗi trang
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
