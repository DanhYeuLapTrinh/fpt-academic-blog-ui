import { IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
export default function BackToTopButton() {
  const [isBackToTop, setIsBackToTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setIsBackToTop(true);
      } else {
        setIsBackToTop(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      {isBackToTop && (
        <Tooltip title="Cuộn lên đầu trang" placement="top">
          <IconButton
            onClick={scrollUp}
            disableFocusRipple
            disableRipple
            disableTouchRipple
            sx={{
              position: "fixed",
              right: "3%",
              top: "90%",
              bgcolor: "primary.main",
              width: "50px",
              height: "50px"
            }}
          >
            <Icon
              icon="basil:arrow-up-solid"
              color="white"
              width="30"
              height="30"
            />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
}
