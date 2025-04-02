import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        { email, password },
      );

      console.log("Login response:", response.data); // Add this line to debug
      localStorage.setItem("authToken", response.data.token);
      toast.success("Đăng Nhập thành công!")
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError("Sai tài khoản hoặc mật khẩu!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Đăng Nhập</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Mật khẩu</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            style={{
              borderRadius: '30px',
              padding: '12px 40px',
            }}
            className="w-full bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>

        {/* Đăng ký và Quên mật khẩu */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-700">
            Chưa có tài khoản?{" "}
            <a href="/register" className="!text-blue-600 font-semibold">Đăng ký ngay</a>
          </p>
          <p className="text-sm text-gray-700 mt-2">
            Quên mật khẩu?{" "}
            <a href="/forgot-password" className="!text-blue-600 font-semibold">Khôi phục mật khẩu</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;