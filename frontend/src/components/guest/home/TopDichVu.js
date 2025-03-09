import React, { useEffect, useState } from "react";
import api from "../../../ultils/api/axios"; // Import API

const TopBookedServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("api/client/home");
        console.log(" API trả về:", response.data);
        console.log(" popular_services:", response.data?.popular_services);
  
        // Kiểm tra nếu API trả về dữ liệu hợp lệ
        if (response.data && Array.isArray(response.data.popular_services)) {
          setServices(response.data.popular_services);
        } else {
          console.error("⚠️ Không tìm thấy popular_services hoặc dữ liệu không hợp lệ");
          setServices([]); 
        }
      } catch (error) {
        console.error(" Lỗi tải API:", error);
        setError("Không thể tải danh sách dịch vụ.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchServices();
  }, []);
  

  if (loading) return <p className="text-center text-gray-500">Đang tải danh sách dịch vụ...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6 text-center">
      <h2 className="text-4xl font-bold text-blue-600">🔥 Dịch Vụ Được Đặt Nhiều Nhất</h2><br />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {services.length > 0 ? (
          services.map((service) => (
            <div
              key={service.id}
              className="bg-white shadow-lg rounded-xl p-4 flex items-center hover:scale-105 transition-transform"
            >
              <img
                src={service.image || "https://via.placeholder.com/100"} 
                alt={service.services_name}
                className="w-16 h-16 object-cover rounded-full mr-4"
              />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-800">{service.services_name}</h3>
                <p className="text-gray-500 text-sm">📅 {service.bookings_count} Booking</p>
                <p className="text-gray-500 text-sm">💰 Giá: {service.price} VNĐ</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Không có dịch vụ nào.</p>
        )}
      </div>
    </div>
  );
};

export default TopBookedServices;
