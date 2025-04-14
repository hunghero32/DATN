import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Radio,
  Button,
  Card,
  Typography,
  Row,
  Col,
  Divider,
  Alert,
  message,
  Badge
} from "antd";
import api from "../../../ultils/api/axios";
import axios from "axios";
import { Modal } from "react-bootstrap";  // Bootstrap Modal
import NotificationService from '../../../services/NotificationService';

const { Title, Text } = Typography;

const DatLich = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [bookingData, setBookingData] = useState(null);
  const [systemInfo, setSystemInfo] = useState({});
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const [formData, setFormData] = useState(null);  // Store form data to pass to the modal
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch system info
  useEffect(() => {
    const fetchSystemInfo = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/system");
        const data = response.data;
        if (data) setSystemInfo(data);
        else console.warn("Không có dữ liệu hệ thống");
      } catch (error) {
        console.error("❌ Lỗi khi lấy thông tin hệ thống:", error);
      }
    };

    fetchSystemInfo();
  }, []);

  // Load booking data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('bookingData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (parsedData?.doctor_id && parsedData?.service_id && parsedData?.schedule_id) {
          setBookingData(parsedData);
          setDoctorDetails(parsedData);
        } else {
          message.error("Dữ liệu đặt lịch bị lỗi. Vui lòng đặt lại!");
          navigate("/services");
        }
      } catch (error) {
        message.error("Lỗi dữ liệu. Vui lòng thử lại!");
        navigate("/services");
      }
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    fetchDoctorDetails();
  }, []);

  const fetchDoctorDetails = async () => {
    try {
      const response = await api.get("/api/client/get-temp-booking");
      if (response.data.status === true && response.data.data) {
        setDoctorDetails(response.data.data);
        setBookingData(response.data.data);
        console.log("Doctor details loaded:", response.data.data);
        console.log("Booking data loaded:", bookingData);
      
      }
    } catch (error) {
      // message.error(error.message);
    }
  };

  const handleSubmitBooking = async (values) => {
    setLoading(true);

    try {
      const addressArray = values.address ? values.address.split(',').map(item => item.trim()).filter(Boolean) : [];

      const requestData = {
        guest_name: values.guest_name.trim(),
        guest_phone: values.guest_phone.replace(/\s+/g, ""),
        guest_email: values.guest_email.trim(),
        gender: values.gender,
        birthday: values.birthday,
        address: addressArray,
        doctor_id: parseInt(bookingData.doctor_id),
        service_id: parseInt(bookingData.service_id),
        schedule_id: parseInt(bookingData.schedule_id),
        booking_date: bookingData.date,
        booking_time: bookingData.time,
        total_price: parseFloat(bookingData.price),
        status: "pending"
      };

      const response = await api.post("/api/client/confirm-booking", requestData);
      console.log('Booking response:', response.data); // Log để debug

      if (response.data.status === true) {
        // Gửi thông báo ngay sau khi đặt lịch thành công
        // const notificationData = {
        //   type: 'new_appointment',
        //   title: 'Lịch hẹn mới',
        //   message: `Bạn có lịch hẹn mới từ ${values.guest_name}`,
        //   data: {
        //     bookingId: response.data.data.booking.id, // Lấy ID từ response
        //     guestName: values.guest_name,
        //     guestPhone: values.guest_phone,
        //     bookingDate: bookingData.date,
        //     bookingTime: bookingData.time,
        //     serviceName: bookingData.service_name
        //   },
        //   timestamp: Date.now(),
        //   read: false
        // };
        
        // console.log('Sending notification:', notificationData); // Log để debug
        
        // try {
        //   await NotificationService.sendNotification(
        //     bookingData.doctor_id,
        //     notificationData
        //   );
        //   console.log('Notification sent successfully');
        // } catch (notificationError) {
        //   console.error('Notification error:', notificationError);
        // }
        
        localStorage.removeItem("bookingData");
        navigate("/thongbao");
      }
    } catch (error) {
      console.error('Error:', error);
      message.error(error.response?.data?.message || "Không thể đặt lịch, thử lại sau!");
    } finally {
      setLoading(false);
      handleCloseModal();
    }
  };

  const onFinish = (values) => {
    setFormData(values); // Save form data before opening modal
    setShowModal(true); // Open modal
  };

  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    if (doctorDetails?.id) {
      const unsubscribe = NotificationService.subscribeToNotifications(
        doctorDetails.id,
        (notifications) => {
          setNotifications(notifications);
          setUnreadCount(notifications.filter(n => !n.read).length);
        }
      );

      return () => unsubscribe();
    }
  }, [doctorDetails]);

  const handleMarkAsRead = async (notificationId) => {
    if (doctorDetails?.id) {
      await NotificationService.markAsRead(doctorDetails.id, notificationId);
    }
  };

  return (
    <div className="appointment-container p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg mt-2">
      <Card className="p-4">
        <Title level={3} className="text-blue-600 font-bold mb-2">📅 Đặt lịch khám</Title>

        {/* Thông tin dịch vụ và bác sĩ */}
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <Title level={4} className="text-blue-500 mb-2">{bookingData?.service_name}</Title>
          <Text className="block mb-2">💰 Giá khám: {parseInt(bookingData?.price).toLocaleString()}đ</Text>
          <Text className="block mb-2">⏱️ Thời gian khám: {bookingData?.duration} phút</Text>
          {bookingData?.specialty_name && (
            <Text className="block mb-2">🏥 Chuyên khoa: {bookingData.specialty_name}</Text>
          )}
        </div>

        <Row gutter={24}>
          <Col span={18}>
            <div className="flex items-start space-x-4">
              {bookingData?.doctor_avatar && (
                <img
                  src={bookingData.doctor_avatar.startsWith('http') ? 
                    bookingData.doctor_avatar : 
                    `http://localhost:8000/storage/${bookingData.doctor_avatar}`
                  }
                  alt={bookingData.doctor_name}
                  className="w-20 h-20 rounded-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/100";
                  }}
                />
              )}
              <div>
                <Title level={4} className="text-blue-500 font-semibold mb-2">
                  {bookingData?.doctor_name}
                </Title>
                {bookingData?.doctor_bio && (
                  <Text className="block text-gray-600 mb-2">
                    <div dangerouslySetInnerHTML={{ __html: bookingData.doctor_bio }} />
                  </Text>
                )}
                {bookingData?.doctor_exp && (
                  <Text className="block text-gray-600 mb-2">
                    ✨ Kinh nghiệm: {bookingData.doctor_exp} năm
                  </Text>
                )}
                <Text className="block text-gray-600 mb-2">
                  🕒 Thời gian khám: {bookingData?.date} | {bookingData?.time}
                </Text>
              </div>
            </div>
            <Divider />
            <Text className="block font-semibold">
              🏥 {systemInfo?.site_name || "Tên cơ sở y tế không có"}
            </Text>
            <Text className="block">
              📍 {systemInfo?.address || "Địa chỉ không có"}
            </Text>
            <Text className="block">
              📍 {systemInfo?.site_description || "Không có mô tả!"}
            </Text>
          </Col>
        </Row>
        <Divider />
      </Card>

      <Card className="p-6 mt-6">
  <Form
    form={form}
    layout="vertical"
    initialValues={{
      guest_name: "",
      gender: "",
      guest_phone: "",
      guest_email: "",
      birthday: "",
      address: "",
      reason: ""
    }}
    onFinish={onFinish}
    className="space-y-4"
  >
    <Form.Item name="guest_name" label="👤 Họ và Tên" rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}>
      <Input size="large" placeholder="Nhập họ và tên" className="rounded-lg" />
    </Form.Item>

    <Form.Item name="gender" label="⚧ Giới tính" rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}>
      <Radio.Group className="flex gap-4">
        <Radio.Button value="male">Nam</Radio.Button>
        <Radio.Button value="female">Nữ</Radio.Button>
        <Radio.Button value="other">Khác</Radio.Button>
      </Radio.Group>
    </Form.Item>

    <Form.Item name="guest_phone" label="📞 Số Điện Thoại" rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}>
      <Input size="large" placeholder="Nhập số điện thoại" className="rounded-lg" />
    </Form.Item>

    <Form.Item name="guest_email" label="📧 Email" rules={[{ required: true, type: "email", message: "Vui lòng nhập email hợp lệ" }]}>
      <Input size="large" placeholder="Nhập email" className="rounded-lg" />
    </Form.Item>

    <Form.Item name="birthday" label="🎂 Ngày sinh" rules={[{ required: true, message: "Vui lòng nhập năm sinh" }]}>
      <Input type="date" size="large" className="rounded-lg" />
    </Form.Item>
    <Form.Item name="address" label="🏠 Địa chỉ" rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}>
      <Input.TextArea rows={2} placeholder="Nhập địa chỉ chi tiết" className="rounded-lg" />
    </Form.Item>
    <Divider />
    <Text className="font-semibold text-green-700 text-base">
      💳 Hình thức thanh toán: Thanh toán sau tại cơ sở y tế
    </Text>
    <Divider />

    <Alert
      message="Thông tin bạn nhập sẽ được sử dụng để đặt lịch. Vui lòng kiểm tra trước khi xác nhận."
      type="info"
      showIcon
    />

    <Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        loading={loading}
        block
        size="large"
        className="bg-blue-600 hover:bg-blue-700 border-none text-white rounded-lg font-semibold"
      >
        ✅ Xác nhận đặt lịch
      </Button>
    </Form.Item>
  </Form>
</Card>


      {/* Enhanced Modal Design */}
      <Modal 
        show={showModal} 
        onHide={handleCloseModal}
        centered
        className="fade-in-modal"
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="w-100 text-center">
            <div className="confirmation-header">
              <div className="confirmation-icon">
                <i className="fas fa-calendar-check"></i>
              </div>
              <h4 className="mt-3 confirmation-title">Xác nhận đặt lịch</h4>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 py-4">
          <div className="confirmation-details">
            <div className="info-item">
              <span className="info-label"><i className="fas fa-user"></i> Họ tên:</span>
              <span className="info-value">{formData?.guest_name}</span>
            </div>
            <div className="info-item">
              <span className="info-label"><i className="fas fa-phone"></i> SĐT:</span>
              <span className="info-value">{formData?.guest_phone}</span>
            </div>
            <div className="info-item">
              <span className="info-label"><i className="fas fa-envelope"></i> Email:</span>
              <span className="info-value">{formData?.guest_email}</span>
            </div>
            <div className="info-item">
              <span className="info-label"><i className="fas fa-map-marker-alt"></i> Địa chỉ:</span>
              <span className="info-value">{formData?.address}</span>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0 justify-content-center gap-2 pb-4">
          <button className="btn-modal btn-cancel" onClick={handleCloseModal}>
            <i className="fas fa-times"></i> Trở về
          </button>
          <button className="btn-modal btn-confirm" onClick={() => handleSubmitBooking(formData)}>
            <i className="fas fa-check"></i> Xác nhận
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DatLich;
