import React from "react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { path: "/doctor/db", icon: "ri-hospital-fill", name: "Doctor Dashboard" },
  { path: "/doctor/doctor-services", icon: "ri-map-pin-user-line", name: "Danh sách Dịch Vụ" },
  { path: "/doctor/appointment", icon: "ri-map-pin-user-line", name: "Danh sách lịch khám" },
  { path: "/doctor/doctor-profile", icon: "ri-map-pin-user-line", name: "Hồ Sơ Bác Sĩ" },
  { path: "/doctor/invoices", icon: "ri-user-line", name: "Hoá đơn" },
  { path: "/doctor/schedule", icon: "ri-user-line", name: "lịch làm việc" },
  { path: "/doctor/posts", icon: "ri-message-fill", name: "Bài viết" },
];

const SideBar = () => {
  const location = useLocation();
 
  return (
    <aside className="sidebar sidebar-base sidebartab" id="first-tour">
      <div className="sidebar-header d-flex align-items-center justify-content-start">
      <Link to="/db" className="navbar-brand me-5 pt-3">
          <div className="logo-main">
            <img
              className="logo-normal img-fluid mb-3"
              src="https://templates.iqonic.design/xray-dist/html/assets/images/logo.png"
              height="30"
              alt={String("Logo")}
            />
            <span className="ms-2 brand-name">Doctor</span>
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
