import React from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { FaFileInvoiceDollar, FaPrint, FaTimes } from 'react-icons/fa';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount || 0);
};

const InvoiceDetail = ({ invoice, onClose }) => {
    const getDetailValue = (value) => value || 'Không có thông tin';

    const currentDate = new Date().toLocaleDateString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const currentTime = new Date().toLocaleTimeString('vi-VN');

    const servicePrice = invoice.details?.[0]?.booking?.service?.price || 0;

    return (
        <Modal show={true} onHide={onClose} centered size="lg" backdrop="static">
            <Modal.Header closeButton style={{ 
                borderBottom: "1px solid #edf2f9",
                padding: "20px",
                backgroundColor: "#f8f9fa"
            }}>
                <div className="d-flex align-items-center">
                    <FaFileInvoiceDollar size={24} style={{ color: "#3498db", marginRight: "10px" }} />
                    <Modal.Title style={{ color: "#2c3e50", fontSize: "1.25rem" }}>
                        Chi Tiết Kê Đơn
                    </Modal.Title>
                </div>
            </Modal.Header>
            <Modal.Body style={{ padding: "0" }}>
                <Container className="invoice-container" style={{ 
                    backgroundColor: "#fff",
                    padding: "30px",
                    borderRadius: "0",
                    boxShadow: "none"
                }}>
                    {/* Logo và thông tin phòng khám */}
                    <Row className="text-center mb-5">
                        <Col>
                            <h3 style={{ 
                                color: "#2c3e50",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                marginBottom: "15px"
                            }}>
                                KÊ ĐƠN THUỐC
                            </h3>
                            <h5 style={{ 
                                color: "#3498db",
                                fontWeight: 600,
                                marginBottom: "10px"
                            }}>
                                PHÒNG KHÁM ĐA KHOA MEDIPRO
                            </h5>
                            <p style={{ 
                                color: "#7f8c8d",
                                fontSize: "14px",
                                margin: "0"
                            }}>
                                Địa chỉ: 123 Đường Sức Khỏe, Quận 1, TP. Hồ Chí Minh<br />
                                Hotline: (028) 1234-5678 | Email: info@medipro.com
                            </p>
                        </Col>
                    </Row>

                    {/* Thông tin kê đơn */}
                    <Row className="mb-4">
                        <Col md={6}>
                            <div style={{ 
                                backgroundColor: "#f8f9fa",
                                padding: "15px",
                                borderRadius: "8px"
                            }}>
                                <p style={{ margin: "0", color: "#2c3e50" }}>
                                    <strong>Mã Kê Đơn:</strong> #{getDetailValue(invoice.id)}
                                </p>
                                <p style={{ margin: "8px 0 0 0", color: "#2c3e50" }}>
                                    <strong>Ngày Kê Đơn:</strong> {currentDate}
                                </p>
                                <p style={{ margin: "8px 0 0 0", color: "#2c3e50" }}>
                                    <strong>Thời Gian:</strong> {currentTime}
                                </p>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div style={{ 
                                backgroundColor: "#f8f9fa",
                                padding: "15px",
                                borderRadius: "8px"
                            }}>
                                <p style={{ margin: "0", color: "#2c3e50" }}>
                                    <strong>Bệnh Nhân:</strong> {getDetailValue(invoice.details?.[0]?.booking?.guest?.guest_name)}
                                </p>
                                <p style={{ margin: "8px 0 0 0", color: "#2c3e50" }}>
                                    <strong>Bác Sĩ:</strong> {getDetailValue(invoice.details?.[0]?.booking?.doctor?.doctor_name)}
                                </p>
                                <p style={{ margin: "8px 0 0 0", color: "#2c3e50" }}>
                                    <strong>Chuyên Khoa:</strong> {getDetailValue(invoice.details?.[0]?.booking?.service?.services_name)}
                                </p>
                            </div>
                        </Col>
                    </Row>

                    {/* Chi tiết dịch vụ */}
                    <Row className="mb-4">
                        <Col>
                            <h5 style={{ 
                                color: "#2c3e50",
                                fontWeight: 600,
                                padding: "10px 15px",
                                backgroundColor: "#f8f9fa",
                                borderRadius: "8px",
                                marginBottom: "15px"
                            }}>
                                Chi Tiết Dịch Vụ
                            </h5>
                            <div className="table-responsive">
                                <table className="table" style={{ marginBottom: "0" }}>
                                    <thead>
                                        <tr style={{ backgroundColor: "#f8f9fa" }}>
                                            <th style={{ 
                                                padding: "12px 15px",
                                                color: "#2c3e50",
                                                fontWeight: 600,
                                                borderBottom: "2px solid #edf2f9"
                                            }}>Dịch Vụ</th>
                                            <th style={{ 
                                                padding: "12px 15px",
                                                color: "#2c3e50",
                                                fontWeight: 600,
                                                borderBottom: "2px solid #edf2f9"
                                            }}>Ngày Khám</th>
                                            <th style={{ 
                                                padding: "12px 15px",
                                                color: "#2c3e50",
                                                fontWeight: 600,
                                                borderBottom: "2px solid #edf2f9"
                                            }}>Thời Gian</th>
                                            <th style={{ 
                                                padding: "12px 15px",
                                                color: "#2c3e50",
                                                fontWeight: 600,
                                                borderBottom: "2px solid #edf2f9",
                                                textAlign: "right"
                                            }}>Giá Dịch Vụ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{ padding: "12px 15px" }}>
                                                {getDetailValue(invoice.details?.[0]?.booking?.service?.services_name)}
                                            </td>
                                            <td style={{ padding: "12px 15px" }}>
                                                {getDetailValue(invoice.details?.[0]?.booking?.booking_date)}
                                            </td>
                                            <td style={{ padding: "12px 15px" }}>
                                                {getDetailValue(invoice.details?.[0]?.booking?.booking_time)}
                                            </td>
                                            <td style={{ padding: "12px 15px", textAlign: "right" }}>
                                                {formatCurrency(servicePrice)} VNĐ
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Col>
                    </Row>

                    {/* Thông tin thanh toán */}
                    <Row>
                        <Col md={6} className="offset-md-6">
                            <div style={{ 
                                backgroundColor: "#f8f9fa",
                                padding: "20px",
                                borderRadius: "8px"
                            }}>
                                <div className="d-flex justify-content-between mb-2">
                                    <span style={{ color: "#2c3e50" }}>Tổng Tiền Dịch Vụ:</span>
                                    <span style={{ color: "#2c3e50" }}>{formatCurrency(servicePrice)} VNĐ</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span style={{ color: "#2c3e50" }}>Giảm Giá:</span>
                                    <span style={{ color: "#27ae60" }}>- {formatCurrency(invoice.discount || 0)} VNĐ</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <span style={{ color: "#2c3e50" }}>Thuế (VAT):</span>
                                    <span style={{ color: "#2c3e50" }}>+ {formatCurrency(invoice.tax || 0)} VNĐ</span>
                                </div>
                                <div className="d-flex justify-content-between" style={{ 
                                    borderTop: "2px solid #edf2f9",
                                    paddingTop: "10px",
                                    marginTop: "10px"
                                }}>
                                    <span style={{ 
                                        color: "#2c3e50",
                                        fontWeight: 600,
                                        fontSize: "16px"
                                    }}>Tổng Cộng:</span>
                                    <span style={{ 
                                        color: "#e74c3c",
                                        fontWeight: 600,
                                        fontSize: "16px"
                                    }}>{formatCurrency(invoice.total_amount || 0)} VNĐ</span>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    {/* Ghi chú */}
                    <Row className="mt-4">
                        <Col>
                            <p style={{ 
                                color: "#7f8c8d",
                                fontSize: "14px",
                                textAlign: "center",
                                margin: "0"
                            }}>
                                Cảm ơn quý khách đã tin tưởng sử dụng dịch vụ của chúng tôi!<br />
                                Vui lòng giữ kê đơn này để đối chiếu khi cần thiết.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer style={{ 
                borderTop: "1px solid #edf2f9",
                padding: "20px",
                backgroundColor: "#f8f9fa"
            }}>
                <Button
                    variant="primary"
                    onClick={() => window.print()}
                    style={{
                        borderRadius: "8px",
                        padding: "10px 20px",
                        backgroundColor: "#3498db",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                    }}
                >
                    <FaPrint /> In Kê Đơn
                </Button>
                <Button
                    variant="secondary"
                    onClick={onClose}
                    style={{
                        borderRadius: "8px",
                        padding: "10px 20px",
                        backgroundColor: "#6c757d",
                        border: "none",
                        marginLeft: "10px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                    }}
                >
                    <FaTimes /> Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default InvoiceDetail;