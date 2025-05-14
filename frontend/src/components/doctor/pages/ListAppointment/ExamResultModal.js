import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Spinner, Table } from "react-bootstrap";
import { FaFileMedical, FaPrescriptionBottle, FaStickyNote, FaFileUpload, FaEdit, FaTimes, FaDownload, FaBold, FaItalic, FaUnderline, FaPrint } from 'react-icons/fa';
import { toast } from 'react-toastify';

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
  loading,
  error,
}) => {
  const [prescriptionList, setPrescriptionList] = useState([{ medicine: '', quantity: '', note: '', styles: {} }]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [localFile, setLocalFile] = useState(null);
  const [fileType, setFileType] = useState(null); // To store file type: 'image', 'video', 'audio', 'pdf', or 'other'

  useEffect(() => {
    // Reset state when modal mode changes
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

    // Determine file type for preview
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
    const file = e.target.files[0];
    setLocalFile(file || null);
    console.log("Selected file:", file);
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
      console.log("File appended:", localFile.name);
    } else if (localFile === null || localFile === undefined) {
      console.log("No valid file selected, skipping file field.");
    } else {
      toast.error("Vui lòng chọn một tệp hợp lệ.");
      return;
    }

    console.log("Sending data:", Object.fromEntries(data));

    try {
      await handleUpdateExamResult(data);
      onHideEdit();
      if (setShowResultViewModal && typeof setShowResultViewModal === 'function') {
        setShowResultViewModal(true);
      }
    } catch (error) {
      console.error("Error during save:", error);
      toast.error(error.message || "Lỗi khi cập nhật kết quả khám.");
    }
  };

  const handlePrint = () => {
    window.print();
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

          @media print {
            @page {
              size: A4;
              margin: 20mm;
            }
            body * {
              visibility: hidden;
            }
            .medical-modal .modal-body,
            .medical-modal .modal-body * {
              visibility: visible;
            }
            .medical-modal .modal-body {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              padding: 20px;
              background-color: white;
              box-shadow: none !important;
              border: none !important;
              font-family: Arial, sans-serif;
            }
            .medical-modal .modal-body::before {
              content: "PHÒNG KHÁM ĐA KHOA XYZ\\A KẾT QUẢ KHÁM BỆNH";
              white-space: pre-wrap;
              display: block;
              text-align: center;
              font-size: 20px;
              font-weight: bold;
              margin-bottom: 20px;
              color: #000;
              border-bottom: 2px solid #000;
              padding-bottom: 10px;
            }
            .medical-modal .modal-body::after {
              content: "Địa chỉ: 123 Đường Sức Khỏe, Quận 1, TP. HCM \\A Hotline: 0123 456 789 \\A Ngày in: 01:38 PM, 14/05/2025";
              white-space: pre-wrap;
              display: block;
              text-align: center;
              font-size: 12px;
              color: #555;
              margin-top: 30px;
              border-top: 1px solid #ddd;
              padding-top: 10px;
            }
            .patient-info {
              display: flex !important;
              flex-wrap: wrap;
              margin-bottom: 20px;
              padding: 10px;
              border: 1px solid #ddd;
              border-radius: 5px;
            }
            .patient-info p {
              margin: 5px 20px 5px 0;
              font-size: 14px;
              color: #000;
              flex: 1 1 45%;
              word-wrap: break-word;
              overflow-wrap: break-word;
            }
            .medical-info-card {
              box-shadow: none;
              margin-bottom: 20px;
              padding: 15px;
              border: 1px solid #ddd;
              border-radius: 5px;
              page-break-inside: avoid;
            }
            .medical-info-card h5 {
              font-size: 16px;
              margin-bottom: 10px;
              color: #000;
              border-bottom: 1px solid #ddd;
              padding-bottom: 5px;
            }
            .medical-info-card p {
              font-size: 14px;
              color: #000;
              margin-bottom: 5px;
              word-wrap: break-word;
              overflow-wrap: break-word;
              white-space: pre-wrap;
            }
            .table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 15px;
              page-break-inside: avoid;
            }
            .table th,
            .table td {
              border: 1px solid #000;
              padding: 8px;
              font-size: 14px;
              color: #000;
              word-wrap: break-word;
              overflow-wrap: break-word;
              text-align: left;
            }
            .table th {
              background-color: #f0f0f0;
              font-weight: bold;
              width: 33.33%;
            }
            .table td {
              width: 33.33%;
            }
            .file-link {
              color: #000;
              text-decoration: underline;
              word-wrap: break-word;
              overflow-wrap: break-word;
            }
            .medical-image {
              max-width: 400px;
              max-height: 300px;
              object-fit: contain;
              border: 1px solid #000;
              margin-top: 10px;
              page-break-inside: avoid;
            }
            .image-caption {
              display: block;
              font-size: 12px;
              color: #555;
              text-align: center;
              margin-top: 5px;
            }
            .spinner-overlay,
            .alert-danger {
              display: none;
            }
            video, audio {
              display: none;
            }
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
              {/* Patient and Doctor Info (Hidden on Screen, Visible on Print) */}
              <div className="patient-info" style={{ display: 'none' }}>
                <p><strong>Tên bệnh nhân:</strong> {selectedAppointment?.guest?.guest_name || "Không có tên"}</p>
                <p><strong>Bác sĩ khám:</strong> {selectedAppointment?.doctor?.doctor_name || "Không có thông tin"}</p>
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
                {file && typeof file === 'string' ? (
                  <div className="file-preview">
                    <span className="me-2">Tệp hiện tại:</span>
                    {renderFilePreview(file, fileType)}
                  </div>
                ) : file instanceof File ? (
                  <div className="file-preview">
                    <span className="me-2">Tệp đã chọn:</span>
                    <span>{file.name}</span>
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
            variant="primary"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? (
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
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ExamResultModal;