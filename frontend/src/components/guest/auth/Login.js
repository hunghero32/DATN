import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";
import { Card, Form, Input, Button } from "antd";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);  // Thêm state cho việc hiển thị mật khẩu
  const navigate = useNavigate();

  // Hàm xử lý đăng nhập
  const handleLogin = async (values) => {
    setError(null);
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email: values.email,
        password: values.password,
      });
      
      const { token, user } = response.data;
      
      // Đảm bảo user object có đầy đủ thông tin
      const userData = {
        ...user,
        id: user.id, // Đảm bảo có id
        role: user.role,
      };

      login(userData, token);

      toast.success("Đăng nhập thành công!", {
        toastId: 'loginSuccess',
        autoClose: 2000
      });

      setTimeout(() => {
        if (userData.role === "doctor") {
          navigate("/doctor");
        } else if (userData.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
        window.location.reload();
      }, 1000);
    } catch (err) {
      setError("Đăng nhập thất bại. Kiểm tra lại thông tin!");
      toast.error("Đăng nhập thất bại. Kiểm tra lại thông tin!", {
        toastId: 'loginError'
      });
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/api/auth/google/redirect";
  };
  const handleGitthubLogin = () => {
    window.location.href = "http://localhost:8000/api/auth/github/redirect";
  };

  const handleFacebookLogin = () => {
    window.location.href = "http://localhost:8000/api/auth/facebook/redirect";
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-full max-w-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Đăng Nhập</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <Form onFinish={handleLogin} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email của bạn!" }]}
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </Form.Item>
          
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              iconRender={(visible) => (
                <span onClick={() => setPasswordVisible(!passwordVisible)}>
                  {passwordVisible ? "Ẩn" : "Hiển thị"}
                </span>
              )}
            />
          </Form.Item>

          <Form.Item>
            <Button
            className="btn btn-warning w-100"
              type="primary"
              htmlType="submit"
              block
              style={{
                borderRadius: "30px",
                padding: "12px 40px",
              }}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        <p className="text-center mt-4 text-sm">
          Chưa có tài khoản? <a href="/register" className="!text-blue-600 font-semibold">Đăng ký ngay</a>
        </p>

        {/* Google login button */}
        <div className="flex justify-center space-x-4 mt-4">
  <div className="text-center">
    <Button
      onClick={handleGoogleLogin}
      className="w-full text-gray-600 hover:text-blue-600 transition-all duration-300"
    >
      <i className="ri-google-fill text-2xl"></i>
    </Button>
  </div>

  <div className="text-center">
    <Button
      onClick={handleGitthubLogin}
      className="w-full text-gray-600 hover:text-blue-600 transition-all duration-300"
    >
      <i className="ri-github-fill text-2xl mb-2"></i>
    </Button>
  </div>

  <div className="text-center">
    <Button
      onClick={handleFacebookLogin}
      className="w-full text-gray-600 hover:text-blue-600 transition-all duration-300"
    >
      <i className="ri-facebook-fill text-2xl mb-2"></i>
    </Button>
  </div>
</div>


        <p className="text-center mt-2 text-sm">
          Quên mật khẩu? <a href="/forgot-password" className="!text-blue-600 font-semibold">Khôi phục mật khẩu</a>
        </p>
      </Card>
    </div>
  );
};

export default Login;
