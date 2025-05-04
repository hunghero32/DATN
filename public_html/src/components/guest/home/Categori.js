import React from 'react';

const Categori = () => {
    return (
        <section className="Portfolio overflow-hidden">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="pq-section-title">
                            <span className="pq-sub-title">Dự Án Của Chúng Tôi</span>
                            <h2 className="pq-main-title">Xem Các Dự Án Thành Công Gần Đây</h2>
                        </div>
                        <div className="pq-btn-container pq-section-btn">
                            <a href="3-Column.html" className="pq-button">
                                <div className="pq-button-block">
                                    <span className="pq-button-text">Xem Thêm</span>
                                    <span className="pq-button-text">Xem Thêm</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="pq-moving-scroll">
                    <ul className="pq-flex pq-moving-scroll-list">
                        <li className="pq-portfoliobox-1">
                            <div className="pq-portfolio-img">
                                <a href="portfolio.html">
                                    <img className="pq-img" src="img/portfolio/portfolio-003.webp" alt="Hình ảnh dự án" />
                                </a>
                            </div>
                            <div className="pq-portfolio-info">
                                <span className="pq-portfolio-tag"><a href="portfolio.html">Phẫu thuật</a></span>
                                <h2 className="pq-portfolio-title"><a href="portfolio.html">Hộ Chiếu Sức Khỏe</a></h2>
                            </div>
                        </li>
                        <li className="pq-portfoliobox-1">
                            <div className="pq-portfolio-img">
                                <a href="portfolio.html">
                                    <img className="pq-img" src="img/portfolio/portfolio-004.webp" alt="Hình ảnh dự án" />
                                </a>
                            </div>
                            <div className="pq-portfolio-info">
                                <span className="pq-portfolio-tag"><a href="portfolio.html">Dược phẩm</a></span>
                                <h2 className="pq-portfolio-title"><a href="portfolio.html">Hộ Chiếu Sức Khỏe</a></h2>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Categori;