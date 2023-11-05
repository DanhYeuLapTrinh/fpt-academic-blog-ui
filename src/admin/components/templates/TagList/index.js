import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import AddNewButton from "../../atoms/ButtonHeader/AddNewButton";
import DeleteConfirm from "../../molecules/Tag/DeleteConfirm";
import AddTagForm from "../../molecules/Tag/AddTagForm";
import CustomNoRowsOverlay from "../../molecules/CustomNoRowsOverlay/CustomNoRowsOverlay";

import { DataGrid } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "./styles.scss";
function TagList() {
  const [tagData, setTagData] = useState([]);
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

  const columns = [
    { field: "tagName", headerName: "Tên thẻ", width: 200 },
    {
      field: "action",
      headerName: "",
      width: 200,
      renderCell: (params) => (
        console.log(params),
        (
          <DeleteForeverIcon
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => handleDeleteClick(params.row.id, params.row.tagName)}
          />
        )
      ),
    },
  ];

  return (
    <div className="container-tag">
      <div className="content-tag">
        <h2 className="tag-title">Tất cả thẻ</h2>

        <div>
          <AddNewButton title="Thêm thẻ mới" handleClick={handleClickOpen} />
          <div className="add-tag-form">
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

      <DataGrid
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
        }}
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
        }}
        rows={tagData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        autoHeight
        disableRowSelectionOnClick
      />

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
