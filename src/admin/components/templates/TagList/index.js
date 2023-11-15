import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import AddNewButton from "../../atoms/ButtonHeader/AddNewButton";
import DeleteConfirm from "../../molecules/Tag/DeleteConfirm";
import AddTagForm from "../../molecules/Tag/AddTagForm";
import CustomNoRowsOverlay from "../../molecules/CustomNoRowsOverlay/CustomNoRowsOverlay";

import { DataGrid } from "@mui/x-data-grid";
import { LinearProgress } from "@mui/material";
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

  const fetchData = async () => {
    const res = await axiosPrivate.get(process.env.REACT_APP_TAGS_LIST);

    setTagData(res.data);
  };

  useEffect(() => {
    fetchData();
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
        toast.success(`Thêm thẻ "${newTagName}" thành công`);
      })
      .catch((error) => {
        console.error("Error adding tag: " + error);
        toast.error(`Thêm thẻ "${newTagName}" không thành công`);
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
        toast.success(`Đã xóa thẻ: ${tagToDelete.name}`);
      })
      .catch((error) => {
        console.error("Error deleting tag: " + error);
        toast.error(`Xóa thẻ không thành công`);
        setDeleteConfirmationOpen(false);
      });
  };

  const handleCancelDelete = () => {
    setTagToDelete({ id: null, name: null });
    setDeleteConfirmationOpen(false);
  };

  const columns = [
    { field: "tagName", headerName: "Tên thẻ", sortable: false, width: 200 },
    {
      field: "action",
      headerName: "",
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <DeleteForeverIcon
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => handleDeleteClick(params.row.id, params.row.tagName)}
        />
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
        loading={tagData.length === 0}
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
        }}
        slots={{
          loadingOverlay: LinearProgress,
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
        disableColumnMenu
        disableColumnFilter
      />

      <DeleteConfirm
        open={deleteConfirmationOpen}
        handleClose={handleCancelDelete}
        deleteTag={handleDeleteConfirmation}
        data={tagToDelete.name}
      />
    </div>
  );
}

export default TagList;
