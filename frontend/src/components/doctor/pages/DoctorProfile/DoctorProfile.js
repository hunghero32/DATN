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

  // Fetch doctor profile from the API
  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          toast.error("Vui lòng đăng nhập để xem hồ sơ!");
          return;
        }

        const response = await axios.get("http://127.0.0.1:8000/api/doctor/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageURL = (url) => {
    if (url && url.trim() !== '') {
      setFormData({ ...formData, doctor_avatar: url });
      setImagePreview(url);
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
      
      // Xử lý avatar
      if (formData.doctor_avatar) {
        if (formData.doctor_avatar instanceof File) {
          formDataToSend.append('doctor_avatar', formData.doctor_avatar);
        } else if (typeof formData.doctor_avatar === 'string' && formData.doctor_avatar.startsWith('http')) {
          formDataToSend.append('doctor_avatar', formData.doctor_avatar);
        }
      }

      // Xử lý file
      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }

      // Thêm tiểu sử nếu có thay đổi
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

      // Refresh doctor profile after update
      const profileResponse = await axios.get("http://127.0.0.1:8000/api/doctor/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

          .avatar-container {
            position: relative;
            width: 150px;
            height: 150px;
            margin: 0 auto 2rem;
          }

          .avatar-image {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid #e0e4e8;
          }

          .avatar-placeholder {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background-color: #e9ecef;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 3px solid #e0e4e8;
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

          .image-upload {
            position: relative;
            width: 150px;
            height: 150px;
            margin: 0 auto 1rem;
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
            background: rgba(0, 0, 0, 0.5);
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
            font-size: 2rem;
          }
        `}
      </style>

      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="profile-card p-4">
            <Card.Body className="text-center">
              <div className="avatar-container mb-4">
                <div className="image-upload" onClick={() => document.getElementById('avatar-input').click()}>
                  {selectedDoctor?.doctor_avatar ? (
                    <img
                      src={selectedDoctor.doctor_avatar}
                      alt="Doctor Avatar"
                      className="avatar-image"
                    />
                  ) : (
                    <div className="avatar-placeholder">
                      <FaUserMd size={50} color="#adb5bd" />
                    </div>
                  )}
                  <div className="image-upload-overlay">
                    <FaCamera className="camera-icon" />
                  </div>
                  <input
                    type="file"
                    id="avatar-input"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </div>
              </div>
              <h3 className="mb-4">{selectedDoctor?.doctor_name}</h3>

              {selectedDoctor && (
                <div className="mt-4">
                  <div className="info-item">
                    <FaUserMd className="info-icon" />
                    <div>
                      <small className="text-muted d-block">Chuyên ngành</small>
                      <strong>{selectedDoctor.specialty}</strong>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <FaBriefcase className="info-icon" />
                    <div>
                      <small className="text-muted d-block">Kinh nghiệm</small>
                      <strong>{selectedDoctor.exp} năm</strong>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <FaInfoCircle className="info-icon" />
                    <div>
                      <small className="text-muted d-block">Tiểu sử</small>
                      <strong>{selectedDoctor.doctor_bio || "Chưa có tiểu sử"}</strong>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <FaCheckCircle 
                      className="info-icon" 
                      style={{ color: selectedDoctor.approve ? '#10b981' : '#6b7280' }} 
                    />
                    <div>
                      <small className="text-muted d-block">Trạng thái duyệt</small>
                      <strong>{selectedDoctor.approve ? "Đã duyệt" : "Chưa duyệt"}</strong>
                    </div>
                  </div>
                </div>
              )}

              <div className="d-flex justify-content-center mt-4">
                <Button className="action-button" onClick={handleEditClick}>
                  <FaEdit /> Chỉnh sửa thông tin
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal chỉnh sửa bác sĩ */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>Chỉnh sửa hồ sơ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="text-center mb-4">
              <div className="image-upload" onClick={() => document.getElementById('modal-avatar-input').click()}>
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="avatar-image"
                  />
                ) : (
                  <div className="avatar-placeholder">
                    <FaUserMd size={50} color="#adb5bd" />
                  </div>
                )}
                <div className="image-upload-overlay">
                  <FaCamera className="camera-icon" />
                </div>
                <input
                  type="file"
                  id="modal-avatar-input"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </div>
              
              <div className="mt-3">
                <Form.Group>
                  <Form.Label>Hoặc nhập URL ảnh</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    onChange={(e) => handleImageURL(e.target.value)}
                  />
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-4">
              <Form.Label>Tiểu sử</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="doctor_bio"
                value={formData.doctor_bio}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>File CV/Chứng chỉ (PDF, DOC, DOCX)</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              {selectedDoctor?.file && (
                <div className="mt-2">
                  <a href={selectedDoctor.file} target="_blank" rel="noopener noreferrer" className="text-primary">
                    Xem file hiện tại
                  </a>
                </div>
              )}
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="light" onClick={handleCloseModal}>
                Hủy
              </Button>
              <Button type="submit" className="action-button">
                Lưu thay đổi
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DoctorProfile; 