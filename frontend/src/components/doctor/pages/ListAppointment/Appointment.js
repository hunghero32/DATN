import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppointmentFilter from "./AppointmentFilter";
import AppointmentList from "./AppointmentList";
import AppointmentDetailModal from "./AppointmentDetailModal";
import ConfirmModal from "./ConfirmModal";
import MedicalRecordModal from "./MedicalRecordModal";
import ExamResultModal from "./ExamResultModal";
import { Form, InputGroup } from "react-bootstrap";

const getAuthToken = () => localStorage.getItem("authToken");

const Appointment = () => {
  const [date, setDate] = useState(new Date());
  const [statusFilter, setStatusFilter] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [resultId, setResultId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showReacceptModal, setShowReacceptModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
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

      let appointmentsData = response.data.data || [];
      setAppointments(appointmentsData);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Lỗi khi tải dữ liệu cuộc hẹn.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptAppointment = (appointment) => {
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

  const handleTransferAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowTransferModal(true);
  };

  const handleConfirmTransfer = async () => {
    if (!selectedAppointment?.id) {
      toast.error("Cuộc hẹn không hợp lệ.", { position: "top-right", autoClose: 3000 });
      setShowTransferModal(false);
      return;
    }

    const token = getAuthToken();
    if (!token) {
      setError("Vui lòng đăng nhập để tiếp tục.");
      navigate("/login");
      setShowTransferModal(false);
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

      toast.success(`${selectedAppointment.guest?.guest_name} đã được chuyển bệnh thành công!`, {
        position: "top-right",
        autoClose: 3000,
      });
      setShowModal(false);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Lỗi khi chuyển bệnh.";
      toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
      setError(errorMessage);
    } finally {
      setLoading(false);
      setShowTransferModal(false);
    }
  };

  const handleReacceptAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowReacceptModal(true);
  };

  const handleConfirmReaccept = async () => {
    if (!selectedAppointment?.id) {
      toast.error("Cuộc hẹn không hợp lệ.", { position: "top-right", autoClose: 3000 });
      setShowReacceptModal(false);
      return;
    }

    const token = getAuthToken();
    if (!token) {
      setError("Vui lòng đăng nhập để tiếp tục.");
      navigate("/login");
      setShowReacceptModal(false);
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

      toast.success(`${selectedAppointment.guest?.guest_name} đã được nhận lại thành công!`, {
        position: "top-right",
        autoClose: 3000,
      });
      setShowModal(false);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Lỗi khi nhận lại bệnh nhân.";
      toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
      setError(errorMessage);
    } finally {
      setLoading(false);
      setShowReacceptModal(false);
    }
  };

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

      toast.success(`Cuộc hẹn của ${selectedAppointment.guest?.guest_name} đã hoàn thành!`, {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Lỗi khi hoàn thành cuộc hẹn.";
      setError(errorMessage);
      toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
    } finally {
      setLoading(false);
      setShowCompleteModal(false);
      setDiagnosis("");
      setNotes("");
      setFile(null);
    }
  };

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
        setShowModal(false);
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Lỗi khi xóa cuộc hẹn.";
        toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleShowDetail = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

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
      const endpoint = medicalRecord
        ? `http://127.0.0.1:8000/api/doctor/medical-records/${medicalRecord.id}`
        : `http://127.0.0.1:8000/api/doctor/medical-records`;
      const method = medicalRecord ? "put" : "post";

      const response = await axios({
        method,
        url: endpoint,
        data: {
          guest_id: selectedAppointment.guest_id,
          ...medicalForm,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(response.data.message || "Lưu hồ sơ bệnh án thành công!", {
        position: "top-right",
        autoClose: 3000,
      });

      handleShowMedicalRecord(selectedAppointment);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Lỗi khi lưu hồ sơ bệnh án.";
      setError(errorMessage);
      toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const handleShowExamResult = async (appointment) => {
    setSelectedAppointment(appointment);
    setShowResultViewModal(true);
    setDiagnosis("");
    setNotes("");
    setResultId(null);
    setFile(null);
    setLoading(true);
    setError(null);

    const token = getAuthToken();
    if (!token) {
      setError("Vui lòng đăng nhập để tiếp tục.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/doctor/results/booking/${appointment.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
          },
        }
      );

      const result = response.data;
      console.log("Dữ liệu từ API GET:", result);

      if (result && !result.message) {
        setDiagnosis(result.diagnosis || "");
        setNotes(result.note || "");
        setFile(result.file || null);
        setResultId(result.id || null);
      } else {
        setError(result.message || "Không tìm thấy kết quả khám.");
        setDiagnosis("");
        setNotes("");
        setFile(null);
        setResultId(null);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Lỗi khi tải kết quả khám.";
      setError(errorMessage);
      toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
      setDiagnosis("");
      setNotes("");
      setFile(null);
      setResultId(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateExamResult = async () => {
    if (!selectedAppointment) return;

    const token = getAuthToken();
    if (!token) {
      setError("Vui lòng đăng nhập để tiếp tục.");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("diagnosis", diagnosis || "");
      formData.append("note", notes || "");
      if (file && file instanceof File) {
        formData.append("file", file);
      }

      const response = await axios.put(
        `http://127.0.0.1:8000/api/doctor/results/booking/${selectedAppointment.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Dữ liệu từ API PUT:", response.data);

      // Lấy dữ liệu từ response của API PUT
      const updatedResult = response.data.data;

      // Cập nhật state trực tiếp từ response của API PUT
      if (updatedResult) {
        setDiagnosis(updatedResult.diagnosis || "");
        setNotes(updatedResult.note || "");
        setFile(updatedResult.file || null);
        setResultId(updatedResult.id || null);
      }

      toast.success(
        response.data.message ||
        `Lưu kết quả khám thành công cho bệnh nhân ${selectedAppointment.guest?.guest_name || 'N/A'} (Booking ID: ${selectedAppointment.id}).`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );

      // Đóng modal chỉnh sửa và mở lại modal xem
      setShowEditResultModal(false);
      setShowResultViewModal(true);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Lỗi khi lưu kết quả khám.";
      setError(errorMessage);
      toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = {
    pending: appointments
      .filter((app) => app.status === "pending")
      .filter((app) =>
        app.guest?.guest_name?.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    confirmed: appointments
      .filter((app) => app.status === "confirmed")
      .filter((app) =>
        app.guest?.guest_name?.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    completed: appointments
      .filter((app) => app.status === "completed")
      .filter((app) =>
        app.guest?.guest_name?.toLowerCase().includes(searchQuery.toLowerCase())
      ),
  };

  return (
    <div className="container mt-5 table-responsive">
      <ToastContainer />
      <div className="mb-4">
        <InputGroup>
          <InputGroup.Text>
            <i className="bi bi-search"></i>
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Tìm kiếm theo tên khách hàng..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
      </div>
      <AppointmentFilter date={date} setDate={setDate} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
      <AppointmentList
        filteredAppointments={filteredAppointments}
        statusFilter={statusFilter}
        loading={loading}
        error={error}
        handleShowDetail={handleShowDetail}
        handleCompleteAppointment={handleCompleteAppointment}
        handleShowMedicalRecord={handleShowMedicalRecord}
        handleShowExamResult={handleShowExamResult}
        handleTransferAppointment={handleTransferAppointment}
      />
      <AppointmentDetailModal
        show={showModal}
        onHide={() => setShowModal(false)}
        selectedAppointment={selectedAppointment}
        handleReacceptAppointment={handleReacceptAppointment}
        handleDeleteAppointment={handleDeleteAppointment}
        handleTransferAppointment={handleTransferAppointment}
      />
      <ConfirmModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        title="Xác nhận nhận bệnh"
        message={`Bạn có chắc chắn muốn nhận bệnh nhân ${selectedAppointment?.guest?.guest_name}?`}
        onConfirm={handleConfirmAccept}
        loading={loading}
      />
      <ConfirmModal
        show={showReacceptModal}
        onHide={() => setShowReacceptModal(false)}
        title="Xác nhận nhận lại bệnh nhân"
        message={`Bạn có chắc chắn muốn nhận lại bệnh nhân ${selectedAppointment?.guest?.guest_name}?`}
        onConfirm={handleConfirmReaccept}
        loading={loading}
      />
      <ConfirmModal
        show={showTransferModal}
        onHide={() => setShowTransferModal(false)}
        title="Xác nhận chuyển bệnh"
        message={`Bạn có chắc chắn muốn chuyển bệnh cho bệnh nhân ${selectedAppointment?.guest?.guest_name}?`}
        onConfirm={handleConfirmTransfer}
        loading={loading}
      />
      <ConfirmModal
        show={showCompleteModal}
        onHide={() => setShowCompleteModal(false)}
        title="Xác nhận hoàn thành"
        message="Bạn có chắc chắn muốn hoàn thành cuộc hẹn này?"
        onConfirm={handleConfirmComplete}
        loading={loading}
      />
      <MedicalRecordModal
        show={showMedicalRecordModal}
        onHide={() => setShowMedicalRecordModal(false)}
        showForm={showMedicalRecordFormModal}
        setShowForm={setShowMedicalRecordFormModal}
        medicalRecord={medicalRecord}
        results={results}
        error={error}
        medicalForm={medicalForm}
        setMedicalForm={setMedicalForm}
        handleSaveMedicalRecord={handleSaveMedicalRecord}
        loading={loading}
      />
      <ExamResultModal
        showView={showResultViewModal}
        showEdit={showEditResultModal}
        onHideView={() => setShowResultViewModal(false)}
        onHideEdit={() => setShowEditResultModal(false)}
        setShowEditResultModal={setShowEditResultModal}
        selectedAppointment={selectedAppointment}
        diagnosis={diagnosis}
        setDiagnosis={setDiagnosis}
        notes={notes}
        setNotes={setNotes}
        file={file}
        setFile={setFile}
        handleUpdateExamResult={handleUpdateExamResult}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Appointment;