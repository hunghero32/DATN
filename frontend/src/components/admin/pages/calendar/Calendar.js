import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Modal, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarPage = () => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Họp nhóm', start: '2025-02-26T09:00:00', end: '2025-02-26T12:00:00', color: 'blue' },
    { id: 2, title: 'Sinh nhật', start: '2025-02-28', color: 'orange' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', start: new Date(), end: new Date() });

  const handleDateClick = (info) => {
    setNewEvent({ ...newEvent, start: new Date(info.dateStr), end: new Date(info.dateStr) });
    setShowModal(true);
  };

  const handleSaveEvent = () => {
    if (newEvent.title) {
      setEvents([...events, { id: events.length + 1, ...newEvent }]);
    }
    setShowModal(false);
    setNewEvent({ title: '', start: new Date(), end: new Date() });
  };

  return (
    <div className="container mt-5 d-flex">
      {/* Sidebar */}
      <div className="d-flex flex-column gap-3 ">
        <div className="border p-4 shadow-sm rounded bg-white">
          <h5 className="mb-3 border rounded shadow-sm p-3 bg-white">📅 Tháng {new Date().getMonth() + 1}, {new Date().getFullYear()}</h5>
          <DatePicker selected={newEvent.start} onChange={(date) => setNewEvent({ ...newEvent, start: date })} inline />
        </div>
        <div className="p-4 shadow-sm rounded bg-white">
          <h6>📂 Phân loại</h6>
          <ul className="list-unstyled">
            <li>📌 Họp nhóm</li>
            <li>✈️ Công tác</li>
            <li>🏠 Việc cá nhân</li>
            <li>📅 Dự án nhóm</li>
          </ul>
        </div>
        <div className="p-4 shadow-sm rounded bg-white">
          <h6>📋 Lịch trình hôm nay</h6>
          <p>🎨 Thiết kế web 09:00 - 12:00</p>
        </div>
      </div>
      
      {/* Main Calendar */}
      <div className="flex-grow-1 ms-4">
        <div className="border rounded shadow-sm p-3 bg-white">
        <h2 className="text-center mb-4">📆 Lịch sự kiện</h2>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrapPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            editable={true}
            themeSystem="bootstrap5"
            events={events}
            dateClick={handleDateClick}
          />
        </div>
      </div>

      {/* Modal thêm sự kiện */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>📌 Thêm sự kiện</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>📍 Tiêu đề</Form.Label>
              <Form.Control type="text" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>📅 Ngày bắt đầu - Ngày kết thúc</Form.Label>
              <div className="d-flex gap-2">
                <DatePicker selected={newEvent.start} onChange={(date) => setNewEvent({ ...newEvent, start: date })} className="form-control" />
                <DatePicker selected={newEvent.end} onChange={(date) => setNewEvent({ ...newEvent, end: date })} className="form-control" />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            ❌ Hủy
          </Button>
          <Button variant="primary" onClick={handleSaveEvent}>
            💾 Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CalendarPage;
