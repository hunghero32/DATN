import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./AuthContext";
import { Card, Form, Input, Button, Typography } from "antd";

const { Title, Text, Link } = Typography;

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email: values.email,
        password: values.password,
      });

      const { token, user } = response.data;

      const userData = {
        ...user,
        id: user.id,
        role: user.role,
      };

      login(userData, token);

      toast.success("Đăng nhập thành công!", {
        toastId: "loginSuccess",
        icon: "✅",
        autoClose: 2000,
      });

      setTimeout(() => {
        if (userData.role === "doctor") {
          navigate("/doctor");
        } else if (userData.role === "admin") {
          navigate("/chat-support");
        } else {
          navigate("/");
        }
        window.location.reload();
      }, 1000);
    } catch (err) {
      toast.error("Đăng nhập thất bại. Kiểm tra lại thông tin!", {
        toastId: "loginError",
        icon: "⚠️",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = async () => {
    const values = form.getFieldsValue();
    let hasError = false;

    if (!values.email) {
      toast.error("Vui lòng nhập email!", {
        toastId: "emailError",
        icon: "📧",
      });
      hasError = true;
    }

    if (!values.password) {
      toast.error("Vui lòng nhập mật khẩu!", {
        toastId: "passwordError",
        icon: "🔒",
      });
      hasError = true;
    }

    if (!hasError) {
      handleLogin(values);
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
        newestOnTop={false}
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
          Đăng Nhập
        </Title>

        <Form form={form} layout="vertical">
          <Form.Item label="Email" name="email">
            <Input
              placeholder="Nhập email của bạn"
              size="large"
              style={{ marginBottom: "4px" }}
            />
          </Form.Item>

          <Form.Item label="Mật khẩu" name="password">
            <Input.Password
              placeholder="Nhập mật khẩu"
              size="large"
              style={{ marginBottom: "4px" }}
            />
          </Form.Item>

          <div style={{ textAlign: "right", marginBottom: 16 }}>
            <Link
              href="/forgot-password"
              style={{
                color: "#00E5BE",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.color = "red")}
              onMouseLeave={(e) => (e.target.style.color = "#00E5BE")}
            >
              Quên mật khẩu?
            </Link>
          </div>

          <Form.Item>
            <Button
              type="primary"
              onClick={handleLoginClick}
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
              Đăng nhập
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center", margin: "16px 0", color: "#999" }}>
            hoặc
          </div>

          <Form.Item>
            <div style={{ display: "flex", gap: "12px" }}>
              <Button
                size="large"
                style={{
                  backgroundColor: "#4267B2",
                  color: "#fff",
                  flex: 1,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
                onClick={() =>
                  (window.location.href =
                    "http://localhost:8000/api/auth/facebook/redirect")
                }
              >
                <i className="ri-facebook-fill" style={{ marginRight: 8 }} />
                Facebook
              </Button>

              <Button
                size="large"
                style={{
                  backgroundColor: "#DB4437",
                  color: "#fff",
                  flex: 1,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
                onClick={() =>
                  (window.location.href =
                    "http://localhost:8000/api/auth/google/redirect")
                }
              >
                <i className="ri-google-fill" style={{ marginRight: 8 }} />
                Google
              </Button>
            </div>
          </Form.Item>

          <div style={{ textAlign: "center", marginTop: 24 }}>
            <Text>Bạn chưa có tài khoản? </Text>
            <Link href="/register" style={{ color: "#00E5BE" }}>
              Đăng ký ngay
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
