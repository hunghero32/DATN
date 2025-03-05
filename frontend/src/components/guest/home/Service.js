import React from "react";
import { useNavigate } from "react-router-dom";

// Dữ liệu về các dịch vụ
const services = [
  {
    title: "Khám Chuyên khoa",
    description: "Khám các bệnh lý chuyên khoa.",
    icon: "https://via.placeholder.com/40", // Hình ảnh biểu tượng
    id: 1, // ID cho dịch vụ
  },
  {
    title: "Khám tổng quát",
    description: "Khám sức khỏe tổng quát định kỳ.",
    icon: "https://via.placeholder.com/40",
    id: 2,
  },
  {
    title: "Khám từ xa",
    description: "Dịch vụ khám bệnh trực tuyến qua điện thoại.",
    icon: "https://via.placeholder.com/40",
    id: 3,
  },
  {
    title: "Xét nghiệm y học",
    description: "Các xét nghiệm y học cần thiết.",
    icon: "https://via.placeholder.com/40",
    id: 4,
  },
  {
    title: "Khám nha khoa",
    description: "Khám và điều trị các vấn đề về răng miệng.",
    icon: "https://via.placeholder.com/40",
    id: 5,
  },
  {
    title: "Khám tim mạch",
    description: "Khám và kiểm tra sức khỏe tim mạch.",
    icon: "https://via.placeholder.com/40",
    id: 6,
  },
];

const Services = () => {
  const navigate = useNavigate();

  // Chuyển hướng đến trang đặt lịch
  const handleServiceClick = (serviceId) => {
    navigate(`/booking/${serviceId}`);
  };

  return (
    <main className="container mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold">Các Dịch Vụ Khám Bệnh Của Chúng Tôi</h2>
        <p className="text-gray-600">Chúng tôi cung cấp các dịch vụ khám bệnh uy tín và chất lượng</p>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center p-6 cursor-pointer hover:shadow-xl transition-shadow duration-300"
            onClick={() => handleServiceClick(service.id)}
          >
            <img src={service.icon} alt={service.title} className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600 text-center">{service.description}</p>
            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition">
              Xem chi tiết
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Services;
