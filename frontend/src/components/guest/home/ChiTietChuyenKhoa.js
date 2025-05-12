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
  const [showFullDesc, setShowFullDesc] = useState(false);

  useEffect(() => {
    const fetchSpecialtyDetail = async () => {
      try {
        const response = await api.get(`/api/client/detail-specialty/${id}`);
        console.log("🔍 API Response:", response.data);

        if (!response.data || !response.data.specialty) {
          setError("Không tìm thấy chuyên khoa.");
          return;
        }

        // Log the specialty data to check the image path
        console.log("Specialty data:", response.data.specialty);
        
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

  // Add truncate text function
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    const strippedText = text.replace(/<[^>]+>/g, '');
    if (strippedText.length <= maxLength) return text;
    return strippedText.substring(0, maxLength) + '...';
  };

  if (loading) return <p className="text-center text-gray-500">Đang tải chi tiết chuyên khoa...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!specialty) return <p className="text-center text-gray-500">Không có thông tin chuyên khoa.</p>;

  return (
    <div className="container mx-auto mt-4 mb-4 p-6">
      {/* Specialty Title */}
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">{specialty.name}</h2>

      {/* Specialty Image */}
      <div className="flex justify-center mb-8">
        <div className="w-48 h-48 rounded-full overflow-hidden">
          <img
            src={specialty.image || 'https://via.placeholder.com/150?text=No+Image'}
            alt={specialty.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/150?text=No+Image';
            }}
          />
        </div>
      </div>

      {/* Modified Specialty Description */}
      <div className="max-w-3xl mx-auto mb-12">
        <div
          className="text-left text-gray-600 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: showFullDesc ? 
              (specialty.description || "<p>No description available</p>") :
              truncateText(specialty.description || "<p>No description available</p>", 100)
          }}
        />
        {specialty.description && 
         specialty.description.replace(/<[^>]+>/g, '').length > 100 && (
          <button
            onClick={() => setShowFullDesc(!showFullDesc)}
            className="text-blue-600 mb-4 hover:text-blue-800"
          >
            {showFullDesc ? 'Ẩn Bớt' : 'Xem Hết'}
          </button>
        )}
      </div>

      {/* Services Grid */}
      {services.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => handleServiceClick(service.id)}
              className="flex flex-col items-center p-6 cursor-pointer transition-transform hover:transform hover:scale-105"
            >
              {/* Circular Icon Container */}
              <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center mb-4 overflow-hidden">
                <img
                  src={`http://localhost:8000/storage/${service.image}`}
                  alt={service.services_name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                  }}
                />
              </div>
              {/* Service Name */}
              <h3 className="text-xl font-semibold text-gray-800 text-center">
                {service.services_name}
              </h3>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No services available in this specialty.</p>
      )}
    </div>
  );
};

export default SpecialtyDetail;
