import React, { useEffect, useState } from "react";
import CommentMenuOptionList from "./CommentMenuOptionList";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";
import Text from "../../atoms/Text/Text";
import usePost from "../../../hooks/usePost";
import { Icon } from "@iconify/react";

export default function CommentMenuOptionListService({ comment, deleteComment }) {
  const { reportReasons } = usePost();
  const [anchorEl, setAnchorEl] = useState(null);
  const [reportId, setReportId] = useState(null);
  const [openReport, setOpenReport] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOpenReport(true);
  };

  const handleCloseReport = () => {
    setOpenReport(false);
    setReportId(null);
  };

  const reportComment = async () => {
    try {
      if (!reportId) {
        toast.error("Vui lòng chọn lý do báo cáo");
        return;
      }
      await axiosPrivate.post(process.env.REACT_APP_REPORT_COMMENT, {
        commentId: comment.commentId,
        reasonOfReportId: reportId,
      });
      toast.success("Báo cáo bình luận thành công");
      setOpenReport(false);
      setReportId(null);
    } catch (error) {}
  };
  return (
    <>
      <IconButton
        disableFocusRipple
        disableRipple
        disableTouchRipple
        onClick={handleClick}
      >
        <Icon icon="ph:dots-three-outline-fill" color="#444746" width="18" />
      </IconButton>
      <CommentMenuOptionList
        reportReasons={reportReasons}
        handleClose={handleClose}
        anchorEl={anchorEl}
        open={open}
        setReportId={setReportId}
        reportId={reportId}
        reportComment={reportComment}
        handleClickOpen={handleClickOpen}
        handleCloseReport={handleCloseReport}
        openReport={openReport}
        setOpenReport={setOpenReport}
        comment={comment}
        deleteComment={deleteComment}
      />
    </>
  );
}
