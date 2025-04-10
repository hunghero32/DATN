import React, { useEffect, useState } from "react";
import api from "../../../ultils/api/axios"; 
import { Link } from "react-router-dom"; 
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
    <div className="container mx-auto p-6 mt-4 mb-4">
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
              <Link
                key={index}
                to={`/chitietbacsi/${doctor.id}`}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center hover:shadow-lg transition min-h-[300px]"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 flex-shrink-0">
                  <img
                    src={doctor.doctor_avatar || "https://via.placeholder.com/150"}
                    alt={doctor.doctor_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center w-full flex-grow flex flex-col justify-center">
                  <div className="group relative">
                    <h3 className="text-base font-semibold mb-2 h-12 overflow-hidden">
                      <span className="block text-blue-700 hover:text-blue-800">
                        {doctor.doctor_name}
                      </span>
                    </h3>
                    <div className="opacity-0 group-hover:opacity-100 absolute z-10 bg-gray-800 text-white p-2 rounded-md left-1/2 transform -translate-x-1/2 transition-opacity duration-200 text-sm min-w-max">
                      {doctor.doctor_name}
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">{doctor.specialty?.name || "Chưa cập nhật"}</p>
                </div>
              </Link>
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
