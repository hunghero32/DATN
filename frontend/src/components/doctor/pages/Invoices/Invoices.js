import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Pagination, Container, Row, Col, Alert, Modal } from 'react-bootstrap';
import InvoiceForm from './InvoiceForm';
import InvoiceDetail from './InvoiceDetail';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [error, setError] = useState(null);

  // Lấy token từ localStorage
  const token = localStorage.getItem('authToken');

  // Cấu hình axios với token động
  const API_URL = 'http://127.0.0.1:8000/api/doctor/invoices';
  const api = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
  });

  // Kiểm tra token và xử lý lỗi xác thực
  useEffect(() => {
    if (!token) {
      setError('Vui lòng đăng nhập để truy cập danh sách hóa đơn.');
      return;
    }
    const fetchInvoices = async () => {
      try {
        const response = await api.get(`?page=${currentPage}&search=${search}&date=${date}`);
        setInvoices(response.data.data.data || []);
        setTotalPages(response.data.data.last_page || 1);
        setError(null);
      } catch (error) {
        setError(error.response?.data?.message || 'Không thể tải danh sách hóa đơn.');
      }
    };
    fetchInvoices();
  }, [currentPage, search, date, token]);

  // Xử lý tạo hóa đơn
  const handleCreate = async (formData) => {
    if (!token) {
      setError('Vui lòng đăng nhập để tạo hóa đơn.');
      return;
    }
    try {
      const response = await api.post('', formData);
      setInvoices((prev) => [response.data.data, ...prev]);
      setShowForm(false);
      setError(null);
    } catch (error) {
      setError('Lỗi khi tạo hóa đơn: ' + (error.response?.data?.message || error.message));
    }
  };

  // Xử lý cập nhật hóa đơn
  const handleUpdate = async (formData) => {
    if (!token) {
      setError('Vui lòng đăng nhập để cập nhật hóa đơn.');
      return;
    }
    try {
      const response = await api.put(`/${selectedInvoice.id}`, formData);
      setInvoices((prev) =>
        prev.map((inv) => (inv.id === response.data.data.id ? response.data.data : inv))
      );
      setShowForm(false);
      setSelectedInvoice(null);
      setError(null);
    } catch (error) {
      setError('Lỗi khi cập nhật hóa đơn: ' + (error.response?.data?.message || error.message));
    }
  };

  // Xử lý xóa hóa đơn
  const handleDelete = async (id) => {
    if (!token) {
      setError('Vui lòng đăng nhập để xóa hóa đơn.');
      return;
    }
    if (window.confirm('Bạn có chắc chắn muốn xóa hóa đơn này?')) {
      try {
        await api.delete(`/${id}`);
        setInvoices((prev) => prev.filter((inv) => inv.id !== id));
        setError(null);
      } catch (error) {
        setError('Lỗi khi xóa hóa đơn: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  // Xử lý phân trang
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Xử lý tìm kiếm nâng cao (có thể mở rộng thêm bộ lọc)
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Quản lý hóa đơn</h1>

      {/* Hiển thị lỗi nếu có */}
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      {/* Bộ lọc nâng cao */}
      <Row className="mb-4 align-items-center">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Tìm kiếm (ID, tên khách hàng, dịch vụ)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Chọn ngày"
          />
        </Col>
        <Col md={4} className="text-end">
          <Button variant="success" onClick={() => setShowForm(true)}>
            Tạo hóa đơn mới
          </Button>
        </Col>
      </Row>

      {/* Bảng hiển thị hóa đơn */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tổng tiền</th>
            <th>Giảm giá</th>
            <th>Thuế</th>
            <th>Ngày đặt lịch</th>
            <th>Khách hàng</th>
            <th>Dịch vụ</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {invoices.length > 0 ? (
            invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{invoice.total_amount}</td>
                <td>{invoice.discount}</td>
                <td>{invoice.tax}</td>
                <td>{invoice.details?.[0]?.booking?.booking_date}</td>
                <td>{invoice.details?.[0]?.booking?.guest?.guest_name}</td>
                <td>{invoice.details?.[0]?.booking?.service?.services_name}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setSelectedInvoice(invoice);
                      setShowDetail(true);
                    }}
                  >
                    Xem chi tiết
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setSelectedInvoice(invoice);
                      setShowForm(true);
                    }}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(invoice.id)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                Không có hóa đơn nào.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Phân trang */}
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          <Pagination.Item active>{currentPage}</Pagination.Item>
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>

      {/* Form tạo/cập nhật hóa đơn */}
      {showForm && (
        <InvoiceForm
          invoice={selectedInvoice}
          onSubmit={selectedInvoice ? handleUpdate : handleCreate}
          onCancel={() => {
            setShowForm(false);
            setSelectedInvoice(null);
          }}
        />
      )}

      {/* Modal xem chi tiết hóa đơn */}
      {showDetail && (
        <InvoiceDetail
          invoice={selectedInvoice}
          onClose={() => {
            setShowDetail(false);
            setSelectedInvoice(null);
          }}
        />
      )}
    </Container>
  );
};

export default Invoices;