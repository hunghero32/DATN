import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Pagination, Container, Row, Col, Alert } from 'react-bootstrap';
import InvoiceForm from './InvoiceForm';
import InvoiceDetail from './InvoiceDetail';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import debounce from 'lodash/debounce';

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
                    .filter((id) => id); // Lấy danh sách booking_id đã được sử dụng

                const available = completedBookings.filter(
                    (booking) => !usedBookingIds.includes(booking.id)
                );
                setAvailableBookings(available);
            } catch (error) {
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
            <div className="card shadow-sm" style={{ borderRadius: "10px" }}>
                <div className="card-header" style={{ backgroundColor: "#fff", borderBottom: "none" }}>
                    <h4 className="card-title" style={{ color: "#2c3e50" }}>Quản Lý Hóa Đơn</h4>
                </div>
                <div className="card-body">
                    {error && (
                        <Alert variant="danger" onClose={() => setError(null)} dismissible>
                            {error}
                        </Alert>
                    )}

                    <Row className="mb-4 align-items-center">
                        <Col md={4} className="mb-3 mb-md-0">
                            <Form.Control
                                type="text"
                                placeholder="Tìm kiếm (ID, tổng tiền, thuế, %, ngày, khách hàng, dịch vụ)..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{ borderRadius: "8px", borderColor: "#ced4da" }}
                            />
                        </Col>
                        <Col md={4} className="mb-3 mb-md-0">
                            <Form.Control
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                placeholder="Chọn ngày"
                                style={{ borderRadius: "8px", borderColor: "#ced4da" }}
                            />
                        </Col>
                        <Col md={4} className="text-end">
                            <Button
                                variant="success"
                                onClick={() => setShowForm(true)}
                                disabled={availableBookings.length === 0}
                                style={{ borderRadius: "8px", transition: "all 0.3s" }}
                                className="hover-shadow"
                            >
                                Tạo Hóa Đơn Mới
                            </Button>
                        </Col>
                    </Row>

                    <div style={{ overflowX: 'auto' }}>
                        <Table striped hover responsive className="table-hover">
                            <thead>
                                <tr>
                                    <th style={{ width: '5%' }}>ID</th>
                                    <th style={{ width: '15%' }}>Tổng Tiền</th>
                                    <th style={{ width: '10%' }}>Thuế</th>
                                    <th style={{ width: '10%' }}>Thuế (%)</th>
                                    <th style={{ width: '15%' }}>Ngày Đặt Lịch</th>
                                    <th style={{ width: '15%' }}>Khách Hàng</th>
                                    <th style={{ width: '15%' }}>Dịch Vụ</th>
                                    <th style={{ width: '15%' }}>Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredInvoices.length > 0 ? (
                                    filteredInvoices.map((invoice) => (
                                        <tr key={invoice.id}>
                                            <td>{invoice.id}</td>
                                            <td>{invoice.total_amount ? invoice.total_amount.toLocaleString('vi-VN') : 0} VNĐ</td>
                                            <td>{invoice.tax ? invoice.tax.toLocaleString('vi-VN') : 0} VNĐ</td>
                                            <td>{invoice.tax_percent ? invoice.tax_percent : 0}%</td>
                                            <td>{invoice.details?.[0]?.booking?.booking_date || 'N/A'}</td>
                                            <td
                                                style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                                title={invoice.details?.[0]?.booking?.guest?.guest_name}
                                            >
                                                {invoice.details?.[0]?.booking?.guest?.guest_name || 'N/A'}
                                            </td>
                                            <td
                                                style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                                title={invoice.details?.[0]?.booking?.service?.services_name}
                                            >
                                                {invoice.details?.[0]?.booking?.service?.services_name || 'N/A'}
                                            </td>
                                            <td>
                                                <Button
                                                    variant="info"
                                                    size="sm"
                                                    className="me-2 hover-shadow"
                                                    onClick={() => {
                                                        setSelectedInvoice(invoice);
                                                        setShowDetail(true);
                                                    }}
                                                    style={{ borderRadius: "6px", transition: "all 0.3s" }}
                                                >
                                                    Xem Chi Tiết
                                                </Button>
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    className="me-2 hover-shadow"
                                                    onClick={() => {
                                                        setSelectedInvoice(invoice);
                                                        setShowForm(true);
                                                    }}
                                                    style={{ borderRadius: "6px", transition: "all 0.3s" }}
                                                >
                                                    Sửa
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    className="hover-shadow"
                                                    onClick={() => handleDelete(invoice.id)}
                                                    style={{ borderRadius: "6px", transition: "all 0.3s" }}
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
                    bookings={availableBookings} // Truyền danh sách booking chưa có hóa đơn
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