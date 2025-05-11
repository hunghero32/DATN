import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Spinner, Row, Col, Table } from "react-bootstrap";
import { FaFileMedical, FaPrescriptionBottle, FaStickyNote, FaFileUpload, FaEdit, FaTimes, FaDownload, FaBold, FaItalic, FaUnderline } from 'react-icons/fa';

const ExamResultModal = ({
  showView,
  showEdit,
  onHideView,
  onHideEdit,
  setShowEditResultModal,
  selectedAppointment,
  diagnosis,
  setDiagnosis,
  notes,
  setNotes,
  prescription,
  setPrescription,
  file: initialFile,
  setFile: setInitialFile,
  handleUpdateExamResult,
  loading,
  error
}) => {
  const [prescriptionList, setPrescriptionList] = useState([{ medicine: '', quantity: '', note: '', styles: {} }]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [localFile, setLocalFile] = useState(null); // Local state to handle file input

  useEffect(() => {
    if (!showEdit) {
      setDiagnosis(diagnosis || "");
      setNotes(notes || "");
      setPrescription(prescription || "");
      setLocalFile(initialFile || null); // Set initial file for view mode
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
      setLocalFile(initialFile || null); // Set initial file for edit mode
      try {
        const parsedPrescription = typeof prescription === 'string' && prescription.trim() ? JSON.parse(prescription) : null;
        setPrescriptionList(Array.isArray(parsedPrescription) ? parsedPrescription : [{ medicine: '', quantity: '', note: '', styles: {} }]);
      } catch (e) {
        setPrescriptionList([{ medicine: '', quantity: '', note: prescription || 'Không cần thuốc', styles: {} }]);
      }
    }
  }, [showEdit, diagnosis, notes, prescription, initialFile, setDiagnosis, setNotes, setPrescription, setInitialFile]);

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
      [styleKey]: styleValue
    };
    setPrescriptionList(updatedPrescription);
    setPrescription(JSON.stringify(updatedPrescription));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLocalFile(file); // Store the File object for upload
    }
  };

  // Update file when saving
  const handleSave = async () => {
    if (localFile instanceof File) {
      const formData = new FormData();
      formData.append('file', localFile);
      // Assuming handleUpdateExamResult accepts formData for file upload
      await handleUpdateExamResult(formData); // Pass formData to the update function
    } else {
      await handleUpdateExamResult(); // Call without formData if no new file
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
        `}
      </style>

      {/* Modal Xem Kết Quả */}
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
                {localFile && typeof localFile === 'string' ? (
                  <a
                    href={`http://127.0.0.1:8000/storage/${localFile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="file-link"
                  >
                    <FaFileUpload /> Xem tệp đính kèm
                  </a>
                ) : localFile instanceof File ? (
                  <p>Tệp đã chọn: {localFile.name}</p>
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
        </Modal.Footer>
      </Modal>

      {/* Modal Sửa Kết Quả */}
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
                {localFile && typeof localFile === 'string' ? (
                  <div className="file-preview">
                    <span className="me-2">Tệp hiện tại:</span>
                    <a
                      href={`http://127.0.0.1:8000/storage/${localFile}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="file-link"
                    >
                      <FaFileUpload /> Xem tệp
                    </a>
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