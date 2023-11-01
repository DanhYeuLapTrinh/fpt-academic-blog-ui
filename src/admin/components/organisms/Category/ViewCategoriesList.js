import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
function ViewCategoriesList({
  categories,
  selectedCategory,
  selectedSemester,
  selectedSubject,
  selectedCategoryObj,
  selectedRadioCategory,
  selectedRadioSubject,
  handleSelectCategory,
  handleSelectSemester,
  handleRadioCategoryChange,
  handleRadioSubjectChange,
  openDeleteModal,
  openDeleteSubjectModal,
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-1">
        <h3 className="font-semibold text-lg mb-2">Chuyên ngành</h3>
        <ul>
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <input
                  className="mr-3"
                  type="radio"
                  name="categoryRadio"
                  disabled={!selectedCategory}
                  checked={selectedRadioCategory === category.id}
                  onChange={() => handleRadioCategoryChange(category)}
                />
                <li
                  key={category.id}
                  onClick={() => handleSelectCategory(category)}
                  className={`cursor-pointer text-lg ${
                    selectedCategory && selectedCategory.id === category.id
                      ? "bg-blue-300 rounded-lg text-center"
                      : "text-black"
                  }`}
                >
                  {category.categoryName}
                </li>
              </div>
              {selectedRadioCategory === category.id && (
                <DeleteIcon
                  onClick={() => openDeleteModal(category)}
                  className="cursor-pointer text-red-600"
                />
              )}
            </div>
          ))}
        </ul>
      </div>

      <div className="col-span-1">
        <h3 className="font-semibold text-lg mb-2">Học kỳ</h3>
        <ul>
          {selectedCategory &&
            selectedCategory.childCategories.map((semester) => (
              <li
                key={semester.id}
                onClick={() => handleSelectSemester(semester)}
                className={`cursor-pointer text-lg ${
                  selectedSemester && selectedSemester.id === semester.id
                    ? "bg-blue-300 w-1/6 rounded-lg text-center"
                    : "text-black"
                }`}
              >
                {semester.categoryName}
              </li>
            ))}
        </ul>
      </div>

      <div className="col-span-1">
        <h3 className="font-semibold text-lg mb-2">Môn học</h3>
        <ul>
          {selectedSemester &&
            selectedSemester.childCategories.map((subject) => (
              <div key={subject.id} className="flex items-center mb-2">
                <input
                  className="mr-3"
                  type="radio"
                  name="subjectRadio"
                  disabled={!selectedSemester}
                  checked={selectedRadioSubject === subject.id}
                  onChange={() => handleRadioSubjectChange(subject)}
                />
                <li className="text-lg text-black flex-grow">
                  {subject.categoryName}
                </li>
                {selectedRadioSubject === subject.id && (
                  <DeleteIcon
                    onClick={() => openDeleteSubjectModal(subject)}
                    className="cursor-pointer text-red-600"
                  />
                )}
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default ViewCategoriesList;
