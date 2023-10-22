import React, { useState, useEffect } from "react";
import { axiosConfig } from "../../../api/axios";
import useAuth from "../../../../user/hooks/useAuth";

function MajorListPopup({ onClose, onSelectMajor }) {
  const [majorList, setMajorList] = useState([]);

  const { auth } = useAuth();

  const headers = {
    Authorization: `Bearer ${auth.token}`,
  };

  useEffect(() => {
    axiosConfig.get("admin/majors", { headers }).then((res) => {
      setMajorList(res.data);
    });
  }, []);

  return (
    <div className="major-list-popup">
      <h2>Select a major:</h2>
      <ul>
        {majorList.map((major) => (
          <li key={major.id} onClick={() => onSelectMajor(major.majorName)}>
            {major.majorName}
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default MajorListPopup;
