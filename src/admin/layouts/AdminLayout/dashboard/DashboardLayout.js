import { useState } from "react";
import { Outlet } from "react-router-dom";

import { styled } from "@mui/material/styles";

import Header from "./header";
import Nav from "./nav";
import ThemeProvider from "../../../components/theme";
import { NewsProvider } from "../../../context/NewsContext";
import { UserProvider } from "../../../context/UserContext";
import { ReportedProfileProvider } from "../../../context/ReportedProfileContext";
import { TagsProvider } from "../../../context/TagsContext";
import { CategoriesProvider } from "../../../context/CategoriesContext";
import { SkillsProvider } from "../../../context/SkillsContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import enGB from "date-fns/locale/en-GB";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
      <UserProvider>
        <CategoriesProvider>
          <TagsProvider>
            <ReportedProfileProvider>
              <NewsProvider>
                <SkillsProvider>
                  <ThemeProvider>
                    <StyledRoot>
                      <Header onOpenNav={() => setOpen(true)} />

                      <Nav openNav={open} onCloseNav={() => setOpen(false)} />

                      <Main>
                        <Outlet />
                      </Main>
                    </StyledRoot>
                  </ThemeProvider>
                </SkillsProvider>
              </NewsProvider>
            </ReportedProfileProvider>
          </TagsProvider>
        </CategoriesProvider>
      </UserProvider>
    </LocalizationProvider>
  );
}
