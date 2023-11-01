import React from "react";

function DeleteSubjectPopup({handleDeleteSubject, closeDeleteSubjectModal}) {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md">
        <p className="text-lg font-semibold mb-4 text-center">
          Bạn có chắc chắn muốn xóa môn học này?
        </p>
        <div className="text-center">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleDeleteSubject}
          >
            Đồng ý
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={closeDeleteSubjectModal}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteSubjectPopup;
