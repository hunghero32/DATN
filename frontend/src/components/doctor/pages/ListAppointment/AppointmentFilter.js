import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const AppointmentFilter = ({ date, setDate }) => {
  // Format the date to YYYY-MM-DD for the input type="date"
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    setDate(newDate);
  };

  return (
    <div className="custom-input-group">
      <input
        type="date"
        value={formatDate(date)}
        onChange={handleDateChange}
        className="custom-input"
      />
    </div>
  );
};

export default AppointmentFilter;