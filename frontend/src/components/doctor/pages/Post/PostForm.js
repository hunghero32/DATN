import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const PostForm = ({ post, categories, userId, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || '',
    status: post?.status || 'draft',
    published_at: post?.published_at ? new Date(post.published_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    category_id: post?.category_id || '',
    slug: post?.slug || '',
    user_id: post?.user_id || userId || '', // Lấy user_id từ props hoặc post
  });

  useEffect(() => {
    setFormData({
      title: post?.title || '',
      content: post?.content || '',
      status: post?.status || 'draft',
      published_at: post?.published_at ? new Date(post.published_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      category_id: post?.category_id || '',
      slug: post?.slug || '',
      user_id: post?.user_id || userId || '', // Cập nhật user_id khi post hoặc userId thay đổi
    });
  }, [post, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kiểm tra dữ liệu trước khi gửi
    if (!formData.title || !formData.content || !formData.published_at || !formData.category_id || !formData.slug || !formData.user_id) {
      alert('Vui lòng điền đầy đủ các trường bắt buộc!');
      return;
    }
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
            <Form.Label>Slug <span style={{ color: 'red' }}>*</span></Form.Label>
            <Form.Control
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="Nhập slug (ví dụ: ten-bai-viet)"
              required
            />
            <Form.Text className="text-muted">
              Slug là đường dẫn thân thiện, không dấu, dùng để tạo URL (ví dụ: ten-bai-viet).
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nội dung <span style={{ color: 'red' }}>*</span></Form.Label>
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
              <option value="draft">Nháp</option>
              <option value="published">Đã đăng</option>
              <option value="archived">Đã lưu trữ</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ngày xuất bản <span style={{ color: 'red' }}>*</span></Form.Label>
            <Form.Control
              type="date"
              name="published_at"
              value={formData.published_at}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Danh mục <span style={{ color: 'red' }}>*</span></Form.Label>
            <Form.Select name="category_id" value={formData.category_id} onChange={handleChange} required>
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
          {/* Ẩn trường user_id vì lấy tự động từ token */}
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