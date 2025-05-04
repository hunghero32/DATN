import React from 'react';

const AboutUsSection = () => {
  return (
    <>
      <section className="breadcrumb">
        <div className="container">
          <div className="pq-breadcrumb pq-style-1">
            <h2 className="pq-breadcrumb-title">Về Chúng Tôi</h2>
            <ol className="pq-breadcrumb-container">
              <li className="pq-breadcrumb-item">
                <a href="/"> 
                  <span>Trang chủ</span>
                </a>
              </li>
              <li className="pq-breadcrumb-item active">Về chúng tôi</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="about-us">
        <div className="container">
          <div className="row flex-lg-row-reverse align-items-center">
            <div className="col-lg-6 wow fadeInLeft animated wow fadeInRight animated"> {/* Xóa bớt class wow trùng lặp */}
              <div className="row">
                <div className="col-lg-12">
                  <div className="pq-section-title">
                    <span className="pq-sub-title">Về Chúng Tôi</span>
                    <h2 data-splitting className="pq-main-title">
                      Hành Trình Đến Sức Khỏe Tốt Hơn Bắt Đầu Tại Đây
                    </h2>
                    <p className="pq-section-title-description">
                      Có rất nhiều biến thể của Lorem Ipsum, nhưng những từ ngẫu nhiên này không thực sự đáng tin cậy.
                    </p>
                  </div>
                </div>
              </div>
              <div className="pq-about-us pq-style-4">
                <div className="pq-about-us-icon-box">
                  <div className="pq-about-icon">
                    <i aria-hidden="true" className="flaticon-dental-service"></i>
                  </div>
                  <h2 className="pq-about-us-title">Chăm Sóc Khẩn Cấp</h2>
                  <p className="pq-about-us-description">
                    Thu thập thông tin đáng tin cậy từ các tạp chí y khoa và nguồn trực tuyến đáng tin cậy.
                  </p>
                </div>
                <div className="pq-about-us-icon-box">
                  <div className="pq-about-icon">
                    <i aria-hidden="true" className="flaticon-dentist-chair"></i>
                  </div>
                  <h2 className="pq-about-us-title">Bảo Hiểm Y Tế</h2>
                  <p className="pq-about-us-description">
                    Thu thập thông tin đáng tin cậy từ các tạp chí y khoa và nguồn trực tuyến đáng tin cậy.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 pe-lg-5 mt-lg-0 mt-4 wow img-ptkey-left">
              <div className="pq-about-us-img pq-style-4">
                <img
                  className="pq-img"
                  src="/img/about-us/about-us-3/h3-about-001.webp"
                  alt="hinh-anh-ve-chung-toi"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUsSection;