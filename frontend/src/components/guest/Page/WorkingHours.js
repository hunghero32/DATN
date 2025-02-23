export default function WorkingHours (){
    return (
        <>
             <section class="breadcrumb">
            <div class="container">
                <div class="pq-breadcrumb pq-style-1">
                    <h2 class="pq-breadcrumb-title">Working Hours </h2>
                    <ol class="pq-breadcrumb-container">
                        <li class="pq-breadcrumb-item">
                            <a href="index.html">
                                <span>Home</span>
                            </a>
                        </li>
                        <li class="pq-breadcrumb-item active">
                            Working Hours
                        </li>
                    </ol>
                </div>
            </div>
        </section>

        <section className="TIMETABLE pq-bg-grey">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="pq-section-title">
              <span className="pq-sub-title">TIMETABLE</span>
              <h2 className="pq-main-title">Events Calendar for You</h2>
            </div>
            <div className="pq-btn-container pq-section-btn">
              <a href="working-hours-2.html" className="pq-button">
                <div className="pq-button-block">
                  <span className="pq-button-text">Learn More</span>
                  <span className="pq-button-text">Learn More</span>
                </div>
              </a>
            </div>
          </div>

          <div className="col-lg-12">
            <div className="pq-navigation-tab">
              <div className="nav nav-tabs" id="myTab" role="tablist">
                <a
                  className="pq-tabs nav-item nav-link active"
                  id="nav-home-0"
                  data-bs-toggle="tab"
                  href="#nav-0"
                  role="tab"
                  aria-controls="nav-home-0"
                  aria-selected="true"
                >
                  <span>All Events</span>
                </a>
                <a
                  className="pq-tabs nav-item nav-link"
                  id="nav-home-1"
                  data-bs-toggle="tab"
                  href="#nav-1"
                  role="tab"
                  aria-controls="nav-home-1"
                  aria-selected="false"
                >
                  <span>Laboratory</span>
                </a>
                <a
                  className="pq-tabs nav-item nav-link"
                  id="nav-home-2"
                  data-bs-toggle="tab"
                  href="#nav-2"
                  role="tab"
                  aria-controls="nav-home-2"
                  aria-selected="false"
                >
                  <span>Surgery</span>
                </a>
                <a
                  className="pq-tabs nav-item nav-link"
                  id="nav-home-3"
                  data-bs-toggle="tab"
                  href="#nav-3"
                  role="tab"
                  aria-controls="nav-home-3"
                  aria-selected="false"
                >
                  <span>Gynecological</span>
                </a>
                <a
                  className="pq-tabs nav-item nav-link"
                  id="nav-home-4"
                  data-bs-toggle="tab"
                  href="#nav-4"
                  role="tab"
                  aria-controls="nav-home-4"
                  aria-selected="false"
                >
                  <span>Clinic</span>
                </a>
                <a
                  className="pq-tabs nav-item nav-link"
                  id="nav-home-5"
                  data-bs-toggle="tab"
                  href="#nav-5"
                  role="tab"
                  aria-controls="nav-home-5"
                  aria-selected="false"
                >
                  <span>Cardiology</span>
                </a>
              </div>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade active show"
                  id="nav-0"
                  role="tabpanel"
                  aria-labelledby="nav-home-0"
                >
                  <table className="navigation-shortcode-table navigation-theme-mode table">
                    <thead>
                      <tr className="navigation-shortcode-row">
                        <th></th>
                        <th>Sunday</th>
                        <th>Monday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Saturday</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="navigation-shortcode-row-9">
                        <td className="navigation-shortcode-hours">1:00 am</td>
                        <td
                          className="navigation-shortcode-event navigation-event-vertical-default"
                          data-column-id="56"
                          colSpan="1"
                          rowSpan="2"
                        >
                          <div className="navigation-event-container">
                            <div className="navigation-inner-event-content">
                              <a title="Laboratory" href="#" className="event-title">Laboratory</a>
                              <p className="timeslot">
                                <time dateTime="01:00">1:00 am</time>
                                <span className="timeslot-delimiter"> - </span>
                                <time dateTime="03:00">3:00 am</time>
                              </p>
                              <p className="event-description">KRUNCH & KORE</p>
                            </div>
                          </div>
                        </td>
                        <td className="navigation-shortcode-event"></td>
                        <td className="navigation-shortcode-event"></td>
                        <td className="navigation-shortcode-event"></td>
                        <td className="navigation-shortcode-event"></td>
                      </tr>
                      {/* Repeat other rows */}
                    </tbody>
                  </table>
                </div>
                {/* Add other tab panes */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="Team">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="pq-section-title">
                            <span class="pq-sub-title ">TEAM MEMBERS</span>
                            <h2 data-splitting class="pq-main-title">Our Expert Doctors</h2>
                        </div>
                        <div class="pq-btn-container pq-section-btn">
                            <a href="our-team-2.html" class="pq-button ">
                                <div class="pq-button-block">
                                    <span class="pq-button-text">view More</span>
                                    <span class="pq-button-text">view More</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
    
                <div class="pq-team-1-list pq-hover-active">
                    
                    <div class="pq-team pq-style-1 pq-hover-item">
                        <div class="pq-team-member-img">
                            <img class="pq-img" src="img/team/team-001.webp" alt="team image"/>
                        </div>
                        <div class="pq-member-info">
                            <h2 class="pq-member-name">Dr. Sarah John</h2>
                            <span class="pq-member-designation">Neurology</span>
                            <div class="pq-team-member-social-icon">
                                <ul class="pq-social-list">
                                    <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                                    <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i class="fab fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
    
                    <div class="pq-team pq-style-1 pq-hover-item">
                        <div class="pq-team-member-img">
                            <img class="pq-img" src="img/team/team-002.webp" alt="team image"/>
                        </div>
                        <div class="pq-member-info">
                            <h2 class="pq-member-name">Dr. Emily Davis</h2>
                            <span class="pq-member-designation">Fellow</span>
                            <div class="pq-team-member-social-icon">
                                <ul class="pq-social-list">
                                    <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                                    <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i class="fab fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
    
                    <div class="pq-team pq-style-1 pq-hover-item">
                        <div class="pq-team-member-img">
                            <img class="pq-img" src="img/team/team-003.webp" alt="team image"/>
                        </div>
                        <div class="pq-member-info">
                            <h2 class="pq-member-name"> Dr. Jessi Taylor</h2>
                            <span class="pq-member-designation">Psychiatrist</span>
                            <div class="pq-team-member-social-icon">
                                <ul class="pq-social-list">
                                    <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                                    <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i class="fab fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
    
                    <div class="pq-team pq-style-1 pq-hover-item">
                        <div class="pq-team-member-img">
                            <img class="pq-img" src="img/team/team-004.webp" alt="team image"/>
                        </div>
                        <div class="pq-member-info">
                            <h2 class="pq-member-name">Dr. Steve Clark</h2>
                            <span class="pq-member-designation">Physician</span>
                            <div class="pq-team-member-social-icon">
                                <ul class="pq-social-list">
                                    <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                                    <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i class="fab fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
    
                    <div class="pq-team pq-style-1 pq-hover-item">
                        <div class="pq-team-member-img">
                            <img class="pq-img" src="img/team/team-005.webp" alt="team image"/>
                        </div>
                        <div class="pq-member-info">
                            <h2 class="pq-member-name">Dr. Nancy Lewis</h2>
                            <span class="pq-member-designation">Orthopaedics</span>
                            <div class="pq-team-member-social-icon">
                                <ul class="pq-social-list">
                                    <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                                    <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i class="fab fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
    
                    <div class="pq-team pq-style-1 pq-hover-item">
                        <div class="pq-team-member-img">
                            <img class="pq-img" src="img/team/team-006.webp" alt="team image"/>
                        </div>
                        <div class="pq-member-info">
                            <h2 class="pq-member-name"> Dr. Linda Walkr</h2>
                            <span class="pq-member-designation">Pathologist</span>
                            <div class="pq-team-member-social-icon">
                                <ul class="pq-social-list">
                                    <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                                    <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i class="fab fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </section>


         <section class="testimonials pq-bg-grey">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-12">
                        <div class="pq-section-title">
                            <span class="pq-sub-title ">Testimonials</span>
                            <h2 data-splitting class="pq-main-title">Testimonial Consistent Health Support</h2>
                        </div>
                        <div class="pq-btn-container pq-section-btn">
                            <a href="#" class="pq-button">
                                <div class="pq-button-block">
                                    <span class="pq-button-text">view More</span>
                                    <span class="pq-button-text">view More</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
    
                <div class="row align-items-center">
                    <div class="col-lg-6">
                        <div class="pq-testimonial-box-slider pt-style-1">
                            <div class="owl-carousel owl-loaded owl-drag" data-dots="false" data-nav="true" data-desk_num="1" data-lap_num="1" data-tab_num="1" data-mob_num="1" data-mob_sm="1" data-autoplay="true" data-loop="true" data-margin="30">
                                <div class="item">
                                    <div class="pq-testimonial-box pq-style-1">
                                        <div class="pq-testimonial-top">
                                            <div class="pq-testimonial-star">
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                            </div>
                                            <div class="pq-testimonial-quote">
                                                <i class="fas fa-quote-right"></i>
                                            </div>
                                        </div>
                                        <p class="pq-testimonial-description">Since the discovery of insulin, numerous advancements have been made in diabetes research and treatment. The development of synthetic insulin, oral agents, and continuous glucose monitoring systems has  improved the quality of life for diabetic patients.</p>
                                        
                                        <div class="pq-testimonial-media">
                                            <div class="pq-testimonial-img">
                                                <img class="pq-img" src="img/testimonial/testimonial-002.webp" alt="Testimonial image"/>
                                            </div>
                                            <div class="testimonial-author-detail">
                                                <h5 class="pq-testimonial-author-name">Sarah John</h5>
                                                <span class="pq-testimonial-author-designation">NEUROLOGY</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    
                                <div class="item">
                                    <div class="pq-testimonial-box pq-style-1">
                                        <div class="pq-testimonial-top">
                                            <div class="pq-testimonial-star">
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                            </div>
                                            <div class="pq-testimonial-quote">
                                                <i class="fas fa-quote-right"></i>
                                            </div>
                                        </div>
                                        <p class="pq-testimonial-description">Since the discovery of insulin, numerous advancements have been made in diabetes research and treatment. The development of synthetic insulin, oral agents, and continuous glucose monitoring systems has  improved the quality of life for diabetic patients.</p>
                                        
                                        <div class="pq-testimonial-media">
                                            <div class="pq-testimonial-img">
                                                <img class="pq-img" src="img/testimonial/testimonial-005.webp" alt="Testimonial image"/>
                                            </div>
                                            <div class="testimonial-author-detail">
                                                <h5 class="pq-testimonial-author-name">Alex martin</h5>
                                                <span class="pq-testimonial-author-designation">doctor</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    
                                <div class="item">
                                    <div class="pq-testimonial-box pq-style-1">
                                        <div class="pq-testimonial-top">
                                            <div class="pq-testimonial-star">
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                            </div>
                                            <div class="pq-testimonial-quote">
                                                <i class="fas fa-quote-right"></i>
                                            </div>
                                        </div>
                                        <p class="pq-testimonial-description">Since the discovery of insulin, numerous advancements have been made in diabetes research and treatment. The development of synthetic insulin, oral agents, and continuous glucose monitoring systems has  improved the quality of life for diabetic patients.</p>
                                        
                                        <div class="pq-testimonial-media">
                                            <div class="pq-testimonial-img">
                                                <img class="pq-img" src="img/testimonial/testimonial-004.webp" alt="Testimonial image"/>
                                            </div>
                                            <div class="testimonial-author-detail">
                                                <h5 class="pq-testimonial-author-name">Jessi taylor</h5>
                                                <span class="pq-testimonial-author-designation">NEUROLOGY</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    
                                <div class="item">
                                    <div class="pq-testimonial-box pq-style-1">
                                        <div class="pq-testimonial-top">
                                            <div class="pq-testimonial-star">
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                            </div>
                                            <div class="pq-testimonial-quote">
                                                <i class="fas fa-quote-right"></i>
                                            </div>
                                        </div>
                                        <p class="pq-testimonial-description">Since the discovery of insulin, numerous advancements have been made in diabetes research and treatment. The development of synthetic insulin, oral agents, and continuous glucose monitoring systems has  improved the quality of life for diabetic patients.</p>
                                        
                                        <div class="pq-testimonial-media">
                                            <div class="pq-testimonial-img">
                                                <img class="pq-img" src="img/testimonial/testimonial-002.webp" alt="Testimonial image"/>
                                            </div>
                                            <div class="testimonial-author-detail">
                                                <h5 class="pq-testimonial-author-name">Emily davis</h5>
                                                <span class="pq-testimonial-author-designation">Fellow</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col  mt-4 mt-lg-0 px-xl-0">
                        <div class="pq-testimonial-right-img pq-image-effect wow img-ptkey-top">
                            <img class="pq-img" src="img/testimonial/h1-testimonial-right-001.webp" alt="Testimonial image"/>
                        </div>
                    </div>
                </div>
            </div>
         </section>
        </>
    )
}