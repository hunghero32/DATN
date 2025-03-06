import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import api from "../../../ultils/api/axios";

export default function Login() {
  
  const nav = useNavigate();
  const [form] = Form.useForm();
  const [serverError, setServerError] = useState(""); // Lưu lỗi từ API

  // API login
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/api/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      window.localStorage.setItem("token", data.token);
      setTimeout(() => {
        nav("/");
      }, 1000);
    },
    onError: (error) => {
      setServerError(error.response?.data?.message || "Đăng nhập thất bại.");
    }
  });

  const onFinish = (values) => {
    console.log("Form Data:", values);
    setServerError(""); // Xóa lỗi trước khi gửi request
    mutate(values);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Đăng Nhập</h1>
        <Form
          form={form}
          layout="vertical"
          disabled={isPending}
          onFinish={onFinish}
          validateTrigger="onSubmit"
          name="login_form"
        >
          <Form.Item
            label="Email"
            name="email"
            hasFeedback
            validateTrigger="onSubmit"
            rules={[
              { required: true, message: "Email không được bỏ trống." },
              { type: "email", message: "Email không hợp lệ." },
            ]}
            style={{ marginBottom: "12px" }}
          >
            <Input placeholder="Nhập email của bạn" className="w-full" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            hasFeedback
            validateTrigger="onSubmit"
            rules={[{ required: true, message: "Mật khẩu không được bỏ trống." }]}
            style={{ marginBottom: "12px" }}
          >
            <Input.Password placeholder="Nhập mật khẩu" className="w-full" />
          </Form.Item>

          {serverError && <p className="text-red-500 text-sm mt-2">{serverError}</p>}

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isPending}>
              Đăng nhập
            </Button>
          </Form.Item>

          <div className="text-center">
            <Link to="/forgot-password" className="text-blue-500 hover:underline">
              Quên mật khẩu?
            </Link>
          </div>
        </Form>

        <div className="text-center mt-4">
          <p>
            Chưa có tài khoản?{" "}
            <Link to="/register" className="text-blue-500">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
