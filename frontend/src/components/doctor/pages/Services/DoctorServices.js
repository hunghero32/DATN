import React, { useEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactPaginate from "react-paginate";
import { Table } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './DoctorServices.css';

const DoctorServices = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
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
        description: item.service.description
      })) || [];

      setServices(servicesData);
      setTotalPages(doctorServicesRes.data.data?.last_page || 0);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách dịch vụ: " + (error.response?.data?.message || error.message));
    }
  };

  useEffect(() => {
    fetchServices();
  }, [currentPage]);

  const handleViewDetails = (service) => {
    setSelectedService(service);
    setShowDetailsModal(true);
  };

  const handleClose = () => {
    setShowDetailsModal(false);
    setSelectedService(null);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="doctor-services-container">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="services-header">
        <h2>Danh Sách Dịch Vụ Y Tế</h2>
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
              <th>Chi Tiết</th>
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
                  <button 
                    className="btn btn-info btn-sm" 
                    onClick={() => handleViewDetails(s)}
                  >
                    <i className="fas fa-eye"></i> Xem
                  </button>
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
                <Form.Control 
                  type="text" 
                  value={`${selectedService.price.toLocaleString('vi-VN')} đ`} 
                  readOnly 
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Thời Gian</Form.Label>
                <Form.Control type="text" value={`${selectedService.duration} phút`} readOnly />
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
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  value={selectedService.description || 'Không có mô tả'} 
                  readOnly 
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Trạng Thái</Form.Label>
                <Form.Control 
                  type="text" 
                  value={selectedService.status ? "Hoạt động" : "Không hoạt động"} 
                  readOnly 
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>Đóng</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DoctorServices;