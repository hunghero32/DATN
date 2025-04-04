import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Container, Alert, Spinner } from 'react-bootstrap';

const TestExamResult = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [diagnosis, setDiagnosis] = useState('');
  const [prescription, setPrescription] = useState('');
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://127.0.0.1:8000/api/doctor/bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(response.data.data || []);
    } catch (error) {
      setError('Lỗi khi tải danh sách cuộc hẹn');
    }
  };

  // Fetch exam result for selected appointment
  const handleShowExamResult = async (appointment) => {
    if (!appointment) return;
    
    setSelectedAppointment(appointment);
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(
        `http://127.0.0.1:8000/api/doctor/results/booking/${appointment.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Accept': 'application/json',
            "Cache-Control": "no-cache"
          },
        }
      );

      if (response.data) {
        console.log("Fetched exam result:", response.data);
        setDiagnosis(response.data.diagnosis || '');
        setNotes(response.data.note || '');
        setPrescription(response.data.prescription || '');
        setFile(response.data.file || null);
      }
    } catch (error) {
      console.error("Error fetching exam result:", error);
      setError('Lỗi khi tải kết quả khám');
    } finally {
      setLoading(false);
    }
  };

  // Update exam result
  const handleUpdateExamResult = async () => {
    if (!selectedAppointment) {
      setError('Vui lòng chọn một cuộc hẹn');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('authToken');
      
      // Tạo object data thay vì FormData
      const data = {
        diagnosis: diagnosis.trim(),
        prescription: prescription.trim(),
        note: notes.trim(),
        booking_id: selectedAppointment.id
      };

      console.log("Sending data:", data);

      // Gửi request cập nhật với JSON
      const updateResponse = await axios({
        method: 'put',
        url: `http://127.0.0.1:8000/api/doctor/results/booking/${selectedAppointment.id}`,
        data: data,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log("Update response:", updateResponse.data);

      // Cập nhật state với dữ liệu mới
      if (updateResponse.data && updateResponse.data.data) {
        const newData = updateResponse.data.data;
        setDiagnosis(newData.diagnosis || '');
        setNotes(newData.note || '');
        setPrescription(newData.prescription || '');
        setFile(newData.file || null);
        
        // Hiển thị thông báo thành công
        alert('Cập nhật thành công!');
      } else {
        // Nếu không có data trong response, fetch lại dữ liệu mới
        const getResponse = await axios.get(
          `http://127.0.0.1:8000/api/doctor/results/booking/${selectedAppointment.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Accept': 'application/json'
            }
          }
        );

        if (getResponse.data) {
          console.log("Fetched updated data:", getResponse.data);
          setDiagnosis(getResponse.data.diagnosis || '');
          setNotes(getResponse.data.note || '');
          setPrescription(getResponse.data.prescription || '');
          setFile(getResponse.data.file || null);
          
          // Hiển thị thông báo thành công
          alert('Cập nhật thành công!');
        }
      }

    } catch (error) {
      console.error("Error updating exam result:", error.response || error);
      setError(error.response?.data?.message || 'Lỗi khi cập nhật kết quả khám');
      alert('Có lỗi xảy ra khi cập nhật kết quả!');
    } finally {
      setLoading(false);
    }
  };

  // Thêm hàm refresh data
  const refreshData = async () => {
    if (!selectedAppointment) return;

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(
        `http://127.0.0.1:8000/api/doctor/results/booking/${selectedAppointment.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Accept': 'application/json'
          }
        }
      );

      if (response.data) {
        console.log("Refreshed data:", response.data);
        setDiagnosis(response.data.diagnosis || '');
        setNotes(response.data.note || '');
        setPrescription(response.data.prescription || '');
        setFile(response.data.file || null);
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  // Thêm useEffect để tự động refresh khi component mount hoặc selectedAppointment thay đổi
  useEffect(() => {
    if (selectedAppointment) {
      refreshData();
    }
  }, [selectedAppointment]);

  return (
    <Container className="mt-4">
      <h2>Test Cập Nhật Kết Quả Khám</h2>
      
      {/* Appointment Selection */}
      <Form.Group className="mb-3">
        <Form.Label>Chọn cuộc hẹn:</Form.Label>
        <Form.Select 
          onChange={(e) => {
            const appointment = appointments.find(a => a.id === parseInt(e.target.value));
            if (appointment) handleShowExamResult(appointment);
          }}
        >
          <option value="">-- Chọn cuộc hẹn --</option>
          {appointments.map(app => (
            <option key={app.id} value={app.id}>
              {app.guest?.guest_name} - {app.booking_date} {app.booking_time}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Exam Result Form */}
      <Form className="mt-4">
        <Form.Group className="mb-3">
          <Form.Label>Chẩn đoán:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Đơn thuốc:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ghi chú:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tệp đính kèm:</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {file && typeof file === "string" && (
            <div className="mt-2">
              <a
                href={`http://127.0.0.1:8000/storage/${file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary btn-sm"
              >
                Xem tệp hiện tại
              </a>
            </div>
          )}
        </Form.Group>

        <Button
          variant="primary"
          onClick={handleUpdateExamResult}
          disabled={loading || !selectedAppointment}
        >
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Đang cập nhật...
            </>
          ) : (
            'Cập nhật kết quả'
          )}
        </Button>
      </Form>

      {/* Debug Info */}
      <div className="mt-4">
        <h4>Debug Info:</h4>
        <pre>
          {JSON.stringify({
            selectedAppointment: selectedAppointment?.id,
            diagnosis,
            prescription,
            notes,
            file: file instanceof File ? file.name : file
          }, null, 2)}
        </pre>
      </div>
    </Container>
  );
};

export default TestExamResult; 