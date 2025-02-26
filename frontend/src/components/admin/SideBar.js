import React from "react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { path: "/admin/", icon: "ri-hospital-fill", name: "Doctor Dashboard" },
  { path: "/admin/doctor", icon: "ri-user-line", name: "Quản lí bác sĩ" },
  { path: "/admin/chat", icon: "ri-message-fill", name: "Tin Nhắn Khách Hàng" },
  { path: "/admin/booking", icon: "ri-calendar-todo-line", name: "Quản lí đặt lịch" },
  { path: "/admin/guest", icon: "ri-group-line", name: "Quản lí khách hàng" },
  { path: "/admin/calendar", icon: "ri-map-pin-user-line", name: "Quản lí lịch khám" },
  { path: "/admin/user", icon: "ri-map-pin-user-line", name: "Quản lí người dùng" },
  { path: "/admin/service", icon: "ri-tools-line", name: "Quản lí dịch vụ" },
  { path: "/admin/medical", icon: "ri-hospital-line", name: "Quản lí hồ sơ bệnh" },
  { path: "/admin/result", icon: "ri-file-list-line", name: "Quản lí kết quả khám" },
  { path: "/admin/schedule", icon: "ri-calendar-line", name: "Quản lí lịch làm việc" },
  { path: "/admin/specialty", icon: "ri-stethoscope-line", name: "Quản lí chuyên khoa" },
  { path: "/admin/notification", icon: "ri-notification-line", name: "Quản lí thông báo" },
  { path: "/admin/invoice", icon: "ri-bill-line", name: "Quản lí hoá đơn" },
];

const SideBar = () => {
  const location = useLocation();
 
  return (
    <aside className="sidebar sidebar-base sidebartab" id="first-tour">
      <div className="sidebar-header d-flex align-items-center justify-content-start">
      <Link to="/admin" className="navbar-brand me-5 pt-3">
          <div className="logo-main">
            <img
              className="logo-normal img-fluid mb-3"
              src="https://templates.iqonic.design/xray-dist/html/assets/images/logo.png"
              height="30"
              alt={String("Logo")}
            />
            <span className="ms-2 brand-name">Medicen</span>
          </div>
        </Link>
      </div>

      <div className="sidebar-body">
        <ul className="navbar-nav iq-main-menu">
          <li className="nav-item static-item">
            <span className="nav-link static-item disabled">Dashboard</span>
          </li>

          {menuItems.map(({ path, icon, name }) => (
            <li key={path} className="nav-item">
              <Link className={`nav-link ${location.pathname == path ? 'active' : ""}`}  to={path}>
                <i className={icon}></i>
                <span className="item-name">{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
