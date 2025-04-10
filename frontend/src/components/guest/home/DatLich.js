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
      }
    } catch (error) {
      message.error(error.message);
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
        const notificationData = {
          type: 'new_appointment',
          title: 'Lịch hẹn mới',
          message: `Bạn có lịch hẹn mới từ ${values.guest_name}`,
          data: {
            bookingId: response.data.data.booking.id, // Lấy ID từ response
            guestName: values.guest_name,
            guestPhone: values.guest_phone,
            bookingDate: bookingData.date,
            bookingTime: bookingData.time,
            serviceName: bookingData.service_name
          },
          timestamp: Date.now(),
          read: false
        };

        console.log('Sending notification:', notificationData); // Log để debug
        
        try {
          await NotificationService.sendNotification(
            bookingData.doctor_id,
            notificationData
          );
          console.log('Notification sent successfully');
        } catch (notificationError) {
          console.error('Notification error:', notificationError);
        }

        message.success('Đặt lịch thành công!');
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
                  src={bookingData.doctor_avatar}
                  alt={bookingData.doctor_name}
                  className="w-20 h-20 rounded-full object-cover"
                  
                />
              )}
              <div>
                <Title level={4} className="text-blue-500 font-semibold mb-2">
                  {bookingData?.doctor_name}
                </Title>
                {bookingData?.doctor_bio && (
                  <Text className="block text-gray-600 mb-2">{bookingData.doctor_bio}</Text>
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
        >
          <Form.Item name="guest_name" label="Họ và Tên" rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}>
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>

          <Form.Item name="gender" label="Giới tính" rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}>
            <Radio.Group>
              <Radio value="male" style={{ marginRight: "10px" }}>Nam</Radio>
              <Radio value="female" style={{ marginRight: "10px" }}>Nữ</Radio>
              <Radio value="other" style={{ marginRight: "10px" }}>Khác</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="guest_phone" label="Số Điện Thoại" rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}>
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item name="guest_email" label="Email" rules={[{ required: true, type: "email", message: "Vui lòng nhập email hợp lệ" }]}>
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item name="birthday" label="Năm sinh" rules={[{ required: true, message: "Vui lòng nhập năm sinh" }]}>
            <Input type="date" />
          </Form.Item>

          <Form.Item 
            name="address" 
            label="Địa chỉ" 
            rules={[
              { required: true, message: "Vui lòng nhập địa chỉ" },
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve();
                  const parts = value.split(',').map(item => item.trim()).filter(Boolean);
                  if (parts.length < 2) {
                    return Promise.reject('Vui lòng nhập đầy đủ địa chỉ (ít nhất 2 phần, phân cách bằng dấu phẩy)');
                  }
                  return Promise.resolve();
                }
              }
            ]}
            extra="Nhập địa chỉ chi tiết, phân cách bằng dấu phẩy (,). Ví dụ: 123 Đường ABC, Phường XYZ, Quận 1, TP.HCM"
          >
            <Input.TextArea 
              placeholder="Nhập địa chỉ (phân cách bằng dấu phẩy)" 
              autoSize={{ minRows: 2, maxRows: 4 }}
            />
          </Form.Item>

          <Divider />
          <Text className="font-semibold">💳 Hình thức thanh toán: Thanh toán sau tại cơ sở y tế</Text>
          <Divider />

          <Alert message="Thông tin bạn nhập sẽ được sử dụng để đặt lịch. Vui lòng kiểm tra trước khi xác nhận." type="info" showIcon />

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block className="bg-blue-500 border-none text-white p-2 rounded-md">
              ✅ Xác nhận đặt lịch
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* Bootstrap Modal for confirmation */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title className="bg-warning">Xác nhận đặt lịch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn có chắc chắn muốn đặt lịch với thông tin sau?</p>
          <p><strong>Họ tên:</strong> {formData?.guest_name}</p>
          <p><strong>SĐT:</strong> {formData?.guest_phone}</p>
          <p><strong>Email:</strong> {formData?.guest_email}</p>
          <p><strong>Địa chỉ:</strong> {formData?.address}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="btn btn-warning" onClick={handleCloseModal}>Trở về</Button>
          <Button variant="primary"  className="btn btn-danger" onClick={() => handleSubmitBooking(formData)}>Xác nhận</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DatLich;
