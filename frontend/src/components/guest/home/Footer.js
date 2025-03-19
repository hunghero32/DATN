import React, { useEffect, useState } from 'react';

export default function Footer() {
  const [footerData, setFooterData] = useState({
    site_logo: "",
    site_name: "",
    hotline: "",
    email: "",
    address: "",
    social_links: []
  });

  useEffect(() => {
    fetch('http://localhost:8000/api/system')
      .then((response) => response.json())
      .then((data) => {
        setFooterData({
          site_logo: data.site_logo,
          site_name: data.site_name,
          hotline: data.hotline,
          email: data.email || 'info@peacefulqode.com',
          address: data.address || 'Themeforest, Envato HQ',
          social_links: [
            { name: 'instagram', url: 'https://www.instagram.com/peacefulqode/' },
            { name: 'facebook', url: 'https://www.facebook.com/people/Peaceful-Qode/100060082803109/' },
            { name: 'pinterest', url: 'https://www.instagram.com/peacefulqode/' },
            { name: 'linkedin', url: 'https://in.linkedin.com/company/peacefulqode' }
          ]
        });
      })
      .catch((error) => console.error('Error fetching footer data:', error));
  }, []);

  return (
    <footer className="pq-bg-dark">
      <div className="container">
        <div className="pq-top-footer">
          <div className="row">
            <div className="col-sm-6 col-lg-3">
              <div className="pq-widget">
                <div className="pq-widget-img">
                  <img src={footerData.site_logo} alt="Logo" className="pq-img" />
                </div>
                <p className="pq-description">
                  Có rất nhiều phiên bản khác nhau của văn bản, được tạo ra bằng cách thêm yếu tố hài hước ngẫu nhiên.
                </p>
                <div className="pq-widget-social-icon">
                  <ul className="pq-social-list">
                    {footerData.social_links.map((link) => (
                      <li key={link.name}>
                        <a href={link.url}>
                          <i className={`fab fa-${link.name}`}></i>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 mt-4 mt-sm-0 ps-lg-5">
              <div className="pq-widget">
                <h2 className="pq-footer-title">Liên Kết Hữu Ích</h2>
                <div className="pq-menu-link-container">
                  <ul className="pq-menu-link">
                    <li className="pq-menu-item"><a href="#">Giới thiệu</a></li>
                    <li className="pq-menu-item"><a href="#">Quy trình của chúng tôi</a></li>
                    <li className="pq-menu-item"><a href="#">Dịch vụ</a></li>
                    <li className="pq-menu-item"><a href="#">Đội ngũ</a></li>
                    <li className="pq-menu-item"><a href="#">Liên hệ</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 mt-4 mt-lg-0">
              <div className="pq-widget">
                <h2 className="pq-footer-title">Thông Tin Liên Hệ</h2>
                <div className="pq-info-box">
                  <div className="pq-icon">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div className="pq-contact-info">
                    <span className="pq-contact-title">Email:</span>
                    <a href={`mailto:${footerData.email}`}>
                      <span>{footerData.email}</span>
                    </a>
                  </div>
                </div>
                <div className="pq-info-box">
                  <div className="pq-icon">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div className="pq-contact-info">
                    <span className="pq-contact-title">Địa chỉ:</span>
                    <span>{footerData.address}</span>
                  </div>
                </div>
                <div className="pq-info-box">
                  <div className="pq-icon">
                    <i className="flaticon-phone-call"></i>
                  </div>
                  <div className="pq-contact-info">
                    <span className="pq-contact-title">Điện thoại:</span>
                    <span>{footerData.hotline}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 mt-4 mt-lg-0">
              <div className="pq-widget">
                <h2 className="pq-footer-title">Bản Tin</h2>
                <form className="pq-form-fiels">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập địa chỉ email của bạn"
                  />
                  <input
                    type="submit"
                    className="pq-submit"
                    value="Đăng Ký"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="pq-copyright-footer">
              <span className="pq-copyright">
                Bản quyền 2024 {footerData.site_name} | Đã đăng ký bản quyền
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
