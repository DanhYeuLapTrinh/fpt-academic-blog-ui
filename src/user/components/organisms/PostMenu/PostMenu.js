import { Box, Stack } from "@mui/material";
import React from "react";
import Text from "../../atoms/Text/Text";
import { Icon } from "@iconify/react";

export default function PostMenu({ menu }) {
  const headings = [...menu.querySelectorAll("h2")];
  return (
    <>
      {headings.length > 0 && (
        <Stack
          sx={{
            bgcolor: "secondary.alt",
            p: 3,
            borderRadius: "10px",
            m: "20px 0",
          }}
          spacing={1}
        >
          <Text fontSize="24px" fontWeight="600">Đề mục</Text>
          {headings.map((heading) => (
            <Stack direction={"row"} alignItems={"center"} spacing={"12px"}>
              <Text fontSize="18px" color="primary.main">
                <a
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                  href={"#" + heading.id}
                >
                  {heading.textContent}
                </a>
              </Text>
              <Icon
                icon="fe:arrow-left"
                width={"18"}
                rotate={2}
                color="#5927e5"
              />
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
}
