import React from 'react';

const ServiceOut = () => {
  return (
    <section className="service pq-bg-dark">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="pq-section-title pq-section-dark">
              <span className="pq-sub-title">Dịch Vụ Của Chúng Tôi</span>
              <h2 data-splitting className="pq-main-title">
                Dịch Vụ Y Tế Xuất Sắc Mọi Lúc, Mọi Nơi
              </h2>
            </div>
            <div className="pq-btn-container pq-section-btn">
              <a href="ourservices-2.html" className="pq-button">
                <div className="pq-button-block">
                  <span className="pq-button-text">Xem Thêm</span>
                  <span className="pq-button-text">Xem Thêm</span>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="pq-service-box-2-list pq-hover-active">
          {/* Service Box Component */}
          <ServiceBox
            title="Xạ Trị"
            description="Có rất nhiều phương pháp xạ trị hiện đại mang lại hiệu quả điều trị cao…"
            icon="flaticon-healthcare"
            link="angioplasty-services.html"
          />
          <ServiceBox
            title="Dịch Vụ Chăm Sóc Mắt"
            description="Dịch vụ chuyên nghiệp giúp bạn bảo vệ và chăm sóc đôi mắt của mình…"
            icon="flaticon-laboratory"
            link="eyecare-services.html"
          />
          <ServiceBox
            title="Chăm Sóc Răng Miệng"
            description="Các dịch vụ nha khoa hàng đầu giúp bạn có một nụ cười khỏe mạnh…"
            icon="flaticon-dentist-chair"
            link="dental-services.html"
          />
          <ServiceBox
            title="Phòng Phẫu Thuật"
            description="Trang bị hiện đại, đội ngũ bác sĩ chuyên môn cao đảm bảo ca phẫu thuật an toàn…"
            icon="flaticon-hospital-bed"
            link="angioplasty-services.html"
          />
          <ServiceBox
            title="Dịch Vụ Tim Mạch"
            description="Chăm sóc sức khỏe tim mạch toàn diện với các phương pháp tiên tiến…"
            icon="flaticon-orthopedics-1"
            link="cardiology-services.html"
          />
          {/* End Service Box Component */}
          <div className="pq-service-button-block style-2">
            <div className="pq-btn-container">
              <a href="angioplasty-services.html" className="pq-button pq-round-button">
                <div className="pq-button-block">
                  <span className="pq-button-text">Xem Thêm</span>
                  <span className="pq-button-text">Xem Thêm</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Reusable Service Box Component
const ServiceBox = ({ title, description, icon, link }) => {
  return (
    <div className="pq-service-box pq-style-2 pq-hover-item">
      <h2 className="pq-service-title">{title}</h2>
      <p className="pq-service-description">{description}</p>
      <div className="pq-service-icon">
        <i className={icon}></i>
      </div>
      <div className="pq-btn-container pq-button-flat">
        <a href={link} className="pq-button">
          <div className="pq-button-block">
            <span className="pq-button-text">Tìm Hiểu Thêm</span>
            <span className="pq-button-text">Tìm Hiểu Thêm</span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default ServiceOut;