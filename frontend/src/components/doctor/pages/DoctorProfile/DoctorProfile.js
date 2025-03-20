import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateDoctor } from "../../../../features/slices/doctorSlice";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
    const dispatch = useDispatch();
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        doctor_name: "",
        specialty_id: "",
        exp: "",
        doctor_bio: "",
    });

    // Lấy thông tin hồ sơ bác sĩ từ API
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
                    doctor_name: doctor.doctor_name,
                    specialty_id: doctor.specialty_id,
                    exp: doctor.exp,
                    doctor_bio: doctor.doctor_bio,
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedDoctor) {
            dispatch(updateDoctor({ id: selectedDoctor.id, doctorData: formData }))
                .unwrap()
                .then(() => {
                    toast.success("Cập nhật hồ sơ thành công!");
                    setShowModal(false);
                    // Cập nhật lại giao diện sau khi chỉnh sửa
                    setSelectedDoctor({ ...selectedDoctor, ...formData });
                })
                .catch((error) => {
                    toast.error("Cập nhật hồ sơ thất bại!");
                    console.error(error);
                });
        }
    };

    const handleDelete = () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa hồ sơ này?")) {
            // Logic xóa bác sĩ (cần thêm API hoặc action trong doctorSlice)
            toast.success("Xóa hồ sơ thành công!");
            // Có thể redirect hoặc làm mới trang sau khi xóa
        }
    };

    return (
        <div className="container mt-5 doctor-profile-container">
            <h2 className="text-center mb-5 text-primary fw-bold">Hồ Sơ Bác Sĩ</h2>
            {selectedDoctor ? (
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        <div className="card shadow-lg border-0 doctor-profile-card">
                            <div className="card-body text-center">
                                {/* Avatar */}
                                <div className="doctor-avatar mb-4">
                                    {selectedDoctor.doctor_avatar ? (
                                        <img
                                            src={selectedDoctor.doctor_avatar}
                                            alt="Doctor Avatar"
                                            className="rounded-circle img-fluid"
                                        />
                                    ) : (
                                        <div className="no-avatar rounded-circle d-flex align-items-center justify-content-center">
                                            <i className="fas fa-user-md fa-3x text-muted"></i>
                                        </div>
                                    )}
                                </div>

                                {/* Thông tin bác sĩ */}
                                <h3 className="card-title fw-bold text-primary mb-3">
                                    {selectedDoctor.doctor_name}
                                </h3>
                                <div className="doctor-info text-start">
                                    <p className="mb-2">
                                        <strong><i className="fas fa-stethoscope me-2"></i>Chuyên Ngành:</strong>{" "}
                                        {selectedDoctor.specialty_id}
                                    </p>
                                    <p className="mb-2">
                                        <strong><i className="fas fa-briefcase me-2"></i>Kinh Nghiệm:</strong>{" "}
                                        {selectedDoctor.exp} năm
                                    </p>
                                    <p className="mb-2">
                                        <strong><i className="fas fa-info-circle me-2"></i>Tiểu Sử:</strong>{" "}
                                        {selectedDoctor.doctor_bio}
                                    </p>
                                    <p className="mb-4">
                                        <strong><i className="fas fa-check-circle me-2"></i>Trạng Thái Duyệt:</strong>{" "}
                                        <span
                                            className={
                                                selectedDoctor.approve
                                                    ? "text-success"
                                                    : "text-warning"
                                            }
                                        >
                                            {selectedDoctor.approve ? "Đã Duyệt" : "Chưa Duyệt"}
                                        </span>
                                    </p>
                                </div>

                                {/* Nút hành động */}
                                <div className="d-flex justify-content-center gap-3">
                                    <Button
                                        variant="primary"
                                        className="px-4 py-2"
                                        onClick={handleEditClick}
                                    >
                                        <i className="fas fa-edit me-2"></i>Chỉnh Sửa
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className="px-4 py-2"
                                        onClick={handleDelete}
                                    >
                                        <i className="fas fa-trash-alt me-2"></i>Xóa
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center text-muted">Không có hồ sơ bác sĩ nào</p>
            )}

            {/* Modal chỉnh sửa bác sĩ */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton className="bg-primary text-white">
                    <Modal.Title>Chỉnh Sửa Hồ Sơ Bác Sĩ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên:</Form.Label>
                            <Form.Control
                                type="text"
                                name="doctor_name"
                                value={formData.doctor_name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Chuyên Ngành:</Form.Label>
                            <Form.Control
                                type="text"
                                name="specialty_id"
                                value={formData.specialty_id}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Kinh Nghiệm:</Form.Label>
                            <Form.Control
                                type="number"
                                name="exp"
                                value={formData.exp}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Tiểu Sử:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="doctor_bio"
                                value={formData.doctor_bio}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Hủy
                            </Button>
                            <Button variant="primary" type="submit">
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