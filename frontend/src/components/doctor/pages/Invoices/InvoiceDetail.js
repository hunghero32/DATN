import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const InvoiceDetail = ({ invoice, onClose }) => {
  const getDetailValue = (value) => value || 'Không có thông tin';

  return (
    <Modal show={true} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết hóa đơn (ID: {invoice.id})</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover responsive>
          <tbody>
            <tr>
              <td><strong>ID Hóa đơn:</strong></td>
              <td>{getDetailValue(invoice.id)}</td>
            </tr>
            <tr>
              <td><strong>Tổng tiền:</strong></td>
              <td>{getDetailValue(invoice.total_amount)} VNĐ</td>
            </tr>
            <tr>
              <td><strong>Giảm giá:</strong></td>
              <td>{getDetailValue(invoice.discount)} VNĐ</td>
            </tr>
            <tr>
              <td><strong>Thuế:</strong></td>
              <td>{getDetailValue(invoice.tax)} VNĐ</td>
            </tr>
            <tr>
              <td><strong>Ngày đặt lịch:</strong></td>
              <td>{getDetailValue(invoice.details?.[0]?.booking?.booking_date)}</td>
            </tr>
            <tr>
              <td><strong>Thời gian đặt lịch:</strong></td>
              <td>{getDetailValue(invoice.details?.[0]?.booking?.booking_time)}</td>
            </tr>
            <tr>
              <td><strong>Khách hàng:</strong></td>
              <td>{getDetailValue(invoice.details?.[0]?.booking?.guest?.guest_name)}</td>
            </tr>
            <tr>
              <td><strong>Dịch vụ:</strong></td>
              <td>{getDetailValue(invoice.details?.[0]?.booking?.service?.services_name)}</td>
            </tr>
            <tr>
              <td><strong>Bác sĩ:</strong></td>
              <td>{getDetailValue(invoice.details?.[0]?.booking?.doctor?.doctor_name)}</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InvoiceDetail;