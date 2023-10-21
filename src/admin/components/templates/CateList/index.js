import React, { useState, useEffect } from "react";
import { axiosConfig } from "../../../api/axios";
import useAuth from "../../../../user/hooks/useAuth";

function CateList() {
  const { auth } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [majors, setMajors] = useState([]);
  const [categories, setCategories] = useState([]);

  const headers = {
    Authorization: `Bearer ${auth.token}`,
  };

  useEffect(() => {
    // Tải dữ liệu từ API majors
    axiosConfig
      .get("admin/majors", { headers })
      .then((response) => {
        setMajors(response.data);
      })
      .catch((error) => {
        console.error("Error loading majors data:", error);
      });

    // Tải dữ liệu từ API categories
    axiosConfig
      .get("admin/categories", { headers })
      .then((response) => {
        const categoriesData = response.data;

        // Lọc và sắp xếp categoriesData dựa trên majorName trong majors
        const filteredCategories = majors.map((major) => {
          return {
            majorName: major.majorName,
            categories: categoriesData.filter(
              (category) => category.majorName === major.majorName
            ),
          };
        });

        setCategories(filteredCategories);
      })
      .catch((error) => {
        console.error("Error loading categories data:", error);
      });
  }, [majors]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSemester(null);
  };

  const handleSemesterClick = (semester) => {
    setSelectedSemester(semester);
  };

  return (
    <div>
      {categories.map((majorCategory) => (
        <div
          key={majorCategory.majorName}
          className="border rounded-md p-6 shadow-lg mb-4"
        >
          <h1 className="text-2xl font-semibold mb-4">
            {majorCategory.majorName}
          </h1>
          <div className="flex space-x-4">
            <div className="w-1/3 p-4 border rounded-md shadow-md">
              <h2 className="text-lg font-semibold mb-2">Chuyên ngành</h2>
              <ul>
                {majorCategory.categories.map((category) => (
                  <li
                    key={category.id}
                    className={`cursor-pointer ${
                      selectedCategory?.id === category.id
                        ? "font-bold text-blue-500"
                        : ""
                    }`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category.categoryName}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-1/3 p-4 border rounded-md shadow-md">
              {selectedCategory && (
                <div>
                  <h2 className="text-lg font-semibold mb-2">Học kỳ</h2>
                  <ul>
                    {selectedCategory.childCategories.map((semester) => (
                      <li
                        key={semester.id}
                        className={`cursor-pointer ${
                          selectedSemester?.id === semester.id
                            ? "font-bold text-blue-500"
                            : ""
                        }`}
                        onClick={() => handleSemesterClick(semester)}
                      >
                        {semester.categoryName}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="w-1/3 p-4 border rounded-md shadow-md">
              {selectedSemester && (
                <div>
                  <h2 className="text-lg font-semibold mb-2">Môn học</h2>
                  <ul>
                    {selectedSemester.childCategories.map((course) => (
                      <li key={course.id}>{course.categoryName}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CateList;
