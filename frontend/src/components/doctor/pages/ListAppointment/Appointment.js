import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Button, Table, Form, Modal, Nav, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Appointment = () => {
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [activeTab, setActiveTab] = useState("send");
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/doctor/bookings", {
          headers: {
            Authorization: `Bearer SUwjNXVyzhC0fhrpNXEFQ8dY5RWGCulmcNfcXsj8f34ff3c4`,
          },
        });

        // Chỉ giữ lại các cuộc hẹn có trạng thái "pending"
        const pendingAppointments = response.data.data.filter(
          (appointment) => appointment.status === "pending"
        );

        setAppointments(pendingAppointments);
      } catch (error) {
        setError("Lỗi khi tải dữ liệu");
      }
      setLoading(false);
    };

    fetchAppointments();
  }, []);

  // Xử lý xác nhận nhận bệnh
  const handleAcceptAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowConfirmModal(true);
  };

  const handleConfirmAccept = async () => {
    if (!selectedAppointment) return;
  
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/doctor/bookings/${selectedAppointment.id}`,
        { status: "confirmed" },
        {
          headers: {
            Authorization: `Bearer SUwjNXVyzhC0fhrpNXEFQ8dY5RWGCulmcNfcXsj8f34ff3c4`,
          },
        }
      );
  
      // Cập nhật danh sách
      setAppointments((prev) => prev.filter((app) => app.id !== selectedAppointment.id));
      setAcceptedAppointments((prev) => [...prev, { ...selectedAppointment, status: "confirmed" }]);
  
      alert(`${selectedAppointment.guest?.guest_name} đã được nhận.`);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      alert("Lỗi khi cập nhật trạng thái.");
    } finally {
      setShowConfirmModal(false);
    }
  };
  

  const handleShowDetail = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };
  
  return (
    <div className="container mt-5 table-responsive">

      <div className="card p-4">
        <h5 className="mb-3 text-primary">Danh sách chờ duyệt</h5>
        <Form className="d-flex align-items-center mb-4">
          <div className="me-3">
            <DatePicker
              selected={date}
              onChange={(newDate) => setDate(newDate)}
              className="form-control"
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <Button variant="primary">Tìm kiếm</Button>
        </Form>
        {loading ? (
          <Spinner animation="border" />
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : appointments.length === 0 ? (
          <p className="text-muted">Không có cuộc hẹn nào đang chờ xác nhận.</p>
        ) : (
          <Table striped bordered hover className="table-sm">
            <thead>
              <tr>
                <th>Thời gian</th>
                <th>Ngày</th>
                <th>Người đặt</th>
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
                    <span className="badge bg-warning">Pending</span>
                  </td>
                  <td>
                    <Button
                      variant="info"
                      className="me-2"
                      onClick={() => handleShowDetail(app)}
                    >
                      Detail
                    </Button>
                    <Button variant="primary" className="me-2" onClick={() => setShowInvoiceModal(true)}>
                      Send Invoice
                    </Button>
                    <Button
                      variant="success"
                      className="me-2"
                      onClick={() => handleAcceptAppointment(app)}
                    >
                      Nhận Bệnh
                    </Button>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>

      {/* Modal Chi Tiết */}
      

      {/* Modal Xác Nhận Nhận Bệnh */}
      

      {/* Modal Gửi Hóa Đơn */}
      
    </div>
  );
};

export default Appointment;
