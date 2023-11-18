import React, { useEffect } from "react";
import ViewAccountList from "./ViewAccountList";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Box, Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useHome from "../../../hooks/useHome";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import { toast } from "react-toastify";

export default function ViewAccoutListService() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { users, setUsers, setAccountName, accountName } = useHome();
  const { id } = useParams();
  const auth = useAuth();
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
        if (error?.response?.status === 405) {
          toast.error("Tài khoản của bạn đã bị khóa");
          navigate("/login", { replace: true });
          localStorage.removeItem("auth");
        }
      }
    }
  };

  useEffect(() => {
    setAccountName(id);
    handleSearchAccount({
      keyCode: 13,
      shiftKey: false,
      target: { value: id },
    });
    return () => setAccountName("");
  }, []);

  const followAccount = async (inputId) => {
    try {
      let response = await axiosPrivate.post(
        process.env.REACT_APP_FOLLOW_ACCOUNT,
        {
          followedBy: auth?.id,
          userId: inputId,
        }
      );
      if (response) {
        setUsers((prev) =>
          prev.map((user) =>
            user.userId === inputId
              ? {
                  ...user,
                  followStatus: true,
                  numOfFollower: user.numOfFollower + 1,
                }
              : user
          )
        );
      }
    } catch (error) {
      if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }
    }
  };

  const unfollowAccount = async (inputId) => {
    try {
      let response = await axiosPrivate.post(
        process.env.REACT_APP_UNFOLLOW_ACCOUNT,
        {
          followedBy: auth?.id,
          userId: inputId,
        }
      );
      if (response) {
        setUsers((prev) =>
          prev.map((user) =>
            user.userId === inputId
              ? {
                  ...user,
                  followStatus: false,
                  numOfFollower: user.numOfFollower - 1,
                }
              : user
          )
        );
      }
    } catch (error) {
      if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }
    }
  };
  return (
    <Container sx={{ mt: "37px" }}>
      <Box mb={"20px"}>
        <SearchBar
          accountName={accountName}
          setAccountName={setAccountName}
          width="100%"
        />
      </Box>
      <ViewAccountList
        followAccount={followAccount}
        unfollowAccount={unfollowAccount}
        users={users}
      />
    </Container>
  );
}
