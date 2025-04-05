import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../guest/auth/AuthContext";
import axios from "axios";

const Header = ({ user }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [systemInfo, setSystemInfo] = useState({
    site_name: "",
    site_logo: "",
    site_favicon: "",
    site_description: "",
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return "Chào buổi sáng";
    if (hour >= 11 && hour < 13) return "Chào buổi trưa";
    if (hour >= 13 && hour < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
  };

  useEffect(() => {
    const fetchSystemInfo = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/system");
        setSystemInfo(response.data);
      } catch (error) {
        console.error("Lỗi khi tải thông tin hệ thống:", error);
      }
    };

    const fetchDoctorInfo = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://127.0.0.1:8000/api/doctor/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDoctorInfo(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin bác sĩ:', error);
      }
    };

    fetchSystemInfo();
    fetchDoctorInfo();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleViewUserProfile = () => {
    navigate("/doctor/profileUser");
  };

  const handleViewDoctorProfile = () => {
    navigate("/doctor/profile");
  };

  const handleEditDoctorProfile = () => {
    navigate("/doctor/profile/edit");
  };

  const handleAppointments = () => {
    navigate("/doctor/appointments");
  };

  const handleSchedule = () => {
    navigate("/doctor/schedule");
  };

  return (
    <div className="header-wrapper">
      <style>
        {`
          .header-wrapper {
            position: fixed;
            top: 0;
            right: 0;
            left: 280px;
            height: 70px;
            background: white;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            z-index: 1000;
          }

          .header-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 100%;
            padding: 0 24px;
          }

          .search-container {
            flex: 1;
            max-width: 500px;
            margin-right: 24px;
          }

          .search-input {
            position: relative;
          }

          .search-input input {
            width: 100%;
            height: 45px;
            padding: 0 45px;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            background-color: #f8fafc;
            font-size: 15px;
            transition: all 0.3s ease;
          }

          .search-input input:focus {
            background-color: white;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            outline: none;
          }

          .search-icon {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: #64748b;
            font-size: 16px;
          }

          .user-section {
            display: flex;
            align-items: center;
            gap: 16px;
          }

          .greeting {
            text-align: right;
            margin-right: 12px;
          }

          .greeting-text {
            color: #64748b;
            font-size: 14px;
            margin: 0;
          }

          .doctor-name {
            color: #1e293b;
            font-size: 16px;
            font-weight: 600;
            margin: 0;
          }

          .avatar {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid #e2e8f0;
            cursor: pointer;
            transition: border-color 0.3s ease;
          }

          .avatar:hover {
            border-color: #3b82f6;
          }

          .dropdown-menu {
            margin-top: 10px;
            border: none;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            padding: 8px;
            min-width: 200px;
          }

          .dropdown-item {
            padding: 8px 16px;
            border-radius: 8px;
            color: #4b5563;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 12px;
            transition: all 0.2s ease;
          }

          .dropdown-item i {
            font-size: 16px;
            width: 20px;
          }

          .dropdown-item:hover {
            background-color: #f1f5f9;
            color: #3b82f6;
          }

          .dropdown-item.text-danger:hover {
            background-color: #fee2e2;
            color: #dc2626;
          }

          .dropdown-divider {
            margin: 8px 0;
            border-color: #e2e8f0;
          }
        `}
      </style>

      <div className="header-container">
        <div className="search-container">
          <div className="search-input">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder="Tìm kiếm bệnh nhân..."
              className="form-control"
            />
          </div>
        </div>

        <div className="user-section">
          <div className="greeting">
            <p className="greeting-text">{getGreeting()},</p>
            <h6 className="doctor-name">Bác sĩ {doctorInfo?.doctor_name}</h6>
          </div>

          <div className="dropdown">
            <img
              src={doctorInfo?.doctor_avatar || "https://via.placeholder.com/150"}
              alt="Avatar"
              className="avatar"
              role="button"
              data-bs-toggle="dropdown"
            />

            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" onClick={handleViewUserProfile}>
                  <i className="fas fa-user"></i>
                  Thông tin tài khoản
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleViewDoctorProfile}>
                  <i className="fas fa-user-md"></i>
                  Hồ sơ bác sĩ
                </a>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <a className="dropdown-item text-danger" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i>
                  Đăng xuất
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
