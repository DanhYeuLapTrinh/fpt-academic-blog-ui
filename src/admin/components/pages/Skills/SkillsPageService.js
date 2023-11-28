import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import { useSkillsContext } from "../../../context/SkillsContext";
import SkillsPageHandle from "./SkillsPageHandle";
function SkillsPageService() {
  const axiosPrivate = useAxiosPrivate();

  const { skillsData, setSkillsData } = useSkillsContext();

  const fetchData = async () => {
    try {
      const res = await axiosPrivate.get(
        process.env.REACT_APP_VIEW_SKILLS_LIST
      );
      setSkillsData(res.data);
    } catch (error) {
      if (error.request) {
        console.log("Server không phản hồi");
      } else {
        console.log(error);
      }
    }
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
