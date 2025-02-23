import React from 'react';

export default function Banner() {
    return (
        <section className="pq-banner pb-xl-0">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-7">
                        <div className="pq-banner-title">
                            <span className="pq-sub-title">Welcome to the best Medical</span>
                            <h2 data-splitting className="pq-main-title">Affordable to medical service everyone</h2>
                        </div>
                    </div>
                    <div className="col-lg-5 mt-lg-0 mt-4 pe-md-5 pe-lg-0">
                        <p className="pq-banner-description">
                            There are many variations passages of Lorem Ipsum available, but the or randomised words
                            which don’t look even to believable. If you are going to be sure there isn’t anything
                            embarrassing…
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="pq-banner-img pq-image-effect wow img-ptkey-top" data-wow-duration="1s">
                            <img
                                className="pq-img"
                                decoding="async"
                                src="img/banner/home-banner-02.webp"
                                alt="Banner showcasing affordable medical services"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
