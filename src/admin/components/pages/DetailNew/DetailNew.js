import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import { useNewsContext } from "../../../context/NewsContext";
import { Box, Container, Divider, Typography } from "@mui/material";
import NewsBottom from "../../organisms/NewsBottom/NewsBottom";
import "./styles.scss";
function DetailNew() {
  const { id } = useParams();

  const axiosPrivate = useAxiosPrivate();

  const { news, setNews, detailNew, setDetailNew, newFound, setNewFound } =
    useNewsContext();

  const fetchData = async () => {
    try {
      const detailNewRes = await axiosPrivate.get(`news/view?id=${id}`);
      setDetailNew(detailNewRes.data);
    } catch (error) {
      if (error.request) {
        console.log("Server không phản hồi");
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const found = news.some(
      (newDetail) => newDetail.newsId === detailNew.newsId
    );

    setNewFound(found);
  }, [detailNew.newsId, news]);

  if (!newFound) {
    return (
      <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
        <Container>
          <Typography variant="h6">Không tìm thấy tin tức này</Typography>
        </Container>
      </Box>
    );
  }

  const contentParagraphs = detailNew.content
    ? detailNew.content.split("\n")
    : [];

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#004175" }}>
        {detailNew.title}
      </Typography>
      <p style={{ fontSize: "12px" }}>
        Đăng bởi {detailNew.sentBy} <span>vào lúc {detailNew.newsAt}</span>
      </p>

      <Divider sx={{ my: "25px" }} />

      <div>
        {contentParagraphs.map((paragraph, index) => (
          <p
            key={index}
            style={{ marginBottom: "10px", fontSize: "14px" }}
            dangerouslySetInnerHTML={{
              __html: paragraph,
            }}
          />
        ))}
      </div>
      <Divider sx={{ my: "25px" }} />

      <NewsBottom fetchData={fetchData} selectedNewsId={id} />
    </>
  );
}

export default DetailNew;
