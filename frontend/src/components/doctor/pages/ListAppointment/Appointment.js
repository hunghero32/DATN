import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Button, Table, Form, Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Hàm lấy token từ localStorage
const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

const Appointment = () => {
  const [date, setDate] = useState(new Date());
  const [statusFilter, setStatusFilter] = useState("pending");
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showMedicalRecordModal, setShowMedicalRecordModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showResultViewModal, setShowResultViewModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [medicalRecord, setMedicalRecord] = useState(null);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      const token = getAuthToken();
      if (!token) {
        setError("Vui lòng đăng nhập để tiếp tục.");
        setLoading(false);
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/doctor/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointments(response.data.data);
      } catch (error) {
        setError("Lỗi khi tải dữ liệu cuộc hẹn: " + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [navigate]);

  // Lọc danh sách theo trạng thái
  const filteredPendingAppointments = appointments.filter(
    (appointment) => appointment.status === "pending"
  );
  const filteredConfirmedAppointments = appointments.filter(
    (appointment) => appointment.status === "confirmed"
  );
  const filteredCompletedAppointments = appointments.filter(
    (appointment) => appointment.status === "completed"
  );

  // Xử lý xác nhận nhận bệnh
  const handleAcceptAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowConfirmModal(true);
  };

  const handleConfirmAccept = async () => {
    if (!selectedAppointment) return;
  
    const token = getAuthToken();
    if (!token) {
      setError("Vui lòng đăng nhập để tiếp tục.");
      navigate("/login");
      setShowConfirmModal(false);
      return;
    }
  
    setLoading(true);
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/doctor/bookings/${selectedAppointment.id}`,
        { status: "confirmed" }, // Đảm bảo body chứa đúng key "status"
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setAppointments((prev) =>
        prev.map((app) =>
          app.id === selectedAppointment.id ? { ...app, ...response.data.data, status: "confirmed" } : app
        )
      );
  
      alert(`${selectedAppointment.guest?.guest_name} đã được nhận.`);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      setError("Lỗi khi cập nhật trạng thái: " + (error.response?.data?.message || error.message));
      alert("Lỗi khi cập nhật trạng thái: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
      setShowConfirmModal(false);
    }
  };

  // Xử lý hoàn thành cuộc hẹn
  const handleCompleteAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setDiagnosis(""); // Reset diagnosis
    setNotes(""); // Reset notes (replacing treatment)
    setFile(null); // Reset file
    setShowCompleteModal(true);
  };

  const handleConfirmComplete = async () => {
    if (!selectedAppointment) return;
  
    const token = getAuthToken();
    if (!token) {
      setError("Vui lòng đăng nhập để tiếp tục.");
      navigate("/login");
      return;
    }
  
    setLoading(true);
    try {
      // Update booking status to "completed"
      await axios.put(
        `http://127.0.0.1:8000/api/doctor/bookings/${selectedAppointment.id}`,
        { status: "completed" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Prepare form data for result
      const formData = new FormData();
      formData.append("booking_id", selectedAppointment.id);
      formData.append("diagnosis", diagnosis);
      if (notes) formData.append("note", notes); // Optional field
      if (file) formData.append("file", file); // Optional file upload
  
      // Post exam result
      const resultResponse = await axios.post(
        `http://127.0.0.1:8000/api/doctor/exam-results`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Required for file upload
          },
        }
      );
  
      // Update local state with the new result
      setAppointments((prev) =>
        prev.map((app) =>
          app.id === selectedAppointment.id
            ? { ...app, status: "completed", examResult: resultResponse.data.data }
            : app
        )
      );
  
      alert(`Cuộc hẹn của ${selectedAppointment.guest?.guest_name} đã hoàn thành.`);
    } catch (error) {
      console.error("Lỗi khi hoàn thành cuộc hẹn:", error);
      setError("Lỗi khi hoàn thành cuộc hẹn: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
      setShowCompleteModal(false);
      setDiagnosis("");
      setNotes("");
      setFile(null);
    }
  };

  // Xử lý xóa cuộc hẹn
  const handleDeleteAppointment = async (appointment) => {
    const token = getAuthToken();
    if (!token) {
      setError("Vui lòng đăng nhập để tiếp tục.");
      navigate("/login");
      return;
    }

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/doctor/bookings/${appointment.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments((prev) =>
        prev.filter((app) => app.id !== appointment.id)
      );
      alert("Cuộc hẹn đã được xóa.");
    } catch (error) {
      console.error("Lỗi khi xóa cuộc hẹn:", error);
      alert("Lỗi khi xóa cuộc hẹn: " + (error.response?.data?.message || error.message));
    }
  };

  // Xử lý xem chi tiết
  const handleShowDetail = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  // Xử lý xem hồ sơ bệnh án (cập nhật để lấy 1 bản ghi duy nhất)
  const handleShowMedicalRecord = async (appointment) => {
    setSelectedAppointment(appointment);
    setShowMedicalRecordModal(true);
    setMedicalRecord(null); // Reset hồ sơ bệnh án
    setResults([]); // Reset kết quả khám

    const token = getAuthToken();
    if (!token) {
      setError("Vui lòng đăng nhập để tiếp tục.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/doctor/medical-records/${appointment.guest_id}`, // Sử dụng endpoint mới
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      if (data.medical_record) {
        setMedicalRecord(data.medical_record); // Lưu thông tin hồ sơ bệnh án
        setResults(data.results || []); // Lưu kết quả khám (có thể là mảng rỗng)
      } else {
        setMedicalRecord(null);
        setResults([]);
        setError("Không tìm thấy hồ sơ y tế cho bệnh nhân này.");
      }
    } catch (error) {
      console.error("Lỗi khi tải hồ sơ y tế:", error);
      setMedicalRecord(null);
      setResults([]);
      setError("Lỗi khi tải hồ sơ y tế: " + (error.response?.data?.message || error.message));
    }
  };

  // Xử lý xem kết quả khám
  const handleShowExamResult = async (appointment) => {
    setSelectedAppointment(appointment);
    setShowResultViewModal(true);
  
    const token = getAuthToken();
    if (!token) {
      setError("Vui lòng đăng nhập để tiếp tục.");
      navigate("/login");
      return;
    }
  
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/doctor/exam-results/by-booking/${appointment.id}`, // Assuming an endpoint like this exists
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedAppointment((prev) => ({
        ...prev,
        examResult: response.data.data, // Assuming the response contains the result
      }));
    } catch (error) {
      console.error("Lỗi khi tải kết quả khám:", error);
      setError("Lỗi khi tải kết quả khám: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container mt-5 table-responsive">
      {/* Bộ lọc trạng thái và ngày */}
      <Form className="d-flex align-items-center mb-4">
        <div className="me-3">
          <DatePicker
            selected={date}
            onChange={(newDate) => setDate(newDate)}
            className="form-control"
            dateFormat="dd/MM/yyyy"
            placeholderText="Chọn ngày"
          />
        </div>
        <div className="me-3">
          <Form.Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
          </Form.Select>
        </div>
        <Button variant="primary" onClick={() => {}}>
          Tìm kiếm
        </Button>
      </Form>

      {/* Danh sách chờ duyệt */}
      <div className="card p-4 mb-4">
        <h5 className="mb-3 text-primary">Danh sách chờ duyệt</h5>
        {loading ? (
          <Spinner animation="border" />
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : filteredPendingAppointments.length === 0 ? (
          <p className="text-muted">Không có cuộc hẹn nào đang chờ xác nhận.</p>
        ) : (
          <Table striped bordered hover className="table-sm">
            <thead>
              <tr>
                <th>Thời gian</th>
                <th>Ngày</th>
                <th>Nguồn đặt</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredPendingAppointments.map((app, index) => (
                <tr key={index}>
                  <td>{app.booking_time}</td>
                  <td>{app.booking_date}</td>
                  <td>{app.guest?.guest_name || "Không có tên"}</td>
                  <td>
                    <span className="badge bg-warning">Pending</span>
                  </td>
                  <td>
                    <Button
                      variant="info"
                      className="me-2"
                      onClick={() => handleShowDetail(app)}
                    >
                      Detail
                    </Button>
                    <Button
                      variant="success"
                      className="me-2"
                      onClick={() => handleAcceptAppointment(app)}
                    >
                      Nhận Bệnh
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteAppointment(app)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>

      {/* Danh sách đã nhận */}
      {statusFilter === "confirmed" && (
        <div className="card p-4 mb-4">
          <h5 className="mb-3 text-primary">Danh sách đã nhận</h5>
          {loading ? (
            <Spinner animation="border" />
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : filteredConfirmedAppointments.length === 0 ? (
            <p className="text-muted">Không có cuộc hẹn nào đã nhận.</p>
          ) : (
            <Table striped bordered hover className="table-sm">
              <thead>
                <tr>
                  <th>Thời gian</th>
                  <th>Ngày</th>
                  <th>Nguồn đặt</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredConfirmedAppointments.map((app, index) => (
                  <tr key={index}>
                    <td>{app.booking_time}</td>
                    <td>{app.booking_date}</td>
                    <td>{app.guest?.guest_name || "Không có tên"}</td>
                    <td>
                      <span className="badge bg-success">Confirmed</span>
                    </td>
                    <td>
                      <Button
                        variant="info"
                        className="me-2"
                        onClick={() => handleShowDetail(app)}
                      >
                        Detail
                      </Button>
                      <Button
                        variant="primary"
                        className="me-2"
                        onClick={() => handleShowMedicalRecord(app)}
                      >
                        Xem Hồ Sơ Bệnh Án
                      </Button>
                      <Button
                        variant="success"
                        className="me-2"
                        onClick={() => handleCompleteAppointment(app)}
                      >
                        Hoàn Thành
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteAppointment(app)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      )}

      {/* Danh sách đã khám xong */}
      {statusFilter === "completed" && (
        <div className="card p-4">
          <h5 className="mb-3 text-primary">Danh sách đã khám xong</h5>
          {loading ? (
            <Spinner animation="border" />
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : filteredCompletedAppointments.length === 0 ? (
            <p className="text-muted">Không có cuộc hẹn nào đã khám xong.</p>
          ) : (
            <Table striped bordered hover className="table-sm">
              <thead>
                <tr>
                  <th>Thời gian</th>
                  <th>Ngày</th>
                  <th>Nguồn đặt</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompletedAppointments.map((app, index) => (
                  <tr key={index}>
                    <td>{app.booking_time}</td>
                    <td>{app.booking_date}</td>
                    <td>{app.guest?.guest_name || "Không có tên"}</td>
                    <td>
                      <span className="badge bg-info">Completed</span>
                    </td>
                    <td>
                      <Button
                        variant="info"
                        className="me-2"
                        onClick={() => handleShowDetail(app)}
                      >
                        Detail
                      </Button>
                      <Button
                        variant="primary"
                        className="me-2"
                        onClick={() => handleShowMedicalRecord(app)}
                      >
                        Xem Hồ Sơ Bệnh Án
                      </Button>
                      <Button
                        variant="secondary"
                        className="me-2"
                        onClick={() => handleShowExamResult(app)}
                      >
                        Xem Kết Quả Khám
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteAppointment(app)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      )}

      {/* Modal Chi Tiết */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Patient Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <Form>
              <div className="grid grid-cols-2 gap-4">
                <Form.Group>
                  <Form.Label>Giới tính:</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedAppointment?.guest?.gender ?? "Không có dữ liệu"}
                    readOnly
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Tên dịch vụ:</Form.Label>
                  <Form.Control
                    type="text"
                    value={
                      selectedAppointment.service?.services_name || "Không có dữ liệu"
                    }
                    readOnly
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Tên khách hàng:</Form.Label>
                  <Form.Control
                    type="text"
                    value={
                      selectedAppointment.guest?.guest_name || "Không có dữ liệu"
                    }
                    readOnly
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Số điện thoại:</Form.Label>
                  <Form.Control
                    type="text"
                    value={
                      selectedAppointment.guest?.guest_phone || "Không có dữ liệu"
                    }
                    readOnly
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={
                      selectedAppointment.guest?.guest_email || "Không có dữ liệu"
                    }
                    readOnly
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Địa chỉ:</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedAppointment.guest?.address || "Không có dữ liệu"}
                    readOnly
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Ngày đặt:</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedAppointment.booking_date}
                    readOnly
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Thời gian:</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedAppointment.booking_time}
                    readOnly
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Trạng thái:</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedAppointment.status}
                    readOnly
                  />
                </Form.Group>
                <Form.Group className="col-span-2">
                  <Form.Label>Lý do:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={selectedAppointment.reason || "Không có lý do"}
                    readOnly
                  />
                </Form.Group>
                <Form.Group className="col-span-2">
                  <Form.Label>Ghi chú:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={selectedAppointment?.notes ?? "Không có ghi chú"}
                    readOnly
                  />
                </Form.Group>
              </div>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Xác Nhận Nhận Bệnh */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận nhận bệnh</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn nhận bệnh nhân {selectedAppointment?.guest?.guest_name} không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Hủy
          </Button>
          <Button variant="success" onClick={handleConfirmAccept}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Hoàn Thành Cuộc Hẹn và Điền Kết Quả Khám */}
      <Modal show={showCompleteModal} onHide={() => setShowCompleteModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Điền kết quả khám</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Chẩn đoán:</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          placeholder="Nhập chẩn đoán..."
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Ghi chú:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Nhập ghi chú (nếu có)..."
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Tệp đính kèm (nếu có):</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowCompleteModal(false)}>
      Hủy
    </Button>
    <Button variant="success" onClick={handleConfirmComplete} disabled={loading}>
      {loading ? <Spinner animation="border" size="sm" /> : "Xác nhận hoàn thành"}
    </Button>
  </Modal.Footer>
</Modal>

      {/* Modal Xem Hồ Sơ Bệnh Án */}
      <Modal show={showMedicalRecordModal} onHide={() => setShowMedicalRecordModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Hồ Sơ Bệnh Án</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
          {error && <p className="text-danger">{error}</p>}
          {medicalRecord ? (
            <div className="mb-4 p-3 border rounded">
              <h6 className="text-primary">Hồ Sơ Bệnh Án (Cập nhật: {medicalRecord.updated_at})</h6>
              <Form>
                <div className="grid grid-cols-2 gap-4">
                  <Form.Group>
                    <Form.Label>BHYT:</Form.Label>
                    <Form.Control
                      type="text"
                      value={medicalRecord.BHYT || "Không có dữ liệu"}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Tình trạng y tế:</Form.Label>
                    <Form.Control
                      type="text"
                      value={medicalRecord.medical_condition || "Không có dữ liệu"}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Thuốc:</Form.Label>
                    <Form.Control
                      type="text"
                      value={medicalRecord.medications || "Không có dữ liệu"}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Dị ứng:</Form.Label>
                    <Form.Control
                      type="text"
                      value={medicalRecord.allergies || "Không có dữ liệu"}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Tiền sử gia đình:</Form.Label>
                    <Form.Control
                      type="text"
                      value={medicalRecord.family_history || "Không có dữ liệu"}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Phương pháp điều trị:</Form.Label>
                    <Form.Control
                      type="text"
                      value={medicalRecord.treatment || "Không có dữ liệu"}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group className="col-span-2">
                    <Form.Label>Ghi chú y tế:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={medicalRecord.note || "Không có ghi chú"}
                      readOnly
                    />
                  </Form.Group>
                </div>
              </Form>
            </div>
          ) : (
            <p className="text-muted">Đang tải hồ sơ...</p>
          )}

          {/* Hiển thị kết quả khám (nếu có) */}
          {results.length > 0 && (
            <div className="mt-4">
              <h6 className="text-primary">Kết Quả Khám</h6>
              {results.map((result, index) => (
                <div key={index} className="mb-4 p-3 border rounded">
                  <h6 className="text-info">Kết quả #{index + 1} (Ngày: {result.updated_at})</h6>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Chẩn đoán:</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={result.diagnosis || "Không có dữ liệu"}
                        readOnly
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Phương pháp điều trị:</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={result.treatment || "Không có dữ liệu"}
                        readOnly
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Ghi chú:</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={result.notes || "Không có ghi chú"}
                        readOnly
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Bác sĩ:</Form.Label>
                      <Form.Control
                        type="text"
                        value={result.doctor?.doctor_name || "Không xác định"}
                        readOnly
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Dịch vụ:</Form.Label>
                      <Form.Control
                        type="text"
                        value={result.booking?.service?.services_name || "Không xác định"}
                        readOnly
                      />
                    </Form.Group>
                  </Form>
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMedicalRecordModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Xem Kết Quả Khám */}
      <Modal show={showResultViewModal} onHide={() => setShowResultViewModal(false)} size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Kết Quả Khám</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedAppointment && selectedAppointment.examResult ? (
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Chẩn đoán:</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={selectedAppointment.examResult.diagnosis || "Không có dữ liệu"}
            readOnly
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ghi chú:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={selectedAppointment.examResult.note || "Không có ghi chú"}
            readOnly
          />
        </Form.Group>
        {selectedAppointment.examResult.file && (
          <Form.Group className="mb-3">
            <Form.Label>Tệp đính kèm:</Form.Label>
            <a
              href={`http://127.0.0.1:8000/storage/${selectedAppointment.examResult.file}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Xem tệp
            </a>
          </Form.Group>
        )}
      </Form>
    ) : (
      <p className="text-muted">Chưa có kết quả khám cho cuộc hẹn này.</p>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowResultViewModal(false)}>
      Đóng
    </Button>
  </Modal.Footer>
</Modal>
    </div>
  );
};

export default Appointment;