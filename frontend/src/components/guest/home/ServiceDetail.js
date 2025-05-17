import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { message, Rate } from "antd";
import api from "../../../ultils/api/axios";
import { StarFilled } from '@ant-design/icons';
import ChuotChay from "../../loadding/chuotchay";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ServiceDetail = () => {
  // Add this new state at the top with other states
  const [expandedBios, setExpandedBios] = useState({});
  const [expandedDescription, setExpandedDescription] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDates, setSelectedDates] = useState({});
  const [averageRating, setAverageRating] = useState(null);

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);
  const todayString = today.toISOString().split("T")[0];
  const maxDateString = maxDate.toISOString().split("T")[0];

  const getDefaultDate = (dates) => {
    if (dates.includes(todayString)) return todayString;
    return dates[0] || "";
  };

  // Add this new state
  const [doctorRatings, setDoctorRatings] = useState({});

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/api/client/detail-service/${id}`);
        if (data?.services_name) {
          setService(data);
          setDoctors(data.doctors || []);

          // Fetch doctor ratings after setting doctors
          const ratingPromises = data.doctors.map(doctor => 
            api.get(`/api/client/feedbacks/doctor/${doctor.id}`)
          );
          const responses = await Promise.all(ratingPromises);
          const ratings = {};
          responses.forEach((response, index) => {
            if (response.data?.average_rating !== undefined) {
              ratings[data.doctors[index].id] = response.data.average_rating;
            }
          });
          setDoctorRatings(ratings);

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

    const fetchAverageRating = async () => {
      try {
        const { data } = await api.get(`/api/client/feedbacks/service/${id}`);
        if (data?.average_rating !== undefined) {
          setAverageRating(data.average_rating);
        }
      } catch (error) {
        console.error("Không thể lấy đánh giá:", error);
      }
    };

    if (id) {
      fetchServiceDetail();
      fetchAverageRating();
    }
  }, [id]);

  const generateTimeSlots = (schedule) => {
    const slots = [];
    let startTime = new Date(`1970-01-01T${schedule.time_start}`);
    const endTime = new Date(`1970-01-01T${schedule.time_end}`);
    const duration = service?.duration || 30;

    const isToday = selectedDates[schedule.doctor_id] === todayString;
    const currentTime = new Date();

    while (startTime < endTime) {
      const slotEnd = new Date(startTime.getTime() + duration * 60000);
      if (slotEnd > endTime) break;

      if (isToday) {
        const slotTime = new Date();
        slotTime.setHours(startTime.getHours(), startTime.getMinutes());
        if (slotTime < currentTime) {
          startTime.setMinutes(startTime.getMinutes() + duration);
          continue;
        }
      }

      slots.push({
        id: `${schedule.id}-${startTime.toTimeString().slice(0, 5)}`,
        time_start: startTime.toTimeString().slice(0, 5),
        time_end: slotEnd.toTimeString().slice(0, 5),
        scheduleId: schedule.id // Add this line
      });
      startTime.setMinutes(startTime.getMinutes() + duration);
    }
    return slots;
  };

  const handleBooking = async (doctorId, date, time, scheduleId) => {
    // Check for authentication token first
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error("Vui lòng đăng nhập để đặt lịch!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored"
      });
      // navigate('/login'); // Redirect to login page
      return;
    }

    if (!doctorId || !date || !time || !scheduleId) {
      toast.error("Vui lòng chọn ngày và giờ trước khi đặt lịch!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored"
      });
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
        toast.error(response.data.message || "Có lỗi xảy ra. Vui lòng thử lại!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored"
        });
      }
    } catch (error) {
      console.error("Lỗi API:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Vui lòng đăng nhập trước khi đặt lịch!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored"
      });
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

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <ChuotChay/>
      <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
    </div>
  );
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!service) return <p className="text-center text-gray-500">Không có dữ liệu.</p>;

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-6xl">
      <ToastContainer />
      <div className="bg-gray-100 p-4 sm:p-6 rounded-lg mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-800">{service.services_name}</h2>
          {averageRating !== null && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Đánh giá dịch vụ:</span>
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <StarFilled
                    key={index}
                    style={{
                      color: index < averageRating ? '#fadb14' : '#e8e8e8',
                      fontSize: '16px',
                      marginRight: '2px'
                    }}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({averageRating.toFixed(1)})
              </span>
            </div>
          )}
        </div>

        <p className="text-gray-700 mt-2">
          <b>Danh sách bác sĩ uy tín đầu ngành chuyên khoa {service.services_name} tại Việt Nam:</b>
        </p>
        <div className="mt-4">
          <div dangerouslySetInnerHTML={{ 
            __html: expandedDescription 
              ? service.description 
              : service.description?.substring(0, 300) + '...' 
          }} />
          {service.description?.length > 300 && (
            <button
              onClick={() => setExpandedDescription(!expandedDescription)}
              className="text-blue-500 hover:text-blue-700 font-medium mt-2"
            >
              {expandedDescription ? 'Ẩn bớt' : 'Xem thêm'}
            </button>
          )}
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Giá dịch vụ: <span className="text-red-600 font-bold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.price)}</span></p>
          
          </div>
          <p className="font-semibold mt-2">Thời gian khám: {service.duration} phút</p>
        </div>
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
          <div key={doctor.id} className="flex flex-col lg:flex-row gap-4 sm:gap-6 bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="w-full lg:w-1/2 flex flex-col sm:flex-row items-start gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={doctor.doctor_avatar ?
                    (doctor.doctor_avatar.startsWith('http') ?
                      doctor.doctor_avatar :
                      `http://localhost:8000/storage/${doctor.doctor_avatar}`
                    )
                    : "https://via.placeholder.com/100"}
                  alt={doctor.doctor_name}
                  className="w-24 h-24 rounded-full object-cover flex-shrink-0"
                />
              </div>
              <div className="text-left w-full">
                <h2 className="text-xl sm:text-2xl font-bold" style={{ color: '#45c3d2' }}>
                  {doctor.doctor_name}
                </h2>
                <div className="text-sm sm:text-base text-gray-700">
                  <div dangerouslySetInnerHTML={{ 
                    __html: expandedBios[doctor.id] 
                      ? doctor.doctor_bio 
                      : doctor.doctor_bio?.substring(0, 150) + '...' 
                  }} />
                  {doctor.doctor_bio?.length > 150 && (
                    <button
                      onClick={() => setExpandedBios(prev => ({
                        ...prev,
                        [doctor.id]: !prev[doctor.id]
                      }))}
                      className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                      {expandedBios[doctor.id] ? 'Ẩn bớt' : 'Xem thêm'}
                    </button>
                  )}
                </div>
                {/* Update the service rating display */}
                
                {/* Update the doctor rating display */}
                {doctorRatings[doctor.id] !== undefined && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-gray-600">Đánh giá bác sĩ:</span>
                    <div className="flex">
                      {[...Array(5)].map((_, index) => (
                        <StarFilled
                          key={index}
                          style={{
                            color: index < doctorRatings[doctor.id] ? '#fadb14' : '#e8e8e8',
                            fontSize: '16px',
                            marginRight: '2px'
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({doctorRatings[doctor.id].toFixed(1)})
                    </span>
                  </div>
                )}
                <Link
                  to={`/chitietbacsi/${doctor.id}`}
                  className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                >
                  Xem chi tiết thông tin bác sĩ
                </Link>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
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

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                {(() => {
                  const filteredSchedules = doctor.schedules
                    .filter((s) => s.working_date === selectedDates[doctor.id]);
                  
                  const allSlots = filteredSchedules.flatMap(schedule => generateTimeSlots(schedule));
                  
                  if (allSlots.length === 0) {
                    return (
                      <div className="col-span-full text-center text-red-500 p-2">
                        Đã hết thời gian làm việc trong ngày
                      </div>
                    );
                  }

                  return allSlots.map((slot) => (
                    <button
                      key={slot.id}
                      className="p-2 rounded-lg bg-blue-100 border hover:border-blue-500 hover:shadow-md"
                      onClick={() =>
                        handleBooking(
                          doctor.id,
                          selectedDates[doctor.id],
                          slot.time_start,
                          slot.scheduleId // Now this will have the correct schedule ID
                        )
                      }
                    >
                      {slot.time_start} - {slot.time_end}
                    </button>
                  ));
                })()}
              </div>
            </div>
          </div>
        );
      })}
      
    </div>
  );
};

export default ServiceDetail;
