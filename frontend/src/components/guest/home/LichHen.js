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
  const [filters, setFilters] = useState({
    search: '',
    booking_date: '',
    status: ''
  });

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
        fetchAppointments();
      } else {
        toast.error(response.data.message || "Không thể hủy lịch hẹn.");
      }
    } catch (error) {
      console.error("Error canceling appointment:", error.response?.data);
      toast.error(error.response?.data?.message || "Đã xảy ra lỗi khi hủy lịch hẹn.");
    }
  };

  const fetchAppointments = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.booking_date) params.append('booking_date', filters.booking_date);
      if (filters.status) params.append('status', filters.status);

      const response = await api.get(`/api/client/appointments?${params.toString()}`);
      if (response.data.status) {
        setAppointments(response.data.data);
        setError("");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Bạn chưa có lịch hẹn !");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [filters]);

  // Update the filter section
  const filterSection = (
    <div className="mb-6 bg-white p-4 md:p-6 rounded-xl shadow-lg">
      {/* Desktop: Vertical layout, Tablet/Mobile: Horizontal layout */}
      <div className="block md:hidden">
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            className="flex-1 p-2 text-sm border rounded"
            placeholder="Tìm kiếm theo tên bác sĩ, dịch vụ..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          />
          <button className="p-2 bg-blue-600 text-white rounded">
            <i className="ri-search-line"></i>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="date"
            className="flex-1 p-2 text-sm border rounded"
            value={filters.booking_date}
            onChange={(e) => setFilters(prev => ({ ...prev, booking_date: e.target.value }))}
          />
          <select
            className="flex-1 p-2 text-sm border rounded"
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="">Tất cả</option>
            <option value="pending">Chờ xác nhận</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="completed">Hoàn thành</option>
            <option value="canceled">Đã hủy</option>
          </select>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:block">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tìm kiếm</label>
            <input
              type="text"
              className="w-full p-2 text-sm border rounded"
              placeholder="Tìm kiếm theo tên bác sĩ, dịch vụ..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ngày khám</label>
            <input
              type="date"
              className="w-full p-2 text-sm border rounded"
              value={filters.booking_date}
              onChange={(e) => setFilters(prev => ({ ...prev, booking_date: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
            <select
              className="w-full p-2 text-sm border rounded"
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="">Tất cả</option>
              <option value="pending">Chờ xác nhận</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="completed">Hoàn thành</option>
              <option value="canceled">Đã hủy</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  // Update the main container and cards
  // Update the main container and grid layout
  return (
    <div className="container mx-auto px-4 md:px-6 mt-4 min-h-screen bg-gray-50 max-w-7xl">
      <ToastContainer position="top-right" />
      <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-600 mb-4 md:mb-6">
        Lịch Hẹn Đã Đặt
      </h2>
  
      {filterSection}
  
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <i className="ri-loader-2-line animate-spin text-blue-500 text-3xl md:text-4xl"></i>
          <span className="ml-2 text-gray-600 text-base md:text-lg">Đang tải...</span>
        </div>
      ) : error ? (
        <div className="mt-4 text-center text-red-500 text-base md:text-lg font-semibold">
          {error}
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center text-gray-500 text-base md:text-lg font-semibold">
          <i className="ri-calendar-line text-3xl md:text-4xl"></i>
          Bạn chưa có lịch hẹn nào!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 max-w-md md:max-w-none mx-auto">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 mt-4"
            >
              <div className="p-3 md:p-5">
                <div className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-4">
                  <img
                    src={`http://localhost:8000/storage/${appointment.doctor_avatar}`}
                    alt={appointment.doctor_name}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-blue-100"
                  />
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-blue-600">
                      {appointment.doctor_name}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      {appointment.service_name}
                    </p>
                  </div>
                </div>

                <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
                  <div className="flex items-center text-gray-700">
                    <i className="ri-user-line text-blue-500 w-5"></i>
                    <span className="font-medium mr-2">Khách hàng:</span>
                    <span>{appointment.guest_name}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <i className="ri-phone-line text-blue-500 w-5"></i>
                    <span className="font-medium mr-2">SĐT:</span>
                    <span>{appointment.guest_phone}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <i className="ri-calendar-line text-blue-500 w-5"></i>
                    <span className="font-medium mr-2">Ngày:</span>
                    <span>{new Date(appointment.booking_date).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <i className="ri-time-line text-blue-500 w-5"></i>
                    <span className="font-medium mr-2">Giờ:</span>
                    <span>{appointment.booking_time}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <i className="ri-file-list-3-line text-blue-500 w-5"></i>
                    <span className="font-medium mr-2">Ghi chú:</span>
                    <span>{appointment.notes || "Không có"}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="ri-checkbox-circle-line text-blue-500 w-5"></i>
                    <span className="font-medium mr-2">Trạng thái:</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : appointment.status === "confirmed"
                          ? "bg-yellow-100 text-yellow-800"
                          : appointment.status === "pending"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-red-100 text-red-800"
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
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {appointment.status === "completed" && (
                    <>
                      <Link
                        to={`/hoadon/${appointment.id}`}
                        className="inline-block px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
                      >
                        <i className="ri-file-text-line mr-1 md:mr-2"></i> Xem Hóa Đơn
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
                  {appointment.status === "confirmed" && (
                    <>
                      <Link
                        to={`/hoadon/${appointment.id}`}
                        className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
                      >
                        <i className="ri-file-text-line mr-2"></i> Xem Hóa Đơn
                      </Link>
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
      {/* Modal đánh giá */}
      <Modal
      show={showFeedbackModal}
      onHide={() => setShowFeedbackModal(false)}
      size="md"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Đánh giá dịch vụ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleFeedbackSubmit}>
          <div className="mb-3">
            <label className="font-semibold">Mức độ hài lòng:</label>
            <select
              value={feedbackData.rating}
              onChange={(e) => setFeedbackData({ ...feedbackData, rating: parseInt(e.target.value) })}
              className="w-full mt-1 border rounded px-3 py-2"
            >
              <option value={5}>Rất hài lòng (5 sao)</option>
              <option value={4}>Hài lòng (4 sao)</option>
              <option value={3}>Bình thường (3 sao)</option>
              <option value={2}>Không hài lòng (2 sao)</option>
              <option value={1}>Rất không hài lòng (1 sao)</option>
            </select>
          </div>
    
          <div className="mb-3">
            <label className="font-semibold">Nhận xét:</label>
            <textarea
              value={feedbackData.comments}
              onChange={(e) => setFeedbackData({ ...feedbackData, comments: e.target.value })}
              className="w-full mt-1 border rounded px-3 py-2"
              rows={4}
              placeholder="Viết nhận xét của bạn..."
            ></textarea>
          </div>
    
          <div className="text-right">
            <button
              type="button"
              className="px-4 py-2 mr-2 rounded bg-gray-500 text-white"
              onClick={() => setShowFeedbackModal(false)}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Gửi đánh giá
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
      {/* Modal hủy lịch hẹn */}
      <Modal 
        show={showCancelModal} 
        onHide={() => {
          setShowCancelModal(false);
          setCaptchaValue(null);
          setShowCaptcha(false);
        }}
        size="md"
        className="max-w-[95%] mx-auto"
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
