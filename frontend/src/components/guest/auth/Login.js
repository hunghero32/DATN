import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";
import { Card } from "antd";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post("http://localhost:8000/api/login", { email, password });
      console.log("Login response:", response.data);
      const { token, user } = response.data;
      localStorage.setItem("authToken", token);
      toast.success("Đăng nhập thành công!");
      setTimeout(() => {
        navigate("/");
        window.location.reload(); 
      }, 1000);
    
      login(user, token);
      if (user.role === "doctor") {
        navigate("/doctor");
      } else if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Đăng nhập thất bại. Kiểm tra lại thông tin!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-full max-w-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Đăng Nhập</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <button
            type="submit"
            style={{
              borderRadius: "30px",
              padding: "12px 40px",
            }}
            className="w-full bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            Đăng nhập
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Chưa có tài khoản? <a href="/register" className="!text-blue-600 font-semibold">Đăng ký ngay</a>
        </p>
        <p className="text-center mt-2 text-sm">
          Quên mật khẩu? <a href="/forgot-password" className="!text-blue-600 font-semibold">Khôi phục mật khẩu</a>
        </p>
      </Card>
    </div>
  );
};

export default Login;
