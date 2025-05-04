import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaEdit, FaKey } from "react-icons/fa";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Vui lòng đăng nhập để xem thông tin!");
          return;
        }

        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          setUserInfo(user);
          setFormData({
            name: user.name || "",
            email: user.email || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("Không thể lấy thông tin người dùng!");
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditProfile = () => setShowProfileModal(true);
  const handleEditPassword = () => {
    setShowPasswordModal(true);
    setIsEmailSent(false);
  };
  
  const handleCloseProfile = () => {
    setShowProfileModal(false);
    setFormData({
      name: userInfo?.name || "",
      email: userInfo?.email || "",
    });
  };

  const handleClosePassword = () => {
    setShowPasswordModal(false);
    setIsEmailSent(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Vui lòng đăng nhập để cập nhật thông tin!");
        return;
      }

      const response = await axios.put(
        "http://localhost:8000/api/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedUser = response.data.user;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUserInfo(updatedUser);

      toast.success("Cập nhật thông tin thành công!");
      setShowProfileModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.code === "ERR_NETWORK") {
        toast.error("Không thể kết nối đến máy chủ. Vui lòng thử lại sau!");
      } else {
        toast.error(error.response?.data?.message || "Cập nhật thông tin thất bại!");
      }
    }
  };

  const handleSendResetEmail = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Vui lòng đăng nhập để thực hiện!");
        return;
      }

      await axios.post(
        "http://localhost:8000/api/forgot-password",
        { email: userInfo.email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setIsEmailSent(true);
      toast.success("Đã gửi email đổi mật khẩu. Vui lòng kiểm tra hộp thư của bạn!");
    } catch (error) {
      console.error("Error sending reset email:", error);
      if (error.code === "ERR_NETWORK") {
        toast.error("Không thể kết nối đến máy chủ. Vui lòng thử lại sau!");
      } else {
        toast.error(error.response?.data?.message || "Không thể gửi email đổi mật khẩu!");
      }
    }
  };

  return (
    <div className="container-fluid mt-4">
      <style>
        {`
          .profile-card {
            background: white;
            border-radius: 15px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
          }

          .profile-card:hover {
            transform: translateY(-5px);
          }

          .card-icon {
            font-size: 2rem;
            color: #3b82f6;
            margin-bottom: 1rem;
          }

          .info-item {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 10px;
          }

          .info-icon {
            font-size: 1.2rem;
            margin-right: 1rem;
            color: #3b82f6;
          }

          .action-button {
            background-color: #3b82f6;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .action-button:hover {
            background-color: #2563eb;
            transform: translateY(-2px);
          }

          .modal-content {
            border-radius: 15px;
            border: none;
          }

          .modal-header {
            background-color: #3b82f6;
            color: white;
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            border-bottom: none;
          }

          .modal-body {
            padding: 2rem;
          }

          .form-control {
            border-radius: 8px;
            padding: 0.75rem;
            border: 1px solid #e2e8f0;
          }

          .form-control:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
          }

          .form-label {
            font-weight: 500;
            color: #4b5563;
          }

          .success-message {
            text-align: center;
            color: #059669;
            background-color: #ecfdf5;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
          }

          .success-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
            color: #059669;
          }
        `}
      </style>

      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="profile-card mb-4">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <FaUser className="card-icon" />
                <h3 className="mb-0">Thông Tin Cá Nhân</h3>
              </div>

              {userInfo && (
                <div className="mt-4">
                  <div className="info-item">
                    <FaUser className="info-icon" />
                    <div>
                      <small className="text-muted d-block">Họ và tên</small>
                      <strong>{userInfo.name}</strong>
                    </div>
                  </div>
                  <div className="info-item">
                    <FaEnvelope className="info-icon" />
                    <div>
                      <small className="text-muted d-block">Email</small>
                      <strong>{userInfo.email}</strong>
                    </div>
                  </div>
                </div>
              )}

              <div className="d-flex justify-content-center gap-3 mt-4">
                <Button className="action-button" onClick={handleEditProfile}>
                  <FaEdit /> Chỉnh sửa thông tin
                </Button>
                <Button className="action-button" onClick={handleEditPassword}>
                  <FaKey /> Đổi mật khẩu
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal Chỉnh sửa thông tin */}
      <Modal show={showProfileModal} onHide={handleCloseProfile} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh Sửa Thông Tin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateProfile}>
            <Form.Group className="mb-3">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button variant="light" onClick={handleCloseProfile}>
                Hủy
              </Button>
              <Button type="submit" className="action-button">
                Lưu thay đổi
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal Đổi mật khẩu */}
      <Modal show={showPasswordModal} onHide={handleClosePassword} centered>
        <Modal.Header closeButton>
          <Modal.Title>Đổi Mật Khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isEmailSent ? (
            <div className="success-message">
              <FaEnvelope className="success-icon" />
              <h4>Email đã được gửi!</h4>
              <p>
                Chúng tôi đã gửi một email chứa liên kết đổi mật khẩu đến địa chỉ email của bạn.
                Vui lòng kiểm tra hộp thư và làm theo hướng dẫn để hoàn tất quá trình đổi mật khẩu.
              </p>
              <Button variant="light" onClick={handleClosePassword} className="mt-3">
                Đóng
              </Button>
            </div>
          ) : (
            <div>
              <p className="text-muted mb-4">
                Để đảm bảo an toàn, chúng tôi sẽ gửi một email chứa liên kết đổi mật khẩu đến địa chỉ email của bạn.
              </p>
              <div className="info-item mb-4">
                <FaEnvelope className="info-icon" />
                <div>
                  <small className="text-muted d-block">Email của bạn</small>
                  <strong>{userInfo?.email}</strong>
                </div>
              </div>
              <div className="d-flex justify-content-end gap-2">
                <Button variant="light" onClick={handleClosePassword}>
                  Hủy
                </Button>
                <Button className="action-button" onClick={handleSendResetEmail}>
                  Gửi email đổi mật khẩu
                </Button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserProfile; 