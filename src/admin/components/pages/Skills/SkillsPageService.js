import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import SkillsPageHandle from "./SkillsPageHandle";
function SkillsPageService() {
  const axiosPrivate = useAxiosPrivate();

  const [skillsData, setSkillsData] = useState([]);

  const fetchData = async () => {
    const res = await axiosPrivate.get(process.env.REACT_APP_VIEW_SKILLS_LIST);
    setSkillsData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SkillsPageHandle
      skillsData={skillsData}
      setSkillsData={setSkillsData}
      fetchData={fetchData}
    />
  );
}

export default SkillsPageService;
