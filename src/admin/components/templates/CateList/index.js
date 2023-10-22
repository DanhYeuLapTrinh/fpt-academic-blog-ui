import React, { useState, useEffect } from "react";
import { axiosConfig } from "../../../api/axios";
import useAuth from "../../../../user/hooks/useAuth";

function CateList() {
  const { auth } = useAuth();

  const [majors, setMajors] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);

  const headers = {
    Authorization: `Bearer ${auth.token}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      const majorsRes = await axiosConfig.get("/admin/majors", { headers });
      setMajors(majorsRes.data);

      const categoriesRes = await axiosConfig.get("/categories", {
        headers,
      });
      setCategories(categoriesRes.data);
    };

    fetchData();
  }, []);

  const handleMajorClick = (major) => {
    setSelectedMajor(major);
    setSelectedSemester(null);
  };

  const handleSemesterClick = (semester) => {
    setSelectedSemester(semester);
  };

  return (
    <div className="bg-gray-100 p-8 grid grid-cols-3 gap-6">
      {majors.map((major) => (
        <div key={major.id} className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-4">{major.majorName}</h1>
          <h2 className="text-lg font-semibold mb-2">Chuyên ngành</h2>
          {categories
            .filter((c) => c.majorName === major.majorName)
            .map((specialization) => (
              <div
                key={specialization.id}
                className="cursor-pointer px-3 py-1 rounded bg-blue-500 text-white mb-2"
                onClick={() => handleMajorClick(specialization)}
              >
                {specialization.categoryName}
              </div>
            ))}

          {selectedMajor?.majorName === major.majorName && (
            <>
              <h2 className="text-lg font-semibold mb-2">Học kỳ</h2>
              {selectedMajor.childCategories.map((semester) => (
                <div
                  key={semester.id}
                  className="cursor-pointer px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 mb-2"
                  onClick={() => handleSemesterClick(semester)}
                >
                  {semester.categoryName}
                </div>
              ))}

              {selectedSemester && (
                <div>
                  <h2 className="text-lg font-semibold mb-2">Môn học</h2>
                  <ul className="list-disc pl-5">
                    {selectedSemester.childCategories.map((subject) => (
                      <li key={subject.id} className="text-black text-sm mb-1">
                        {subject.categoryName}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default CateList;
