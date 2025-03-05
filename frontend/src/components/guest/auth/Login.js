import React from "react";
import { Form, Input, Button, message } from "antd";
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import api from "../../../ultils/api/axios";

export default function Login() {
  
  const nav = useNavigate();
  const [APIMESSAGE, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/api/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      APIMESSAGE.success("Login Successful!");
      window.localStorage.setItem("token", data.token); // Lưu token vào localStorage
      setTimeout(() => {
        nav("/"); // Chuyển hướng đến dashboard
      }, 1000);
    },
    onError: (error) => {
      APIMESSAGE.error("Login Failed: " + (error.response?.data?.message || error.message));
    }
  });

  const onFinish = (values) => {
    console.log("Form Data:", values);
    mutate(values);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {contextHolder}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <Form
          form={form}
          layout="vertical"
          disabled={isPending}
          onFinish={onFinish}
          name="login_form"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isPending}>
              Login
            </Button>
          </Form.Item>

          <div className="text-center">
            <Link to="/forgot-password" className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>
        </Form>
         <div className="text-center mt-4">
                  <p>
                    Already have an account?{" "}
                    <Link to="/register" className="text-blue-500 ">
                      Register here
                    </Link>
                  </p>
                </div>
      </div>
    </div>
  );
}
