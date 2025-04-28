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
        if (response.data && Array.isArray(response.data.popular_services)) {
          setServices(response.data.popular_services);
        } else {
          setServices([]);
        }
      } catch (error) {
        setError("Không thể tải danh sách dịch vụ.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleServiceClick = (service) => {
    if (!service || !service.id) return;
    navigate(`/detail-service/${service.id}`);
  };

  if (loading) return <p className="text-center text-gray-500">Đang tải danh sách dịch vụ...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Dịch Vụ Nổi Bật</h2>
        <p className="text-gray-600 mt-2">Các dịch vụ được đặt nhiều nhất tại phòng khám</p>
      </div>

      {!showAll ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          modules={[Navigation]}
          className="my-6"
        >
          {services.length > 0 ? (
            services.map((service) => (
              <SwiperSlide key={service.id}>
                <div
                  className="bg-white rounded-lg shadow-lg p-4 mb-4 mt-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer p-6 h-[280px] flex flex-col"
                  onClick={() => handleServiceClick(service)}
                >
                  <div className="flex items-center justify-center mb-8">
                    {service.image ? (
                      <img 
                        src={service.image} 
                        alt={service.services_name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <i className="fas fa-stethoscope text-blue-600 text-2xl"></i>
                      </div>
                    )}
                  </div>
                  <div className="text-center flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 truncate">{service.services_name}</h3>
                    <div 
                      className="text-gray-600 text-sm mb-4 line-clamp-3 h-[60px]"
                      dangerouslySetInnerHTML={{
                        __html: service.description ? service.description : "Chưa có mô tả"
                      }}
                    />
                    <div className="flex justify-between items-center text-gray-600 mt-auto">
                      <span className="flex items-center">
                        <i className="fas fa-calendar-check mr-2"></i>
                        {service.bookings_count || 0} Lượt đặt
                      </span>
                      <span className="font-medium text-blue-600">
                        {service.price ? service.price.toLocaleString() + " VNĐ" : "Liên hệ"}
                      </span>
                    </div>
                  </div>
                </div>
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
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer p-6 flex flex-col h-[280px]"
                onClick={() => handleServiceClick(service)}
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <i className="fas fa-stethoscope text-blue-600 text-2xl"></i>
                  </div>
                </div>
                <div className="text-center flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 truncate">{service.services_name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 h-[60px]">
                    {service.description ? service.description : "Chưa có mô tả"}
                  </p>
                  <div className="flex justify-between items-center text-gray-600 mt-auto">
                    <span className="flex items-center">
                      <i className="fas fa-calendar-check mr-2"></i>
                      {service.bookings_count || 0} Lượt đặt
                    </span>
                    <span className="font-medium text-blue-600">
                      {service.price ? service.price.toLocaleString() + " VNĐ" : "Liên hệ"}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">Không có dịch vụ nào.</p>
          )}
        </div>
      )}

      <div className="text-center mt-8">
        <button
          onClick={() => setShowAll(!showAll)}
          style={{
            borderRadius: "30px",
            padding: "16px 40px",
          }}
          className="bg-blue-600 mt-4 text-white hover:bg-blue-700 transition-colors duration-300 inline-flex items-center text-lg font-semibold"
        >
          {showAll ? "Thu gọn" : "Xem tất cả dịch vụ"}
          <i className={`fas fa-chevron-${showAll ? "up" : "down"} ml-2`}></i>
        </button>
      </div>
    </div>
  );
};

export default TopBookedServices;