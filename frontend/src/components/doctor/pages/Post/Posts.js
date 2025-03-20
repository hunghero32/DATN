import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Pagination, Container, Row, Col, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostForm from './PostForm';
import PostDetail from './PostDetail';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [userId, setUserId] = useState(null); // Lưu user_id của người dùng hiện tại

  const token = localStorage.getItem('authToken');

  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
  });

  // Lấy thông tin user từ token hoặc API
  const fetchUserInfo = async () => {
    if (token) {
      try {
        const response = await api.get('/user'); // Giả sử có endpoint /api/user để lấy thông tin người dùng
        setUserId(response.data.id); // Lấy user_id từ phản hồi
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
        setError('Không thể tải thông tin người dùng.');
      }
    }
  };

  const fetchPosts = async () => {
    if (!token) {
      setError('Vui lòng đăng nhập để truy cập danh sách bài viết.');
      return;
    }

    try {
      const response = await api.get('/doctor/posts', {
        params: {
          page: currentPage,
          search: search,
          status: status,
        },
      });
      setPosts(response.data.data.data || []);
      setTotalPages(response.data.data.last_page || 1);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || 'Không thể tải danh sách bài viết.');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data.data || response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách danh mục:', error);
      setError('Không thể tải danh sách danh mục: ' + (error.response?.data?.message || error.message));
    }
  };

  useEffect(() => {
    fetchUserInfo(); // Lấy user_id khi component mount
    fetchPosts();
    fetchCategories();
  }, [currentPage, search, status, token]);

  const handleCreate = async (formData) => {
    try {
      if (!userId) {
        setError('Không thể xác định người dùng hiện tại.');
        return;
      }

      const formattedData = {
        ...formData,
        user_id: userId, // Thêm user_id vào dữ liệu gửi lên
        published_at: `${formData.published_at} 00:00:00`,
      };
      const response = await api.post('/doctor/posts', formattedData);
      setPosts((prev) => [response.data.data, ...prev]);
      setShowForm(false);
      toast.success('Tạo bài viết thành công!');
      await fetchPosts();
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      setError(`Lỗi khi tạo bài viết: ${errorMessage}`);
      if (error.response?.data?.errors) {
        console.error('Chi tiết lỗi:', error.response.data.errors);
      }
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const formattedData = {
        ...formData,
        user_id: userId, // Đảm bảo user_id được giữ nguyên khi cập nhật
        published_at: `${formData.published_at} 00:00:00`,
      };
      const response = await api.put(`/doctor/posts/${selectedPost.id}`, formattedData);
      setPosts((prev) =>
        prev.map((post) => (post.id === response.data.data.id ? response.data.data : post))
      );
      setShowForm(false);
      setSelectedPost(null);
      toast.success('Cập nhật bài viết thành công!');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      setError(`Lỗi khi cập nhật bài viết: ${errorMessage}`);
      if (error.response?.data?.errors) {
        console.error('Chi tiết lỗi:', error.response.data.errors);
      }
    }
  };

  const handleViewDetail = async (post) => {
    try {
      const response = await api.get(`/doctor/posts/${post.id}`);
      setSelectedPost(response.data.data);
      setShowDetail(true);
    } catch (error) {
      setError('Lỗi khi xem chi tiết bài viết: ' + (error.response?.data?.message || error.message));
    }
  };

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
            placeholder="Tìm kiếm (Tiêu đề)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Tất cả trạng thái</option>
            <option value="published">Đã đăng</option>
            <option value="draft">Nháp</option>
            <option value="archived">Đã lưu trữ</option>
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
              <th style={{ width: '10%' }}>Lượt xem</th>
              <th style={{ width: '15%' }}>Ngày xuất bản</th>
              <th style={{ width: '15%' }}>Trạng thái</th>
              <th style={{ width: '15%' }}>Danh mục</th>
              <th style={{ width: '15%' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 ? (
              posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.views}</td>
                  <td>{post.published_at}</td>
                  <td>
                    <span
                      className={`badge ${
                        post.status === 'published'
                          ? 'bg-success'
                          : post.status === 'draft'
                          ? 'bg-warning'
                          : post.status === 'archived'
                          ? 'bg-secondary'
                          : ''
                      }`}
                    >
                      {post.status === 'published'
                        ? 'Đã đăng'
                        : post.status === 'archived'
                        ? 'Đã lưu trữ'
                        : post.status}
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
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
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
          categories={categories}
          userId={userId} // Truyền userId vào PostForm
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