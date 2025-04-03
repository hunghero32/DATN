import React, { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const { token } = useParams(); // Lấy token từ URL
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email"); // Lấy email từ query string
 const navigate  = useNavigate()
  const [APIMESSAGE, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:8000/api/reset-password", {
        token,
        email,
        password: values.password,
        password_confirmation: values.confirmPassword,
      });
      toast.success("Đổi mật khẩu thành công!")
      setTimeout(() => navigate("/login"), 2000);
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
          <button
            type="submit"
            style={{
              borderRadius: '30px',
              padding: '12px 40px',
            }}
            className="w-full bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Đổi Mật Khẩu"}
          </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
