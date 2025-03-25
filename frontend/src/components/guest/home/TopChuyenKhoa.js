import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import api from "../../../ultils/api/axios";

const SpecialtiesSection = () => {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await api.get("/api/client/list-specialty");
        if (response.data.status && response.data.data && response.data.data.data) {
          setSpecialties(response.data.data.data);
        } else {
          setSpecialties([]);
        }
      } catch (error) {
        setError("Không thể tải danh sách chuyên khoa.");
      } finally {
        setLoading(false);
      }
    };
    fetchSpecialties();
  }, []);

  const handleSpecialtyClick = (id) => {
    navigate(`/detail-specialty/${id}`);
  };

  if (loading) return <p className="text-center text-gray-500">Đang tải danh sách chuyên khoa...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Chuyên Khoa Nổi Bật</h2>
          <p className="text-gray-600 text-lg mt-2">Các chuyên khoa hàng đầu với đội ngũ bác sĩ giàu kinh nghiệm</p>
        </div>

        {!showAll ? (
          <div className="relative px-8">
            <Swiper
              slidesPerView={1}
              spaceBetween={24}
              navigation={{ nextEl: ".next-button", prevEl: ".prev-button" }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              modules={[Navigation]}
              className="my-6"
            >
              {specialties.length > 0 ? (
                specialties.map((specialty) => (
                  <SwiperSlide key={specialty.id}>
                    <div
                      className="bg-white rounded-xl shadow-md hover:shadow-lg p-6 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer h-[300px] flex flex-col justify-between items-center text-center"
                      onClick={() => handleSpecialtyClick(specialty.id)}
                    >
                      <div className="w-24 h-24 flex items-center justify-center mb-4 rounded-full overflow-hidden border border-gray-200">
                        <img
                          src={specialty.image || `https://source.unsplash.com/100x100/?hospital,doctor,medical`}
                          alt={specialty.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h5 className="text-lg font-semibold text-gray-800">{specialty.name}</h5>
                      <p className="text-sm text-gray-600 line-clamp-3 px-2">{specialty.description}</p>
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">Không có chuyên khoa nào.</p>
              )}
            </Swiper>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {specialties.map((specialty) => (
              <div
                key={specialty.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg p-6 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer h-[300px] flex flex-col justify-between items-center text-center"
                onClick={() => handleSpecialtyClick(specialty.id)}
              >
                <div className="w-24 h-24 flex items-center justify-center mb-4 rounded-full overflow-hidden border border-gray-200">
                  <img
                    src={specialty.image || "https://source.unsplash.com/100x100/?hospital,doctor,medical"}
                    alt={specialty.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h5 className="text-lg font-semibold text-gray-800">{specialty.name}</h5>
                <p className="text-sm text-gray-600 line-clamp-3 px-2">{specialty.description}</p>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            {showAll ? "Thu gọn" : "Xem tất cả"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialtiesSection;
