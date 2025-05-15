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

  const getAuthToken = () => localStorage.getItem("authToken");

  const fetchServices = async (page = currentPage) => {
    const token = getAuthToken();
    if (!token) {
      toast.error("Vui lòng đăng nhập để xem danh sách dịch vụ!");
      window.location.href = '/login';
      return;
    }

    try {
      const doctorServicesRes = await axios.get("http://127.0.0.1:8000/api/doctor/services", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
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
        doctor_fee: item.doctor_fee,
        specialty: item.service.specialty,
        status: item.service.status,
        description: item.service.description
      })) || [];

      setServices(servicesData);
      setTotalPages(doctorServicesRes.data.data?.last_page || 0);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
        localStorage.removeItem("authToken");
        window.location.href = '/login';
      } else {
        toast.error("Lỗi khi tải danh sách dịch vụ: " + (error.response?.data?.message || error.message));
      }
    }
  };

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      window.location.href = '/login';
      return;
    }
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

  // Function to strip HTML tags and display plain text with better formatting
  const formatDescription = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html || '';
    const text = tempDiv.textContent || tempDiv.innerText || 'Không có mô tả';

    // Example formatting for "Siêu âm tim qua thành ngực" description
    if (text.includes("Siêu âm tim qua thành ngực")) {
      return `
        **Siêu âm tim qua thành ngực (Transthoracic Echocardiography - TTE)**  
        **Các mặt cắt cơ bản thường sử dụng:**  
        - Cạnh ức trục dọc (Parasternal Long Axis - PLAX): Cung cấp hình ảnh về thất trái, thất phải, van hai lá, van động mạch chủ, nhĩ trái và động mạch chủ lên.  
        - Cạnh ức trục ngắn (Parasternal Short Axis - PSAX): Hiển thị hình ảnh cắt ngang của tim ở các mức độ khác nhau (van động mạch chủ, van hai lá, cơ nhú).  
        - Mỏm tim bốn buồng (Apical 4 Chamber - A4C): Thấy rõ cả bốn buồng tim, van hai lá, van ba lá, vách liên thất và vách liên nhĩ.  
        - Mỏm tim hai buồng (Apical 2 Chamber - A2C): Tập trung vào thất trái, nhĩ trái và van hai lá.  
        - Mỏm tim ba buồng (Apical 3 Chamber - A3C): Tương tự PLAX nhưng nhìn từ mỏm tim.  
        - Dưới sườn (Subcostal): Thường dùng khi cửa sổ siêu âm qua thành ngực kém, giúp quan sát bốn buồng tim và tĩnh mạch chủ dưới.  
        - Trên hõm ức (Suprasternal Notch): Quan sát cung động mạch chủ và các nhánh của nó.  
        **Các thông số và bệnh lý:**  
        - Kích thước các buồng tim: Phát hiện tình trạng giãn buồng tim.  
        - Chức năng tâm thu thất trái: Phân suất tống máu (Ejection Fraction - EF), vận động vùng thành tim.  
        - Chức năng tâm trương thất trái: Các chỉ số như E/A, E/e'.  
        - Bệnh van tim: Hẹp van (diện tích van, gradient áp lực), hở van (mức độ hở, dòng hở).  
        - Áp lực động mạch phổi: Ước tính dựa trên vận tốc dòng hở van ba lá.  
        - Bệnh màng ngoài tim: Tràn dịch màng ngoài tim (số lượng, vị trí), dày màng ngoài tim.  
        - Bệnh tim bẩm sinh: Phát hiện các bất thường về cấu trúc tim (ví dụ: thông liên thất, thông liên nhĩ).  
        - Khối u trong tim, huyết khối.  
        - Viêm nội tâm mạc: Phát hiện sùi van tim (vegetations).  
        - Bệnh cơ tim: Phì đại, giãn nở, hạn chế.  
        - Đánh giá ảnh hưởng của các bệnh lý toàn thân lên tim.  
        **Kết Luận**
      `;
    }
    // Add more conditions for other services if needed (e.g., "Khám nội khoa", "Khám nội tiết")
    return text.replace(/\n/g, ' ').trim();
  };

  // Function to format price and doctor_fee with VND
  const formatCurrency = (value) => {
    if (!value) return 'Chưa có';
    return `${parseFloat(value).toLocaleString('vi-VN')} VND`;
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
              <th>Doctor_fee</th>
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
                <td>{formatCurrency(s.price)}</td>
                <td>{s.duration} phút</td>
                <td>{formatCurrency(s.doctor_fee)}</td>
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
      <Modal show={showDetailsModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Chi Tiết Dịch Vụ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedService && (
            <Form>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Tên Dịch Vụ</Form.Label>
                    <Form.Control type="text" value={selectedService.services_name} readOnly />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Giá</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={formatCurrency(selectedService.price)} 
                      readOnly 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Thời Gian</Form.Label>
                    <Form.Control type="text" value={`${selectedService.duration} phút`} readOnly />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Doctor_fee</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={formatCurrency(selectedService.doctor_fee)} 
                      readOnly 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Chuyên Khoa</Form.Label>
                    <Form.Control type="text" value={selectedService.specialty?.name || 'Chưa có'} readOnly />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Mô Tả Dịch Vụ</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={8} 
                      value={formatDescription(selectedService.description)} 
                      readOnly 
                      style={{ whiteSpace: 'pre-wrap' }}
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
                </div>
              </div>
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