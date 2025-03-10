import { useState } from "react";

const SpecialtyIntro = () => {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">Cơ Xương Khớp</h2>
      <h3 className="text-lg font-semibold text-gray-700 mt-2">
        Bác sĩ Cơ Xương Khớp giỏi
      </h3>
      <p className="text-gray-600 mt-2">
        Danh sách các bác sĩ uy tín đầu ngành Cơ Xương Khớp tại Việt Nam:
      </p>
      <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
        <li>Các chuyên gia có quá trình đào tạo bài bản, nhiều kinh nghiệm.</li>
        <li>
          Các giáo sư, phó giáo sư đang trực tiếp nghiên cứu và giảng dạy tại Đại học Y khoa Hà Nội.
        </li>
        <li>
          Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu Khoa Cơ Xương Khớp - Bệnh viện Bạch Mai, Bệnh viện Hữu nghị Việt Đức, Bệnh Viện E.
        </li>
      </ul>
      <a href="#" className="text-blue-600 mt-4 inline-block hover:underline">
        Xem thêm
      </a>
    </div>
  );
};

const DoctorCard = () => {
  return (
    <div className="w-full md:w-1/2 p-4 bg-white shadow-lg rounded-lg flex items-center">
      {/* Ảnh bác sĩ */}
      <div className="flex-shrink-0">
        <img
          src="https://via.placeholder.com/80"
          alt="Bác sĩ"
          className="w-20 h-20 rounded-full object-cover"
        />
        <a href="#" className="text-red-500 text-sm mt-2 block hover:underline">
          Xem thêm
        </a>
      </div>

      <div className="ml-4 flex flex-col justify-center">
        <div className="flex items-center space-x-2">
          <span className="bg-yellow-400 text-white px-2 py-1 text-xs font-bold rounded-md">
            Yêu thích
          </span>
          <h3 className="text-blue-900 font-bold text-lg uppercase">
            PGS. TS. BSCKII. TTUT Vũ Văn Hòa
          </h3>
        </div>
        <p className="text-gray-600 text-sm mt-1">
          35 năm kinh nghiệm về Cột sống, thần kinh, cơ xương khớp.
        </p>
        <p className="text-gray-600 text-sm">
          Phó chủ tịch Hội Phẫu thuật Cột sống Việt Nam.
        </p>
        <p className="text-gray-600 text-sm">Nhận khám từ 7 tuổi trở lên.</p>
        <p className="text-red-500 text-sm font-semibold mt-2">📍 Hà Nội</p>
      </div>
    </div>
  );
};

// Component đặt lịch khám
const DoctorBooking = () => {
  const scheduleTimes = [
    "09:00 - 09:30", "09:30 - 10:00", "10:00 - 10:30", "10:30 - 11:00",
    "11:00 - 11:30", "11:30 - 12:00", "13:30 - 14:00", "14:00 - 14:30",
    "14:30 - 15:00", "15:00 - 15:30", "15:30 - 16:00"
  ];

  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <div className="w-full md:w-1/2 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-blue-900 mb-2">Đặt Lịch Khám</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {scheduleTimes.map((time) => (
          <button
            key={time}
            className={`px-3 py-2 rounded-md text-sm transition ${
              selectedTime === time
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
            }`}
            onClick={() => setSelectedTime(time)}
          >
            {time}
          </button>
        ))}
      </div>
      <p className="text-green-600 text-lg font-bold mt-2">500.000đ</p>
      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 transition"
        disabled={!selectedTime}
      >
        {selectedTime ? `Đặt lịch (${selectedTime})` : "Chọn giờ để đặt lịch"}
      </button>
    </div>
  );
};

const Booking = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg">
      <SpecialtyIntro />
      <div className="flex flex-col md:flex-row gap-4 items-center mt-4">
        <DoctorCard />
        <DoctorBooking />
      </div>
    </div>
  );
};

export default Booking;
