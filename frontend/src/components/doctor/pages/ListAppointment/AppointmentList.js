import React from "react";
import { Spinner } from "react-bootstrap";

const AppointmentList = ({
  filteredAppointments,
  statusFilter,
  loading,
  error,
  handleShowDetail,
  handleCompleteAppointment,
  handleShowMedicalRecord,
  handleShowExamResult,
  handleTransferAppointment,
}) => {
  const renderTable = (appointments, title, status) => (
    <div className="card-container">
      <h5>{title}</h5>
      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : appointments.length === 0 ? (
        <p className="text-muted">
          Không có cuộc hẹn nào{" "}
          {status === "pending" ? "đang chờ xác nhận" : status === "confirmed" ? "đã nhận" : "đã khám xong"}.
        </p>
      ) : (
        <table className="appointment-table">
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
            {appointments.map((app, index) => (
              <tr key={index}>
                <td>{app.booking_time}</td>
                <td>{app.booking_date}</td>
                <td>{app.guest?.guest_name || "Không có tên"}</td>
                <td>
                  <span className={`status-badge ${status}`}>
                    {status === "pending" ? "Chờ xử lý" : status === "confirmed" ? "Đã xác nhận" : "Hoàn thành"}
                  </span>
                </td>
                <td>
                  <button
                    className="action-button detail"
                    onClick={() => handleShowDetail(app)}
                  >
                    Chi tiết
                  </button>
                  {status === "confirmed" && (
                    <>
                      <button
                        className="action-button medical-record"
                        onClick={() => handleShowMedicalRecord(app)}
                      >
                        Hồ sơ bệnh án
                      </button>
                      <button
                        className="action-button complete"
                        onClick={() => handleCompleteAppointment(app)}
                      >
                        Hoàn thành
                      </button>
                    </>
                  )}
                  {status === "completed" && (
                    <>
                      <button
                        className="action-button medical-record"
                        onClick={() => handleShowMedicalRecord(app)}
                      >
                        Hồ sơ bệnh án
                      </button>
                      <button
                        className="action-button exam-result"
                        onClick={() => handleShowExamResult(app)}
                      >
                        Kết quả khám
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  return (
    <>
      <style>
        {`
          /* Card Container for Table */
          .card-container {
            background-color: #fff;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            padding: 2rem;
            margin-bottom: 2rem;
          }

          .card-container h5 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 1.5rem;
            border-left: 4px solid #3b82f6;
            padding-left: 1rem;
          }

          /* Table Styling */
          .appointment-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 15px;
            color: #374151;
          }

          .appointment-table th, .appointment-table td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
          }

          .appointment-table th {
            background-color: #f9fafb;
            font-weight: 600;
            color: #1f2937;
            text-transform: uppercase;
            font-size: 13px;
            letter-spacing: 0.5px;
          }

          .appointment-table td {
            background-color: #fff;
            font-weight: 500;
          }

          .appointment-table tr:hover td {
            background-color: #f9fafb;
            transition: background-color 0.3s ease;
          }

          /* Status Badge */
          .status-badge {
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
            text-transform: capitalize;
          }

          .status-badge.pending {
            background-color: #fef3c7;
            color: #d97706;
          }

          .status-badge.confirmed {
            background-color: #d1fae5;
            color: #059669;
          }

          .status-badge.completed {
            background-color: #e0e7ff;
            color: #4f46e5;
          }

          /* Button Styling */
          .action-button {
            padding: 0.5rem 1.2rem;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.3s ease;
            border: none;
            margin-right: 0.5rem;
          }

          .action-button.detail {
            background-color: #3b82f6;
            color: #fff;
          }

          .action-button.medical-record {
            background-color: #8b5cf6;
            color: #fff;
          }

          .action-button.exam-result {
            background-color: #ec4899;
            color: #fff;
          }

          .action-button.complete {
            background-color: #f97316;
            color: #fff;
          }

          .action-button.detail:hover {
            background-color: #2563eb;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          }

          .action-button.medical-record:hover {
            background-color: #7c3aed;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          }

          .action-button.exam-result:hover {
            background-color: #db2777;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          }

          .action-button.complete:hover {
            background-color: #ea580c;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          }
        `}
      </style>
      {renderTable(filteredAppointments[statusFilter], 
        statusFilter === "pending" 
          ? "Danh sách chờ duyệt" 
          : statusFilter === "confirmed" 
          ? "Danh sách đã nhận" 
          : "Danh sách đã khám xong", 
        statusFilter)}
    </>
  );
};

export default AppointmentList;