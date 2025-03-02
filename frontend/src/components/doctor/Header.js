import React from "react";

const Header = () => {
  return (
    <div className="position-relative">
    <nav
      className="nav navbar navbar-expand-xl navbar-light iq-navbar pt-2 pb-2 px-2"
      id="boxid"
    >
      <div className="container-fluid navbar-inner">
        <div className="row flex-grow-1">
          <div className="col-lg-4 col-md-6 align-items-center d-flex">
            <li className="nav-item dropdown search-width pt-2 pt-lg-0">
              <div className="form-group input-group mb-0 search-input">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type here to search..."
                />
                <span className="input-group-text">
                  <svg
                    className="icon-20 text-primary"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="11.7669"
                      cy="11.7666"
                      r="8.98856"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></circle>
                    <path
                      d="M18.0186 18.4851L21.5426 22"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin ="round"
                    ></path>
                  </svg>
                </span>
              </div>
            </li>
          </div>
          <div className="col-lg-8 col-md-6 d-flex justify-content-end align-items-center">
           
            <li
              className="nav-item iq-full-screen d-none d-xl-block"
              id="fullscreen-item"
            >
              <a href="#" className="nav-link" id="btnFullscreen">
                <i className="ri-fullscreen-line normal-screen"></i>
                <i className="ri-fullscreen-exit-line full-normal-screen d-none"></i>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                href="#"
                className="nav-link d-none d-xl-block"
                id="notification-drop"
                data-bs-toggle="dropdown"
              >
                <i className="ri-notification-4-line"></i>
              </a>
              <div
                className="p-0 sub-drop dropdown-menu dropdown-menu-end"
                aria-labelledby="notification-drop"
              >
                <div className="m-0 -none card">
                  <div className="py-3 card-header d-flex justify-content-between bg-primary mb-0 rounded-top-3">
                    <div className="header-title w-100">
                      <h5 className="mb-0 text-white d-flex justify-content-between">
                        All Notifications
                        <small className="badge text-bg-light pt-1">4</small>
                      </h5>
                    </div>
                  </div>
                  <div className="p-0 card-body">
                    <a href="#" className="iq-sub-card">
                      <div className="d-flex align-items-center">
                        <img
                          className="p-1 avatar-40"
                          src="assets/images/user/01.jpg"
                          
                          loading="lazy"
                        />
                        <div className="ms-3 flex-grow-1 text-start">
                          <h6 className="mb-0">Emma Watson Bni</h6>
                          <div className="d-flex justify-content-between">
                            <p className="mb-0">95 MB</p>
                            <small className="float-end font-size-12">
                              Just Now
                            </small>
                          </div>
                        </div>
                      </div>
                    </a>
                    <a href="#" className="iq-sub-card">
                      <div className="d-flex align-items-center">
                        <img
                          className="p-1 avatar-40"
                          src="assets/images/user/02.jpg"
                          
                          loading="lazy"
                        />
                        <div className="ms-3 flex-grow-1 text-start">
                          <h6 className="mb-0">New customer is join</h6>
                          <div className="d-flex justify-content-between">
                            <p className="mb-0">Jond Bini</p>
                            <small className="float-end font-size-12">
                              Just Now
                            </small>
                          </div>
                        </div>
                      </div>
                    </a>
                    <a href="#" className="iq-sub-card">
                      <div className="d-flex align-items-center">
                        <img
                          className="p-1 avatar-40"
                          src="assets/images/user/03.jpg"
                          
                          loading="lazy"
                        />
                        <div className="ms-3 flex-grow-1 text-start">
                          <h6 className="mb-0">Two customer is left</h6>
                          <div className="d-flex justify-content-between">
                            <p className="mb-0">Jond Bini</p>
                            <small className="float-end font-size-12">
                              Just Now
                            </small>
                          </div>
                        </div>
                      </div>
                    </a>
                    <a href="#" className="iq-sub-card">
                      <div className="d-flex align-items-center">
                        <img
                          className="p-1 avatar-40"
                          src="assets/images/user/04.jpg"
                          
                          loading="lazy"
                        />
                        <div className="ms-3 flex-grow-1 text-start">
                          <h6 className="mb-0">New Mail from Fenny</h6>
                          <div className="d-flex justify-content-between">
                            <p className="mb-0">Jond Bini</p>
                            <small className="float-end font-size-12">
                              Just Now
                            </small>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                href="#"
                className="nav-link d-none d-xl-block"
                id="notification-drop"
                data-bs-toggle="dropdown"
              >
                <i className="ri-mail-open-line"></i>
              </a>
              <div
                className="p-0 sub-drop dropdown-menu dropdown-menu-end"
                aria-labelledby="notification-drop"
              >
                <div className="m-0 -none card">
                  <div className="py-3 card-header d-flex justify-content-between bg-primary mb-0 rounded-top-3">
                    <div className="header-title w-100">
                      <h5 className="mb-0 text-white d-flex justify-content-between">
                        All Messages
                        <small className="badge text-bg-light pt-1">4</small>
                      </h5>
                    </div>
                  </div>
                  <div className="p-0 card-body">
                    <a href="#" className="iq-sub-card">
                      <div className="d-flex align-items-center">
                        <img
                          className="p-1 avatar-40"
                          src="assets/images/user/01.jpg"
                          
                          loading="lazy"
                        />
                        <div className="ms-3 flex-grow-1 text-start">
                          <h6 className="mb-0">Emma Watson Bni</h6>
                          <div className="d-flex justify-content-between">
                            <p className="mb-0">Jond Bini</p>
                            <small className="float-end font-size-12">
                              Just Now
                            </small>
                          </div>
                        </div>
                      </div>
                    </a>
                    <a href="#" className="iq-sub-card">
                      <div className="d-flex align-items-center">
                        <img
                          className="p-1 avatar-40"
                          src="assets/images/user/02.jpg"
                          
                          loading="lazy"
                        />
                        <div className="ms-3 flex-grow-1 text-start">
                          <h6 className="mb-0">New customer is join</h6>
                          <div className="d-flex justify-content-between">
                            <p className="mb-0">Jond Bini</p>
                            <small className="float-end font-size-12">
                              5 days ago
                            </small>
                          </div>
                        </div>
                      </div>
                    </a>
                    <a href="#" className="iq-sub-card">
                      <div className="d-flex align-items-center">
                        <img
                          className="p-1 avatar-40"
                          src="assets/images/user/03.jpg"
                          loading="lazy"
                        />
                        <div className="ms-3 flex-grow-1 text-start">
                          <h6 className="mb-0">Two customer is left</h6>
                          <div className="d-flex justify-content-between">
                            <p className="mb-0">Jond Bini</p>
                            <small className="float-end font-size-12">
                              2 days ago
                            </small>
                          </div>
                        </div>
                      </div>
                    </a>
                    <a href="#" className="iq-sub-card">
                      <div className="d-flex align-items-center">
                        <img
                          className="p-1 avatar-40"
                          src="assets/images/user/04.jpg"
                          
                          loading="lazy"
                        />
                        <div className="ms-3 flex-grow-1 text-start">
                          <h6 className="mb-0">New Mail from Fenny</h6>
                          <div className="d-flex justify-content-between">
                            <p className="mb-0">Jond Bini</p>
                            <small className="float-end font-size-12">
                              3 days ago
                            </small>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item d-block d-xl-none">
              <a
                className="wrapper-menu"
                data-toggle="sidebar"
                data-active="true"
              >
                <div className="main-circle">
                  <i className="ri-more-fill"></i>
                </div>
              </a>
            </li>
            <li className="nav-item ms-3 d-flex align-items-center d-block d-xl-none">
              <button
                id="navbar-toggle"
                className="navbar-toggler px-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-btn">
                  <span className="navbar-toggler-icon"></span>
                </span>
              </button>
            </li>

            <li className="nav-item dropdown">
              <a
                href="#"
                className="nav-link d-flex align-items-center"
                id="notification-drop"
                data-bs-toggle="dropdown"
              >
                <img
                  src="https://templates.iqonic.design/xray-dist/html/assets/images/user/11.png"
                  style={{ height: "50px", width: "50px" }}

                  className="img-fluid rounded"
                  alt="user"
                />
                <div className="caption d-none d-lg-block">
                  <h6 className="mb-0 line-height">Bini Jets</h6>
                  <span className="font-size-12">Available</span>
                </div>
              </a>
              <div
                className="p-0 sub-drop dropdown-menu dropdown-menu-end"
                aria-labelledby="notification-drop"
              >
                <div className="m-0 -none card">
                  <div className="py-3 card-header d-flex justify-content-between bg-primary mb-0 rounded-top-3">
                    <div className="header-title">
                      <h5 className="mb-0 text-white">All Notifications</h5>
                      <span className="text-white">Available</span>
                    </div>
                  </div>
                  <div className="p-0 card-body">
                    <a
                      href="doctor/doctor-profile.html"
                      className="iq-sub-card"
                    >
                      <div className="d-flex align-items-center">
                        <div className="bg-primary-subtle px-3 py-2 rounded-1">
                          <i className="ri-file-user-line"></i>
                        </div>
                        <div className="ms-3 flex-grow-1 text-start">
                          <h6 className="mb-0">My Profile</h6>
                          <p className="mb-0">View personal profile details.</p>
                        </div>
                      </div>
                    </a>
                    <a href="doctor/edit-doctor.html" className="iq-sub-card">
                      <div className="d-flex align-items-center">
                        <div className="bg-primary-subtle px-3 py-2 rounded-1">
                          <i className="ri-profile-line"></i>
                        </div>
                        <div className="ms-3 flex-grow-1 text-start">
                          <h6 className="mb-0">Edit Profile</h6>
                          <p className="mb-0">Modify your personal details.</p>
                        </div>
                      </div>
                    </a>
                    <a
                      href="extra-pages/account-setting.html"
                      className="iq-sub-card"
                    >
                      <div className="d-flex align-items-center">
                        <div className="bg-primary-subtle px-3 py-2 rounded-1">
                          <i className="ri-account-box-line"></i>
                        </div>
                        <div className="ms-3 flex-grow-1 text-start">
                          <h6 className="mb-0">Account Settings</h6>
                          <p className="mb-0">
                            Manage your account parameters.
                          </p>
                        </div>
                      </div>
                    </a>
                    <a
                      href="extra-pages/privacy-setting.html"
                      className="iq-sub-card"
                    >
                      <div className="d-flex align-items-center">
                        <div className="bg-primary-subtle px-3 py-2 rounded-1">
                          <i className="ri-lock-line"></i>
                        </div>
                        <div className="ms-3 flex-grow-1 text-start">
                          <h6 className="mb-0">Privacy Settings</h6>
                          <p className="mb-0">
                            Control your privacy parameters.
                          </p>
                        </div>
                      </div>
                    </a>
                    <div className="iq-sub-card d-flex justify-content-center">
                      <a
                        href="auth/sign-in.html"
                        className="btn btn-primary-subtle"
                      >
                        Sign out
                        <i className="ri-login-box-line ms-2"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </div>
        </div>
      </div>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="row flex-grow-1 pt-4 pb-4 px-2">
          <div className="col-md-12 d-flex justify-content-end align-items-center">
          
            <li className="nav-item dropdown"></li>
            <li
              className="nav-item iq-full-screen iq-full-screen2 d-block d-xl-none"
              id="fullscreen-item"
            >
              <a href="#" className="nav-link" id="btnFullscreen">
                <i className="ri-fullscreen-line normal-screen"></i>
                <i className="ri-fullscreen-exit-line full-normal-screen d-none"></i>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                href="#"
                className="nav-link d-block d-xl-none"
                id="notification-drop"
                data-bs-toggle="dropdown"
              >
                <i className="ri-notification-4-line"></i>
              </a>
              <div
                className="p-0 sub-drop dropdown-menu dropdown-menu-end"
                aria-labelledby="notification-drop"
              >
                <div className="m-0 -none card">
                  <div className="py-3 card-header d-flex justify-content-between bg-primary mb-0">
                    <div className="header-title">
                      <h5 className="mb-0 text-white">All Notifications</h5>
                    </div>
                  </div>
                  <div className="p-0 card-body">
                    <a href="#" className="iq-sub-card">
                      <div className="d-flex align-items-center">
                        <img
                          className="p-1 avatar-40 rounded-pill bg-primary-subtle"
                          src="assets/images/user/01.jpg"
                          loading="lazy"
                        />
                        <div className="ms-3 flex-grow-1 text-start">
                          <h6 className="mb-0">Emma Watson Bni</h6>
                          <p className="mb-0">95 MB</p>
                        </div>
                        <small className="float-end font-size-12">
                          Just Now
                        </small>
                      </div>
                    </a>
                    <a href="#" className="iq-sub-card">
                      <div className="d-flex align-items-center">
                        <img
                          className="p-1 avatar-40 rounded-pill bg-primary-subtle"
                          src="assets/images/user/02.jpg"
                          
                          loading="lazy"
                        />
                        <div className="ms-3 flex-grow-1 text-start">
                          <h6 className="mb-0">New customer is join</h6>
                          <p className="mb-0">Cyst Bni</p>
                        </div>
                        <small className="float-end font-size-12">
                          5 days ago
                        </small>
                      </div>
                    </a>
                    <a href="#" className="iq-sub-card">
                      <div className="d-flex align-items-center">
                        <img
                          className="p-1 avatar-40 rounded-pill bg-primary-subtle"
                          src="assets/images/user/03.jpg"
                          loading="lazy"
                        />
                        <div className="ms-3 flex-grow-1 text-start">
                          <h6 className="mb-0">Two customer is left</h6>
                          <p className="mb-0">Cyst Bni</p>
                        </div>
                        <small className="float-end font-size-12">
                          2 days ago
                        </small>
                      </div>
                    </a>
                    <a href="#" className="iq-sub-card">
                      <div className="d-flex align-items-center">
                        <img
                          className="p-1 avatar-40 rounded-pill bg-primary-subtle"
                          src="assets/images/user/04.jpg"
                          loading="lazy"
                        />
                        <div className="ms-3 flex-grow-1 text-start">
                          <h6 className="mb-0">New Mail from Fenny</h6>
                          <p className="mb-0">Cyst Bni</p>
                        </div>
                        <small className="float-end font-size-12">
                          3 days ago
                        </small>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                href="#"
                className="nav-link d-block d-xl-none"
                id="notification-drop"
                data-bs-toggle="dropdown"
              >
                <i className="ri-mail-open-line"></i>
              </a>
              <div
                className="p-0 sub-drop dropdown-menu dropdown-menu-end"
                aria-labelledby="notification-drop"
              >
                <div className="m-0 -none card">
                  <div className="py-3 card-header d-flex justify-content-between bg-primary mb-0">
                    <div className="header-title">
                      <h5 className="mb-0 text-white">All Notifications</h5>
                    </div>
                  </div>
                  <div className="p-0 card-body">
                    <a href="#" className="iq-sub-card">
                      <div className="d-flex align-items-center">
                        <img
                          className="p-1 avatar-40 rounded-pill bg-primary-subtle"
                          src="assets/images/user/01.jpg"
                          loading="lazy"
                        />
                        <div className="ms-3 flex-grow-1 text-start">
                          <h6 className="mb-0">Emma Watson Bni</h6>
                          <p className="mb-0">95 MB</p>
                        </div>
                        <small className="float-end font-size-12">
                          Just Now
                        </small>
                      </div>
                    </a>
                    <a href="#" className="iq-sub-card">
                      <div className="d-flex align-items-center">
                        <img
                          className="p-1 avatar-40 rounded-pill bg-primary-subtle"
                          src="assets/images/user/02.jpg"
                          loading="lazy"
                        />
                        <div className="ms-3 flex-grow-1 text-start">
                          <h6 className="mb-0">New customer is join</h6>
                          <p className="mb-0">Cyst Bni</p>
                        </div>
                        <small className="float-end font-size-12">
                          5 days ago
                        </small>
                      </div>
                    </a>
                    <a href="#" className="iq-sub-card">
                      <div className="d-flex align-items-center">
                        <img
                          className="p-1 avatar-40 rounded-pill bg-primary-subtle"
                          src="assets/images/user/03.jpg"
                          loading="lazy"
                        />
                        <div className="ms-3 flex-grow-1 text-start">
                          <h6 className="mb-0">Two customer is left</h6>
                          <p className="mb-0">Cyst Bni</p>
                        </div>
                        <small className="float-end font-size-12">
                          2 days ago
                        </small>
                      </div>
                    </a>
                    <a href="#" className="iq-sub-card">
                      <div className="d-flex align-items-center">
                        <img
                          className="p-1 avatar-40 rounded-pill bg-primary-subtle"
                          src="assets/images/user/04.jpg"
                          loading="lazy"
                        />
                        <div className="ms-3 flex-grow-1 text-start">
                          <h6 className="mb-0">New Mail from Fenny</h6>
                          <p className="mb-0">Cyst Bni</p>
                        </div>
                        <small className="float-end font-size-12">
                          3 days ago
                        </small>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </div>
        </div>
      </div>
    </nav>
    </div>
  );
};

export default Header;
