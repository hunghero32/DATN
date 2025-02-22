import React from 'react';

const Appointment = () => {
  return (
    <section className="Appointment pq-bg-grey">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 pe-lg-4 wow animated fadeInLeft">
            <div className="pq-appointment-left">
              <div className="row">
                <div className="col-lg-12">
                  <div className="pq-section-title">
                    <span className="pq-sub-title">Make appointment</span>
                    <h2 data-splitting className="pq-main-title">
                      apply for Treatment
                    </h2>
                    <p className="pq-section-title-description">
                      The pancreas is a vital organ located behind the stomach,
                      playing a crucial role in both endocrine and exocrine
                      functions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pq-appointment-img">
                <img
                  className="pq-img"
                  src="img/appontment/appointment-001.webp"
                  alt="Appointment img"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6 mt-4 mt-lg-0 wow animated fadeInRight">
            <div className="pq-appointment-right">
              <form className="pq-contact-form pq-style-1">
                <div className="row">
                  <InputBox icon="far fa-user" placeholder="name" col="col-md-6" />
                  <InputBox icon="far fa-envelope" placeholder="Email adddress" col="col-md-6" />
                  <InputBox icon="fas fa-mobile-alt" placeholder="phone" col="col-md-6" />
                  <InputBox icon="far fa-file-alt" placeholder="subject" col="col-md-6" />

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
                  <button type="submit" className="pq-button"> {/* Changed to button for form submission */}
                    <div className="pq-button-block">
                      <span className="pq-button-text">send massage</span>
                    </div>
                  </button>
                </div>
              </form>

              <div className="pq-counter-block">
                <h2 className="pq-counter-heading-title">
                  We provide exclusive Medical services
                </h2>

                <div className="row">
                  <Counter title="people" count="100" />
                  <Counter title="Experience" count="15" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Reusable Input Box Component
const InputBox = ({ icon, placeholder, col }) => (
  <div className={col}>
    <div className="pq-input-box">
      <div className="input-icon">
        <i className={icon}></i>
      </div>
      <input type="text" className="form-control" placeholder={placeholder} />
    </div>
  </div>
);

// Reusable Counter Component
const Counter = ({ title, count }) => (
  <div className="col-sm-6">
    <div className="pq-counter pt-style-1">
      <div className="pq-counter-info">
        <div className="pq-counter-title">{title}</div>
        <div className="pq-count-number">
          <h2 className="pq-count" data-count={count} data-pq-duration="3000">
            {count}
          </h2>
          <h3 className="pq-counter-prefix-icon">+</h3>
        </div>
        <div className="pq-counter-designation"> City offers the </div>
      </div>
    </div>
  </div>
);

export default Appointment;