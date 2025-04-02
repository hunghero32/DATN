import React, { useEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactPaginate from "react-paginate";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './DoctorServices.css';

const DoctorServices = ({ show, onCloseModal, onServiceAdded }) => {
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [categories, setCategories] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const servicesPerPage = 10;

  const fetchServices = async (page = currentPage) => {
    try {
      const doctorServicesRes = await axios.get("http://localhost:8000/api/doctor/services", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          page: page + 1,
          per_page: servicesPerPage,
        },
      });

      const servicesData = doctorServicesRes.data.data?.data.map(item => ({
        id: item.service.id,
        services_name: item.service.services_name,
        price: item.service.price,
        duration: item.service.duration,
        category: item.service.category,
        specialty: item.service.specialty,
        status: item.service.status,
        description: item.service.description,
        category_id: item.service.category_id,
        specialty_id: item.service.specialty_id
      })) || [];

      setServices(servicesData);
      setTotalPages(doctorServicesRes.data.data?.last_page || 0);
    } catch (error) {
      toast.error("Error fetching services: " + (error.response?.data?.message || error.message));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all available services for the "Add Service" dropdown
        const allServicesRes = await axios.get("http://localhost:8000/api/services");
        const categoriesRes = await axios.get("http://localhost:8000/api/categories");
        
        // Fetch specialties with Authorization header
        const specialtiesRes = await axios.get("http://localhost:8000/api/specialties", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log('Raw specialties response:', specialtiesRes);

        // Kiểm tra và xử lý dữ liệu specialties
        let specialtiesData = [];
        if (specialtiesRes.data && Array.isArray(specialtiesRes.data)) {
          specialtiesData = specialtiesRes.data;
        } else if (specialtiesRes.data && specialtiesRes.data.data && Array.isArray(specialtiesRes.data.data)) {
          specialtiesData = specialtiesRes.data.data;
        }

        console.log('Processed specialties data:', specialtiesData);
        setSpecialties(specialtiesData);

        // Set other data
        if (categoriesRes.data && categoriesRes.data.data) {
          setCategories(categoriesRes.data.data);
        }
        
        setAllServices(allServicesRes.data.data || []);
        await fetchServices();
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error("Lỗi tải dữ liệu: " + (error.response?.data?.message || error.message));
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetchServices(currentPage);
  }, [currentPage]);

  const handleEdit = (service) => {
    console.log('Editing service:', service);
    console.log('Available specialties:', specialties);
    
    // Ensure we have the correct data structure
    const selectedServiceData = {
      id: service.id,
      services_name: service.services_name,
      price: service.price,
      duration: service.duration,
      category_id: service.category_id,
      specialty_id: service.specialty_id,
      status: service.status,
      description: service.description,
      category: service.category,
      specialty: service.specialty
    };
    
    console.log('Selected service data:', selectedServiceData);
    setSelectedService(selectedServiceData);
    setShowModal(true);
  };

  const handleViewDetails = (service) => {
    setSelectedService({
      id: service.id,
      services_name: service.services_name,
      price: service.price,
      duration: service.duration,
      category: service.category,
      specialty: service.specialty,
      status: service.status,
      description: service.description
    });
    setShowDetailsModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedService(null);
    setShowDetailsModal(false);
  };

  const handleCloseAdd = () => {
    setShowAddModal(false);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleAddService = async (serviceId) => {
    try {
      await axios.post(
        "http://localhost:8000/api/doctor/services",
        { service_id: serviceId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      toast.success("Service added successfully!");
      handleCloseAdd();
      await fetchServices(currentPage); // Refresh current page data
    } catch (error) {
      toast.error("Error adding service: " + (error.response?.data?.message || error.message));
    }
  };

  const handleUpdateService = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/services/${selectedService.id}`,
        selectedService,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      toast.success("Service updated successfully!");
      setShowModal(false);
      await fetchServices(currentPage); // Refresh current page data
    } catch (error) {
      toast.error("Error updating service: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="doctor-services-container">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="services-header">
        <h2>Quản Lý Dịch Vụ Y Tế</h2>
        <Button variant="primary" className="add-service-btn" onClick={() => setShowAddModal(true)}>
          <i className="fas fa-plus-circle"></i> Thêm Dịch Vụ Mới
        </Button>
      </div>

      <div className="services-table-container">
        <Table striped bordered hover className="services-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên Dịch Vụ</th>
              <th>Giá</th>
              <th>Thời Gian</th>
              <th>Danh Mục</th>
              <th>Chuyên Khoa</th>
              <th>Trạng Thái</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(services) && services.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.services_name}</td>
                <td>{s.price.toLocaleString('vi-VN')} đ</td>
                <td>{s.duration} phút</td>
                <td>{s.category?.name || 'Chưa có'}</td>
                <td>{s.specialty?.name || 'Chưa có'}</td>
                <td>
                  <span className={`status-badge ${s.status ? 'active' : 'inactive'}`}>
                    {s.status ? "Hoạt động" : "Không hoạt động"}
                  </span>
                </td>
                <td className="action-buttons">
                  <Button variant="info" size="sm" className="me-2" onClick={() => handleViewDetails(s)}>
                    <i className="fas fa-eye"></i>
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => handleEdit(s)}>
                    <i className="fas fa-edit"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="pagination-container">
        <ReactPaginate
          previousLabel={<i className="fas fa-chevron-left"></i>}
          nextLabel={<i className="fas fa-chevron-right"></i>}
          breakLabel={"..."}
          pageCount={totalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>

      {/* Modal xem chi tiết dịch vụ */}
      <Modal show={showDetailsModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chi Tiết Dịch Vụ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedService && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Tên Dịch Vụ</Form.Label>
                <Form.Control type="text" value={selectedService.services_name} readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Giá</Form.Label>
                <Form.Control type="number" value={selectedService.price} readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Thời Gian (phút)</Form.Label>
                <Form.Control type="number" value={selectedService.duration} readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Danh Mục</Form.Label>
                <Form.Control type="text" value={selectedService.category?.name || 'Chưa có'} readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Chuyên Khoa</Form.Label>
                <Form.Control type="text" value={selectedService.specialty?.name || 'Chưa có'} readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mô Tả Dịch Vụ</Form.Label>
                <Form.Control as="textarea" rows={3} value={selectedService.description} readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Trạng Thái</Form.Label>
                <Form.Control type="text" value={selectedService.status ? "Hoạt động" : "Không hoạt động"} readOnly />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Đóng</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal chỉnh sửa dịch vụ */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh Sửa Dịch Vụ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedService && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Tên Dịch Vụ</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedService.services_name}
                  onChange={(e) =>
                    setSelectedService({ ...selectedService, services_name: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Giá</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedService.price}
                  onChange={(e) =>
                    setSelectedService({ ...selectedService, price: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Thời Gian (phút)</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedService.duration}
                  onChange={(e) =>
                    setSelectedService({ ...selectedService, duration: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Danh Mục</Form.Label>
                <Form.Select
                  value={selectedService.category_id || ''}
                  onChange={(e) => {
                    const selectedCategory = categories.find(cat => cat.id === parseInt(e.target.value));
                    if (selectedCategory) {
                      setSelectedService({
                        ...selectedService,
                        category_id: parseInt(e.target.value),
                        category: selectedCategory
                      });
                    }
                  }}
                  required
                >
                  <option value="">Chọn danh mục...</option>
                  {categories && categories.length > 0 && categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Chuyên Khoa</Form.Label>
                <Form.Select
                  value={selectedService.specialty_id || ''}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    console.log('Selected specialty ID:', selectedValue);
                    console.log('Available specialties:', specialties);
                    
                    if (selectedValue) {
                      const selectedSpecialty = specialties.find(
                        spec => spec.id === parseInt(selectedValue)
                      );
                      console.log('Found specialty:', selectedSpecialty);
                      
                      if (selectedSpecialty) {
                        setSelectedService({
                          ...selectedService,
                          specialty_id: parseInt(selectedValue),
                          specialty: selectedSpecialty
                        });
                      }
                    }
                  }}
                >
                  <option value="">Chọn chuyên khoa...</option>
                  {specialties && specialties.length > 0 ? (
                    specialties.map((specialty) => (
                      <option key={specialty.id} value={specialty.id}>
                        {specialty.name}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>Không có dữ liệu chuyên khoa</option>
                  )}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Trạng Thái</Form.Label>
                <Form.Check
                  type="switch"
                  checked={selectedService.status}
                  onChange={(e) =>
                    setSelectedService({ ...selectedService, status: e.target.checked })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mô Tả</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={selectedService.description}
                  onChange={(e) =>
                    setSelectedService({ ...selectedService, description: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Hủy</Button>
          <Button variant="primary" onClick={handleUpdateService}>Lưu Thay Đổi</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal thêm dịch vụ */}
      <Modal show={showAddModal} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Dịch Vụ Mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Chọn Dịch Vụ</Form.Label>
              <Form.Select
                onChange={(e) => handleAddService(e.target.value)}
                required
              >
                <option value="">Chọn một dịch vụ...</option>
                {allServices.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.services_name} - {service.price.toLocaleString('vi-VN')} đ
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdd}>Hủy</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DoctorServices;