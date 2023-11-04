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
            key={props.input[0]}
            to={`/${toSlug(props.input[0], true)}`}
            style={{ textDecoration: "none" }}
          >
            <Text fontSize="12px" fontWeight="600" color="primary.main">
              {props.input[0]}
            </Text>
          </Link>
          <Link
            key={props.input[2]}
            to={`/${toSlug(props.input[2], true)}`}
            style={{ textDecoration: "none" }}
          >
            <Text fontSize="12px" fontWeight="600" color="primary.main">
              {props.input[2]}
            </Text>
          </Link>
          <Link
            key={props.input[1]}
            to={`/${toSlug(props.input[1], true)}`}
            style={{ textDecoration: "none" }}
          >
            <Text fontSize="12px" fontWeight="600" color="primary.main">
              {props.input[1]}
            </Text>
          </Link>
        </Breadcrumbs>
      )}
    </>
  );
}
