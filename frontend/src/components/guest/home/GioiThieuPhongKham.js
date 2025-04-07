import React, { useEffect, useState } from "react";
import api from "../../../ultils/api/axios"; 

const ClinicDetail = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Gọi API lấy danh sách bác sĩ
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get("api/client/home");
        console.log("API trả về:", response.data);

        if (response.data && Array.isArray(response.data.doctors)) {
          setDoctors(response.data.doctors);
        } else {
          console.error("⚠️ Dữ liệu không hợp lệ!");
          setDoctors([]);
        }
      } catch (error) {
        console.error(" Lỗi khi tải danh sách bác sĩ:", error);
        setError("Không thể tải danh sách bác sĩ.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="container mx-auto p-6 mb-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Phòng Khám Đa Khoa Quốc Tế</h1>
        <p className="text-lg text-gray-500">
          Phòng Khám Đa Khoa Quốc Tế cung cấp dịch vụ chăm sóc sức khỏe chất lượng cao.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">👨‍⚕️ Đội ngũ bác sĩ</h2>

        {loading && <p className="text-gray-500">Đang tải danh sách bác sĩ...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Hiển thị danh sách bác sĩ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {doctors.length > 0 ? (
            doctors.map((doctor, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                <img
                  src={doctor.doctor_avatar || "https://via.placeholder.com/100"}
                  alt={doctor.doctor_name}
                  className="w-24 h-24 rounded-full mb-3 border-2 border-gray-300"
                />
                <h3 className="text-lg font-semibold">{doctor.doctor_name}</h3>
                <p className="text-gray-500">{doctor.specialty?.name || "Chưa cập nhật"}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Chưa có bác sĩ nào.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClinicDetail;
