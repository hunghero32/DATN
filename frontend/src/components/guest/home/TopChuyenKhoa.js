import React from "react";

const specialties = [
  {
    name: "Chuyên khoa Nội tổng quát",
    servicesCount: 35,
    image: "https://picsum.photos/400/250?random=1",
    services: ["Khám nội khoa", "Khám tim mạch", "Khám hô hấp", "Khám tiêu hóa"],
    link: "#",
  },
  {
    name: "Chuyên khoa Da liễu",
    servicesCount: 28,
    image: "https://picsum.photos/400/250?random=2",
    services: ["Trị mụn", "Điều trị nám", "Tắm trắng", "Chăm sóc da"],
    link: "#",
  },
  {
    name: "Chuyên khoa Nha khoa",
    servicesCount: 25,
    image: "https://picsum.photos/400/250?random=3",
    services: ["Niềng răng", "Làm răng sứ", "Cạo vôi răng", "Trồng răng implant"],
    link: "#",
  },
  {
    name: "Chuyên khoa Phẫu thuật thẩm mỹ",
    servicesCount: 22,
    image: "https://picsum.photos/400/250?random=4",
    services: ["Nâng mũi", "Căng da mặt", "Hút mỡ bụng", "Nâng ngực"],
    link: "#",
  },
];

const TopSpecialties = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-blue-600">💡 Chuyên Khoa Nổi Bật</h2>
        <p className="text-lg text-gray-500 mt-2">Các chuyên khoa có số lượng dịch vụ nhiều nhất</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {specialties.map((specialty, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={specialty.image}
              alt={specialty.name}
              className="w-full h-56 object-cover"
            />
            
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800">{specialty.name}</h3>
              <p className="text-gray-600 mt-2">
                📌 Số lượng dịch vụ: <span className="font-bold">{specialty.servicesCount}</span>
              </p>
              <ul className="text-gray-500 text-sm list-disc ml-4 mt-2">
                {specialty.services.map((service, i) => (
                  <li key={i}>{service}</li>
                ))}
              </ul>

              {/* Nút Xem chi tiết */}
              <a
                href={specialty.link}
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

export default TopSpecialties;
