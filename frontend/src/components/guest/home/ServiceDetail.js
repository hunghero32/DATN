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
        const { data } = await api.get(`/api/client/detail-service/${id}`);
        if (data?.services_name) {
          setService(data);
          setDoctors(data.doctors || []);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (error) {
        setError("Không thể tải thông tin dịch vụ. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchServiceDetail();
  }, [id]);

  const generateTimeSlots = (schedule) => {
    const slots = [];
    let startTime = new Date(`1970-01-01T${schedule.time_start}`);
    const endTime = new Date(`1970-01-01T${schedule.time_end}`);
    const duration = service?.duration || 30;

    while (startTime < endTime) {
      const slotEnd = new Date(startTime.getTime() + duration * 60000);
      if (slotEnd > endTime) break;

      slots.push({
        id: `${schedule.id}-${startTime.toTimeString().slice(0, 5)}`,
        time_start: startTime.toTimeString().slice(0, 5),
        time_end: slotEnd.toTimeString().slice(0, 5),
      });
      startTime.setMinutes(startTime.getMinutes() + duration);
    }
    return slots;
  };

  const handleScheduleClick = async (doctor, slot, schedule) => {
    if (!selectedDate) {
      message.error("Vui lòng chọn ngày trước khi đặt lịch!");
      return;
    }
  
    const bookingData = {
      doctor_id: doctor.id,
      service_id: service.id,
      schedule_id: schedule.id, // ✅ Lấy đúng schedule_id từ lịch trình
      date: selectedDate.replace(/['"]+/g, ""),
      time: slot.time_start,
      specialty_id: service.specialty?.id || null,
      status: "pending",
    };
  
    console.log("📌 Dữ liệu gửi lên API:", bookingData);
  
    if (!bookingData.schedule_id) {
      console.error("🚨 Lỗi: schedule_id bị null!");
      return;
    }
  
    try {
      const response = await api.post("/api/client/temp-booking", bookingData, {
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.data.status) {
        localStorage.setItem("bookingData", JSON.stringify(response.data.data));
        message.success("Đã lưu thông tin đặt lịch tạm thời");
        navigate(`/booking/${id}`);
      } else {
        message.error(response.data.message || "Có lỗi xảy ra. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi API:", error.response?.data || error.message);
      message.error(error.response?.data?.message || "Không thể đặt lịch. Vui lòng thử lại!");
    }
  };
  

  if (loading) return <p className="text-center text-gray-500">Đang tải...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!service) return <p className="text-center text-gray-500">Không có dữ liệu.</p>;

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-4xl font-bold text-blue-800 mb-4 text-center">{service.services_name}</h1>
      <p className="text-gray-700 text-lg text-center">{service.description}</p>

      {doctors.map((doctor) => (
        <div key={doctor.id} className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-800">{doctor.doctor_name}</h2>
          <p className="text-gray-700">{doctor.doctor_bio}</p>

          <label className="block text-gray-700 font-semibold mb-2">Chọn ngày khám:</label>
          <select
            className="w-full p-2 border rounded-md mb-4"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option value="">Chọn ngày</option>
            {[...new Set(doctor.schedules.map((s) => s.working_date))].map((date) => (
              <option key={date} value={date}>{date}</option>
            ))}
          </select>

          <div className="grid grid-cols-3 gap-2">
          {doctor.schedules
  .filter((s) => s.working_date === selectedDate)
  .flatMap((schedule) => 
    generateTimeSlots(schedule).map((slot) => (
      <button
        key={slot.id}
        className="p-2 rounded-lg bg-blue-100 border hover:border-blue-500 hover:shadow-md"
        onClick={() => handleScheduleClick(doctor, slot, schedule)} // ✅ Truyền thêm schedule
      >
        {slot.time_start} - {slot.time_end}
      </button>
    ))
  )}

          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceDetail;
