import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const PostForm = ({ post, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || '',
    status: post?.status || 'Đã đăng',
    published_at: post?.published_at || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal show onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{post ? 'Sửa bài viết' : 'Tạo bài viết mới'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tiêu đề</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nội dung</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Trạng thái</Form.Label>
            <Form.Select name="status" value={formData.status} onChange={handleChange}>
              <option value="Đã đăng">Đã đăng</option>
              <option value="Cao">Cao</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ngày xuất bản</Form.Label>
            <Form.Control
              type="date"
              name="published_at"
              value={formData.published_at}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {post ? 'Cập nhật' : 'Tạo mới'}
          </Button>
          <Button variant="secondary" onClick={onCancel} className="ms-2">
            Hủy
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PostForm;