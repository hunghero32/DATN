import React from 'react';

export default function About() {
    return (
        <section className="about-us pq-bg-primary">
            <div className="about-us-floting-img">
                <img className="img" src="img/about-us/floting-img-001.webp" alt="Hình ảnh minh họa" />
            </div>
            <div className="container">
                <div className="row flex-lg-row-reverse align-items-center">
                    <div className="col-lg-6 ps-lg-5 mt-5 mt-lg-0 pt-img-left">
                        <div className="pq-about-us-box style-1">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="pq-section-title pq-section-dark">
                                        <span className="pq-sub-title">Về Chúng Tôi</span>
                                        <h2 data-splitting className="pq-main-title">
                                            Hành trình chăm sóc sức khỏe của bạn bắt đầu từ đây
                                        </h2>
                                        <p className="pq-section-title-description">
                                            Có rất nhiều phiên bản khác nhau của Lorem Ipsum, nhưng các từ ngẫu nhiên không mang ý nghĩa
                                            khiến chúng trở nên khó tin.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pq-about-us-icon-box">
                                <div className="pq-icon">
                                    <i aria-hidden="true" className="flaticon-insurance"></i>
                                </div>
                                <div className="pq-about-us-info">
                                    <h2 className="pq-about-us-title">100% An Toàn & Đáng Tin Cậy</h2>
                                    <p className="pq-about-us-description">
                                        Chúng tôi cam kết mang lại dịch vụ y tế an toàn và đáng tin cậy với các phương pháp điều trị tiên tiến.
                                    </p>
                                </div>
                            </div>
                            <div className="pq-btn-container pq-button-flat">
                                <a href="about-us.html" className="pq-button">
                                    <div className="pq-button-block">
                                        <span className="pq-button-text">Về Chúng Tôi</span>
                                        <span className="pq-button-text">Về Chúng Tôi</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 mt-4 mt-lg-0 pq-img-left">
                        <div className="pq-abut-us-img pq-image-effect wow img-ptkey-left" data-wow-duration="1s">
                            <img className="pq-img" decoding="async" src="img/about-us/h1-about-001.webp" alt="Hình ảnh về chúng tôi" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
