import React, { useEffect, useState } from "react";
import api from "../../../ultils/api/axios";

const SpecialtiesSection = () => {
  const [specialties, setSpecialties] = useState([]); // Lưu danh sách chuyên khoa
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await api.get("api/client/home");
        console.log("Dữ liệu chuyên khoa từ API:", response.data.specialties); 
        setSpecialties(response.data.specialties || []); // Lưu dữ liệu từ API
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error.response?.data || error.message);
        setError("Không thể tải danh sách chuyên khoa.");
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Đang tải danh sách chuyên khoa...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6 text-center">
      <h2 className="text-4xl font-bold text-blue-600">🏥 Danh Sách Chuyên Khoa</h2> <br />
      <div className="flex justify-center gap-6 flex-wrap">
        {specialties.length > 0 ? (
          specialties.map((specialty, index) => (
            <div
              key={specialty.id}
              className="bg-white shadow-lg rounded-xl p-4 w-72 flex items-center hover:scale-105 transition-transform"
            >
              <img
                src={specialty.icon || "https://via.placeholder.com/100"} 
                alt={specialty.name}
                className="w-16 h-16 object-cover rounded-full mr-4"
              />
              <div className="text-left">
                <h5 className="text-sm font-semibold text-gray-800">{specialty.name}</h5>
                <p className="text-xs text-gray-600">{specialty.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Không có chuyên khoa nào.</p>
        )}
      </div>
    </div>
  );
};

export default SpecialtiesSection;
