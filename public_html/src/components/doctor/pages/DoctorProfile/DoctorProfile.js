import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserMd, FaBriefcase, FaInfoCircle, FaCheckCircle, FaEdit, FaCamera } from "react-icons/fa";

const DoctorProfile = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    doctor_bio: "",
    doctor_avatar: null,
    file: null
  });

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          toast.error("Vui lòng đăng nhập để xem hồ sơ!");
          return;
        }

        const response = await axios.get("http://127.0.0.1:8000/api/doctor/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const doctor = response.data;
        setSelectedDoctor(doctor);
        setFormData({
          doctor_bio: doctor.doctor_bio || "",
          doctor_avatar: null,
          file: null
        });
        setImagePreview(doctor.doctor_avatar);
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
        toast.error("Không thể lấy thông tin hồ sơ bác sĩ!");
      }
    };

    fetchDoctorProfile();
  }, []);

  const handleEditClick = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
    setImagePreview(selectedDoctor?.doctor_avatar);
    setFormData({
      doctor_bio: selectedDoctor?.doctor_bio || "",
      doctor_avatar: null,
      file: null
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, file: file });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, doctor_avatar: file });
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Vui lòng đăng nhập để cập nhật hồ sơ!");
        return;
      }

      const formDataToSend = new FormData();
      if (formData.doctor_avatar instanceof File) {
        formDataToSend.append('doctor_avatar', formData.doctor_avatar);
      }
      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }
      if (formData.doctor_bio !== selectedDoctor?.doctor_bio) {
        formDataToSend.append('doctor_bio', formData.doctor_bio);
      }

      const response = await axios.put(
        "http://127.0.0.1:8000/api/doctor/profile",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.message) {
        toast.success(response.data.message);
      }

      const profileResponse = await axios.get("http://127.0.0.1:8000/api/doctor/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSelectedDoctor(profileResponse.data);
      setImagePreview(profileResponse.data.doctor_avatar);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating doctor profile:", error);
      toast.error(error.response?.data?.message || "Cập nhật hồ sơ thất bại!");
    }
  };

  return (
    <div className="container-fluid mt-5">
      <style>
        {`
          .profile-card {
            background: linear-gradient(145deg, #ffffff, #f0f4f8);
            border-radius: 20px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.08);
            padding: 2rem;
            transition: all 0.3s ease;
          }

          .profile-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 32px rgba(0,0,0,0.12);
          }

          .avatar-container {
            position: relative;
            width: 140px;
            height: 140px;
            margin: 0 auto;
          }

          .avatar-image {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
            border: 4px solid #ffffff;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }

          .avatar-placeholder {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: linear-gradient(145deg, #e2e8f0, #d1d9e6);
            display: flex;
            align-items: center;
            justify-content: center;
            border: 4px solid #ffffff;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }

          .info-section {
            margin-top: 2rem;
          }

          .info-item {
            display: flex;
            align-items: center;
            padding: 0.75rem 1rem;
            margin-bottom: 1rem;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            transition: all 0.2s ease;
          }

          .info-item:hover {
            background: #f8fafc;
            transform: translateX(5px);
          }

          .info-icon {
            font-size: 1.5rem;
            margin-right: 1rem;
            color: #2563eb;
          }

          .info-text {
            flex: 1;
            text-align: left;
          }

          .info-label {
            font-size: 0.9rem;
            color: #6b7280;
            margin-bottom: 0.2rem;
            white-space: nowrap;
          }

          .info-value {
            font-size: 1.1rem;
            font-weight: 600;
            color: #1f2937;
          }

          .edit-button {
            background: #2563eb;
            border: none;
            padding: 0.75rem 2rem;
            border-radius: 10px;
            font-weight: 500;
            color: white;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.3s ease;
          }

          .edit-button:hover {
            background: #1d4ed8;
            transform: scale(1.05);
          }

          .modal-content {
            border-radius: 20px;
            border: none;
            overflow: hidden;
          }

          .modal-header {
            background: linear-gradient(90deg, #2563eb, #3b82f6);
            color: white;
            border-bottom: none;
            padding: 1.5rem;
          }

          .modal-body {
            padding: 2.5rem;
            background: #f9fafb;
          }

          .form-control, .form-control:focus {
            border-radius: 10px;
            border: 1px solid #d1d9e6;
            padding: 0.75rem;
            box-shadow: none;
            transition: all 0.2s ease;
          }

          .form-control:focus {
            border-color: #2563eb;
          }

          .form-label {
            font-weight: 500;
            color: #374151;
            margin-bottom: 0.5rem;
          }

          .image-upload {
            position: relative;
            width: 120px;
            height: 120px;
            margin: 0 auto;
            cursor: pointer;
          }

          .image-upload input[type="file"] {
            display: none;
          }

          .image-upload-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .image-upload:hover .image-upload-overlay {
            opacity: 1;
          }

          .camera-icon {
            color: white;
            font-size: 1.8rem;
          }

          .modal-button {
            padding: 0.75rem 2rem;
            border-radius: 10px;
            font-weight: 500;
            transition: all 0.3s ease;
          }

          .modal-button-cancel {
            background: #e5e7eb;
            color: #374151;
          }

          .modal-button-cancel:hover {
            background: #d1d5db;
          }

          .modal-button-submit {
            background: #2563eb;
            color: white;
            border: none;
          }

          .modal-button-submit:hover {
            background: #1d4ed8;
            transform: scale(1.05);
          }
        `}
      </style>

      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="profile-card">
            <Card.Body className="text-left">
              <div className="avatar-container mb-4">
                {selectedDoctor?.doctor_avatar ? (
                  <img
                    src={selectedDoctor.doctor_avatar}
                    alt="Doctor Avatar"
                    className="avatar-image"
                  />
                ) : (
                  <div className="avatar-placeholder">
                    <FaUserMd size={50} color="#9ca3af" />
                  </div>
                )}
              </div>
              <h3 className="mb-4" style={{ color: '#1f2937', fontWeight: 700 }}>
                {selectedDoctor?.doctor_name}
              </h3>

              {selectedDoctor && (
                <div className="info-section">
                  <div className="info-item">
                    <FaUserMd className="info-icon" />
                    <div className="info-text">
                      <div className="info-label">Chuyên ngành:</div>
                      <div className="info-value">{selectedDoctor.specialty}</div>
                    </div>
                  </div>
                  <div className="info-item">
                    <FaBriefcase className="info-icon" />
                    <div className="info-text">
                      <div className="info-label">Kinh nghiệm:</div>
                      <div className="info-value">{selectedDoctor.exp} năm</div>
                    </div>
                  </div>
                  <div className="info-item">
                    <FaInfoCircle className="info-icon" />
                    <div className="info-text">
                      <div className="info-label">Tiểu sử:</div>
                      <div className="info-value">{selectedDoctor.doctor_bio || "Chưa có tiểu sử"}</div>
                    </div>
                  </div>
                  <div className="info-item">
                    <FaCheckCircle
                      className="info-icon"
                      style={{ color: selectedDoctor.approve ? '#22c55e' : '#9ca3af' }}
                    />
                    <div className="info-text">
                      <div className="info-label">Trạng thái duyệt:</div>
                      <div className="info-value">{selectedDoctor.approve ? "Đã duyệt" : "Chưa duyệt"}</div>
                    </div>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DoctorProfile;