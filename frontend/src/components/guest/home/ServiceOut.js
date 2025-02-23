import React from 'react';

const ServiceOut = () => {
  return (
    <section className="service pq-bg-dark">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="pq-section-title pq-section-dark">
              <span className="pq-sub-title">Our Service</span>
              <h2 data-splitting className="pq-main-title">
                Exceptional Medical Service Every Time
              </h2>
            </div>
            <div className="pq-btn-container pq-section-btn">
              <a href="ourservices-2.html" className="pq-button">
                <div className="pq-button-block">
                  <span className="pq-button-text">Read More</span>
                  <span className="pq-button-text">Read More</span>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="pq-service-box-2-list pq-hover-active">
          {/* Service Box Component */}
          <ServiceBox
            title="Radiation Therapy"
            description="There are many variations of passages Lorem Ipsum available but…"
            icon="flaticon-healthcare"
            link="angioplasty-services.html"
          />
          <ServiceBox
            title="Eye Care Services"
            description="There are many variations of passages Lorem Ipsum available but…"
            icon="flaticon-laboratory"
            link="eyecare-services.html"
          />
          <ServiceBox
            title="Dental Care"
            description="There are many variations of passages Lorem Ipsum available but…"
            icon="flaticon-dentist-chair"
            link="dental-services.html"
          />
          <ServiceBox
            title="Operation Theatre"
            description="There are many variations of passages Lorem Ipsum available but…"
            icon="flaticon-hospital-bed"
            link="angioplasty-services.html"
          />
          <ServiceBox
            title="Cardiology Services"
            description="There are many variations of passages Lorem Ipsum available but…"
            icon="flaticon-orthopedics-1"
            link="cardiology-services.html"
          />
          {/* End Service Box Component */}
          <div className="pq-service-button-block style-2">
            <div className="pq-btn-container">
              <a href="angioplasty-services.html" className="pq-button pq-round-button">
                <div className="pq-button-block">
                  <span className="pq-button-text">view more</span>
                  <span className="pq-button-text">view More</span>
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
            <span className="pq-button-text">Read More</span>
            <span className="pq-button-text">Read More</span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default ServiceOut;