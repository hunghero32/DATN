import React from "react";
import { Form, Input, Button, message } from "antd";
import { useMutation } from '@tanstack/react-query';
import api from "../../../ultils/api/axios";
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const nav = useNavigate();
  const [APIMESSAGE, contextHolder] = message.useMessage();  // Cần contextHolder để hiển thị thông báo
  const [form] = Form.useForm();

  // Mutation API đăng ký
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      await api.post("/api/register", data);  // Đảm bảo api này hoạt động và trả về phản hồi đúng
    },
    onSuccess: () => {
      APIMESSAGE.success("Register Success!");  // Hiển thị thông báo thành công
      setTimeout(() => {
        nav("/login");  // Điều hướng về trang login sau khi đăng ký thành công
      }, 1000);
    },
    onError: (error) => {
      APIMESSAGE.error(error.response?.data?.message || "Register failed!");  // Thông báo lỗi nếu có
    },
  });

  const onFinish = (values) => {
    console.log("Form Data:", values);  // Kiểm tra dữ liệu gửi đi
    mutate(values);  // Gửi dữ liệu đến API
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {contextHolder}  {/* Đây là nơi thông báo sẽ hiển thị */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
        <Form
          form={form}
          layout="vertical"
          disabled={isPending}
          onFinish={onFinish}
          name="register_form"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }, { type: "email", message: "Please enter a valid email!" }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="password_confirmation"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("The two passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isPending}>
              Register
            </Button>
          </Form.Item>
        </Form>

        {/* Thêm liên kết đến trang đăng nhập */}
        <div className="text-center mt-4">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
