import React from "react";

const topServices = [
  {
    name: "Khám Nội tổng quát",
    bookings: 350,
    image: "https://picsum.photos/100/100?random=1",
    features: ["Bác sĩ chuyên môn cao", "Kiểm tra toàn diện", "Chẩn đoán chính xác"],
    link: "#",
  },
  {
    name: "Khám Da liễu",
    bookings: 290,
    image: "https://picsum.photos/100/100?random=2",
    features: ["Trị mụn", "Xóa nám, tàn nhang", "Chăm sóc da chuyên sâu"],
    link: "#",
  },
  {
    name: "Khám Nha khoa",
    bookings: 270,
    image: "https://picsum.photos/100/100?random=3",
    features: ["Niềng răng", "Làm răng sứ", "Tẩy trắng răng"],
    link: "#",
  },
  {
    name: "Khám Sản - Phụ khoa",
    bookings: 250,
    image: "https://picsum.photos/100/100?random=4",
    features: ["Khám thai", "Siêu âm thai kỳ", "Tư vấn sức khỏe sinh sản"],
    link: "#",
  },
];

const TopBookedServices = () => {
  return (
    <div className="container mx-auto p-6 text-center">
          <h2 className="text-4xl font-bold text-blue-600">🔥 Dịch Vụ Được Đặt Nhiều Nhất</h2><br/>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {topServices.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-4 flex items-center hover:scale-105 transition-transform"
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-16 h-16 object-cover rounded-full mr-4"
            />
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-800">{service.name}</h3>
              <p className="text-gray-500 text-sm">📅 {service.bookings} Booking</p>
              <ul className="text-gray-500 text-sm list-disc ml-4 mt-1">
                {service.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBookedServices;