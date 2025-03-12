import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const servicesData = [
  { id: 1, name: "Repellendus in sit", price: 4467, duration: 63, status: true },
  { id: 2, name: "Quidem tempora sunt", price: 2445, duration: 170, status: false },
  { id: 3, name: "Error ullam cupiditate", price: 4688, duration: 35, status: true },
];

const DoctorServices = () => {
  const [services, setServices] = useState(servicesData);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleEdit = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedService(null);
  };

  const handleSave = () => {
    setServices((prev) =>
      prev.map((s) => (s.id === selectedService.id ? selectedService : s))
    );
    handleClose();
  };

  const handleToggleStatus = (id) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: !s.status } : s))
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Doctor Services</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Service Name</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{service.name}</td>
              <td>${service.price}</td>
              <td>{service.duration} min</td>
              <td>
                <input
                  type="checkbox"
                  checked={service.status}
                  onChange={() => handleToggleStatus(service.id)}
                />
              </td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(service)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Editing Service */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedService && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Service Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedService.name}
                  onChange={(e) =>
                    setSelectedService({ ...selectedService, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedService.price}
                  onChange={(e) =>
                    setSelectedService({ ...selectedService, price: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Duration (min)</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedService.duration}
                  onChange={(e) =>
                    setSelectedService({ ...selectedService, duration: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DoctorServices;
