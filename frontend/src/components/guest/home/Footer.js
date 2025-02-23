import React from 'react';

export default function Footer() {
    return (
        <footer className="pq-bg-dark">
            <div className="container">
                <div className="pq-top-footer">
                    <div className="row">
                        <div className="col-sm-6 col-lg-3">
                            <div className="pq-widget">
                                <div className="pq-widget-img">
                                    <img src="img/footer/logo-white.webp" alt="" className="pq-img" />
                                </div>
                                <p className="pq-description">
                                    There are many variations of passages by injected humour randomised
                                </p>
                                <div className="pq-widget-social-icon">
                                    <ul className="pq-social-list">
                                        <li>
                                            <a href="https://www.instagram.com/peacefulqode/">
                                                <i className="fab fa-instagram"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.facebook.com/people/Peaceful-Qode/100060082803109/">
                                                <i className="fab fa-facebook-f"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.instagram.com/peacefulqode/">
                                                <i className="fab fa-pinterest"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://in.linkedin.com/company/peacefulqode">
                                                <i className="fab fa-linkedin"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3 mt-4 mt-sm-0 ps-lg-5">
                            <div className="pq-widget">
                                <h2 className="pq-footer-title">Useful Link</h2>
                                <div className="pq-menu-link-container">
                                    <ul className="pq-menu-link">
                                        <li className="pq-menu-item"><a href="#">about us</a></li>
                                        <li className="pq-menu-item"><a href="#">our process</a></li>
                                        <li className="pq-menu-item"><a href="#">our service</a></li>
                                        <li className="pq-menu-item"><a href="#">our team</a></li>
                                        <li className="pq-menu-item"><a href="#">contact us</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3 mt-4 mt-lg-0">
                            <div className="pq-widget">
                                <h2 className="pq-footer-title">Contact Info</h2>
                                <div className="pq-info-box">
                                    <div className="pq-icon">
                                        <i className="fa-solid fa-envelope"></i>
                                    </div>
                                    <div className="pq-contact-info">
                                        <span className="pq-contact-title">Email:</span>
                                        <a href="#">
                                            <span>info@peacefulqode.com</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="pq-info-box">
                                    <div className="pq-icon">
                                        <i className="fa-solid fa-location-dot"></i>
                                    </div>
                                    <div className="pq-contact-info">
                                        <span className="pq-contact-title">Address:</span>
                                        <span>Themeforest, Envato HQ</span>
                                    </div>
                                </div>
                                <div className="pq-info-box">
                                    <div className="pq-icon">
                                        <i className="flaticon-phone-call"></i>
                                    </div>
                                    <div className="pq-contact-info">
                                        <span className="pq-contact-title">Phone:</span>
                                        <span>+1800-001-658</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 mt-4 mt-lg-0">
                            <div className="pq-widget">
                                <h2 className="pq-footer-title">News Letter</h2>
                                <form className="pq-form-fiels">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="your Email Address"
                                    />
                                    <input
                                        type="submit"
                                        className="pq-submit"
                                        value="submit"
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" viewBox="0 0 28 29" fill="none">
                                        <path
                                            d="M8.52 26.4937L8.52085 26.4968C8.52136 26.5011 8.52352 26.5046 8.52418 26.5087C8.53202 26.5549 8.54759 26.5995 8.57025 26.6406C8.57311 26.6459 8.57293 26.6518 8.57602 26.657C8.57959 26.6632 8.5864 26.6659 8.59033 26.6718C8.62137 26.7212 8.66239 26.7635 8.71075 26.7961L8.71436 26.7993C8.75074 26.8222 8.7904 26.8394 8.83198 26.8503C8.85226 26.8554 8.87287 26.8592 8.89366 26.8615L8.8948 26.8617C8.93528 26.8656 8.97611 26.8635 9.016 26.8556C9.02784 26.8534 9.03896 26.8488 9.05065 26.8456C9.07996 26.8377 9.10833 26.8266 9.13525 26.8126C9.14152 26.8093 9.14842 26.8087 9.15451 26.8051L14.4124 23.6896L19.6627 27.5056C19.8832 27.6603 20.1643 27.7005 20.4193 27.6138C20.6744 27.5271 20.8727 27.3239 20.9531 27.0668L27.8197 4.95757L27.82 4.95676C27.9658 4.48346 27.8224 3.96863 27.453 3.63875C27.0837 3.30888 26.556 3.22442 26.1021 3.42254L1.7606 14.2773C1.47775 14.4064 1.28872 14.6805 1.26854 14.9908C1.24836 15.3011 1.4003 15.5973 1.66405 15.762L7.64412 19.3774L8.52 26.4937ZM12.1092 21.4469C12.1063 21.4502 12.1057 21.4546 12.1028 21.458C12.098 21.4638 12.0919 21.4678 12.0874 21.4739L9.22902 25.3399L8.48753 19.3157L23.9938 7.87554L12.1092 21.4469ZM10.5197 25.0147L12.5176 22.3127L13.6684 23.1491L10.5197 25.0147ZM26.4418 4.19609C26.5929 4.13068 26.7683 4.1591 26.891 4.26889C27.0138 4.37867 27.0615 4.5498 27.0133 4.70726L20.1532 26.8182L13.0493 21.655L24.6355 8.4246C24.916 8.10193 24.9042 7.61858 24.6083 7.30994C24.3197 6.99306 23.8386 6.94488 23.4929 7.19825L8.01498 18.6148L2.10787 15.0473L26.4418 4.19609Z"
                                            fill="#C5C6CA"
                                        />
                                    </svg>
                                    <input type="checkbox" name="checkbox" />
                                    <label>I Agree To All Your Terms & Conditions</label>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="pq-copyright-footer">
                            <span className="pq-copyright">Copyright 2024 Medicen Theme by Peacefulqode | All Rights Reserved</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
