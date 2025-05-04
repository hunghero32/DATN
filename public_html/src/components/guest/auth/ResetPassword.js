import React, { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const { token } = useParams(); // Lấy token từ URL
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email"); // Lấy email từ query string
  const navigate = useNavigate()
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
        <h1 className="text-2xl font-bold text-center mb-6">Đặt lại mật khẩu</h1>
        <hr></hr>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          name="reset_password_form"
          className="space-y-6"
        >
          <Form.Item
            label={<span className="text-base font-semibold text-gray-800">🔐 Mật khẩu mới</span>}
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
          >
            <Input.Password
              placeholder="Nhập mật khẩu mới"
              className="h-11 rounded-md"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-base font-semibold text-gray-800">🔁 Xác nhận mật khẩu</span>}
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận lại mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không trùng khớp!"));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Xác nhận mật khẩu mới"
              className="h-11 rounded-md"
            />
          </Form.Item>

          <Form.Item className="text-center">
            <button
              type="submit"
              className={`w-48 py-2 px-4 text-white font-medium rounded-md shadow transition duration-300 ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:shadow-md"
                }`}
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
