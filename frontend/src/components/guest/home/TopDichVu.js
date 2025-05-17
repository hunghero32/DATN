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
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

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

  const toggleDescription = (serviceId, event) => {
    event.stopPropagation();
    setExpandedDescriptions(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  };

  const renderServiceCard = (service) => (
    <div
      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer p-8 h-auto min-h-[360px] flex flex-col"
      onClick={() => handleServiceClick(service)}
    >
      <div className="flex items-center justify-center mb-6">
        {service.image ? (
          <img 
            src={service.image} 
            alt={service.services_name}
            className="w-28 h-28 mt-5 rounded-full object-cover"
          />
        ) : (
          <div className="w-28 h-28 bg-blue-100 rounded-full flex items-center justify-center">
            <i className="fas fa-stethoscope text-blue-600 text-3xl"></i>
          </div>
        )}
      </div>
      <div className="text-center flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 truncate">{service.services_name}</h3>
        <div className="text-gray-600 text-sm mb-4">
          <div 
            className={`${expandedDescriptions[service.id] ? '' : 'line-clamp-3'}`}
            dangerouslySetInnerHTML={{
              __html: service.description ? service.description : "Chưa có mô tả"
            }}
          />
          {service.description && service.description.length > 150 && (
            <button
              onClick={(e) => toggleDescription(service.id, e)}
              className="text-blue-600 hover:text-blue-800 font-medium mt-2"
            >
              {expandedDescriptions[service.id] ? 'Thu gọn' : 'Xem thêm'}
            </button>
          )}
        </div>
        <div className="flex justify-between items-center text-gray-600 mt-auto">
          <span className="font-medium text-red-600 w-full text-center">
            {service.price ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.price) : "Liên hệ"}
          </span>
        </div>
      </div>
    </div>
  );

  // if (loading) return <p className="text-center text-gray-500">Đang tải danh sách dịch vụ...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 mb-4 py-8">
      <div className="flex flex-col items-center justify-center text-center ">
        <h2 className="text-3xl font-bold text-gray-800">Dịch Vụ Nổi Bật</h2>
        <p className="text-gray-600 mt-2">Các dịch vụ được đặt nhiều nhất tại phòng khám</p>
      </div>

      {!showAll ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          modules={[Navigation]}
          className="my-8"
        >
          {services.length > 0 ? (
            services.map((service) => (
              <SwiperSlide key={service.id}>
                {renderServiceCard(service)}
              </SwiperSlide>
            ))
          ) : (
            <p className="text-gray-500 text-center">Không có dịch vụ nào.</p>
          )}
        </Swiper>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-8">
          {services.length > 0 ? (
            services.map((service) => (
              <React.Fragment key={service.id}>
                {renderServiceCard(service)}
              </React.Fragment>
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