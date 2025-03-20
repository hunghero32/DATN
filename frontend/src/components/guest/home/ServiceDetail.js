import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { message } from "antd"; // Add this import
import api from "../../../ultils/api/axios";

const ServiceDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("🆔 ID nhận được:", id);
  const [service, setService] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleScheduleClick = async (doctor, schedule) => {
    if (schedule.status === 1) {
      const bookingData = {
        doctor_id: doctor.id,
        service_id: service.id,
        schedule_id: schedule.id,
        date: new Date(schedule.working_date).toISOString().split('T')[0],  // Đảm bảo định dạng ngày đúng
        time: schedule.time_start,           
        specialty_id: service.specialty?.id || 0, // Added fallback value for specialty_id
        status: "pending",
        // Additional data for localStorage
        fullData: {
          doctor_name: doctor.doctor_name,
          doctor_avatar: doctor.doctor_avatar,
          doctor_bio: doctor.doctor_bio,
          doctor_exp: doctor.exp,
          service_name: service.services_name,
          specialty_name: service.specialty?.name || "Chuyên khoa không xác định", // Fallback text
          price: service.price,
          duration: service.duration,
          max_patients: schedule.max_patients,
          time_start: schedule.time_start,
          time_end: schedule.time_end,
          booking_time: `${schedule.time_start} - ${schedule.time_end}`
        }
      };

      try {
        const response = await api.post('/api/client/temp-booking', bookingData);
        if (response.data.status === true) {
            // Store the complete data returned from the API
            localStorage.setItem('bookingData', JSON.stringify(response.data.data));
            message.success("Đã lưu thông tin đặt lịch tạm thời");
            navigate(`/booking/${id}`);
        } else {
            message.error(response.data.message || "Có lỗi xảy ra. Vui lòng thử lại!");
        }
      } catch (error) {
        console.error("Booking error:", error.response?.data || error);
        message.error(error.response?.data?.message || "Không thể đặt lịch. Vui lòng thử lại!");
      }
    }
  };

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/client/detail-service/${id}`);
        console.log("🔍 API Response:", response.data);
  
        // Kiểm tra nếu API trả về dữ liệu đúng định dạng
        if (response.data && response.data.services_name) {  // Kiểm tra `services_name` vì đây là trường chính
          setService(response.data);  // Không cần `response.data.service` nữa
          if (response.data.doctors) {
            setDoctors(response.data.doctors);
          }
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (error) {
        console.error("❌ Chi tiết lỗi:", error);
        if (error.code === 'ERR_NETWORK') {
          setError("Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.");
        } else {
          setError("Không thể tải thông tin dịch vụ. Vui lòng thử lại sau.");
        }
      } finally {
        setLoading(false);
      }
    };
  
    if (id) {
      fetchServiceDetail();
    }
  }, [id]);
  

  // Handle loading, error, and empty state
  if (loading) return <p className="text-center text-gray-500">Đang tải chi tiết dịch vụ...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!service) return <p className="text-center text-gray-500">Không có thông tin dịch vụ.</p>;
  if (!doctors || doctors.length === 0) return <p className="text-center text-gray-500">Không có bác sĩ cho dịch vụ này.</p>;

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Service Information - Enhanced layout */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">{service.services_name}</h1>
          <div className="flex justify-center gap-3 mb-4">
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              {service.specialty?.name || "Chuyên khoa"}
            </span>
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              {service.category?.name || "Danh mục"}
            </span>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
            {service.description}
          </p>
        </div>
      </div>

      {/* Doctors Section */}
      {doctors.map((doctor) => (
        <div key={doctor.id} className="bg-white rounded-lg shadow-lg p-8 mb-6">
          {/* Doctor Header */}
          <div className="flex items-start space-x-8">
            <div className="flex-shrink-0">
              <img
                src={doctor.doctor_avatar || "/images/default-avatar.png"}
                alt={doctor.doctor_name}
                className="w-32 h-32 rounded-lg object-cover shadow-md"
                onError={(e) => {
                    e.target.src = "/images/default-avatar.png";
                    e.onerror = null; // Prevents infinite loop if default image also fails
                }}
              />
            </div>

            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-2xl font-bold text-blue-800">{doctor.doctor_name}</h2>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  Bác sĩ nổi bật
                </span>
              </div>
              <p className="text-gray-700 mb-3 text-lg">{doctor.doctor_bio}</p>
              <div className="grid grid-cols-2 gap-4">
                <p className="text-gray-700">
                  <span className="font-semibold">Chuyên khoa:</span> {service.specialty?.name}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Kinh nghiệm:</span> {doctor.exp} năm
                </p>
              </div>
            </div>
          </div>

          {/* Schedule Section - Enhanced Grid Layout */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Lịch khám</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {doctor.schedules && doctor.schedules.map((schedule) => (
                <div 
                  key={schedule.id} 
                  className={`p-4 rounded-lg text-center cursor-pointer transition-all duration-300 ${
                    schedule.status === 1 
                      ? 'bg-white border-2 border-blue-200 hover:border-blue-500 hover:shadow-lg' 
                      : 'bg-gray-100 border-2 border-gray-200 cursor-not-allowed'
                  }`}
                  onClick={() => handleScheduleClick(doctor, schedule)}
                >
                  <p className="font-bold text-lg mb-2">{schedule.working_date}</p>
                  <p className="text-gray-600">{schedule.time_start} - {schedule.time_end}</p>
                  <p className={`mt-2 text-sm font-medium ${schedule.status === 1 ? 'text-green-600' : 'text-red-500'}`}>
                    {schedule.status === 1 
                      ? `Còn ${schedule.max_patients} chỗ trống` 
                      : 'Đã kín lịch'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Clinic Information */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Địa điểm khám</h3>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-bold text-blue-800 text-lg mb-2">Phòng khám Spinetech Clinic</h4>
              <p className="text-gray-700">Tòa nhà GP, 257 Giải Phóng, Phương Mai, Đống Đa, Hà Nội</p>
            </div>
          </div>

          {/* Price Section */}
          <div className="mt-8 flex items-center justify-between bg-gray-50 p-6 rounded-lg">
            <div>
              <span className="text-lg text-gray-700">Giá khám: </span>
              <span className="text-2xl font-bold text-blue-800 ml-2">
                {parseInt(service.price).toLocaleString()}đ
              </span>
              <span className="text-gray-600 ml-3">({service.duration} phút)</span>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Xem chi tiết
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceDetail;
