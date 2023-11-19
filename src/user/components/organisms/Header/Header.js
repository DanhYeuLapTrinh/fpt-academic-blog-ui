import React, { useEffect } from "react";
import UserTab from "../UserTab/UserTab";
import { Container, Divider, Stack } from "@mui/material";
import Text from "../../atoms/Text/Text";
import { Link, useNavigate } from "react-router-dom";
import NavList from "../../molecules/Navigation/NavList";
import useProfile from "../../../hooks/useProfile";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

export default function Header() {
  const { setAvatarURL, setUser } = useProfile();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const auth = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let profileInfo = await axiosPrivate.post(
          process.env.REACT_APP_VIEW_PROFILE,
          {
            userId: auth.id,
          }
        );
        if (profileInfo?.data) {
          setAvatarURL(profileInfo?.data?.profileUrl);
          let skills = await axiosPrivate.get("users/skills");
          setUser((prevUser) => ({
            ...prevUser,
            skills: skills?.data,
          }));
        }
      } catch (error) {
        if (error?.response?.status === 405) {
          toast.error("Tài khoản của bạn đã bị khóa");
          navigate("/login", { replace: true });
          localStorage.removeItem("auth");
        }
      }
    };
    fetchData();
  }, []);
  return (
    <Container sx={{ padding: "15px 0" }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Text fontFamily="Klavika" color="primary.main" fontSize="42px">
              fblog
            </Text>
          </Link>
          <Divider orientation="vertical" sx={{ height: "25px" }} />
          <NavList />
        </Stack>
        <UserTab />
      </Stack>
    </Container>
  );
}
