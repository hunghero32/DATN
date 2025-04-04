import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaUserMd, FaCalendarCheck, FaClipboardList, FaChartLine } from 'react-icons/fa';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // State to hold the API data
  const [dashboardData, setDashboardData] = useState({
    total_patients: 0,
    monthly_patients: 0,
    total_appointments: 0,
    completed_appointments: 0,
    days_off: 0,
    available_slots: 0,
    appointments_by_status: {},
    patients_by_month: {},
    appointments_by_day: {},
    patients_today: [],
    upcoming_appointments: [],
    completed_appointments_list: [],
    totalAppointments: 0,
    pendingAppointments: 0,
    totalPatients: 0
  });

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/doctor/dashboard", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setDashboardData(response.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu bảng điều khiển:", error);
      }
    };

    fetchDashboardData();
  }, []);

  // Prepare data for the Patients by Month chart (Line chart)
  const patientsByMonthData = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Số bệnh nhân mỗi tháng",
        data: Array.from({ length: 12 }, (_, index) =>
          dashboardData.patients_by_month[index + 1] || 0
        ),
        borderColor: "rgba(52, 152, 219, 1)",
        backgroundColor: "rgba(52, 152, 219, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Prepare data for the Appointments by Status chart (Pie chart)
  const appointmentsByStatusData = {
    labels: ["Đã hoàn thành", "Đã xác nhận", "Đã hủy"],
    datasets: [
      {
        label: "Trạng thái lịch hẹn",
        data: [
          dashboardData.appointments_by_status?.completed || 0,
          dashboardData.appointments_by_status?.confirmed || 0,
          dashboardData.appointments_by_status?.canceled || 0,
        ],
        backgroundColor: [
          "rgba(255, 182, 193, 0.6)",
          "rgba(135, 206, 250, 0.6)",
          "rgba(255, 215, 0, 0.6)",
        ],
        borderColor: [
          "rgba(255, 182, 193, 1)",
          "rgba(135, 206, 250, 1)",
          "rgba(255, 215, 0, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container fluid className="py-4">
      <style>
        {`
          .dashboard-card {
            background: white;
            border-radius: 15px;
            border: none;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
          }

          .dashboard-card:hover {
            transform: translateY(-5px);
          }

          .card-icon {
            width: 60px;
            height: 60px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            margin-bottom: 1rem;
          }

          .card-icon.appointments {
            background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
            color: white;
          }

          .card-icon.completed {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
          }

          .card-icon.pending {
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            color: white;
          }

          .card-icon.patients {
            background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
            color: white;
          }

          .stat-title {
            color: #6b7280;
            font-size: 0.875rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .stat-value {
            color: #1f2937;
            font-size: 2rem;
            font-weight: 700;
            margin: 0.5rem 0;
          }

          .stat-description {
            color: #6b7280;
            font-size: 0.875rem;
          }

          .section-title {
            color: #1f2937;
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            padding-left: 1rem;
            border-left: 4px solid #0ea5e9;
          }
        `}
      </style>

      <h2 className="section-title">Tổng Quan</h2>

      <Row className="g-4">
        <Col lg={3} sm={6}>
          <Card className="dashboard-card h-100">
            <Card.Body>
              <div className="card-icon appointments">
                <FaCalendarCheck />
              </div>
              <div className="stat-title">Tổng Số Cuộc Hẹn</div>
              <div className="stat-value">{dashboardData.total_appointments}</div>
              <div className="stat-description">Tổng số cuộc hẹn đã đặt</div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} sm={6}>
          <Card className="dashboard-card h-100">
            <Card.Body>
              <div className="card-icon completed">
                <FaClipboardList />
              </div>
              <div className="stat-title">Đã Hoàn Thành</div>
              <div className="stat-value">{dashboardData.completed_appointments}</div>
              <div className="stat-description">Số cuộc hẹn đã hoàn thành</div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} sm={6}>
          <Card className="dashboard-card h-100">
            <Card.Body>
              <div className="card-icon pending">
                <FaChartLine />
              </div>
              <div className="stat-title">Đang Chờ</div>
              <div className="stat-value">{dashboardData.pendingAppointments}</div>
              <div className="stat-description">Số cuộc hẹn đang chờ xử lý</div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} sm={6}>
          <Card className="dashboard-card h-100">
            <Card.Body>
              <div className="card-icon patients">
                <FaUserMd />
              </div>
              <div className="stat-title">Tổng Số Bệnh Nhân</div>
              <div className="stat-value">{dashboardData.total_patients}</div>
              <div className="stat-description">Số bệnh nhân đã khám</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="content-inner container-fluid pb-0" id="page_layout" style={{ backgroundColor: "#f0f4f8", padding: "20px" }}>
        <div>
          {/* Thống kê phụ */}
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card shadow-sm hover-shadow" style={{ borderRadius: "10px", transition: "all 0.3s" }}>
                <div className="card-body text-center">
                  <h6 className="text-uppercase text-muted mb-2">Ngày nghỉ trong tháng</h6>
                  <h3 className="mb-0" style={{ color: "#3498db" }}>{dashboardData.days_off}</h3>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card shadow-sm hover-shadow" style={{ borderRadius: "10px", transition: "all 0.3s" }}>
                <div className="card-body text-center">
                  <h6 className="text-uppercase text-muted mb-2">Số khung giờ trống</h6>
                  <h3 className="mb-0" style={{ color: "#3498db" }}>{dashboardData.available_slots}</h3>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card shadow-sm hover-shadow" style={{ borderRadius: "10px", transition: "all 0.3s" }}>
                <div className="card-body text-center">
                  <h6 className="text-uppercase text-muted mb-2">Lịch hẹn hôm nay</h6>
                  <h3 className="mb-0" style={{ color: "#3498db" }}>{dashboardData.patients_today.length}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Biểu đồ trạng thái lịch hẹn và Bệnh nhân hôm nay */}
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card shadow-sm" style={{ borderRadius: "10px" }}>
                <div className="card-header" style={{ backgroundColor: "#fff", borderBottom: "none" }}>
                  <h4 className="card-title" style={{ color: "#2c3e50" }}>Trạng thái lịch hẹn</h4>
                </div>
                <div className="card-body" style={{ height: "250px" }}>
                  <Pie
                    data={appointmentsByStatusData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "top",
                          labels: {
                            font: { size: 12 },
                            color: "#2c3e50",
                          },
                        },
                        title: {
                          display: false,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-8 mb-4">
              <div className="card shadow-sm" style={{ borderRadius: "10px" }}>
                <div className="card-header" style={{ backgroundColor: "#fff", borderBottom: "none" }}>
                  <h4 className="card-title" style={{ color: "#2c3e50" }}>Bệnh nhân hôm nay</h4>
                </div>
                <div className="card-body">
                  <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th>Họ tên</th>
                          <th>Số điện thoại</th>
                          <th>Email</th>
                          <th>Dịch vụ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboardData.patients_today.length > 0 ? (
                          dashboardData.patients_today.map((patient, index) => (
                            <tr key={index}>
                              <td>{patient.guest?.guest_name || "Chưa xác định"}</td>
                              <td>{patient.guest?.guest_phone || "N/A"}</td>
                              <td>{patient.guest?.guest_email || "N/A"}</td>
                              <td>{patient.service?.services_name || "N/A"}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="text-center">
                              Không có bệnh nhân trong ngày hôm nay
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Biểu đồ bệnh nhân theo tháng */}
          <div className="row">
            <div className="col-12 mb-4">
              <div className="card shadow-sm" style={{ borderRadius: "10px" }}>
                <div className="card-header" style={{ backgroundColor: "#fff", borderBottom: "none" }}>
                  <h4 className="card-title" style={{ color: "#2c3e50" }}>Bệnh nhân theo tháng</h4>
                </div>
                <div className="card-body">
                  <Line
                    data={patientsByMonthData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "top",
                          labels: {
                            font: { size: 14 },
                            color: "#2c3e50",
                          },
                        },
                        title: {
                          display: false,
                        },
                      },
                      scales: {
                        x: {
                          ticks: { color: "#2c3e50" },
                          grid: { display: false },
                        },
                        y: {
                          ticks: { color: "#2c3e50" },
                          grid: { color: "rgba(0, 0, 0, 0.05)" },
                        },
                      },
                    }}
                    style={{ height: "300px" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Lịch hẹn sắp tới và Lịch hẹn đã hoàn thành */}
          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="card shadow-sm" style={{ borderRadius: "10px" }}>
                <div className="card-header" style={{ backgroundColor: "#fff", borderBottom: "none" }}>
                  <h4 className="card-title" style={{ color: "#2c3e50" }}>Lịch hẹn sắp tới</h4>
                </div>
                <div className="card-body">
                  <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th>Ngày</th>
                          <th>Họ tên</th>
                          <th>Số điện thoại</th>
                          <th>Dịch vụ</th>
                          <th>Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboardData.upcoming_appointments.length > 0 ? (
                          dashboardData.upcoming_appointments.map((appointment, index) => (
                            <tr key={index}>
                              <td>{appointment.booking_date}</td>
                              <td>{appointment.guest?.guest_name || "Chưa xác định"}</td>
                              <td>{appointment.guest?.guest_phone || "N/A"}</td>
                              <td>{appointment.service?.services_name || "N/A"}</td>
                              <td>
                                <span
                                  className={`badge ${
                                    appointment.status === "confirmed"
                                      ? "bg-success"
                                      : appointment.status === "canceled"
                                      ? "bg-danger"
                                      : "bg-warning"
                                  }`}
                                >
                                  {appointment.status === "confirmed" ? "Đã xác nhận" : 
                                   appointment.status === "canceled" ? "Đã hủy" : "Chờ xác nhận"}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-center">
                              Không có lịch hẹn sắp tới
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-4">
              <div className="card shadow-sm" style={{ borderRadius: "10px" }}>
                <div className="card-header" style={{ backgroundColor: "#fff", borderBottom: "none" }}>
                  <h4 className="card-title" style={{ color: "#2c3e50" }}>Lịch hẹn đã hoàn thành</h4>
                </div>
                <div className="card-body">
                  <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th>Ngày</th>
                          <th>Họ tên</th>
                          <th>Số điện thoại</th>
                          <th>Dịch vụ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboardData.completed_appointments_list.length > 0 ? (
                          dashboardData.completed_appointments_list.map((appointment, index) => (
                            <tr key={index}>
                              <td>{appointment.booking_date}</td>
                              <td>{appointment.guest?.guest_name || "Chưa xác định"}</td>
                              <td>{appointment.guest?.guest_phone || "N/A"}</td>
                              <td>{appointment.service?.services_name || "N/A"}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="text-center">
                              Không có lịch hẹn đã hoàn thành
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;