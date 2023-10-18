import React from "react";

function CateList() {
  return (
    <div className="m-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">All Categories</h2>
      </div>

      <div className="bg-white shadow overflow-x-auto rounded-xl">
        <div className="w-full border">
          <div className="w-full h-[600px] relative">
            <button className="absolute w-[200px] h-[80px] top-[32px] left-[32px] bg-[#f1dcdc] rounded-[20px]">
              <div className=" font-semibold ">Kỹ thuật phần mềm</div>
            </button>

            <button className="absolute w-[200px] h-[80px] top-[32px] left-[260px] bg-[#e9deb4] rounded-[20px]">
              <div className=" font-semibold ">Quản trị kinh doanh</div>
            </button>

            <button className="absolute w-[200px] h-[80px] top-[32px] left-[488px] bg-[#eceea1] rounded-[20px]">
              <div className=" font-semibold ">Trí tuệ nhân tạo</div>
            </button>

            <button className="absolute w-[200px] h-[80px] top-[140px] left-[32px] bg-[#b1f37d] rounded-[20px]">
              <div className=" font-semibold ">Ngôn ngữ Nhật</div>
            </button>

            <button className="absolute w-[200px] h-[80px] top-[140px] left-[260px] bg-[#7fffaa] rounded-[20px]">
              <div className=" font-semibold ">An toàn thông tin</div>
            </button>

            <button className="absolute w-[200px] h-[80px] top-[140px] left-[488px] bg-[#72f0ca] rounded-[20px]">
              <div className=" font-semibold ">Vi mạch bán dẫn</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CateList;
