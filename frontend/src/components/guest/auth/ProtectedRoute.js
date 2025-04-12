import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Spin } from 'antd'; // Optional: Add a loading indicator

const ProtectedRoute = ({ requiredRole }) => {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Giả lập một chút delay hoặc kiểm tra xem thông tin người dùng đã tải xong chưa nếu cần
    // Trong trường hợp đơn giản này, giả sử useAuth cung cấp trạng thái người dùng đồng bộ sau khi tải lần đầu
    setLoading(false);
  }, [user, isAuthenticated]);

  if (loading) {
    // Tùy chọn: Hiển thị spinner trong khi kiểm tra trạng thái xác thực
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Nếu chưa đăng nhập, điều hướng về trang login
    console.log('[ProtectedRoute] Not authenticated, redirecting to /login');
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // Nếu đã đăng nhập nhưng không đúng vai trò yêu cầu
    console.warn(`[ProtectedRoute] Role mismatch: User role is '${user?.role}', required '${requiredRole}'. Redirecting.`);
    // Điều hướng về trang chủ hoặc trang lỗi "Không có quyền truy cập"
    // Tạm thời điều hướng về trang chủ ('/')
    return <Navigate to="/" replace />;
  }

  // Nếu đã đăng nhập và đúng vai trò (hoặc không yêu cầu vai trò cụ thể)
  return <Outlet />; // Hiển thị component con (Layout)
};

export default ProtectedRoute;