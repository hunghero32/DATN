import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
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
          {/* Nút điều hướng */}
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            {showAll ? "Thu gọn" : "Xem tất cả"}
          </button>
        </div>
      ) : (
        <div className="row justify-content-center">
          {specialties.map((specialty) => (
            <div key={specialty.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div
                className="card border-0 shadow-sm rounded-xl"
                onClick={() => handleSpecialtyClick(specialty.id)}
                style={{ cursor: "pointer", height: "250px" }} // Đặt chiều cao cố định
              >
                <div className="card-body text-center p-4 d-flex flex-column justify-content-center align-items-center">
                  <div className="mb-4">
                    <div
                      style={{ width: "150px", height: "150px", backgroundColor: "#f8f9fa" }}
                      className="d-flex justify-content-center align-items-center rounded-circle"
                    >
                      <img
                        src={specialty.image || "/placeholder.svg"}
                        alt={specialty.name}
                        className="img-fluid"
                        style={{ maxWidth: "100px" }}
                      />
                    </div>
                  </div>
                  <h4 className="fw-bold">{specialty.name}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecialtiesSection;