import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";
import api from "../../../ultils/api/axios";

export default function Header() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [siteData, setSiteData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken && storedToken !== "null") {
      setToken(storedToken);
    }

    fetch("http://localhost:8000/api/system")
      .then((response) => response.json())
      .then((data) => setSiteData(data))
      .catch((error) => console.error("Error fetching site data:", error));

    api.get("/api/client/appointments")
      .then((response) => {
        if (response.data.status) {
          setAppointments(response.data.data);
        } else {
          console.error(response.data.message);
        }
      })
      .catch(() => console.error("Lỗi khi lấy danh sách lịch hẹn."));
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
    localStorage.removeItem("authToken");
    setToken(null);
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
  return (
    <header className="pq-header-style-1 pq-has-sticky">
      <div className="pq-bottom-header bg-white shadow-md">
        <div className="container">
          <div className="navbar navbar-expand-lg flex justify-between items-center py-3">
            <Link to="/" className="navbar-brand">
              {siteData && siteData.site_logo ? (
                <img src={siteData.site_logo} alt="logo" className="h-10 w-40" />
              ) : (
                <img src="img/header/logo-primary-dark.webp" alt="logo" className="h-10 w-40" />
              )}
            </Link>

            <button className="md:hidden px-3 py-2 border rounded text-gray-600 hover:text-black transition-all" onClick={() => setMenuOpen(!menuOpen)}>
              <i className={`ri-menu-line text-2xl ${menuOpen ? "hidden" : "block"}`}></i>
              <i className={`ri-close-line text-2xl ${menuOpen ? "block" : "hidden"}`}></i>
            </button>

            <div className={`absolute md:static top-16 left-0 w-full bg-white md:bg-transparent md:flex transition-all duration-300 ${menuOpen ? "block" : "hidden"} md:block`}>
              <ul className="navbar-nav flex flex-col md:flex-row md:gap-6 text-lg font-semibold p-4 md:p-0">
                <li><Link to="/" className="block py-2 md:py-0 !text-blue-600">Trang Chủ</Link></li>
                <li><Link to="/aboutus" className="block py-2 md:py-0 !text-blue-600">Thông Tin</Link></li>
                <li><Link to="/contact" className="block py-2 md:py-0 !text-blue-600">Liên Hệ</Link></li>
              </ul>
            </div>

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
                    className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <i className="ri-user-3-line text-xl text-gray-700"></i>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-50">
                      <div className="py-1">
                        <Link to="/patientProfile" className="flex items-center px-4 py-2 hover:bg-gray-100 !text-blue-600">
                          <i className="ri-user-line w-5"></i> Thông tin cá nhân
                        </Link>
                        <Link to="/lichhen" className="flex items-center px-4 py-2 hover:bg-gray-100 !text-blue-600">
                          <i className="ri-calendar-line w-5"></i> Lịch hẹn
                        </Link>
                        {appointments.map((appointment) => appointment.status === "completed" && (
                          <div key={appointment.id}>
                            <div className="border-t border-gray-100"></div>
                            <Link to={`/hoadon/${appointment.id}`} className="flex items-center px-4 py-2 hover:bg-gray-100 !text-blue-600">
                              <i className="ri-file-text-line w-5"></i> Xem Hóa Đơn
                            </Link>
                            <Link to="/danhgia" className="flex items-center px-4 py-2 hover:bg-gray-100 !text-blue-600">
                              <i className="ri-star-line w-5"></i> Đánh giá
                            </Link>
                          </div>
                        ))}
                        <div className="border-t border-gray-100"></div>
                        <button onClick={thoatTrang} className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-red-500">
                          <i className="ri-logout-box-r-line w-5"></i> Đăng xuất
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 h-10 w-32 flex items-center justify-center transition">
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
}