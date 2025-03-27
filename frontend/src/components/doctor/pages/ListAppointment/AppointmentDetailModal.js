import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const AppointmentDetailModal = ({
  show,
  onHide,
  selectedAppointment,
  handleReacceptAppointment,
  handleDeleteAppointment,
  handleTransferAppointment,
}) => {
  if (!selectedAppointment) {
    return (
      <Modal show={show} onHide={onHide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Thông tin bệnh nhân</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted">Không có thông tin cuộc hẹn.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const isCompleted = selectedAppointment.status === "completed";
  const isPending = selectedAppointment.status === "pending";
  const isConfirmed = selectedAppointment.status === "confirmed";

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <style>
        {`
          .modal-content {
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          }

          .modal-header {
            background-color: #f9fafb;
            border-bottom: 1px solid #e5e7eb;
          }

          .modal-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: #1f2937;
          }

          .modal-body {
            padding: 2rem;
          }

          .form-label {
            font-weight: 600;
            color: #374151;
            margin-bottom: 0.5rem;
          }

          .form-control {
            border-radius: 8px;
            border: 1px solid #e0e4e8;
            background-color: #f9fafb;
            font-size: 15px;
            color: #374151;
            padding: 0.75rem;
          }

          .form-control:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25);
          }

          .modal-footer {
            border-top: 1px solid #e5e7eb;
            padding: 1rem 2rem;
          }

          .btn {
            padding: 0.5rem 1.2rem;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.3s ease;
          }

          .btn-primary {
            background-color: #3b82f6;
            border-color: #3b82f6;
          }

          .btn-primary:hover {
            background-color: #2563eb;
            border-color: #2563eb;
          }

          .btn-success {
            background-color: #10b981;
            border-color: #10b981;
          }

          .btn-success:hover {
            background-color: #059669;
            border-color: #059669;
          }

          .btn-danger {
            background-color: #ef4444;
            border-color: #ef4444;
          }

          .btn-danger:hover {
            background-color: #dc2626;
            border-color: #dc2626;
          }

          .btn-secondary {
            background-color: #6b7280;
            border-color: #6b7280;
          }

          .btn-secondary:hover {
            background-color: #4b5563;
            border-color: #4b5563;
          }

          .status-pending {
            color: #d97706;
            font-weight: 600;
          }

          .status-confirmed {
            color: #059669;
            font-weight: 600;
          }

          .status-completed {
            color: #4f46e5;
            font-weight: 600;
          }
        `}
      </style>
      <Modal.Header closeButton>
        <Modal.Title>Thông tin bệnh nhân</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Group>
              <Form.Label>Giới tính:</Form.Label>
              <Form.Control
                type="text"
                value={selectedAppointment.guest?.gender || "Không có dữ liệu"}
                readOnly
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Tên dịch vụ:</Form.Label>
              <Form.Control
                type="text"
                value={selectedAppointment.service?.services_name || "Không có dữ liệu"}
                readOnly
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Tên khách hàng:</Form.Label>
              <Form.Control
                type="text"
                value={selectedAppointment.guest?.guest_name || "Không có dữ liệu"}
                readOnly
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Số điện thoại:</Form.Label>
              <Form.Control
                type="text"
                value={selectedAppointment.guest?.guest_phone || "Không có dữ liệu"}
                readOnly
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={selectedAppointment.guest?.guest_email || "Không có dữ liệu"}
                readOnly
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Địa chỉ:</Form.Label>
              <Form.Control
                type="text"
                value={selectedAppointment.guest?.address || "Không có dữ liệu"}
                readOnly
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Ngày đặt:</Form.Label>
              <Form.Control
                type="text"
                value={selectedAppointment.booking_date || "Không có dữ liệu"}
                readOnly
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Thời gian:</Form.Label>
              <Form.Control
                type="text"
                value={selectedAppointment.booking_time || "Không có dữ liệu"}
                readOnly
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Trạng thái:</Form.Label>
              <Form.Control
                type="text"
                value={
                  selectedAppointment.status === "pending"
                    ? "Chờ xử lý"
                    : selectedAppointment.status === "confirmed"
                    ? "Đã xác nhận"
                    : "Hoàn thành"
                }
                readOnly
                className={`status-${selectedAppointment.status}`}
              />
            </Form.Group>

            <Form.Group className="md:col-span-2">
              <Form.Label>Lý do:</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={selectedAppointment.reason || "Không có lý do"}
                readOnly
              />
            </Form.Group>

            <Form.Group className="md:col-span-2">
              <Form.Label>Ghi chú:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={selectedAppointment.notes || "Không có ghi chú"}
                readOnly
              />
            </Form.Group>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {isPending && (
          <Button
            variant="primary"
            className="me-2"
            onClick={() => handleTransferAppointment(selectedAppointment)}
          >
            Chuyển bệnh
          </Button>
        )}

        {isCompleted && (
          <>
            <Button
              variant="success"
              className="me-2"
              onClick={() => handleReacceptAppointment(selectedAppointment)}
            >
              Nhận lại bệnh nhân
            </Button>
            <Button
              variant="danger"
              className="me-2"
              onClick={() => handleDeleteAppointment(selectedAppointment)}
            >
              Xóa cuộc hẹn
            </Button>
          </>
        )}

        {isConfirmed && (
          <Button
            variant="primary"
            className="me-2"
            onClick={() => handleTransferAppointment(selectedAppointment)}
          >
            Chuyển bệnh
          </Button>
        )}

        <Button variant="secondary" onClick={onHide}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AppointmentDetailModal;