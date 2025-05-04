import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import "remixicon/fonts/remixicon.css";
import api from "../../../ultils/api/axios";
import { useAuth } from "../auth/AuthContext"; // Đường dẫn đúng (đi lên 1 cấp rồi vào auth)
import { Badge, List, Avatar, Spin, Empty, Button as AntButton, Popconfirm, Modal } from 'antd'; // Import Ant Design components
import { BellOutlined, CheckCircleOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { ref, onValue, update, off, remove } from 'firebase/database'; // Import Firebase functions
import { database } from '../../../config/firebase'; // Import Firebase database instance
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import vi from 'date-fns/locale/vi';

export default function Header() {
  const { user, logout } = useAuth(); // Lấy user từ context
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [siteData, setSiteData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState(null);
  // State cho Client Notifications
  const [clientNotifications, setClientNotifications] = useState([]);
  const [clientUnreadCount, setClientUnreadCount] = useState(0);
  const [clientLoadingNotifications, setClientLoadingNotifications] = useState(true);
  const [clientPopoverVisible, setClientPopoverVisible] = useState(false);
  const clientNotificationIconRef = useRef(null); // Ref cho icon để định vị popover
  const clientPopoverRef = useRef(null); // Ref cho popover để xử lý click outside
  const userMenuButtonRef = useRef(null);
  const userMenuDropdownRef = useRef(null);

  // --- useEffect lấy token, siteData ---
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken && storedToken !== "null") {
      setToken(storedToken);
    } else {
      setToken(null);
    }

    fetch("http://localhost:8000/api/system")
      .then((response) => response.json())
      .then((data) => setSiteData(data))
      .catch((error) => console.error("Error fetching site data:", error));
    api.get("/api/client/appointments")
      .then((response) => {
        if (response.data?.data) { // Ưu tiên kiểm tra data.data trước
          setSiteData(response.data.data);
        } else {
          setSiteData(response.data); // Fallback nếu data nằm trực tiếp
        }
      })
      .catch((error) => console.error("Error fetching site data:", error));

  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchText.trim()) {
        api.get(`/api/client/search?query=${encodeURIComponent(searchText)}`)
          .then((res) => {
            setResults(res.data);
            const modalElement = document.getElementById('searchModal');
            const modalInstance = new window.bootstrap.Modal(modalElement);
            modalInstance.show();
          })
          .catch((err) => console.error("Lỗi tìm kiếm:", err));
      }
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchText]);

  const showModal = () => {
    window.searchModalInstance?.show();
  };

  const hideModal = () => {
    window.searchModalInstance?.hide();

    // 👇 Fix triệt để lỗi bị mờ + không scroll
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "";

    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) backdrop.remove();
  };
  const thoatTrang = () => {
    logout();
    setToken(null);
    setUserMenuOpen(false);
    setClientPopoverVisible(false);
    navigate("/");
  };
  const handleServiceClick = (service) => {
    if (!service || !service.id) return;
    navigate(`/detail-service/${service.id}`);
  };
  const handleSpecialtyClick = (id) => {
    console.log("Chuyên khoa được chọn:", id);
    navigate(`/detail-specialty/${id}`);
  };
  // --- Setup Firebase Listener cho Client Notifications ---
  useEffect(() => {
    let listener = null;
    let notificationsRef = null;

    if (user?.id && user.role !== 'doctor' && user.role !== 'admin') {
      const currentUserId = user.id;
      setClientLoadingNotifications(true);
      try {
        notificationsRef = ref(database, `client_notifications/${currentUserId}`);
        listener = onValue(notificationsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const notificationsArray = Object.entries(data)
              .map(([id, notificationData]) => ({
                id,
                ...(notificationData || {}),
                timestamp: typeof notificationData?.timestamp === 'number' ? notificationData.timestamp : Date.now()
              }))
              .sort((a, b) => b.timestamp - a.timestamp);
            setClientNotifications(notificationsArray);
            setClientUnreadCount(notificationsArray.filter(n => !n.read).length);
          } else {
            setClientNotifications([]);
            setClientUnreadCount(0);
          }
          setClientLoadingNotifications(false);
        }, (error) => {
          console.error("Client Firebase listener error:", error);
          setClientLoadingNotifications(false);
        });
      } catch (error) {
        console.error("Error during client listener setup:", error);
        setClientLoadingNotifications(false);
      }
    } else {
      setClientNotifications([]);
      setClientUnreadCount(0);
      setClientLoadingNotifications(false);
    }
    return () => {
      if (listener && notificationsRef) {
        off(notificationsRef, 'value', listener);
      }
    };
  }, [user]);

  // --- Xử lý click Client Notification ---
  const handleClientNotificationClick = useCallback(async (notif, e) => {
    if (e) e.stopPropagation();
    setClientPopoverVisible(false);

    setTimeout(async () => {
      if (!notif.read && user?.id) {
        try {
          const updates = {};
          updates[`client_notifications/${user.id}/${notif.id}/read`] = true;
          await update(ref(database), updates);
        } catch (error) {
          console.error('Error marking client notification as read:', error);
        }
      }
      // Điều hướng chỉ khi không phải là click vào nút xóa
      navigate('/lichhen');
    }, 150);

  }, [user?.id, navigate]);

  // --- Xử lý xóa Client Notification - Nhận notificationId, e ---
  const handleDeleteClientNotification = useCallback(async (notificationId, e) => { // Nhận lại notificationId, e
    if (e) e.stopPropagation(); // Ngăn chặn sự kiện click lan ra list item
    console.log('🗑️ [Client] Attempting to delete notification:', notificationId);
    if (!user?.id) {
      console.error("🗑️ [Client] User ID is missing, cannot delete notification.");
      return;
    }
    try {
      const notificationRef = ref(database, `client_notifications/${user.id}/${notificationId}`);
      console.log("🗑️ [Client] Notification ref path:", notificationRef.toString());
      await remove(notificationRef);
      console.log("🗑️ [Client] Notification deleted successfully:", notificationId);
      // Không cần làm gì thêm
    } catch (error) {
      console.error('🗑️ [Client] Error deleting client notification:', error);
      // Có thể thêm thông báo lỗi cho người dùng nếu cần
      // notification.error({...});
    }
  }, [user?.id]);

  // --- Xử lý click icon chuông client ---
  const handleClientIconClick = (e) => {
    if (e) e.stopPropagation();
    setClientPopoverVisible(!clientPopoverVisible);
    setUserMenuOpen(false);
  };

  // --- Đóng popover client ---
  const closeClientPopover = (e) => {
    if (e) e.stopPropagation();
    setClientPopoverVisible(false);
  };

  // --- Xử lý click bên ngoài để đóng cả 2 menu/popover ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Đóng User Menu
      if (userMenuOpen && userMenuButtonRef.current && !userMenuButtonRef.current.contains(event.target) && userMenuDropdownRef.current && !userMenuDropdownRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      // Đóng Notification Popover
      if (clientPopoverVisible && clientPopoverRef.current && !clientPopoverRef.current.contains(event.target) && clientNotificationIconRef.current && !clientNotificationIconRef.current.contains(event.target)) {
        setClientPopoverVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [clientPopoverVisible, userMenuOpen, userMenuButtonRef, userMenuDropdownRef, clientNotificationIconRef, clientPopoverRef]);


  // --- JSX cho nội dung popover client ---
  const clientNotificationContentJSX = (
    <div
      ref={clientPopoverRef}
      className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-50"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-2.5 border-b bg-gray-50 rounded-t-md">
        <span className="font-semibold text-gray-700 text-sm">Thông báo ({clientUnreadCount} chưa đọc)</span>
        <AntButton
          type="text" icon={<CloseOutlined style={{ fontSize: '12px' }} />} size="small"
          onClick={closeClientPopover}
          className="text-gray-400 hover:text-gray-700 p-1 leading-none h-auto"
          aria-label="Đóng thông báo"
        />
      </div>
      {/* Body - List */}
      <div className="max-h-72 overflow-y-auto">
        {clientLoadingNotifications ? (
          <div className="p-10 text-center"><Spin size="small" /></div>
        ) : clientNotifications.length === 0 ? (
          <div className="p-4 text-center text-xs text-gray-500"><Empty description="Không có thông báo" image={Empty.PRESENTED_IMAGE_SIMPLE} /></div>
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={clientNotifications}
            renderItem={item => (
              <List.Item
                className={`hover:bg-gray-50 cursor-pointer ${!item.read ? 'bg-blue-50' : ''}`}
                style={{ padding: '0.5rem 0.75rem', border: 'none', borderBottom: '1px solid #f0f0f0' }}
                onClick={(e) => handleClientNotificationClick(item, e)}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      size="small"
                      icon={item.read ? <CheckCircleOutlined /> : <BellOutlined className="text-white" />}
                      style={{ backgroundColor: item.read ? '#dbeafe' : '#3b82f6', marginTop: '3px' }}
                    />
                  }
                  title={
                    <span className={`text-xs font-semibold ${!item.read ? 'text-gray-900' : 'text-gray-600'}`} style={{ lineHeight: '1.3' }}>
                      {item.title || 'Thông báo'}
                    </span>
                  }
                  description={
                    <span className="text-xs text-gray-500 block" style={{ lineHeight: '1.3' }}>
                      {item.message || ''}
                    </span>
                  }
                />
                <div className="text-xs text-gray-400 text-right flex-shrink-0 ml-2 whitespace-nowrap pt-1">
                  {item.timestamp ? formatDistanceToNow(new Date(item.timestamp), { addSuffix: true, locale: vi }) : ''}
                </div>
                {/* Nút Xóa Thông Báo Client - Xóa trực tiếp */}
                <AntButton
                  icon={<DeleteOutlined />}
                  type="text"
                  size="small"
                  danger
                  onClick={(e) => handleDeleteClientNotification(item.id, e)} // Gọi thẳng hàm xóa
                  style={{ padding: '0 4px', marginLeft: '4px', border: 'none', background: 'none' }}
                  aria-label="Xóa thông báo"
                />
              </List.Item>
            )}
            size="small"
          />
        )}
      </div>
    </div>
  );

  // --- JSX Return ---
  return (
    <header className="pq-header-style-1 pq-has-sticky">
      <style>{`
        .ant-badge-count {
          background-color: #f5222d !important;
          color: white !important;
          box-shadow: 0 0 0 1px #fff !important;
          border-radius: 9999px !important;
          padding: 0 6px !important;
          min-width: 18px !important;
          height: 18px !important;
          line-height: 18px !important;
          font-size: 11px !important;
          transform: translate(40%, -40%) !important;
          top: 0 !important;
          right: 0 !important;
          position: absolute !important;
        }
        
        .notification-dropdown {
          animation: slideDown 0.2s ease-out;
          transform-origin: top right;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div className="pq-bottom-header bg-white shadow-md">
        <div className="container">
          <div className="navbar navbar-expand-lg flex justify-between items-center py-3">
            {/* Logo - Reverted to always show text */}
            <Link to="/" className="navbar-brand">
              {siteData && siteData.site_logo ? (
                <img src={`http://localhost:8000/storage/${siteData.site_logo}`} alt="logo" className="h-10 w-40" />
              ) : (
                <span className="text-sm  text-blue-300">Logo</span>
              )}
            </Link>

            <button className="md:hidden px-3 py-2 border rounded text-gray-600 hover:text-black transition-all" onClick={() => setMenuOpen(!menuOpen)}>
              <i className={`ri-menu-line text-2xl ${menuOpen ? "hidden" : "block"}`}></i>
              <i className={`ri-close-line text-2xl ${menuOpen ? "block" : "hidden"}`}></i>
            </button>

            {/* Desktop Navigation - Updated link colors */}
            <div className={`absolute  z-50  md:static top-16 left-0 w-full bg-white md:bg-transparent md:flex transition-all duration-300 ${menuOpen ? "block" : "hidden"} md:block`}>
              <ul className="navbar-nav flex flex-col md:flex-row md:items-center md:gap-6 text-base md:text-lg font-sans md:font-semibold p-4 md:p-0">
                <li>
                  <Link
                    to="/"
                    className="block py-2 md:py-0 text-gray-700 hover:text-blue-600 hover:underline hover:scale-105 transition-all duration-200"
                  >
                    Trang Chủ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/aboutus"
                    className="block py-2 md:py-0 text-gray-700 hover:text-blue-600 hover:underline hover:scale-105 transition-all duration-200"
                  >
                    Thông Tin
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="block py-2 md:py-0 text-gray-700 hover:text-blue-600 hover:underline hover:scale-105 transition-all duration-200"
                  >
                    Liên Hệ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/baivietheader"
                    className="block py-2 md:py-0 text-gray-700 hover:text-blue-600 hover:underline hover:scale-105 transition-all duration-200"
                  >
                    Bài Viết
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    to="/chat-support"
                    className="block py-2 md:py-0 text-gray-700 hover:text-blue-600 hover:underline hover:scale-105 transition-all duration-200"
                  >
                    Hỗ trợ viên
                  </Link>
                </li>
              </ul>
            </div>



            {/* Right Section */}
            <div className="flex items-center gap-4 relative">
              <div className="relative hidden md:block">
                <div className="flex items-center bg-white rounded-[24px] shadow-sm border border-gray-100">
                  <div className="relative">
                    <i className="ri-search-2-line text-gray-400 text-lg absolute left-1 top-1/2 -translate-y-1/2"></i>
                    <input
                      type="search"
                      className="pl-10 min-w-[300px] w-[650px] max-w-[800px] px-4 py-3 bg-transparent border-0 focus:ring-0 text-base outline-none"
                      placeholder="Tìm kiếm dịch vụ ..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {token && user && user.role !== 'doctor' && user.role !== 'admin' && (
                <div ref={clientNotificationIconRef} className="relative">
                  <button
                    className="w-10 h-10  bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
                    onClick={handleClientIconClick}
                    aria-label="Thông báo"
                  >
                    <Badge count={clientUnreadCount} overflowCount={9} size="small" offset={[-2, 2]}>
                      <i className="ri-notification-3-line text-xl text-gray-700"></i>
                    </Badge>
                  </button>
                  {clientPopoverVisible && clientNotificationContentJSX}
                </div>
              )}

              {/* User Menu / Login Button */}
              {token && user ? (
                <div className="relative">
                  <button
                    ref={userMenuButtonRef}
                    id="user-menu-button"
                    className="w-10 h-10 bg-white rounded-full shadow border flex items-center justify-center hover:bg-gray-100 transition"
                    onClick={(e) => {
                      setUserMenuOpen((prev) => !prev);
                      setClientPopoverVisible(false);
                    }}
                    aria-label="Tài khoản người dùng"
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt="User Avatar"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <i className="ri-user-3-line text-xl text-gray-700"></i>
                    )}
                  </button>

                  {userMenuOpen && (
                    <div
                      ref={userMenuDropdownRef}
                      id="user-menu-dropdown"
                      className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                    >
                      <div className="py-1">
                        <Link
                          className="flex bg-blue-200  items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <i className="ri-user-line text-lg min-w-[20px]"></i>
                          <span className=" font-medium">Xin chào, {user?.name || 'Thông tin cá nhân'}</span>
                        </Link>
                        <Link
                          to="/patientProfile"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <i className="ri-user-line text-lg min-w-[20px]"></i>
                          <span className="font-medium">Thông tin cá nhân</span>
                        </Link>
                        <Link
                          to="/lichhen"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <i className="ri-calendar-check-line text-lg min-w-[20px]"></i>
                          <span className="font-medium">Lịch hẹn</span>
                        </Link>
                        <Link
                          to="/danhgia"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <i className="ri-star-line text-lg min-w-[20px]"></i>
                          <span className="font-medium">Đánh giá</span>
                        </Link>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button
                          onClick={thoatTrang}
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 w-full"
                        >
                          <i className="ri-logout-box-r-line text-lg min-w-[20px]"></i>
                          <span className="font-medium">Đăng xuất</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 h-10 w-32 flex items-center justify-center transition"
                >
                  Đăng nhập
                </Link>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* Modal Bootstrap */}
      <div
        className="modal fade"
        id="searchModal"
        tabIndex="-1"
        aria-labelledby="searchModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content border-0 shadow-lg rounded-4 animate__animated animate__fadeIn">
            <div className="modal-header bg-primary text-white rounded-top-4">
              <h5 className="modal-title" id="searchModalLabel">
                <i className="ri-search-eye-line me-2"></i>Kết quả tìm kiếm
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body p-4">
              {results && Object.values(results).every(arr => arr.length === 0) ? (
                <div className="text-center text-muted">
                  <i className="ri-emotion-sad-line fs-2 d-block mb-2"></i>
                  Không tìm thấy kết quả phù hợp.
                </div>
              ) : (
                <div className="d-flex flex-column gap-4">
                  {results?.services?.length > 0 && (
                    <div>
                      <h6 className="text-primary fw-bold mb-3">
                        <i className="ri-briefcase-4-line me-2"></i>Dịch vụ
                      </h6>
                      <div className="row g-3">
                        {results.services.map(item => (
                          <div
                            key={item.id}
                            className="col-md-6"
                            onClick={() => {
                              handleServiceClick(item);
                              hideModal();
                            }}
                          >
                            <div className="p-3 bg-light rounded border hover-shadow transition-all cursor-pointer">
                              <i className="ri-stethoscope-line me-2 text-primary"></i>
                              {item.services_name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {results?.specialties?.length > 0 && (
                    <div>
                      <h6 className="text-success fw-bold mb-3">
                        <i className="ri-microscope-line me-2"></i>Chuyên khoa
                      </h6>
                      <div className="row g-3">
                        {results.specialties.map(item => (
                          <div
                            key={item.id}
                            className="col-md-6"
                            onClick={() => {
                              handleSpecialtyClick(item.id);
                              hideModal();
                            }}
                          >
                            <div className="p-3 bg-light rounded border hover-shadow transition-all cursor-pointer">
                              <i className="ri-hospital-line me-2 text-success"></i>
                              {item.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </header>
  );
} // Add this closing bracket for the Header component
