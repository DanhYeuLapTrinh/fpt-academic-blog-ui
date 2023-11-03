import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Text from "../../atoms/Text/Text";
import { TextField } from "@mui/material";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import FormInput from "../../atoms/FormInput/FormInput";
import MyButton from "../../atoms/MyButton/MyButton";

export default function PopUpDialog(props) {
  const INITIAL_FORM_STATE = {
    reason: "",
  };
  const FORM_VALIDATION = Yup.object().shape({
    reason: Yup.string().required("Lý do không được bỏ trống"),
  });
  const handleSumit = (values) => {
    props.handleDecline(values.reason)
  };
  return (
    <div>
      <Dialog
        disableEscapeKeyDown
        open={props.open}
        onClose={props.handleClose}
      >
        <Formik
          initialValues={{ ...INITIAL_FORM_STATE }}
          validationSchema={FORM_VALIDATION}
          onSubmit={handleSumit}
        >
          <Form>
            <DialogTitle sx={{ p: "20px 24px 16px" }}>
              <Text fontSize="18px">Nhập lý do:</Text>
            </DialogTitle>
            <DialogContent sx={{ p: "14px 16px" }}>
              <FormControl sx={{ m: 1, minWidth: 500 }}>
                <FormInput
                  width="100%"
                  autoFocus
                  name="reason"
                  multiline
                  text="Vui lòng nhập lý do từ chối bài viết..."
                />
              </FormControl>
            </DialogContent>
            <DialogActions sx={{p: " 16px 24px 24px" }}>
              <Button
                onClick={props.handleClose}
                variant="outlined"
                sx={{ textTransform: "none", mr: "10px" }}
              >
                Hủy
              </Button>
              <MyButton
                variant="contained"
                sx={{ textTransform: "none" }}
              >
                Từ chối
              </MyButton>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
    </div>
  );
}
