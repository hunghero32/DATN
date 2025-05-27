import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Table } from "react-bootstrap";
import { FaChevronDown, FaChevronUp, FaFileMedical, FaNotesMedical, FaCalendarAlt, FaUserMd, FaPrescriptionBottleAlt, FaTrash } from "react-icons/fa";

const MedicalRecordModal = ({
  show,
  onHide,
  showForm,
  setShowForm,
  medicalRecord,
  results,
  error,
  medicalForm,
  setMedicalForm,
  handleSaveMedicalRecord,
  loading,
}) => {
  const [expandedResults, setExpandedResults] = useState(new Set());

  useEffect(() => {
    console.log("Results data:", results);
  }, [results]);

  // Reset form when closing modal
  useEffect(() => {
    if (!show) {
      setShowForm(false);
    }
  }, [show, setShowForm]);

  // Reset form when saving is successful
  useEffect(() => {
    if (!loading && medicalRecord) {
      setShowForm(false);
    }
  }, [loading, medicalRecord, setShowForm]);

  const toggleResult = (index) => {
    setExpandedResults((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSaveMedicalRecord();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Parse and format prescription data to array if it's a JSON string
  const parsePrescription = (prescription) => {
    if (!prescription) return [];
    try {
      return Array.isArray(prescription) ? prescription : JSON.parse(prescription);
    } catch (e) {
      return [{ medicine: prescription, quantity: "", note: "" }];
    }
  };

  // Add new medicine entry
  const addMedicine = () => {
    setMedicalForm((prev) => ({
      ...prev,
      medications: [
        ...(parsePrescription(prev.medications) || []),
        { medicine: "", quantity: "", note: "" },
      ],
    }));
  };

  // Remove medicine entry
  const removeMedicine = (index) => {
    setMedicalForm((prev) => {
      const meds = parsePrescription(prev.medications);
      meds.splice(index, 1);
      return { ...prev, medications: meds };
    });
  };

  // Update medicine entry
  const updateMedicine = (index, field, value) => {
    setMedicalForm((prev) => {
      const meds = parsePrescription(prev.medications);
      meds[index] = { ...meds[index], [field]: value };
      return { ...prev, medications: meds };
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <style>
        {`
          .modal-content {
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          }

          .modal-header {
            background-color: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
            padding: 1.5rem;
          }

          .modal-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: #1e293b;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .modal-body {
            padding: 1.5rem;
            max-height: 80vh;
            overflow-y: auto;
          }

          .record-section {
            background-color: #fff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          }

          .section-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .result-item {
            border: 1px solid #e2e8f0;
            border-radius: 10px;
            margin-bottom: 1rem;
            background-color: #fff;
            transition: all 0.2s ease;
          }

          .result-item:hover {
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          }

          .result-header {
            padding: 1rem 1.5rem;
            background-color: #f8fafc;
            cursor: pointer;
            border-radius: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .result-header:hover {
            background-color: #f1f5f9;
          }

          .result-header.active {
            background-color: #eff6ff;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }

          .result-title {
            display: flex;
            align-items: center;
            gap: 1rem;
            color: #1e293b;
          }

          .result-number {
            font-weight: 600;
            color: #3b82f6;
          }

          .result-date {
            color: #64748b;
            font-size: 0.875rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .result-content {
            padding: 1.5rem;
            border-top: 1px solid #e2e8f0;
          }

          .info-group {
            margin-bottom: 1.5rem;
            padding: 1rem;
            background-color: #f8fafc;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
          }

          .info-label {
            font-weight: 600;
            color: #475569;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .info-value {
            color: #1e293b;
            line-height: 1.6;
          }

          .toggle-button {
            background: none;
            border: none;
            color: #3b82f6;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 6px;
            transition: all 0.2s ease;
          }

          .toggle-button:hover {
            background-color: #eff6ff;
          }

          .doctor-info {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #3b82f6;
            font-weight: 500;
            margin-top: 0.5rem;
          }

          .service-info {
            margin-top: 0.5rem;
            color: #64748b;
            font-size: 0.875rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .form-control {
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 0.75rem;
            font-size: 0.875rem;
            color: #1e293b;
            background-color: #fff;
            transition: all 0.2s ease;
          }

          .form-control:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
            outline: none;
          }

          .form-label {
            font-weight: 500;
            color: #475569;
            margin-bottom: 0.5rem;
          }

          .btn-primary {
            background-color: #3b82f6;
            border-color: #3b82f6;
            color: #fff;
            padding: 0.75rem 1.5rem;
            font-weight: 500;
            border-radius: 8px;
            transition: all 0.2s ease;
          }

          .btn-primary:hover {
            background-color: #2563eb;
            border-color: #2563eb;
          }

          .btn-outline-primary {
            color: #3b82f6;
            border-color: #3b82f6;
            background-color: transparent;
            padding: 0.75rem 1.5rem;
            font-weight: 500;
            border-radius: 8px;
            transition: all 0.2s ease;
          }

          .btn-outline-primary:hover {
            background-color: #3b82f6;
            color: #fff;
          }

          .medicine-table {
            margin-bottom: 1rem;
          }

          .medicine-table th,
          .medicine-table td {
            vertical-align: middle;
            padding: 0.75rem;
            border-bottom: 1px solid #e2e8f0;
          }

          .medicine-table th {
            background-color: #f8fafc;
            font-weight: 600;
            color: #475569;
          }

          .medicine-table td input {
            width: 100%;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 0.5rem;
          }

          .delete-btn {
            color: #ef4444;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 4px;
            transition: all 0.2s ease;
          }

          .delete-btn:hover {
            background-color: #fee2e2;
          }
        `}
      </style>

      <Modal.Header closeButton>
        <Modal.Title>
          <FaFileMedical className="text-primary" />
          Hồ sơ bệnh án
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Only display error if it's not "No query results for model" */}
        {error && !error.includes("No query results for model") && (
          <div className="alert alert-danger">{error}</div>
        )}

        {/* Medical Record Section */}
        <div className="record-section">
          <div className="section-title">
            <FaFileMedical className="text-primary" />
            Thông tin bệnh án
            {medicalRecord && (
              <span className="text-muted fs-6 ms-2">
                (Cập nhật: {formatDate(medicalRecord.updated_at)})
              </span>
            )}
          </div>

          {!showForm ? (
            // View Mode
            medicalRecord ? (
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="info-group">
                    <div className="info-label">
                      <FaFileMedical /> BHYT
                    </div>
                    <div className="info-value">
                      {medicalRecord.BHYT || "Không có dữ liệu"}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="info-group">
                    <div className="info-label">
                      <FaNotesMedical /> Tình trạng y tế
                    </div>
                    <div className="info-value">
                      {medicalRecord.medical_condition || "Không có dữ liệu"}
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="info-group">
                    <div className="info-label">
                      <FaPrescriptionBottleAlt /> Thuốc
                    </div>
                    <div className="info-value">
                      <Table striped bordered hover className="medicine-table">
                        <thead>
                          <tr>
                            <th>Tên Thuốc</th>
                            <th>Số lượng</th>
                            <th>Ghi chú</th>
                          </tr>
                        </thead>
                        <tbody>
                          {parsePrescription(medicalRecord.medications).map((item, index) => (
                            <tr key={index}>
                              <td>{item.medicine || "Không có dữ liệu"}</td>
                              <td>{item.quantity || "Không có dữ liệu"}</td>
                              <td>{item.note || "Không có dữ liệu"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="info-group">
                    <div className="info-label">
                      <FaNotesMedical /> Dị ứng
                    </div>
                    <div className="info-value">
                      {medicalRecord.allergies || "Không có dữ liệu"}
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="info-group">
                    <div className="info-label">
                      <FaNotesMedical /> Tiền sử gia đình
                    </div>
                    <div className="info-value">
                      {medicalRecord.family_history || "Không có dữ liệu"}
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="info-group">
                    <div className="info-label">
                      <FaNotesMedical /> Phương pháp điều trị
                    </div>
                    <div className="info-value">
                      {medicalRecord.treatment || "Không có dữ liệu"}
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="info-group">
                    <div className="info-label">
                      <FaNotesMedical /> Ghi chú
                    </div>
                    <div className="info-value">
                      {medicalRecord.note || "Không có dữ liệu"}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-muted text-center py-3">Chưa có hồ sơ y tế</p>
            )
          ) : (
            // Edit Mode
            <Form>
              <div className="row g-3">
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>BHYT:</Form.Label>
                    <Form.Control
                      type="text"
                      value={medicalForm.BHYT || ""}
                      onChange={(e) =>
                        setMedicalForm({ ...medicalForm, BHYT: e.target.value })
                      }
                      placeholder="Nhập số BHYT"
                    />
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>Tình trạng y tế:</Form.Label>
                    <Form.Control
                      type="text"
                      value={medicalForm.medical_condition || ""}
                      onChange={(e) =>
                        setMedicalForm({
                          ...medicalForm,
                          medical_condition: e.target.value,
                        })
                      }
                      placeholder="Nhập tình trạng y tế"
                    />
                  </Form.Group>
                </div>

                <div className="col-12">
                  <div className="info-group">
                    <div className="info-label">
                      <FaPrescriptionBottleAlt /> Thuốc
                    </div>
                    <div className="info-value">
                      <Table striped bordered hover className="medicine-table">
                        <thead>
                          <tr>
                            <th>Tên Thuốc</th>
                            <th>Số lượng</th>
                            <th>Ghi chú</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {parsePrescription(medicalForm.medications).map((item, index) => (
                            <tr key={index}>
                              <td>
                                <Form.Control
                                  type="text"
                                  value={item.medicine || ""}
                                  onChange={(e) => updateMedicine(index, "medicine", e.target.value)}
                                  placeholder="Nhập tên thuốc"
                                />
                              </td>
                              <td>
                                <Form.Control
                                  type="text"
                                  value={item.quantity || ""}
                                  onChange={(e) => updateMedicine(index, "quantity", e.target.value)}
                                  placeholder="Nhập số lượng"
                                />
                              </td>
                              <td>
                                <Form.Control
                                  type="text"
                                  value={item.note || ""}
                                  onChange={(e) => updateMedicine(index, "note", e.target.value)}
                                  placeholder="Nhập ghi chú"
                                />
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="delete-btn"
                                  onClick={() => removeMedicine(index)}
                                >
                                  <FaTrash />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      <Button variant="outline-primary" onClick={addMedicine} className="mt-2">
                        Thêm Thuốc
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>Dị ứng:</Form.Label>
                    <Form.Control
                      type="text"
                      value={medicalForm.allergies || ""}
                      onChange={(e) =>
                        setMedicalForm({
                          ...medicalForm,
                          allergies: e.target.value,
                        })
                      }
                      placeholder="Nhập thông tin dị ứng"
                    />
                  </Form.Group>
                </div>

                <div className="col-12">
                  <Form.Group>
                    <Form.Label>Tiền sử gia đình:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={medicalForm.family_history || ""}
                      onChange={(e) =>
                        setMedicalForm({
                          ...medicalForm,
                          family_history: e.target.value,
                        })
                      }
                      placeholder="Nhập tiền sử gia đình"
                    />
                  </Form.Group>
                </div>

                <div className="col-12">
                  <Form.Group>
                    <Form.Label>Phương pháp điều trị:</Form.Label>
                    <Form.Control
                      type="text"
                      value={medicalForm.treatment || ""}
                      onChange={(e) =>
                        setMedicalForm({
                          ...medicalForm,
                          treatment: e.target.value,
                        })
                      }
                      placeholder="Nhập phương pháp điều trị"
                    />
                  </Form.Group>
                </div>

                <div className="col-12">
                  <Form.Group>
                    <Form.Label>Ghi chú:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={medicalForm.note || ""}
                      onChange={(e) =>
                        setMedicalForm({
                          ...medicalForm,
                          note: e.target.value,
                        })
                      }
                      placeholder="Nhập ghi chú"
                    />
                  </Form.Group>
                </div>

                <div className="col-12">
                  <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-100"
                  >
                    {loading ? "Đang lưu..." : "Lưu thông tin"}
                  </Button>
                </div>
              </div>
            </Form>
          )}

          {/* Toggle Edit Button */}
          <div className="text-center mt-4">
            <Button
              variant="outline-primary"
              onClick={() => setShowForm(!showForm)}
              className="px-4"
            >
              {showForm
                ? "Hủy chỉnh sửa"
                : medicalRecord
                ? "Chỉnh sửa hồ sơ"
                : "Tạo hồ sơ mới"}
            </Button>
          </div>
        </div>

        {/* Exam Results Section */}
        <div className="record-section">
          <div className="section-title">
            <FaNotesMedical className="text-primary" />
            Kết quả khám ({Array.isArray(results) ? results.length : 0} kết quả)
          </div>

          {Array.isArray(results) && results.length > 0 ? (
            <div className="result-list">
              {results.map((result, index) => {
                console.log(`Rendering result ${index}:`, result);
                return (
                  <div key={index} className="result-item">
                    <div
                      className={`result-header ${
                        expandedResults.has(index) ? "active" : ""
                      }`}
                      onClick={() => toggleResult(index)}
                    >
                      <div className="result-title">
                        <span className="result-number">
                          Kết quả #{results.length - index}
                        </span>
                        <span className="result-date">
                          <FaCalendarAlt />
                          {formatDate(result.created_at || result.updated_at)}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="toggle-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleResult(index);
                        }}
                      >
                        {expandedResults.has(index) ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </button>
                    </div>

                    <div
                      className="result-content"
                      style={{
                        display: expandedResults.has(index) ? "block" : "none",
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      {result.doctor && (
                        <div className="doctor-info">
                          <FaUserMd />
                          Bác sĩ {result.doctor.doctor_name}
                        </div>
                      )}

                      {result.booking?.service?.services_name && (
                        <div className="service-info">
                          <FaNotesMedical />
                          Dịch vụ: {result.booking.service.services_name}
                        </div>
                      )}

                      <div className="info-group mt-3">
                        <div className="info-label">Chẩn đoán</div>
                        <div className="info-value">
                          {result.diagnosis || "Chưa có chẩn đoán"}
                        </div>
                      </div>

                      <div className="info-group">
                        <div className="info-label">Đơn thuốc</div>
                        <div className="info-value">
                          <Table striped bordered hover className="medicine-table">
                            <thead>
                              <tr>
                                <th>Tên Thuốc</th>
                                <th>Số lượng</th>
                                <th>Ghi chú</th>
                              </tr>
                            </thead>
                            <tbody>
                              {parsePrescription(result.prescription).map((item, idx) => (
                                <tr key={idx}>
                                  <td>{item.medicine || "Không có dữ liệu"}</td>
                                  <td>{item.quantity || "Không có dữ liệu"}</td>
                                  <td>{item.note || "Không có dữ liệu"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      </div>

                      <div className="info-group">
                        <div className="info-label">Ghi chú</div>
                        <div className="info-value">
                          {result.note || "Không có ghi chú"}
                        </div>
                      </div>

                      {result.file && (
                        <div className="info-group">
                          <div className="info-label">Tệp đính kèm</div>
                          <div>
                            <a
                              href={result.file}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-outline-primary btn-sm"
                            >
                              <i className="fas fa-file-download me-2"></i>
                              Xem tệp đính kèm
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-4 text-muted">
              <FaNotesMedical size={40} className="mb-3" />
              <p>Chưa có kết quả khám</p>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MedicalRecordModal;