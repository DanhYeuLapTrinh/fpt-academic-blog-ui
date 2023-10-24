import React, { useEffect, useState } from "react";
import { TablePagination } from "@mui/material";
import { Button } from "@mui/base";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";

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
      .get("/tags")
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

    // Check for duplicates
    const isDuplicate = tagData.some((tag) => tag.tagName === newTagName);
    if (isDuplicate) {
      setErrorMessage("Tên thẻ đã tồn tại.");
      return;
    }

    // If all validations pass, add the tag
    axiosPrivate
      .post("admin/new-tag", { tagName: newTagName })
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
        // Handle the error as needed
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
    // Perform delete action here
    axiosPrivate
      .post("admin/delete-tag", {
        tagId: tagToDelete.id,
        tagName: tagToDelete.name,
      })
      .then(() => {
        // Remove the tag from the local state
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
        // Handle the error as needed
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
          <Button
            className="px-4 h-12 rounded-lg shadow-md bg-custom text-white text-center"
            onClick={handleClickOpen}
          >
            <AddCircleIcon className="mr-2" />
            Thêm thẻ mới
          </Button>
          <div className="w-100">
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle style={{ fontWeight: "bold" }}>
                Thêm thẻ mới
              </DialogTitle>
              <DialogContent style={{ paddingBottom: "5px" }}>
                <TextField
                  margin="dense"
                  label="Tên thẻ mới"
                  type="text"
                  name="tagName"
                  fullWidth
                  variant="standard"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                />
                <p style={{ color: "red" }}>{errorMessage}</p>
              </DialogContent>
              <DialogActions style={{ marginTop: "10px" }}>
                <Button onClick={handleClose}>Hủy thêm</Button>
                <Button
                  className="bg-green-500 rounded h-8 w-20 text-white"
                  onClick={handleAddTag}
                >
                  Thêm mới
                </Button>
              </DialogActions>
            </Dialog>
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

      <Dialog open={deleteConfirmationOpen} onClose={handleCancelDelete}>
        <DialogTitle>
          {`Bạn có chắc chắn xóa "${tagToDelete.name}" không?`}
        </DialogTitle>
        <DialogActions style={{ marginTop: "10px" }}>
          <Button onClick={handleCancelDelete}>Không</Button>
          <Button
            className="bg-red-500 rounded h-8 w-20 text-white"
            onClick={handleDeleteConfirmation}
          >
            Có
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position="top-right" autoClose={3000} closeOnClick />
    </div>
  );
}

export default TagList;
