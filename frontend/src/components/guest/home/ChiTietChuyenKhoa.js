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
    <div className="container mx-auto p-6 bg-blue-50">  
      {/* Tiêu đề */}
      <h2 className="text-4xl font-bold text-blue-600 text-center">{specialty.name}</h2>

      {/* Hình ảnh ngẫu nhiên từ Lorem Picsum */}
      <div className="flex justify-center my-6">
        <img
          src={`https://picsum.photos/200?random=${id}`}  // Sử dụng ảnh ngẫu nhiên với ID để đảm bảo tính duy nhất
          alt={specialty.name}
          className="w-48 h-48 object-cover rounded-full"  
        />
      </div>

      {/* Mô tả chuyên khoa */}
      <p className="text-center text-gray-700">{specialty.description}</p>

      {/* Danh sách dịch vụ */}
      <h3 className="text-2xl font-semibold text-blue-500 mt-6 text-center">Danh Sách Dịch Vụ</h3>
      {services.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => handleServiceClick(service.id)}
              className="bg-white shadow-lg rounded-xl p-4 text-center cursor-pointer hover:bg-blue-100 transition ease-in-out duration-300"
            >
              <img
                src={`https://picsum.photos/100?random=${service.id}`} // Ảnh ngẫu nhiên cho dịch vụ
                alt={service.services_name}
                className="w-24 h-24 object-cover mx-auto mb-4"  
              />
              <p className="text-md font-semibold text-gray-800">{service.services_name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">Không có dịch vụ nào trong chuyên khoa này.</p>
      )}
    </div>
  );
};

export default SpecialtyDetail;
