import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import api from "../../../ultils/api/axios";

const SpecialtiesSection = () => {
  const [specialties, setSpecialties] = useState([]); // Lưu danh sách chuyên khoa
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false); // Trạng thái hiển thị tất cả chuyên khoa
  const navigate = useNavigate(); // Điều hướng đến trang chi tiết chuyên khoa

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await api.get("/api/client/list-specialty");
        console.log("Dữ liệu từ API:", response.data); // In dữ liệu API để kiểm tra

        // Kiểm tra cấu trúc dữ liệu và xử lý đúng cách
        if (response.data.status && response.data.data && response.data.data.data) {
          setSpecialties(response.data.data.data); // Cập nhật danh sách chuyên khoa từ API
        } else {
          setSpecialties([]); // Nếu không có dữ liệu, set chuyên khoa là mảng rỗng
        }
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
        setError("Không thể tải danh sách chuyên khoa.");
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  // Kiểm tra dữ liệu đã được tải thành công
  console.log("Danh sách chuyên khoa sau khi tải:", specialties);

  // Xử lý khi nhấn vào chuyên khoa
  const handleSpecialtyClick = (id) => {
    console.log("Chuyên khoa được chọn:", id); // Log ID chuyên khoa được chọn
    navigate(`/detail-specialty/${id}`);  // Điều hướng đến trang chi tiết chuyên khoa
  };

  // Kiểm tra lỗi hoặc trạng thái loading
  if (loading) return <p className="text-center text-gray-500">Đang tải danh sách chuyên khoa...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Chuyên Khoa Nổi Bật
          </h2>
          <p className="text-gray-600 text-lg">
            Các chuyên khoa hàng đầu với đội ngũ bác sĩ giàu kinh nghiệm
          </p>
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
                1024: { slidesPerView: 4 }
              }}
              modules={[Navigation]}
              className="my-6"
            >
              {specialties.length > 0 ? (
                specialties.map((specialty) => (
                  <SwiperSlide key={specialty.id}>
                    <div 
                      className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer h-[280px] flex flex-col justify-between"
                      onClick={() => handleSpecialtyClick(specialty.id)}
                    >
                      <div className="flex flex-col items-center">
                        <div className="mb-4 p-2 bg-blue-50 rounded-full w-24 h-24 flex items-center justify-center">
                          <img
                            src={specialty.image || "/default-image.png"}
                            alt={specialty.name}
                            className="w-16 h-16 object-cover rounded-full"
                          />
                        </div>
                        <h5 className="text-lg font-semibold text-gray-800 mb-3 text-center">{specialty.name}</h5>
                        <p className="text-sm text-gray-600 text-center line-clamp-3">{specialty.description}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">Không có chuyên khoa nào.</p>
              )}
            </Swiper>

            <button className="prev-button absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg text-blue-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-50 transition-all z-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="next-button absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg text-blue-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-50 transition-all z-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
            {specialties.length > 0 ? (
              specialties.map((specialty) => (
                <div 
                  key={specialty.id} 
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer h-[280px] flex flex-col justify-between"
                  onClick={() => handleSpecialtyClick(specialty.id)}
                >
                  <div className="flex flex-col items-center">
                    <div className="mb-4 p-2 bg-blue-50 rounded-full w-24 h-24 flex items-center justify-center">
                      <img
                        src={specialty.image || "/default-image.png"}
                        alt={specialty.name}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                    </div>
                    <h5 className="text-lg font-semibold text-gray-800 mb-3 text-center">{specialty.name}</h5>
                    <p className="text-sm text-gray-600 text-center line-clamp-3">{specialty.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8 col-span-full">Không có chuyên khoa nào.</p>
            )}
          </div>
        )}

        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            {showAll ? (
              <>
                <span>Thu gọn</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </>
            ) : (
              <>
                <span>Xem tất cả</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialtiesSection;
