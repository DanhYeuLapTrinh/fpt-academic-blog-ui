import React, { useEffect, useState } from "react";
import ActivityLog from "./ActivityLog";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
function ActivityLogService() {
  const axiosPrivate = useAxiosPrivate();
  const [activityLogData, setActivityLogData] = useState([]);

  const fetchData = async () => {
    const res = await axiosPrivate.get(process.env.REACT_APP_ACTIVITY_LOG);
    setActivityLogData(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <ActivityLog
      activityLogData={activityLogData}
      setActivityLogData={setActivityLogData}
    />
  );
}

export default ActivityLogService;
