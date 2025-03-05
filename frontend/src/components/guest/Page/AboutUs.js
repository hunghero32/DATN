import React from 'react';

const AboutUsSection = () => {
  return (
    <>
      <section className="breadcrumb">
        <div className="container">
          <div className="pq-breadcrumb pq-style-1">
            <h2 className="pq-breadcrumb-title">About Us</h2>
            <ol className="pq-breadcrumb-container">
              <li className="pq-breadcrumb-item">
                <a href="index.html"> {/* Consider using React Router's Link component */}
                  <span>home</span>
                </a>
              </li>
              <li className="pq-breadcrumb-item active">about us</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="about-us">
        <div className="container">
          <div className="row flex-lg-row-reverse align-items-center">
            <div className="col-lg-6 wow fadeInLeft animated wow fadeInRight animated"> {/* Consider removing duplicate wow class */}
              <div className="row">
                <div className="col-lg-12">
                  <div className="pq-section-title">
                    <span className="pq-sub-title">About US</span>
                    <h2 data-splitting className="pq-main-title">
                      Your Journey to Better Health Starts Here
                    </h2>
                    <p className="pq-section-title-description">
                      There are many variations of passages of Lorem Ipsum available,
                      but the or randomised words which don’t look even slightly
                      believable
                    </p>
                  </div>
                </div>
              </div>
              <div className="pq-about-us pq-style-4">
                <div className="pq-about-us-icon-box">
                  <div className="pq-about-icon">
                    <i aria-hidden="true" className="flaticon-dental-service"></i>
                  </div>
                  <h2 className="pq-about-us-title">Emergency Care</h2>
                  <p className="pq-about-us-description">
                    Collect reliable information from medical journals and trusted
                    online resources.
                  </p>
                </div>
                <div className="pq-about-us-icon-box">
                  <div className="pq-about-icon">
                    <i aria-hidden="true" className="flaticon-dentist-chair"></i>
                  </div>
                  <h2 className="pq-about-us-title">Health Insurance</h2>
                  <p className="pq-about-us-description">
                    Collect reliable information from medical journals and trusted
                    online resources.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 pe-lg-5 mt-lg-0 mt-4 wow img-ptkey-left">
              <div className="pq-about-us-img pq-style-4">
                <img
                  className="pq-img"
                  src="/img/about-us/about-us-3/h3-about-001.webp" // Added %PUBLIC_URL%
                  alt="about-us-img"
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