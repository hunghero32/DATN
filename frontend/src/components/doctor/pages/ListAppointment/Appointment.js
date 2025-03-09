import React, { useState } from 'react';
import { Button, Table, Form, Modal, Nav } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Appointment = () => {
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [activeTab, setActiveTab] = useState('send');
  const [file, setFile] = useState(null);
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);

  const appointments = [
    {
      time: '16h - 17h',
      no: 1,
      name: 'eric pham',
      gender: 'Female',
      phone: '0321456789',
      email: 'haryphamdev@gmail.com',
      reason: 'bla bla',
      address: 'ha noi',
      respiratory: 'abadasdf',
      note: '',
      photo: '1606226395211-cat.jpg'
    }
  ];

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
    <div className="container mt-5">
      <h3 className="mb-4">List of Appointment Appointments</h3>
      <div className="card p-4">
        <h5 className="mb-3 text-primary">List of Appointment Appointments</h5>
        <Form className="d-flex align-items-center mb-4">
          <div className="me-3">
            <DatePicker
              selected={date}
              onChange={handleDateChange}
              className="form-control"
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <Button variant="primary" onClick={handleSearch}>Search</Button>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Time</th>
              <th>No</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app, index) => (
              <tr key={index}>
                <td>{app.time}</td>
                <td>{app.no}</td>
                <td>{app.name}</td>
                <td>{app.gender}</td>
                <td>
                  <Button variant="info" className="me-2" onClick={() => handleShowDetail(app)}>Detail</Button>
                  <Button variant="primary" className="me-2" onClick={() => handleShowInvoice(app)}>Send the Invoice</Button>
                  <Button variant="success" className="me-2" onClick={() => handleAcceptAppointment(app)}>Nhận Bệnh</Button>
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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