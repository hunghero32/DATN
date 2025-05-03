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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mx-4 transform hover:scale-[1.02] transition-transform duration-300">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Quên Mật Khẩu?</h1>
          <p className="text-sm text-gray-600">Đừng lo, chúng tôi sẽ giúp bạn khôi phục mật khẩu</p>
        </div>

        {emailSent ? (
          <div className="text-center space-y-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-green-600">Hãy kiểm tra email của bạn để đặt lại mật khẩu.</p>
            </div>
            <Link 
              to="/login" 
              className="inline-block text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300"
            >
              ← Quay lại đăng nhập
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-sm text-gray-700 font-semibold">Email của bạn</label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full p-3 text-sm border rounded-lg focus:outline-none border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3 text-sm rounded-lg text-white font-semibold transition-all duration-300 transform hover:-translate-y-1 ${
                isPending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-xl"
              }`}
              disabled={isPending}
            >
              {isPending ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Đang xử lý...
                </span>
              ) : "Gửi liên kết đặt lại mật khẩu"}
            </button>

            <div className="text-center pt-3 border-t">
              <Link 
                to="/login" 
                className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300"
              >
                ← Quay lại đăng nhập
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
