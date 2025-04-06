import React from "react";
import { FaCalendarAlt, FaList } from "react-icons/fa";

const AppointmentFilter = ({ date, setDate }) => {
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (e) => {
    if (e.target.value) {
      const selectedDate = new Date(e.target.value);
      // Set time to start of day
      selectedDate.setHours(0, 0, 0, 0);
      setDate(selectedDate);
    }
  };

  const handleViewAll = () => {
    setDate(null);
  };

  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <div className="custom-input-group" style={{ width: '180px !important' }}>
        <div className="date-picker-container" style={{
          position: 'relative',
          width: '100%'
        }}>
          <FaCalendarAlt style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1,
            color: '#3b82f6',
            fontSize: '14px'
          }} />
          <input
            type="date"
            value={formatDate(date)}
            onChange={handleDateChange}
            className="custom-date-input"
          />
        </div>
      </div>
      <button
        onClick={handleViewAll}
        className="view-all-btn"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          padding: '7px 12px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: '500',
          transition: 'all 0.2s ease'
        }}
      >
        <FaList size={12} />
        Tất cả
      </button>
      <style>
        {`
          .custom-date-input {
            width: 100%;
            height: 35px;
            padding: 0.4rem 0.4rem 0.4rem 32px;
            font-size: 13px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            background-color: #fff;
            color: #374151;
            font-weight: 500;
            transition: all 0.2s ease;
            cursor: pointer;
          }

          .custom-date-input:hover {
            border-color: #3b82f6;
            box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
          }

          .custom-date-input:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
          }

          .view-all-btn:hover {
            background-color: #2563eb;
            box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
          }

          /* Tùy chỉnh calendar dropdown */
          .custom-date-input::-webkit-calendar-picker-indicator {
            background-color: transparent;
            padding: 5px;
            cursor: pointer;
            border-radius: 4px;
            margin-right: 2px;
            opacity: 0.7;
            filter: invert(0.8);
          }

          .custom-date-input::-webkit-calendar-picker-indicator:hover {
            opacity: 1;
            background-color: rgba(59, 130, 246, 0.1);
          }

          /* Ẩn border khi focus trên Chrome */
          .custom-date-input:focus-visible {
            outline: none;
          }
        `}
      </style>
    </div>
  );
};

export default AppointmentFilter;