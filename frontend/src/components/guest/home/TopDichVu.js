import React from "react";

const topServices = [
  {
    name: "Khám Nội tổng quát",
    bookings: 350,
    image: "https://picsum.photos/400/250?random=1",
    features: ["Bác sĩ chuyên môn cao", "Kiểm tra toàn diện", "Chẩn đoán chính xác"],
    link: "#",
  },
  {
    name: "Khám Da liễu",
    bookings: 290,
    image: "https://picsum.photos/400/250?random=2",
    features: ["Trị mụn", "Xóa nám, tàn nhang", "Chăm sóc da chuyên sâu"],
    link: "#",
  },
  {
    name: "Khám Nha khoa",
    bookings: 270,
    image: "https://picsum.photos/400/250?random=3",
    features: ["Niềng răng", "Làm răng sứ", "Tẩy trắng răng"],
    link: "#",
  },
  {
    name: "Khám Sản - Phụ khoa",
    bookings: 250,
    image: "https://picsum.photos/400/250?random=4",
    features: ["Khám thai", "Siêu âm thai kỳ", "Tư vấn sức khỏe sinh sản"],
    link: "#",
  },
];

const TopBookedServices = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-blue-600">🔥 Dịch Vụ Được Đặt Nhiều Nhất</h2>
        <p className="text-lg text-gray-500 mt-2">Danh sách các dịch vụ được khách hàng lựa chọn nhiều nhất trong tháng</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {topServices.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-xl rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 relative"
          >
            <div className="relative">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-56 object-cover rounded-t-xl"
              />
              <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm px-4 py-1 rounded-full shadow-md">
                📅 {service.bookings} Booking
              </div>
            </div>
            
            {/* Nội dung dịch vụ */}
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800">{service.name}</h3>
              <ul className="text-gray-500 text-sm list-disc ml-4 mt-2">
                {service.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>

              {/* Nút Xem chi tiết */}
              <a
                href={service.link}
                className="block text-center bg-blue-600 text-white font-semibold py-2 px-4 mt-4 rounded-lg hover:bg-blue-700 transition"
              >
                Xem chi tiết →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBookedServices;
