import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListSchedule = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false); // New state for details modal
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [scheduleData, setScheduleData] = useState(null);
  const [bookingsData, setBookingsData] = useState(null); // New state for bookings data
  const [today, setToday] = useState(new Date());

  const navigate = useNavigate();

  const getAuthToken = () => localStorage.getItem("authToken");

  const getShiftLabel = (timeStart) => {
    const [hours] = timeStart.split(":").map(Number);
    if (hours < 12) return "Ca Sáng";
    else if (hours >= 12 && hours < 17) return "Ca Chiều";
    else return "Ca Tối";
  };
  


  useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true);
      const token = getAuthToken();

      if (!token) {
        setError("Vui lòng đăng nhập để tiếp tục.");
        setLoading(false);
        navigate("/login");
        return;
      }

      try {
        const month = currentMonth.getMonth() + 1;
        const year = currentMonth.getFullYear();

        const response = await axios.get("http://127.0.0.1:8000/api/doctor/schedules", {
          params: { month, year },
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (response.data && Array.isArray(response.data.data)) {
          const parsedSchedules = response.data.data.map((schedule) => {
            const maxPatients = Number(schedule.max_patients);
            return {
              ...schedule,
              max_patients: isNaN(maxPatients) ? 10 : maxPatients,
            };
          });
          setSchedules(parsedSchedules);
        } else {
          setSchedules([]);
        }
      } catch (err) {
        if (err.response) {
          if (err.response.status === 401) {
            setError("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
            navigate("/login");
          } else if (err.response.status === 403) {
            setError("Bạn không có quyền truy cập.");
          } else {
            setError(err.response.data.message || "Lỗi khi tải dữ liệu!");
          }
        } else {
          setError("Không thể kết nối đến server!");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [currentMonth, navigate]);

  const fetchScheduleByDate = async (working_date) => {
    const token = getAuthToken();
    if (!token) {
      toast.error("Vui lòng đăng nhập để tiếp tục!");
      return null;
    }

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/doctor/schedules/${working_date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.data && response.data.data && response.data.data.schedule.length > 0) {
        const schedule = response.data.data.schedule[0];
        return {
          id: schedule.id,
          working_date: schedule.working_date,
          time_start: schedule.time_start.slice(0, 5),
          time_end: schedule.time_end.slice(0, 5),
          max_patients: Number(schedule.max_patients),
          status: schedule.status,
        };
      }
      return null;
    } catch (err) {
      toast.error(err.response?.data?.message || "Lỗi khi lấy chi tiết lịch!");
      return null;
    }
  };

  const fetchBookingsByDate = async (working_date) => {
    const token = getAuthToken();
    if (!token) {
      toast.error("Vui lòng đăng nhập để tiếp tục!");
      return;
    }

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/doctor/schedules/${working_date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.data && response.data.data) {
        setBookingsData({
          schedule: response.data.data.schedule,
          bookings: response.data.data.bookings,
          total_bookings: response.data.data.total_bookings,
          completed_bookings: response.data.data.completed_bookings,
        });
        setIsDetailsOpen(true);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Lỗi khi lấy chi tiết đặt lịch!");
    }
  };

  const calendarData = () => {
    if (loading || error || !schedules.length) return [[]];

    const month = currentMonth.getMonth();
    const year = currentMonth.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const weeks = [];
    let currentWeek = [];
    const adjustedFirstDay = (firstDayOfMonth + 6) % 7;

    for (let i = 0; i < adjustedFirstDay; i++) {
      currentWeek.push({ date: null, events: [], status: 1 });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const dateEvents = schedules
        .filter((s) => s.working_date === dateStr)
        .map((s) => ({
          title: getShiftLabel(s.time_start),
          time: `${s.time_start.slice(0, 5)} - ${s.time_end.slice(0, 5)}`,
          color: s.status === 0 ? "gray" : "purple",
          status: s.status,
        }));

      currentWeek.push({ date: day, events: dateEvents, status: dateEvents[0]?.status ?? 1 });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({ date: null, events: [], status: 1 });
      }
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const weekDays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  const handleAddNew = () => {
    setIsOpen(true);
  };

  const toggleModal = () => setIsOpen(!isOpen);

  const toggleEditModal = () => setIsEditOpen(!isEditOpen);

  const toggleDetailsModal = () => setIsDetailsOpen(!isDetailsOpen);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    setSelectedDate(null);
  };

  const handleDayClick = async (day) => {
    if (!day.date) return;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day.date);
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    setSelectedDate(date);

    const scheduleDetails = await fetchScheduleByDate(dateStr);
    if (scheduleDetails) {
      setScheduleData(scheduleDetails);
    } else {
      setScheduleData({
        working_date: dateStr,
        time_start: "08:00",
        time_end: "17:00",
        max_patients: 10,
        status: 1,
      });
    }
    setIsEditOpen(true);
  };

  const handleCreateSchedule = async (e) => {
    e.preventDefault();
    const token = getAuthToken();
    if (!token) {
      toast.error("Vui lòng đăng nhập để tạo lịch!");
      return;
    }

    const startTime = new Date(`1970-01-01T${scheduleData.time_start}:00`);
    const endTime = new Date(`1970-01-01T${scheduleData.time_end}:00`);
    if (endTime <= startTime) {
      toast.error("Thời gian kết thúc phải sau thời gian bắt đầu!");
      return;
    }

    try {
      const month = currentMonth.getMonth() + 1;
      const year = currentMonth.getFullYear();

      const response = await axios.post(
        "http://127.0.0.1:8000/api/doctor/schedules",
        {
          time_start: scheduleData.time_start,
          time_end: scheduleData.time_end,
          max_patients: parseInt(scheduleData.max_patients),
          month: month,
          year: year,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Tạo lịch làm việc thành công!");

        const schedulesResponse = await axios.get("http://127.0.0.1:8000/api/doctor/schedules", {
          params: { month, year },
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (schedulesResponse.data && Array.isArray(schedulesResponse.data.data)) {
          const parsedSchedules = schedulesResponse.data.data.map((schedule) => ({
            ...schedule,
            max_patients: Number(schedule.max_patients),
          }));
          setSchedules(parsedSchedules);
        }

        setIsOpen(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Lỗi khi tạo lịch!");
    }
  };

  const handleUpdateSchedule = async (e) => {
    e.preventDefault();
    const token = getAuthToken();
    if (!token) {
      toast.error("Vui lòng đăng nhập để cập nhật lịch!");
      return;
    }

    const startTime = new Date(`1970-01-01T${scheduleData.time_start}:00`);
    const endTime = new Date(`1970-01-01T${scheduleData.time_end}:00`);
    if (endTime <= startTime) {
      toast.error("Thời gian kết thúc phải sau thời gian bắt đầu!");
      return;
    }

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/doctor/schedules/${scheduleData.working_date}`,
        {
          time_start: scheduleData.time_start,
          time_end: scheduleData.time_end,
          max_patients: parseInt(scheduleData.max_patients),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Cập nhật lịch làm việc thành công!");

        const month = currentMonth.getMonth() + 1;
        const year = currentMonth.getFullYear();
        const schedulesResponse = await axios.get("http://127.0.0.1:8000/api/doctor/schedules", {
          params: { month, year },
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (schedulesResponse.data && Array.isArray(schedulesResponse.data.data)) {
          const parsedSchedules = schedulesResponse.data.data.map((schedule) => ({
            ...schedule,
            max_patients: Number(schedule.max_patients),
          }));
          setSchedules(parsedSchedules);
        }

        setIsEditOpen(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Lỗi khi cập nhật lịch!");
    }
  };

  const handleLeaveSchedule = async () => {
    const token = getAuthToken();
    if (!token) {
      toast.error("Vui lòng đăng nhập để xin nghỉ!");
      return;
    }

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/doctor/schedules/leave/${scheduleData.working_date}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Yêu cầu nghỉ thành công!");

        const month = currentMonth.getMonth() + 1;
        const year = currentMonth.getFullYear();
        const schedulesResponse = await axios.get("http://127.0.0.1:8000/api/doctor/schedules", {
          params: { month, year },
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (schedulesResponse.data && Array.isArray(schedulesResponse.data.data)) {
          const parsedSchedules = schedulesResponse.data.data.map((schedule) => ({
            ...schedule,
            max_patients: Number(schedule.max_patients),
          }));
          setSchedules(parsedSchedules);
        }

        setIsEditOpen(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Lỗi khi xin nghỉ!");
    }
  };

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "5rem", fontFamily: "Arial, sans-serif", color: "#d9534f" }}>
        {error}
      </div>
    );
  }

  const monthNames = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
  ];
  const dayNames = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  const displayMonth = `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;

  const selectedDayInfo = selectedDate
    ? `${dayNames[selectedDate.getDay()]}, ${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`
    : "";

  const isToday = (day) => {
    if (!day.date) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day.date);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day) => {
    if (!day.date || !selectedDate) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day.date);
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  return (
    <div
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#333", margin: 0 }}>
            Lịch Làm Việc Bác Sĩ
          </h2>
          {selectedDayInfo && (
            <p style={{ marginTop: "0.5rem", color: "#666", fontSize: "1rem" }}>
              {selectedDayInfo}
            </p>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "1rem",
              fontWeight: 500,
            }}
          >
            <button
              style={{ border: "none", background: "none", padding: "0", marginRight: "0.5rem" }}
              onClick={handlePrevMonth}
            >
              &lt;
            </button>
            <span>{displayMonth}</span>
            <button
              style={{ border: "none", background: "none", padding: "0", marginLeft: "0.5rem" }}
              onClick={handleNextMonth}
            >
              &gt;
            </button>
          </div>
          <button
            style={{
              borderRadius: "4px",
              padding: "6px 12px",
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#212529",
              color: "white",
              border: "none",
            }}
            onClick={handleAddNew}
          >
            <span style={{ marginRight: "5px", fontWeight: "bold" }}>+</span> Thêm Lịch
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              width: "100%",
              maxWidth: "500px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px 20px",
                backgroundColor: "#f8f9fa",
                borderBottom: "1px solid #dee2e6",
              }}
            >
              <h5 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 500 }}>
                Thêm Lịch Làm Việc
              </h5>
              <button
                style={{
                  border: "none",
                  background: "none",
                  fontSize: "1.5rem",
                  color: "#6c757d",
                  cursor: "pointer",
                }}
                onClick={toggleModal}
              >
                ×
              </button>
            </div>
            <div style={{ padding: "20px" }}>
              <form onSubmit={handleCreateSchedule}>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    htmlFor="month"
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: 500,
                      color: "#333",
                    }}
                  >
                    Tháng
                  </label>
                  <select
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "4px",
                      border: "1px solid #ced4da",
                      fontSize: "1rem",
                      color: "#495057",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#007bff")}
                    onBlur={(e) => (e.target.style.borderColor = "#ced4da")}
                    id="month"
                    value={currentMonth.getMonth() + 1}
                    disabled
                  >
                    {monthNames.map((month, index) => (
                      <option key={index} value={index + 1}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    htmlFor="year"
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: 500,
                      color: "#333",
                    }}
                  >
                    Năm
                  </label>
                  <input
                    type="number"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "4px",
                      border: "1px solid #ced4da",
                      fontSize: "1rem",
                      color: "#495057",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#007bff")}
                    onBlur={(e) => (e.target.style.borderColor = "#ced4da")}
                    id="year"
                    value={currentMonth.getFullYear()}
                    disabled
                  />
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    htmlFor="time_start"
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: 500,
                      color: "#333",
                    }}
                  >
                    Thời gian bắt đầu
                  </label>
                  <input
                    type="time"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "4px",
                      border: "1px solid #ced4da",
                      fontSize: "1rem",
                      color: "#495057",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#007bff")}
                    onBlur={(e) => (e.target.style.borderColor = "#ced4da")}
                    id="time_start"
                    value={scheduleData?.time_start || "08:00"}
                    onChange={(e) => setScheduleData({ ...scheduleData, time_start: e.target.value })}
                    required
                  />
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    htmlFor="time_end"
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: 500,
                      color: "#333",
                    }}
                  >
                    Thời gian kết thúc
                  </label>
                  <input
                    type="time"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "4px",
                      border: "1px solid #ced4da",
                      fontSize: "1rem",
                      color: "#495057",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#007bff")}
                    onBlur={(e) => (e.target.style.borderColor = "#ced4da")}
                    id="time_end"
                    value={scheduleData?.time_end || "17:00"}
                    onChange={(e) => setScheduleData({ ...scheduleData, time_end: e.target.value })}
                    required
                  />
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    htmlFor="max_patients"
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: 500,
                      color: "#333",
                    }}
                  >
                    Số bệnh nhân tối đa
                  </label>
                  <input
                    type="number"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "4px",
                      border: "1px solid #ced4da",
                      fontSize: "1rem",
                      color: "#495057",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#007bff")}
                    onBlur={(e) => (e.target.style.borderColor = "#ced4da")}
                    id="max_patients"
                    value={scheduleData?.max_patients || 10}
                    onChange={(e) => setScheduleData({ ...scheduleData, max_patients: e.target.value })}
                    min="0"
                    max="10"
                    required
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                  <button
                    type="button"
                    style={{
                      padding: "10px 20px",
                      borderRadius: "4px",
                      border: "1px solid #ced4da",
                      backgroundColor: "#f8f9fa",
                      color: "#6c757d",
                      fontSize: "1rem",
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                    }}
                    onClick={toggleModal}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#e9ecef")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#f8f9fa")}
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: "10px 20px",
                      borderRadius: "4px",
                      border: "none",
                      backgroundColor: "#007bff",
                      color: "white",
                      fontSize: "1rem",
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
                  >
                    Tạo Lịch
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {isEditOpen && scheduleData && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              width: "100%",
              maxWidth: "500px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px 20px",
                backgroundColor: "#f8f9fa",
                borderBottom: "1px solid #dee2e6",
              }}
            >
              <h5 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 500 }}>
                Sửa Lịch Làm Việc - {selectedDayInfo}
              </h5>
              <button
                style={{
                  border: "none",
                  background: "none",
                  fontSize: "1.5rem",
                  color: "#6c757d",
                  cursor: "pointer",
                }}
                onClick={toggleEditModal}
              >
                ×
              </button>
            </div>
            <div style={{ padding: "20px" }}>
              <form onSubmit={handleUpdateSchedule}>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    htmlFor="edit_shift"
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: 500,
                      color: "#333",
                    }}
                  >
                    Ca làm việc
                  </label>
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "4px",
                      border: "1px solid #ced4da",
                      fontSize: "1rem",
                      color: "#495057",
                      outline: "none",
                      transition: "border-color 0.2s",
                      backgroundColor: "#f8f9fa",
                    }}
                    id="edit_shift"
                    value={getShiftLabel(scheduleData.time_start)}
                    disabled
                  />
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    htmlFor="edit_time_start"
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: 500,
                      color: "#333",
                    }}
                  >
                    Thời gian bắt đầu
                  </label>
                  <input
                    type="time"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "4px",
                      border: "1px solid #ced4da",
                      fontSize: "1rem",
                      color: "#495057",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#007bff")}
                    onBlur={(e) => (e.target.style.borderColor = "#ced4da")}
                    id="edit_time_start"
                    value={scheduleData.time_start}
                    onChange={(e) => setScheduleData({ ...scheduleData, time_start: e.target.value })}
                    required
                    disabled={scheduleData.status === 0}
                  />
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    htmlFor="edit_time_end"
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: 500,
                      color: "#333",
                    }}
                  >
                    Thời gian kết thúc
                  </label>
                  <input
                    type="time"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "4px",
                      border: "1px solid #ced4da",
                      fontSize: "1rem",
                      color: "#495057",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#007bff")}
                    onBlur={(e) => (e.target.style.borderColor = "#ced4da")}
                    id="edit_time_end"
                    value={scheduleData.time_end}
                    onChange={(e) => setScheduleData({ ...scheduleData, time_end: e.target.value })}
                    required
                    disabled={scheduleData.status === 0}
                  />
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    htmlFor="edit_max_patients"
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: 500,
                      color: "#333",
                    }}
                  >
                    Số bệnh nhân tối đa
                  </label>
                  <input
                    type="number"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "4px",
                      border: "1px solid #ced4da",
                      fontSize: "1rem",
                      color: "#495057",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#007bff")}
                    onBlur={(e) => (e.target.style.borderColor = "#ced4da")}
                    id="edit_max_patients"
                    value={scheduleData.max_patients}
                    onChange={(e) => setScheduleData({ ...scheduleData, max_patients: e.target.value })}
                    min="0"
                    max="10"
                    required
                    disabled={scheduleData.status === 0}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                  <button
                    type="button"
                    style={{
                      padding: "10px 20px",
                      borderRadius: "4px",
                      border: "1px solid #ced4da",
                      backgroundColor: "#f8f9fa",
                      color: "#6c757d",
                      fontSize: "1rem",
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                    }}
                    onClick={toggleEditModal}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#e9ecef")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#f8f9fa")}
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    style={{
                      padding: "10px 20px",
                      borderRadius: "4px",
                      border: "none",
                      backgroundColor: "#28a745",
                      color: "white",
                      fontSize: "1rem",
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                    }}
                    onClick={() => fetchBookingsByDate(scheduleData.working_date)}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
                  >
                    Xem Chi Tiết
                  </button>
                  {scheduleData.status !== 0 && (
                    <>
                      <button
                        type="button"
                        style={{
                          padding: "10px 20px",
                          borderRadius: "4px",
                          border: "none",
                          backgroundColor: "#dc3545",
                          color: "white",
                          fontSize: "1rem",
                          cursor: "pointer",
                          transition: "background-color 0.2s",
                        }}
                        onClick={handleLeaveSchedule}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#c82333")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
                      >
                        Xin Nghỉ
                      </button>
                      <button
                        type="submit"
                        style={{
                          padding: "10px 20px",
                          borderRadius: "4px",
                          border: "none",
                          backgroundColor: "#007bff",
                          color: "white",
                          fontSize: "1rem",
                          cursor: "pointer",
                          transition: "background-color 0.2s",
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
                      >
                        Cập Nhật
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

{isDetailsOpen && bookingsData && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1050,
    }}
  >
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        width: "100%",
        maxWidth: "500px", // Adjusted to match the image width
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 20px",
          backgroundColor: "#f8f9fa",
          borderBottom: "1px solid #dee2e6",
        }}
      >
        <h5 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 500 }}>
          Chi Tiết Lịch Làm Việc - {selectedDayInfo}
        </h5>
        <button
          style={{
            border: "none",
            background: "none",
            fontSize: "1.5rem",
            color: "#6c757d",
            cursor: "pointer",
          }}
          onClick={toggleDetailsModal}
        >
          ×
        </button>
      </div>
      <div style={{ padding: "20px" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <h6 style={{ fontWeight: 500, color: "#333", marginBottom: "10px" }}>
            Thông Tin Lịch
          </h6>
          {bookingsData.schedule.length > 0 ? (
            <div>
              <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>
                <strong>Thời gian:</strong>{" "}
                {bookingsData.schedule[0].time_start.slice(0, 5)} -{" "}
                {bookingsData.schedule[0].time_end.slice(0, 5)}
              </p>
              <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>
                <strong>Số bệnh nhân tối đa:</strong>{" "}
                {bookingsData.schedule[0].max_patients}
              </p>
              <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>
                <strong>Trạng thái:</strong>{" "}
                {bookingsData.schedule[0].status === 0 ? "Nghỉ" : "Làm việc"}
              </p>
            </div>
          ) : (
            <p style={{ fontSize: "0.9rem", color: "#666" }}>
              Không có lịch làm việc trong ngày này.
            </p>
          )}
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <h6 style={{ fontWeight: 500, color: "#333", marginBottom: "10px" }}>
            Danh Sách Đặt Lịch ({bookingsData.total_bookings} tổng,{" "}
            {bookingsData.completed_bookings} hoàn thành)
          </h6>
          {bookingsData.bookings.length > 0 ? (
            bookingsData.bookings.map((booking) => (
              <div
                key={booking.id}
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>
                  <strong>Bệnh nhân:</strong> {booking.guest.guest_name}
                </p>
                <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>
                  <strong>Thời gian đặt:</strong>{" "}
                  {new Date(booking.created_at).toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}{" "}
                  {new Date(booking.created_at).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
                <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>
                  <strong>Ngày đặt lịch:</strong> {booking.booking_date}
                </p>
                <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>
                  <strong>Thời gian khám:</strong>{" "}
                  {booking.booking_time.slice(0, 5)}
                </p>
                <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>
                  <strong>Ghi chú:</strong>{" "}
                  {booking.notes || "Không có ghi chú"}
                </p>
              </div>
            ))
          ) : (
            <p style={{ fontSize: "0.9rem", color: "#666" }}>
              Không có đặt lịch trong ngày này.
            </p>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            style={{
              padding: "10px 20px",
              borderRadius: "4px",
              border: "1px solid #ced4da",
              backgroundColor: "#f8f9fa",
              color: "#6c757d",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onClick={toggleDetailsModal}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#e9ecef")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#f8f9fa")}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", marginBottom: "10px" }}>
        {weekDays.map((day, index) => (
          <div
            key={index}
            style={{
              padding: "10px",
              fontWeight: 500,
              color: "#666",
              backgroundColor: today.getDay() === (index + 1) % 7 ? "#ff6347" : "transparent",
              color: today.getDay() === (index + 1) % 7 ? "white" : "#666",
              borderRadius: "4px",
            }}
          >
            {day}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {loading ? (
          <div style={{ textAlign: "center" }}>Đang tải dữ liệu...</div>
        ) : schedules.length === 0 ? (
          <div style={{ textAlign: "center", color: "#666" }}>
            Không có lịch làm việc trong tháng này. Vui lòng thêm lịch mới!
          </div>
        ) : (
          calendarData().map((week, weekIndex) => (
            <div key={weekIndex} style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "10px" }}>
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  style={{
                    minHeight: "120px",
                    border: isToday(day)
                      ? "2px solid #ff6347"
                      : isSelected(day)
                      ? "2px solid #007bff"
                      : "1px solid #eee",
                    borderRadius: "4px",
                    padding: "8px",
                    position: "relative",
                    cursor: day.date ? "pointer" : "default",
                    backgroundColor: day.status === 0 ? "#6c757d" : "white",
                    color: day.status === 0 ? "white" : "inherit",
                  }}
                  onClick={() => handleDayClick(day)}
                >
                  {day.date ? (
                    <>
                      <div style={{ fontSize: "0.875rem", color: day.status === 0 ? "white" : "#666", marginBottom: "8px" }}>
                        {day.date}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                        {day.events.map((event, eventIndex) => (
                          <div
                            key={eventIndex}
                            style={{
                              padding: "8px",
                              borderRadius: "4px",
                              fontSize: "0.75rem",
                              backgroundColor:
                                event.color === "purple"
                                  ? "#e6e6fa"
                                  : event.color === "orange"
                                  ? "#fff0e6"
                                  : event.color === "green"
                                  ? "#e6ffe6"
                                  : "#6c757d",
                              color:
                                event.color === "purple"
                                  ? "#6a5acd"
                                  : event.color === "orange"
                                  ? "#ff7f50"
                                  : event.color === "green"
                                  ? "#4caf50"
                                  : "white",
                            }}
                          >
                            <div style={{ fontWeight: 500, marginBottom: "2px" }}>{event.title}</div>
                            <div style={{ fontSize: "0.7rem", opacity: 0.8 }}>{event.time}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListSchedule;