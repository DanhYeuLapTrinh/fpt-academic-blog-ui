import React, { createContext, useContext, useEffect, useState } from "react";

const ReportedProfileContext = createContext();

export const useReportedProfileContext = () => {
  return useContext(ReportedProfileContext);
};

export const ReportedProfileProvider = ({ children }) => {
  const [reportedProfiles, setReportedProfiles] = useState(
    JSON.parse(localStorage.getItem("reportedProfiles")) || {}
  ); //Đây là List hồ sơ bị báo cáo

  useEffect(() => {
    localStorage.setItem("reportedProfiles", JSON.stringify(reportedProfiles));
  }, [reportedProfiles]);

  const [reportedProfile, setReportedProfile] = useState({}); //Đây là chi tiết hồ sơ bị báo cáo

  const [profileFound, setProfileFound] = useState(true);

  return (
    <ReportedProfileContext.Provider
      value={{
        reportedProfiles,
        setReportedProfiles,
        reportedProfile,
        setReportedProfile,
        profileFound,
        setProfileFound,
      }}
    >
      {children}
    </ReportedProfileContext.Provider>
  );
};
