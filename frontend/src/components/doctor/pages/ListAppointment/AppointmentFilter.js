import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Button } from "react-bootstrap";

const AppointmentFilter = ({ date, setDate, statusFilter, setStatusFilter }) => {
  return (
    <Form className="d-flex align-items-center mb-4">
      <div className="me-3">
        <DatePicker
          selected={date}
          onChange={(newDate) => setDate(newDate)}
          className="form-control"
          dateFormat="dd/MM/yyyy"
          placeholderText="Chọn ngày"
        />
      </div>
      <div className="me-3">
        <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
        </Form.Select>
      </div>
      <Button variant="primary">Tìm kiếm</Button>
    </Form>
  );
};

export default AppointmentFilter;