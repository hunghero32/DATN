import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../ultils/api/axios";  // Fixed import path from 'utils' to 'ultils'

const SpecialtyDetail = () => {
  const { id } = useParams();
  const [specialty, setSpecialty] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpecialtyDetail = async () => {
      try {
        const response = await api.get(`/api/client/detail-specialty/${id}`);
        console.log("📢 Dữ liệu trả về từ API:", response.data);

        if (!response.data || !response.data.specialty) {
          setError("Không tìm thấy thông tin chuyên khoa.");
        } else {
          setSpecialty(response.data.specialty);
          // Ensure doctors array is not undefined
          setDoctors(response.data.doctors || []);
        }
      } catch (error) {
        console.error("❌ Lỗi tải dữ liệu:", error.response?.data || error.message);
        setError("Không thể tải thông tin chuyên khoa.");
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialtyDetail();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="/loading-spinner.gif" alt="Loading..." className="w-20 h-20" />
      </div>
    );

  if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;

  if (!specialty)
    return <p className="text-center text-gray-500 text-lg">Không có thông tin chuyên khoa.</p>;

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header chuyên khoa */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-blue-600">🏥 {specialty.name || "Chuyên khoa không xác định"}</h2>
        <img
          src={specialty.image && specialty.image.startsWith("http") ? specialty.image : "https://source.unsplash.com/400x300/?hospital,medical"}
          alt={specialty.name || "Hình ảnh chuyên khoa"}
          className="w-48 h-32 object-cover rounded-lg mx-auto my-4 shadow-md"
        />
        <p className="text-gray-700 max-w-2xl mx-auto">{specialty.description || "Không có mô tả cho chuyên khoa này."}</p>
      </div>

      {/* Danh sách bác sĩ */}
      <h3 className="text-2xl font-semibold text-blue-500 mb-4">👩‍⚕️ Danh sách bác sĩ</h3>
      {doctors && doctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white shadow-lg rounded-lg p-6 flex items-center">
              {/* Ảnh bác sĩ */}
              <img
                src={doctor.image || "https://source.unsplash.com/150x150/?doctor,person"}
                alt={doctor.name}
                className="w-24 h-24 object-cover rounded-full border-2 border-blue-500"
              />

              {/* Thông tin bác sĩ */}
              <div className="ml-4 flex-1">
                <h4 className="text-lg font-semibold text-blue-600">{doctor.name}</h4>
                <p className="text-gray-600 text-sm">{doctor.description || "Không có mô tả."}</p>
                <p className="text-gray-500 text-sm flex items-center mt-1">
                  📍 {doctor.location || "Chưa có thông tin"}
                </p>

                {/* Lịch khám */}
                <div className="mt-3">
                  <h4 className="text-sm font-semibold">📅 Lịch khám</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {doctor.schedules && doctor.schedules.length > 0 ? (
                      doctor.schedules.map((schedule, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 rounded-md text-sm">
                          {schedule.time || schedule}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">Chưa có lịch khám</p>
                    )}
                  </div>
                </div>

                {/* Địa chỉ khám */}
                <div className="mt-3">
                  <h4 className="text-sm font-semibold">📍 Địa chỉ khám</h4>
                  <p className="text-blue-500 text-sm">{doctor.clinic || "Chưa có thông tin"}</p>
                </div>

                {/* Giá khám */}
                <div className="mt-3">
                  <h4 className="text-sm font-semibold">💰 Giá khám</h4>
                  <p className="text-green-600 text-sm font-bold">
                    {doctor.price ? `${doctor.price} VND` : "Liên hệ"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg">Không có bác sĩ nào trong chuyên khoa này.</p>
      )}
    </div>
  );
};

export default SpecialtyDetail;
