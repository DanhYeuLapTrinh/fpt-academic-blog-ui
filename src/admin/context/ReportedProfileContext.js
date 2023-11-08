import { createContext, useContext, useEffect, useState } from "react";

const ReportedProfileContext = createContext();

export const useReportedProfileContext = () => {
  return useContext(ReportedProfileContext);
};

export const ReportedProfileProvider = ({ children }) => {
  const [reportedProfiles, setReportedProfiles] = useState(
    JSON.parse(localStorage.getItem("reportedProfiles")) || {}
  );

  useEffect(() => {
    localStorage.setItem("reportedProfiles", JSON.stringify(reportedProfiles));
  }, [reportedProfiles]);

  return (
    <ReportedProfileContext.Provider
      value={{ reportedProfiles, setReportedProfiles }}
    >
      {children}
    </ReportedProfileContext.Provider>
  );
};
