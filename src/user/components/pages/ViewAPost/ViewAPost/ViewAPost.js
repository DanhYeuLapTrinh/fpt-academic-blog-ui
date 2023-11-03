import React from "react";
import styles from "./Styles.module.scss";
import Text from "../../../atoms/Text/Text";
import { Container } from "@mui/material";
export default function ViewAPost(props) {
  return (
    <Container>
      <div className={styles.contentWrapper}>
        <Text>
          <h1 style={{ fontSize: "40px", lineHeight: "50px" }}>
            {props.data?.title}
          </h1>
        </Text>
        <img style={{ margin: "10px 0 40px" }} src={props.data?.coverURL} />
        <div dangerouslySetInnerHTML={{ __html: props.data?.content }} />
      </div>
    </Container>
  );
}
