import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const InvoiceForm = ({ invoice, bookings, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        booking_id: '',
        discount: '', // Chuyển thành chuỗi để tránh định dạng tự động
        tax_percent: '', // Chuyển thành chuỗi để tránh định dạng tự động
    });

    useEffect(() => {
        if (invoice) {
            // Khi chỉnh sửa, điền dữ liệu từ invoice
            setFormData({
                booking_id: invoice.details?.[0]?.booking_id || '',
                discount: invoice.discount !== null && invoice.discount !== undefined ? String(invoice.discount) : '0',
                tax_percent: invoice.tax && invoice.total_amount && invoice.discount
                    ? ((invoice.tax / (invoice.total_amount - invoice.tax - invoice.discount)) * 100).toFixed(0) // Không hiển thị thập phân
                    : '0',
            });
        } else {
            // Khi tạo mới, đặt giá trị mặc định
            setFormData({
                booking_id: '',
                discount: '0',
                tax_percent: '0',
            });
        }
    }, [invoice]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Chỉ cho phép nhập số nguyên, không cho phép số thập phân
        const newValue = value === '' ? '' : String(Math.max(0, parseInt(value) || 0));
        setFormData((prev) => ({ ...prev, [name]: newValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const submitData = {
            booking_id: formData.booking_id,
            discount: formData.discount ? parseFloat(formData.discount) : 0,
            tax_percent: formData.tax_percent ? parseFloat(formData.tax_percent) : 0,
        };
        onSubmit(submitData);
    };

    return (
        <Modal show={true} onHide={onCancel} centered>
            <Modal.Header closeButton style={{ borderBottom: "none", backgroundColor: "#fff" }}>
                <Modal.Title style={{ color: "#2c3e50" }}>
                    {invoice ? 'Cập Nhật Hóa Đơn' : 'Tạo Hóa Đơn Mới'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {!invoice && (
                        <Form.Group className="mb-3">
                            <Form.Label style={{ color: "#2c3e50", fontWeight: 500 }}>Chọn Booking</Form.Label>
                            <Form.Select
                                name="booking_id"
                                value={formData.booking_id}
                                onChange={handleChange}
                                required
                                style={{ borderRadius: "8px", borderColor: "#ced4da" }}
                            >
                                <option value="">Chọn booking</option>
                                {bookings.map((booking) => (
                                    <option key={booking.id} value={booking.id}>
                                        {`ID: ${booking.id} - Khách: ${booking.guest?.guest_name} - Dịch vụ: ${booking.service?.services_name} - Thời gian: ${booking.booking_time}`}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    )}

                    <Form.Group className="mb-3">
                        <Form.Label style={{ color: "#2c3e50", fontWeight: 500 }}>Giảm Giá (VNĐ)</Form.Label>
                        <Form.Control
                            type="text" // Đổi từ type="number" thành type="text" để kiểm soát định dạng
                            name="discount"
                            value={formData.discount}
                            onChange={handleChange}
                            placeholder="Nhập số tiền giảm giá"
                            style={{ borderRadius: "8px", borderColor: "#ced4da" }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label style={{ color: "#2c3e50", fontWeight: 500 }}>Thuế (%)</Form.Label>
                        <Form.Control
                            type="text" // Đổi từ type="number" thành type="text" để kiểm soát định dạng
                            name="tax_percent"
                            value={formData.tax_percent}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            placeholder="Nhập phần trăm thuế"
                            style={{ borderRadius: "8px", borderColor: "#ced4da" }}
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-end gap-2">
                        <Button
                            variant="primary"
                            type="submit"
                            className="hover-shadow"
                            style={{ borderRadius: "8px", transition: "all 0.3s" }}
                        >
                            {invoice ? 'Cập Nhật' : 'Tạo'}
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={onCancel}
                            className="hover-shadow"
                            style={{ borderRadius: "8px", transition: "all 0.3s" }}
                        >
                            Hủy
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default InvoiceForm;