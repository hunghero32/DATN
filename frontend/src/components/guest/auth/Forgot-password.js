import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useMutation } from '@tanstack/react-query';
import { Link } from "react-router-dom";
import api from "../../../ultils/api/axios";

export default function ForgotPassword() {
  const [APIMESSAGE, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [emailSent, setEmailSent] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/api/forgot-password", data);
      return response.data;
    },
    onSuccess: () => {
      APIMESSAGE.success("Reset link sent! Check your email.");
      setEmailSent(true);
    },
    onError: (error) => {
      APIMESSAGE.error("Error: " + (error.response?.data?.message || error.message));
    }
  });

  const onFinish = (values) => {
    mutate(values);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {contextHolder}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>

        {emailSent ? (
          <div className="text-center">
            <p className="text-green-500">Check your email for reset instructions.</p>
            <Link to="/login" className="text-blue-500 hover:underline mt-4 block">
              Back to Login
            </Link>
          </div>
        ) : (
          <Form
            form={form}
            layout="vertical"
            disabled={isPending}
            onFinish={onFinish}
            name="forgot_password_form"
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

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={isPending}>
                Send Reset Link
              </Button>
            </Form.Item>

            <div className="text-center">
              <Link to="/login" className="text-blue-500 hover:underline">
                Back to Login
              </Link>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
}
