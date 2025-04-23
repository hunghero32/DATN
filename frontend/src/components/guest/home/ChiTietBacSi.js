import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../ultils/api/axios";
import { StarFilled } from '@ant-design/icons';
import axios from "axios";
const ChiTietBacSi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  // Hàm định dạng tiền Việt Nam
  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN") + " ₫";
  };

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await api.get(`/api/client/doctor/${id}`);
        console.log("Dữ liệu bác sĩ:", response.data);
        setDoctor(response.data.data);
      } catch (err) {
        console.error("Lỗi lấy chi tiết bác sĩ:", err);
        setError("Không thể tải thông tin bác sĩ.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);
  const fetchAverageRating = async () => {
    try {
      const { data } = await api.get(`/api/client/feedbacks/doctor/${id}`);
      if (data?.average_rating !== undefined) {
        setAverageRating(data.average_rating);
      }
    } catch (error) {
      console.error("Không thể lấy đánh giá:", error);
    }
  };
  if (id) {
    fetchAverageRating();
  }
  useEffect(() => {
    if (id) {
      fetchAverageRating();
    }
  }, [id]);

  if (loading) return <div className="text-center mt-10">Đang tải thông tin...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!doctor) return null;

  const handleServiceClick = (service) => {
    if (!service || !service.id) return;
    navigate(`/detail-service/${service.id}`);
  };

  return (
    <div className="container mx-auto p-8 mt-4 mb-4 max-w-6xl">
      <div className="bg-white shadow-xl rounded-lg p-6 md:flex p-4 gap-8 border-2 border-gray-200">
        <div className="flex-shrink-0 w-full sm:w-48 md:w-1/3 text-center md:text-left">
          <img
            src={doctor.doctor_avatar ? 
              (doctor.doctor_avatar.startsWith('http') ? 
                doctor.doctor_avatar : 
                `http://localhost:8000/storage/${doctor.doctor_avatar}`
              ) : 
              "https://via.placeholder.com/150"
            }
            alt={doctor.doctor_name}
            className="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-indigo-200 hover:border-indigo-400 transition-all"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/150";
            }}
          />
          <h2 className="text-3xl font-semibold text-indigo-700 mb-2">{doctor.doctor_name}</h2>
          <p className="inline-block bg-indigo-100 text-indigo-700 text-sm px-3 py-1 rounded-full shadow-sm">
            {doctor.specialty?.name || "Chưa có chuyên khoa"}
          </p>
          <div 
            className="text-gray-600 text-sm mt-2"
            dangerouslySetInnerHTML={{ __html: doctor.doctor_bio }}
          />
        </div>

        <div className="mt-6 md:mt-0 md:flex-1">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Giới thiệu về bác sĩ</h3>
          <div
            className="text-gray-600 leading-relaxed mb-4"
            dangerouslySetInnerHTML={{
              __html: doctor.specialty?.description || "<p>Chưa có mô tả về chuyên khoa.</p>",
            }}
          ></div>
            {averageRating !== null && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, index) => (
                        <StarFilled
                          key={index}
                          style={{
                            color: index < averageRating ? '#fadb14' : '#e8e8e8',
                            fontSize: '16px',
                            marginRight: '2px'
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({averageRating.toFixed(1)})
                    </span>
                  </div>
                )}

          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2 text-gray-800">📄 Kinh nghiệm và CV</h4>
            <p className="text-gray-600">Kinh nghiệm: <strong>{doctor.exp} năm</strong></p>
            {doctor.file && (
              <a
                href={`/${doctor.file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline mt-2 inline-block"
              >
                Tải CV (PDF)
              </a>
            )}
          </div>

          {/* Dịch vụ bác sĩ cung cấp */}
          {doctor.services && doctor.services.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2 text-gray-800">Dịch vụ của bác sĩ</h4>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
                {doctor.services.map((service, idx) => (
                  <div
                    key={idx}
                    className="bg-indigo-50 p-4 rounded-lg shadow-md hover:shadow-lg transition flex flex-col justify-between h-full"
                  >
                    <div>
                      <h5
                        className="text-xl font-semibold text-indigo-600"
                        dangerouslySetInnerHTML={{ __html: service.services_name }}
                      ></h5>
                      <div
                        className="text-gray-700 mt-2"
                        dangerouslySetInnerHTML={{ __html: service.description }}
                      ></div>
                      <p className="text-gray-500 mt-2">Thời gian: {service.duration} phút</p>
                      <p className="text-red-600 font-semibold mt-2">Giá: {formatPrice(service.price)}</p>
                    </div>
                    <button
                      onClick={() => handleServiceClick(service)}
                      className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                      Đặt lịch
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChiTietBacSi;
