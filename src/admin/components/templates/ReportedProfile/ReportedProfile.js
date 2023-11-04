import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
function ReportedProfile() {
  const axiosPrivate = useAxiosPrivate();

  const [reportedProfiles, setReportedProfiles] = useState([]);

  // const fetchData = async () => {
  //   const body = {
  //     userId: "",
  //   };
  //   const reportedProfilesRes = await axiosPrivate.get("/profile/view", {
  //     body,
  //   });
  //   setReportedProfiles(reportedProfilesRes.data);
  //   console.log(reportedProfilesRes.data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return <div>This is Report Profile</div>;
}

export default ReportedProfile;
