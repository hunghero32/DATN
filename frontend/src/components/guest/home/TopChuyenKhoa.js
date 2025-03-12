import React, { useEffect, useState } from "react";
import api from "../../../ultils/api/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const SpecialtiesSection = () => {
  const [specialties, setSpecialties] = useState([]); // Lưu danh sách chuyên khoa
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false); // Trạng thái hiển thị tất cả chuyên khoa

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await api.get("api/client/home");
        console.log("Dữ liệu chuyên khoa từ API:", response.data.specialties);
        setSpecialties(response.data.specialties || []); // Lưu dữ liệu từ API
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error.response?.data || error.message);
        setError("Không thể tải danh sách chuyên khoa.");
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Đang tải danh sách chuyên khoa...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6 text-center">
      <h2 className="text-4xl font-bold text-blue-600">🏥 Danh Sách Chuyên Khoa</h2> <br />

      {!showAll ? (
        <div className="relative">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
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
                  <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center hover:scale-105 transition-transform">
                    <img
                      src={specialty.icon || "https://via.placeholder.com/100"}
                      alt={specialty.name}
                      className="w-16 h-16 object-cover rounded-full mb-2"
                    />
                    <h5 className="text-md font-semibold text-gray-800">{specialty.name}</h5>
                    <p className="text-xs text-gray-600">{specialty.description}</p>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <p className="text-gray-500">Không có chuyên khoa nào.</p>
            )}
          </Swiper>

          {/* Nút điều hướng slider */}
          <button className="prev-button absolute left-0 top-1/2 -translate-y-1/2 bg-gray-300 text-gray-700 px-3 py-2 rounded-full hover:bg-gray-400 transition">
            ⬅
          </button>
          <button className="next-button absolute right-0 top-1/2 -translate-y-1/2 bg-gray-300 text-gray-700 px-3 py-2 rounded-full hover:bg-gray-400 transition">
            ➡
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {specialties.length > 0 ? (
            specialties.map((specialty) => (
              <div key={specialty.id} className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center hover:scale-105 transition-transform">
                <img
                  src={specialty.icon || "https://via.placeholder.com/100"}
                  alt={specialty.name}
                  className="w-16 h-16 object-cover rounded-full mb-2"
                />
                <h5 className="text-md font-semibold text-gray-800">{specialty.name}</h5>
                <p className="text-xs text-gray-600">{specialty.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Không có chuyên khoa nào.</p>
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

export default SpecialtiesSection;