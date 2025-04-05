import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PatientProfile = () => {
  const navigate = useNavigate(); // Add this line at the beginning of the component
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

  // 🟢 Lấy dữ liệu bệnh nhân khi component được tải
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get("http://localhost:8000/api/profile", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
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
          localStorage.removeItem('token'); // Clear invalid token
          navigate('/login');
        } else {
          setError("Không thể tải dữ liệu bệnh nhân. Vui lòng thử lại sau.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [navigate]);

  // Update handleUpdateProfile similarly
  const handleUpdateProfile = async () => {
    setUpdateStatus("loading");
    setError("");

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
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

      console.log("Dữ liệu gửi lên API:", updateData);

      const response = await axios.put("http://localhost:8000/api/profile", updateData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      console.log("Phản hồi từ API sau khi cập nhật:", response.data);
      setPatientData(response.data.user);
      setIsEditing(false);
      setUpdateStatus("success");
      setFormData({ ...formData, currentPassword: "", password: "", password_confirmation: "" });
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
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  if (loading) return <p className="text-center text-gray-500">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Hồ Sơ Bệnh Nhân</h1>
        <p className="text-lg text-gray-500">Thông tin chi tiết về bệnh nhân và hồ sơ y tế.</p>
      </div>

      <div className="bg-white shadow-xl rounded-lg p-6 flex flex-col md:flex-row mb-6">
        <div className="flex-none mb-6 md:mb-0 md:w-1/4">
          <img
            src={patientData?.avatar || "https://via.placeholder.com/150"}
            alt={patientData?.name || "Avatar"}
            className="w-32 h-32 rounded-full mx-auto border-4 border-blue-300"
          />
        </div>

        <div className="md:ml-6 flex-1">
          {isEditing ? (
            <div className="space-y-3 mt-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Họ và tên"
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Số điện thoại"
                className="w-full p-2 border rounded"
              />
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                placeholder="Mật khẩu hiện tại (nếu muốn đổi)"
                className="w-full p-2 border rounded"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Mật khẩu mới"
                className="w-full p-2 border rounded"
              />
              <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleInputChange}
                placeholder="Nhập lại mật khẩu mới"
                className="w-full p-2 border rounded"
              />
              <div className="flex gap-4">
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                  onClick={handleUpdateProfile}
                >
                  Lưu
                </button>
                <button
                  className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
                  onClick={() => setIsEditing(false)}
                >
                  Hủy
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 mt-4">
              <p className="text-gray-600"><strong>Họ và tên:</strong> {patientData?.name}</p>
              <p className="text-gray-600"><strong>Email:</strong> {patientData?.email}</p>
              <p className="text-gray-600"><strong>Số điện thoại:</strong> {patientData?.phone}</p>
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                onClick={() => setIsEditing(true)}
              >
                Chỉnh sửa
              </button>
            </div>
          )}
        </div>
      </div>

      {updateStatus === "success" && <p className="text-center text-green-600">Cập nhật thành công!</p>}
      {updateStatus === "error" && <p className="text-center text-red-600">{error}</p>}
      {updateStatus === "loading" && <p className="text-center text-gray-500">Đang cập nhật...</p>}

      <div className="text-center">
        <a
          href={patientData?.pdfFile || "#"}
          className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tải hồ sơ PDF
        </a>
      </div>
    </div>
  );
};

export default PatientProfile;
