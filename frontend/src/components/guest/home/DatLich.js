import React, { useState } from "react";
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
} from "antd";
import axios from "axios";
import "./DatLich.css";

const { Title, Text } = Typography;

const DatLich = () => {
  const [loading, setLoading] = useState(false);
  const [tempBookingId, setTempBookingId] = useState(null);
  const createTempBooking = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/client/temp-booking", {
        specialty_id: 11,
        doctor_id: 11,
        schedule_id: 3,
        date: "2025-03-12",
        service_id: 196,
        time: "10:30",
      });
  
      console.log("Phản hồi từ API temp-booking:", response.data); // Log toàn bộ response để kiểm tra
  
      if (response.data && response.data.booking_id) {
        setTempBookingId(response.data.booking_id);
        sessionStorage.setItem("temp_booking_id", response.data.booking_id);
        console.log("Booking ID đã lưu vào sessionStorage:", response.data.booking_id);
        message.success("Booking tạm thời đã được tạo!");
      } else {
        console.error("API không trả về booking ID! Response:", response.data);
        message.error("API không trả về booking ID! Hãy kiểm tra dữ liệu.");
        throw new Error("Không nhận được booking ID từ API.");
      }
    } catch (error) {
      console.error("Lỗi khi tạo booking tạm thời:", error.response?.data || error.message);
      message.error("Có lỗi xảy ra khi tạo booking tạm thời.");
    }
  };
  
  

  const onFinish = async (values) => {
    const tempBookingId = sessionStorage.getItem("temp_booking_id"); // Lấy booking ID đã lưu
  
    console.log("temp_booking_id lấy từ sessionStorage trước khi gửi API:", tempBookingId); // Ghi log để kiểm tra
  
    if (!tempBookingId) {
      message.error("Không tìm thấy booking tạm thời! Vui lòng tạo booking tạm thời trước.");
      return;
    }
  
    setLoading(true);
    try {
      const birthday = `${values.birthday}-01-01`;
  
      const formattedData = {
        guest_name: values.guest_name,
        gender: values.gender,
        birthday: birthday,
        guest_phone: values.guest_phone,
        guest_email: values.guest_email,
        address: {
          city: values.city || "",
          district: values.district || "",
          street: values.address || "",
        },
        notes: values.reason,
        temp_booking_id: tempBookingId, // Gửi ID booking tạm thời
      };
  
      console.log("Dữ liệu gửi lên API confirm-booking:", formattedData);
  
      const response = await axios.post("http://localhost:8000/api/client/confirm-booking", formattedData);
      message.success("Đặt lịch thành công!");
    } catch (error) {
      console.error("Lỗi gửi API:", error.response?.data || error.message);
      message.error(error.response?.data?.message || "Có lỗi xảy ra! Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };
  

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
        <Button onClick={createTempBooking} className="mb-4 bg-green-500 text-white p-2 rounded-md">
          Tạo Booking Tạm Thời
        </Button>
        
        <Form layout="vertical" onFinish={onFinish} className="space-y-4">
          <Form.Item name="guest_name" label="Họ và Tên" rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}> 
            <Input placeholder="Nhập họ và tên" className="w-full p-2 border border-gray-300 rounded-md" />
          </Form.Item>
          
          <Form.Item name="gender" label="Giới tính" rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}> 
            <Radio.Group className="flex space-x-4">
              <Radio value="male">Nam</Radio>
              <Radio value="female">Nữ</Radio>
              <Radio value="other">Khác</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="guest_phone" label="Số Điện Thoại" rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}> 
            <Input placeholder="Nhập số điện thoại" className="w-full p-2 border border-gray-300 rounded-md" />
          </Form.Item>

          <Form.Item name="guest_email" label="Email" rules={[{ required: true, type: "email", message: "Vui lòng nhập đúng email!" }]}> 
            <Input placeholder="Nhập email" className="w-full p-2 border border-gray-300 rounded-md" />
          </Form.Item>

          <Form.Item name="birthday" label="Năm sinh" rules={[{ required: true, message: "Vui lòng nhập năm sinh!" }]}> 
            <Input type="number" placeholder="Nhập năm sinh (VD: 1990)" className="w-full p-2 border border-gray-300 rounded-md" />
          </Form.Item>

          <Form.Item name="address" label="Địa chỉ">
            <Input placeholder="Nhập địa chỉ" className="w-full p-2 border border-gray-300 rounded-md" />
          </Form.Item>

          <Form.Item name="reason" label="Lý do khám">
            <Input.TextArea rows={3} placeholder="Nhập lý do khám" className="w-full p-2 border border-gray-300 rounded-md" />
          </Form.Item>

          <Divider />
          <Text className="font-semibold">💳 Hình thức thanh toán: Thanh toán sau tại cơ sở y tế</Text>
          <Divider />

          <Alert message="Thông tin anh/chị cung cấp sẽ được sử dụng làm hồ sơ khám bệnh, vui lòng kiểm tra kỹ trước khi xác nhận." type="info" showIcon className="mb-4" />

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block className="bg-yellow-500 border-none text-white font-semibold p-2 rounded-md">
              Xác nhận đặt khám
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default DatLich;