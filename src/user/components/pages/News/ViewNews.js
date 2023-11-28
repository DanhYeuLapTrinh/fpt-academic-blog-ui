import { Container } from "@mui/material";
import styles from "./Styles.module.scss";
import React from "react";
import Text from "../../atoms/Text/Text";

export default function ViewNews({ news }) {
  return (
    <Container sx={{ mt: "37px", minHeight: "calc(100vh - 93px)" }}>
      <Text fontSize="40px">{news?.title}</Text>
      <div className={styles.contentWrapper}>
        <div dangerouslySetInnerHTML={{ __html: news?.content }} />
      </div>
    </Container>
  );
}
