import React, { useState, useEffect } from "react";
import { Input } from "@material-tailwind/react";
import SearchIcon from "@mui/icons-material/Search";
import { axiosConfig } from "../../../api/axios";
import useAuth from "../../../../user/hooks/useAuth";

function BanAccountList() {
  const { auth } = useAuth();
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
  const [bannedAccounts, setBannedAccounts] = useState([]);
  const [isBanning, setIsBanning] = useState(false); // Biến để kiểm tra xem có đang trong quá trình cấm tài khoản hay không

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
      item.name.toLowerCase().includes(event.target.value.toLowerCase())
    );

    setRecords(filteredData);
  };

  const toggleBanStatus = (id) => {
    setIsBanning(true); // Bắt đầu quá trình cấm tài khoản
    axiosConfig
      .post("admin/ban-user", { id }, { headers })
      .then((res) => {
        console.log("Cập nhật trạng thái cấm tài khoản thành công.");
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
        console.error("Lỗi khi cập nhật trạng thái cấm tài khoản:", error);
        setIsBanning(false); // Kết thúc quá trình cấm tài khoản (trong trường hợp lỗi)
      });
  };

  const unbanAccount = (id) => {
    axiosConfig
      .post("admin/unban-user", { id }, { headers })
      .then((res) => {
        console.log("Tài khoản đã được bỏ cấm.");
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
        console.error("Lỗi khi bỏ cấm tài khoản:", error);
      });
  };

  return (
    <div className="m-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">User List</h2>

        <div className="w-1/3">
          <Input
            icon={<SearchIcon className="h-5 w-5" />}
            label="Search"
            type="text"
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="bg-white shadow overflow-x-auto rounded-xl">
        <table className="table-auto w-full text-left border">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {records.map((item) => (
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
      </div>
    </div>
  );
}

export default BanAccountList;
