import { useState } from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Title, Text, Link } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/register", values);
      toast.success("Đăng ký thành công! Đang chuyển hướng...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Đăng ký thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const values = form.getFieldsValue();
    let hasError = false;

    if (!values.name) {
      toast.error("Vui lòng nhập họ tên!");
      hasError = true;
    }

    if (!values.email) {
      toast.error("Vui lòng nhập email!");
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      toast.error("Email không hợp lệ!");
      hasError = true;
    }

    if (!values.password) {
      toast.error("Vui lòng nhập mật khẩu!");
      hasError = true;
    }

    if (!values.password_confirmation) {
      toast.error("Vui lòng nhập lại mật khẩu!");
      hasError = true;
    } else if (values.password !== values.password_confirmation) {
      toast.error("Mật khẩu không khớp!");
      hasError = true;
    }

    if (!hasError) {
      handleRegister(values);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 16,
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Card
        style={{
          width: 420,
          padding: "24px 32px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: 12,
        }}
        bordered={false}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: 32 }}>
          Đăng Ký
        </Title>

        <Form form={form} layout="vertical">
          <Form.Item label="Họ và tên" name="name">
            <Input placeholder="Nhập họ và tên" size="large" />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input placeholder="Nhập email" size="large" />
          </Form.Item>

          <Form.Item label="Mật khẩu" name="password">
            <Input.Password placeholder="Nhập mật khẩu" size="large" />
          </Form.Item>

          <Form.Item label="Xác nhận mật khẩu" name="password_confirmation">
            <Input.Password placeholder="Nhập lại mật khẩu" size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              onClick={handleSubmit}
              block
              loading={loading}
              size="large"
              style={{
                backgroundColor: "#00E5BE",
                borderColor: "#00E5BE",
                fontWeight: 600,
                width: "100%",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
              onMouseLeave={(e) => (e.target.style.opacity = "1")}
            >
              {loading ? "Đang xử lý..." : "Đăng Ký"}
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center", marginTop: 24 }}>
            <Text>Đã có tài khoản? </Text>
            <Link href="/login" style={{ color: "#00E5BE" }}>
              Đăng nhập ngay
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
