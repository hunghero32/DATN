import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message, notification } from "antd";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../ultils/api/axios";

export default function Login() {
  const [apiMessage, contextHolder] = message.useMessage();
  const nav = useNavigate();
  const [form] = Form.useForm();
  const [serverError, setServerError] = useState("");

  // API login
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("http://127.0.0.1:8000/api/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Dữ liệu nhận từ API:", data); // Kiểm tra dữ liệu nhận được
      const { token, role } = data;
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("role", role);
    

      notification.success({
        message: "Đăng nhập thành công!",
        description: "Chào mừng bạn quay trở lại.",
        duration: 2,
        placement: "topRight",
      });

      // Điều hướng theo vai trò
      if (role === "admin") {
        nav("/admin/dashboard");
      } else if (role === "doctor") {
        nav("/doctor/dashboard");
      } else {
        nav("/user/dashboard");
      }
      
    },
    onError: (error) => {
      const errorMsg =
        error.response?.data?.message || "Email hoặc mật khẩu không đúng!";
      setServerError(errorMsg);
    },
  });

  const onFinish = (values) => {
    setServerError("");
    mutate(values);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {contextHolder}
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
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input placeholder="Nhập email của bạn" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Checkbox>Ghi nhớ đăng nhập</Checkbox>
          </Form.Item>

          {serverError && (
            <p className="text-red-500 text-sm mt-2">{serverError}</p>
          )}

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
