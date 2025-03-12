import React, { useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const CompletedAppointments = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const navigate = useNavigate();

  const completedAppointments = [
    {
      time: '10h - 11h',
      no: 1,
      name: 'Nguyen Van A',
      gender: 'Male',
      phone: '0987654321',
      email: 'nguyenvana@gmail.com',
      reason: 'Khám tổng quát',
      address: 'Ho Chi Minh',
      diagnosis: 'Bình thường',
      prescription: 'Vitamin C, Thuốc bổ',
      note: 'Uống thuốc đúng giờ',
      status: 'Completed'
    }
  ];

  const handleShowDetail = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleTransferPage = () => {
    setShowModal(false);
    navigate('/received');
  };


  return (
    <div className="container mt-5">
      <h3 className="mb-4">Danh sách lịch đã khám xong</h3>
      <div className="card p-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Thời gian</th>
              <th>No</th>
              <th>Tên bệnh nhân</th>
              <th>Giới tính</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {completedAppointments.map((app, index) => (
              <tr key={index}>
                <td>{app.time}</td>
                <td>{app.no}</td>
                <td>{app.name}</td>
                <td>{app.gender}</td>
                <td>
                  <Button variant="info" className="me-2" onClick={() => handleShowDetail(app)}>
                    Chi tiết
                  </Button>
                  <Button variant="success" onClick={() => navigate(`/doctor/FillExaminationResult`)}>Điền Kết Quả</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Thông tin bệnh nhân</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <Form>
              <Form.Group>
                <Form.Label>Tên:</Form.Label>
                <Form.Control type="text" value={selectedAppointment.name} readOnly />
              </Form.Group>
              <Form.Group>
                <Form.Label>Số điện thoại:</Form.Label>
                <Form.Control type="text" value={selectedAppointment.phone} readOnly />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" value={selectedAppointment.email} readOnly />
              </Form.Group>
              <Form.Group>
                <Form.Label>Địa chỉ:</Form.Label>
                <Form.Control type="text" value={selectedAppointment.address} readOnly />
              </Form.Group>
              <Form.Group>
                <Form.Label>Chẩn đoán:</Form.Label>
                <Form.Control type="text" value={selectedAppointment.diagnosis} readOnly />
              </Form.Group>
              <Form.Group>
                <Form.Label>Đơn thuốc:</Form.Label>
                <Form.Control as="textarea" rows={2} value={selectedAppointment.prescription} readOnly />
              </Form.Group>
              <Form.Group>
                <Form.Label>Ghi chú:</Form.Label>
                <Form.Control as="textarea" rows={2} value={selectedAppointment.note} readOnly />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Đóng</Button>
          <Button variant="primary" onClick={handleTransferPage}>Receive</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CompletedAppointments;
