import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { path: "/doctor", icon: "fa-solid fa-house-medical", name: "Doctor Dashboard" },
  { path: "/doctor/doctor-services", icon: "fa-solid fa-stethoscope", name: "Danh sách Dịch Vụ" },
  { path: "/doctor/appointment", icon: "fa-solid fa-calendar-check", name: "Danh sách lịch khám" },
  { path: "/doctor/invoices", icon: "fa-solid fa-file-invoice-dollar", name: "Hoá đơn" },
  { path: "/doctor/schedule", icon: "fa-solid fa-calendar-days", name: "Lịch làm việc" },
  { path: "/doctor/posts", icon: "fa-solid fa-newspaper", name: "Bài viết" },
];

const SideBar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        className="hamburger-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <i className={isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
      </button>

      <aside className={`sidebar sidebar-base ${isOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <Link to="/doctor" className="logo-main" onClick={() => setIsOpen(false)}>
            <div className="logo-icon">
              <i className="fa-solid fa-user-doctor"></i>
            </div>
            <span className="brand-name">Doctor</span>
          </Link>
        </div>

        <div className="sidebar-body">
          <ul className="navbar-nav">
            <li className="nav-item static-item">
              <span className="nav-link">Dashboard</span>
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