import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../guest/auth/AuthContext";
import axios from "axios";
import { Badge, notification, List, Avatar, Spin, Empty, Button } from 'antd';
import { BellOutlined, CheckCircleOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { ref, onValue, update, off, remove } from 'firebase/database';
import { database } from '../../config/firebase';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import vi from 'date-fns/locale/vi';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loadingNotifications, setLoadingNotifications] = useState(true);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverStyle, setPopoverStyle] = useState({});
  const notificationIconRef = useRef(null);
  const popoverRef = useRef(null);
  const [headerSearchTerm, setHeaderSearchTerm] = useState("");

  // Utility to escape HTML characters
  const escapeHtml = (unsafe) => {
    if (typeof unsafe !== 'string') return unsafe || '';
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  // --- Fetch Doctor Info ---
  useEffect(() => {
    let isMounted = true;
    const fetchDoctorInfo = async () => {
      console.log('Attempting to fetch doctor info...');
      try {
        const token = localStorage.getItem('authToken');
        if (!token || !isMounted) {
          console.log('No token or component unmounted, skipping fetch.');
          return;
        }
        const response = await axios.get('http://127.0.0.1:8000/api/doctor/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (isMounted) {
          console.log('Doctor info fetched:', response.data);
          setDoctorInfo(response.data);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching doctor info:', error);
          if (error.response && error.response.status === 401) {
            logout();
            navigate('/login');
          }
        }
      }
    };
    fetchDoctorInfo();
    return () => { isMounted = false; };
  }, [logout, navigate]);

  // --- Setup Firebase Listener - Chạy KHI doctorInfo THAY ĐỔI và CÓ ID ---
  useEffect(() => {
    console.log('Listener useEffect is running. Current doctorInfo:', doctorInfo);

    if (doctorInfo?.doctor_id) {
      const currentDoctorId = doctorInfo.doctor_id;
      console.log(`Doctor info available (ID: ${currentDoctorId}). Setting up RTDB listener...`);
      setLoadingNotifications(true);

      try {
        const notificationsRef = ref(database, `notifications/${currentDoctorId}`);
        console.log('Created notificationsRef:', notificationsRef);

        const handleValueChange = (snapshot) => {
          const data = snapshot.val();
          console.log('RTDB data received:', data);

          if (data) {
            const notificationsArray = Object.entries(data)
              .map(([id, notificationData]) => ({
                id,
                ...notificationData,
                timestamp: typeof notificationData.timestamp === 'number' ? notificationData.timestamp : Date.now()
              }))
              .sort((a, b) => b.timestamp - a.timestamp);

            setNotifications(notificationsArray);
            const newUnreadCount = notificationsArray.filter(n => !n.read).length;
            setUnreadCount(newUnreadCount);
            console.log('Updated notifications state:', notificationsArray);
            console.log('Updated unread count:', newUnreadCount);
          } else {
            setNotifications([]);
            setUnreadCount(0);
            console.log('No notifications found in RTDB.');
          }
          setLoadingNotifications(false);
        };

        const handleError = (error) => {
          console.error("Firebase listener error:", error);
          setLoadingNotifications(false);
        };

        console.log('Attempting to attach onValue listener...');
        const listener = onValue(notificationsRef, handleValueChange, handleError);
        console.log('RTDB listener attached successfully (listener object created).');

        return () => {
          console.log(`Cleaning up RTDB listener for doctor ID: ${currentDoctorId}`);
          off(notificationsRef, 'value', listener);
        };
      } catch (error) {
        console.error("Error during listener setup:", error);
        setLoadingNotifications(false);
      }
    } else {
      console.log('Doctor info not available yet (or missing doctor_id), listener not attached.');
      setNotifications([]);
      setUnreadCount(0);
      setLoadingNotifications(false);
    }
  }, [doctorInfo]);

  // --- Xử lý click thông báo ---
  const handleNotificationClick = useCallback(async (notif, e) => {
    if (e) e.stopPropagation();

    console.log('🔔 Notification clicked:', notif.id);

    setPopoverVisible(false);
    console.log('🔔 Popover closed immediately on click');

    const processNotification = async () => {
      if (!notif.read && doctorInfo?.doctor_id) {
        try {
          const updates = {};
          updates[`notifications/${doctorInfo.doctor_id}/${notif.id}/read`] = true;
          await update(ref(database), updates);
          console.log('Marked as read:', notif.id);
        } catch (error) {
          console.error('Error marking notification as read:', error);
        }
      }

      if (notif.bookingId) {
        console.log(`Navigating to appointment with bookingId: ${notif.bookingId}`);
        navigate(`/doctor/appointment?bookingId=${notif.bookingId}`, { replace: true });
      } else {
        console.log('Notification does not have bookingId, not navigating.');
      }
    };

    setTimeout(processNotification, 100);
  }, [doctorInfo?.doctor_id, navigate]);

  // --- Xử lý xóa thông báo ---
  const handleDeleteNotification = useCallback(async (notificationId, e) => {
    if (e) e.stopPropagation();
    console.log('🗑️ [Doctor] Attempting to delete notification:', notificationId);
    if (!doctorInfo?.doctor_id) {
      console.error("🗑️ [Doctor] Doctor ID is missing, cannot delete notification.");
      return;
    }
    try {
      const notificationRef = ref(database, `notifications/${doctorInfo.doctor_id}/${notificationId}`);
      console.log("🗑️ [Doctor] Notification ref path:", notificationRef.toString());
      await remove(notificationRef);
      console.log('🗑️ [Doctor] Notification deleted successfully:', notificationId);
    } catch (error) {
      console.error('🗑️ [Doctor] Error deleting notification:', error);
      notification.error({
        message: 'Lỗi xóa thông báo',
        description: 'Không thể xóa thông báo. Vui lòng thử lại.',
        placement: 'topRight',
      });
    }
  }, [doctorInfo?.doctor_id]);

  // --- Đóng popover thủ công ---
  const closePopover = () => {
    setPopoverVisible(false);
    console.log('🔔 Manually closing popover');
  };

  // --- Xử lý click vào icon chuông ---
  const handleIconClick = () => {
    if (popoverVisible) {
      setPopoverVisible(false);
    } else {
      if (notificationIconRef.current) {
        const rect = notificationIconRef.current.getBoundingClientRect();
        const popoverWidth = 380;
        const horizontalGap = 15;
        const verticalGap = 15;

        let left = rect.left - popoverWidth - horizontalGap;
        let top = rect.bottom + verticalGap + window.scrollY;

        if (left < 10) {
          left = 10;
        }

        setPopoverStyle({
          position: 'absolute',
          top: `${top}px`,
          left: `${left}px`,
          width: `${popoverWidth}px`,
          zIndex: 1050,
        });
        setPopoverVisible(true);
        console.log('🔔 Calculated custom popover style (left side):', { top: `${top}px`, left: `${left}px` });
      } else {
        setPopoverVisible(true);
      }
    }
  };

  // --- Xử lý click bên ngoài để đóng popover ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverVisible &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        notificationIconRef.current &&
        !notificationIconRef.current.contains(event.target)) {
        setPopoverVisible(false);
        console.log('🔔 Clicked outside, closing popover');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popoverVisible]);

  // --- JSX cho nội dung bên trong popover ---
  const notificationContentJSX = (
    <div
      ref={popoverRef}
      className="custom-notification-popover"
      style={popoverStyle}
    >
      {/* Header */}
      <div className="custom-popover-header" style={{ padding: '10px 16px' }}>
        <span style={{ fontWeight: 600 }}>Thông báo ({unreadCount} chưa đọc)</span>
        <Button
          type="text"
          icon={<CloseOutlined />}
          size="small"
          onClick={closePopover}
          style={{ color: '#888', border: 'none', background: 'none', padding: '0 4px' }}
          aria-label="Đóng thông báo"
        />
      </div>

      {/* Body - List */}
      {loadingNotifications ? (
        <div className="custom-popover-body loading"><Spin tip="Đang tải..." /></div>
      ) : notifications.length === 0 ? (
        <div className="custom-popover-body empty"><Empty description="Không có thông báo" image={Empty.PRESENTED_IMAGE_SIMPLE} /></div>
      ) : (
        <div className="custom-popover-body">
          <List
            itemLayout="horizontal"
            dataSource={notifications}
            renderItem={item => (
              <List.Item
                className={`notification-list-item ${!item.read ? 'unread' : ''}`}
                style={{ padding: 0, borderBottom: '1px solid #f0f0f0', backgroundColor: item.read ? '#fff' : '#e6f7ff' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNotificationClick(item, e);
                }}
              >
                <div className="notification-item-content" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', width: '100%', position: 'relative' }}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={
                          item.read ? (
                            <CheckCircleOutlined style={{ color: '#8c8c8c' }} />
                          ) : (
                            <BellOutlined style={{ color: '#fff' }} />
                          )
                        }
                        style={{
                          backgroundColor: item.read ? '#f0f0f0' : '#1890ff',
                          boxShadow: !item.read ? '0 0 5px rgba(24, 144, 255, 0.5)' : 'none',
                        }}
                      />
                    }
                    title={
                      <span style={{ fontWeight: item.read ? 400 : 600, color: '#333', fontSize: '14px' }}>
                        {escapeHtml(item.title) || 'Thông báo'}
                      </span>
                    }
                    description={
                      <span style={{ color: '#555', fontSize: '13px' }}>
                        {escapeHtml(item.message) || ''}
                      </span>
                    }
                    style={{ flexGrow: 1, margin: 0, marginRight: '10px', overflow: 'hidden' }}
                  />
                  <div className="notification-timestamp" style={{ fontSize: '11px', color: '#8c8c8c', textAlign: 'right', flexShrink: 0, whiteSpace: 'nowrap', marginRight: '8px' }}>
                    {item.timestamp ? formatDistanceToNow(new Date(item.timestamp), { addSuffix: true, locale: vi }) : ''}
                  </div>
                  <Button
                    icon={<DeleteOutlined />}
                    type="text"
                    size="small"
                    danger
                    onClick={(e) => handleDeleteNotification(item.id, e)}
                    style={{ color: '#ff4d4f', border: 'none', background: 'none', padding: '0 4px', flexShrink: 0 }}
                    aria-label="Xóa thông báo"
                  />
                </div>
              </List.Item>
            )}
            style={{ maxHeight: 400, overflowY: 'auto', margin: 0 }}
          />
        </div>
      )}
    </div>
  );

  // --- Các hàm và JSX còn lại (Giữ nguyên) ---
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return "Chào buổi sáng";
    if (hour >= 11 && hour < 13) return "Chào buổi trưa";
    if (hour >= 13 && hour < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const handleViewUserProfile = () => {
    navigate("/doctor/profileUser");
  };
  const handleViewDoctorProfile = () => {
    navigate("/doctor/profile");
  };
  const handleEditDoctorProfile = () => {
    navigate("/doctor/profile/edit");
  };
  const handleAppointments = () => {
    navigate("/doctor/appointments");
  };
  const handleSchedule = () => {
    navigate("/doctor/schedule");
  };

  const handleHeaderSearch = (e) => {
    if (e.key === 'Enter') {
      const term = headerSearchTerm.trim();
      navigate(`/doctor/appointment?search=${encodeURIComponent(term)}`);
    }
  };

  return (
    <div className="doctor-header-wrapper">
      <style>
        {`
          .doctor-header-container {
            display: flex; align-items: center; justify-content: space-between;
            width: 100%; height: 100%; padding: 0 24px; box-sizing: border-box;
          }
          .doctor-search-container {
            flex-shrink: 1; max-width: 450px;
          }
          .doctor-search-input { position: relative; }
          .doctor-search-input input.form-control { height: 40px; padding-left: 40px; width: 100%; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 14px; background-color: #f9fafb; }
          .doctor-search-input .search-icon { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: #9ca3af; font-size: 16px; }
          .doctor-search-input input.form-control:focus { border-color: #3b82f6; background-color: #ffffff; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15); outline: none; }
          .doctor-user-section {
            display: flex; align-items: center; gap: 24px;
          }
          .doctor-notification-trigger {
            position: relative;
          }
          .doctor-notification-icon {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  background-color: #f0f0f0;
  border: 1px solid #d1d5db; /* Add a subtle border */
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.doctor-notification-icon:hover {
  background-color: #e5e7eb;
  border-color: #9ca3af; /* Darker border on hover */
}
          .doctor-notification-icon .ant-badge .ant-badge-count { background-color: #ff4d4f !important; box-shadow: 0 0 0 1px #ff4d4f inset !important; color: white !important; }
          .doctor-notification-icon .anticon-bell { font-size: 22px; color: #4b5563; }
          .doctor-greeting { text-align: right; line-height: 1.4; }
          .doctor-greeting-text { color: #6b7280; font-size: 13px; margin: 0; }
          .doctor-greeting-name { color: #1f2937; font-size: 15px; font-weight: 600; margin: 0; }
          .doctor-avatar-dropdown .dropdown-toggle::after { display: none; }
          .doctor-avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; cursor: pointer; border: 2px solid transparent; transition: border-color 0.2s ease; }
          .doctor-avatar:hover { border-color: #d1d5db; }
          .custom-notification-popover {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
            border: 1px solid #f0f0f0;
            overflow: hidden;
            z-index: 1100;
          }
          .custom-popover-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 16px;
            border-bottom: 1px solid #f0f0f0;
            background-color: #fafafa;
          }
          .custom-popover-body {
            max-height: 400px;
            overflow-y: auto;
          }
          .custom-popover-body .ant-list-item {
            padding: 0 !important;
            cursor: pointer;
            transition: background-color 0.2s ease;
          }
          .custom-popover-body .ant-list-item:hover {
            background-color: #f0f5ff !important;
          }
          .custom-popover-body .notification-item-content {
            padding: 12px 16px;
            display: flex;
            align-items: center;
            width: 100%;
            position: relative;
          }
          .notification-timestamp {
            font-size: 11px;
            color: #8c8c8c;
            margin-left: 12px;
            flex-shrink: 0;
            white-space: nowrap;
          }
          .ant-list-item .ant-btn-text[aria-label="Xóa thông báo"] {
            opacity: 0.6;
            transition: opacity 0.2s ease;
          }
          .ant-list-item:hover .ant-btn-text[aria-label="Xóa thông báo"] {
            opacity: 1;
          }
          .ant-list-item .ant-btn-text[aria-label="Xóa thông báo"]:hover {
            background-color: rgba(255, 77, 79, 0.1) !important;
          }
          .custom-popover-body.loading,
          .custom-popover-body.empty {
            padding: 40px 20px;
            text-align: center;
          }
        `}
      </style>

      <div className="doctor-header-container">
        <div className="doctor-search-container">
          <div className="doctor-search-input">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder="Tìm kiếm bệnh nhân..."
              className="form-control"
              value={headerSearchTerm}
              onChange={(e) => setHeaderSearchTerm(e.target.value)}
              onKeyDown={handleHeaderSearch}
            />
          </div>
        </div>

        <div className="doctor-user-section">
          <div
            ref={notificationIconRef}
            className="doctor-notification-trigger"
            onClick={handleIconClick}
            style={{ cursor: 'pointer' }}
          >
            <div className="doctor-notification-icon">
              <Badge
                count={unreadCount}
                overflowCount={9}
                size="small"
              >
                <BellOutlined />
              </Badge>
            </div>
          </div>
          <div className="doctor-greeting">
            <p className="doctor-greeting-text">{getGreeting()},</p>
            <h6 className="doctor-greeting-name">Bác sĩ {doctorInfo?.doctor_name}</h6>
          </div>

          <div className="dropdown doctor-avatar-dropdown">
            <img
              src={doctorInfo?.doctor_avatar || "https://via.placeholder.com/150"}
              alt="Avatar"
              className="doctor-avatar dropdown-toggle"
              role="button"
              id="dropdownMenuAvatar"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            />

            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuAvatar">
              <li>
                <a className="dropdown-item" onClick={(e) => { e.preventDefault(); handleViewUserProfile(); }}>
                  <i className="fas fa-user"></i>
                  Thông tin tài khoản
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={(e) => { e.preventDefault(); handleViewDoctorProfile(); }}>
                  <i className="fas fa-user-md"></i>
                  Hồ sơ bác sĩ
                </a>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <a className="dropdown-item text-danger" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
                  <i className="fas fa-sign-out-alt"></i>
                  Đăng xuất
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {popoverVisible && notificationContentJSX}
    </div>
  );
};

export default Header;