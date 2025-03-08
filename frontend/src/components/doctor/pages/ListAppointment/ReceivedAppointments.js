import React, { useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReceivedAppointments = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const receivedAppointments = [
    {
      time: '10h - 11h',
      no: 1,
      name: 'John Doe',
      gender: 'Male',
      phone: '0123456789',
      email: 'johndoe@gmail.com',
      reason: 'Routine check-up',
      address: 'New York',
      respiratory: 'Normal',
      note: 'No prior conditions',
      photo: 'johndoe.jpg',
      status: 'Received'
    }
  ];

  const handleShowDetail = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">List of Received Appointments</h3>
      <div className="card p-4">
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
            {receivedAppointments.map((app, index) => (
              <tr key={index}>
                <td>{app.time}</td>
                <td>{app.no}</td>
                <td>{app.name}</td>
                <td>{app.gender}</td>
                <td>
                  <Button variant="info" className="me-2" onClick={() => handleShowDetail(app)}>Detail</Button>
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
            <>
              <div className="text-center mb-4">
                <img
                  src={`http://localhost:8000/uploads/${selectedAppointment.photo}`}
                  alt="Patient"
                  className="rounded-circle"
                  width="150"
                  height="150"
                  style={{ objectFit: 'cover', border: '2px solid #ddd' }}
                />
              </div>
              <Form>
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
                  <Form.Label>Reason:</Form.Label>
                  <Form.Control as="textarea" rows={2} value={selectedAppointment.reason} readOnly />
                </Form.Group>
              </Form>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReceivedAppointments;
