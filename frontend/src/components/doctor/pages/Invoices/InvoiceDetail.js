import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const InvoiceDetail = ({ invoice, onClose }) => {
  // Kiểm tra dữ liệu để tránh lỗi khi invoice hoặc các thuộc tính không tồn tại
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
              <td><strong>Tổng tiền:</strong></td>
              <td>{getDetailValue(invoice.total_amount)}</td>
            </tr>
            <tr>
              <td><strong>Giảm giá:</strong></td>
              <td>{getDetailValue(invoice.discount)}</td>
            </tr>
            <tr>
              <td><strong>Thuế:</strong></td>
              <td>{getDetailValue(invoice.tax)}</td>
            </tr>
            <tr>
              <td><strong>Ngày đặt lịch:</strong></td>
              <td>{getDetailValue(invoice.details?.[0]?.booking?.booking_date)}</td>
            </tr>
            <tr>
              <td><strong>Khách hàng:</strong></td>
              <td>{getDetailValue(invoice.details?.[0]?.booking?.guest?.guest_name)}</td>
            </tr>
            <tr>
              <td><strong>Dịch vụ:</strong></td>
              <td>{getDetailValue(invoice.details?.[0]?.booking?.service?.services_name)}</td>
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