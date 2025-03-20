import React from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';

const InvoiceDetail = ({ invoice, onClose }) => {
    const getDetailValue = (value) => value || 'Không có thông tin';

    // Giả lập ngày giờ tạo hóa đơn (nếu API không cung cấp)
    const currentDate = new Date().toLocaleDateString('vi-VN');
    const currentTime = new Date().toLocaleTimeString('vi-VN');

    // Tính servicePrice từ dữ liệu invoice
    const servicePrice = invoice.details?.[0]?.booking?.service?.price || 0;

    return (
        <Modal show={true} onHide={onClose} centered size="lg">
            <Modal.Body style={{ padding: "30px", backgroundColor: "#f9f9f9" }}>
                <Container className="invoice-container" style={{ backgroundColor: "#fff", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)" }}>
                    {/* Tiêu đề hóa đơn */}
                    <Row className="text-center mb-4">
                        <Col>
                            <h3 style={{ color: "#2c3e50", fontWeight: 700, textTransform: "uppercase" }}>
                                HÓA ĐƠN KHÁM BỆNH
                            </h3>
                            <h5 style={{ color: "#3498db", fontWeight: 500 }}>
                                PHÒNG KHÁM ĐA KHOA SỐ 1
                            </h5>
                            <p style={{ color: "#7f8c8d", fontSize: "14px" }}>
                                Địa chỉ: 123 Đường Sức Khỏe, Quận 1, TP. Hồ Chí Minh<br />
                                Số điện thoại: (028) 1234-5678
                            </p>
                        </Col>
                    </Row>

                    {/* Thông tin hóa đơn */}
                    <Row className="mb-4">
                        <Col md={6}>
                            <p style={{ color: "#2c3e50", fontWeight: 500 }}>
                                <strong>Mã Hóa Đơn:</strong> {getDetailValue(invoice.id)}
                            </p>
                            <p style={{ color: "#2c3e50", fontWeight: 500 }}>
                                <strong>Ngày Xuất Hóa Đơn:</strong> {currentDate} - {currentTime}
                            </p>
                        </Col>
                        <Col md={6} className="text-end">
                            <p style={{ color: "#2c3e50", fontWeight: 500 }}>
                                <strong>Khách Hàng:</strong> {getDetailValue(invoice.details?.[0]?.booking?.guest?.guest_name)}
                            </p>
                        </Col>
                    </Row>

                    {/* Thông tin chi tiết dịch vụ */}
                    <Row className="mb-4">
                        <Col>
                            <h5 style={{ color: "#2c3e50", fontWeight: 600, borderBottom: "2px solid #3498db", paddingBottom: "5px" }}>
                                Chi Tiết Dịch Vụ
                            </h5>
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover" style={{ marginTop: "10px" }}>
                                    <thead>
                                        <tr style={{ backgroundColor: "#f8f9fa" }}>
                                            <th style={{ color: "#2c3e50", fontWeight: 600 }}>Dịch Vụ</th>
                                            <th style={{ color: "#2c3e50", fontWeight: 600 }}>Bác Sĩ</th>
                                            <th style={{ color: "#2c3e50", fontWeight: 600 }}>Ngày Khám</th>
                                            <th style={{ color: "#2c3e50", fontWeight: 600 }}>Thời Gian</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{getDetailValue(invoice.details?.[0]?.booking?.service?.services_name)}</td>
                                            <td>{getDetailValue(invoice.details?.[0]?.booking?.doctor?.doctor_name)}</td>
                                            <td>{getDetailValue(invoice.details?.[0]?.booking?.booking_date)}</td>
                                            <td>{getDetailValue(invoice.details?.[0]?.booking?.booking_time)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Col>
                    </Row>

                    {/* Thông tin thanh toán */}
                    <Row className="mb-4">
                        <Col>
                            <h5 style={{ color: "#2c3e50", fontWeight: 600, borderBottom: "2px solid #3498db", paddingBottom: "5px" }}>
                                Chi Tiết Thanh Toán
                            </h5>
                            <div style={{ padding: "10px 0" }}>
                                <Row>
                                    <Col md={6}>
                                        <p style={{ color: "#2c3e50", fontWeight: 500 }}>
                                            <strong>Tổng Tiền Dịch Vụ:</strong> {servicePrice.toLocaleString('vi-VN')} VNĐ
                                        </p>
                                        <p style={{ color: "#2c3e50", fontWeight: 500 }}>
                                            <strong>Giảm Giá:</strong> {(invoice.discount || 0).toLocaleString('vi-VN')} VNĐ
                                        </p>
                                    </Col>
                                    <Col md={6} className="text-end">
                                        <p style={{ color: "#2c3e50", fontWeight: 500 }}>
                                            <strong>Thuế (VAT):</strong> {(invoice.tax || 0).toLocaleString('vi-VN')} VNĐ
                                        </p>
                                        <p style={{ color: "#e74c3c", fontWeight: 600, fontSize: "18px" }}>
                                            <strong>Tổng Cộng:</strong> {(invoice.total_amount || 0).toLocaleString('vi-VN')} VNĐ
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>

                    {/* Chân hóa đơn */}
                    <Row className="text-center mt-4">
                        <Col>
                            <p style={{ color: "#7f8c8d", fontSize: "14px" }}>
                                Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi!<br />
                                Vui lòng giữ hóa đơn để đối chiếu khi cần thiết.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer style={{ borderTop: "none", backgroundColor: "#f9f9f9" }}>
                <Button
                    variant="outline-primary"
                    className="hover-shadow me-2"
                    style={{ borderRadius: "8px", transition: "all 0.3s" }}
                    onClick={() => window.print()}
                >
                    In Hóa Đơn
                </Button>
                <Button
                    variant="secondary"
                    onClick={onClose}
                    className="hover-shadow"
                    style={{ borderRadius: "8px", transition: "all 0.3s" }}
                >
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default InvoiceDetail;