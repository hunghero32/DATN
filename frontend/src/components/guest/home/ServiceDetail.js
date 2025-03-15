import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../ultils/api/axios";

const ServiceDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleScheduleClick = (doctor, schedule) => {
    if (schedule.status === 1) {
      const bookingData = {
        doctor_id: doctor.id,
        doctor_name: doctor.doctor_name,
        service_id: service.id,
        service_name: service.services_name,
        schedule_id: schedule.id,
        date: schedule.working_date,
        time: `${schedule.time_start} - ${schedule.time_end}`,
        price: service.price
      };
      
      localStorage.setItem('bookingData', JSON.stringify(bookingData));
      navigate(`/booking/${service.id}`);
    }
  };

  useEffect(() => {
    const fetchServiceDetail = async () => {
        try {
            // Match the exact API endpoint from your Laravel route
            const response = await api.get(`/api/client/detail-service/${id}`);
            console.log("🔍 API Response:", response.data);

            if (response.data) {
                setService(response.data);
                if (response.data.doctors) {
                    setDoctors(response.data.doctors);
                }
            }
        } catch (error) {
            console.error("❌ Chi tiết lỗi:", error);
            setError("Không thể tải thông tin dịch vụ. Vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    };

    fetchServiceDetail();
}, [id]);


  if (loading) return <p className="text-center text-gray-500">Đang tải chi tiết dịch vụ...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!service) return <p className="text-center text-gray-500">Không có thông tin dịch vụ.</p>;

  return (
    <div className="container mx-auto p-6">
      {/* Thông tin dịch vụ */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">{service.services_name}</h1>
        <p className="text-gray-600">{service.description}</p>
        <div className="mt-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            {service.specialty?.name || "Chuyên khoa"}
          </span>
          <span className="ml-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            {service.category?.name || "Danh mục"}
          </span>
        </div>
      </div>

      {doctors && doctors.length > 0 && doctors.map((doctor) => (
        <div key={doctor.id} className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-start space-x-6">
            {/* Thông tin bác sĩ */}
            <div className="flex-shrink-0">
              <img
                src={doctor.doctor_avatar || "https://via.placeholder.com/150"}
                alt={doctor.doctor_name}
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
              />
            </div>

            <div className="flex-grow">
              <div className="flex items-center mb-2">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm mr-2">YÊU THÍCH</span>
                <h2 className="text-xl font-bold text-blue-800">{doctor.doctor_name}</h2>
              </div>
              <p className="text-gray-600 mb-2">{doctor.doctor_bio}</p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Chuyên khoa:</span> {service.specialty?.name}
              </p>
              <p className="text-gray-600 mb-2">Bác sĩ có {doctor.exp} năm kinh nghiệm về các cốt sống, thần kinh, cơ xương khớp</p>
              <p className="text-gray-600">Địa chỉ: Hà Nội</p>
            </div>
          </div>

          {/* Lịch khám */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-4">LỊCH KHÁM</h3>
            {/* Update the schedules section */}
            <div className="grid grid-cols-4 gap-4">
              {doctor.schedules && doctor.schedules.map((schedule) => (
                <div 
                  key={schedule.id} 
                  className={`p-3 rounded text-center cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${
                    schedule.status === 1 
                      ? 'bg-gray-100 hover:bg-blue-500 hover:text-white hover:shadow-lg' 
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                  onClick={() => handleScheduleClick(doctor, schedule)}
                >
                  <p className="font-semibold">{schedule.working_date}</p>
                  <p className="text-sm">{schedule.time_start} - {schedule.time_end}</p>
                  <p className="text-xs mt-1">
                    {schedule.status === 1 
                      ? `Còn ${schedule.max_patients} chỗ` 
                      : 'Đã kín lịch'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Địa chỉ khám */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">ĐỊA CHỈ KHÁM</h3>
            <div className="bg-blue-50 p-4 rounded">
              <p className="font-semibold text-blue-800">Phòng khám Spinetech Clinic</p>
              <p className="text-gray-600">Tòa nhà GP, 257 Giải Phóng, Phương Mai, Đống Đa, Hà Nội</p>
            </div>
          </div>

          {/* Giá khám */}
          <div className="mt-6 flex items-center justify-between">
            <div>
              <span className="text-gray-600">GIÁ KHÁM: </span>
              <span className="text-blue-800 font-semibold">{parseInt(service.price).toLocaleString()}đ</span>
              <span className="text-gray-500 text-sm ml-2">({service.duration} phút)</span>
            </div>
            <a href="#" className="text-blue-600 hover:underline">Xem chi tiết</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceDetail;
