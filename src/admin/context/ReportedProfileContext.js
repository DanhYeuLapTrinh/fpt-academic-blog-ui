import React, { createContext, useContext, useEffect, useState } from "react";

const ReportedProfileContext = createContext();

export const useReportedProfileContext = () => {
  return useContext(ReportedProfileContext);
};

export const ReportedProfileProvider = ({ children }) => {
  const [reportedProfile, setReportedProfile] = useState(
    JSON.parse(localStorage.getItem("reportedProfile")) || {}
  );

  useEffect(() => {
    localStorage.setItem("reportedProfile", JSON.stringify(reportedProfile));
  }, [reportedProfile]);

  return (
    <ReportedProfileContext.Provider
      value={{ reportedProfile, setReportedProfile }}
    >
      {children}
    </ReportedProfileContext.Provider>
  );
};
