import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Button, Table, Form, Modal, Nav, Spinner } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Appointment = () => {
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [activeTab, setActiveTab] = useState('send');
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/doctor/bookings', {
          headers: {
            Authorization: `Bearer SUwjNXVyzhC0fhrpNXEFQ8dY5RWGCulmcNfcXsj8f34ff3c4`,
          },
        });
        setAppointments(response.data.data);
      } catch (error) {
        setError('Lỗi khi tải dữ liệu');
      }
      setLoading(false);
    };

    fetchAppointments();
  }, []);

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleSearch = () => {
    console.log('Searching appointments for:', date);
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
  const handleAcceptAppointment = (appointment) => {
    appointment.status = 'Accepted';
    setAcceptedAppointments([...acceptedAppointments, appointment]);
    setShowModal(false);
    alert(`${appointment.name} đã được nhận.`);
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
                  <td>{app.guest?.guest_name || 'Không có tên'}</td>
                  {/* <td>{app.service?.services_name || 'Không có dịch vụ'}</td>
                  <td>{app.notes || 'Không có ghi chú'}</td> */}
                  <td>
                    <span
                      className={`badge ${app.status === 'pending'
                        ? 'bg-warning'
                        : app.status === 'confirmed'
                          ? 'bg-success'
                          : 'bg-secondary'
                        }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td>
                    <Button variant="info" className="me-2" onClick={() => handleShowDetail(app)}>
                      Detail
                    </Button>
                    <Button variant="primary" className="me-2" onClick={() => handleShowInvoice(app)}>
                      Send the Invoice
                    </Button>
                    <Button variant="success" className="me-2" onClick={() => handleAcceptAppointment(app)}>
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
                <Form.Group>
                  <Form.Label>Name:</Form.Label>
                  <Form.Control type="text" value={selectedAppointment.name} readOnly />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Phone number:</Form.Label>
                  <Form.Control type="text" value={selectedAppointment.phone} readOnly />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control type="email" value={selectedAppointment.email} readOnly />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Address:</Form.Label>
                  <Form.Control type="text" value={selectedAppointment.address} readOnly />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Date:</Form.Label>
                  <Form.Control type="text" value={selectedAppointment.date} readOnly />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Time:</Form.Label>
                  <Form.Control type="text" value={selectedAppointment.time} readOnly />
                </Form.Group>

                <Form.Group className="col-span-2">
                  <Form.Label>Reason:</Form.Label>
                  <Form.Control as="textarea" rows={2} value={selectedAppointment.reason} readOnly />
                </Form.Group>

                <Form.Group className="col-span-2">
                  <Form.Label>History of respiratory tract diseases:</Form.Label>
                  <Form.Control as="textarea" rows={2} value={selectedAppointment.respiratory} readOnly />
                </Form.Group>

                <Form.Group className="col-span-2">
                  <Form.Label>Photo of previous examination:</Form.Label>
                  <p>{selectedAppointment.photo}</p>
                </Form.Group>

                <Form.Group className="col-span-2">
                  <Form.Label>Note:</Form.Label>
                  <Form.Control as="textarea" rows={3} readOnly />
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
          <Nav variant="tabs" activeKey={activeTab} onSelect={(selectedKey) => setActiveTab(selectedKey)}>
            <Nav.Item>
              <Nav.Link eventKey="send">Send invoice</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="sent">Sent</Nav.Link>
            </Nav.Item>
          </Nav>
          {activeTab === 'send' && (
            <Form className="mt-3">
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" value={selectedAppointment?.email} readOnly />
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
          <Button variant="success" onClick={() => handleAcceptAppointment(selectedAppointment)}>Nhận Bệnh</Button>
          <Button variant="secondary" onClick={() => setShowInvoiceModal(false)}>Close</Button>
          <Button variant="primary">Send</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Appointment;