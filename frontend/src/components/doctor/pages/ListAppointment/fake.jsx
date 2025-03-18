import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Button, Table, Form, Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Hàm lấy token từ localStorage
const getAuthToken = () => localStorage.getItem("authToken");

const Appointment = () => {
  const [date, setDate] = useState(new Date());
  const [statusFilter, setStatusFilter] = useState("pending");
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditResultModal, setShowEditResultModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showMedicalRecordModal, setShowMedicalRecordModal] = useState(false);
  const [showResultViewModal, setShowResultViewModal] = useState(false);
  const [showMedicalRecordFormModal, setShowMedicalRecordFormModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [medicalRecord, setMedicalRecord] = useState(null);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState(null);

  // State cho form điền hồ sơ bệnh án
  const [medicalForm, setMedicalForm] = useState({
    BHYT: "",
    medical_condition: "",
    medications: "",
    allergies: "",
    family_history: "",
    treatment: "",
    note: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, [navigate]);

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
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(response.data.data || []);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Lỗi khi tải dữ liệu cuộc hẹn.";
      setError(errorMessage);
      toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  // Lọc danh sách theo trạng thái
  const filteredAppointments = {
    pending: appointments.filter((app) => app.status === "pending"),
    confirmed: appointments.filter((app) => app.status === "confirmed"),
    completed: appointments.filter((app) => app.status === "completed"),
  };

  // Xử lý xác nhận nhận bệnh
  const handleAcceptAppointment = (appointment) => {
    if (!appointment?.id) {
      toast.error("Cuộc hẹn không hợp lệ.", { position: "top-right", autoClose: 3000 });
      return;
    }
    setSelectedAppointment(appointment);
    setShowConfirmModal(true);
  };

  const handleConfirmAccept = async () => {
    if (!selectedAppointment?.id) {
      toast.error("Cuộc hẹn không hợp lệ.", { position: "top-right", autoClose: 3000 });
      setShowConfirmModal(false);
      return;
    }

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
        { status: "confirmed" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAppointments((prev) =>
        prev.map((app) =>
          app.id === selectedAppointment.id ? { ...app, ...response.data.data, status: "confirmed" } : app
        )
      );

      toast.success(`${selectedAppointment.guest?.guest_name} đã được nhận thành công!`, {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Lỗi khi cập nhật trạng thái.";
      toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
      setError(errorMessage);
    } finally {
      setLoading(false);
      setShowConfirmModal(false);
    }
  };

  // Xử lý hoàn thành cuộc hẹn
  const handleCompleteAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setDiagnosis("");
    setNotes("");
    setFile(null);
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
      await axios.put(
        `http://127.0.0.1:8000/api/doctor/bookings/${selectedAppointment.id}`,
        { status: "completed" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAppointments((prev) =>
        prev.map((app) =>
          app.id === selectedAppointment.id ? { ...app, status: "completed" } : app
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
    if (!appointment?.id) {
      toast.error("Cuộc hẹn không hợp lệ.", { position: "top-right", autoClose: 3000 });
      return;
    }

    const token = getAuthToken();
    if (!token) {
      setError("Vui lòng đăng nhập để tiếp tục.");
      navigate("/login");
      return;
    }

    if (window.confirm(`Bạn có chắc chắn muốn xóa cuộc hẹn của ${appointment.guest?.guest_name}?`)) {
      setLoading(true);
      try {
        await axios.delete(`http://127.0.0.1:8000/api/doctor/bookings/${appointment.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAppointments((prev) => prev.filter((app) => app.id !== appointment.id));
        toast.success("Cuộc hẹn đã được xóa thành công.", {
          position: "top-right",
          autoClose: 3000,
        });
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Lỗi khi xóa cuộc hẹn.";
        toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
      } finally {
        setLoading(false);
      }
    }
  };

  // Xử lý xem chi tiết
  const handleShowDetail = (appointment) => {
    if (!appointment?.id) {
      toast.error("Cuộc hẹn không hợp lệ.", { position: "top-right", autoClose: 3000 });
      return;
    }
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  // Xử lý xem hồ sơ bệnh án
  const handleShowMedicalRecord = async (appointment) => {
    if (!appointment?.guest_id) {
      toast.error("Không tìm thấy thông tin bệnh nhân.", { position: "top-right", autoClose: 3000 });
      return;
    }
    setSelectedAppointment(appointment);
    setShowMedicalRecordModal(true);
    setMedicalRecord(null);
    setResults([]);

    const token = getAuthToken();
    if (!token) {
      setError("Vui lòng đăng nhập để tiếp tục.");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/doctor/medical-records/${appointment.guest_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = response.data;
      if (data.medical_record) {
        setMedicalRecord(data.medical_record);
        setResults(data.results || []);
        // Nếu đã có hồ sơ, điền dữ liệu vào form để chỉnh sửa
        setMedicalForm({
          BHYT: data.medical_record.BHYT || "",
          medical_condition: data.medical_record.medical_condition || "",
          medications: data.medical_record.medications || "",
          allergies: data.medical_record.allergies || "",
          family_history: data.medical_record.family_history || "",
          treatment: data.medical_record.treatment || "",
          note: data.medical_record.note || "",
        });
      } else {
        setMedicalRecord(null);
        setResults([]);
        setError("Không tìm thấy hồ sơ y tế cho bệnh nhân này.");
        // Reset form nếu không có hồ sơ
        setMedicalForm({
          BHYT: "",
          medical_condition: "",
          medications: "",
          allergies: "",
          family_history: "",
          treatment: "",
          note: "",
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Lỗi khi tải hồ sơ y tế.";
      setError(errorMessage);
      toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  // Xử lý lưu hồ sơ bệnh án
  const handleSaveMedicalRecord = async () => {
    if (!selectedAppointment?.guest_id) {
      toast.error("Không tìm thấy thông tin bệnh nhân.", { position: "top-right", autoClose: 3000 });
      return;
    }

    const token = getAuthToken();
    if (!token) {
      setError("Vui lòng đăng nhập để tiếp tục.");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/doctor/medical-records`,
        {
          guest_id: selectedAppointment.guest_id,
          ...medicalForm,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Lưu hồ sơ bệnh án thành công!", { position: "top-right", autoClose: 3000 });

      // Refresh lại hồ sơ bệnh án sau khi lưu
      setShowMedicalRecordFormModal(false);
      handleShowMedicalRecord(selectedAppointment);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Lỗi khi lưu hồ sơ bệnh án.";
      setError(errorMessage);
      toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  // Xử lý xem kết quả khám
  const handleShowExamResult = async (appointment) => {
    if (!appointment?.id) {
      toast.error("Cuộc hẹn không hợp lệ.", { position: "top-right", autoClose: 3000 });
      return;
    }

    setLoading(true);
    try {
      const token = getAuthToken();
      if (!token) {
        setError("Vui lòng đăng nhập để tiếp tục.");
        navigate("/login");
        return;
      }

      const response = await axios.get(
        `http://127.0.0.1:8000/api/doctor/results/booking/${appointment.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("API Response:", response.data);

      setSelectedAppointment({ ...appointment, examResult: response.data });
      setShowResultViewModal(true);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Lỗi khi tải kết quả khám.";
      setError(errorMessage);
      toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateExamResult = async () => {
    if (!selectedAppointment?.id) {
      toast.error("Cuộc hẹn không hợp lệ.", { position: "top-right", autoClose: 3000 });
      return;
    }

    const token = getAuthToken();
    if (!token) {
      setError("Vui lòng đăng nhập để tiếp tục.");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("diagnosis", diagnosis);
      formData.append("note", notes);
      if (file) {
        formData.append("file", file);
      }

      await axios.put(
        `http://127.0.0.1:8000/api/doctor/results/booking/${selectedAppointment.id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
      );

      toast.success("Cập nhật kết quả khám thành công!", { position: "top-right", autoClose: 3000 });

      setShowEditResultModal(false);
      handleShowExamResult(selectedAppointment);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Lỗi khi cập nhật kết quả.";
      setError(errorMessage);
      toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 table-responsive">
      <ToastContainer />
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
          <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
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
        ) : filteredAppointments.pending.length === 0 ? (
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
              {filteredAppointments.pending.map((app, index) => (
                <tr key={index}>
                  <td>{app.booking_time}</td>
                  <td>{app.booking_date}</td>
                  <td>{app.guest?.guest_name || "Không có tên"}</td>
                  <td>
                    <span className="badge bg-warning">Pending</span>
                  </td>
                  <td>
                    <Button variant="info" className="me-2" onClick={() => handleShowDetail(app)}>
                      Detail
                    </Button>
                    <Button
                      variant="success"
                      className="me-2"
                      onClick={() => handleAcceptAppointment(app)}
                    >
                      Nhận Bệnh
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteAppointment(app)}>
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
          ) : filteredAppointments.confirmed.length === 0 ? (
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
                {filteredAppointments.confirmed.map((app, index) => (
                  <tr key={index}>
                    <td>{app.booking_time}</td>
                    <td>{app.booking_date}</td>
                    <td>{app.guest?.guest_name || "Không có tên"}</td>
                    <td>
                      <span className="badge bg-success">Confirmed</span>
                    </td>
                    <td>
                      <Button variant="info" className="me-2" onClick={() => handleShowDetail(app)}>
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
                      <Button variant="danger" onClick={() => handleDeleteAppointment(app)}>
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
          ) : filteredAppointments.completed.length === 0 ? (
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
                {filteredAppointments.completed.map((app, index) => (
                  <tr key={index}>
                    <td>{app.booking_time}</td>
                    <td>{app.booking_date}</td>
                    <td>{app.guest?.guest_name || "Không có tên"}</td>
                    <td>
                      <span className="badge bg-info">Completed</span>
                    </td>
                    <td>
                      <Button variant="info" className="me-2" onClick={() => handleShowDetail(app)}>
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
                      <Button variant="danger" onClick={() => handleDeleteAppointment(app)}>
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
          <Modal.Title>Thông tin bệnh nhân</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment ? (
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
                    value={selectedAppointment.service?.services_name || "Không có dữ liệu"}
                    readOnly
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Tên khách hàng:</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedAppointment.guest?.guest_name || "Không có dữ liệu"}
                    readOnly
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Số điện thoại:</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedAppointment.guest?.guest_phone || "Không có dữ liệu"}
                    readOnly
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={selectedAppointment.guest?.guest_email || "Không có dữ liệu"}
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
                  <Form.Control type="text" value={selectedAppointment.booking_date} readOnly />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Thời gian:</Form.Label>
                  <Form.Control type="text" value={selectedAppointment.booking_time} readOnly />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Trạng thái:</Form.Label>
                  <Form.Control type="text" value={selectedAppointment.status} readOnly />
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
          ) : (
            <p className="text-muted">Không có thông tin cuộc hẹn.</p>
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
          {selectedAppointment?.guest?.guest_name ? (
            <p>Bạn có chắc chắn muốn nhận bệnh nhân <strong>{selectedAppointment.guest.guest_name}</strong> không?</p>
          ) : (
            <p>Không tìm thấy thông tin bệnh nhân.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Hủy
          </Button>
          <Button variant="success" onClick={handleConfirmAccept} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Xác nhận"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Hoàn Thành Cuộc Hẹn */}
      <Modal show={showCompleteModal} onHide={() => setShowCompleteModal(false)} centered>
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
                    <Form.Control type="text" value={medicalRecord.BHYT || "Không có dữ liệu"} readOnly />
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
            <p className="text-muted">Chưa có hồ sơ y tế.</p>
          )}
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
          <Button variant="primary" onClick={() => setShowMedicalRecordFormModal(true)}>
            {medicalRecord ? "Chỉnh Sửa Hồ Sơ" : "Điền Hồ Sơ Bệnh Án"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Điền Hồ Sơ Bệnh Án */}
      <Modal show={showMedicalRecordFormModal} onHide={() => setShowMedicalRecordFormModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{medicalRecord ? "Chỉnh Sửa Hồ Sơ Bệnh Án" : "Điền Hồ Sơ Bệnh Án"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="grid grid-cols-2 gap-4">
              <Form.Group>
                <Form.Label>BHYT:</Form.Label>
                <Form.Control
                  type="text"
                  value={medicalForm.BHYT}
                  onChange={(e) => setMedicalForm({ ...medicalForm, BHYT: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tình trạng y tế:</Form.Label>
                <Form.Control
                  type="text"
                  value={medicalForm.medical_condition}
                  onChange={(e) => setMedicalForm({ ...medicalForm, medical_condition: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Thuốc:</Form.Label>
                <Form.Control
                  type="text"
                  value={medicalForm.medications}
                  onChange={(e) => setMedicalForm({ ...medicalForm, medications: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Dị ứng:</Form.Label>
                <Form.Control
                  type="text"
                  value={medicalForm.allergies}
                  onChange={(e) => setMedicalForm({ ...medicalForm, allergies: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tiền sử gia đình:</Form.Label>
                <Form.Control
                  type="text"
                  value={medicalForm.family_history}
                  onChange={(e) => setMedicalForm({ ...medicalForm, family_history: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Phương pháp điều trị:</Form.Label>
                <Form.Control
                  type="text"
                  value={medicalForm.treatment}
                  onChange={(e) => setMedicalForm({ ...medicalForm, treatment: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="col-span-2">
                <Form.Label>Ghi chú y tế:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={medicalForm.note}
                  onChange={(e) => setMedicalForm({ ...medicalForm, note: e.target.value })}
                />
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMedicalRecordFormModal(false)}>
            Hủy
          </Button>
          <Button variant="success" onClick={handleSaveMedicalRecord} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Lưu"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Xem Kết Quả Khám */}
      <Modal show={showResultViewModal} onHide={() => setShowResultViewModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Kết Quả Khám</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <Spinner animation="border" />
          ) : selectedAppointment?.examResult ? (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Chẩn đoán:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={selectedAppointment?.examResult?.diagnosis ?? "Không có dữ liệu"}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Ghi chú:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={selectedAppointment?.examResult?.note ?? "Không có ghi chú"}
                  readOnly
                />
              </Form.Group>
              {selectedAppointment?.examResult?.treatment && (
                <Form.Group className="mb-3">
                  <Form.Label>Phác đồ điều trị:</Form.Label>
                  <Form.Control as="textarea" rows={3} value={selectedAppointment.examResult.treatment} readOnly />
                </Form.Group>
              )}
              {selectedAppointment?.examResult?.prescription && (
                <Form.Group className="mb-3">
                  <Form.Label>Đơn thuốc:</Form.Label>
                  <Form.Control as="textarea" rows={3} value={selectedAppointment.examResult.prescription} readOnly />
                </Form.Group>
              )}
              {selectedAppointment?.examResult?.recommendations && (
                <Form.Group className="mb-3">
                  <Form.Label>Khuyến nghị:</Form.Label>
                  <Form.Control as="textarea" rows={3} value={selectedAppointment.examResult.recommendations} readOnly />
                </Form.Group>
              )}
              {selectedAppointment?.examResult?.file && (
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
          {!selectedAppointment?.examResult?.diagnosis && (
            <Button variant="primary" onClick={() => setShowEditResultModal(true)}>
              Sửa
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Modal Sửa Kết Quả Khám */}
      <Modal show={showEditResultModal} onHide={() => setShowEditResultModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Sửa Kết Quả Khám</Modal.Title>
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
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ghi chú:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tệp đính kèm (nếu có):</Form.Label>
              <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditResultModal(false)}>
            Hủy
          </Button>
          <Button variant="success" onClick={handleUpdateExamResult} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Lưu"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Appointment;