import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Button, Table, Form, Modal, Nav, Spinner } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Appointment = () => {
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [activeTab, setActiveTab] = useState("send");
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();

  const handleAcceptAppointment = () => {
    setShowConfirmModal(true); // Hiển thị modal xác nhận
  };

  const handleConfirmAccept = () => {
    if (selectedAppointment) {
      selectedAppointment.status = "Accepted"; // Cập nhật trạng thái
      setAcceptedAppointments([...acceptedAppointments, selectedAppointment]); // Thêm vào danh sách bệnh nhân đã nhận
      setShowModal(false); // Đóng modal chi tiết bệnh nhân
      alert(`${selectedAppointment.name} đã được nhận.`);
      navigate("/ReceivedAppointments"); // Chuyển đến trang bệnh nhân đã nhận
    }
    setShowConfirmModal(false); // Đóng modal xác nhận
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/doctor/bookings",
          {
            headers: {
              Authorization: `Bearer SUwjNXVyzhC0fhrpNXEFQ8dY5RWGCulmcNfcXsj8f34ff3c4`,
            },
          }
        );
        setAppointments(response.data.data);
      } catch (error) {
        setError("Lỗi khi tải dữ liệu");
      }
      setLoading(false);
    };

    fetchAppointments();
  }, []);

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleSearch = () => {
    console.log("Searching appointments for:", date);
  };

  const handleShowDetail = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleShowInvoice = (appointment) => {
    setSelectedAppointment(appointment);
    setShowInvoiceModal(true);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="container mt-5 table-responsive">
      <h3 className="mb-4">List of Appointment Appointments</h3>
      <div className="card p-4">
        <h5 className="mb-3 text-primary">List of Appointment Appointments</h5>
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
        ) : (
          <Table striped bordered hover className="table-sm">
            <thead>
              <tr>
                <th style={{ width: "120px" }}>Thời gian</th>
                <th style={{ width: "120px" }}>Ngày</th>
                <th style={{ width: "200px" }}>Người đặt</th>
                {/* <th style={{ width: "250px" }}>Dịch vụ</th>
                <th style={{ width: "250px" }}>Ghi chú</th> */}
                <th style={{ width: "150px" }}>Trạng thái</th>
                <th style={{ width: "250px" }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((app, index) => (
                <tr key={index}>
                  <td>{app.booking_time}</td>
                  <td>{app.booking_date}</td>
                  <td>{app.guest?.guest_name || "Không có tên"}</td>
                  {/* <td>{app.service?.services_name || 'Không có dịch vụ'}</td>
                  <td>{app.notes || 'Không có ghi chú'}</td> */}
                  <td>
                    <span
                      className={`badge ${app.status === "pending"
                        ? "bg-warning"
                        : app.status === "confirmed"
                          ? "bg-success"
                          : "bg-secondary"
                        }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td>
                    <Button
                      variant="info"
                      className="me-2"
                      onClick={() => handleShowDetail(app)}
                    >
                      Detail
                    </Button>
                    <Button
                      variant="primary"
                      className="me-2"
                      onClick={() => handleShowInvoice(app)}
                    >
                      Send the Invoice
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

      <Modal show={showInvoiceModal} onHide={() => setShowInvoiceModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Send Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Nav
            variant="tabs"
            activeKey={activeTab}
            onSelect={(selectedKey) => setActiveTab(selectedKey)}
          >
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
                <Form.Control
                  type="email"
                  value={selectedAppointment?.email}
                  readOnly
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Choose files:</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>
              {file && <div className="mt-2">{file.name}</div>}
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          {/* Nút Nhận Bệnh */}
          <Button variant="success" onClick={handleAcceptAppointment}>
            Nhận Bệnh
          </Button>

          {/* Modal Xác Nhận */}
          <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Xác nhận nhận bệnh</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Bạn có chắc chắn muốn nhận bệnh nhân này không?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                Hủy
              </Button>
              <Button variant="success" onClick={handleConfirmAccept}>
                Xác nhận
              </Button>
            </Modal.Footer>
          </Modal>
          <Button
            variant="secondary"
            onClick={() => setShowInvoiceModal(false)}
          >
            Close
          </Button>
          <Button variant="primary">Send</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Appointment;
