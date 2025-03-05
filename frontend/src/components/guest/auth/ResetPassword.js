import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import api from "../../../ultils/api/axios"; // Thay thế bằng API của bạn

export default function ResetPassword() {
  const { token } = useParams(); // Lấy token từ URL
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email"); // Lấy email từ query string

  const [APIMESSAGE, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await api.post("/api/reset-password", {
        token,
        email,
        password: values.password,
        password_confirmation: values.confirmPassword,
      });
      APIMESSAGE.success("Password reset successful! You can log in now.");
    } catch (error) {
      APIMESSAGE.error("Error: " + (error.response?.data?.message || error.message));
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {contextHolder}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          name="reset_password_form"
        >
          <Form.Item
            label="New Password"
            name="password"
            rules={[{ required: true, message: "Please enter your new password!" }]}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
