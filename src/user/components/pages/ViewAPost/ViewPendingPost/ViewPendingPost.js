import { Button, Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import Text from "../../../atoms/Text/Text";
import styles from "./Styles.module.scss";
import AccountInfoBar from "../../../organisms/AccountInfoBar/AccountInfoBar";
import { getFirstChar } from "../../../../utils/StringMethod";
export default function ViewPendingPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosPrivate.post("users/view-post", {
        slug: slug,
      });
      setData(response.data);
    };
    fetchData();
  }, []);
  const handleSubmit = async () => {
    try {
      await axiosPrivate.post("lecturer/posts/approve", {
        postId: data?.postId,
      });
      navigate("/pending-posts", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDecline = async () => {
    try {
      await axiosPrivate.post("lecturer/posts/decline", {
        postId: data?.postId,
        reasonOfDecline: "Post ko hay",
      });
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      navigate("/pending-posts", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <AccountInfoBar
        src={data?.avatarURL}
        color="secondary.main"
        text={data?.accountName}
        time={data?.dateOfPost}
        major={getFirstChar(data?.category[0])}
        subject={data?.category[1]}
        tag={data?.tag}
      />
      <div className={styles.contentWrapper}>
        <Text>
          <h1 style={{ fontSize: "40px", lineHeight: "50px" }}>
            {data?.title}
          </h1>
        </Text>
        <img style={{ margin: "20px 0 40px" }} src={data?.coverURL} />
        <div dangerouslySetInnerHTML={{ __html: data?.content }} />
      </div>
      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        spacing={2}
        paddingTop={"30px"}
      >
        <Button
          onClick={handleDecline}
          sx={{ padding: "10px" }}
          variant="outlined"
        >
          Từ chối
        </Button>
        <Button
          onClick={handleSubmit}
          sx={{ padding: "10px" }}
          variant="contained"
        >
          Phê duyệt
        </Button>
      </Stack>
    </Container>
  );
}
