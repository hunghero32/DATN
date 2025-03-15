import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Button, Table, Form, Modal, Nav, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Appointment = () => {
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [activeTab, setActiveTab] = useState("send");
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/doctor/bookings", {
          headers: {
            Authorization: `Bearer SUwjNXVyzhC0fhrpNXEFQ8dY5RWGCulmcNfcXsj8f34ff3c4`,
          },
        });

        // Chỉ giữ lại các cuộc hẹn có trạng thái "pending"
        const pendingAppointments = response.data.data.filter(
          (appointment) => appointment.status === "pending"
        );

        setAppointments(pendingAppointments);
      } catch (error) {
        setError("Lỗi khi tải dữ liệu");
      }
      setLoading(false);
    };

    fetchAppointments();
  }, []);

  // Xử lý xác nhận nhận bệnh
  const handleAcceptAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowConfirmModal(true);
  };

  const handleConfirmAccept = async () => {
    if (!selectedAppointment) return;
  
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/doctor/bookings/${selectedAppointment.id}`,
        { status: "confirmed" },
        {
          headers: {
            Authorization: `Bearer SUwjNXVyzhC0fhrpNXEFQ8dY5RWGCulmcNfcXsj8f34ff3c4`,
          },
        }
      );
  
      // Cập nhật danh sách
      setAppointments((prev) => prev.filter((app) => app.id !== selectedAppointment.id));
      setAcceptedAppointments((prev) => [...prev, { ...selectedAppointment, status: "confirmed" }]);
  
      alert(`${selectedAppointment.guest?.guest_name} đã được nhận.`);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      alert("Lỗi khi cập nhật trạng thái.");
    } finally {
      setShowConfirmModal(false);
    }
  };
  

  const handleShowDetail = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };
  
  return (
    <div className="container mt-5 table-responsive">

      <div className="card p-4">
        <h5 className="mb-3 text-primary">Danh sách chờ duyệt</h5>
        <Form className="d-flex align-items-center mb-4">
          <div className="me-3">
            <DatePicker
              selected={date}
              onChange={(newDate) => setDate(newDate)}
              className="form-control"
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <Button variant="primary">Tìm kiếm</Button>
        </Form>
        {loading ? (
          <Spinner animation="border" />
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : appointments.length === 0 ? (
          <p className="text-muted">Không có cuộc hẹn nào đang chờ xác nhận.</p>
        ) : (
          <Table striped bordered hover className="table-sm">
            <thead>
              <tr>
                <th>Thời gian</th>
                <th>Ngày</th>
                <th>Người đặt</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((app, index) => (
                <tr key={index}>
                  <td>{app.booking_time}</td>
                  <td>{app.booking_date}</td>
                  <td>{app.guest?.guest_name || "Không có tên"}</td>
                  <td>
                    <span className="badge bg-warning">Pending</span>
                  </td>
                  <td>
                    <Button
                      variant="info"
                      className="me-2"
                      onClick={() => handleShowDetail(app)}
                    >
                      Detail
                    </Button>
                    <Button variant="primary" className="me-2" onClick={() => setShowInvoiceModal(true)}>
                      Send Invoice
                    </Button>
                    <Button
                      variant="success"
                      className="me-2"
                      onClick={() => handleAcceptAppointment(app)}
                    >
                      Nhận Bệnh
                    </Button>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>

      {/* Modal Chi Tiết */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Patient Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <Form>
              <div className="grid grid-cols-2 gap-4">
                {/* Thông tin bệnh nhân */}
                <Form.Group>
                  <Form.Label>Gender:</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedAppointment?.guest?.gender ?? "Không có dữ liệu"}
                    readOnly
                  />
                </Form.Group>

                {/* Thông tin đặt lịch */}
                <Form.Group>
                  <Form.Label>Service Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={
                      selectedAppointment.service?.services_name ||
                      "Không có dữ liệu"
                    }
                    readOnly
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Guest Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={
                      selectedAppointment.guest?.guest_name ||
                      "Không có dữ liệu"
                    }
                    readOnly
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Guest Phone:</Form.Label>
                  <Form.Control
                    type="text"
                    value={
                      selectedAppointment.guest?.guest_phone ||
                      "Không có dữ liệu"
                    }
                    readOnly
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Guest Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={
                      selectedAppointment.guest?.guest_email ||
                      "Không có dữ liệu"
                    }
                    readOnly
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Guest Address:</Form.Label>
                  <Form.Control
                    type="text"
                    value={
                      selectedAppointment.guest?.address || "Không có dữ liệu"
                    }
                    readOnly
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Booking Date:</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedAppointment.booking_date}
                    readOnly
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Booking Time:</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedAppointment.booking_time}
                    readOnly
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Status:</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedAppointment.status}
                    readOnly
                  />
                </Form.Group>

                {/* Lý do & lịch sử bệnh */}
                <Form.Group className="col-span-2">
                  <Form.Label>Reason:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={selectedAppointment.reason}
                    readOnly
                  />
                </Form.Group>

                <Form.Group className="col-span-2">
                  <Form.Label>Notes:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={selectedAppointment?.notes ?? "Không có ghi chú"}
                    readOnly
                  />
                </Form.Group>


              </div>
            </Form>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Xác Nhận Nhận Bệnh */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận nhận bệnh</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn nhận bệnh nhân này không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Hủy
          </Button>
          <Button variant="success" onClick={handleConfirmAccept}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Gửi Hóa Đơn */}
      <Modal show={showInvoiceModal} onHide={() => setShowInvoiceModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Send Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Nav variant="tabs" activeKey={activeTab} onSelect={(selectedKey) => setActiveTab(selectedKey)}>
            <Nav.Item>
              <Nav.Link eventKey="send">Send invoice</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="sent">Sent</Nav.Link>
            </Nav.Item>
          </Nav>
          {activeTab === "send" && (
            <Form className="mt-3">
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" value={selectedAppointment?.email || ""} readOnly />
              </Form.Group>
              <Form.Group>
                <Form.Label>Choose files:</Form.Label>
                <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
              </Form.Group>
              {file && <div className="mt-2">{file.name}</div>}
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowInvoiceModal(false)}>
            Close
          </Button>
          <Button variant="primary">Send</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Appointment;
