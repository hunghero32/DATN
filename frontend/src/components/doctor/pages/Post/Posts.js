import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Pagination, Container, Row, Col, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostForm from './PostForm'; // Component để tạo/sửa bài viết
import PostDetail from './PostDetail'; // Component để xem chi tiết bài viết

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]); // Dữ liệu đã lọc để hiển thị
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('authToken');

  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/doctor',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
  });

  // Lấy danh sách bài viết
  useEffect(() => {
    if (!token) {
      setError('Vui lòng đăng nhập để truy cập danh sách bài viết.');
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await api.get(`/posts?page=${currentPage}&search=${search}&status=${status}`);
        setPosts(response.data.data.data || []); // Lấy mảng bài viết từ data.data
        setTotalPages(response.data.data.last_page || 1); // Lấy tổng số trang
        setError(null);
      } catch (error) {
        setError(error.response?.data?.message || 'Không thể tải danh sách bài viết.');
      }
    };

    fetchPosts();
  }, [currentPage, status, token]); // Loại bỏ `search` khỏi dependency vì sẽ lọc cục bộ

  // Lọc dữ liệu bài viết dựa trên giá trị search
  useEffect(() => {
    if (!search) {
      setFilteredPosts(posts); // Nếu không có từ khóa tìm kiếm, hiển thị toàn bộ dữ liệu
      return;
    }

    const lowerCaseSearch = search.toLowerCase();
    const filtered = posts.filter((post) => {
      return (
        String(post.id).toLowerCase().includes(lowerCaseSearch) || // Tìm kiếm theo ID
        (post.title?.toLowerCase() || '').includes(lowerCaseSearch) // Tìm kiếm theo tiêu đề
      );
    });

    setFilteredPosts(filtered);
  }, [posts, search]);

  // Tạo bài viết mới
  const handleCreate = async (formData) => {
    try {
      const response = await api.post('/posts', formData);
      setPosts((prev) => [response.data.data, ...prev]); // Thêm bài viết mới vào danh sách
      setShowForm(false);
      toast.success('Tạo bài viết thành công!');
    } catch (error) {
      setError('Lỗi khi tạo bài viết: ' + (error.response?.data?.message || error.message));
    }
  };

  // Cập nhật bài viết
  const handleUpdate = async (formData) => {
    try {
      const response = await api.put(`/posts/${selectedPost.id}`, formData);
      setPosts((prev) =>
        prev.map((post) => (post.id === response.data.data.id ? response.data.data : post))
      );
      setShowForm(false);
      setSelectedPost(null);
      toast.success('Cập nhật bài viết thành công!');
    } catch (error) {
      setError('Lỗi khi cập nhật bài viết: ' + (error.response?.data?.message || error.message));
    }
  };

  // Xóa bài viết
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      try {
        await api.delete(`/posts/${id}`);
        setPosts((prev) => prev.filter((post) => post.id !== id));
        toast.success('Xóa bài viết thành công!');
      } catch (error) {
        setError('Lỗi khi xóa bài viết: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  // Xem chi tiết bài viết
  const handleViewDetail = async (post) => {
    try {
      const response = await api.get(`/posts/${post.id}`);
      setSelectedPost(response.data.data); // Lấy dữ liệu chi tiết từ API
      setShowDetail(true);
    } catch (error) {
      setError('Lỗi khi xem chi tiết bài viết: ' + (error.response?.data?.message || error.message));
    }
  };

  // Chuyển trang
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Quản lý bài viết</h1>

      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      <Row className="mb-4 align-items-center">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Tìm kiếm (ID, tiêu đề)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Tất cả trạng thái</option>
            <option value="Đã đăng">Đã đăng</option>
            <option value="Cao">Cao</option>
          </Form.Select>
        </Col>
        <Col md={4} className="text-end">
          <Button variant="success" onClick={() => setShowForm(true)}>
            Tạo bài viết mới
          </Button>
        </Col>
      </Row>

      <div style={{ overflowX: 'auto' }}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th style={{ width: '5%' }}>ID</th>
              <th style={{ width: '25%' }}>Tiêu đề</th>
              <th style={{ width: '15%' }}>Ngày xuất bản</th>
              <th style={{ width: '15%' }}>Trạng thái</th>
              <th style={{ width: '15%' }}>Danh mục</th>
              <th style={{ width: '25%' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.published_at}</td>
                  <td>
                    <span
                      className={`badge ${
                        post.status === 'Đã đăng' ? 'bg-success' : 'bg-warning'
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td>{post.category?.name || 'Không có danh mục'}</td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      className="me-2"
                      onClick={() => handleViewDetail(post)}
                    >
                      Xem chi tiết
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setSelectedPost(post);
                        setShowForm(true);
                      }}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(post.id)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  Không có bài viết nào.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages).keys()].map((page) => (
            <Pagination.Item
              key={page + 1}
              active={page + 1 === currentPage}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>

      {showForm && (
        <PostForm
          post={selectedPost}
          onSubmit={selectedPost ? handleUpdate : handleCreate}
          onCancel={() => {
            setShowForm(false);
            setSelectedPost(null);
          }}
        />
      )}

      {showDetail && (
        <PostDetail
          post={selectedPost}
          onClose={() => {
            setShowDetail(false);
            setSelectedPost(null);
          }}
        />
      )}
    </Container>
  );
};

export default Posts;