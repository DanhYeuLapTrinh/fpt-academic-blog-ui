import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";

function ActivityLogPage() {
  const axiosPrivate = useAxiosPrivate();

  const [activityLogs, setActivityLogs] = useState([]);

  const fetchData = async () => {
    const activityLogsRes = await axiosPrivate.get("admin/dashboard");
    setActivityLogs(activityLogsRes.data);
    console.log(activityLogsRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return <div>ActivityLogPage</div>;
}

export default ActivityLogPage;
