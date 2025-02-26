import { Route, Routes } from "react-router-dom";
import Footer from "../../components/admin/Footer";
import Header from "../../components/admin/Header";
import Dashboard from "../../components/admin/pages/DashBoard";
import SideBar from "../../components/admin/SideBar";
import { useEffect } from "react";
import Chat from "../../components/admin/pages/Chat";
import ListUser from "../../components/admin/pages/User/ListUser";
import Calendar from "../../components/admin/pages/calendar/Calendar";
import ListDoctor from "../../components/admin/pages/Doctor/ListDoctor";
import ListService from "../../components/admin/pages/Service/ListService";
import ListMedical from "../../components/admin/pages/Medical/ListMedical";
import ListResult from "../../components/admin/pages/Result/ListResult";
import ListSchedule from "../../components/admin/pages/Schedule/ListSchedule";
import ListSpecialty from "../../components/admin/pages/Specialty/ListSpecialty";
import ListNotification from "../../components/admin/pages/Notification/ListNotification";
import ListInvoice from "../../components/admin/pages/Invoice/ListInvoice";
import FormUser from "../../components/admin/pages/User/FormUser";
import DoctorForm from "../../components/admin/pages/Doctor/DoctorForm";
import ServiceForm from "../../components/admin/pages/Service/ServiceForm";
import MedicalForm from "../../components/admin/pages/Medical/MedicalForm";
import ListBooking from "../../components/admin/pages/Booking/ListBooking";
import ResultForm from "../../components/admin/pages/Result/ResultForm";
import ScheduleForm from "../../components/admin/pages/Schedule/ScheduleForm";
import SpecialtyForm from "../../components/admin/pages/Specialty/SpecialtyForm";
import ListGuest from "../../components/admin/pages/Guest/ListGuest";
import GuestForm from "../../components/admin/pages/Guest/GuestForm";


const AdminLayout = () => {
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
      "/admin/vendor/dripicons/webfont/webfont.css",
      "/admin/vendor/ionicons/css/ionicons.min.css",
      "/admin/vendor/line-awesome/css/line-awesome.min.css",
      "/admin/vendor/phosphor-icons/Fonts/regular/style.css",
      "/admin/vendor/phosphor-icons/Fonts/duotone/style.css",
      "/admin/vendor/phosphor-icons/Fonts/fill/style.css",

    ];
    cssFiles.forEach(loadCSS);

    const jsFiles = [
      "/admin/js/core/libs.min.js",
      "/admin/vendor/flatpickr/dist/flatpickr.min.js",
      "/admin/js/plugins/flatpickr.js",
      "/admin/js/plugins/slider-tabs.js",
      "/admin/js/plugins/fslightbox.js",
      "/admin/js/echarts.min.js",
      "/admin/js/chart.js",
      "/admin/vendor/amcharts/core.js",
      "/admin/vendor/amcharts/charts.js",
      "/admin/vendor/amcharts/themes/animated.js",
      "/admin/vendor/lodash/lodash.min.js",
      "/admin/js/core/external.min.js",
      "/admin/js/iqonic-script/utility.min.js",
      "/admin/js/iqonic-script/setting.min.js",
      "/admin/js/iqonic-script/setting-init.js",
      "/admin/js/charts/dashboard5438.js",
      "/admin/js/xray5438.js",
      "/admin/js/xray-advance5438.js",
      "/admin/js/sidebar5438.js",
      "/admin/js/dashboard/doctor-dashboard5438.js",
      "/admin/js/dashboard/dashboard-25438.js",
      "/admin/js/dashboard/patient-dashboard5438.js",
      "/admin/js/dashboard/doctor-dashboard5438.js?v=1.2.0",
      "/admin/js/dashboard/dashboard-15438.js?v=1.2.0",
      "/admin/js/dashboard/dashboard-25438.js?v=1.2.0",
      "/admin/js/dashboard/patient-dashboard5438.js?v=1.2.0",
      "/admin/js/dashboard/covid19-dashboard5438.js?v=1.2.0",
      "/admin/js/dashboard/dashboard-25438.js?v=1.2.0",
      "/admin/js/table/edit-table.js",
      "/admin/js/Setting/enchanter.js",
      "/admin/js/sidebar5438.js?v=1.2.0",
      "/admin/vendor/fullcalendar/core/main.js",
      "/admin/vendor/fullcalendar/daygrid/main.js",
      "/admin/vendor/fullcalendar/timegrid/main.js",
      "/admin/vendor/fullcalendar/list/main.js",
      "/admin/vendor/fullcalendar/interaction/main.js",
      "/admin/vendor/moment.min.js",
      "/admin/js/plugins/calender.js",
      "/admin/js/sidebar5438.js?v=1.2.0",
    ];
    jsFiles.forEach(loadScript);

    return () => {
    };
  }, []);
  return (
    <div className="wrapper">
      <SideBar />
      <main className="main-content content-page ">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/doctor" element={<ListDoctor />} />
          <Route path="/doctor/create" element={<DoctorForm />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/booking" element={<ListBooking />} />
          <Route path="/guest" element={<ListGuest />} />
          <Route path="/guest/create" element={<GuestForm />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/user" element={<ListUser />} />
          <Route path="/user/create" element={<FormUser />} />
          <Route path="/user/edit/:id" element={<FormUser />} />
          <Route path="/service" element={<ListService />} />
          <Route path="/service/create" element={<ServiceForm />} />
          <Route path="/medical" element={<ListMedical />} />
          <Route path="/medical/create" element={<MedicalForm />} />
          <Route path="/result" element={<ListResult />} />
          <Route path="/result/create" element={<ResultForm />} />
          <Route path="/schedule" element={<ListSchedule />} />
          <Route path="/schedule/create" element={<ScheduleForm />} />
          <Route path="/specialty" element={<ListSpecialty />} />
          <Route path="/specialty/create" element={<SpecialtyForm />} />
          <Route path="/notification" element={<ListNotification />} />
          <Route path="/invoice" element={<ListInvoice />} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
};

export default AdminLayout;
