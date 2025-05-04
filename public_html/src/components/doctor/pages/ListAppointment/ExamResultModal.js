import React, { useEffect } from "react";
import { Modal, Form, Button, Spinner, Row, Col } from "react-bootstrap";
import { FaFileMedical, FaPrescriptionBottle, FaStickyNote, FaFileUpload, FaEdit, FaTimes, FaDownload } from 'react-icons/fa';

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
  file,
  setFile,
  handleUpdateExamResult,
  loading,
  error
}) => {
  // Reset form khi đóng modal
  useEffect(() => {
    if (!showEdit) {
      // Reset form về giá trị ban đầu khi đóng modal edit
      setDiagnosis(diagnosis || "");
      setNotes(notes || "");
      setPrescription(prescription || "");
      setFile(file || null);
    }
  }, [showEdit, diagnosis, notes, prescription, file, setDiagnosis, setNotes, setPrescription, setFile]);

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
                <p className="mb-0">{prescription || "Chưa có đơn thuốc"}</p>
              </div>

              <div className="medical-info-card">
                <h5><FaStickyNote /> Ghi Chú</h5>
                <p className="mb-0">{notes || "Chưa có ghi chú"}</p>
              </div>

              {file && typeof file === "string" && (
                <div className="medical-info-card">
                  <h5><FaFileUpload /> Tệp Đính Kèm</h5>
                  <a
                    href={`http://127.0.0.1:8000/storage/${file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="file-link"
                  >
                    <FaFileUpload /> Xem tệp đính kèm
                  </a>
                </div>
              )}
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
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={prescription || ""}
                  onChange={(e) => setPrescription(e.target.value)}
                  placeholder="Nhập đơn thuốc chi tiết..."
                />
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
                  onChange={(e) => setFile(e.target.files[0])}
                  className="mb-3"
                />
                {file && typeof file === "string" && (
                  <div className="file-preview">
                    <span className="me-2">Tệp hiện tại:</span>
                    <a
                      href={`http://127.0.0.1:8000/storage/${file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="file-link"
                    >
                      <FaFileUpload /> Xem tệp
                    </a>
                  </div>
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
            onClick={handleUpdateExamResult}
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