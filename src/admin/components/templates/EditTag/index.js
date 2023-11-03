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
} from "@mui/material";
import Alert from "@mui/material/Alert";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";

export const EditTag = () => {
  const axiosPrivate = useAxiosPrivate();
  const [tag, setTag] = useState({
    tagId: "",
    tagName: "",
  });

  const [tagList, setTagList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (e) => {
    setTag({ ...tag, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axiosPrivate
      .get(process.env.REACT_APP_TAGS_LIST)
      .then((res) => {
        setTagList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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

    const isDuplicate = tagList.some((t) => t.tagName === tag.tagName);
    if (isDuplicate) {
      setErrorMessage("Tên thẻ đã tồn tại.");
      return;
    }
    axiosPrivate
      .post(process.env.REACT_APP_EDIT_TAG, tag)
      .then((res) => {
        const updatedTagList = [...tagList];
        const index = updatedTagList.findIndex((t) => t.id === tag.tagId);
        if (index !== -1) {
          updatedTagList[index].tagName = tag.tagName;
        }
        setTagList(updatedTagList);
        setTag({ tagId: "", tagName: "" });

        setSnackbarOpen(true);
      })
      .catch((err) => console.log(err));
  }

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

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
            <Select
              fullWidth
              variant="outlined"
              name="tagId"
              value={tag.tagId}
              onChange={handleInput}
              onFocus={handleTagSelect}
            >
              <MenuItem value="">Chọn một thẻ</MenuItem>
              {tagList.map((t) => (
                <MenuItem key={t.id} value={t.id}>
                  {t.tagName}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={6}>
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
          sx={{ mt: 3 }}
        >
          Cập nhật thẻ
        </Button>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Chỉnh sửa thẻ thành công
        </Alert>
      </Snackbar>
    </Container>
  );
};
