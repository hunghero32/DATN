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
  const [medicalForm, setMedicalForm] = useState({
    BHYT: "",
    medical_condition: "",
    medications: "",
    allergies: "",
    family_history: "",
    treatment: "",
    note: "",
  });
  // State để force update
  const [, forceUpdate] = useState(0);

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

      // Thêm thông báo hoàn thành
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

  // Xử lý hiển thị kết quả khám
  const handleShowExamResult = async (appointment) => {
    setSelectedAppointment(appointment);
    setShowResultViewModal(true);
    setDiagnosis("");
    setNotes("");
    setFile(null);
    setLoading(true);

    const token = getAuthToken();
    if (!token) {
      setError("Vui lòng đăng nhập để tiếp tục.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/doctor/results/booking/${appointment.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const examResult = response.data;
      setSelectedAppointment({ ...appointment, examResult });
    } catch (error) {
      if (error.response?.status === 404) {
        setSelectedAppointment({ ...appointment, examResult: null });
      } else {
        const errorMessage = error.response?.data?.message || "Lỗi khi tải kết quả khám.";
        setError(errorMessage);
        toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
      }
    } finally {
      setLoading(false);
    }
  };

  // Xử lý lưu hoặc cập nhật kết quả khám
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
      formData.append("booking_id", selectedAppointment.id);
      formData.append("diagnosis", diagnosis);
      formData.append("notes", notes);
      if (file) {
        formData.append("file", file);
      }

      console.log("Dữ liệu gửi lên:", {
        booking_id: selectedAppointment.id,
        diagnosis,
        notes,
        file: file ? file.name : null,
      });

      const method = selectedAppointment.examResult ? "put" : "post";
      const endpoint = selectedAppointment.examResult
        ? `http://127.0.0.1:8000/api/doctor/results/${selectedAppointment.examResult.id}`
        : `http://127.0.0.1:8000/api/doctor/results`;

      const response = await axios({
        method,
        url: endpoint,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response từ server:", response.data);

      toast.success(response.data.message || "Lưu kết quả khám thành công!", {
        position: "top-right",
        autoClose: 3000,
      });

      // Cập nhật state với dữ liệu từ response
      const updatedExamResult = response.data.data || {
        id: selectedAppointment.examResult?.id || response.data.data?.id || null,
        booking_id: selectedAppointment.id,
        diagnosis: diagnosis,
        notes: notes,
        file: file ? file.name : selectedAppointment.examResult?.file || response.data.data?.file || null,
      };
      setSelectedAppointment((prev) => ({
        ...prev,
        examResult: updatedExamResult,
      }));
      forceUpdate((n) => n + 1); // Force re-render

      // Không tự động chuyển sang showView, hỏi người dùng
      if (window.confirm("Lưu thành công! Bạn có muốn xem kết quả ngay không?")) {
        setShowEditResultModal(false);
        setShowResultViewModal(true);
      } else {
        // Giữ modal chỉnh sửa mở, reset input
        setDiagnosis("");
        setNotes("");
        setFile(null);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Lỗi khi lưu kết quả khám.";
      setError(errorMessage);
      toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
      console.error("Lỗi chi tiết:", error.response ? error.response.data : error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = {
    pending: appointments.filter((app) => app.status === "pending"),
    confirmed: appointments.filter((app) => app.status === "confirmed"),
    completed: appointments.filter((app) => app.status === "completed"),
  };

  return (
    <div className="container mt-5 table-responsive">
      <ToastContainer />
      <AppointmentFilter date={date} setDate={setDate} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
      <AppointmentList
        filteredAppointments={filteredAppointments}
        statusFilter={statusFilter}
        loading={loading}
        error={error}
        handleShowDetail={handleShowDetail}
        handleAcceptAppointment={handleAcceptAppointment}
        handleCompleteAppointment={handleCompleteAppointment}
        handleDeleteAppointment={handleDeleteAppointment}
        handleShowMedicalRecord={handleShowMedicalRecord}
        handleShowExamResult={handleShowExamResult}
      />
      <AppointmentDetailModal
        show={showModal}
        onHide={() => setShowModal(false)}
        selectedAppointment={selectedAppointment}
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
      />
    </div>
  );
};

export default Appointment;