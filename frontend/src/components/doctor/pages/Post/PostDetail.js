import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PostDetail = ({ post, onClose }) => {
  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết bài viết</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>ID:</strong> {post.id}</p>
        <p><strong>Tiêu đề:</strong> {post.title}</p>
        <p><strong>Slug:</strong> {post.slug}</p>
        <p><strong>Nội dung:</strong> {post.content}</p>
        <p><strong>Lượt xem:</strong> {post.views}</p>
        <p><strong>Trạng thái:</strong> {post.status === 'published' ? 'Đã đăng' : post.status === 'archived' ? 'Đã lưu trữ' : post.status}</p>
        <p><strong>Ngày xuất bản:</strong> {post.published_at}</p>
        <p><strong>Danh mục:</strong> {post.category?.name || 'Không có danh mục'}</p>
        <p><strong>Người tạo:</strong> {post.user_id}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PostDetail;