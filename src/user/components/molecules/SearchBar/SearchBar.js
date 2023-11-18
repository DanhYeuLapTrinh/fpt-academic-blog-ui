import { IconButton, Paper, TextField } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import React from "react";
import SearchPopperService from "../../organisms/SearchPopper/SearchPopperService";
import { useNavigate } from "react-router-dom";
import useHome from "../../../hooks/useHome";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";

export default function SearchBar({ accountName, setAccountName, ...props }) {
  const { setUsers } = useHome();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const handleSearchAccount = async (e) => {
    if (e.keyCode === 13 && e.shiftKey === false && e.target.value !== "") {
      try {
        let response = await axiosPrivate.post(
          process.env.REACT_APP_SEARCH_ACCOUNT,
          {
            search: e.target.value,
          }
        );
        if (response?.data) {
          window.scrollTo(0, 0);
          navigate(`/accounts/${e.target.value}`);
          setUsers(response?.data);
        }
      } catch (error) {
        if(error.response.status === 405){
          toast.error("Tài khoản của bạn đã bị khóa")
          navigate("/login", { replace: true });
          localStorage.removeItem("auth")
        }
      }
    }
  };
  return (
    <Paper
      elevation={3}
      sx={{
        width: props.width ? props.width : "740px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        borderRadius: "10px",
      }}
    >
      <IconButton sx={{ m: "10px 5px 10px 10px", color: "primary.main" }}>
        <SearchRoundedIcon />
      </IconButton>
      <TextField
        variant="standard"
        fullWidth
        spellCheck={false}
        InputProps={{
          disableUnderline: true,
        }}
        value={accountName}
        onChange={(e) => setAccountName(e.target.value)}
        onKeyUp={handleSearchAccount}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Nhấn để tìm kiếm"
      />
      <SearchPopperService />
    </Paper>
  );
}
