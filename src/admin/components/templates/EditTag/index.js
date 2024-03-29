import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Grid,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  Paper,
  Snackbar,
  InputLabel,
} from "@mui/material";

import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import { useTagsContext } from "../../../context/TagsContext";
import { toast } from "react-toastify";

export const EditTag = () => {
  const axiosPrivate = useAxiosPrivate();
  const [tag, setTag] = useState({
    tagId: "",
    tagName: "",
  });

  const { tagData, setTagData } = useTagsContext();

  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (e) => {
    setTag({ ...tag, [e.target.name]: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!tag.tagId) {
      setErrorMessage("Vui lòng chọn một thẻ trước khi cập nhật.");
      return;
    }

    if (!tag.tagName) {
      setErrorMessage("Vui lòng nhập thông tin mới cho thẻ.");
      return;
    }

    const isDuplicate = tagData.some((t) => t.tagName === tag.tagName);
    if (isDuplicate) {
      setErrorMessage("Tên thẻ đã tồn tại.");
      return;
    }
    axiosPrivate
      .post(process.env.REACT_APP_EDIT_TAG, tag)
      .then((res) => {
        const updatedTagList = [...tagData];
        const index = updatedTagList.findIndex((t) => t.id === tag.tagId);
        if (index !== -1) {
          updatedTagList[index].tagName = tag.tagName;
        }
        setTagData(updatedTagList);
        setTag({ tagId: "", tagName: "" });
        toast.success("Chỉnh sửa thẻ thành công");
      })
      .catch((err) => {
        console.log(err);
        toast.success("Chỉnh sửa thẻ thất bại");
      });
  }
  const handleTagSelect = () => {
    if (errorMessage === "Vui lòng chọn một thẻ trước khi cập nhật.") {
      setErrorMessage("");
    }
  };

  const handleTagInput = () => {
    if (errorMessage === "Vui lòng nhập thông tin mới cho thẻ.") {
      setErrorMessage("");
    }
  };

  return (
    <Container maxWidth="md">
      <Paper
        sx={{
          padding: 3,
          borderRadius: 1,
          boxShadow: 1,
          backgroundColor: "background.paper",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 4, fontWeight: "bold" }}
        >
          Cập nhật thẻ
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <InputLabel>Danh sách thẻ đã có: </InputLabel>
            <Select
              fullWidth
              variant="outlined"
              name="tagId"
              value={tag.tagId}
              onChange={handleInput}
              onFocus={handleTagSelect}
            >
              <MenuItem disabled value="">
                Chọn một thẻ
              </MenuItem>
              {tagData
                .filter((t) => t.tagName !== "Q&A")
                .map((t) => (
                  <MenuItem key={t.id} value={t.id}>
                    {t.tagName}
                  </MenuItem>
                ))}
            </Select>
          </Grid>

          <Grid item xs={6}>
            <InputLabel>Nội dung thẻ mới: </InputLabel>
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              placeholder="Nhập nội dung thay đổi thẻ"
              name="tagName"
              value={tag.tagName}
              onChange={handleInput}
              onFocus={handleTagInput}
            />
          </Grid>
        </Grid>

        <Box mt={3} sx={{ color: "red" }}>
          {errorMessage}
        </Box>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSubmit}
          sx={{ mt: 3, borderRadius: 20 }}
        >
          Cập nhật thẻ
        </Button>
      </Paper>
    </Container>
  );
};
