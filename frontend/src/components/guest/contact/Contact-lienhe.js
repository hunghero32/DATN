import React from 'react';

const ContactLienHe = () => {
  return (
    <section className="Contact-Us">
      <div className="container">
        <div className="row align-items-center flex-lg-row-reverse">
          <div className="col-lg-6 ps-lg-4 ps-2">
            <div className="pq-contact-us style-3">
              <div className="row">
                <div className="col-lg-12">
                  <div className="pq-section-title">
                    <span className="pq-sub-title">Contact us</span>
                    <h2 data-splitting className="pq-main-title">
                      Have a Any questions? Get in touch
                    </h2>
                  </div>
                </div>
              </div>
              <form className="pq-contact-form pq-style-1">
                <div className="row">
                  <div className="col-md-6">
                    <div className="pq-input-box">
                      <div className="input-icon">
                        <i className="far fa-user"></i>
                      </div>
                      <input type="text" className="form-control" placeholder="Name" /> {/* Capitalized placeholder */}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="pq-input-box">
                      <div className="input-icon">
                        <i className="far fa-envelope"></i>
                      </div>
                      <input type="text" className="form-control" placeholder="Email Address" /> {/* Capitalized placeholder */}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="pq-input-box">
                      <div className="input-icon">
                        <i className="fas fa-mobile-alt"></i>
                      </div>
                      <input type="text" className="form-control" placeholder="Phone" /> {/* Capitalized placeholder */}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="pq-input-box">
                      <div className="input-icon">
                        <i className="far fa-file-alt"></i>
                      </div>
                      <input type="text" className="form-control" placeholder="Subject" /> {/* Capitalized placeholder */}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="pq-input-box">
                      <div className="input-icon">
                        <i className="far fa-edit"></i>
                      </div>
                      <textarea
                        className="form-control"
                        rows="5"
                        placeholder="How Can We Help You? Get In Touch"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="pq-btn-container">
                  <a href="#" className="pq-button">
                    <div className="pq-button-block">
                      <span className="pq-button-text">Send Message</span> {/* Corrected typo */}
                    </div>
                  </a>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-6 pe-lg-5 pe-2 mt-4 mt-lg-0">
            <div className="pq-contact-us-img style-3">
              <img
                className="pq-img"
                src="/img/contact-us/contact-us-001.webp" // Added %PUBLIC_URL%
                alt="contact-us image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactLienHe;