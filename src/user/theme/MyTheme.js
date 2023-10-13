import { createTheme } from "@mui/material";

const MyTheme = createTheme({
  palette: {
    primary: {
      main: "#5927e5", // purple
    },
    secondary: {
      main: "#ffffff", // white
      alt: "#f7f9fc", // little off-white
    },
    text: {
      main: "#444746", // xám đậm
    },
    middleText: {
      main: "#757575", // xám nhạt tí
    },
    lightText: {
      main: "#c3c3c3", // xám nhạt nhất
    },
  },
});

export { MyTheme };
