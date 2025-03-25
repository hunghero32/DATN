import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { message } from "antd";
import api from "../../../ultils/api/axios";

const ServiceDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/client/detail-service/${id}`);
        if (response.data && response.data.services_name) {
          setService(response.data);
          setDoctors(response.data.doctors || []);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (error) {
        setError("Không thể tải thông tin dịch vụ. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchServiceDetail();
    }
  }, [id]);

  const handleScheduleClick = async (doctor, schedule) => {
    if (schedule.status !== 1) return;

    const bookingData = {
      doctor_id: doctor.id,
      service_id: service.id,
      schedule_id: schedule.id,
      date: new Date(schedule.working_date).toISOString().split("T")[0],
      time: schedule.time_start,
      specialty_id: service.specialty?.id || 0,
      status: "pending",
      fullData: {
        doctor_name: doctor.doctor_name,
        doctor_avatar: doctor.doctor_avatar,
        doctor_bio: doctor.doctor_bio,
        doctor_exp: doctor.exp,
        service_name: service.services_name,
        specialty_name: service.specialty?.name || "Chuyên khoa không xác định",
        price: service.price,
        duration: service.duration,
        max_patients: schedule.max_patients,
        time_start: schedule.time_start,
        time_end: schedule.time_end,
        booking_time: `${schedule.time_start} - ${schedule.time_end}`,
      },
    };

    try {
      const response = await api.post("/api/client/temp-booking", bookingData);
      if (response.data.status === true) {
        localStorage.setItem("bookingData", JSON.stringify(response.data.data));
        message.success("Đã lưu thông tin đặt lịch tạm thời");
        navigate(`/booking/${id}`);
      } else {
        message.error(response.data.message || "Có lỗi xảy ra. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Booking error:", error.response?.data || error);
      message.error(error.response?.data?.message || "Không thể đặt lịch. Vui lòng thử lại!");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Đang tải...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!service) return <p className="text-center text-gray-500">Không có dữ liệu.</p>;
  if (!doctors.length) return <p className="text-center text-gray-500">Không có bác sĩ.</p>;

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-4 text-center">
          {service.services_name}
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed text-center">
          {service.description}
        </p>
      </div>

      <div className="container mx-auto px-4 py-6">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-lg shadow-lg p-6 mb-8 flex flex-col md:flex-row items-center md:items-start md:gap-x-2"
          >
            <div className="w-32 h-32 flex-shrink-0">
              <img
                src={doctor.doctor_avatar || "https://via.placeholder.com/150"}
                alt={doctor.doctor_name}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>

            <div className="flex-1 md:w-2/3">
              <h2 className="text-2xl font-bold text-blue-800">{doctor.doctor_name}</h2>
              <p className="text-gray-700 mt-3 text-lg">{doctor.doctor_bio}</p>
              <p className="text-gray-700">
                <span className="font-semibold">Kinh nghiệm:</span> {doctor.exp} năm
              </p>
            </div>

            <div className="w-full md:w-1/3">
              <label className="block text-gray-700 font-semibold mb-2">Chọn ngày khám:</label>
              <select
                className="w-full p-2 border rounded-md mb-4"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <option value="">Chọn ngày</option>
                {[...new Set(doctor.schedules.map((s) => s.working_date))].map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-3 gap-2">
                {doctor.schedules
                  .filter((schedule) => !selectedDate || schedule.working_date === selectedDate)
                  .map((schedule) => (
                    <button
                      key={schedule.id}
                      className={`p-2 rounded-lg text-center transition-all duration-300 text-sm font-medium ${
                        schedule.status === 1
                          ? "bg-white border border-blue-200 hover:border-blue-500 hover:shadow-md"
                          : "bg-gray-100 border border-gray-200 cursor-not-allowed"
                      }`}
                      disabled={schedule.status !== 1}
                      onClick={() => handleScheduleClick(doctor, schedule)}
                    >
                      <p className="font-semibold text-xs">
                        {schedule.time_start} - {schedule.time_end}
                      </p>
                      <p className={`mt-1 text-xs ${schedule.status === 1 ? "text-green-600" : "text-red-500"}`}>
                        {schedule.status === 1 ? `Còn ${schedule.max_patients} chỗ` : "Đã kín lịch"}
                      </p>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceDetail;
