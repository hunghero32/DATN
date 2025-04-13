import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post("http://localhost:8000/api/forgot-password", data);
      return response.data;
    },
    onSuccess: () => {
      setEmailSent(true);
      toast.success("Gửi liên kết đặt lại mật khẩu thành công! Vui lòng kiểm tra email.");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email không được để trống.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Email không hợp lệ.");
      return;
    }

    mutate({ email });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">Quên Mật Khẩu</h1>

        {emailSent ? (
          <div className="text-center">
            <p className="text-green-500">Hãy kiểm tra email của bạn để đặt lại mật khẩu.</p>
            <Link to="/login" className="text-blue-500 hover:underline mt-4 block">
              Quay lại đăng nhập
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full p-3 border rounded-md focus:outline-none border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Nút gửi yêu cầu */}
            <button
              type="submit"
              style={{
                borderRadius: '30px',
                padding: '12px 40px',
              }}
              className={`w-full text-lg font-semibold text-white transition-all duration-300 shadow-md hover:shadow-lg ${
                isPending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={isPending}
            >
              {isPending ? "Đang xử lý..." : "Gửi liên kết đặt lại mật khẩu"}
            </button>

            {/* Quay lại đăng nhập */}
            <div className="text-center mt-4">
              <Link to="/login" className="!text-blue-500 hover:underline">
                Quay lại đăng nhập
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
