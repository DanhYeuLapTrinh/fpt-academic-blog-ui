import React, { useEffect, useState } from "react";
import MyMenuOptionList from "./MyMenuOptionList";
import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import useProfile from "../../../hooks/useProfile";
import { useParams } from "react-router-dom";
export default function MyMenuOptionListService(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [reportReasons, setReportReasons] = useState([]);
  const [reportId, setReportId] = useState(null);
  const [openReport, setOpenReport] = useState(false);
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const auth = useAuth();
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axiosPrivate.get(
          process.env.REACT_APP_REPORT_REASONS
        );
        setReportReasons(response?.data);
      } catch (error) {}
    };
    if (Number(id) !== auth.id) fetchData();
  }, [id, auth.id]);

  const reportProfile = async () => {
    try {
      if (!reportId) {
        toast.error("Vui lòng chọn lý do báo cáo");
        return;
      }
      await axiosPrivate.post(process.env.REACT_APP_REPORT_PROFILE, {
        userId: id,
        reasonOfReportId: reportId,
      });
      toast.success("Báo cáo tài khoản người dùng thành công");
      setOpenReport(false);
      setReportId(null);
    } catch (error) {}
  };
  return (
    <>
      <IconButton onClick={handleClick}>
        <Icon icon="ph:dots-three-outline-fill" color="#444746" width="18" />
      </IconButton>
      <MyMenuOptionList
        handleClose={handleClose}
        anchorEl={anchorEl}
        open={open}
        reportReasons={reportReasons}
        setReportId={setReportId}
        reportId={reportId}
        reportProfile={reportProfile}
        handleClickOpen={handleClickOpen}
        handleCloseReport={handleCloseReport}
        openReport={openReport}
        setOpenReport={setOpenReport}
      />
    </>
  );
}
