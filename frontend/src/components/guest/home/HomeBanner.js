import React, { useEffect, useState } from 'react';

export default function Banner() {
  const [bannerData, setBannerData] = useState({
    banner: []
  });

  useEffect(() => {
    // Lấy dữ liệu từ API
    fetch('http://localhost:8000/api/system')
      .then((response) => response.json())
      .then((data) => {
        if (data.banner && data.banner.length > 0) {
          setBannerData({ banner: JSON.parse(data.banner) });
        }
      })
      .catch((error) => console.error('Error fetching banner data:', error));
  }, []);

  return (
    <section className="pq-banner pb-xl-0">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <div className="pq-banner-title">
              <span className="pq-sub-title">Chào mừng đến với dịch vụ y tế tốt nhất</span>
              <h2 data-splitting className="pq-main-title">
                Dịch vụ y tế với chi phí hợp lý cho mọi người
              </h2>
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
              {bannerData.banner.length > 0 && (
                <img
                  className="pq-img"
                  decoding="async"
                  src={bannerData.banner[0].image} // Lấy ảnh từ API
                  alt="Hình ảnh quảng bá dịch vụ y tế với chi phí hợp lý"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
