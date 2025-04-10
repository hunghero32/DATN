import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { message } from "antd";
import api from "../../../ultils/api/axios";
import YeuThich from "../../loadding/yeuthich";

const ServiceDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDates, setSelectedDates] = useState({});

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);
  const todayString = today.toISOString().split("T")[0];
  const maxDateString = maxDate.toISOString().split("T")[0];

  const getDefaultDate = (dates) => {
    if (dates.includes(todayString)) return todayString;
    return dates[0] || "";
  };

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/api/client/detail-service/${id}`);
        if (data?.services_name) {
          setService(data);
          setDoctors(data.doctors || []);

          // Set default ngày khám cho từng bác sĩ
          const defaultDates = {};
          (data.doctors || []).forEach((doctor) => {
            const workingDates = [
              ...new Set(doctor.schedules.map((s) => s.working_date)),
            ]
              .filter(
                (date) =>
                  new Date(date) >= new Date(todayString) &&
                  new Date(date) <= new Date(maxDateString)
              )
              .sort((a, b) => new Date(a) - new Date(b));

            defaultDates[doctor.id] = getDefaultDate(workingDates);
          });

          setSelectedDates(defaultDates);
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

  const handleBooking = async (doctorId, date, time, scheduleId) => {
    if (!doctorId || !date || !time || !scheduleId) {
      message.error("Vui lòng chọn ngày và giờ trước khi đặt lịch.");
      return;
    }

    const bookingData = {
      doctor_id: doctorId,
      service_id: service.id,
      schedule_id: scheduleId,
      date: date,
      time: time,
      specialty_id: service.specialty?.id || null,
      status: "pending",
    };

    try {
      const response = await api.post("/api/client/temp-booking", bookingData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.status) {
        localStorage.setItem("bookingData", JSON.stringify(response.data.data));
        navigate(`/booking/${doctorId}?date=${date}&time=${time}`);
      } else {
        message.error(response.data.message || "Có lỗi xảy ra. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi API:", error.response?.data || error.message);
      message.error(error.response?.data?.message || "Không thể đặt lịch. Vui lòng thử lại!");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (loading) return <p className="text-center text-gray-500">Đang tải...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!service) return <p className="text-center text-gray-500">Không có dữ liệu.</p>;

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="bg-gray-100 p-6 rounded-lg mb-6 p-3 mb-4">
        <h2 className="text-2xl font-bold text-blue-800">{service.services_name}</h2>
        <p className="text-gray-700 mt-2">
          <b>Danh sách bác sĩ uy tín đầu ngành chuyên khoa {service.services_name} tại Việt Nam:</b>
          <ul>
            <li>Các chuyên gia có quá trình đào tạo bài bản, nhiều kinh nghiệm</li>
            <li>Các giáo sư, phó giáo sư đang trực tiếp nghiên cứu và giảng dạy tại Đại học Y khoa Hà Nội</li>
            <li>Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu Khoa Cơ Xương Khớp - Bệnh viện Bạch Mai, Bệnh viện Hữu nghị Việt Đức, Bệnh Viện E.</li>
          </ul>
        </p>
      </div>

      {doctors.map((doctor) => {
        const workingDates = [
          ...new Set(doctor.schedules.map((s) => s.working_date)),
        ]
          .filter(
            (date) =>
              new Date(date) >= new Date(todayString) &&
              new Date(date) <= new Date(maxDateString)
          )
          .sort((a, b) => new Date(a) - new Date(b));

        return (
          <div key={doctor.id} className="flex gap-6 bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="w-1/2 flex items-center gap-4">
              <img
                src={doctor.doctor_avatar || "https://via.placeholder.com/100"}
                alt={doctor.doctor_name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <YeuThich />
              <div>
                <h2 className="text-2xl font-bold" style={{ color: '#45c3d2' }}>
                  {doctor.doctor_name}
                </h2>
                <p className="text-gray-700">{doctor.doctor_bio}</p>
                <Link
                  to={`/chitietbacsi/${doctor.id}`}
                  className="mt-4 inline-block !text-blue-500 hover:underline"
                >
                  Xem thêm
                </Link>
              </div>
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 font-semibold mb-2">Chọn ngày khám:</label>
              <select
                className="w-full p-2 border rounded-md mb-4"
                value={selectedDates[doctor.id] || ""}
                onChange={(e) =>
                  setSelectedDates((prev) => ({
                    ...prev,
                    [doctor.id]: e.target.value,
                  }))
                }
              >
                <option value="">Chọn ngày</option>
                {workingDates.map((date) => (
                  <option key={date} value={date}>
                    {formatDate(date)}
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-4 gap-3">
                {doctor.schedules
                  .filter((s) => s.working_date === selectedDates[doctor.id])
                  .flatMap((schedule) =>
                    generateTimeSlots(schedule).map((slot) => (
                      <button
                        key={slot.id}
                        className="p-2 rounded-lg bg-blue-100 border hover:border-blue-500 hover:shadow-md"
                        onClick={() =>
                          handleBooking(
                            doctor.id,
                            selectedDates[doctor.id],
                            slot.time_start,
                            schedule.id
                          )
                        }
                      >
                        {slot.time_start} - {slot.time_end}
                      </button>
                    ))
                  )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ServiceDetail;
