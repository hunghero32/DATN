import React from 'react';

export default function About() {
    return (
        <section className="about-us pq-bg-primary">
            <div className="about-us-floting-img">
                <img className="img" src="img/about-us/floting-img-001.webp" alt="Floating image" />
            </div>
            <div className="container">
                <div className="row flex-lg-row-reverse align-items-center">
                    <div className="col-lg-6 ps-lg-5 mt-5 mt-lg-0 pt-img-left">
                        <div className="pq-about-us-box style-1">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="pq-section-title pq-section-dark">
                                        <span className="pq-sub-title">About Us</span>
                                        <h2 data-splitting className="pq-main-title">
                                            Your journey to better health starts here
                                        </h2>
                                        <p className="pq-section-title-description">
                                            There are many variations of passages of Lorem Ipsum available, but the or
                                            randomised words which don’t look even slightly believable.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pq-about-us-icon-box">
                                <div className="pq-icon">
                                    <i aria-hidden="true" className="flaticon-insurance"></i>
                                </div>
                                <div className="pq-about-us-info">
                                    <h2 className="pq-about-us-title">100% safe & trusted</h2>
                                    <p className="pq-about-us-description">
                                        There are many variations in that case of passages Lorem or randomised words
                                        which don't look even.
                                    </p>
                                </div>
                            </div>
                            <div className="pq-btn-container pq-button-flat">
                                <a href="about-us.html" className="pq-button">
                                    <div className="pq-button-block">
                                        <span className="pq-button-text">about us</span>
                                        <span className="pq-button-text">about us</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 mt-4 mt-lg-0 pq-img-left">
                        <div className="pq-abut-us-img pq-image-effect wow img-ptkey-left" data-wow-duration="1s">
                            <img className="pq-img" decoding="async" src="img/about-us/h1-about-001.webp" alt="About us image" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
