import React from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import DOMPurify from 'dompurify'; // Đảm bảo đã cài đặt dompurify

const PostDetail = ({ post, onClose }) => {
  const sanitizedContent = DOMPurify.sanitize(post.content);

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Chưa có dữ liệu';
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <Modal show onHide={onClose} size="xl" centered>
      <Modal.Header closeButton style={{ borderBottom: "none", backgroundColor: "#fff", padding: "20px 30px" }}>
        <Modal.Title style={{ color: "#2c3e50", fontSize: "28px", fontWeight: 600 }}>
          Chi Tiết Bài Viết
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "30px" }}>
        <Row>
          <Col md={8}>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#2c3e50", fontWeight: 500 }}>
                ID bài viết
              </Form.Label>
              <Form.Control
                type="text"
                value={post.id}
                readOnly
                style={{ borderRadius: "8px", borderColor: "#ced4da", backgroundColor: "#f8f9fa" }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#2c3e50", fontWeight: 500 }}>
                Tiêu đề
              </Form.Label>
              <Form.Control
                type="text"
                value={post.title}
                readOnly
                style={{ borderRadius: "8px", borderColor: "#ced4da", backgroundColor: "#f8f9fa" }}
              />
            </Form.Group>

            {post.image ? (
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#2c3e50", fontWeight: 500 }}>
                  Ảnh bài viết
                </Form.Label>
                <img
                  src={`http://127.0.0.1:8000/storage/${post.image}`} // Thêm base URL
                  alt={post.title}
                  style={{ maxWidth: '100%', borderRadius: '8px', marginTop: '10px' }}
                  onError={(e) => console.log('Lỗi tải ảnh:', e)} // Debug lỗi tải ảnh
                />
              </Form.Group>
            ) : (
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#2c3e50", fontWeight: 500 }}>
                  Ảnh bài viết
                </Form.Label>
                <p>Không có ảnh</p>
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#2c3e50", fontWeight: 500 }}>
                Nội dung
              </Form.Label>
              <div
                className="ql-editor"
                style={{
                  padding: '15px',
                  border: '1px solid #ced4da',
                  borderRadius: '8px',
                  backgroundColor: '#f8f9fa',
                  minHeight: '200px',
                  fontSize: '16px',
                  color: '#34495e',
                  lineHeight: '1.6',
                }}
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#2c3e50", fontWeight: 500 }}>
                Slug (URL thân thiện)
              </Form.Label>
              <Form.Control
                type="text"
                value={post.slug}
                readOnly
                style={{ borderRadius: "8px", borderColor: "#ced4da", backgroundColor: "#f8f9fa" }}
              />
              <Form.Text className="text-muted">
                URL thân thiện được tạo tự động từ tiêu đề.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#2c3e50", fontWeight: 500 }}>
                Lượt xem
              </Form.Label>
              <Form.Control
                type="text"
                value={post.views}
                readOnly
                style={{ borderRadius: "8px", borderColor: "#ced4da", backgroundColor: "#f8f9fa" }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#2c3e50", fontWeight: 500 }}>
                Trạng thái
              </Form.Label>
              <Form.Control
                type="text"
                value={post.status === 'published' ? 'Đã đăng' : post.status === 'archived' ? 'Đã lưu trữ' : post.status}
                readOnly
                style={{ borderRadius: "8px", borderColor: "#ced4da", backgroundColor: "#f8f9fa" }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#2c3e50", fontWeight: 500 }}>
                Ngày xuất bản
              </Form.Label>
              <Form.Control
                type="text"
                value={post.published_at}
                readOnly
                style={{ borderRadius: "8px", borderColor: "#ced4da", backgroundColor: "#f8f9fa" }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#2c3e50", fontWeight: 500 }}>
                Thời gian tạo
              </Form.Label>
              <Form.Control
                type="text"
                value={formatDateTime(post.created_at)}
                readOnly
                style={{ borderRadius: "8px", borderColor: "#ced4da", backgroundColor: "#f8f9fa" }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#2c3e50", fontWeight: 500 }}>
                Cập nhật gần nhất
              </Form.Label>
              <Form.Control
                type="text"
                value={formatDateTime(post.updated_at)}
                readOnly
                style={{ borderRadius: "8px", borderColor: "#ced4da", backgroundColor: "#f8f9fa" }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#2c3e50", fontWeight: 500 }}>
                Danh mục
              </Form.Label>
              <Form.Control
                type="text"
                value={post.category?.name || 'Không có danh mục'}
                readOnly
                style={{ borderRadius: "8px", borderColor: "#ced4da", backgroundColor: "#f8f9fa" }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer style={{ borderTop: "none", padding: "15px 30px" }}>
        <Button
          variant="secondary"
          onClick={onClose}
          className="hover-shadow"
          style={{
            borderRadius: "8px",
            transition: "all 0.3s",
            backgroundColor: "#6c757d",
            borderColor: "#6c757d",
            padding: "10px 25px",
            fontSize: "16px",
          }}
        >
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PostDetail;