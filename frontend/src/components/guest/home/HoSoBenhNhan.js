import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChuotChay from "../../loadding/chuotchay";

const PatientProfile = () => {
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentPassword: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:8000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (response.data && response.data.user) {
          setPatientData(response.data.user);
          setFormData({
            name: response.data.user.name || "",
            email: response.data.user.email || "",
            phone: response.data.user.phone || "",
            currentPassword: "",
            password: "",
            password_confirmation: "",
          });
          setError(null);
        } else {
          setError("Không có dữ liệu người dùng.");
        }
      } catch (error) {
        console.error("Error details:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("authToken");
          navigate("/login");
        } else {
          setError("Không thể tải dữ liệu bệnh nhân. Vui lòng thử lại sau.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [navigate]);

  const handleUpdateProfile = async () => {
    setUpdateStatus("loading");
    setError("");

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      const updateData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      };

      if (formData.password.trim() !== "") {
        updateData.password = formData.password;
        updateData.password_confirmation = formData.password_confirmation;
      }

      if (formData.currentPassword.trim() !== "") {
        updateData.currentPassword = formData.currentPassword;
      }

      const response = await axios.put(
        "http://localhost:8000/api/profile",
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      setPatientData(response.data.user);
      setIsEditing(false);
      setUpdateStatus("success");
      setFormData({
        ...formData,
        currentPassword: "",
        password: "",
        password_confirmation: "",
      });
    } catch (error) {
      console.error("Lỗi API:", error.response?.data || error.message);
      if (error.response?.status === 422) {
        setError(error.response?.data?.message || "Dữ liệu nhập không hợp lệ.");
      } else {
        setError("Đã xảy ra lỗi không xác định.");
      }
      setUpdateStatus("error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (loading)
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center">
        <ChuotChay />
        <p className="mt-4 text-gray-600 text-lg">Đang tải dữ liệu...</p>
      </div>
    );

  if (error)
    return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="text-center mt-4 mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Hồ Sơ Bệnh Nhân</h1>
        <p className="text-lg text-gray-500">
          Thông tin cá nhân và bảo mật tài khoản.
        </p>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-6 space-y-5">
        {isEditing ? (
          <div className="space-y-4">
            {[
              { label: "Họ và Tên", name: "name", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Số Điện Thoại", name: "phone", type: "text" },
              {
                label: "Mật khẩu hiện tại",
                name: "currentPassword",
                type: "password",
                placeholder: "Chỉ điền nếu muốn thay đổi mật khẩu",
              },
              {
                label: "Mật khẩu mới",
                name: "password",
                type: "password",
              },
              {
                label: "Xác nhận mật khẩu mới",
                name: "password_confirmation",
                type: "password",
              },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleInputChange}
                  placeholder={placeholder || ""}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}

<div className="mt-6 space-y-3">
  <div>
    <button
      className="w-full bg-blue-600 mt-4 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
      onClick={handleUpdateProfile}
    >
      Lưu thay đổi
    </button>
  </div>
  <div>
    <button
      className="w-full bg-gray-400 text-white px-6 mb-4 py-2 rounded-lg hover:bg-gray-500 transition duration-200"
      onClick={() => setIsEditing(false)}
    >
      Hủy
    </button>
  </div>
</div>

          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-gray-700">
              <strong>Họ và tên:</strong> {patientData?.name}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {patientData?.email}
            </p>
            <p className="text-gray-700">
              <strong>Số điện thoại:</strong> {patientData?.phone}
            </p>
            <button
              className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
              onClick={() => setIsEditing(true)}
            >
              Chỉnh sửa
            </button>
          </div>
        )}
      </div>

      {updateStatus === "success" && (
        <p className="text-center text-green-600 mt-4">
          Cập nhật thành công!
        </p>
      )}
      {updateStatus === "error" && (
        <p className="text-center text-red-600 mt-4">{error}</p>
      )}
      {updateStatus === "loading" && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-75 z-50">
          <ChuotChay />
          <p className="mt-4 text-gray-600 text-lg">Đang cập nhật...</p>
        </div>
      )}
    </div>
  );
};

export default PatientProfile;
