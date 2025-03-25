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
  message
} from "antd";
import api from "../../../ultils/api/axios";

const { Title, Text } = Typography;

const DatLich = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('bookingData');
    if (storedData) {
        try {
            const parsedData = JSON.parse(storedData);
            if (parsedData?.doctor_id && parsedData?.service_id && parsedData?.schedule_id) {
                setBookingData(parsedData);
                setDoctorDetails(parsedData); // Set doctor details directly from localStorage
            } else {
                console.error("❌ Dữ liệu bookingData không hợp lệ:", parsedData);
                message.error("Dữ liệu đặt lịch bị lỗi. Vui lòng đặt lại!");
                navigate("/services");
            }
        } catch (error) {
            console.error("❌ Lỗi parse dữ liệu bookingData:", error);
            message.error("Lỗi dữ liệu. Vui lòng thử lại!");
            navigate("/services");
        }
    } else {
        message.error("Không tìm thấy thông tin đặt lịch!");
        navigate("/services");
    }
}, []);

// Remove or comment out the fetchDoctorDetails function and its useEffect
  const [doctorDetails, setDoctorDetails] = useState(null);

  useEffect(() => {
    fetchDoctorDetails();
  }, []);

  const fetchDoctorDetails = async () => {
    try {
      console.log("lay ra du lieu !")
        const response = await api.get("/api/client/get-temp-booking");
        console.log("API Response:", response.data);
        
        if (response.data.status === true && response.data.data) {
            setDoctorDetails(response.data.data);
            setBookingData(response.data.data);
        } else {
            throw new Error(response.data.message || "Không tìm thấy thông tin đặt lịch tạm thời");
        }
    } catch (error) {
        console.error("❌ Lỗi lấy thông tin bác sĩ:", error);
        message.error(error.message);
        // navigate("/services");
    }
};

  // Hàm xác nhận đặt lịch
  const onFinish = async (values) => {
    setLoading(true);
    // Kiểm tra bookingData có đầy đủ không
    if (!bookingData || !bookingData.doctor_id || !bookingData.service_id || !bookingData.schedule_id) {
      console.error("❌ Thiếu dữ liệu quan trọng trong bookingData:", bookingData);
      message.error("Dữ liệu đặt lịch không hợp lệ. Vui lòng thử lại!");
      return;
  }
  
    try {
      const requestData = {
        guest_name: values.guest_name.trim(),
        guest_phone: values.guest_phone.replace(/\s+/g, ""), // Xóa khoảng trắng
        guest_email: values.guest_email,
        gender: values.gender,
        birthday: values.birthday,
        address: values.address.split(","), // Chuyển chuỗi thành mảng bằng dấu phẩy
        doctor_id: bookingData.doctor_id,
        service_id: bookingData.service_id,
        schedule_id: bookingData.schedule_id,
        booking_date: new Date(bookingData.date).toISOString().split('T')[0],
        booking_time: bookingData.time,
        total_price: bookingData.price,
        status: "pending",
      };
  
      console.log("📤 Gửi dữ liệu:", requestData);
  
      const response = await api.post("/api/client/confirm-booking", requestData);
  
      console.log("📥 Phản hồi API:", response.data);
  
      if (response.data.status) {
        message.success("🎉 Đặt lịch thành công!");
        localStorage.removeItem("bookingData");
        navigate("/thongbao");
      } else {
        throw new Error(response.data.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("❌ Lỗi:", error);
      message.error(error.response?.data?.message || "Không thể đặt lịch, thử lại sau!");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="appointment-container p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <Card className="p-4">
        <Title level={3} className="text-blue-600 font-bold mb-2">📅 Đặt lịch khám</Title>
        
        {/* Thông tin dịch vụ và bác sĩ */}
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <Title level={4} className="text-blue-500 mb-2">{bookingData?.service_name}</Title>
          <Text className="block mb-2">💰 Giá khám: {parseInt(bookingData?.price).toLocaleString()}đ</Text>
          <Text className="block mb-2">⏱️ Thời gian khám: {bookingData?.duration} phút</Text>
          {bookingData?.specialty_name && (
            <Text className="block mb-2">🏥 Chuyên khoa: {bookingData?.specialty_name}</Text>
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
                  onError={(e) => { e.target.src = "https://via.placeholder.com/150" }}
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
            <Text className="block font-semibold">🏥 Phòng khám Spinetech Clinic</Text>
            <Text className="block">📍 Tòa nhà GP, 257 Giải Phóng, Phương Mai, Đống Đa, Hà Nội</Text>
          </Col>
        </Row>
        <Divider />
      </Card>

      <Card className="p-6 mt-6">
        <Form form={form} layout="vertical" initialValues={{
    guest_name: "",
    gender: "",
    guest_phone: "",
    guest_email: "",
    birthday: "",
    address: "",
    reason: ""
}}  onFinish={onFinish}>
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

<Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}>
    <Input placeholder="Nhập địa chỉ" />
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
    </div>
  );
};

export default DatLich;
