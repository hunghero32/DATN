import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(""); // Thêm state lưu tên người dùng

  // Kiểm tra token khi component được mount và theo dõi sự thay đổi
  useEffect(() => {
    // Lấy token và username từ localStorage ngay khi component mount
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (storedToken) {
      setToken(storedToken);
      setUsername(storedUsername || "User");
    }
  }, []); // Chỉ chạy 1 lần khi component mount

  // Hàm đăng xuất
  const thoatTrang = () => {
    // Xóa token khỏi localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    
    // Cập nhật lại state và UI
    setToken(null);
    setUsername("");

    // Chuyển hướng về trang chủ
    navigate("/");
  };

  // Hàm đăng nhập (Giả định bạn có một hàm login để test)
  const login = () => {
    // Sau khi đăng nhập thành công
    localStorage.setItem("token", "yourToken");
    localStorage.setItem("username", "yourUsername");

    // Cập nhật lại state
    setToken("yourToken");
    setUsername("yourUsername");
  };

  return (
    <header id="pq-header" className="pq-header-style-1 pq-has-sticky">
      <div className="pq-top-header pq-bg-dark">
        <div className="container">
          <div className="pq-top-header-row">
            <div className="pq-top-header-contact">
              <ul className="pq-top-contact-list">
                <li className="pq-top-contact-list-item">
                  <a href="#">
                    <div className="pq-icon">
                      <i className="flaticon-phone-call"></i>
                    </div>
                    <span> +1800-001-658</span>
                  </a>
                </li>
                <li className="pq-top-contact-list-item">
                  <div className="pq-icon">
                    <i className="ti-timer"></i>
                  </div>
                  <span>Monday - Friday 10:00 to 6:00</span>
                </li>
              </ul>
            </div>

            <div className="pq-top-header-social-icon">
              <ul className="pq-social-list">
                <li><a href="https://www.instagram.com/peacefulqode/"><i className="fab fa-instagram"></i></a></li>
                <li><a href="https://www.facebook.com/people/Peaceful-Qode/100060082803109/"><i className="fab fa-facebook-f"></i></a></li>
                <li><a href="https://www.instagram.com/peacefulqode/"><i className="fab fa-pinterest"></i></a></li>
                <li><a href="https://in.linkedin.com/company/peacefulqode"><i className="fab fa-linkedin-in"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="pq-bottom-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="navbar navbar-expand-lg">
                <a href="/" className="navbar-brand">
                  <img src="img/header/logo-primary-dark.webp" alt="header-logo" />
                </a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <div className="pq-menu-contain">
                    <ul id="pq-main-menu" className="navbar-nav ml-auto">
                      <li className="menu-item current-menu-item">
                        <Link to="/">Home</Link>
                      </li>
                      <li className="menu-item">
                        <Link to="/aboutus">About Us</Link>
                      </li>
                      <li className="menu-item">
                        <Link to="/contact">Contact Us</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pq-header-right">
                  {token ? (
                    <div className="flex items-center gap-4">
                      <span className="text-white font-bold">Hello, {username}!</span>
                      <button
                        onClick={thoatTrang}
                        className="pq-button bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="pq-btn-container">
                      <Link to="/login" className="pq-button">
                        <div className="pq-button-block">
                          <span className="pq-button-text">Đăng nhập</span>
                          <span className="pq-button-text">Đăng nhập</span>
                        </div>
                      </Link>
                    </div>
                  )}

                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="pq-button-line"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
