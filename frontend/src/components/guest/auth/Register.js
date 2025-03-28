import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import api from "../../../ultils/api/axios";

export default function Register() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      setServerError("");
      const response = await api.post("/api/register", data);
      return response.data;
    },
    onSuccess: (data) => {
      // Handle successful registration
      if (data.message) {
        // Optional: Show success message
        setServerError("Registration successful!");
      }
      // Navigate after a short delay
      setTimeout(() => navigate("/login"), 1000);
    },
    onError: (error) => {
      if (error.response?.status === 422) {
        // Validation errors
        setServerError(error.response.data.message || "Validation failed");
      } else {
        setServerError("Registration failed. Please try again.");
      }
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-900 mb-2">Đăng Ký</h1>
        {serverError && <p className="text-center text-sm text-red-500">{serverError}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tên</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
            <input
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
            disabled={isPending}
          >
            {isPending ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Đã có tài khoản? <Link to="/login" className="!text-blue-600 font-semibold">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}