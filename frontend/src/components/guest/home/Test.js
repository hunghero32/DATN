import React, { useState } from "react";

const BookingUI = () => {
  const [selectedDate, setSelectedDate] = useState("Thứ 4 - 26/3");

  return (
    <div className="max-w-4xl mx-auto bg-white p-4 shadow-md rounded-lg">
      <div className="flex gap-4">
        {/* Doctor Info */}
        <div className="w-1/3 p-4 border-r">
          <img
            src="https://via.placeholder.com/100"
            alt="Doctor"
            className="w-20 h-20 rounded-full mb-2"
          />
          <span className="bg-yellow-400 text-white text-xs px-2 py-1 rounded">
            Yêu thích
          </span>
          <h2 className="text-blue-600 font-bold mt-2">PGS. TS. BSCKII. TTUT Vũ Văn Hòa</h2>
          <p className="text-sm text-gray-600">Bác sĩ có 35 năm kinh nghiệm về cột sống, thần kinh, cơ xương khớp.</p>
          <p className="text-sm text-gray-600">Hà Nội</p>
        </div>
        {/* Booking Info */}
        <div className="w-2/3 p-4">
          <label className="block text-lg font-semibold mb-2">Chọn ngày khám:</label>
          <select
            className="w-full p-2 border rounded mb-3"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option>Thứ 2 - 24/3</option>
            <option>Thứ 3 - 25/3</option>
            <option>Thứ 4 - 26/3</option>
            <option>Thứ 5 - 27/3</option>
          </select>
          <div className="grid grid-cols-3 gap-2 my-3">
            {["09:00 - 09:30", "09:30 - 10:00", "10:00 - 10:30", "10:30 - 11:00", "11:00 - 11:30", "11:30 - 12:00", "13:30 - 14:00", "14:00 - 14:30", "14:30 - 15:00", "15:00 - 15:30", "15:30 - 16:00"].map((time, index) => (
              <button key={index} className="border p-2 rounded hover:bg-blue-100">
                {time}
              </button>
            ))}
          </div>
          <p className="text-gray-600">Phòng khám SpineTech Clinic</p>
          <p className="text-gray-600">Tòa nhà GP, 257 Giải Phóng, Phương Mai, Đống Đa, Hà Nội</p>
          <p className="text-gray-600">Giá khám: 500.000đ</p>
        </div>
      </div>
    </div>
  );
};

export default BookingUI;