import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Spinner, Table } from "react-bootstrap";
import { FaFileMedical, FaPrescriptionBottle, FaStickyNote, FaFileUpload, FaEdit, FaTimes, FaPrint, FaBold, FaItalic, FaUnderline, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from "axios";

const ExamResultModal = ({
  showView,
  showEdit,
  onHideView,
  onHideEdit,
  setShowEditResultModal,
  setShowResultViewModal,
  selectedAppointment,
  diagnosis,
  setDiagnosis,
  notes,
  setNotes,
  prescription,
  setPrescription,
  file,
  setFile,
  handleUpdateExamResult,
  handleCompleteAppointment,
  loading,
  error,
}) => {
  const [prescriptionList, setPrescriptionList] = useState([{ medicine: '', quantity: '', note: '', styles: {} }]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [localFile, setLocalFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [doctorInfo, setDoctorInfo] = useState({ name: "Bác sĩ không xác định", address: "Địa chỉ không xác định", phone: "0123 456 789" });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const currentDateTime = new Date("2025-05-15T11:40:00+07:00").toLocaleString("en-GB", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).replace(/(\d+)\/(\d+)\/(\d+), (\d+:\d+)/, "$1/$2/$3 $4");

  const getAuthToken = () => localStorage.getItem("authToken");

  useEffect(() => {
    if (!showEdit) {
      setDiagnosis(diagnosis || "");
      setNotes(notes || "");
      setPrescription(prescription || "");
      setLocalFile(file || null);
      try {
        const parsedPrescription = typeof prescription === 'string' && prescription.trim() ? JSON.parse(prescription) : null;
        setPrescriptionList(Array.isArray(parsedPrescription) ? parsedPrescription : [{ medicine: '', quantity: '', note: '', styles: {} }]);
      } catch (e) {
        setPrescriptionList([{ medicine: '', quantity: '', note: prescription || 'Không cần thuốc', styles: {} }]);
      }
    } else {
      setDiagnosis(diagnosis || "");
      setNotes(notes || "");
      setPrescription(prescription || "");
      setLocalFile(file || null);
      try {
        const parsedPrescription = typeof prescription === 'string' && prescription.trim() ? JSON.parse(prescription) : null;
        setPrescriptionList(Array.isArray(parsedPrescription) ? parsedPrescription : [{ medicine: '', quantity: '', note: '', styles: {} }]);
      } catch (e) {
        setPrescriptionList([{ medicine: '', quantity: '', note: prescription || 'Không cần thuốc', styles: {} }]);
      }
    }

    const determineFileType = (file) => {
      if (!file || typeof file !== 'string') return null;
      const extension = file.split('.').pop().toLowerCase();
      const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'bmp'];
      const videoExtensions = ['mp4', 'webm', 'ogg'];
      const audioExtensions = ['mp3', 'wav', 'ogg'];
      const pdfExtensions = ['pdf'];
      if (imageExtensions.includes(extension)) return 'image';
      if (videoExtensions.includes(extension)) return 'video';
      if (audioExtensions.includes(extension)) return 'audio';
      if (pdfExtensions.includes(extension)) return 'pdf';
      return 'other';
    };

    setFileType(determineFileType(file));

    if (file && typeof file === "string") {
      setPreviewImage(`http://127.0.0.1:8000/storage/${file}`);
    } else {
      setPreviewImage(null);
    }
  }, [showEdit, diagnosis, notes, prescription, file, setDiagnosis, setNotes, setPrescription, setFile]);

  const handlePrescriptionChange = (index, field, value) => {
    const updatedPrescription = [...prescriptionList];
    updatedPrescription[index] = { ...updatedPrescription[index], [field]: value };
    setPrescriptionList(updatedPrescription);
    setPrescription(JSON.stringify(updatedPrescription));
  };

  const addPrescriptionRow = () => {
    setPrescriptionList(prev => [...prev, { medicine: '', quantity: '', note: '', styles: {} }]);
  };

  const removePrescriptionRow = (index) => {
    if (prescriptionList.length > 1) {
      const updatedPrescription = prescriptionList.filter((_, i) => i !== index);
      setPrescriptionList(updatedPrescription);
      setPrescription(JSON.stringify(updatedPrescription));
    }
  };

  const handleRowSelect = (index) => {
    setSelectedRowIndex(index);
  };

  const applyStyleToRow = (styleKey, styleValue) => {
    if (selectedRowIndex === null) return;
    const updatedPrescription = [...prescriptionList];
    const currentStyles = updatedPrescription[selectedRowIndex].styles || {};
    updatedPrescription[selectedRowIndex].styles = {
      ...currentStyles,
      [styleKey]: styleValue,
    };
    setPrescriptionList(updatedPrescription);
    setPrescription(JSON.stringify(updatedPrescription));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setLocalFile(selectedFile || null);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSave = async () => {
    const data = new FormData();
    data.append('diagnosis', diagnosis.trim());
    data.append('note', notes.trim());
    data.append('prescription', prescription || '');
    data.append('booking_id', selectedAppointment.id);
    data.append('_method', 'PUT');

    if (localFile instanceof File) {
      data.append('file', localFile);
    } else if (localFile === null || localFile === undefined) {
      console.log("No valid file selected, skipping file field.");
    } else {
      toast.error("Vui lòng chọn một tệp hợp lệ.");
      return;
    }

    try {
      await handleUpdateExamResult(data);
      onHideEdit();
      if (setShowResultViewModal && typeof setShowResultViewModal === 'function') {
        setShowResultViewModal(true);
      }
    } catch (error) {
      toast.error(error.message || "Lỗi khi cập nhật kết quả khám.");
    }
  };

  const handleConfirmComplete = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmAction = async () => {
    setIsCompleting(true);
    try {
      const data = new FormData();
      data.append('diagnosis', diagnosis ? diagnosis.trim() : '');
      data.append('note', notes ? notes.trim() : '');
      data.append('prescription', prescription || '');
      data.append('booking_id', selectedAppointment.id);
      data.append('_method', 'PUT');

      if (localFile instanceof File) {
        data.append('file', localFile);
      }

      await handleUpdateExamResult(data);
      await handleCompleteAppointment();
      setShowConfirmModal(false);
      onHideEdit();
      toast.success("Hoàn thành cuộc hẹn thành công!");
    } catch (error) {
      console.error("Error completing appointment:", error);
      toast.error(error.message || "Lỗi khi hoàn thành cuộc hẹn.");
    } finally {
      setIsCompleting(false);
    }
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const fetchSystemInfo = async () => {
    const token = getAuthToken();
    if (!token) return;

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/system", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctorInfo({
        name: response.data.doctor_name || "Bác sĩ không xác định",
        address: response.data.address || "Địa chỉ không xác định",
        phone: "0123 456 789",
      });
    } catch (error) {
      console.error("Error fetching system info:", error);
      toast.error("Không thể tải thông tin hệ thống.");
    }
  };

  const handlePrint = async () => {
    await fetchSystemInfo();
    const printContent = `
      <div class="print-header">
        <h1>PHÒNG KHÁM ĐA KHOA XYZ</h1>
        <h2>KẾT QUẢ KHÁM BỆNH</h2>
      </div>
      <div class="print-section">
        <div class="info-block">
          <p><strong>Tên bệnh nhân:</strong> ${selectedAppointment?.guest?.guest_name || "Không có tên"}</p>
          <p><strong>Bác sĩ khám:</strong> ${doctorInfo.name}</p>
          <p><strong>Ngày khám:</strong> ${selectedAppointment?.booking_date || "N/A"} ${selectedAppointment?.booking_time || "N/A"}</p>
          <p><strong>Mã đặt lịch:</strong> ${selectedAppointment?.id || "N/A"}</p>
        </div>
        <div class="info-block">
          <p><strong>Địa chỉ:</strong> ${doctorInfo.address}</p>
          <p><strong>Hotline:</strong> ${doctorInfo.phone}</p>
        </div>
      </div>
      <div class="print-section">
        <h3>Chẩn Đoán</h3>
        <p>${diagnosis || "Chưa có chẩn đoán"}</p>
      </div>
      <div class="print-section">
        <h3>Đơn Thuốc</h3>
        ${
          prescriptionList.length > 0 && prescriptionList[0].note && !prescriptionList[0].medicine
            ? `<p>${prescriptionList[0].note}</p>`
            : prescriptionList.length > 0
            ? `
              <table class="prescription-table">
                <thead>
                  <tr>
                    <th>Tên Thuốc</th>
                    <th>Số lượng</th>
                    <th>Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  ${prescriptionList.map(item => `
                    <tr>
                      <td style="${Object.entries(item.styles).map(([k, v]) => `${k}: ${v}`).join(';')}">${item.medicine || "N/A"}</td>
                      <td style="${Object.entries(item.styles).map(([k, v]) => `${k}: ${v}`).join(';')}">${item.quantity || "N/A"}</td>
                      <td style="${Object.entries(item.styles).map(([k, v]) => `${k}: ${v}`).join(';')}">${item.note || "N/A"}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>`
            : `<p>Chưa có đơn thuốc</p>`
        }
      </div>
      <div class="print-section">
        <h3>Ghi Chú</h3>
        <p>${notes || "Chưa có ghi chú"}</p>
      </div>
      <div class="print-section">
        <h3>Tệp Đính Kèm</h3>
        ${
          previewImage
            ? `<img src="${previewImage}" alt="Tệp đính kèm" class="medical-image" />`
            : file && typeof file === 'string'
            ? `<img src="http://127.0.0.1:8000/storage/${file}" alt="Tệp đính kèm" class="medical-image" />`
            : `<p>Chưa có tệp đính kèm</p>`
        }
      </div>
      <div class="print-footer">
        <p><strong>Ngày in:</strong> ${currentDateTime}</p>
      </div>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>In Kết Quả Khám</title>
          <style>
            @page { size: A4; margin: 20mm; }
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              color: #333;
              line-height: 1.6;
            }
            .print-header {
              text-align: center;
              margin-bottom: 20px;
              border-bottom: 2px solid #000;
              padding-bottom: 10px;
            }
            .print-header h1 {
              font-size: 24px;
              font-weight: bold;
              color: #2c3e50;
              margin: 0;
            }
            .print-header h2 {
              font-size: 20px;
              font-weight: bold;
              color: #34495e;
              margin: 5px 0;
            }
            .print-section {
              margin-bottom: 20px;
              padding: 15px;
              background: #fff;
              border: 1px solid #ddd;
              border-radius: 5px;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            .info-block {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
            }
            .info-block p {
              margin: 5px 0;
              font-size: 14px;
            }
            h3 {
              font-size: 18px;
              color: #2c3e50;
              margin-bottom: 10px;
              border-bottom: 1px solid #ddd;
              padding-bottom: 5px;
            }
            p {
              font-size: 14px;
              color: #333;
              margin: 5px 0;
            }
            .prescription-table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
            }
            .prescription-table th,
            .prescription-table td {
              border: 1px solid #ddd;
              padding: 10px;
              text-align: left;
              font-size: 14px;
            }
            .prescription-table th {
              background-color: #ecf0f1;
              font-weight: bold;
            }
            .medical-image {
              max-width: 400px;
              max-height: 300px;
              object-fit: contain;
              border: 1px solid #ddd;
              border-radius: 5px;
              margin-top: 10px;
            }
            .print-footer {
              margin-top: 20px;
              text-align: right;
              padding-top: 10px;
              border-top: 1px solid #ddd;
            }
            .print-footer p {
              font-size: 14px;
              margin: 0;
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const renderFilePreview = (file, fileType) => {
    const fileUrl = `http://127.0.0.1:8000/storage/${file}`;

    switch (fileType) {
      case 'image':
        return (
          <>
            <img
              src={fileUrl}
              alt="Tệp đính kèm"
              className="medical-image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="file-link"
              style={{ display: 'none' }}
            >
              <FaFileUpload /> Xem tệp đính kèm
            </a>
            <span className="image-caption">Hình ảnh đính kèm</span>
          </>
        );
      case 'video':
        return (
          <>
            <video
              controls
              className="medical-image"
              style={{ maxHeight: '300px' }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            >
              <source src={fileUrl} type={`video/${file.split('.').pop().toLowerCase()}`} />
              Trình duyệt của bạn không hỗ trợ thẻ video.
            </video>
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="file-link"
              style={{ display: 'none' }}
            >
              <FaFileUpload /> Xem tệp đính kèm
            </a>
            <span className="image-caption">Video đính kèm</span>
          </>
        );
      case 'audio':
        return (
          <>
            <audio
              controls
              className="medical-image"
              style={{ width: '100%', maxWidth: '400px' }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            >
              <source src={fileUrl} type={`audio/${file.split('.').pop().toLowerCase()}`} />
              Trình duyệt của bạn không hỗ trợ thẻ audio.
            </audio>
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="file-link"
              style={{ display: 'none' }}
            >
              <FaFileUpload /> Xem tệp đính kèm
            </a>
            <span className="image-caption">Âm thanh đính kèm</span>
          </>
        );
      case 'pdf':
      case 'other':
        return (
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="file-link"
          >
            <FaFileUpload /> Xem tệp đính kèm
          </a>
        );
      default:
        return <p>Chưa có tệp đính kèm</p>;
    }
  };

  return (
    <>
      <style>
        {`
          .medical-modal .modal-content {
            border-radius: 15px;
            border: none;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          }

          .medical-modal .modal-header {
            background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
            color: white;
            border-radius: 15px 15px 0 0;
            padding: 1.5rem;
          }

          .medical-modal .modal-title {
            font-size: 1.5rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .medical-modal .modal-body {
            padding: 2rem;
            background-color: #f8fafc;
          }

          .medical-modal .form-label {
            font-weight: 600;
            color: #0f172a;
            margin-bottom: 0.75rem;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .medical-modal .form-control {
            border-radius: 10px;
            border: 1px solid #e2e8f0;
            padding: 0.75rem;
            font-size: 1rem;
            transition: all 0.3s ease;
            background-color: white;
          }

          .medical-modal .form-control:focus {
            border-color: #0ea5e9;
            box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
          }

          .medical-modal .form-control:disabled,
          .medical-modal .form-control[readonly] {
            background-color: #f1f5f9;
            border-color: #e2e8f0;
          }

          .medical-modal .btn-primary {
            background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
            border: none;
            padding: 0.75rem 1.5rem;
            font-weight: 600;
            border-radius: 10px;
            transition: all 0.3s ease;
          }

          .medical-modal .btn-primary:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(14, 165, 233, 0.2);
          }

          .medical-modal .btn-success {
            background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
            border: none;
            padding: 0.75rem 1.5rem;
            font-weight: 600;
            border-radius: 10px;
            transition: all 0.3s ease;
          }

          .medical-modal .btn-success:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
          }

          .medical-modal .btn-secondary {
            background: #f1f5f9;
            color: #475569;
            border: none;
            padding: 0.75rem 1.5rem;
            font-weight: 600;
            border-radius: 10px;
            transition: all 0.3s ease;
          }

          .medical-modal .btn-secondary:hover {
            background: #e2e8f0;
            transform: translateY(-1px);
          }

          .medical-modal .file-preview {
            background: #f8fafc;
            border: 1px dashed #e2e8f0;
            border-radius: 10px;
            padding: 1rem;
            margin-top: 0.5rem;
          }

          .medical-modal .file-link {
            color: #0ea5e9;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-weight: 500;
          }

          .medical-modal .file-link:hover {
            color: #0284c7;
          }

          .medical-info-card {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          }

          .medical-info-card h5 {
            color: #0f172a;
            font-weight: 600;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .medical-image {
            max-width: 100%;
            max-height: 300px;
            object-fit: contain;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            margin-top: 10px;
          }

          .spinner-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 15px;
          }

          .editor-toolbar {
            display: flex;
            gap: 5px;
            margin-bottom: 10px;
            padding: 5px;
            background-color: #f1f5f9;
            border-radius: 5px;
            border: 1px solid #e2e8f0;
          }

          .editor-toolbar button {
            background: none;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            color: #0f172a;
            font-size: 1rem;
          }

          .editor-toolbar button:hover {
            background-color: #e2e8f0;
            border-radius: 5px;
          }

          .editor-toolbar button:disabled {
            color: #a0aec0;
            cursor: not-allowed;
          }

          .custom-confirm-modal .modal-content {
            border-radius: 15px;
            border: none;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }

          .custom-confirm-modal .modal-header {
            background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
            color: white;
            border-radius: 15px 15px 0 0;
            padding: 1.5rem;
            border-bottom: none;
          }

          .custom-confirm-modal .modal-title {
            font-size: 1.5rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .custom-confirm-modal .modal-body {
            padding: 2rem;
            background-color: #f8fafc;
            text-align: center;
          }

          .custom-confirm-modal .modal-body p {
            font-size: 1.1rem;
            color: #1f2937;
            margin-bottom: 1.5rem;
          }

          .custom-confirm-modal .modal-footer {
            border-top: none;
            padding: 1rem 2rem;
            background-color: #f8fafc;
            display: flex;
            justify-content: center;
            gap: 1rem;
          }

          .custom-confirm-modal .btn-cancel {
            background: #f1f5f9;
            color: #475569;
            border: none;
            padding: 0.75rem 1.5rem;
            font-weight: 600;
            border-radius: 10px;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .custom-confirm-modal .btn-cancel:hover {
            background: #e2e8f0;
            transform: translateY(-1px);
          }

          .custom-confirm-modal .btn-confirm {
            background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
            border: none;
            padding: 0.75rem 1.5rem;
            font-weight: 600;
            border-radius: 10px;
            color: white;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .custom-confirm-modal .btn-confirm:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
          }

          .custom-confirm-modal .btn-confirm:disabled {
            background: #a0aec0;
            cursor: not-allowed;
          }

          .custom-confirm-modal .spinner-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 15px;
          }
        `}
      </style>

      <Modal show={showView} onHide={onHideView} size="lg" className="medical-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            <FaFileMedical /> Kết Quả Khám Bệnh
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div className="spinner-overlay">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : error ? (
            <div className="alert alert-danger">
              <FaTimes className="me-2" />
              {error}
            </div>
          ) : (
            <div>
              <div className="patient-info" style={{ display: 'none' }}>
                <p><strong>Tên bệnh nhân:</strong> {selectedAppointment?.guest?.guest_name || "Không có tên"}</p>
                <p><strong>Bác sĩ khám:</strong> {doctorInfo.name || "Không có thông tin"}</p>
                <p><strong>Ngày khám:</strong> {selectedAppointment?.booking_date || "N/A"} {selectedAppointment?.booking_time || "N/A"}</p>
                <p><strong>Mã đặt lịch:</strong> {selectedAppointment?.id || "N/A"}</p>
              </div>

              <div className="medical-info-card">
                <h5><FaFileMedical /> Chẩn Đoán</h5>
                <p className="mb-0">{diagnosis || "Chưa có chẩn đoán"}</p>
              </div>

              <div className="medical-info-card">
                <h5><FaPrescriptionBottle /> Đơn Thuốc</h5>
                {prescriptionList.length > 0 && prescriptionList[0].note && !prescriptionList[0].medicine ? (
                  <p className="mb-0">{prescriptionList[0].note}</p>
                ) : prescriptionList.length > 0 ? (
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>Tên Thuốc</th>
                        <th>Số lượng</th>
                        <th>Ghi chú</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prescriptionList.map((item, index) => (
                        <tr key={index}>
                          <td style={item.styles}>{item.medicine || "N/A"}</td>
                          <td style={item.styles}>{item.quantity || "N/A"}</td>
                          <td style={item.styles}>{item.note || "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <p className="mb-0">Chưa có đơn thuốc</p>
                )}
              </div>

              <div className="medical-info-card">
                <h5><FaStickyNote /> Ghi Chú</h5>
                <p className="mb-0">{notes || "Chưa có ghi chú"}</p>
              </div>

              <div className="medical-info-card">
                <h5><FaFileUpload /> Tệp Đính Kèm</h5>
                {file && typeof file === 'string' ? (
                  renderFilePreview(file, fileType)
                ) : file instanceof File ? (
                  <p>Tệp đã chọn: {file.name}</p>
                ) : (
                  <p>Chưa có tệp đính kèm</p>
                )}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHideView}>
            <FaTimes className="me-2" />
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onHideView();
              setShowEditResultModal(true);
            }}
          >
            <FaEdit className="me-2" />
            Sửa Kết Quả
          </Button>
          <Button variant="success" onClick={handlePrint} disabled={loading}>
            <FaPrint className="me-2" />
            In
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={onHideEdit} size="lg" className="medical-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            <FaEdit /> Cập Nhật Kết Quả Khám
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && (
            <div className="alert alert-danger mb-4">
              <FaTimes className="me-2" />
              {error}
            </div>
          )}
          
          <Form>
            <div className="medical-info-card">
              <Form.Group className="mb-4">
                <Form.Label>
                  <FaFileMedical className="me-2" />
                  Chẩn Đoán
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={diagnosis || ""}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="Nhập chẩn đoán chi tiết..."
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>
                  <FaPrescriptionBottle className="me-2" />
                  Đơn Thuốc
                </Form.Label>
                <div className="editor-toolbar">
                  <Button
                    onClick={() => applyStyleToRow('fontWeight', 'bold')}
                    disabled={selectedRowIndex === null}
                    title="Bold"
                  >
                    <FaBold />
                  </Button>
                  <Button
                    onClick={() => applyStyleToRow('fontStyle', 'italic')}
                    disabled={selectedRowIndex === null}
                    title="Italic"
                  >
                    <FaItalic />
                  </Button>
                  <Button
                    onClick={() => applyStyleToRow('textDecoration', 'underline')}
                    disabled={selectedRowIndex === null}
                    title="Underline"
                  >
                    <FaUnderline />
                  </Button>
                </div>
                <Table bordered style={{ marginBottom: "10px" }}>
                  <thead>
                    <tr>
                      <th>Tên Thuốc</th>
                      <th>Số lượng</th>
                      <th>Ghi chú</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescriptionList.map((item, index) => (
                      <tr
                        key={index}
                        onClick={() => handleRowSelect(index)}
                        style={{ backgroundColor: selectedRowIndex === index ? '#e6f7ff' : 'transparent' }}
                      >
                        <td>
                          <Form.Control
                            type="text"
                            value={item.medicine}
                            onChange={(e) => handlePrescriptionChange(index, 'medicine', e.target.value)}
                            placeholder="Nhập tên thuốc..."
                            style={{ border: "none", padding: "8px", ...item.styles }}
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            value={item.quantity}
                            onChange={(e) => handlePrescriptionChange(index, 'quantity', e.target.value)}
                            placeholder="Nhập số lượng..."
                            style={{ border: "none", padding: "8px", ...item.styles }}
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            value={item.note}
                            onChange={(e) => handlePrescriptionChange(index, 'note', e.target.value)}
                            placeholder="Nhập ghi chú..."
                            style={{ border: "none", padding: "8px", ...item.styles }}
                          />
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => removePrescriptionRow(index)}
                            disabled={prescriptionList.length === 1}
                          >
                            X
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Button variant="outline-primary" onClick={addPrescriptionRow}>
                  Thêm Thuốc
                </Button>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>
                  <FaStickyNote className="me-2" />
                  Ghi Chú
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={notes || ""}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Nhập ghi chú bổ sung..."
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  <FaFileUpload className="me-2" />
                  Tệp Đính Kèm
                </Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleFileChange}
                  className="mb-3"
                />
                {previewImage ? (
                  <div className="file-preview">
                    <span className="me-2">Xem trước:</span>
                    <img src={previewImage} alt="Preview" style={{ maxWidth: "200px", maxHeight: "200px" }} />
                  </div>
                ) : file && typeof file === 'string' ? (
                  <div className="file-preview">
                    <span className="me-2">Tệp hiện tại:</span>
                    {renderFilePreview(file, fileType)}
                  </div>
                ) : localFile instanceof File ? (
                  <div className="file-preview">
                    <span className="me-2">Tệp đã chọn:</span>
                    <span>{localFile.name}</span>
                  </div>
                ) : (
                  <p>Chưa có tệp đính kèm</p>
                )}
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHideEdit}>
            <FaTimes className="me-2" />
            Hủy
          </Button>
          <Button
            variant="success"
            onClick={handleConfirmComplete}
            disabled={loading || isCompleting}
          >
            {loading || isCompleting ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Đang xử lý...
              </>
            ) : (
              <>
                <FaEdit className="me-2" />
                Hoàn thành
              </>
            )}
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={loading || isCompleting}
          >
            {loading || isCompleting ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Đang lưu...
              </>
            ) : (
              <>
                <FaEdit className="me-2" />
                Lưu Thay Đổi
              </>
            )}
          </Button>
          <Button variant="success" onClick={handlePrint} disabled={loading || isCompleting}>
            <FaPrint className="me-2" />
            In
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showConfirmModal}
        onHide={handleCloseConfirmModal}
        centered
        className="custom-confirm-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FaCheckCircle /> Xác nhận hoàn thành
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Bạn có chắc chắn muốn hoàn thành cuộc hẹn của{" "}
            <strong>{selectedAppointment?.guest?.guest_name || "Khách hàng"}</strong>{" "}
            vào lúc {selectedAppointment?.booking_time} ngày{" "}
            {selectedAppointment?.booking_date} không?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-cancel"
            onClick={handleCloseConfirmModal}
            disabled={isCompleting}
          >
            <FaTimesCircle /> Hủy
          </Button>
          <Button
            className="btn-confirm"
            onClick={handleConfirmAction}
            disabled={isCompleting}
          >
            {isCompleting ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Đang xử lý...
              </>
            ) : (
              <>
                <FaCheckCircle /> Xác nhận
              </>
            )}
          </Button>
        </Modal.Footer>
        {isCompleting && (
          <div className="spinner-overlay">
            <Spinner animation="border" variant="success" />
          </div>
        )}
      </Modal>
    </>
  );
};

export default ExamResultModal;