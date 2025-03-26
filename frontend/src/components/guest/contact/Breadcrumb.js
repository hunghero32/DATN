export default function Breadcrumb() {
    return (
      <>
        <section className="breadcrumb">
          <div className="container">
            <div className="pq-breadcrumb pq-style-1">
              <h2 className="pq-breadcrumb-title">Liên Hệ</h2>
              <ol className="pq-breadcrumb-container">
                <li className="pq-breadcrumb-item">
                  <a href="index.html">
                    <span>Trang chủ</span>
                  </a>
                </li>
                <li className="pq-breadcrumb-item active">Liên Hệ</li>
              </ol>
            </div>
          </div>
        </section>
  
        <section className="Contact-Us pb-0">
          <div className="container">
            <div className="pq-contact-list-2">
              <div className="pq-Contact-box pq-style-2">
                <div className="pq-icon-box">
                  <div className="pq-contact-icon">
                    <i className="flaticon-mail"></i>
                  </div>
                  <h3 className="pq-icon-box-title">Gửi Mail 24/7</h3>
                </div>
                <div className="pq-contact-email">
                  <span className="pq-email">Email:</span>
                  <span className="pq-email">medicen@peacefulqode.com</span>
                  <span className="pq-email">info@peacefulqode.com</span>
                </div>
              </div>
  
              <div className="pq-Contact-box pq-style-2">
                <div className="pq-icon-box">
                  <div className="pq-contact-icon">
                    <i className="flaticon-phone-call"></i>
                  </div>
                  <h3 className="pq-icon-box-title">Gọi Điện 24/7</h3>
                </div>
                <div className="pq-contact-email">
                  <span className="pq-email">Di động:</span>
                  <span className="pq-email">+0 123 457 8965</span>
                  <span className="pq-email">+1 987 654 3210</span>
                </div>
              </div>
  
              <div className="pq-Contact-box pq-style-2">
                <div className="pq-icon-box">
                  <div className="pq-contact-icon">
                    <i className="flaticon-location"></i>
                  </div>
                  <h3 className="pq-icon-box-title">Địa Chỉ Của Chúng Tôi</h3>
                </div>
                <div className="pq-contact-email">
                  <span className="pq-email">Địa chỉ:</span>
                  <span className="pq-email">1012 Pebda Parkway, Mirpur 2, Dhaka,</span>
                  <span className="pq-email">Bangladesh</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
  