import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

// Component hiển thị chi tiết thông tin cuộc hẹn
const AppointmentDetailModal = ({
  show,
  onHide,
  selectedAppointment,
  handleReacceptAppointment,
  handleDeleteAppointment,
  handleTransferAppointment,
}) => {
  // Nếu không có selectedAppointment, hiển thị modal với thông báo không có dữ liệu
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

  // Kiểm tra trạng thái của cuộc hẹn
  const isCompleted = selectedAppointment.status === "completed";
  const isPending = selectedAppointment.status === "pending";
  const isConfirmed = selectedAppointment.status === "confirmed";

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Thông tin bệnh nhân</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Giới tính */}
            <Form.Group>
              <Form.Label className="font-semibold">Giới tính:</Form.Label>
              <Form.Control
                type="text"
                value={selectedAppointment.guest?.gender || "Không có dữ liệu"}
                readOnly
                className="bg-gray-100"
              />
            </Form.Group>

            {/* Tên dịch vụ */}
            <Form.Group>
              <Form.Label className="font-semibold">Tên dịch vụ:</Form.Label>
              <Form.Control
                type="text"
                value={selectedAppointment.service?.services_name || "Không có dữ liệu"}
                readOnly
                className="bg-gray-100"
              />
            </Form.Group>

            {/* Tên khách hàng */}
            <Form.Group>
              <Form.Label className="font-semibold">Tên khách hàng:</Form.Label>
              <Form.Control
                type="text"
                value={selectedAppointment.guest?.guest_name || "Không có dữ liệu"}
                readOnly
                className="bg-gray-100"
              />
            </Form.Group>

            {/* Số điện thoại */}
            <Form.Group>
              <Form.Label className="font-semibold">Số điện thoại:</Form.Label>
              <Form.Control
                type="text"
                value={selectedAppointment.guest?.guest_phone || "Không có dữ liệu"}
                readOnly
                className="bg-gray-100"
              />
            </Form.Group>

            {/* Email */}
            <Form.Group>
              <Form.Label className="font-semibold">Email:</Form.Label>
              <Form.Control
                type="email"
                value={selectedAppointment.guest?.guest_email || "Không có dữ liệu"}
                readOnly
                className="bg-gray-100"
              />
            </Form.Group>

            {/* Địa chỉ */}
            <Form.Group>
              <Form.Label className="font-semibold">Địa chỉ:</Form.Label>
              <Form.Control
                type="text"
                value={selectedAppointment.guest?.address || "Không có dữ liệu"}
                readOnly
                className="bg-gray-100"
              />
            </Form.Group>

            {/* Ngày đặt */}
            <Form.Group>
              <Form.Label className="font-semibold">Ngày đặt:</Form.Label>
              <Form.Control
                type="text"
                value={selectedAppointment.booking_date || "Không có dữ liệu"}
                readOnly
                className="bg-gray-100"
              />
            </Form.Group>

            {/* Thời gian */}
            <Form.Group>
              <Form.Label className="font-semibold">Thời gian:</Form.Label>
              <Form.Control
                type="text"
                value={selectedAppointment.booking_time || "Không có dữ liệu"}
                readOnly
                className="bg-gray-100"
              />
            </Form.Group>

            {/* Trạng thái */}
            <Form.Group>
              <Form.Label className="font-semibold">Trạng thái:</Form.Label>
              <Form.Control
                type="text"
                value={
                  selectedAppointment.status
                    ? selectedAppointment.status.charAt(0).toUpperCase() +
                      selectedAppointment.status.slice(1)
                    : "Không có dữ liệu"
                }
                readOnly
                className={`bg-gray-100 ${
                  selectedAppointment.status === "pending"
                    ? "text-warning"
                    : selectedAppointment.status === "confirmed"
                    ? "text-success"
                    : "text-info"
                }`}
              />
            </Form.Group>

            {/* Lý do */}
            <Form.Group className="md:col-span-2">
              <Form.Label className="font-semibold">Lý do:</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={selectedAppointment.reason || "Không có lý do"}
                readOnly
                className="bg-gray-100"
              />
            </Form.Group>

            {/* Ghi chú */}
            <Form.Group className="md:col-span-2">
              <Form.Label className="font-semibold">Ghi chú:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={selectedAppointment.notes || "Không có ghi chú"}
                readOnly
                className="bg-gray-100"
              />
            </Form.Group>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* Nút hành động cho trạng thái Pending */}
        {isPending && (
          <Button
            variant="primary"
            className="me-2"
            onClick={() => handleTransferAppointment(selectedAppointment)}
          >
            Chuyển Bệnh
          </Button>
        )}

        {/* Nút hành động cho trạng thái Completed */}
        {isCompleted && (
          <>
            <Button
              variant="success"
              className="me-2"
              onClick={() => handleReacceptAppointment(selectedAppointment)}
            >
              Nhận Lại Bệnh Nhân
            </Button>
            <Button
              variant="danger"
              className="me-2"
              onClick={() => handleDeleteAppointment(selectedAppointment)}
            >
              Xóa Cuộc Hẹn
            </Button>
          </>
        )}

        {/* Nút hành động cho trạng thái Confirmed */}
        {isConfirmed && (
          <Button
            variant="warning"
            className="me-2"
            onClick={() => handleTransferAppointment(selectedAppointment)}
          >
            Chuyển Bệnh
          </Button>
        )}

        {/* Nút Đóng luôn hiển thị */}
        <Button variant="secondary" onClick={onHide}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AppointmentDetailModal;