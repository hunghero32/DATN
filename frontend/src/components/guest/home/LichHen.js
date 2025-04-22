import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import api from "../../../ultils/api/axios";
import { Modal } from 'react-bootstrap';

const LichHen = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedbackData, setFeedbackData] = useState({
    rating: 5,
    comments: "",
    service_id: null
  });
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if appointment is completed
      console.log("aponeneeenene" , appointments);
      console.log("feedbakcdata " , feedbackData);
      console.log("feedbakcdatađasđas " , feedbackData.service_id);
      // if (feedbackData !== 1) {
      //   alert("Chỉ có thể đánh giá cho các lịch hẹn đã hoàn thành!");
      //   return;
      // }
  
      // Validate service_id before submission
      // if (!feedbackData?.service_id) {
      //   alert("Không tìm thấy thông tin dịch vụ!");
      //   return;
      // }
  
      const response = await api.post(
        "/api/client/feedbacks",
        {
          service_id: feedbackData.service_id,
          rating: feedbackData.rating,
          comments: feedbackData.comments || "Không có nhận xét",
          status: 'pending',
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    console.log("responsedsdsadsad ", response);
      
      if (response.data.status) {
        alert("Đánh giá đã được gửi thành công!");
        setShowFeedbackModal(false);
        setFeedbackData({
          rating: 5,
          comments: "",
          service_id: null
        });
        // Refresh the appointments list to update the feedback status
        window.location.reload();
      } else {
        alert(response.data.message || "Không thể gửi đánh giá");
      }
    } catch (error) {
      console.error("Feedback submission error:", error.response?.data);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || "Đã xảy ra lỗi khi gửi đánh giá";
      alert(errorMessage);
    }
  };

  useEffect(() => {
    api.get("/api/client/appointments")
      .then((response) => {
        if (response.data.status) {
          setAppointments(response.data.data);
          // Debug log to check appointment data structure
          console.log("Appointments data:", response.data.data);
        } else {
          setError(response.data.message);
        }
      })

      .catch(() => setError("Lỗi khi lấy danh sách lịch hẹn.")) // Xử lý lỗi
      .finally(() => setLoading(false)); // Hoàn tất
  }, []);

  return (
    <div className="container mx-auto mt-4 p-6 min-h-screen">
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

                {/* Hiển thị nút "Xem Hóa Đơn" nếu trạng thái là "completed" */}
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
                          console.log('Selected appointment:', appointment);
                          setSelectedAppointment(appointment);
                          setFeedbackData(prevState => ({
                            ...prevState,
                            service_id: appointment.id,
                            comments: ""
                          }));
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
      {showFeedbackModal && (
        <Modal 
          show={showFeedbackModal} 
          onHide={() => setShowFeedbackModal(false)}
          centered
          className="fade-in-modal"
        >
          <Modal.Header closeButton className="border-0 pb-0">
            <Modal.Title className="w-100 text-center">
              <div className="confirmation-header">
                <div className="confirmation-icon">
                  <i className="ri-star-line text-4xl text-purple-600"></i>
                </div>
                <h4 className="mt-3 confirmation-title">Đánh giá dịch vụ</h4>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="px-4 py-4">
            <div className="confirmation-details">
              <div className="info-item mb-4">
                <span className="info-label">
                  <i className="ri-user-line"></i> Bác sĩ:
                </span>
                <span className="info-value">{selectedAppointment?.doctor_name}</span>
              </div>
              <div className="info-item mb-4">
                <span className="info-label">
                  <i className="ri-service-line"></i> Dịch vụ:
                </span>
                <span className="info-value">{selectedAppointment?.service_name}</span>
              </div>
              <div className="info-item mb-4">
                <label className="block text-gray-700 mb-2">
                  <i className="ri-star-line"></i> Đánh giá:
                </label>
                <select
                  className="w-full border rounded p-2"
                  value={feedbackData.rating}
                  onChange={(e) => setFeedbackData({...feedbackData, rating: parseInt(e.target.value)})}
                >
                  {[5,4,3,2,1].map(num => (
                    <option key={num} value={num}>{num} sao</option>
                  ))}
                </select>
              </div>
              <div className="info-item">
                <label className="block text-gray-700 mb-2">
                  <i className="ri-message-2-line"></i> Nhận xét:
                </label>
                <textarea
                  className="w-full border rounded p-2"
                  value={feedbackData.comments}
                  onChange={(e) => setFeedbackData({...feedbackData, comments: e.target.value})}
                  rows="3"
                  required
                ></textarea>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="border-0 justify-content-center gap-2 pb-4">
            <button 
              className="btn-modal btn-cancel"
              onClick={() => setShowFeedbackModal(false)}
            >
              <i className="ri-close-line"></i> Trở về
            </button>
            <button 
              className="btn-modal btn-confirm"
              onClick={handleFeedbackSubmit}
            >
              <i className="ri-check-line"></i> Gửi đánh giá
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default LichHen;
