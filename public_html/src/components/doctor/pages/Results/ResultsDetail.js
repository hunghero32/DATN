import React from 'react';
import { Modal, Button, Container, Row, Col, Badge } from 'react-bootstrap'; // Added Badge
import { FaFileMedicalAlt, FaTimes, FaUserAlt, FaStethoscope, FaCalendarAlt, FaClock, FaDiagnoses, FaPrescriptionBottleAlt, FaStickyNote, FaDownload, FaPaperclip, FaEdit } from 'react-icons/fa'; // Updated Icons

// Helper function
const getDetailValue = (value, placeholder = 'Chưa cập nhật') => value || placeholder;

// --- Renamed Component & Prop ---
const ResultDetail = ({ result, onClose, onEditClick }) => {

    // Construct file URL (adjust base URL as needed)
    const fileUrl = result?.file ? `http://127.0.0.1:8000/storage/${result.file}` : null;
    const fileName = result?.file ? result.file.split('/').pop() : null; // Extract file name

    return (
        <Modal show={true} onHide={onClose} centered size="lg" backdrop="static">
            <Modal.Header closeButton style={{ borderBottom: "1px solid #edf2f9", padding: "20px", backgroundColor: "#f8f9fa" }}>
                <div className="d-flex align-items-center">
                    {/* --- Updated Icon and Title --- */}
                    <FaFileMedicalAlt size={24} style={{ color: "#3498db", marginRight: "10px" }} />
                    <Modal.Title style={{ color: "#2c3e50", fontSize: "1.25rem" }}>
                        Chi Tiết Kê Đơn #{result?.id}
                    </Modal.Title>
                </div>
            </Modal.Header>
            <Modal.Body style={{ padding: "25px" }}>
                <Container fluid>
                    {/* --- Booking Information --- */}
                    <Row className="mb-4">
                        <Col md={12}>
                             <h5 style={{ color: "#2c3e50", fontWeight: 600, marginBottom: "15px", borderBottom: "1px solid #eee", paddingBottom:"10px" }}>Thông Tin Lịch Khám</h5>
                        </Col>
                        <Col md={6} className="mb-3 mb-md-0">
                            <p style={{ margin: "0 0 8px 0" }}><FaUserAlt className="me-2 text-primary"/> <strong>Bệnh Nhân:</strong> {getDetailValue(result?.guest?.guest_name)}</p>
                            <p style={{ margin: "0 0 8px 0" }}><FaStethoscope className="me-2 text-primary"/> <strong>Dịch Vụ:</strong> {getDetailValue(result?.booking?.service?.services_name)}</p>
                        </Col>
                        <Col md={6}>
                             <p style={{ margin: "0 0 8px 0" }}><FaCalendarAlt className="me-2 text-primary"/> <strong>Ngày Khám:</strong> {getDetailValue(result?.booking?.booking_date)}</p>
                             <p style={{ margin: "0 0 8px 0" }}><FaClock className="me-2 text-primary"/> <strong>Giờ Khám:</strong> {getDetailValue(result?.booking?.booking_time)}</p>
                        </Col>
                    </Row>

                     {/* --- Result Details --- */}
                     <Row className="mb-3">
                         <Col md={12}>
                             <h5 style={{ color: "#2c3e50", fontWeight: 600, marginBottom: "15px", borderBottom: "1px solid #eee", paddingBottom:"10px" }}>Chi Tiết Kết Quả Khám</h5>
                         </Col>
                     </Row>

                     <Row className="mb-3">
                         <Col md={12}>
                             <p style={{ margin: "0 0 5px 0", fontWeight:"500" }}><FaDiagnoses className="me-2 text-primary"/> <strong>Chẩn Đoán:</strong></p>
                             <div style={{ padding: "10px", background: "#f8f9fa", borderRadius: "5px", minHeight:"50px", whiteSpace: "pre-wrap" }}>
                                {getDetailValue(result?.diagnosis)}
                             </div>
                         </Col>
                     </Row>

                     <Row className="mb-3">
                         <Col md={12}>
                              <p style={{ margin: "0 0 5px 0", fontWeight:"500" }}><FaPrescriptionBottleAlt className="me-2 text-primary"/> <strong>Đơn Thuốc:</strong></p>
                              <div style={{ padding: "10px", background: "#f8f9fa", borderRadius: "5px", minHeight:"80px", whiteSpace: "pre-wrap" }}>
                                {getDetailValue(result?.prescription)}
                              </div>
                         </Col>
                     </Row>

                     <Row className="mb-4">
                         <Col md={12}>
                              <p style={{ margin: "0 0 5px 0", fontWeight:"500" }}><FaStickyNote className="me-2 text-primary"/> <strong>Ghi Chú Bác Sĩ:</strong></p>
                               <div style={{ padding: "10px", background: "#f8f9fa", borderRadius: "5px", minHeight:"50px", whiteSpace: "pre-wrap" }}>
                                {getDetailValue(result?.note)}
                               </div>
                         </Col>
                     </Row>

                     {/* --- File Attachment --- */}
                     {fileUrl && (
                         <Row>
                             <Col md={12}>
                                 <p style={{ margin: "0 0 5px 0", fontWeight:"500" }}><FaPaperclip className="me-2 text-primary"/> <strong>Tệp Đính Kèm:</strong></p>
                                 <Button
                                     variant="outline-primary"
                                     size="sm"
                                     href={fileUrl}
                                     target="_blank" // Open in new tab
                                     rel="noopener noreferrer" // Security best practice
                                     style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                                 >
                                     <FaDownload /> {fileName || 'Tải xuống'}
                                 </Button>
                             </Col>
                         </Row>
                     )}

                </Container>
            </Modal.Body>
            <Modal.Footer style={{ borderTop: "1px solid #edf2f9", padding: "20px", backgroundColor: "#f8f9fa", display: "flex", justifyContent: "space-between" }}>
                 {/* Nút Sửa */}
                 <Button
                    variant="primary"
                    onClick={() => onEditClick(result)} // Gọi hàm onEditClick từ props
                    style={{ borderRadius: "8px", padding: "10px 20px", backgroundColor: "#3498db", border: "none", display: "flex", alignItems: "center", gap: "8px" }}
                 >
                    <FaEdit /> Sửa Kê Đơn
                 </Button>
                {/* Nút Đóng */}
                <Button
                    variant="secondary"
                    onClick={onClose}
                    style={{ borderRadius: "8px", padding: "10px 20px", backgroundColor: "#6c757d", border: "none", /* marginLeft: "auto" bỏ đi */ display: "flex", alignItems: "center", gap: "8px" }}
                >
                    <FaTimes /> Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

// --- Export Renamed Component ---
export default ResultDetail;