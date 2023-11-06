import { Breadcrumbs } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { toSlug } from "../../../utils/StringMethod";
import Text from "../../atoms/Text/Text";

export default function MyBread(props) {
  console.log(props.input[0].categoryId);
  console.log(props.input[0].categoryName);
  console.log(props.tag.tagName);
  return (
    <>
      {props.input && (
        <Breadcrumbs sx={{ mt: 3 }} separator={props?.separator}>
          <Link
            to={`/topics/${props.input[0].categoryId}`}
            style={{ textDecoration: "none" }}
          >
            <Text fontSize="12px" fontWeight="600" color="primary.main">
              {props.input[0].categoryName}
            </Text>
          </Link>
          <Link
            to={`/topics/${props.input[2].categoryId}`}
            style={{ textDecoration: "none" }}
          >
            <Text fontSize="12px" fontWeight="600" color="primary.main">
              {props.input[2].categoryName}
            </Text>
          </Link>
          <Link to={`/tag/${props.tag.id}`} style={{ textDecoration: "none" }}>
            <Text fontSize="12px" fontWeight="600" color="primary.main">
              {props.tag.tagName}
            </Text>
          </Link>
        </Breadcrumbs>
      )}
    </>
  );
}
