import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaFileInvoiceDollar, FaMoneyBillWave, FaPercent, FaUserAlt, FaCalendarAlt, FaClock, FaStethoscope } from 'react-icons/fa';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount || 0);
};

const calculateTotal = (price, discount, taxPercent) => {
    const numericPrice = parseInt(price) || 0;
    const numericDiscount = parseInt(discount) || 0;
    const numericTaxPercent = parseInt(taxPercent) || 0;
    
    const afterDiscount = numericPrice - numericDiscount;
    const taxAmount = (afterDiscount * numericTaxPercent) / 100;
    
    return afterDiscount + taxAmount;
};

const InvoiceForm = ({ invoice, bookings, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        booking_id: '',
        discount: '0',
        tax_percent: '0',
    });

    const [displayValues, setDisplayValues] = useState({
        discount: '0 VNĐ',
        tax_percent: '0%',
        originalPrice: '0 VNĐ',
        finalPrice: '0 VNĐ',
        taxAmount: '0 VNĐ'
    });

    useEffect(() => {
        if (invoice) {
            console.log('Invoice data:', invoice);
            const discount = String(invoice.discount || '0');
            const taxPercent = String(invoice.tax_percent || '0');
            const originalPrice = invoice.details?.[0]?.booking?.service?.price || 0;
            const currentTax = invoice.tax || 0;
            const currentTotal = invoice.total_amount || 0;
            
            setFormData(prev => {
                console.log('Setting form data with tax_percent:', taxPercent);
                return {
                    booking_id: invoice.details?.[0]?.booking_id || '',
                    discount: discount,
                    tax_percent: taxPercent,
                };
            });

            setDisplayValues({
                discount: `${formatCurrency(discount)} VNĐ`,
                tax_percent: `${taxPercent}%`,
                originalPrice: `${formatCurrency(originalPrice)} VNĐ`,
                finalPrice: `${formatCurrency(currentTotal)} VNĐ`,
                taxAmount: `${formatCurrency(currentTax)} VNĐ`
            });
        } else {
            setFormData({
                booking_id: '',
                discount: '0',
                tax_percent: '0',
            });
            setDisplayValues({
                discount: '0 VNĐ',
                tax_percent: '0%',
                originalPrice: '0 VNĐ',
                finalPrice: '0 VNĐ',
                taxAmount: '0 VNĐ'
            });
        }
    }, [invoice]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Xử lý giá trị nhập vào
        let numericValue = value.replace(/[^0-9]/g, '');
        
        if (name === 'tax_percent') {
            // Loại bỏ dấu % nếu có
            numericValue = value.replace(/[^0-9]/g, '');
            numericValue = Math.min(100, parseInt(numericValue) || 0).toString();
            console.log('Setting tax percent to:', numericValue); // Log để kiểm tra
            
            setFormData(prev => {
                const newFormData = {
                    ...prev,
                    tax_percent: numericValue
                };
                console.log('New form data:', newFormData); // Log để kiểm tra
                return newFormData;
            });

            // Cập nhật giá trị tổng khi thay đổi thuế
            const originalPrice = currentBooking?.service?.price || 0;
            const currentDiscount = parseInt(formData.discount) || 0;
            const afterDiscount = originalPrice - currentDiscount;
            const taxAmount = Math.round((afterDiscount * parseInt(numericValue)) / 100);
            const finalPrice = afterDiscount + taxAmount;

            setDisplayValues(prev => ({
                ...prev,
                tax_percent: `${numericValue}%`,
                taxAmount: `${formatCurrency(taxAmount)} VNĐ`,
                finalPrice: `${formatCurrency(finalPrice)} VNĐ`
            }));
        } else if (name === 'discount') {
            setFormData(prev => ({
                ...prev,
                discount: numericValue
            }));
            setDisplayValues(prev => ({
                ...prev,
                discount: `${formatCurrency(numericValue)} VNĐ`
            }));

            // Cập nhật giá trị tổng khi thay đổi giảm giá
            const originalPrice = currentBooking?.service?.price || 0;
            const afterDiscount = originalPrice - parseInt(numericValue);
            const taxAmount = Math.round((afterDiscount * parseInt(formData.tax_percent)) / 100);
            const finalPrice = afterDiscount + taxAmount;

            setDisplayValues(prev => ({
                ...prev,
                taxAmount: `${formatCurrency(taxAmount)} VNĐ`,
                finalPrice: `${formatCurrency(finalPrice)} VNĐ`
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const originalPrice = currentBooking?.service?.price || 0;
        const numericDiscount = parseInt(formData.discount) || 0;
        const numericTaxPercent = parseInt(formData.tax_percent) || 0;
        
        const afterDiscount = originalPrice - numericDiscount;
        const taxAmount = Math.round((afterDiscount * numericTaxPercent) / 100);
        const finalPrice = afterDiscount + taxAmount;
        
        const submitData = {
            booking_id: formData.booking_id,
            discount: numericDiscount,
            tax_percent: numericTaxPercent,
            tax: taxAmount,
            total_amount: finalPrice
        };
        onSubmit(submitData);
    };

    // Lấy thông tin booking hiện tại
    const currentBooking = invoice 
        ? invoice.details?.[0]?.booking 
        : bookings.find(b => b.id === parseInt(formData.booking_id));

    return (
        <Modal show={true} onHide={onCancel} centered size="lg" backdrop="static">
            <Modal.Header closeButton style={{ 
                borderBottom: "1px solid #edf2f9",
                padding: "20px",
                backgroundColor: "#f8f9fa"
            }}>
                <div className="d-flex align-items-center">
                    <FaFileInvoiceDollar size={24} style={{ color: "#3498db", marginRight: "10px" }} />
                    <Modal.Title style={{ color: "#2c3e50", fontSize: "1.25rem" }}>
                        {invoice ? 'Cập Nhật Kê Đơn' : 'Tạo Kê Đơn Mới'}
                    </Modal.Title>
                </div>
            </Modal.Header>
            <Modal.Body style={{ padding: "20px" }}>
                {/* Thông tin booking */}
                {currentBooking && (
                    <div className="booking-info mb-4 p-3" style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
                        <h6 className="mb-3" style={{ color: "#2c3e50", fontWeight: 600 }}>Thông Tin Lịch Khám</h6>
                        <div className="row">
                            <div className="col-md-6">
                                <p className="mb-2">
                                    <FaUserAlt className="me-2" style={{ color: "#3498db" }} />
                                    <strong>Bệnh nhân:</strong> {currentBooking.guest?.guest_name}
                                </p>
                                <p className="mb-2">
                                    <FaCalendarAlt className="me-2" style={{ color: "#3498db" }} />
                                    <strong>Ngày khám:</strong> {currentBooking.booking_date}
                                </p>
                                <p className="mb-2">
                                    <FaClock className="me-2" style={{ color: "#3498db" }} />
                                    <strong>Giờ khám:</strong> {currentBooking.booking_time}
                                </p>
                            </div>
                            <div className="col-md-6">
                                <p className="mb-2">
                                    <FaStethoscope className="me-2" style={{ color: "#3498db" }} />
                                    <strong>Dịch vụ:</strong> {currentBooking.service?.services_name}
                                </p>
                                <p className="mb-2">
                                    <FaMoneyBillWave className="me-2" style={{ color: "#3498db" }} />
                                    <strong>Giá dịch vụ:</strong> {displayValues.originalPrice}
                                </p>
                                <p className="mb-2">
                                    <FaMoneyBillWave className="me-2" style={{ color: "#e74c3c" }} />
                                    <strong>Giảm giá:</strong> -{displayValues.discount}
                                </p>
                                <p className="mb-2">
                                    <FaPercent className="me-2" style={{ color: "#f39c12" }} />
                                    <strong>Thuế:</strong> +{displayValues.taxAmount}
                                </p>
                                <p className="mb-2" style={{ fontSize: "1.1em", fontWeight: "bold", color: "#2c3e50" }}>
                                    <FaMoneyBillWave className="me-2" style={{ color: "#27ae60" }} />
                                    <strong>Tổng tiền:</strong> {displayValues.finalPrice}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <Form onSubmit={handleSubmit}>
                    {!invoice && (
                        <Form.Group className="mb-4">
                            <Form.Label style={{ color: "#2c3e50", fontWeight: 500, marginBottom: "8px" }}>
                                Chọn Lịch Khám
                            </Form.Label>
                            <Form.Select
                                name="booking_id"
                                value={formData.booking_id}
                                onChange={handleChange}
                                required
                                style={{
                                    borderRadius: "8px",
                                    padding: "12px",
                                    border: "1px solid #ced4da",
                                    backgroundColor: "#f8f9fa"
                                }}
                            >
                                <option value="">-- Chọn lịch khám --</option>
                                {bookings.map((booking) => (
                                    <option key={booking.id} value={booking.id}>
                                        {`${booking.guest?.guest_name} - ${booking.service?.services_name} - ${formatCurrency(booking.service?.price)} VNĐ`}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    )}

                    <div className="row">
                        <div className="col-md-6">
                            <Form.Group className="mb-4">
                                <Form.Label style={{ color: "#2c3e50", fontWeight: 500, marginBottom: "8px" }}>
                                    <FaMoneyBillWave style={{ marginRight: "8px" }} />
                                    Giảm Giá
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="discount"
                                    value={displayValues.discount}
                                    onChange={handleChange}
                                    placeholder="Nhập số tiền giảm giá"
                                    style={{
                                        borderRadius: "8px",
                                        padding: "12px",
                                        border: "1px solid #ced4da",
                                        backgroundColor: "#f8f9fa"
                                    }}
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-6">
                            <Form.Group className="mb-4">
                                <Form.Label style={{ color: "#2c3e50", fontWeight: 500, marginBottom: "8px" }}>
                                    <FaPercent style={{ marginRight: "8px" }} />
                                    Thuế
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="tax_percent"
                                    value={formData.tax_percent}
                                    onChange={handleChange}
                                    placeholder="Nhập phần trăm thuế"
                                    style={{
                                        borderRadius: "8px",
                                        padding: "12px",
                                        border: "1px solid #ced4da",
                                        backgroundColor: "#f8f9fa"
                                    }}
                                />
                            </Form.Group>
                        </div>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer style={{ 
                borderTop: "1px solid #edf2f9",
                padding: "20px",
                backgroundColor: "#f8f9fa"
            }}>
                <Button
                    variant="secondary"
                    onClick={onCancel}
                    style={{
                        borderRadius: "8px",
                        padding: "10px 20px",
                        backgroundColor: "#6c757d",
                        border: "none"
                    }}
                >
                    Hủy
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    style={{
                        borderRadius: "8px",
                        padding: "10px 20px",
                        backgroundColor: "#3498db",
                        border: "none",
                        marginLeft: "10px"
                    }}
                >
                    {invoice ? 'Cập Nhật' : 'Tạo Kê Đơn'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default InvoiceForm;