import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useMutation } from '@tanstack/react-query';
import api from "../../../ultils/api/axios";
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const nav = useNavigate();
  const [form] = Form.useForm();
  const [serverError, setServerError] = useState(""); 

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      setServerError(""); // Xóa lỗi trước khi gửi
      await api.post("/api/register", data);
    },
    onSuccess: () => {
      setTimeout(() => {
        nav("/login");
      }, 1000);
    },
    onError: (error) => {
      setServerError(error.response?.data?.message || "Đăng ký thất bại.");
    },
  });

  const onFinish = (values) => {
    console.log("Form Data:", values);
    mutate(values);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
     <div className="bg-violet-950 p-8 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-white mb-6">Đăng Ký</h1>
        <Form
          form={form}
          layout="vertical"
          disabled={isPending}
          onFinish={onFinish}
          validateTrigger="onSubmit"
          name="register_form"
        >
          <Form.Item
            label="Tên"
            name="name"
            hasFeedback
            validateTrigger="onSubmit"
            rules={[{ required: true, message: "Tên không được để trống." }]}
            style={{ marginBottom: "12px" }}
          >
            <Input placeholder="Nhập vào tên" className="w-full" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            hasFeedback
            validateTrigger="onSubmit"
            rules={[
              { required: true, message: "Email không được bỏ trống." },
              { type: "email", message: "Email không hợp lệ." }
            ]}
            style={{ marginBottom: "12px" }}
          >
            <Input placeholder="Nhập vào email" className="w-full" />
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

          <Form.Item
            label="Xác nhận mật khẩu"
            name="password_confirmation"
            hasFeedback
            validateTrigger="onSubmit"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Bạn cần nhập lại mật khẩu." },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp."));
                },
              }),
            ]}
            style={{ marginBottom: "12px" }}
          >
            <Input.Password placeholder="Xác nhận mật khẩu" className="w-full" />
          </Form.Item>

          {serverError && <p className="text-red-500 text-sm mt-2">{serverError}</p>}

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isPending}>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-4">
          <p>
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-blue-500">
              Đăng nhập tại đây
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}