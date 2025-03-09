import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors, updateDoctor } from "../../../../features/slices/doctorSlice";
import { Modal, Button, Form } from "react-bootstrap";

const DoctorProfile = () => {
    const dispatch = useDispatch();
    const { doctors } = useSelector((state) => state.doctor);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        doctor_name: "",
        specialty_id: "",
        exp: "",
        doctor_bio: "",
    });

    useEffect(() => {
        dispatch(fetchDoctors());
    }, [dispatch]);

    useEffect(() => {
        if (doctors.doctors?.length > 0) {
            const doctor = doctors.doctors[0]; // Chọn bác sĩ đầu tiên
            setSelectedDoctor(doctor);
            setFormData({
                doctor_name: doctor.doctor_name,
                specialty_id: doctor.specialty_id,
                exp: doctor.exp,
                doctor_bio: doctor.doctor_bio,
            });
        }
    }, [doctors]);

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
            dispatch(updateDoctor({ id: selectedDoctor.id, doctorData: formData }));
            setShowModal(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 text-primary">Hồ Sơ Bác Sĩ</h2>
            {selectedDoctor ? (
                <div className="card shadow">
                    <div className="card-header bg-primary text-white text-center">
                        <h3>{selectedDoctor.doctor_name}</h3>
                    </div>
                    <div className="card-body">
                        <p><strong>Chuyên Ngành:</strong> {selectedDoctor.specialty_id}</p>
                        <p><strong>Kinh Nghiệm:</strong> {selectedDoctor.exp} năm</p>
                        <p><strong>Tiểu Sử:</strong> {selectedDoctor.doctor_bio}</p>
                        <p><strong>Trạng Thái Duyệt:</strong> {selectedDoctor.approve ? "Đã Duyệt" : "Chưa Duyệt"}</p>
                        {selectedDoctor.doctor_avatar ? (
                            <img src={selectedDoctor.doctor_avatar} alt="Doctor Avatar" className="img-thumbnail w-100" />
                        ) : (
                            <p>Không có ảnh</p>
                        )}
                        <div className="text-center mt-3">
                            <Button variant="primary" className="me-3" onClick={handleEditClick}>Chỉnh Sửa</Button>
                            <Button variant="danger">Xóa</Button>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center">Không có hồ sơ bác sĩ nào</p>
            )}

            {/* Modal chỉnh sửa bác sĩ */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
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
                                name="doctor_bio"
                                value={formData.doctor_bio}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">Lưu</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default DoctorProfile;
