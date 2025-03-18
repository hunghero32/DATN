import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const AppointmentDetailModal = ({ show, onHide, selectedAppointment }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Thông tin bệnh nhân</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedAppointment ? (
          <Form>
            <div className="grid grid-cols-2 gap-4">
              <Form.Group>
                <Form.Label>Giới tính:</Form.Label>
                <Form.Control type="text" value={selectedAppointment?.guest?.gender ?? "Không có dữ liệu"} readOnly />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tên dịch vụ:</Form.Label>
                <Form.Control type="text" value={selectedAppointment.service?.services_name || "Không có dữ liệu"} readOnly />
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
                <Form.Control type="text" value={selectedAppointment.booking_date} readOnly />
              </Form.Group>
              <Form.Group>
                <Form.Label>Thời gian:</Form.Label>
                <Form.Control type="text" value={selectedAppointment.booking_time} readOnly />
              </Form.Group>
              <Form.Group>
                <Form.Label>Trạng thái:</Form.Label>
                <Form.Control type="text" value={selectedAppointment.status} readOnly />
              </Form.Group>
              <Form.Group className="col-span-2">
                <Form.Label>Lý do:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={selectedAppointment.reason || "Không có lý do"}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="col-span-2">
                <Form.Label>Ghi chú:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={selectedAppointment?.notes ?? "Không có ghi chú"}
                  readOnly
                />
              </Form.Group>
              {/* Các trường khác tương tự */}
            </div>
          </Form>
        ) : (
          <p className="text-muted">Không có thông tin cuộc hẹn.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AppointmentDetailModal;