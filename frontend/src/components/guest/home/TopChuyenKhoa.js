import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import api from "../../../ultils/api/axios";

const SpecialtiesSection = () => {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false); // Trạng thái hiển thị tất cả chuyên khoa
  const navigate = useNavigate();

  // Gọi API để lấy danh sách chuyên khoa
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await api.get("/api/client/list-specialty");
        console.log("Dữ liệu từ API:", response.data);
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
    console.log("Chuyên khoa được chọn:", id);
    navigate(`/detail-specialty/${id}`);
  };

  if (loading) return <p className="text-center text-gray-500">Đang tải danh sách chuyên khoa...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Giới hạn số lượng hiển thị chuyên khoa
  const displayedSpecialties = showAll ? specialties : specialties.slice(0, 4);

  return (
    <div className="bg-white py-16 px-4 mb-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Phòng khám và Chuyên khoa</h2>
          <p className="text-gray-600 mt-2">
          <div className="marquee-container">
      <div className="marquee-text">
      Khám phá hệ thống chuyên khoa toàn diện, nơi quy tụ đội ngũ bác sĩ đầu ngành và trang thiết bị hiện đại, đáp ứng mọi nhu cầu chăm sóc sức khỏe của bạn – từ khám tổng quát đến điều trị chuyên sâu.
      </div>
    </div>
          </p>
        </div>

        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={50}
          slidesPerView={6}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 20 },
            480: { slidesPerView: 3, spaceBetween: 30 },
            768: { slidesPerView: 4, spaceBetween: 40 },
            1024: { slidesPerView: 6, spaceBetween: 50 },
          }}
          className="pb-12"
        >
          {specialties.map((specialty) => (
            <SwiperSlide key={specialty.id}>
              <div
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => handleSpecialtyClick(specialty.id)}
              >
                <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center mb-4 relative">
                  <div className="absolute w-full h-full rounded-full border-2 border-cyan-300"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-cyan-400"></div>
                  <img
                    src={specialty.image || "https://source.unsplash.com/100x100/?hospital,doctor,medical"}
                    alt={specialty.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <h5 className="text-base font-medium text-gray-900 text-center group-hover:text-cyan-500">
                  {specialty.name}
                </h5>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SpecialtiesSection;
