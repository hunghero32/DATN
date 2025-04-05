import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";

export default function Header() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [siteData, setSiteData] = useState(null); // State to store API data

  // Fetch site data from the API
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken && storedToken !== "null") {
      setToken(storedToken);
    }

    // Fetch the system data from the API
    fetch("http://localhost:8000/api/system")
      .then(response => response.json())
      .then(data => {
        setSiteData(data); // Store the fetched data
      })
      .catch(error => {
        console.error("Error fetching site data:", error);
      });
  }, []);

  const thoatTrang = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    navigate("/");
  };

  return (
    <header className="pq-header-style-1 pq-has-sticky">
      <div className="pq-bottom-header bg-white shadow-md">
        <div className="container">
          <div className="navbar navbar-expand-lg flex justify-between items-center py-3">
            <Link to="/" className="navbar-brand">
              {/* Use the fetched logo URL */}
              {siteData && siteData.site_logo ? (
                <img
                  src={siteData.site_logo}
                  alt="header-logo"
                  className="h-10 w-40"
                />
              ) : (
                <img
                  src="img/header/logo-primary-dark.webp"
                  alt="header-logo"
                  className="h-10 w-40"
                />
              )}
            </Link>
            <button
              className="md:hidden px-3 py-2 border rounded text-gray-600 hover:text-black transition-all"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <i className={`ri-menu-line text-2xl ${menuOpen ? "hidden" : "block"}`}></i>
              <i className={`ri-close-line text-2xl ${menuOpen ? "block" : "hidden"}`}></i>
            </button>
            <div className={`absolute md:static top-16 left-0 w-full bg-white md:bg-transparent md:flex transition-all duration-300 ${menuOpen ? "block" : "hidden"} md:block`}>
              <ul className="navbar-nav flex flex-col md:flex-row md:gap-6 text-lg font-semibold p-4 md:p-0">
                <li className="py-2 md:py-0 transition-all duration-300 hover:bg-gray-100 md:hover:bg-transparent md:hover:scale-105">
                  <Link to="/" className="!text-gray-700 hover:text-blue-600 transition-colors">Trang Chủ</Link>
                </li>
                <li className="py-2 md:py-0 transition-all duration-300 hover:bg-gray-100 md:hover:bg-transparent md:hover:scale-105">
                  <Link to="/aboutus" className="!text-gray-700 hover:text-blue-600 transition-colors">Thông Tin</Link>
                </li>
                <li className="py-2 md:py-0 transition-all duration-300 hover:bg-gray-100 md:hover:bg-transparent md:hover:scale-105">
                  <Link to="/contact" className="!text-gray-700 hover:text-blue-600 transition-colors">Liên Hệ</Link>
                </li>
              </ul>
            </div>
            <div className="flex items-center gap-4 relative">
              {token && (
                <div className="relative">
                  <button className="relative flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition">
                    <i className="ri-notification-3-line text-xl text-gray-700"></i>
                    {hasNotifications && (
                      <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white"></span>
                    )}
                  </button>
                </div>
              )}
              {token ? (
                <div className="relative">
                  <button
                    className="relative flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <i className="ri-user-3-line text-xl text-gray-700"></i>
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-50 whitespace-nowrap">
                      <Link to="/patientProfile" className="block px-4 py-2 hover:bg-gray-100 !text-blue-600">
                        <i className="ri-user-line mr-2"></i> Thông tin cá nhân
                      </Link>
                      <Link to="/lichhen" className="block px-4 py-2 hover:bg-gray-100 !text-blue-600">
                        <i className="ri-calendar-line mr-2"></i> Lịch hẹn
                      </Link>
                      <Link to="/hoadon" className="block px-4 py-2 hover:bg-gray-100 !text-blue-600">
                        <i className="ri-file-list-line mr-2"></i> Hóa đơn
                      </Link>
                      <Link to="/danhgia" className="block px-4 py-2 hover:bg-gray-100 !text-blue-600">
                        <i className="ri-star-line mr-2"></i> Đánh giá
                      </Link>
                      <button
                        onClick={thoatTrang}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                      >
                        <i className="ri-logout-box-r-line mr-2"></i> Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 h-10 w-32 flex items-center justify-center transition whitespace-nowrap">Đăng nhập</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
