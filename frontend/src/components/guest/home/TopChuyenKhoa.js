import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import api from "../../../ultils/api/axios";

const SpecialtiesSection = () => {
  const [specialties, setSpecialties] = useState([]); // Lưu danh sách chuyên khoa
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
        console.error("Lỗi tải dữ liệu:", error);
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
    <div className="container py-4">
      {/* Tiêu đề và nút "Xem thêm" */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0">Chuyên khoa</h2>
        <button
          className="btn rounded-pill px-4 py-2"
          style={{ backgroundColor: "#e6f7fa", color: "#0096b2" }}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Thu gọn" : "Xem thêm"}
        </button>
      </div>

      {/* Hiển thị chuyên khoa */}
      {!showAll ? (
        <div className="position-relative">
          <Swiper
            slidesPerView={3}
            spaceBetween={16}
            navigation={{ nextEl: ".next-button", prevEl: ".prev-button" }}
            breakpoints={{
              0: { slidesPerView: 1 }, // Mobile: 1 chuyên khoa
              640: { slidesPerView: 2 }, // Tablet: 2 chuyên khoa
              1024: { slidesPerView: 3 }, // Desktop: 3 chuyên khoa
            }}
            modules={[Navigation]}
            className="my-4"
          >
            {specialties.length > 0 ? (
              specialties.map((specialty) => (
                <SwiperSlide key={specialty.id}>
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
                </SwiperSlide>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">Không có chuyên khoa nào.</p>
            )}
          </Swiper>

          {/* Nút điều hướng */}
          <button
            className="prev-button position-absolute d-none d-md-block"
            style={{
              left: "10px", // Đặt bên trong container, sát mép trái
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: "40px",
              height: "40px",
              backgroundColor: "white",
              border: "2px solid #e6f7fa",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0, // Loại bỏ padding
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#0096b2"
              style={{
                display: "block", // Đảm bảo SVG căn giữa
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            className="next-button position-absolute d-none d-md-block"
            style={{
              right: "10px", // Đặt bên trong container, sát mép phải
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: "40px",
              height: "40px",
              backgroundColor: "white",
              border: "2px solid #e6f7fa",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0, // Loại bỏ padding
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#0096b2"
              style={{
                display: "block", // Đảm bảo SVG căn giữa
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
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