import React, { useState } from "react";
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
  message
} from "antd";
import api from "../../../ultils/api/axios";

const { Title, Text } = Typography;

const DatLich = () => {
  const { serviceId } = useParams(); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const [bookingId, setBookingId] = useState(null);

  const createTempBooking = async () => {
    try {
      const response = await api.post("/client/temp-booking", {
        specialty_id: 11,
        doctor_id: 5,
        schedule_id: 3,
        date: "2025-03-14",
        service_id: serviceId,
        time: "10:30",
      });
  
      if (response.data.status) {
        setBookingId(response.data.data.booking_id);  // Lưu lại booking_id
        sessionStorage.setItem("temp_booking_id", response.data.data.booking_id);
        message.success("✔ Tạo Booking Tạm Thời Thành Công!");
      }
    } catch (error) {
      console.error("❌ Lỗi tạo booking tạm thời:", error);
      message.error("Không thể tạo booking tạm thời.");
    }
  };
  
  
  const onFinish = async (values) => {
    const storedBookingId = sessionStorage.getItem("temp_booking_id");
    if (!storedBookingId) {
      message.error("❌ Không tìm thấy booking tạm thời!");
      return;
    }
  
    try {
      const response = await api.post("/client/confirm-booking", {
        guest_name: values.guest_name,
        gender: values.gender,
        birthday: values.birthday,
        guest_phone: values.guest_phone,
        guest_email: values.guest_email,
        address: values.address,
        notes: values.reason || "",
        temp_booking_id: storedBookingId  // Gửi booking_id lên API
      });
  
      if (response.data.status) {
        message.success("🎉 Đặt lịch thành công!");
      } else {
        message.error("⚠️ Có lỗi xảy ra: " + response.data.message);
      }
    } catch (error) {
      console.error("❌ Lỗi API:", error.response?.data || error);
      message.error("Có lỗi xảy ra khi đặt lịch!");
    }
  };
  
  
  
  
  {bookingId && (
    <div>
      <h4>Mã Booking Tạm Thời: {bookingId}</h4>
    </div>
  )}
  
  
  return (
    
    <div className="appointment-container p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <Card className="p-4">
        <Title level={3} className="text-blue-600 font-bold">📅 Đặt lịch khám</Title>
        <Row gutter={24}>
          <Col span={18}>
            <Title level={4} className="text-blue-500 font-semibold">
              PGS. TS. BSCKII. TTUT Vũ Văn Hòe
            </Title>
            <Text className="block font-semibold">🏥 Phòng khám Spinetech Clinic</Text>
            <Text className="block">📍 Tòa nhà GP, 257 Giải Phóng, Phương Mai, Đống Đa, Hà Nội</Text>
          </Col>
        </Row>
        <Divider />
        <Text className="text-orange-500 font-bold text-lg">💰 Giá khám: 500.000đ</Text>
      </Card>

      <Card className="p-6 mt-6">
        <Form 
          form={form}
          layout="vertical" 
          onFinish={onFinish} 
          className="space-y-4"
        >
          <Form.Item name="guest_name" label="Họ và Tên" rules={[{ required: true }]}>
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>

          <Form.Item name="gender" label="Giới tính" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value="male">Nam</Radio>
              <Radio value="female">Nữ</Radio>
              <Radio value="other">Khác</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="guest_phone" label="Số Điện Thoại" rules={[{ required: true }]}>
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item name="guest_email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item name="birthday" label="Năm sinh" rules={[{ required: true }]}>
            <Input type="number" placeholder="Nhập năm sinh (VD: 1990)" />
          </Form.Item>

          <Form.Item name="address" label="Địa chỉ">
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>

          <Form.Item name="reason" label="Lý do khám">
            <Input.TextArea rows={3} placeholder="Nhập lý do khám" />
          </Form.Item>

          <Divider />
          <Text className="font-semibold">💳 Hình thức thanh toán: Thanh toán sau tại cơ sở y tế</Text>
          <Divider />

          <Alert message="Thông tin bạn nhập sẽ được sử dụng để đặt lịch. Vui lòng kiểm tra trước khi xác nhận." type="info" showIcon />

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block className="bg-yellow-500 border-none text-white p-2 rounded-md">
              ✅ Xác nhận đặt lịch
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default DatLich;