import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const InvoiceForm = ({ invoice, bookings, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    booking_id: '',
    discount: '',
    tax_percent: '',
  });

  useEffect(() => {
    if (invoice) {
      setFormData({
        booking_id: invoice.details?.[0]?.booking_id || '',
        discount: invoice.discount || '',
        tax_percent: invoice.tax ? (invoice.tax / (invoice.total_amount - invoice.discount)) * 100 : '',
      });
    }
  }, [invoice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal show={true} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{invoice ? 'Cập nhật hóa đơn' : 'Tạo hóa đơn mới'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Chọn Booking</Form.Label>
            <Form.Select
              name="booking_id"
              value={formData.booking_id}
              onChange={handleChange}
              required
              disabled={!!invoice} // Không cho sửa booking_id khi cập nhật
            >
              <option value="">Chọn booking</option>
              {bookings.map((booking) => (
                <option key={booking.id} value={booking.id}>
                  {`ID: ${booking.id} - Khách: ${booking.guest?.guest_name} - Dịch vụ: ${booking.service?.services_name}`}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Giảm giá (VNĐ)</Form.Label>
            <Form.Control
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              min="0"
              placeholder="Nhập số tiền giảm giá"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Thuế (%)</Form.Label>
            <Form.Control
              type="number"
              name="tax_percent"
              value={formData.tax_percent}
              onChange={handleChange}
              min="0"
              max="100"
              placeholder="Nhập phần trăm thuế"
            />
          </Form.Group>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="primary" type="submit">
              {invoice ? 'Cập nhật' : 'Tạo'}
            </Button>
            <Button variant="secondary" onClick={onCancel}>
              Hủy
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default InvoiceForm;