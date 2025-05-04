import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner, Row, Col } from 'react-bootstrap';
import { FaFileMedicalAlt, FaUserAlt, FaCalendarAlt, FaClock, FaStethoscope, FaDiagnoses, FaPrescriptionBottleAlt, FaStickyNote, FaUpload } from 'react-icons/fa'; // Updated Icons
import { toast } from 'react-toastify';

// Remove formatCurrency if not needed

// --- Renamed Component & Props ---
const ResultForm = ({ result, bookings, onSubmit, onCancel }) => {

    // --- State for Result Data ---
    const [formData, setFormData] = useState({
        booking_id: '',
        diagnosis: '',
        prescription: '',
        note: '',
        file: null, // State to hold the selected file object
        _method: 'POST' // We'll use POST to handle file uploads easily, backend handles logic
    });
    const [currentBookingInfo, setCurrentBookingInfo] = useState(null); // To display booking details
    const [fileName, setFileName] = useState(''); // To display the selected file name
    const [loading, setLoading] = useState(false); // Loading state for submission

    // --- Populate Form on Edit ---
    useEffect(() => {
        if (result) {
            // Editing existing result
            setFormData({
                booking_id: result.booking_id || '',
                diagnosis: result.diagnosis || '',
                prescription: result.prescription || '',
                note: result.note || '',
                file: null, // Don't pre-fill file input for editing, user must re-select
                 _method: 'POST' // Still use POST
            });
            const linkedBooking = bookings.find(b => b.id === result.booking_id);
            setCurrentBookingInfo(linkedBooking || null);
            setFileName(result.file ? result.file.split('/').pop() : ''); // Show existing file name
        } else {
            // Creating new result
            setFormData({
                booking_id: '',
                diagnosis: '',
                prescription: '',
                note: '',
                file: null,
                _method: 'POST'
            });
            setCurrentBookingInfo(null);
            setFileName('');
        }
    }, [result, bookings]);

    // --- Handle Input Changes ---
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'file') {
            const selectedFile = files[0];
            setFormData(prev => ({
                ...prev,
                file: selectedFile || null
            }));
            setFileName(selectedFile ? selectedFile.name : (result?.file ? result.file.split('/').pop() : '')); // Show new or existing file name
        } else if (name === 'booking_id') {
             setFormData(prev => ({
                ...prev,
                booking_id: value
            }));
             // Update booking info display when dropdown changes
             const linkedBooking = bookings.find(b => b.id === parseInt(value));
             setCurrentBookingInfo(linkedBooking || null);
        }
         else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // --- Handle Form Submission ---
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        if (!formData.booking_id) {
             toast.error('Vui lòng chọn một lịch khám.');
             setLoading(false);
             return;
        }

        // Create FormData object
        const dataToSubmit = new FormData();
        dataToSubmit.append('booking_id', formData.booking_id);
        dataToSubmit.append('diagnosis', formData.diagnosis);
        dataToSubmit.append('prescription', formData.prescription);
        dataToSubmit.append('note', formData.note);
        if (formData.file) { // Only append file if a new one is selected
            dataToSubmit.append('file', formData.file);
        }
        // We send POST to the specific endpoint, backend determines create/update
        // dataToSubmit.append('_method', 'PUT'); // Not needed if backend handles POST correctly

        // Call the onSubmit prop passed from Results.js
        onSubmit(dataToSubmit, !!result); // Pass data and isUpdating flag
        setLoading(false); // Potentially stop loading in parent component after API call
    };

    return (
        <Modal show={true} onHide={onCancel} centered size="lg" backdrop="static">
            <Modal.Header closeButton style={{ borderBottom: "1px solid #edf2f9", padding: "20px", backgroundColor: "#f8f9fa" }}>
                <div className="d-flex align-items-center">
                    {/* --- Updated Icon and Title --- */}
                    <FaFileMedicalAlt size={24} style={{ color: "#3498db", marginRight: "10px" }} />
                    <Modal.Title style={{ color: "#2c3e50", fontSize: "1.25rem" }}>
                        {result ? 'Cập Nhật Kê Đơn' : 'Tạo Kê Đơn Mới'}
                    </Modal.Title>
                </div>
            </Modal.Header>
            <Modal.Body style={{ padding: "20px" }}>
                {/* --- Display Selected/Linked Booking Info --- */}
                {currentBookingInfo && (
                    <div className="booking-info mb-4 p-3" style={{ backgroundColor: "#f0f8ff", borderRadius: "8px", border: "1px solid #e0f0ff" }}>
                        <h6 className="mb-3" style={{ color: "#2c3e50", fontWeight: 600 }}>Thông Tin Lịch Khám Liên Kết</h6>
                        <Row>
                            <Col md={6}>
                                <p className="mb-2"><FaUserAlt className="me-2" /> <strong>Bệnh nhân:</strong> {currentBookingInfo.guest?.guest_name}</p>
                                <p className="mb-0"><FaCalendarAlt className="me-2" /> <strong>Ngày khám:</strong> {currentBookingInfo.booking_date}</p>
                            </Col>
                            <Col md={6}>
                                <p className="mb-2"><FaClock className="me-2" /> <strong>Giờ khám:</strong> {currentBookingInfo.booking_time}</p>
                                <p className="mb-0"><FaStethoscope className="me-2" /> <strong>Dịch vụ:</strong> {currentBookingInfo.service?.services_name}</p>
                            </Col>
                        </Row>
                    </div>
                )}

                <Form onSubmit={handleSubmit}>
                    {/* --- Booking Selection (Disabled when editing) --- */}
                    <Form.Group className="mb-4">
                        <Form.Label style={{ color: "#2c3e50", fontWeight: 500, marginBottom: "8px" }}>
                            Chọn Lịch Khám <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Select
                            name="booking_id"
                            value={formData.booking_id}
                            onChange={handleChange}
                            required
                            disabled={!!result} // Disable if editing
                            style={{ borderRadius: "8px", padding: "12px", border: "1px solid #ced4da", backgroundColor: !!result ? "#e9ecef" : "#f8f9fa" }}
                        >
                            <option value="">-- Chọn lịch khám --</option>
                            {/* Populate with available bookings */}
                            {bookings.map((booking) => (
                                <option key={booking.id} value={booking.id}>
                                    {`${booking.guest?.guest_name || 'N/A'} - ${booking.service?.services_name || 'N/A'} (${booking.booking_date} ${booking.booking_time})`}
                                </option>
                            ))}
                        </Form.Select>
                        {!!result && <Form.Text className="text-muted">Không thể thay đổi lịch khám khi cập nhật.</Form.Text>}
                    </Form.Group>

                     {/* --- Result Fields --- */}
                    <Form.Group className="mb-4">
                        <Form.Label style={{ color: "#2c3e50", fontWeight: 500, marginBottom: "8px" }}>
                            <FaDiagnoses className="me-2" /> Chẩn Đoán
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="diagnosis"
                            value={formData.diagnosis}
                            onChange={handleChange}
                            placeholder="Nhập chẩn đoán của bác sĩ..."
                            style={{ borderRadius: "8px", padding: "12px", border: "1px solid #ced4da" }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label style={{ color: "#2c3e50", fontWeight: 500, marginBottom: "8px" }}>
                            <FaPrescriptionBottleAlt className="me-2" /> Đơn Thuốc
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            name="prescription"
                            value={formData.prescription}
                            onChange={handleChange}
                            placeholder="Nhập đơn thuốc chi tiết (tên thuốc, liều lượng, cách dùng...)"
                            style={{ borderRadius: "8px", padding: "12px", border: "1px solid #ced4da" }}
                        />
                    </Form.Group>

                     <Form.Group className="mb-4">
                        <Form.Label style={{ color: "#2c3e50", fontWeight: 500, marginBottom: "8px" }}>
                            <FaStickyNote className="me-2" /> Ghi Chú
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            placeholder="Ghi chú thêm (nếu có)..."
                            style={{ borderRadius: "8px", padding: "12px", border: "1px solid #ced4da" }}
                        />
                    </Form.Group>

                     <Form.Group className="mb-4">
                        <Form.Label style={{ color: "#2c3e50", fontWeight: 500, marginBottom: "8px" }}>
                           <FaUpload className="me-2" /> Tệp đính kèm (nếu có)
                        </Form.Label>
                        <Form.Control
                            type="file"
                            name="file"
                            onChange={handleChange}
                            style={{ borderRadius: "8px", border: "1px solid #ced4da" }}
                        />
                         {fileName && <Form.Text className="text-muted mt-1 d-block">File hiện tại/đã chọn: {fileName}</Form.Text>}
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer style={{ borderTop: "1px solid #edf2f9", padding: "20px", backgroundColor: "#f8f9fa" }}>
                <Button
                    variant="secondary"
                    onClick={onCancel}
                    disabled={loading} // Disable buttons while loading
                    style={{ borderRadius: "8px", padding: "10px 20px", backgroundColor: "#6c757d", border: "none" }}
                >
                    Hủy
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSubmit} // Use onClick, Form onSubmit won't work directly on button
                    disabled={loading || !formData.booking_id} // Disable if loading or no booking selected
                    style={{ borderRadius: "8px", padding: "10px 20px", backgroundColor: "#3498db", border: "none", marginLeft: "10px" }}
                >
                    {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-1" /> : null}
                    {result ? 'Cập Nhật' : 'Tạo Kê Đơn'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

// --- Export Renamed Component ---
export default ResultForm;
