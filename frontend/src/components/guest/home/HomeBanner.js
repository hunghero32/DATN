import React from 'react';

export default function Banner() {
    return (
        <section className="pq-banner pb-xl-0">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-7">
                        <div className="pq-banner-title">
                            <span className="pq-sub-title">Chào mừng đến với dịch vụ y tế tốt nhất</span>
                            <h2 data-splitting className="pq-main-title">Dịch vụ y tế với chi phí hợp lý cho mọi người</h2>
                        </div>
                    </div>
                    <div className="col-lg-5 mt-lg-0 mt-4 pe-md-5 pe-lg-0">
                        <p className="pq-banner-description">
                            Có rất nhiều phiên bản khác nhau của Lorem Ipsum, nhưng các từ ngẫu nhiên không mang ý nghĩa 
                            khiến chúng trở nên khó tin. Nếu bạn đang tìm kiếm một lựa chọn đáng tin cậy, hãy chắc chắn rằng 
                            không có gì đáng xấu hổ...
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="pq-banner-img pq-image-effect wow img-ptkey-top" data-wow-duration="1s">
                            <img
                                className="pq-img"
                                decoding="async"
                                src="img/banner/home-banner-02.webp"
                                alt="Hình ảnh quảng bá dịch vụ y tế với chi phí hợp lý"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
