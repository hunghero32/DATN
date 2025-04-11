import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'; // Use the configured api instance
import { Table, Button, Form, Pagination, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import ResultForm from './ResultsForm'; // Renamed Import
import ResultDetail from './ResultsDetail'; // Renamed Import
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import debounce from 'lodash/debounce';
import { FaNotesMedical, FaSearch, FaCalendarAlt, FaEdit, FaTrashAlt, FaInfoCircle } from 'react-icons/fa'; // Changed Icon

// Remove formatCurrency if not needed for results list
// const formatCurrency = (amount) => { ... };

// --- Renamed Component ---
const Results = () => {
    // --- Renamed State Variables ---
    const [results, setResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [bookings, setBookings] = useState([]); // Keep to populate form dropdown
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [date, setDate] = useState(''); // Filter by booking date
    const [showForm, setShowForm] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedResult, setSelectedResult] = useState(null); // Renamed
    const [editingResult, setEditingResult] = useState(null); // State for editing
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    const token = localStorage.getItem('authToken');

    // --- Use configured API instance ---
    const api = axios.create({
        baseURL: 'http://127.0.0.1:8000/api/doctor',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
            // Use 'multipart/form-data' when sending FormData in handleSave
        },
    });

    // --- Renamed Function & Updated API Endpoint ---
    const fetchResults = useCallback(async (page = 1, searchTerm = '', filterDate = '') => {
        setLoading(true);
        setError(null);
        try {
            // --- Updated API Endpoint ---
            const response = await api.get(`/results`, {
                params: {
                    page: page,
                    search: searchTerm,
                    booking_date: filterDate, // Assuming backend filters by booking_date
                }
            });
            setResults(response.data.data || []); // Adjust based on actual API response structure
            setFilteredResults(response.data.data || []); // Initialize filtered list
            setTotalPages(response.data.last_page || 1); // Adjust based on actual API response structure
        } catch (error) {
            console.error("Error fetching results:", error);
            setError(error.response?.data?.message || 'Không thể tải danh sách kê đơn.');
            setResults([]);
            setFilteredResults([]);
        } finally {
            setLoading(false);
        }
    }, [token]); // api instance doesn't need to be dependency if created outside

    // --- Fetch Initial Data ---
    useEffect(() => {
        if (!token) {
            setError('Vui lòng đăng nhập.');
            setLoading(false);
            return;
        }
        fetchResults(currentPage, search, date);
    }, [currentPage, date, fetchResults, token]); // Include fetchResults

    // --- Fetch Bookings for Form Dropdown ---
    useEffect(() => {
        if (!token) return;
        const fetchBookingsForForm = async () => {
            try {
                // Fetch bookings suitable for creating results (e.g., completed or confirmed)
                const response = await api.get('/bookings', { params: { status: 'completed,confirmed' }}); // Adjust status as needed
                setBookings(response.data.data || []); // Adjust based on API structure
            } catch (error) {
                console.error('Error fetching bookings for form:', error);
                // Optionally set an error, but maybe not critical for the list view
            }
        };
        fetchBookingsForForm();
    }, [token]); // api instance not needed

    // --- Debounced Search ---
    const debouncedSearch = useCallback(
        debounce((searchTerm, filterDate) => {
            fetchResults(1, searchTerm, filterDate); // Fetch from backend on search change
            setCurrentPage(1); // Reset to first page on search
        }, 500), // Adjust debounce time as needed
        [fetchResults]
    );

    useEffect(() => {
        debouncedSearch(search, date);
        // Cleanup function to cancel debounce on unmount
        return () => debouncedSearch.cancel();
    }, [search, date, debouncedSearch]);


    // --- Handle Create/Update ---
    // This function will be called by ResultForm upon submission
    const handleSaveResult = async (resultData, isUpdating = false) => {
        setLoading(true); // Show loading indicator on form submission
        setError(null);
        const bookingId = resultData.get('booking_id'); // Assuming booking_id is in FormData

        if (!bookingId) {
             setError('Vui lòng chọn một lịch khám.');
             setLoading(false);
             return;
        }

        try {
            // Backend uses POST to /results/booking/{id} for both create and update
            const response = await api.post(`/results/booking/${bookingId}`, resultData, {
                 headers: {
                     'Content-Type': 'multipart/form-data', // Important for file uploads
                 },
            });

            setShowForm(false);
            setEditingResult(null);
            toast.success(isUpdating ? 'Cập nhật kê đơn thành công!' : 'Tạo kê đơn thành công!');
            fetchResults(currentPage, search, date); // Refresh list
        } catch (error) {
            console.error("Error saving result:", error);
            // Attempt to parse Laravel validation errors
            let errorMsg = 'Lỗi khi lưu kê đơn.';
            if (error.response?.data?.errors) {
                 errorMsg = Object.values(error.response.data.errors).flat().join(' ');
            } else if (error.response?.data?.message) {
                 errorMsg = error.response.data.message;
            }
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
             setLoading(false);
        }
    };


    // --- Handle Delete ---
    // --- Updated API Endpoint & Confirmation Message ---
    const handleDelete = async (resultId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa kê đơn này?')) {
            try {
                // --- Assuming backend uses DELETE /results/{id} ---
                await api.delete(`/results/${resultId}`);
                toast.success('Xóa kê đơn thành công!');
                fetchResults(currentPage, search, date); // Refresh list
            } catch (error) {
                console.error("Error deleting result:", error);
                setError('Lỗi khi xóa kê đơn: ' + (error.response?.data?.message || error.message));
                toast.error('Lỗi khi xóa kê đơn.');
            }
        }
    };

    // --- Handle Page Change ---
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // --- Open Modals ---
    const handleShowDetail = (result) => {
        setSelectedResult(result);
        setShowDetail(true);
    };

    const handleShowCreateForm = () => {
        setSelectedResult(null); // Clear selection for create
        setEditingResult(null); // Ensure not in edit mode
        setShowForm(true);
    };

    const handleShowEditForm = (result) => {
        setSelectedResult(result); // Keep selectedResult for potentially showing details? Or maybe not needed.
        setEditingResult(result); // Set the result to be edited
        setShowForm(true);
    };

    return (
        <div className="content-inner container-fluid pb-0" style={{ backgroundColor: "#f0f4f8", padding: "20px" }}>
            <div className="card shadow-sm" style={{ borderRadius: "15px", border: "none" }}>
                <div className="card-header" style={{ backgroundColor: "#fff", borderBottom: "1px solid #edf2f9", padding: "20px" }}>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            {/* --- Updated Icon and Title --- */}
                            <FaNotesMedical size={24} style={{ color: "#3498db", marginRight: "10px" }} />
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
                        {/* --- Search Input --- */}
                        <Col md={4} className="mb-3 mb-md-0">
                            <div className="search-box position-relative">
                                <FaSearch style={{ position: 'absolute', left: '12px', top: '12px', color: '#6c757d' }} />
                                <Form.Control
                                    type="text"
                                    placeholder="Tìm theo tên bệnh nhân..." // Updated Placeholder
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    style={{ borderRadius: "8px", padding: "10px 10px 10px 35px", border: "1px solid #ced4da", backgroundColor: "#f8f9fa" }}
                                />
                            </div>
                        </Col>
                         {/* --- Date Filter --- */}
                        <Col md={4}>
                            <div className="date-picker position-relative">
                                <FaCalendarAlt style={{ position: 'absolute', left: '12px', top: '12px', color: '#6c757d' }} />
                                <Form.Control
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    style={{ borderRadius: "8px", padding: "10px 10px 10px 35px", border: "1px solid #ced4da", backgroundColor: "#f8f9fa" }}
                                />
                            </div>
                        </Col>
                         {/* --- Create Button --- */}
                        <Col md={4} className="text-end">
                            <Button
                                variant="primary"
                                onClick={handleShowCreateForm} // Updated handler
                                style={{ borderRadius: "8px", padding: "10px 20px", backgroundColor: "#3498db", border: "none", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
                            >
                                <FaNotesMedical className="me-2" /> {/* Changed Icon */}
                                Tạo Kê Đơn Mới
                            </Button>
                        </Col>
                    </Row>

                     {/* --- Table --- */}
                    <div className="table-responsive" style={{ borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.02)" }}>
                        <Table hover className="align-middle">
                            <thead style={{ backgroundColor: "#f8f9fa" }}>
                                <tr>
                                    {/* --- Updated Table Headers --- */}
                                    <th style={{ padding: "15px", color: "#2c3e50", fontWeight: "600", borderBottom: "2px solid #edf2f9" }}>ID</th>
                                    <th style={{ padding: "15px", color: "#2c3e50", fontWeight: "600", borderBottom: "2px solid #edf2f9" }}>Bệnh Nhân</th>
                                    <th style={{ padding: "15px", color: "#2c3e50", fontWeight: "600", borderBottom: "2px solid #edf2f9" }}>Dịch Vụ</th>
                                    <th style={{ padding: "15px", color: "#2c3e50", fontWeight: "600", borderBottom: "2px solid #edf2f9" }}>Ngày Khám</th>
                                     <th style={{ padding: "15px", color: "#2c3e50", fontWeight: "600", borderBottom: "2px solid #edf2f9" }}>Chẩn đoán</th>
                                    <th style={{ padding: "15px", color: "#2c3e50", fontWeight: "600", borderBottom: "2px solid #edf2f9", width: "180px" }}>Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="text-center" style={{ padding: "20px" }}>
                                            <Spinner animation="border" role="status">
                                                <span className="visually-hidden">Đang tải...</span>
                                            </Spinner>
                                        </td>
                                    </tr>
                                ) : filteredResults.length > 0 ? (
                                    filteredResults.map((result) => ( // Use 'result'
                                        <tr key={result.id}>
                                            {/* --- Updated Table Data Mapping --- */}
                                            <td style={{ padding: "15px" }}>{result.id}</td>
                                            <td style={{ padding: "15px" }}>{result.guest?.guest_name || 'N/A'}</td>
                                            <td style={{ padding: "15px" }}>{result.booking?.service?.services_name || 'N/A'}</td>
                                            <td style={{ padding: "15px" }}>{result.booking?.booking_date || 'N/A'}</td>
                                            <td style={{ padding: "15px", maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={result.diagnosis}>
                                                {result.diagnosis || 'Chưa có'}
                                            </td>
                                            <td style={{ padding: "15px" }}>
                                                <div className="d-flex gap-2">
                                                    {/* --- Updated Buttons --- */}
                                                    <Button
                                                        variant="info"
                                                        size="sm"
                                                        onClick={() => handleShowDetail(result)} // Pass result
                                                        style={{ borderRadius: "6px", backgroundColor: "#17a2b8", border: "none", padding: "8px 12px" }}
                                                        title="Xem Chi Tiết"
                                                    >
                                                        <FaInfoCircle />
                                                    </Button>
                                                    <Button
                                                        variant="primary"
                                                        size="sm"
                                                        onClick={() => handleShowEditForm(result)} // Pass result
                                                        style={{ borderRadius: "6px", backgroundColor: "#3498db", border: "none", padding: "8px 12px" }}
                                                         title="Sửa Kê Đơn"
                                                    >
                                                       <FaEdit />
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleDelete(result.id)} // Pass result id
                                                        style={{ borderRadius: "6px", backgroundColor: "#dc3545", border: "none", padding: "8px 12px" }}
                                                        title="Xóa Kê Đơn"
                                                    >
                                                        <FaTrashAlt />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center" style={{ padding: "20px" }}>
                                            Không có kê đơn nào.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    {!loading && totalPages > 1 && (
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
                    )}
                </div>
            </div>

             {/* --- Use Renamed Components for Modals --- */}
            {showForm && (
                <ResultForm
                    result={editingResult} // Pass result for editing
                    bookings={bookings} // Pass bookings for dropdown
                    onSubmit={handleSaveResult} // Use the combined save handler
                    onCancel={() => {
                        setShowForm(false);
                        setEditingResult(null);
                    }}
                />
            )}

            {showDetail && selectedResult && ( // Ensure selectedResult is not null
                <ResultDetail
                    result={selectedResult} // Pass selectedResult
                    onClose={() => {
                        setShowDetail(false);
                        setSelectedResult(null);
                    }}
                />
            )}
        </div>
    );
};

// --- Export Renamed Component ---
export default Results;