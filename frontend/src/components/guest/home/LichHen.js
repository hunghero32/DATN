import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import api from "../../../ultils/api/axios";

const LichHen = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/client/appointments")
      .then((response) => {
        if (response.data.status) {
          setAppointments(response.data.data); 
        } else {
          setError(response.data.message);
        }
      })
      .catch(() => setError("Lỗi khi lấy danh sách lịch hẹn.")) // Xử lý lỗi
      .finally(() => setLoading(false)); // Hoàn tất
  }, []);

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Lịch Hẹn Đã Đặt
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <i className="ri-loader-2-line animate-spin text-blue-500 text-4xl"></i>
          <span className="ml-2 text-gray-600 text-lg">Đang tải...</span>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 text-lg font-semibold">
          <i className="ri-error-warning-line text-4xl"></i>
          {error}
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center text-gray-500 text-lg font-semibold">
          <i className="ri-calendar-line text-4xl"></i>
          Bạn chưa có lịch hẹn nào!
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-2xl p-5 mb-5 border border-gray-200"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={appointment.doctor_avatar}
                  alt={appointment.doctor_name}
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div>
                  <h3 className="text-lg font-semibold text-blue-600">
                    {appointment.doctor_name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {appointment.service_name}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 mt-3 pt-3">
                <p>
                  <i className="ri-user-line text-blue-500"></i>
                  <strong> Khách hàng:</strong> {appointment.guest_name} (
                  {appointment.guest_phone})
                </p>
                <p>
                  <i className="ri-calendar-line text-blue-500"></i>
                  <strong> Ngày đặt:</strong> {appointment.booking_date}
                </p>
                <p>
                  <i className="ri-time-line text-blue-500"></i>
                  <strong> Giờ:</strong> {appointment.booking_time}
                </p>
                <p>
                  <i className="ri-file-list-3-line text-blue-500"></i>
                  <strong> Ghi chú:</strong> {appointment.notes || "Không có"}
                </p>
                <p>
                  <i className="ri-checkbox-circle-line text-blue-500"></i>
                  <strong> Trạng thái:</strong>
                  <span
                    className={`ml-2 px-2 py-1 rounded text-sm ${
                      appointment.status === "completed"
                        ? "bg-green-500 text-white"
                        : appointment.status === "confirmed"
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {appointment.status === "completed"
                      ? "Hoàn thành"
                      : appointment.status === "confirmed"
                      ? "Đã xác nhận"
                      : "Chờ xác nhận"}
                  </span>
                </p>

                {/* Hiển thị nút "Xem Hóa Đơn" nếu trạng thái là "completed" */}
                {appointment.status === "completed" && (
                  <div className="mt-4">
                    <Link
                      to={`/hoadon`}
                      className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
                    >
                      <i className="ri-file-text-line mr-2"></i> Xem Hóa Đơn
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LichHen;
