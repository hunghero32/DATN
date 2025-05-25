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

      {/* {loading && <p className="text-gray-500">Đang tải danh sách bác sĩ...</p>} */}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
  {doctors.length > 0 ? (
    doctors.map((doctor, index) => (
      <div
        key={index}
        className="bg-white rounded-lg shadow-md flex flex-col h-full w-full"
      >
        <div className="relative w-full aspect-[4/3] flex items-center justify-center overflow-hidden">
          <img
            src={doctor.doctor_avatar || "https://via.placeholder.com/150"}
            alt={doctor.doctor_name}
            className="w-[200px] h-[200px] object-cover rounded-t-lg transition-transform duration-300 hover:scale-110"
            style={{ objectPosition: 'center' }}
          />
          {/* Star rating section removed */}
        </div>

        <div className="flex flex-col justify-between flex-1 p-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
              {doctor.doctor_name}
            </h3>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {doctor.specialty && (
                <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm line-clamp-1">
                  {doctor.specialty.name}
                </span>
              )}
            </div>
          </div>

          <Link
            to={`/chitietbacsi/${doctor.id}`}
            className="mt-auto block w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Chi Tiết Bác Sĩ
          </Link>
        </div>
      </div>
    ))
  ): (
    <p className="text-gray-500">Không có bác sĩ nào.</p>
  )}
</div>

    </div>
  );
};

export default ClinicDetail;
