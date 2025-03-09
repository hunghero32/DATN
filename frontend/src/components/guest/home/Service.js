import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const services = [
  { title: "Khám Chuyên khoa", description: "Khám các bệnh lý chuyên khoa.", icon: "https://via.placeholder.com/100", id: 1 },
  { title: "Khám tổng quát", description: "Khám sức khỏe tổng quát định kỳ.", icon: "https://via.placeholder.com/100", id: 2 },
  { title: "Khám từ xa", description: "Dịch vụ khám bệnh trực tuyến qua điện thoại.", icon: "https://via.placeholder.com/100", id: 3 },
  { title: "Xét nghiệm y học", description: "Các xét nghiệm y học cần thiết.", icon: "https://via.placeholder.com/100", id: 4 },
];

const Services = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="container mx-auto px-6 text-center">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Dịch Vụ Phòng Khám Hiện Đại</h2>
        <p className="text-gray-600">Tìm kiếm và chọn dịch vụ phù hợp với bạn</p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-lg mx-auto mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
        <input
          type="text"
          placeholder="Tìm kiếm dịch vụ..."
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Service Grid - Hiển thị đúng 4 cột */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center w-full px-6">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <div
              key={service.id}
              className="w-[250px] h-[380px] flex flex-col justify-between p-6 bg-white shadow-md rounded-lg border border-gray-200 hover:bg-blue-50"
              onClick={() => navigate(`/booking/${service.id}`)}
            >
              <img src={service.icon} alt={service.title} className="w-20 h-20 object-cover mx-auto" />
              <h3 className="text-base font-medium text-blue-800">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
              <button className="mt-auto bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition">
                Đặt lịch ngay
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">Không tìm thấy dịch vụ phù hợp.</p>
        )}
      </div>
    </main>
  );
};

export default Services;
 