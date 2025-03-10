import React, { useEffect, useState } from "react";
import api from "../../../ultils/api/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const TopBookedServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false); // Trạng thái hiển thị tất cả dịch vụ

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("api/client/home");
        console.log(" API trả về:", response.data);
        console.log(" popular_services:", response.data?.popular_services);

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

      {/* Slider hiển thị dịch vụ */}
      {!showAll ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 }
          }}
          modules={[Navigation]}
          className="my-6"
        >
          {services.length > 0 ? (
            services.map((service) => (
              <SwiperSlide key={service.id}>
                <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center hover:scale-105 transition-transform">
                  <img
                    src={service.image || "https://via.placeholder.com/100"}
                    alt={service.services_name}
                    className="w-20 h-20 object-cover rounded-full mb-2"
                  />
                  <h3 className="text-md font-semibold text-gray-800">{service.services_name}</h3>
                  <p className="text-gray-500 text-sm">📅 {service.bookings_count} Booking</p>
                  <p className="text-gray-500 text-sm">💰 Giá: {service.price} VNĐ</p>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <p className="text-gray-500">Không có dịch vụ nào.</p>
          )}
        </Swiper>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.length > 0 ? (
            services.map((service) => (
              <div key={service.id} className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center hover:scale-105 transition-transform">
                <img
                  src={service.image || "https://via.placeholder.com/100"}
                  alt={service.services_name}
                  className="w-20 h-20 object-cover rounded-full mb-2"
                />
                <h3 className="text-md font-semibold text-gray-800">{service.services_name}</h3>
                <p className="text-gray-500 text-sm">📅 {service.bookings_count} Booking</p>
                <p className="text-gray-500 text-sm">💰 Giá: {service.price} VNĐ</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Không có dịch vụ nào.</p>
          )}
        </div>
      )}

      {/* Nút "Xem thêm" */}
      <button
        onClick={() => setShowAll(!showAll)}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {showAll ? "Ẩn bớt" : "Xem tất cả"}
      </button>
    </div>
  );
};

export default TopBookedServices;
