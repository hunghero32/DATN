import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import { AuthContext } from "./AuthContext";

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
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem("authToken", token);
      alert("Đăng nhập thành công!");
      login(user, token);

      if (user.role === "doctor") {
        navigate("/doctor/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Đăng nhập thất bại. Kiểm tra lại thông tin!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-violet-950 p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Đăng Nhập</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all mb-4"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all mb-4"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Đăng nhập
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <a
              href="/register"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Đăng ký ngay
            </a>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Quên mật khẩu?{" "}
            <a
              href="/forgot-password"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Khôi phục mật khẩu
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
