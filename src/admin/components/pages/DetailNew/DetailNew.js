import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import { Divider, Typography } from "@mui/material";
import NewsBottom from "../../organisms/NewsBottom/NewsBottom";
import "./styles.scss";
function DetailNew() {
  const { id } = useParams();

  const axiosPrivate = useAxiosPrivate();

  const [detailNew, setDetailNew] = useState([]);

  const fetchData = async () => {
    const detailNewRes = await axiosPrivate.get(`news/view?id=${id}`);
    setDetailNew(detailNewRes.data);
    console.log(detailNewRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!detailNew) {
    return <div>Loading...</div>;
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
