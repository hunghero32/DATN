import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
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
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const nav = useNavigate();
  const [captchaValue, setCaptchaValue] = useState(null);
  const [showCaptcha, setShowCaptcha] = useState(false);

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
          nav('/danhgia');
        }, 2000);
      } else {
        toast.error(response.data.message || "Không thể gửi đánh giá");
      }
    } catch (error) {
      console.error("Error details:", error.response?.data);
      toast.error(error.response?.data?.message || "Đã xảy ra lỗi khi gửi đánh giá");
    }
  };

  const handleCancel = async () => {
    if (!showCaptcha) {
      setShowCaptcha(true);
      return;
    }
  
    if (!captchaValue) {
      toast.error("Vui lòng xác nhận bạn không phải người máy!");
      return;
    }
  
    try {
      const response = await api.post(`/api/client/cancel-booking/${selectedAppointment.id}`, {
        recaptcha: captchaValue
      });
      if (response.data.status) {
        toast.success("Hủy lịch hẹn thành công!");
        setShowCancelModal(false);
        setCaptchaValue(null);
        setShowCaptcha(false);
        // Refresh appointment list
        api.get("/api/client/appointments")
          .then((res) => {
            if (res.data.status) {
              setAppointments(res.data.data);
            } else {
              setError(res.data.message);
            }
          })
          .catch(() => setError("Lỗi khi làm mới danh sách lịch hẹn."))
          .finally(() => setLoading(false));
      } else {
        toast.error(response.data.message || "Không thể hủy lịch hẹn.");
      }
    } catch (error) {
      console.error("Error canceling appointment:", error.response?.data);
      toast.error(error.response?.data?.message || "Đã xảy ra lỗi khi hủy lịch hẹn.");
    }
  };
  

  useEffect(() => {
    api.get("/api/client/appointments")
      .then((response) => {
        if (response.data.status) {
          setAppointments(response.data.data);
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
              <div className="flex items-center space-x-8">
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
                    Dịch vụ khám: {appointment.service_name}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 mt-3 pt-3">
                <p>
                  <i className="ri-user-line text-blue-500"></i>
                  <strong> Khách hàng:</strong> {appointment.guest_name} ({appointment.guest_phone})
                </p>
                <p>
                  <i className="ri-calendar-line text-blue-500"></i>
                  <strong> Ngày đặt:</strong> {new Date(appointment.booking_date).toLocaleDateString('vi-VN')}
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
                        : appointment.status === "pending"
                        ? "bg-gray-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {appointment.status === "completed"
                      ? "Hoàn thành"
                      : appointment.status === "confirmed"
                      ? "Đã xác nhận"
                      : appointment.status === "pending"
                      ? "Chờ xác nhận"
                      : "Đã hủy"}
                  </span>
                </p>

                <div className="mt-4 flex gap-3">
                  {appointment.status === "completed" && (
                    <>
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
                              guest_id: appointment.guest_id
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
                    </>
                  )}

                  {appointment.status === "pending" && (
                    <button
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setShowCancelModal(true);
                      }}
                      className="inline-block px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
                    >
                      <i className="ri-close-circle-line mr-2"></i> Hủy Lịch Hẹn
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal hủy lịch hẹn */}
      <Modal 
        show={showCancelModal} 
        onHide={() => {
          setShowCancelModal(false);
          setCaptchaValue(null);
          setShowCaptcha(false);
        }}
        size="md"
        style={{ marginTop: '20px' }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận hủy lịch hẹn</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'auto', minHeight: '200px' }}>
          <div className="mb-4">
            <div className="text-center">
              <p className="text-lg font-semibold mb-4">Bạn có chắc chắn muốn hủy lịch hẹn này?</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="mb-2">
                <span className="font-semibold">Dịch vụ:</span> {selectedAppointment?.service_name}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Ngày khám:</span> {selectedAppointment && new Date(selectedAppointment.booking_date).toLocaleDateString('vi-VN')}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Giờ khám:</span> {selectedAppointment?.booking_time}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Bác sĩ:</span> {selectedAppointment?.doctor_name}
              </div>
            </div>

            {showCaptcha && (
              <div className="mt-4 flex justify-center">
                <ReCAPTCHA
                  sitekey="6Lfa2SYrAAAAAE6mHb6ciIy5XGy2N3jm7o3_3TWY"
                  onChange={(value) => setCaptchaValue(value)}
                />
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer style={{ position: 'relative', zIndex: 1000 }}>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => {
              setShowCancelModal(false);
              setCaptchaValue(null);
              setShowCaptcha(false);
            }}
          >
            Không
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={handleCancel}
            disabled={showCaptcha && !captchaValue}
          >
            Có, hủy lịch hẹn
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LichHen;
