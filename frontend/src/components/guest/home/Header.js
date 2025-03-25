import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css"; 

export default function Header() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // Quản lý trạng thái menu

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const thoatTrang = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <header id="pq-header" className="pq-header-style-1 pq-has-sticky">
      {/* Thanh header trên */}
      <div className="pq-top-header pq-bg-dark">
        <div className="container">
          <div className="pq-top-header-row flex justify-between items-center">
            {/* Thông tin liên hệ */}
            <div className="pq-top-header-contact">
              <ul className="pq-top-contact-list flex gap-4">
                <li className="pq-top-contact-list-item">
                  <a href="#">
                    <i className="flaticon-phone-call"></i>
                    <span> +1800-001-658</span>
                  </a>
                </li>
                <li className="pq-top-contact-list-item">
                  <i className="ri-time-line"></i> 
                  <span>Monday - Friday 10:00 to 6:00</span>
                </li>
              </ul>
            </div>

            {/* Mạng xã hội */}
            <div className="pq-top-header-social-icon">
              <ul className="pq-social-list flex gap-2">
                <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                <li><a href="#"><i className="fab fa-pinterest"></i></a></li>
                <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Thanh header dưới */}
      <div className="pq-bottom-header bg-white shadow-md">
        <div className="container">
          <div className="navbar navbar-expand-lg flex justify-between items-center py-3">
            {/* Logo */}
            <a href="/" className="navbar-brand">
              <img src="img/header/logo-primary-dark.webp" alt="header-logo" className="h-10" />
            </a>

            {/* Nút mở menu trên mobile */}
            <button 
              className="md:hidden px-3 py-2 border rounded text-gray-600 hover:text-black transition-all"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <i className={`ri-menu-line text-2xl ${menuOpen ? "hidden" : "block"}`}></i>
              <i className={`ri-close-line text-2xl ${menuOpen ? "block" : "hidden"}`}></i>
            </button>

            {/* Menu điều hướng */}
            <div className={`absolute md:static top-16 left-0 w-full bg-white md:bg-transparent md:flex transition-all duration-300
              ${menuOpen ? "block" : "hidden"} md:block`}>
              <ul id="pq-main-menu" className="navbar-nav flex flex-col md:flex-row md:gap-6 text-lg font-semibold p-4 md:p-0">
                <li className="menu-item"><Link to="/">Home</Link></li>
                <li className="menu-item"><Link to="/aboutus">About Us</Link></li>
                <li className="menu-item"><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>

            {/* Phần bên phải (Lịch hẹn & Đăng nhập) */}
         {/* Phần bên phải (Lịch hẹn & Đăng nhập) */}
<div className="flex items-center gap-4">
  {token && (
    <Link
      to="/lichhen"
      className="btn-header bg-blue-500 hover:bg-blue-600"
      title="Lịch hẹn của bạn"
    >
      Lịch hẹn
    </Link>
  )}

  {token ? (
    <button
      onClick={thoatTrang}
      className="btn-header bg-red-500 hover:bg-red-600"
    >
      Logout
    </button>
  ) : (
    <Link to="/login" className="btn-header bg-gray-800 hover:bg-gray-900">
      Đăng nhập
    </Link>
  )}
</div>
          </div>
        </div>
      </div>
    </header>
  );
}
