import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserMd, FaBriefcase, FaInfoCircle, FaCheckCircle } from "react-icons/fa";

const DoctorProfile = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [specialties, setSpecialties] = useState([]); // State to store list of specialties
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    doctor_name: "",
    specialty_id: "", // Changed to specialty_id to match backend
    exp: "",
    doctor_bio: "",
  });

  // Fetch specialties from the backend
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/specialties");
        setSpecialties(response.data); // Assuming the response is an array of { id, name }
      } catch (error) {
        console.error("Error fetching specialties:", error);
        toast.error("Không thể lấy danh sách chuyên khoa!");
      }
    };

    fetchSpecialties();
  }, []);

  // Fetch doctor profile from the API
  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const token = localStorage.getItem("token");
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
          doctor_name: doctor.doctor_name || "",
          specialty_id: doctor.specialty_id || "", // Use specialty_id from the backend
          exp: doctor.exp || "",
          doctor_bio: doctor.doctor_bio || "",
        });
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
        toast.error("Không thể lấy thông tin hồ sơ bác sĩ!");
      }
    };

    fetchDoctorProfile();
  }, []);

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Vui lòng đăng nhập để cập nhật hồ sơ!");
        return;
      }

      // Gửi yêu cầu PUT để cập nhật hồ sơ bác sĩ
      const response = await axios.put(
        "http://127.0.0.1:8000/api/doctor/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Cập nhật state với dữ liệu mới từ API
      const updatedDoctor = response.data.doctor;
      setSelectedDoctor(updatedDoctor);
      setFormData({
        doctor_name: updatedDoctor.doctor_name || "",
        specialty_id: updatedDoctor.specialty_id || "", // Use specialty_id
        exp: updatedDoctor.exp || "",
        doctor_bio: updatedDoctor.doctor_bio || "",
      });

      toast.success("Cập nhật hồ sơ thành công!");
      setShowModal(false);
    } catch (error) {
      console.error("Error updating doctor profile:", error);
      toast.error(error.response?.data?.message || "Cập nhật hồ sơ thất bại!");
    }
  };

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa hồ sơ này?")) {
      toast.success("Xóa hồ sơ thành công!");
      // Add logic to delete the doctor profile via API if needed
    }
  };

  return (
    <div className="container mt-5 doctor-profile-container">
      <style>
        {`
          /* General Styling */
          body {
            font-family: 'Inter', sans-serif;
            background-color: #f4f7fc;
          }

          .doctor-profile-container {
            max-width: 900px;
            margin: 0 auto;
            padding: 3rem;
            border-radius: 16px;
            box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
          }

          .doctor-profile-card {
            border-radius: 16px;
          }

          .doctor-header {
            display: flex;
            align-items: center;
            gap: 2rem;
            margin-bottom: 3rem;
          }

          .doctor-avatar {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid #e0e4e8;
          }

          .no-avatar {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background-color: #e9ecef;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 3px solid #e0e4e8;
          }

          .doctor-name {
            font-size: 2rem;
            font-weight: 600;
            color: #333;
            margin: 0;
          }

          .doctor-info {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 3rem;
          }

          .info-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 1.1rem;
            color: #6b7280;
          }

          .info-item svg {
            color: #3b82f6;
            font-size: 1.25rem;
          }

          .info-item.approve {
            color: #10b981;
          }

          .info-item.approve svg {
            color: #10b981;
            font-size: 1.25rem;
          }

          .custom-button {
            width: 140px;
            height: 50px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 500;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
          }

          .edit-button {
            background-color: #3b82f6;
            border: none;
            color: #fff;
          }

          .edit-button:hover {
            background-color: #2563eb;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }

          .delete-button {
            background-color: #ef4444;
            border: none;
            color: #fff;
          }

          .delete-button:hover {
            background-color: #dc2626;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }

          .button-group {
            display: flex;
            gap: 1.5rem;
            justify-content: center;
            margin-top: 3rem;
          }

          /* Modal Styling */
          .modal-content {
            border-radius: 16px !important;
            box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1) !important;
            border: none !important;
          }

          .modal-header {
            background-color: #3b82f6;
            color: #fff;
            border-top-left-radius: 16px !important;
            border-top-right-radius: 16px !important;
            padding: 1.5rem;
          }

          .modal-title {
            font-size: 1.5rem;
          }

          .modal-body {
            padding: 2.5rem !important;
          }

          .form-label {
            font-weight: 500;
            color: #333;
            font-size: 1.1rem;
          }

          .form-control, .form-control:focus {
            border: 1px solid #e0e4e8;
            border-radius: 12px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
            font-size: 1rem;
            padding: 0.75rem;
          }

          .form-control:hover, .form-control:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25);
            outline: none;
          }

          .modal-footer-buttons {
            display: flex;
            gap: 1.5rem;
            justify-content: flex-end;
          }

          .cancel-button {
            background-color: #6b7280;
            border: none;
            color: #fff;
            width: 120px;
            height: 50px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 500;
            transition: all 0.3s ease;
          }

          .cancel-button:hover {
            background-color: #4b5563;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }

          .save-button {
            background-color: #3b82f6;
            border: none;
            color: #fff;
            width: 120px;
            height: 50px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 500;
            transition: all 0.3s ease;
          }

          .save-button:hover {
            background-color: #2563eb;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>
      <h2 className="text-center mb-5" style={{ color: "#3b82f6", fontWeight: 600, fontSize: "2.5rem" }}>
        Hồ Sơ Bác Sĩ
      </h2>
      {selectedDoctor ? (
        <div className="doctor-profile-card">
          <div className="doctor-header">
            {selectedDoctor.doctor_avatar ? (
              <img
                src={selectedDoctor.doctor_avatar}
                alt="Doctor Avatar"
                className="doctor-avatar"
              />
            ) : (
              <div className="no-avatar">
                <FaUserMd size={50} color="#6b7280" />
              </div>
            )}
            <div>
              <h3 className="doctor-name">{selectedDoctor.doctor_name}</h3>
              <div className="doctor-info">
                <div className="info-item">
                  <FaUserMd />
                  <span>Chuyên ngành: {selectedDoctor.specialty}</span>
                </div>
                <div className="info-item">
                  <FaBriefcase />
                  <span>Kinh nghiệm: {selectedDoctor.exp} năm</span>
                </div>
                <div className="info-item">
                  <FaInfoCircle />
                  <span>Tiểu sử: {selectedDoctor.doctor_bio || "Chưa có tiểu sử"}</span>
                </div>
                <div className="info-item approve">
                  <FaCheckCircle />
                  <span>
                    Trạng thái duyệt: {selectedDoctor.approve ? "Đã duyệt" : "Chưa duyệt"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="button-group">
            <Button
              className="custom-button edit-button"
              onClick={handleEditClick}
            >
              <FaUserMd /> Chỉnh Sửa
            </Button>
            <Button
              className="custom-button delete-button"
              onClick={handleDelete}
            >
              <FaUserMd /> Xóa
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-center text-muted" style={{ fontSize: "1.2rem" }}>
          Không có hồ sơ bác sĩ nào
        </p>
      )}

      {/* Modal chỉnh sửa bác sĩ */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh Sửa Hồ Sơ Bác Sĩ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type="text"
                name="doctor_name"
                value={formData.doctor_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Chuyên ngành</Form.Label>
              <Form.Select
                name="specialty_id"
                value={formData.specialty_id}
                onChange={handleChange}
                required
              >
                <option value="">Chọn chuyên ngành</option>
                {specialties.map((specialty) => (
                  <option key={specialty.id} value={specialty.id}>
                    {specialty.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Kinh nghiệm</Form.Label>
              <Form.Control
                type="number"
                name="exp"
                value={formData.exp}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Tiểu sử</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="doctor_bio"
                value={formData.doctor_bio}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="modal-footer-buttons">
              <Button
                className="cancel-button"
                onClick={handleCloseModal}
              >
                Hủy
              </Button>
              <Button
                className="save-button"
                type="submit"
              >
                Lưu
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DoctorProfile; 