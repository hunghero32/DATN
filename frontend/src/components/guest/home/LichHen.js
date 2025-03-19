import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, XCircle, Loader, Clock, Calendar } from "lucide-react";
import api from "../../../ultils/api/axios";

const LichHen = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get("/api/client/appointments");
        if (!response.data.status) {
          setError(response.data.message);
        } else {
          setAppointments(response.data.data);
        }
      } catch (error) {
        setError("Lỗi khi lấy danh sách lịch hẹn.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Lịch Hẹn Đã Đặt
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader className="w-10 h-10 animate-spin text-blue-500" />
          <span className="ml-2 text-gray-600 text-lg">Đang tải...</span>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 text-lg font-semibold">
          <XCircle className="w-10 h-10 mx-auto mb-2" />
          {error}
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center text-gray-500 text-lg font-semibold">
          <CalendarCheck className="w-10 h-10 mx-auto mb-2" />
          Bạn chưa có lịch hẹn nào!
        </div>
      ) : (
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {appointments.map((appointment) => (
            <motion.div
              key={appointment.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden p-5 mb-6 border border-gray-200"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={appointment.doctor_avatar || "https://via.placeholder.com/100"}
                  alt={appointment.doctor_name}
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Bệnh nhân: {appointment.guest_name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Bác sĩ:{" "}
                    <span className="text-blue-600 font-medium">
                      {appointment.doctor_name}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Nơi khám:{" "}
                    <span className="font-medium">
                      Phòng khám Đa khoa SIM Medical Center
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Lý do khám: {appointment.notes || "Không có"}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 border-t border-gray-200 pt-3">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium">
                    {appointment.booking_time}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">{appointment.booking_date}</span>
                </div>
                <span className="px-3 py-1 text-sm rounded-lg font-semibold text-white bg-yellow-500">
                  Đã đặt khám
                </span>
              </div>

              <div className="mt-3 text-right text-blue-600 text-sm font-medium cursor-pointer">
                <a href="#">Hướng dẫn đi khám</a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default LichHen;
