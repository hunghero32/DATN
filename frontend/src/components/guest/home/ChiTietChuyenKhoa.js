import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../ultils/api/axios";

const SpecialtyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [specialty, setSpecialty] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpecialtyDetail = async () => {
      try {
        const response = await api.get(`/api/client/detail-specialty/${id}`);
        console.log("🔍 API Response:", response.data);

        if (!response.data || !response.data.specialty) {
          setError("Không tìm thấy chuyên khoa.");
          return;
        }

        setSpecialty(response.data.specialty);
        setServices(response.data.services || []);
      } catch (error) {
        console.error("❌ Lỗi tải API:", error);
        setError("Không thể tải thông tin chuyên khoa.");
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialtyDetail();
  }, [id]);

  // ✅ Điều hướng sang trang chi tiết dịch vụ
  const handleServiceClick = (serviceId) => {
    navigate(`/detail-service/${serviceId}`);
  };

  if (loading) return <p className="text-center text-gray-500">Đang tải chi tiết chuyên khoa...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!specialty) return <p className="text-center text-gray-500">Không có thông tin chuyên khoa.</p>;

  return (
    <div className="container mx-auto p-6">
      {/* Tiêu đề */}
      <h2 className="text-4xl font-bold text-blue-600 text-center">{specialty.name}</h2>

      {/* Hình ảnh */}
      <div className="flex justify-center my-4">
        <img
          src={specialty.icon || "https://via.placeholder.com/100x100.png"}
          alt={specialty.name}
          className="w-32 h-32 object-cover rounded-full"
        />
      </div>

      {/* Mô tả chuyên khoa */}
      <p className="text-center text-gray-700">{specialty.description}</p>

      {/* Danh sách dịch vụ */}
      <h3 className="text-2xl font-semibold text-blue-500 mt-6 text-center">Danh Sách Dịch Vụ</h3>
      {services.length > 0 ? (
        <ul className="mt-4 space-y-4 text-center">
          {services.map((service) => (
            <li
              key={service.id}
              onClick={() => handleServiceClick(service.id)}
              className="bg-white shadow-lg rounded-xl p-4 cursor-pointer hover:bg-blue-100 transition"
            >
              <p className="text-md font-semibold text-gray-800">{service.services_name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">Không có dịch vụ nào trong chuyên khoa này.</p>
      )}
    </div>
  );
};

export default SpecialtyDetail;
