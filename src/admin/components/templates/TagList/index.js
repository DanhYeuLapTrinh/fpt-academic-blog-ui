import React, { useEffect, useState } from "react";
import { TablePagination } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import AddNewButton from "../../atoms/AddNewButton";
import DeleteConfirm from "../../molecules/Tag/DeleteConfirm";
import AddTagForm from "../../molecules/Tag/AddTagForm";
function TagList() {
  const [tagData, setTagData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [tagToDelete, setTagToDelete] = useState({ id: null, name: null });
  const axiosPrivate = useAxiosPrivate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewTagName("");
    setErrorMessage("");
  };

  useEffect(() => {
    axiosPrivate
      .get(process.env.REACT_APP_TAGS_LIST)
      .then((response) => {
        setTagData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: " + error);
      });
  }, []);

  const handleAddTag = () => {
    if (newTagName.trim() === "") {
      setErrorMessage("Tên thẻ không được bỏ trống.");
      return;
    }
    if (newTagName.length > 15) {
      setErrorMessage("Tên thẻ tối đa 15 ký tự.");
      return;
    }

    const isDuplicate = tagData.some((tag) => tag.tagName === newTagName);
    if (isDuplicate) {
      setErrorMessage("Tên thẻ đã tồn tại.");
      return;
    }

    axiosPrivate
      .post(process.env.REACT_APP_ADD_NEW_TAG, { tagName: newTagName })
      .then((response) => {
        const newTag = response.data;
        setTagData([...tagData, newTag]);
        handleClose();
        toast.success(`Thêm thẻ "${newTagName}" thành công`, {
          position: "top-right",
          autoClose: 3000,
        });
      })
      .catch((error) => {
        console.error("Error adding tag: " + error);
        toast.error(`Thêm thẻ "${newTagName}" không thành công`, {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  const handleDeleteClick = (tagId, tagName) => {
    setTagToDelete({ id: tagId, name: tagName });
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmation = () => {
    axiosPrivate
      .post(process.env.REACT_APP_DELETE_TAG, {
        tagId: tagToDelete.id,
        tagName: tagToDelete.name,
      })
      .then(() => {
        const updatedTagData = tagData.filter(
          (tag) => tag.id !== tagToDelete.id
        );
        setTagData(updatedTagData);
        setDeleteConfirmationOpen(false);
        toast.success(`Đã xóa thẻ: ${tagToDelete.name}`, {
          position: "top-right",
          autoClose: 3000,
        });
      })
      .catch((error) => {
        console.error("Error deleting tag: " + error);
        toast.error(`Xóa thẻ không thành công`, {
          position: "top-right",
          autoClose: 3000,
        });
        setDeleteConfirmationOpen(false);
      });
  };

  const handleCancelDelete = () => {
    setTagToDelete({ id: null, name: null });
    setDeleteConfirmationOpen(false);
  };

  return (
    <div className="m-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Tất cả thẻ</h2>

        <div>
          <AddNewButton title="Thêm thẻ mới" handleClick={handleClickOpen} />
          <div className="w-100">
            <AddTagForm
              open={open}
              handleClose={handleClose}
              handleAddTag={handleAddTag}
              errorMessage={errorMessage}
              newTagName={newTagName}
              data={(e) => setNewTagName(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-x-auto rounded-xl">
        <table className="table-auto w-full text-left border">
          <thead className="bg-gray-500">
            <tr className="border-b">
              <th className="px-4 py-2">Tag Name</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {tagData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((tag) => (
                <tr key={tag.id} className="border-b">
                  <td className="px-4 py-2">{tag.tagName}</td>
                  <td className="px-4 py-2">
                    <DeleteForeverIcon
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => handleDeleteClick(tag.id, tag.tagName)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tagData.length}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </div>

      <DeleteConfirm
        open={deleteConfirmationOpen}
        handleClose={handleCancelDelete}
        deleteTag={handleDeleteConfirmation}
        data={tagToDelete.name}
      />

      <ToastContainer position="top-right" autoClose={3000} closeOnClick />
    </div>
  );
}

export default TagList;
