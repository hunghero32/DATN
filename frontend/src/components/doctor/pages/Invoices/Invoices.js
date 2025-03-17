import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Pagination, Container, Row, Col, Alert } from 'react-bootstrap';
import InvoiceForm from './InvoiceForm';
import InvoiceDetail from './InvoiceDetail';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]); // Dữ liệu đã lọc để hiển thị
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('authToken');

  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/doctor',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
  });

  useEffect(() => {
    if (!token) {
      setError('Vui lòng đăng nhập để truy cập danh sách hóa đơn.');
      return;
    }

    const fetchInvoices = async () => {
      try {
        const response = await api.get(`/invoices?page=${currentPage}&search=${search}&date=${date}`);
        setInvoices(response.data.data.data || []);
        setTotalPages(response.data.data.last_page || 1);
        setError(null);
      } catch (error) {
        setError(error.response?.data?.message || 'Không thể tải danh sách hóa đơn.');
      }
    };

    fetchInvoices();
  }, [currentPage, date, token]); // Loại bỏ `search` khỏi dependency vì chúng ta sẽ lọc cục bộ

  useEffect(() => {
    if (!token) return;

    const fetchBookings = async () => {
      try {
        const response = await api.get('/bookings');
        const completedBookings = response.data.data.filter(
          (booking) => booking.status === 'completed'
        );
        setBookings(completedBookings);
      } catch (error) {
        setError('Không thể tải danh sách booking: ' + (error.response?.data?.message || error.message));
      }
    };

    fetchBookings();
  }, [token]);

  // Lọc dữ liệu invoices dựa trên giá trị search
  useEffect(() => {
    if (!search) {
      setFilteredInvoices(invoices); // Nếu không có từ khóa tìm kiếm, hiển thị toàn bộ dữ liệu
      return;
    }

    const lowerCaseSearch = search.toLowerCase();
    const filtered = invoices.filter((invoice) => {
      return (
        String(invoice.id).toLowerCase().includes(lowerCaseSearch) || // Tìm kiếm theo ID
        String(invoice.total_amount).toLowerCase().includes(lowerCaseSearch) || // Tìm kiếm theo Tổng Tiền
        String(invoice.tax).toLowerCase().includes(lowerCaseSearch) || // Tìm kiếm theo Thuế
        (invoice.details?.[0]?.booking?.booking_date?.toLowerCase() || '').includes(lowerCaseSearch) || // Tìm kiếm theo Ngày Đặt Lịch
        (invoice.details?.[0]?.booking?.guest?.guest_name?.toLowerCase() || '').includes(lowerCaseSearch) || // Tìm kiếm theo Khách Hàng
        (invoice.details?.[0]?.booking?.service?.services_name?.toLowerCase() || '').includes(lowerCaseSearch) // Tìm kiếm theo Dịch Vụ
      );
    });

    setFilteredInvoices(filtered);
  }, [invoices, search]);

  const handleCreate = async (formData) => {
    try {
      const response = await api.post('/invoices', formData);
      setInvoices((prev) => [response.data.data, ...prev]);
      setShowForm(false);
      toast.success('Tạo hóa đơn thành công!');
    } catch (error) {
      setError('Lỗi khi tạo hóa đơn: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const response = await api.put(`/invoices/${selectedInvoice.id}`, formData);
      setInvoices((prev) =>
        prev.map((inv) => (inv.id === response.data.data.id ? response.data.data : inv))
      );
      setShowForm(false);
      setSelectedInvoice(null);
      toast.success('Cập nhật hóa đơn thành công!');
    } catch (error) {
      setError('Lỗi khi cập nhật hóa đơn: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa hóa đơn này?')) {
      try {
        await api.delete(`/invoices/${id}`);
        setInvoices((prev) => prev.filter((inv) => inv.id !== id));
        toast.success('Xóa hóa đơn thành công!');
      } catch (error) {
        setError('Lỗi khi xóa hóa đơn: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Quản lý hóa đơn</h1>

      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      <Row className="mb-4 align-items-center">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Tìm kiếm (ID, tổng tiền, thuế, ngày, khách hàng, dịch vụ)..."
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
          <Button variant="success" onClick={() => setShowForm(true)} disabled={bookings.length === 0}>
            Tạo hóa đơn mới
          </Button>
        </Col>
      </Row>

      <div style={{ overflowX: 'auto' }}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th style={{ width: '5%' }}>ID</th>
              <th style={{ width: '15%' }}>Tổng Tiền</th>
              <th style={{ width: '15%' }}>Thuế</th>
              <th style={{ width: '20%' }}>Ngày Đặt Lịch</th>
              <th style={{ width: '20%' }}>Khách Hàng</th>
              <th style={{ width: '20%' }}>Dịch Vụ</th>
              <th style={{ width: '15%' }}>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.id}</td>
                  <td>{invoice.total_amount} VNĐ</td>
                  <td>{invoice.tax} VNĐ</td>
                  <td>{invoice.details?.[0]?.booking?.booking_date}</td>
                  <td style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={invoice.details?.[0]?.booking?.guest?.guest_name}>
                    {invoice.details?.[0]?.booking?.guest?.guest_name}
                  </td>
                  <td style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={invoice.details?.[0]?.booking?.service?.services_name}>
                    {invoice.details?.[0]?.booking?.service?.services_name}
                  </td>
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
                <td colSpan="7" className="text-center">
                  Không có hóa đơn nào.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages).keys()].map((page) => (
            <Pagination.Item
              key={page + 1}
              active={page + 1 === currentPage}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>

      {showForm && (
        <InvoiceForm
          invoice={selectedInvoice}
          bookings={bookings}
          onSubmit={selectedInvoice ? handleUpdate : handleCreate}
          onCancel={() => {
            setShowForm(false);
            setSelectedInvoice(null);
          }}
        />
      )}

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