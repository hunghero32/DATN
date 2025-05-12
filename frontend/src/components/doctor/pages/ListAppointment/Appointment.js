import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppointmentFilter from "./AppointmentFilter";
import AppointmentList from "./AppointmentList";
import AppointmentDetailModal from "./AppointmentDetailModal";
import ConfirmModal from "./ConfirmModal";
import MedicalRecordModal from "./MedicalRecordModal";
import ExamResultModal from "./ExamResultModal";
import { Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import NotificationService from "../../../../services/NotificationService";

const getAuthToken = () => localStorage.getItem("authToken");

const Appointment = () => {
  const [date, setDate] = useState(null);
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
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const [prescription, setPrescription] = useState("");
  const [file, setFile] = useState(null); // File state and setter
  const [medicalForm, setMedicalForm] = useState({
    BHYT: "",
    medical_condition: "",
    medications: "",
    allergies: "",
    family_history: "",
    treatment: "",
    note: "",
  });
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [highlightedBookingId, setHighlightedBookingId] = useState(null);
  const [searchMatchIds, setSearchMatchIds] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, [navigate]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get("search") || "";
    const bookingIdParam = params.get("bookingId");
    const newHighlightId = bookingIdParam ? parseInt(bookingIdParam, 10) : null;

    if (searchParam !== searchQuery) {
      setSearchQuery(searchParam);
    }

    if (newHighlightId !== highlightedBookingId) {
      setHighlightedBookingId(newHighlightId);
    } else if (bookingIdParam === null && highlightedBookingId !== null) {
      console.log("[Effect 2] Clearing highlight ID as bookingId param is null");
    }
  }, [location.search, navigate, searchQuery, highlightedBookingId]);

  useEffect(() => {
    if (highlightedBookingId !== null && appointments.length > 0) {
      const appointmentToHighlight = appointments.find((app) => app.id === highlightedBookingId);
      if (appointmentToHighlight && appointmentToHighlight.status !== statusFilter) {
        console.log(`[Effect 3] Switching tab based on notification highlight to: ${appointmentToHighlight.status}`);
        setStatusFilter(appointmentToHighlight.status);
      }
    }
  }, [highlightedBookingId, appointments]);

  useEffect(() => {
    console.log("[Effect 4] Running. searchQuery:", searchQuery, "Appointments count:", appointments.length);
    if (appointments.length > 0) {
      if (searchQuery) {
        const lowerSearchQuery = searchQuery.toLowerCase();
        const matchingAppointments = appointments.filter((app) =>
          app.guest?.guest_name?.toLowerCase().includes(lowerSearchQuery)
        );
        const matchingIds = new Set(matchingAppointments.map((app) => app.id));

        if (
          !searchMatchIds ||
          ![...matchingIds].every((id) => searchMatchIds.has(id)) ||
          matchingIds.size !== searchMatchIds.size
        ) {
          console.log("[Effect 4] Updating searchMatchIds:", matchingIds);
          setSearchMatchIds(matchingIds);

          if (highlightedBookingId === null && matchingAppointments.length > 0) {
            const firstMatchStatus = matchingAppointments[0].status;
            if (firstMatchStatus !== statusFilter) {
              console.log(`[Effect 4] Search found results in status '${firstMatchStatus}'. Switching tab.`);
              setStatusFilter(firstMatchStatus);
            }
          }
        }
      } else {
        if (searchMatchIds !== null) {
          console.log("[Effect 4] Clearing searchMatchIds as searchQuery is empty.");
          setSearchMatchIds(null);
        }
      }
    } else {
      if (searchMatchIds !== null) {
        console.log("[Effect 4] Clearing searchMatchIds because appointments are empty");
        setSearchMatchIds(null);
      }
    }
  }, [searchQuery, appointments, searchMatchIds, statusFilter, highlightedBookingId]);

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    const token = getAuthToken();
    if (!token) {
      setError("Vui lòng đăng nhập để tiếp tục.");
      setLoading(false);
      navigate("/login");
      return;
    }
    try {
      console.log("Fetching appointments...");
      const response = await axios.get("http://127.0.0.1:8000/api/doctor/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Appointments fetched:", response.data);
      const appointmentsData = Array.isArray(response.data) ? response.data : response.data.data || [];
      setAppointments(appointmentsData);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      const errorMessage = error.response?.data?.message || "Lỗi khi tải dữ liệu cuộc hẹn.";
      setError(errorMessage);
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

      await NotificationService.sendNotification(doctorInfo.id, {
        type: "booking_accepted",
        title: "Lịch hẹn được chấp nhận",
        message: `Lịch hẹn với bệnh nhân ${selectedAppointment.guest?.guest_name} đã được chấp nhận`,
        bookingId: selectedAppointment.id,
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
    setError(null); // Clear previous errors

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
      // Only set error and show toast if it's not "No query results for model"
      if (!errorMessage.includes("No query results for model")) {
        setError(errorMessage);
        toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
      }
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

  const handleShowExamResult = async (appointment) => {
    if (!appointment) return;

    setSelectedAppointment(appointment);
    setShowResultViewModal(true);
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
            Accept: "application/json",
            "Cache-Control": "no-cache",
          },
        }
      );

      if (response.data) {
        console.log("Fetched exam result:", response.data);
        setDiagnosis(response.data.diagnosis || "");
        setNotes(response.data.note || "");
        setPrescription(response.data.prescription || "");
        setFile(response.data.file || null);
      } else {
        setDiagnosis("");
        setNotes("");
        setPrescription("");
        setFile(null);
      }
    } catch (error) {
      console.error("Error fetching exam result:", error);
      const errorMessage = error.response?.data?.message || "Lỗi khi tải kết quả khám.";
      setError(errorMessage);
      toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateExamResult = async (formData) => {
    if (!selectedAppointment || !selectedAppointment.id) {
      toast.error("Không tìm thấy thông tin cuộc hẹn.");
      return;
    }

    const token = getAuthToken();
    if (!token) {
      setError("Vui lòng đăng nhập để tiếp tục.");
      navigate("/login");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log("Sending data:", Object.fromEntries(formData));

      const updateResponse = await axios({
        method: "post", // Use POST with _method: PUT
        url: `http://127.0.0.1:8000/api/doctor/results/booking/${selectedAppointment.id}`,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });

      console.log("Update response:", updateResponse.data);

      if (updateResponse.status === 200 && updateResponse.data) {
        const newData = updateResponse.data.data || updateResponse.data; // Adjust based on response structure
        setDiagnosis(newData.diagnosis || "");
        setNotes(newData.note || "");
        setPrescription(newData.prescription || "");
        setFile(newData.file || null); // Use setFile instead of setInitialFile

        toast.success("Cập nhật kết quả khám thành công!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        const getResponse = await axios.get(
          `http://127.0.0.1:8000/api/doctor/results/booking/${selectedAppointment.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (getResponse.data) {
          console.log("Fetched updated data:", getResponse.data);
          const newData = getResponse.data;
          setDiagnosis(newData.diagnosis || "");
          setNotes(newData.note || "");
          setPrescription(newData.prescription || "");
          setFile(newData.file || null); // Use setFile instead of setInitialFile

          toast.success("Cập nhật kết quả khám thành công!", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      }
    } catch (error) {
      console.error("Error updating exam result:", error.response || error);
      const errorMessage =
        error.response?.data?.message || error.message || "Lỗi khi cập nhật kết quả khám.";
      setError(errorMessage);
      toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const filterAppointmentsByDate = (app) => {
    if (!date) return true;

    const appointmentDate = new Date(app.booking_date);
    appointmentDate.setHours(0, 0, 0, 0);

    const filterDate = new Date(date);
    filterDate.setHours(0, 0, 0, 0);

    return appointmentDate.getTime() === filterDate.getTime();
  };

  const getFilteredAppointments = () => {
    console.log(
      "[Filter] Starting. Full list count:",
      appointments.length,
      "Current Tab:",
      statusFilter,
      "Search:",
      searchQuery,
      "Date:",
      date
    );
    let filtered = [...appointments];

    filtered = filtered.filter((app) => app.status === statusFilter);
    console.log(`[Filter] Count after status filter ('${statusFilter}'): ${filtered.length}`);

    if (date) {
      console.log(`[Filter] Filtering by date: ${date}`);
      filtered = filtered.filter(filterAppointmentsByDate);
      console.log(`[Filter] Count after date filter: ${filtered.length}`);
    }

    console.log(
      "[Filter] Final appointmentsToDisplay (only filtered by status & date):",
      filtered.map((a) => ({ id: a.id, name: a.guest?.guest_name }))
    );
    return filtered;
  };

  const appointmentsToDisplay = getFilteredAppointments();

  return (
    <div className="container mt-5 table-responsive">
      <ToastContainer />
      <style>
        {`
          /* General Styling */
          body {
            font-family: 'Inter', sans-serif;
            background-color: #f4f7fc;
          }

          /* Filter Row Styling */
          .filter-row {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
            background-color: #fff;
            padding: 1rem;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          }

          .custom-input, .custom-select {
            width: 220px !important;
            height: 45px !important;
            border: 1px solid #e0e4e8 !important;
            border-radius: 10px !important;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05) !important;
            font-size: 15px !important;
            font-weight: 500 !important;
            transition: all 0.3s ease !important;
            background-color: #fff !important;
            padding: 0 15px !important;
            margin: 0 !important;
            line-height: 45px !important;
            color: #333;
            appearance: none; /* Remove default select arrow */
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 15px center;
            background-size: 16px;
          }

          .custom-input:hover, .custom-select:hover {
            border-color: #3b82f6 !important;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1) !important;
          }

          .custom-input:focus, .custom-select:focus {
            border-color: #3b82f6 !important;
            box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25) !important;
            outline: none !important;
          }

          .custom-input-group {
            width: 220px !important;
            position: relative;
          }

          .custom-input-group .form-control {
            width: 100 !important;
            padding-left: 40px !important;
            height: 45px !important;
            border: 1px solid #e0e4e8 !important;
            border-radius: 10px !important;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05) !important;
            font-size: 15px !important;
            font-weight: 500 !important;
            transition: all 0.3s ease !important;
            background-color: #fff !important;
            margin: 0 !important;
            line-height: 45px !important;
            color: #333;
          }

          .custom-input-group .form-control:hover {
            border-color: #3b82f6 !important;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1) !important;
          }

          .custom-input-group .form-control:focus {
            border-color: #3b82f6 !important;
            box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25) !important;
            outline: none !important;
          }

          .custom-input-group .input-icon {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #6b7280;
            z-index: 10;
          }

          .custom-input::placeholder {
            color: #9ca3af;
            font-weight: 400;
          }
        `}
      </style>
      <div className="filter-row">
        <AppointmentFilter date={date} setDate={setDate} />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="custom-select"
        >
          <option value="pending">Chờ xử lý</option>
          <option value="confirmed">Đã xác nhận</option>
          <option value="completed">Hoàn thành</option>
        </select>
        <div className="custom-input-group">
          <FaSearch className="input-icon" />
          <Form.Control
            type="text"
            placeholder="Tìm kiếm theo tên khách..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <AppointmentList
        appointmentsToDisplay={appointmentsToDisplay}
        statusFilter={statusFilter}
        loading={loading}
        error={error}
        handleShowDetail={handleShowDetail}
        handleCompleteAppointment={handleCompleteAppointment}
        handleShowMedicalRecord={handleShowMedicalRecord}
        handleShowExamResult={handleShowExamResult}
        handleTransferAppointment={handleTransferAppointment}
        highlightedBookingId={highlightedBookingId}
        searchMatchIds={searchMatchIds}
      />
      <AppointmentDetailModal
        show={showModal}
        onHide={() => setShowModal(false)}
        selectedAppointment={selectedAppointment}
        handleReacceptAppointment={handleReacceptAppointment}
        handleDeleteAppointment={handleDeleteAppointment}
        handleTransferAppointment={handleTransferAppointment}
        handleCompleteAppointment={handleCompleteAppointment}
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
        prescription={prescription}
        setPrescription={setPrescription}
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