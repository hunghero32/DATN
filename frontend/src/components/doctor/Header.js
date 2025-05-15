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

  const escapeHtml = (unsafe) => {
    if (typeof unsafe !== 'string') return unsafe || '';
    return unsafe
      .replace(/&/g, "&")
      .replace(/</g, "<")
      .replace(/>/g, ">")
      .replace(/"/g, "")
      .replace(/'/g, "'");
  };

  const unescapeHtml = (text) => {
    const parser = new DOMParser();
    const dom = parser.parseFromString(
      '<!DOCTYPE html><body>' + text,
      'text/html'
    );
    return dom.body.textContent;
  };

  useEffect(() => {
    let isMounted = true;
    const fetchDoctorInfo = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token || !isMounted) return;
        const response = await axios.get('http://127.0.0.1:8000/api/doctor/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (isMounted) setDoctorInfo(response.data);
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

  useEffect(() => {
    if (doctorInfo?.doctor_id) {
      const currentDoctorId = doctorInfo.doctor_id;
      setLoadingNotifications(true);
      const notificationsRef = ref(database, `notifications/${currentDoctorId}`);
      const handleValueChange = (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const notificationsArray = Object.entries(data)
            .map(([id, notificationData]) => ({
              id,
              ...notificationData,
              timestamp: typeof notificationData.timestamp === 'number' ? notificationData.timestamp : Date.now()
            }))
            .sort((a, b) => b.timestamp - a.timestamp);
          setNotifications(notificationsArray);
          setUnreadCount(notificationsArray.filter(n => !n.read).length);
        } else {
          setNotifications([]);
          setUnreadCount(0);
        }
        setLoadingNotifications(false);
      };
      const handleError = (error) => {
        console.error("Firebase listener error:", error);
        setLoadingNotifications(false);
      };
      const listener = onValue(notificationsRef, handleValueChange, handleError);
      return () => off(notificationsRef, 'value', listener);
    } else {
      setNotifications([]);
      setUnreadCount(0);
      setLoadingNotifications(false);
    }
  }, [doctorInfo]);

  const handleNotificationClick = useCallback(async (notif, e) => {
    if (e) e.stopPropagation();
    setPopoverVisible(false);
    const processNotification = async () => {
      if (!notif.read && doctorInfo?.doctor_id) {
        const updates = {};
        updates[`notifications/${doctorInfo.doctor_id}/${notif.id}/read`] = true;
        await update(ref(database), updates);
      }
      if (notif.bookingId) navigate(`/doctor/appointment?bookingId=${notif.bookingId}`, { replace: true });
    };
    setTimeout(processNotification, 100);
  }, [doctorInfo?.doctor_id, navigate]);

  const handleDeleteNotification = useCallback(async (notificationId, e) => {
    if (e) e.stopPropagation();
    if (!doctorInfo?.doctor_id) return;
    try {
      const notificationRef = ref(database, `notifications/${doctorInfo.doctor_id}/${notificationId}`);
      await remove(notificationRef);
    } catch (error) {
      console.error('Error deleting notification:', error);
      notification.error({
        message: 'Lỗi xóa thông báo',
        description: 'Không thể xóa thông báo. Vui lòng thử lại.',
        placement: 'topRight',
      });
    }
  }, [doctorInfo?.doctor_id]);

  const closePopover = () => setPopoverVisible(false);

  const handleIconClick = () => {
    if (popoverVisible) {
      setPopoverVisible(false);
    } else {
      if (notificationIconRef.current) {
        const rect = notificationIconRef.current.getBoundingClientRect();
        const popoverWidth = 380;
        const popoverHeight = 400; // Approximate height of the popover
        const horizontalGap = 15;
        const verticalGap = 15;
        const viewportHeight = window.innerHeight;
        const scrollY = window.scrollY;

        let left = rect.left - popoverWidth - horizontalGap;
        let top;

        // Check if the icon is near the bottom of the viewport
        if (rect.bottom + popoverHeight + verticalGap > viewportHeight + scrollY) {
          // Open upward
          top = rect.top - popoverHeight - verticalGap + scrollY;
        } else {
          // Open downward
          top = rect.bottom + verticalGap + scrollY;
        }

        if (left < 10) left = 10;
        if (top < scrollY) top = scrollY; // Ensure it doesn't go above the viewport

        setPopoverStyle({
          position: 'absolute',
          top: `${top}px`,
          left: `${left}px`,
          width: `${popoverWidth}px`,
          zIndex: 1050,
        });
        setPopoverVisible(true);
      } else {
        setPopoverVisible(true);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverVisible &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        notificationIconRef.current &&
        !notificationIconRef.current.contains(event.target)
      ) {
        setPopoverVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [popoverVisible]);

  const notificationContentJSX = (
    <div ref={popoverRef} className="custom-notification-popover" style={popoverStyle}>
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
      {loadingNotifications ? (
        <div className="custom-popover-body loading"><Spin tip="Đang tải..." /></div>
      ) : notifications.length === 0 ? (
        <div className="custom-popover-body empty"><Empty description="Không có thông báo" image={Empty.PRESENTED_IMAGE_SIMPLE} /></div>
      ) : (
        <div className="custom-popover-body">
          <List
            itemLayout="horizontal"
            dataSource={notifications}
            renderItem={(item, index) => (
              <div key={item.id}>
                <List.Item
                  className={`notification-list-item ${!item.read ? 'unread' : ''}`}
                  style={{ padding: 0, backgroundColor: item.read ? '#fff' : '#e6f7ff' }}
                  onClick={(e) => handleNotificationClick(item, e)}
                >
                  <div className="notification-item-content" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', width: '100%', position: 'relative' }}>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          icon={item.read ? <CheckCircleOutlined style={{ color: '#8c8c8c' }} /> : <BellOutlined style={{ color: '#fff' }} />}
                          style={{
                            backgroundColor: item.read ? '#f0f0f0' : '#1890ff',
                            boxShadow: !item.read ? '0 0 5px rgba(24, 144, 255, 0.5)' : 'none',
                          }}
                        />
                      }
                      title={
                        <span style={{ fontWeight: item.read ? 400 : 600, color: '#333', fontSize: '14px' }}>
                          {unescapeHtml(escapeHtml(item.title)) || 'Thông báo'}
                        </span>
                      }
                      description={
                        unescapeHtml(escapeHtml(item.message)) || ''
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
                {index < notifications.length - 1 && <hr style={{ margin: '0', border: 'none', borderTop: '1px solid #f0f0f0' }} />}
              </div>
            )}
            style={{ maxHeight: 400, overflowY: 'auto', margin: 0 }}
          />
        </div>
      )}
    </div>
  );

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

  const handleViewUserProfile = () => navigate("/doctor/profileUser");
  const handleViewDoctorProfile = () => navigate("/doctor/profile");
  const handleEditDoctorProfile = () => navigate("/doctor/profile/edit");
  const handleAppointments = () => navigate("/doctor/appointments");
  const handleSchedule = () => navigate("/doctor/schedule");

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
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .doctor-notification-icon {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background-color: #f0f0f0;
            transition: background-color 0.2s ease;
            position: relative;
          }
          .doctor-notification-icon:hover {
            background-color: #e0e0e0;
          }
          .doctor-notification-icon .ant-badge {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
          }
          .doctor-notification-icon .anticon-bell {
            font-size: 22px;
            color: #4b5563;
          }
          .doctor-notification-icon .ant-badge .ant-badge-count {
            background-color: #ff4d4f !important;
            color: white !important;
            font-size: 10px;
            min-width: 16px;
            height: 16px;
            line-height: 16px;
            border-radius: 50%;
            padding: 0 4px;
            position: absolute;
            top: -5px;
            right: -5px;
            transform: none;
            box-shadow: 0 0 0 1px #fff !important;
          }
          .doctor-greeting { text-align: right; line-height: 1.4; }
          .doctor-greeting-text { color: #6b7280; font-size: 13px; margin: 0; }
          .doctor-greeting-name { color: #1f2937; font-size: 15px; font-weight: 600; margin: 0; }
          .doctor-avatar-dropdown .dropdown-toggle::after { display: none; }
          .doctor-avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; cursor: pointer; border: 2px solid transparent; transition: border-color 0.2s ease; }
          .doctor-avatar:hover { border-color: #d1d5db; }
          .custom-notification-popover {
            background-color: #fff;
            border-radius: 16px;
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
            border: 1px solid #f0f0f0;
            overflow: hidden;
            z-index: 1050;
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
          .ant-list-item-meta-description {
            margin: 0 !important;
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