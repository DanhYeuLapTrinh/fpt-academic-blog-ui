import {
  Box,
  ImageList,
  ImageListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import HeaderContentDetail from "../HeaderContentDetail";
import React from "react";

function BodyContent(props) {
  return (
    <Stack sx={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Paper
        sx={{
          backgroundColor: "rgb(255, 255, 255)",
          color: "rgb(33, 43, 54)",
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          backgroundImage: "none",
          overflow: "hidden",
          position: "relative",
          boxShadow:
            "0px 0px 2px 0px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
          borderRadius: "16px",
          zIndex: 0,
        }}
      >
        <HeaderContentDetail fullName={props.props.fullName} />
        <div>
          <Typography
            sx={{
              margin: 0,
              lineHeight: 1.57143,
              fontSize: "0.875rem",
              fontFamily: "Public Sans, sans-serif",
              fontWeight: 400,
              paddingLeft: "24px",
            }}
          >
            The sun slowly set over the horizon, painting the sky in vibrant
            hues of orange and pink.
          </Typography>

          <Box sx={{ padding: 2 }}>
            <ImageList
              sx={{
                overflow: "hidden",
                position: "relative",
                verticalAlign: "bottom",
                display: "inline-block",
                width: "100%",
                borderRadius: 5,
              }}
            >
              <ImageListItem
                sx={{
                  width: "100%",
                  height: "100%",
                  verticalAlign: "bottom",
                  paddingTop: "56,25%",
                  backgroundSize: "cover !important",
                }}
              >
                <img
                  className="MuiImageListItem-img"
                  alt="coverURL"
                  src="https://img.freepik.com/free-vector/set-torii-gates-water_52683-44986.jpg?w=1060&t=st=1699465788~exp=1699466388~hmac=9ca802d77875b0bfbeb1e6937cf4b75ad2ba5621016e064c633ea5798d83a8a0"
                />
              </ImageListItem>
            </ImageList>
          </Box>
        </div>
      </Paper>
    </Stack>
  );
}

export default BodyContent;
