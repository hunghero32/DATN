import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../../../features/slices/serviceSlice";
import axios from "axios";

const DoctorServices = ({ show, onCloseModal, onServiceAdded }) => {
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [specialties, setSpecialties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({});
  const [newService, setNewService] = useState({
    services_name: "",
    price: "",
    duration: "",
    category_name: "",
    specialty_name: "",
    status: true,
  });

  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleEdit = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedService(null);
  };

  const handleCloseAdd = () => {
    setShowAddModal(false);
    setNewService({
      services_name: "",
      price: "",
      duration: "",
      category_id: "",
      specialty_id: "",
      status: true,
    });
  };

  const onClose = () => {
    setShowAddModal(false);
    setNewService({
      services_name: "",
      price: "",
      duration: "",
      category_id: "",
      specialty_id: "",
      status: true,
    });
  };


  useEffect(() => {
    // Fetch categories and specialties from API
    const fetchData = async () => {
      try {
        const categoryRes = await axios.get("http://localhost:8000/api/categories");
        const specialtyRes = await axios.get("http://localhost:8000/api/specialties");
  
        // Kiểm tra dữ liệu trước khi setState
        console.log("Fetched Categories:", categoryRes.data);
        console.log("Fetched Specialties:", specialtyRes.data);
  
        // Đảm bảo lấy đúng key chứa mảng dữ liệu
        setCategories(categoryRes.data.data || categoryRes.data); 
        setSpecialties(specialtyRes.data.data || specialtyRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewService((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/services", newService);
      alert("Service added successfully!");
      onServiceAdded();
      setShowAddModal(false);
      setNewService({
        services_name: "",
        price: "",
        duration: "",
        category_id: "",
        specialty_id: "",
        status: true,
      });
    } catch (error) {
      console.error("Error adding service:", error.response.data);
    }
  };


  return (
    <div className="container mt-4">
      <h2 className="mb-3">Doctor Services</h2>

      {/* Nút thêm dịch vụ */}
      <Button variant="success" className="mb-3" onClick={() => setShowAddModal(true)}>
        + Add Service
      </Button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Service Name</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Category Name</th>
            <th>Specialty Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services?.map((s) => (
            <tr key={s?.id}>
              <td>{s?.id}</td>
              <td>{s?.services_name}</td>
              <td>${s?.price}</td>
              <td>{s?.duration} min</td>
              <td>{s?.category_name}</td>
              <td>{s?.specialty_name}</td>
              <td>
                <input type="checkbox" checked={s?.status} readOnly />
              </td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(s)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal chỉnh sửa dịch vụ */}
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
                  value={selectedService.services_name}
                  onChange={(e) =>
                    setSelectedService({ ...selectedService, services_name: e.target.value })
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

        </Modal.Footer>
      </Modal>

      {/* Modal thêm dịch vụ */}
      <Modal show={showAddModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Service Name</Form.Label>
              <Form.Control
                type="text"
                name="services_name"
                value={newService.services_name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={newService.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration (min)</Form.Label>
              <Form.Control
                type="number"
                name="duration"
                value={newService.duration}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category_id"
                value={newService.category_id}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
  <Form.Label>Specialty</Form.Label>
  <Form.Select 
    name="specialty_id" 
    value={newService?.specialty_id || ""} 
    onChange={handleChange} 
    required
  >
    <option value="">Select Specialty</option>
    {specialties?.length > 0 ? (
      specialties.map((spec) => (
        <option key={spec.id} value={spec.id}>
          {spec.name}
        </option>
      ))
    ) : (
      <option disabled>No specialties available</option>
    )}
  </Form.Select>
</Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAddService}>
            Add Service
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DoctorServices;