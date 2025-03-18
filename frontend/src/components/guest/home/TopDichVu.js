import React, { useEffect, useState } from "react";
import api from "../../../ultils/api/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const TopBookedServices = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/api/client/home");
        console.log("🔍 API Response:", response.data);
  
        if (response.data && Array.isArray(response.data.popular_services)) {
          setServices(response.data.popular_services);
        } else {
          console.warn("⚠️ Không tìm thấy popular_services hoặc dữ liệu không hợp lệ", response.data);
          setServices([]);
        }
      } catch (error) {
        console.error("❌ Lỗi tải API:", error);
        setError("Không thể tải danh sách dịch vụ.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchServices();
  }, []);

  // ✅ Điều hướng sang trang chi tiết dịch vụ
  const handleServiceClick = (service) => {
    if (!service || !service.id) {
      console.error("❌ Lỗi: ID dịch vụ không hợp lệ", service);
      return;
    }
    navigate(`/detail-service/${service.id}`);
  };

  if (loading) return <p className="text-center text-gray-500">Đang tải danh sách dịch vụ...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Dịch Vụ Nổi Bật</h2>
        <p className="text-gray-600 mt-2">Các dịch vụ được đặt nhiều nhất tại phòng khám</p>
      </div>

      {/* Slider hiển thị dịch vụ */}
      {!showAll ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
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
                <button
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer w-full"
                  onClick={() => handleServiceClick(service)}
                >
                  <img
                    src={service.image || "https://via.placeholder.com/300x200"}
                    alt={service.services_name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 text-left">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.services_name}</h3>
                    <div className="flex justify-between items-center text-gray-600">
                      <span className="flex items-center">
                        <i className="fas fa-calendar-check mr-2"></i>
                        {service.bookings_count || 0} Lượt đặt
                      </span>
                      <span className="font-medium text-blue-600">
                        {service.price ? service.price.toLocaleString() + " VNĐ" : "Liên hệ"}
                      </span>
                    </div>
                  </div>
                </button>
              </SwiperSlide>
            ))
          ) : (
            <p className="text-gray-500 text-center">Không có dịch vụ nào.</p>
          )}
        </Swiper>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.length > 0 ? (
            services.map((service) => (
              <button
                key={service.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer w-full"
                onClick={() => handleServiceClick(service)}
              >
                <img
                  src={service.image || "https://via.placeholder.com/300x200"}
                  alt={service.services_name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-left">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.services_name}</h3>
                  <div className="flex justify-between items-center text-gray-600">
                    <span className="flex items-center">
                      <i className="fas fa-calendar-check mr-2"></i>
                      {service.bookings_count || 0} Lượt đặt
                    </span>
                    <span className="font-medium text-blue-600">
                      {service.price ? service.price.toLocaleString() + " VNĐ" : "Liên hệ"}
                    </span>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <p className="text-gray-500 text-center">Không có dịch vụ nào.</p>
          )}
        </div>
      )}

      <div className="text-center mt-8">
        <button
          onClick={() => setShowAll(!showAll)}
          className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300 inline-flex items-center"
        >
          {showAll ? "Thu gọn" : "Xem tất cả dịch vụ"}
          <i className={`fas fa-chevron-${showAll ? 'up' : 'down'} ml-2`}></i>
        </button>
      </div>
    </div>
  );
};

export default TopBookedServices;
