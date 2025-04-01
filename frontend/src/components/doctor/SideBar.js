import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { path: "/doctor", icon: "fa-solid fa-house-medical", name: "Doctor Dashboard" },
  { path: "/doctor/doctor-services", icon: "fa-solid fa-list-check", name: "Danh sách Dịch Vụ" },
  { path: "/doctor/appointment", icon: "fa-solid fa-calendar-check", name: "Danh sách lịch khám" },
  { path: "/doctor/invoices", icon: "fa-solid fa-file-invoice", name: "Hoá đơn" },
  { path: "/doctor/schedule", icon: "fa-solid fa-calendar-days", name: "Lịch làm việc" },
  { path: "/doctor/posts", icon: "fa-solid fa-comment-medical", name: "Bài viết" },
];

const SideBar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        className="hamburger-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className={isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
      </button>

      <aside className={`sidebar sidebar-base sidebartab ${isOpen ? 'active' : ''}`} id="first-tour">
        <div className="sidebar-header d-flex align-items-center justify-content-start">
          <Link to="/doctor" className="navbar-brand me-5 pt-3">
            <div className="logo-main">
              <img
                className="logo-normal img-fluid mb-3"
                src="https://templates.iqonic.design/xray-dist/html/assets/images/logo.png"
                height="30"
                alt="Logo"
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
                <Link 
                  className={`nav-link ${location.pathname === path ? 'active' : ""}`} 
                  to={path}
                  onClick={() => setIsOpen(false)}
                >
                  <i className={icon}></i>
                  <span className="item-name">{name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;