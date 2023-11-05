import React from "react";
import DashboardPage from "../../templates/DashboardPage/DashboardPage";
import ThemeProvider from "../../theme";
function Welcome() {
  return (
    <ThemeProvider>
      <DashboardPage />
    </ThemeProvider>
  );
}

export default Welcome;
