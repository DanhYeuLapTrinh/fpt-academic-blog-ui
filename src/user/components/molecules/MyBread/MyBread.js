import { Breadcrumbs } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { toSlug } from "../../../utils/StringMethod";
import Text from "../../atoms/Text/Text";

export default function MyBread(props) {
  return (
    <>
      {props.input && (
        <Breadcrumbs sx={{ mt: 3 }} separator={props?.separator}>
          <Link
            to={`/categories/${props.input[0].categoryId}`}
            style={{ textDecoration: "none" }}
          >
            <Text fontSize="12px" fontWeight="600" color="primary.main">
              {props.input[0].categoryName}
            </Text>
          </Link>
          <Link
            to={`/categories/${props.input[2].categoryId}`}
            style={{ textDecoration: "none" }}
          >
            <Text fontSize="12px" fontWeight="600" color="primary.main">
              {props.input[2].categoryName}
            </Text>
          </Link>
          <Link to={`/tags/${props.tag.id}`} style={{ textDecoration: "none" }}>
            <Text fontSize="12px" fontWeight="600" color="primary.main">
              {props.tag.tagName}
            </Text>
          </Link>
        </Breadcrumbs>
      )}
    </>
  );
}
