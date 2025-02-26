import { Link } from "react-router-dom";

export default function Header (){
return (
  <>
      <header id="pq-header" className="pq-header-style-1 pq-has-sticky">
        <div className="pq-top-header pq-bg-dark">
            <div className="container">
                <div className="pq-top-header-row">
                    <div className="pq-top-header-contact">
                        <ul className="pq-top-contact-list">
                            <li className="pq-top-contact-list-item">
                                <a href="#">
                                    <div className="pq-icon">
                                        <i className="flaticon-phone-call"></i>
                                    </div>
                                    <span> +1800-001-658</span>
                                </a>
                            </li>
                            <li className="pq-top-contact-list-item">
                                <div className="pq-icon">
                                    <i className="ti-timer"></i>
                                </div>
                                <span>Monday - Friday 10:00 to 6:00</span>
                            </li>
                        </ul>
                    </div>

                    <div className="pq-top-header-social-icon">
                        <ul className="pq-social-list">
                            <li><a href="https://www.instagram.com/peacefulqode/"><i className="fab fa-instagram"></i></a></li>
                            <li><a href="https://www.facebook.com/people/Peaceful-Qode/100060082803109/"><i className="fab fa-facebook-f"></i></a></li>
                            <li><a href="https://www.instagram.com/peacefulqode/"><i className="fab fa-pinterest"></i></a></li>
                            <li><a href="https://in.linkedin.com/company/peacefulqode"><i className="fab fa-linkedin-in"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="pq-bottom-header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="navbar navbar-expand-lg">
                            <a href="index.html" className="navbar-brand">
                                <img src="img/header/logo-primary-dark.webp" alt="header-logo"/>
                            </a>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <div className="pq-menu-contain">
                                    <ul id="pq-main-menu" className="navbar-nav ml-auto">
                                        <li className="menu-item current-menu-item">
                                            <a href="/">Home</a>
                                            <i className="fa fa-chevron-down pq-submenu-icon"></i>
                                        </li>
                                        <li className="menu-item">
                                            <a href="/aboutus">Pages</a>
                                            <i className="fa fa-chevron-down pq-submenu-icon"></i>
                                            <ul className="sub-menu">
                                                <li className="menu-item">
                                                    <a href="aboutus">About Us</a>
                                                </li>
                                                <li className="menu-item">
                                                    <Link  to="/ourprocess">Our Process</Link>
                                                </li>
                                                <li className="menu-item">
                                                    <a href="ourservices">Our Services</a>
                                                </li>
                                                <li className="menu-item">
                                                    <a href="ourservices">Serives</a>
                                                    <i className="fa fa-chevron-down pq-submenu-icon"></i>
                                                    <ul className="sub-menu">
                                                        <li className="menu-item">
                                                            <a href="angioplastyservices">Angioplasty Services</a>
                                                        </li>
                                                        <li className="menu-item">
                                                            <a href="dentalServices">Dental Services</a>
                                                        </li>
                                                        <li className="menu-item">
                                                            <a href="cardiologyServices">Cardiology Services</a>
                                                        </li>
                                                        <li className="menu-item">
                                                            <a href="eyecareServices">Eye Care Services</a>
                                                        </li>
                                                        <li className="menu-item">
                                                            <a href="neurologyServices">Neurology Services</a>
                                                        </li>
                                                        <li className="menu-item">
                                                            <a href="endocrinologyServices">Endocrinology
                                                                Services</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="menu-item">
                                                    <a href="PricingPlan">Pricing Plan</a>
                                                </li>
                                                <li className="menu-item">
                                                    <a href="WorkingHours">Working Hours</a>
                                                </li>
                                                <li className="menu-item">
                                                    <a href="Faq">Faq</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="menu-item">
                                            <a href="Portfolio">Portfolio</a>
                                            <i className="fa fa-chevron-down pq-submenu-icon"></i>
                                            <ul className="sub-menu">
                                                <li className="menu-item">
                                                    <a href="Standard">Stander</a>
                                                </li>
                                                <li className="menu-item">
                                                    <a href="Masonry">Masonry</a>
                                                </li>
                                                <li className="menu-item">
                                                    <a href="Colum">3 Column</a>
                                                </li>
                                                <li className="menu-item">
                                                    <a href="Colum2">4 Column</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="menu-item">
                                            <a href="blogRrid">Blog</a>
                                            <i className="fa fa-chevron-down pq-submenu-icon"></i>
                                            <ul className="sub-menu">
                                                <li className="menu-item">
                                                    <a href="blogRrid">Blog Grid</a>
                                                </li>
                                                <li className="menu-item">
                                                    <a href="blogList">Blog List</a>
                                                </li>
                                                <li className="menu-item">
                                                    <a href="#">Blog Sidebar</a>
                                                    <i className="fa fa-chevron-down pq-submenu-icon"></i>
                                                    <ul className="sub-menu">
                                                        <li className="menu-item">
                                                            <a href="BlogRightSideBar">Right Sidebar</a>
                                                        </li>
                                                        <li className="menu-item">
                                                            <a href="BlogLeftSideBar">Left Sidebar</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="menu-item">
                                                    <a href="BlogSingle">Blog Single</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="menu-item">
                                            <a href="/contact">Contact Us</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="pq-header-right">
                                <div className="pq-header-contact">
                                    <a href="#">
                                        <div className="pq-icon">
                                            <i className="flaticon-phone-call"></i>
                                        </div>
                                        <span className="pq-contact-number">+1800-001-658</span>
                                    </a>
                                </div>
                                <div className="pq-btn-container">
                                    <a href="#" className="pq-button ">
                                        <div className="pq-button-block">
                                            <span className="pq-button-text">Make appointment</span>
                                            <span className="pq-button-text">Make appointment</span>
                                        </div>
                                    </a>
                                </div>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="pq-button-line"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    
  </>
);
}