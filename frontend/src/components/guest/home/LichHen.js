import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import api from "../../../ultils/api/axios";
import { Modal } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LichHen = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedbackData, setFeedbackData] = useState({
    rating: 5,
    comments: "",
    service_id: null,
  });
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const nav = useNavigate()
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/client/feedbacks", {
        service_id: selectedAppointment.service_id,
        booking_id: selectedAppointment.id,
        rating: feedbackData.rating,
        comments: feedbackData.comments,
        status: "pending",
        guest_id: selectedAppointment.guest_id
      });
      
      if (response.data.status) {
        toast.success("Đánh giá đã được gửi thành công!");
        setShowFeedbackModal(false);
        setTimeout(() => {
        nav('/danhgia')
        }, 2000);
      } else {
        toast.error(response.data.message || "Không thể gửi đánh giá");
      }
    } catch (error) {
      console.error("Error details:", error.response?.data);
      toast.error(error.response?.data?.message || "Đã xảy ra lỗi khi gửi đánh giá");
    }
  };

  useEffect(() => {
    api
      .get("/api/client/appointments")
      .then((response) => {
        if (response.data.status) {
          setAppointments(response.data.data);
          console.log("Appointments data:", response.data.data);
        } else {
          setError(response.data.message);
        }
      })
      .catch(() => setError("Lỗi khi lấy danh sách lịch hẹn."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto mt-4 p-6 min-h-screen">
      <ToastContainer position="top-right" />
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
        <div className="flex mt-2 flex-col items-center">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-2xl p-5 mb-5 border border-gray-200"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={`http://localhost:8000/storage/${appointment.doctor_avatar}`}
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
                    className={`ml-2 px-2 py-1 rounded text-sm ${appointment.status === "completed"
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

                {appointment.status === "completed" && (
                  <div className="mt-4 flex gap-3">
                    <Link
                      to={`/hoadon/${appointment.id}`}
                      className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
                    >
                      <i className="ri-file-text-line mr-2"></i> Xem Hóa Đơn
                    </Link>

                    <Link
                      to={`/ketqua/${appointment.id}`}
                      className="inline-block px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
                    >
                      <i className="ri-clipboard-line mr-2"></i> Xem Kết Quả
                    </Link>
                    {!appointment.has_feedback && (
                      <button
                        onClick={() => {
                          setSelectedAppointment({
                            ...appointment,
                            id: appointment.id,
                            service_id: appointment.service_id,
                            guest_id: appointment.guest_id  // Add guest_id
                          });
                          setFeedbackData({
                            rating: 5,
                            comments: "",
                          });
                          setShowFeedbackModal(true);
                        }}
                        className="inline-block px-4 py-2 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700 transition"
                      >
                        <i className="ri-star-line mr-2"></i> Đánh giá
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal đánh giá */}
      {showFeedbackModal && (
        <Modal
          show={showFeedbackModal}
          onHide={() => setShowFeedbackModal(false)}
          centered
        >
          <Modal.Header closeButton className="border-0 pb-0">
            <Modal.Title className="w-100 text-center">
              <i className="ri-star-line text-4xl text-purple-600"></i>
              <h4 className="mt-3 font-semibold">Đánh giá dịch vụ</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="px-4 py-4">
            <div className="mb-3">
              <p><strong>Bác sĩ:</strong> {selectedAppointment?.doctor_name}</p>
              <p><strong>Dịch vụ:</strong> {selectedAppointment?.service_name}</p>
            </div>
            <div className="mb-3">
              <label className="block mb-1">Đánh giá (số sao):</label>
              <select
                className="w-full border rounded p-2"
                value={feedbackData.rating}
                onChange={(e) =>
                  setFeedbackData({
                    ...feedbackData,
                    rating: parseInt(e.target.value),
                  })
                }
              >
                {[5, 4, 3, 2, 1].map((rate) => (
                  <option key={rate} value={rate}>
                    {rate} sao
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="block mb-1">Nội dung đánh giá:</label>
              <textarea
                className="w-full border rounded p-2"
                rows="3"
                value={feedbackData.comments}
                onChange={(e) =>
                  setFeedbackData({ ...feedbackData, comments: e.target.value })
                }
              ></textarea>
            </div>
          </Modal.Body>
          <Modal.Footer className="border-0 justify-center">
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => setShowFeedbackModal(false)}
            >
              Hủy
            </button>
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              onClick={handleFeedbackSubmit}
            >
              Gửi đánh giá
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default LichHen;
