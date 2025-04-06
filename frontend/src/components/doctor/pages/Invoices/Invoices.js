import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Pagination, Container, Row, Col, Alert } from 'react-bootstrap';
import InvoiceForm from './InvoiceForm';
import InvoiceDetail from './InvoiceDetail';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import debounce from 'lodash/debounce';
import { FaFileInvoiceDollar, FaSearch, FaCalendarAlt } from 'react-icons/fa';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount || 0);
};

const Invoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [filteredInvoices, setFilteredInvoices] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [availableBookings, setAvailableBookings] = useState([]); // Danh sách booking chưa có hóa đơn
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

    useEffect(() => {
        if (!token) {
            setError('Vui lòng đăng nhập để truy cập danh sách hóa đơn.');
            return;
        }

        fetchInvoices();
    }, [currentPage, date, token]);

    useEffect(() => {
        if (!token) return;

        const fetchBookings = async () => {
            try {
                const response = await api.get('/bookings');
                const completedBookings = response.data.data.filter(
                    (booking) => booking.status === 'completed'
                );
                setBookings(completedBookings);

                // Lấy danh sách booking chưa có hóa đơn
                const invoiceResponse = await api.get('/invoices');
                const usedBookingIds = invoiceResponse.data.data.data
                    .map((invoice) => invoice.details?.[0]?.booking_id)
                    .filter((id) => id);

                const available = completedBookings.filter(
                    (booking) => !usedBookingIds.includes(booking.id)
                );
                setAvailableBookings(available);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setError('Không thể tải danh sách booking: ' + (error.response?.data?.message || error.message));
            }
        };

        fetchBookings();
    }, [token]);

    useEffect(() => {
        const debouncedSearch = debounce(() => {
            if (!search) {
                setFilteredInvoices(invoices);
                return;
            }

            const lowerCaseSearch = search.toLowerCase();
            const filtered = invoices.filter((invoice) => {
                return (
                    String(invoice.id).toLowerCase().includes(lowerCaseSearch) ||
                    String(invoice.total_amount).toLowerCase().includes(lowerCaseSearch) ||
                    String(invoice.tax).toLowerCase().includes(lowerCaseSearch) ||
                    String(invoice.tax_percent).toLowerCase().includes(lowerCaseSearch) ||
                    (invoice.details?.[0]?.booking?.booking_date?.toLowerCase() || '').includes(lowerCaseSearch) ||
                    (invoice.details?.[0]?.booking?.guest?.guest_name?.toLowerCase() || '').includes(lowerCaseSearch) ||
                    (invoice.details?.[0]?.booking?.service?.services_name?.toLowerCase() || '').includes(lowerCaseSearch)
                );
            });

            setFilteredInvoices(filtered);
        }, 300);

        debouncedSearch();

        return () => debouncedSearch.cancel();
    }, [invoices, search]);

    const handleCreate = async (formData) => {
        try {
            const response = await api.post('/invoices', formData);
            setShowForm(false);
            toast.success('Tạo hóa đơn thành công!');
            fetchInvoices();

            // Cập nhật lại danh sách availableBookings
            const invoiceResponse = await api.get('/invoices');
            const usedBookingIds = invoiceResponse.data.data.data
                .map((invoice) => invoice.details?.[0]?.booking_id)
                .filter((id) => id);
            const available = bookings.filter(
                (booking) => !usedBookingIds.includes(booking.id)
            );
            setAvailableBookings(available);
        } catch (error) {
            setError('Lỗi khi tạo hóa đơn: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleUpdate = async (formData) => {
        try {
            const updateData = {
                discount: formData.discount || 0,
                tax_percent: formData.tax_percent || 0,
                tax: formData.tax || 0
            };
            const response = await api.put(`/invoices/${selectedInvoice.id}`, updateData);
            setShowForm(false);
            toast.success('Cập nhật hóa đơn thành công!');
            fetchInvoices();
            setSelectedInvoice(null);
        } catch (error) {
            setError('Lỗi khi cập nhật hóa đơn: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa hóa đơn này?')) {
            try {
                await api.delete(`/invoices/${id}`);
                toast.success('Xóa hóa đơn thành công!');
                fetchInvoices();

                // Cập nhật lại danh sách availableBookings
                const invoiceResponse = await api.get('/invoices');
                const usedBookingIds = invoiceResponse.data.data.data
                    .map((invoice) => invoice.details?.[0]?.booking_id)
                    .filter((id) => id);
                const available = bookings.filter(
                    (booking) => !usedBookingIds.includes(booking.id)
                );
                setAvailableBookings(available);
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

    return (
        <div className="content-inner container-fluid pb-0" style={{ backgroundColor: "#f0f4f8", padding: "20px" }}>
            <div className="card shadow-sm" style={{ borderRadius: "15px", border: "none" }}>
                <div className="card-header" style={{ backgroundColor: "#fff", borderBottom: "1px solid #edf2f9", padding: "20px" }}>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <FaFileInvoiceDollar size={24} style={{ color: "#3498db", marginRight: "10px" }} />
                            <h4 className="card-title mb-0" style={{ color: "#2c3e50", fontSize: "1.5rem" }}>Quản Lý Kê Đơn</h4>
                        </div>
                    </div>
                </div>
                <div className="card-body" style={{ padding: "20px" }}>
                    {error && (
                        <Alert variant="danger" onClose={() => setError(null)} dismissible>
                            {error}
                        </Alert>
                    )}

                    <Row className="mb-4">
                        <Col md={4} className="mb-3 mb-md-0">
                            <div className="search-box position-relative">
                                <FaSearch style={{ position: 'absolute', left: '12px', top: '12px', color: '#6c757d' }} />
                                <Form.Control
                                    type="text"
                                    placeholder="Tìm kiếm kê đơn..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    style={{
                                        borderRadius: "8px",
                                        padding: "10px 10px 10px 35px",
                                        border: "1px solid #ced4da",
                                        backgroundColor: "#f8f9fa"
                                    }}
                                />
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="date-picker position-relative">
                                <FaCalendarAlt style={{ position: 'absolute', left: '12px', top: '12px', color: '#6c757d' }} />
                                <Form.Control
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    style={{
                                        borderRadius: "8px",
                                        padding: "10px 10px 10px 35px",
                                        border: "1px solid #ced4da",
                                        backgroundColor: "#f8f9fa"
                                    }}
                                />
                            </div>
                        </Col>
                        <Col md={4} className="text-end">
                            <Button
                                variant="primary"
                                onClick={() => setShowForm(true)}
                                style={{
                                    borderRadius: "8px",
                                    padding: "10px 20px",
                                    backgroundColor: "#3498db",
                                    border: "none",
                                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                                }}
                            >
                                <i className="fas fa-plus-circle me-2"></i>
                                Tạo Kê Đơn Mới
                            </Button>
                        </Col>
                    </Row>

                    <div className="table-responsive" style={{ borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.02)" }}>
                        <Table hover className="align-middle">
                            <thead style={{ backgroundColor: "#f8f9fa" }}>
                                <tr>
                                    <th style={{ padding: "15px", color: "#2c3e50", fontWeight: "600", borderBottom: "2px solid #edf2f9" }}>ID</th>
                                    <th style={{ padding: "15px", color: "#2c3e50", fontWeight: "600", borderBottom: "2px solid #edf2f9" }}>Tổng Tiền</th>
                                    <th style={{ padding: "15px", color: "#2c3e50", fontWeight: "600", borderBottom: "2px solid #edf2f9" }}>Thuế</th>
                                    <th style={{ padding: "15px", color: "#2c3e50", fontWeight: "600", borderBottom: "2px solid #edf2f9" }}>Ngày Đặt Lịch</th>
                                    <th style={{ padding: "15px", color: "#2c3e50", fontWeight: "600", borderBottom: "2px solid #edf2f9" }}>Khách Hàng</th>
                                    <th style={{ padding: "15px", color: "#2c3e50", fontWeight: "600", borderBottom: "2px solid #edf2f9" }}>Dịch Vụ</th>
                                    <th style={{ padding: "15px", color: "#2c3e50", fontWeight: "600", borderBottom: "2px solid #edf2f9" }}>Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredInvoices.length > 0 ? (
                                    filteredInvoices.map((invoice) => (
                                        <tr key={invoice.id}>
                                            <td style={{ padding: "15px" }}>{invoice.id}</td>
                                            <td style={{ padding: "15px" }}>{formatCurrency(invoice.total_amount)} VNĐ</td>
                                            <td style={{ padding: "15px" }}>{formatCurrency(invoice.tax)} VNĐ</td>
                                            <td style={{ padding: "15px" }}>{invoice.details?.[0]?.booking?.booking_date || 'N/A'}</td>
                                            <td style={{ padding: "15px" }}>{invoice.details?.[0]?.booking?.guest?.guest_name || 'N/A'}</td>
                                            <td style={{ padding: "15px" }}>{invoice.details?.[0]?.booking?.service?.services_name || 'N/A'}</td>
                                            <td style={{ padding: "15px" }}>
                                                <div className="d-flex gap-2">
                                                    <Button
                                                        variant="info"
                                                        size="sm"
                                                        onClick={() => {
                                                            setSelectedInvoice(invoice);
                                                            setShowDetail(true);
                                                        }}
                                                        style={{
                                                            borderRadius: "6px",
                                                            backgroundColor: "#17a2b8",
                                                            border: "none",
                                                            padding: "8px 12px"
                                                        }}
                                                    >
                                                        Chi Tiết
                                                    </Button>
                                                    <Button
                                                        variant="primary"
                                                        size="sm"
                                                        onClick={() => {
                                                            setSelectedInvoice(invoice);
                                                            setShowForm(true);
                                                        }}
                                                        style={{
                                                            borderRadius: "6px",
                                                            backgroundColor: "#3498db",
                                                            border: "none",
                                                            padding: "8px 12px"
                                                        }}
                                                    >
                                                        Sửa
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleDelete(invoice.id)}
                                                        style={{
                                                            borderRadius: "6px",
                                                            backgroundColor: "#dc3545",
                                                            border: "none",
                                                            padding: "8px 12px"
                                                        }}
                                                    >
                                                        Xóa
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center" style={{ padding: "20px" }}>
                                            Không có kê đơn nào.
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
                </div>
            </div>

            {showForm && (
                <InvoiceForm
                    invoice={selectedInvoice}
                    bookings={availableBookings}
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
        </div>
    );
};

export default Invoices;