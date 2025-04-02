import { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/register", values);
      toast.success("Đăng ký thành công! Đang chuyển hướng...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      message.error(error.response?.data?.message || "Đăng ký thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-full max-w-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Đăng Ký</h2>
        <Form layout="vertical" onFinish={handleRegister}>
          <Form.Item label="Họ và tên" name="name" rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}> 
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Vui lòng nhập email hợp lệ!" }]}> 
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}> 
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          <Form.Item label="Xác nhận mật khẩu" name="password_confirmation" dependencies={["password"]} 
            rules={[{ required: true, message: "Vui lòng nhập lại mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}> 
            <Input.Password placeholder="Nhập lại mật khẩu" />
          </Form.Item>

          <button
            type="submit"
            style={{
              borderRadius: '30px',
              padding: '12px 40px',
            }}
            className="w-full bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Đăng Ký"}
          </button>
        </Form>
        <p className="text-center mt-4 text-sm">
          Đã có tài khoản? <a href="/login" className="!text-blue-600 font-semibold">Đăng nhập ngay</a>
        </p>
      </Card>
    </div>
  );
};

export default Register;
