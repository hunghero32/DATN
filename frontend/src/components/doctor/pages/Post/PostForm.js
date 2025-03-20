import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PostForm = ({ post, categories, userId, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || '',
    status: post?.status || 'draft',
    published_at: post?.published_at
      ? new Date(post.published_at).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
    category_id: post?.category_id || '',
    slug: post?.slug || '',
    user_id: post?.user_id || userId || '',
  });

  useEffect(() => {
    setFormData({
      title: post?.title || '',
      content: post?.content || '',
      status: post?.status || 'draft',
      published_at: post?.published_at
        ? new Date(post.published_at).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      category_id: post?.category_id || '',
      slug: post?.slug || '',
      user_id: post?.user_id || userId || '',
    });
  }, [post, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (value) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.published_at || !formData.category_id || !formData.slug || !formData.user_id) {
      alert('Vui lòng điền đầy đủ các trường bắt buộc!');
      return;
    }
    onSubmit(formData);
  };

  // Cấu hình toolbar cho ReactQuill
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'link',
    'image',
  ];

  return (
    <Modal show onHide={onCancel} size="xl" centered>
      <Modal.Header closeButton style={{ borderBottom: "none", backgroundColor: "#fff" }}>
        <Modal.Title style={{ color: "#2c3e50" }}>
          {post ? 'Sửa Bài Viết' : 'Tạo Bài Viết Mới'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            {/* Cột chính: Tiêu đề và Nội dung */}
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#2c3e50", fontWeight: 500 }}>
                  Tiêu đề <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  style={{ borderRadius: "8px", borderColor: "#ced4da" }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#2c3e50", fontWeight: 500 }}>
                  Nội dung <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <ReactQuill
                  value={formData.content}
                  onChange={handleContentChange}
                  modules={quillModules}
                  formats={quillFormats}
                  style={{ height: '400px', marginBottom: '50px' }}
                />
              </Form.Group>
            </Col>

            {/* Cột phụ: Các thông tin khác */}
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#2c3e50", fontWeight: 500 }}>
                  Slug <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="Nhập slug (ví dụ: ten-bai-viet)"
                  required
                  style={{ borderRadius: "8px", borderColor: "#ced4da" }}
                />
                <Form.Text className="text-muted">
                  Slug là đường dẫn thân thiện, không dấu, dùng để tạo URL.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#2c3e50", fontWeight: 500 }}>
                  Trạng thái
                </Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  style={{ borderRadius: "8px", borderColor: "#ced4da" }}
                >
                  <option value="draft">Nháp</option>
                  <option value="published">Đã đăng</option>
                  <option value="archived">Đã lưu trữ</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#2c3e50", fontWeight: 500 }}>
                  Ngày xuất bản <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                  type="date"
                  name="published_at"
                  value={formData.published_at}
                  onChange={handleChange}
                  required
                  style={{ borderRadius: "8px", borderColor: "#ced4da" }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#2c3e50", fontWeight: 500 }}>
                  Danh mục <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  required
                  style={{ borderRadius: "8px", borderColor: "#ced4da" }}
                >
                  <option value="">Chọn danh mục</option>
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name || `Danh mục ${category.id}`}
                      </option>
                    ))
                  ) : (
                    <option disabled>Đang tải danh mục...</option>
                  )}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" hidden>
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  type="text"
                  name="user_id"
                  value={formData.user_id}
                  onChange={handleChange}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button
              variant="primary"
              type="submit"
              className="hover-shadow"
              style={{ borderRadius: "8px", transition: "all 0.3s" }}
            >
              {post ? 'Cập nhật' : 'Tạo mới'}
            </Button>
            <Button
              variant="secondary"
              onClick={onCancel}
              className="hover-shadow"
              style={{ borderRadius: "8px", transition: "all 0.3s" }}
            >
              Hủy
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PostForm;