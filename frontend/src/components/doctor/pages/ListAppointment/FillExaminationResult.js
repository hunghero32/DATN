import React, { useState } from 'react';
import { Button, Form, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const FillExaminationResult = () => {
  const [formData, setFormData] = useState({
    diagnosis: '',
    prescription: '',
    notes: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Examination Result:', formData);
    navigate('/completed');
  };

  return (
    <Container className="mt-5">
      <Card className="p-4">
        <h3 className="mb-4">Điền Kết Quả Khám</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Chẩn đoán</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              name="diagnosis" 
              value={formData.diagnosis} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Đơn thuốc</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              name="prescription" 
              value={formData.prescription} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Ghi chú thêm</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={2} 
              name="notes" 
              value={formData.notes} 
              onChange={handleChange} 
            />
          </Form.Group>
          
          <Button variant="primary" type="submit">Lưu Kết Quả</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default FillExaminationResult;
