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
      : '',
    category_id: post?.category_id || '',
    user_id: post?.user_id || userId || '',
    image: post?.image || null, // Thêm trường image
  });

  useEffect(() => {
    setFormData({
      title: post?.title || '',
      content: post?.content || '',
      status: post?.status || 'draft',
      published_at: post?.published_at
        ? new Date(post.published_at).toISOString().split('T')[0]
        : '',
      category_id: post?.category_id || '',
      user_id: post?.user_id || userId || '',
      image: post?.image || null, // Cập nhật khi post thay đổi
    });
  }, [post, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (value) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file || null }));
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.category_id || !formData.user_id) {
      alert('Vui lòng điền đầy đủ các trường bắt buộc (Tiêu đề, Nội dung, Danh mục)!');
      return;
    }

    const submissionData = {
      ...formData,
      slug: generateSlug(formData.title),
      published_at: formData.published_at || null,
    };

    onSubmit(submissionData);
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }, { font: ['anointing'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link', 'image',
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
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Tiêu đề <span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nội dung <span style={{ color: 'red' }}>*</span></Form.Label>
                <ReactQuill
                  value={formData.content}
                  onChange={handleContentChange}
                  modules={quillModules}
                  formats={quillFormats}
                  style={{ height: '400px', marginBottom: '50px' }}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Slug (tự tạo)</Form.Label>
                <Form.Control
                  type="text"
                  value={generateSlug(formData.title)}
                  readOnly
                  style={{ backgroundColor: '#f1f1f1', borderColor: '#ced4da' }}
                />
                <Form.Text className="text-muted">
                  Slug sẽ tự động tạo từ tiêu đề.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Ảnh bài viết</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {formData.image && (
                  <img
                    src={
                      typeof formData.image === 'string'
                        ? `http://127.0.0.1:8000/storage/${formData.image}` // Thêm base URL nếu backend trả về đường dẫn tương đối
                        : URL.createObjectURL(formData.image)
                    }
                    alt="Preview"
                    style={{ maxWidth: '100%', marginTop: '10px' }}
                    onError={(e) => console.log('Lỗi tải ảnh preview:', e)} // Debug lỗi
                  />
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Trạng thái</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="draft">Nháp</option>
                  <option value="published">Đã đăng</option>
                  <option value="archived">Đã lưu trữ</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Ngày xuất bản (không bắt buộc)</Form.Label>
                <Form.Control
                  type="date"
                  name="published_at"
                  value={formData.published_at}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Danh mục <span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name || `Danh mục ${category.id}`}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="primary" type="submit" style={{ borderRadius: "8px" }}>
              {post ? 'Cập nhật' : 'Tạo mới'}
            </Button>
            <Button variant="secondary" onClick={onCancel} style={{ borderRadius: "8px" }}>
              Hủy
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PostForm;