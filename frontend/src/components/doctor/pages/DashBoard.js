import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line, Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Container, Row, Col, Card, Table, Badge } from 'react-bootstrap';
import { FaUserMd, FaCalendarCheck, FaClipboardList, FaChartLine, FaDollarSign, FaCalendarAlt } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
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
    pending_appointments: 0,
    confirmed_appointments: 0,
    total_pending_and_confirmed: 0,
    days_off: 0,
    available_slots: 0,
    appointments_by_status: {},
    patients_by_month: {},
    appointments_by_day: {},
    patients_today: [],
    today_appointments_count: 0,
    upcoming_appointments: [],
    completed_appointments_list: [],
    monthly_earnings: 0,
    total_earnings: 0,
  });

  const [systemInfo, setSystemInfo] = useState({
    site_name: "",
    site_logo: "",
    site_favicon: "",
    site_description: "",
  });

  const [doctorInfo, setDoctorInfo] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const getAuthToken = () => localStorage.getItem("authToken");

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return "Chào buổi sáng";
    if (hour >= 11 && hour < 13) return "Chào buổi trưa";
    if (hour >= 13 && hour < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
  };

  // Format currency for Vietnamese Dong (VND)
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  // Format date and time
  const formatDateTime = (date) => {
    return format(date, "EEEE, 'ngày' dd 'tháng' MM 'năm' yyyy, HH:mm", { locale: vi });
  };

  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), 'dd/MM/yyyy', { locale: vi });
    } catch (error) {
      return 'N/A';
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    try {
      return format(parseISO(`2025-01-01T${timeString}`), 'HH:mm', { locale: vi });
    } catch (error) {
      return timeString;
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchSystemInfo = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/system");
        setSystemInfo(response.data);
      } catch (error) {
        console.error("Lỗi khi tải thông tin hệ thống:", error);
        toast.error("Không thể tải thông tin hệ thống.", { toastId: "system-info-error" });
      }
    };

    const fetchDoctorInfo = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          toast.error("Vui lòng đăng nhập để tiếp tục.", { toastId: "auth-error" });
          return;
        }
        const response = await axios.get('http://127.0.0.1:8000/api/doctor/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
        setDoctorInfo(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin bác sĩ:', error);
        toast.error("Không thể tải thông tin bác sĩ.", { toastId: "doctor-info-error" });
      }
    };

    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const token = getAuthToken();
        if (!token) {
          toast.error("Vui lòng đăng nhập để tiếp tục.", { toastId: "auth-error" });
          return;
        }
        const response = await axios.get("http://127.0.0.1:8000/api/doctor/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        if (response.data.success) {
          setDashboardData(response.data.data);
        } else {
          throw new Error(response.data.message || "Không thể tải dữ liệu dashboard.");
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu bảng điều khiển:", error);
        toast.error(error.message || "Không thể tải dữ liệu dashboard.", { toastId: "dashboard-error" });
      } finally {
        setLoading(false);
      }
    };

    fetchSystemInfo();
    fetchDoctorInfo();
    fetchDashboardData();

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Prepare data for the Patients by Month chart (Line chart)
  const patientsByMonthData = {
    labels: [
      "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
      "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
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
    labels: ["Đã hoàn thành", "Đã xác nhận", "Đang chờ xử lý"],
    datasets: [
      {
        label: "Trạng thái lịch hẹn",
        data: [
          dashboardData.appointments_by_status?.completed || 0,
          dashboardData.appointments_by_status?.confirmed || 0,
          dashboardData.appointments_by_status?.pending || 0,
        ],
        backgroundColor: [
          "rgba(16, 185, 129, 0.6)",  // Green for completed
          "rgba(59, 130, 246, 0.6)",  // Blue for confirmed
          "rgba(245, 158, 11, 0.6)",  // Amber for pending
        ],
        borderColor: [
          "rgba(16, 185, 129, 1)",
          "rgba(59, 130, 246, 1)",
          "rgba(245, 158, 11, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for Appointments by Day in Current Month (Bar chart)
  const appointmentsByDayData = {
    labels: Object.keys(dashboardData.appointments_by_day).map(date =>
      format(parseISO(date), 'dd/MM', { locale: vi })
    ),
    datasets: [
      {
        label: "Số lịch hẹn mỗi ngày",
        data: Object.values(dashboardData.appointments_by_day).map(day => day.total || 0),
        backgroundColor: "rgba(59, 130, 246, 0.6)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container fluid className="dashboard-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <style>
        {`
          .dashboard-container {
            padding: 2rem;
            margin-top: 70px;
            background-color: #f8fafc;
            min-height: 100vh;
          }

          .dashboard-card {
            background: white;
            border-radius: 15px;
            border: none;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
            height: 100%;
            min-height: 140px;
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

          .card-icon.earnings {
            background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
            color: white;
          }

          .card-icon.days-off {
            background: linear-gradient(135deg, #f87171 0%, #dc2626 100%);
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

          .welcome-section {
            background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%);
            border-radius: 16px;
            padding: 28px;
            margin-bottom: 24px;
            color: white;
          }

          .welcome-title {
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 12px;
          }

          .welcome-subtitle {
            font-size: 16px;
            opacity: 0.9;
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .welcome-datetime {
            font-size: 15px;
            opacity: 0.8;
            margin-top: 4px;
          }

          .stats-row {
            margin-top: -60px;
          }

          .chart-card {
            background: white;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            padding: 1.5rem;
            margin-bottom: 1.5rem;
          }

          .chart-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 1rem;
          }

          .table-responsive {
            max-height: 300px;
            overflow-y: auto;
          }

          .table th, .table td {
            vertical-align: middle;
            font-size: 14px;
          }

          .badge {
            padding: 0.5em 1em;
            font-size: 12px;
            border-radius: 12px;
          }

          .badge.bg-pending {
            background-color: #fef3c7;
            color: #d97706;
          }

          .badge.bg-confirmed {
            background-color: #d1fae5;
            color: #059669;
          }

          .badge.bg-examining {
            background-color: #fee2e2;
            color: #ef4444;
          }
        `}
      </style>

      <div className="welcome-section">
        <h1 className="welcome-title">
          {getGreeting()}, {doctorInfo?.first_name || "Bác sĩ"}!
        </h1>
        <div className="welcome-subtitle">
          <div>Chào mừng bạn đến với {systemInfo.site_name || "Quick Care"}</div>
          <div className="welcome-datetime">
            Hôm nay là {formatDateTime(currentDateTime)}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Statistics Cards */}
          <Row className="g-4 stats-row">
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
                  <div className="stat-value">{dashboardData.total_pending_and_confirmed}</div>
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

            <Col lg={3} sm={6}>
              <Card className="dashboard-card h-100">
                <Card.Body>
                  <div className="card-icon earnings">
                    <FaDollarSign />
                  </div>
                  <div className="stat-title">Doanh Thu Tháng</div>
                  <div className="stat-value">{formatCurrency(dashboardData.monthly_earnings)}</div>
                  <div className="stat-description">Tổng doanh thu tháng này</div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={3} sm={6}>
              <Card className="dashboard-card h-100">
                <Card.Body>
                  <div className="card-icon earnings">
                    <FaDollarSign />
                  </div>
                  <div className="stat-title">Tổng Doanh Thu</div>
                  <div className="stat-value">{formatCurrency(dashboardData.total_earnings)}</div>
                  <div className="stat-description">Tổng doanh thu từ trước đến nay</div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={3} sm={6}>
              <Card className="dashboard-card h-100">
                <Card.Body>
                  <div className="card-icon days-off">
                    <FaCalendarAlt />
                  </div>
                  <div className="stat-title">Ngày Nghỉ</div>
                  <div className="stat-value">{dashboardData.days_off}</div>
                  <div className="stat-description">Số ngày nghỉ trong tháng này</div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={3} sm={6}>
              <Card className="dashboard-card h-100">
                <Card.Body>
                  <div className="card-icon appointments">
                    <FaCalendarCheck />
                  </div>
                  <div className="stat-title">Khung Giờ Trống</div>
                  <div className="stat-value">{dashboardData.available_slots}</div>
                  <div className="stat-description">Số khung giờ trống trong tháng</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Charts and Tables */}
          <div className="content-inner container-fluid pb-0" style={{ padding: "20px" }}>
            {/* Appointments by Status and Patients Today */}
            <Row className="g-4">
              <Col lg={4}>
                <div className="chart-card">
                  <h4 className="chart-title">Trạng thái lịch hẹn</h4>
                  <div style={{ height: "250px" }}>
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
              </Col>

              <Col lg={8}>
                <div className="chart-card">
                  <h4 className="chart-title">Bệnh nhân hôm nay</h4>
                  <div className="table-responsive">
                    <Table striped hover>
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
                    </Table>
                  </div>
                </div>
              </Col>
            </Row>

            {/* Patients by Month and Appointments by Day */}
            <Row className="g-4">
              <Col lg={6}>
                <div className="chart-card">
                  <h4 className="chart-title">Bệnh nhân theo tháng</h4>
                  <div style={{ height: "300px" }}>
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
                            beginAtZero: true,
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </Col>

              <Col lg={6}>
                <div className="chart-card">
                  <h4 className="chart-title">Lịch hẹn theo ngày (Tháng này)</h4>
                  <div style={{ height: "300px" }}>
                    <Bar
                      data={appointmentsByDayData}
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
                            beginAtZero: true,
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </Col>
            </Row>

            {/* Upcoming and Completed Appointments */}
            <Row className="g-4">
              <Col lg={6}>
                <div className="chart-card">
                  <h4 className="chart-title">Lịch hẹn sắp tới</h4>
                  <div className="table-responsive">
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th>Ngày</th>
                          <th>Thời gian</th>
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
                              <td>{formatDate(appointment.booking_date)}</td>
                              <td>{formatTime(appointment.booking_time)}</td>
                              <td>{appointment.guest?.guest_name || "Chưa xác định"}</td>
                              <td>{appointment.guest?.guest_phone || "N/A"}</td>
                              <td>{appointment.service?.services_name || "N/A"}</td>
                              <td>
                                <Badge
                                  className={`bg-${appointment.status}`}
                                >
                                  {appointment.status === "confirmed" ? "Đã xác nhận" :
                                   appointment.status === "pending" ? "Đang chờ xử lý" :
                                   appointment.status === "examining" ? "Đang khám" : "N/A"}
                                </Badge>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="text-center">
                              Không có lịch hẹn sắp tới
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </Col>

              <Col lg={6}>
                <div className="chart-card">
                  <h4 className="chart-title">Lịch hẹn đã hoàn thành</h4>
                  <div className="table-responsive">
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th>Ngày</th>
                          <th>Thời gian</th>
                          <th>Họ tên</th>
                          <th>Số điện thoại</th>
                          <th>Dịch vụ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboardData.completed_appointments_list.length > 0 ? (
                          dashboardData.completed_appointments_list.map((appointment, index) => (
                            <tr key={index}>
                              <td>{formatDate(appointment.booking_date)}</td>
                              <td>{formatTime(appointment.booking_time)}</td>
                              <td>{appointment.guest?.guest_name || "Chưa xác định"}</td>
                              <td>{appointment.guest?.guest_phone || "N/A"}</td>
                              <td>{appointment.service?.services_name || "N/A"}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-center">
                              Không có lịch hẹn đã hoàn thành
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </>
      )}
    </Container>
  );
};

export default Dashboard;