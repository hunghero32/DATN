import { Route, Routes } from "react-router-dom";
import Footer from "../../components/doctor/Footer";
import Header from "../../components/doctor/Header";
import Dashboard from "../../components/doctor/pages/DashBoard";
import SideBar from "../../components/doctor/SideBar";
import { useEffect, useState } from "react";
import ListSchedule from "../../components/doctor/pages/Schedule/ListSchedule";
import HistoryDoctor from "../../components/doctor/pages/History/HistoryDoctor";
import DoctorSchedule from "../../components/doctor/pages/DoctorSchedule/DoctorSchedule";
import DoctorStatistics from "../../components/doctor/pages/DoctorStatistics/DoctorStatistics";
import NotificationPage from "../../components/doctor/pages/NotificationPage/NotificationPage";
import DoctorProfile from "../../components/doctor/pages/DoctorProfile/DoctorProfile";
import EditDoctorProfile from "../../components/doctor/pages/DoctorProfile/EditDoctorProfile";
import Appointment from "../../components/doctor/pages/ListAppointment/Appointment";
import DoctorServices from "../../components/doctor/pages/Services/DoctorServices";
import ReceivedAppointments from "../../components/doctor/pages/ListAppointment/ReceivedAppointments";
import CompletedAppointments from "../../components/doctor/pages/ListAppointment/CompletedAppointments";
import FillExaminationResult from "../../components/doctor/pages/ListAppointment/FillExaminationResult";

const DoctorLayout = () => {
  const [showModal, setShowModal] = useState(false);

  // Hàm đóng modal
  const handleClose = () => {
    setShowModal(false);
  };

  // Hàm gọi API lấy danh sách dịch vụ
  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services"); // Điều chỉnh API endpoint phù hợp
      const data = await response.json();
      console.log("Fetched services:", data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    const loadScript = (src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    };

    const loadCSS = (href) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    };

    const cssFiles = [
      "/admin/css/core/libs.min.css",
      "/admin/vendor/flaticon/css/flaticon.css",
      "/admin/vendor/font-awesome/css/font-awesome.min.css",
      "/admin/vendor/flatpickr/dist/flatpickr.min.css",
      "/admin/css/xray.min5438.css?v=1.2.0",
      "/admin/css/custom.min5438.css?v=1.2.0",
      "/admin/css/rtl.min5438.css?v=1.2.0",
      "/admin/fonts/remixicon.css",
      "/admin/vendor/dripicons/webfont/webfont.css",
      "/admin/vendor/ionicons/css/ionicons.min.css",
      "/admin/vendor/line-awesome/css/line-awesome.min.css",
      "/admin/vendor/phosphor-icons/Fonts/regular/style.css",
      "/admin/vendor/phosphor-icons/Fonts/duotone/style.css",
      "/admin/vendor/phosphor-icons/Fonts/fill/style.css",
      "/admin/vendor/fullcalendar/core/main.css",
      "/admin/vendor/fullcalendar/daygrid/main.css",
      "/admin/vendor/fullcalendar/timegrid/main.css",
      "/admin/vendor/fullcalendar/list/main.css",
    ];

    cssFiles.forEach(loadCSS);

    return () => {
      console.log("Cleanup function (optional)");
    };
  }, []);

  return (
    <div className="wrapper">
      <SideBar />
      <main className="main-content content-page">
        <Header />
        <Routes>
          <Route path="/db" element={<Dashboard />} />
          <Route
            path="/doctor-services"
            element={
              <DoctorServices show={showModal} onCloseModal={handleClose} onServiceAdded={fetchServices} />
            }
          />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/ReceivedAppointments" element={<ReceivedAppointments />} />
          <Route path="/CompletedAppointments" element={<CompletedAppointments />} />
          <Route path="/FillExaminationResult" element={<FillExaminationResult />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
          <Route path="/doctor-profile/edit/:id" element={<EditDoctorProfile />} />
          <Route path="/doctor-schedule" element={<DoctorSchedule />} />
          <Route path="/schedule" element={<ListSchedule />} />
          <Route path="/history-doctor" element={<HistoryDoctor />} />
          <Route path="/doctorstatistics" element={<DoctorStatistics />} />
          <Route path="/notificationpage" element={<NotificationPage />} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
};

export default DoctorLayout;
