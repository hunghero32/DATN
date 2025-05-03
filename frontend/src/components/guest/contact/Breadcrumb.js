import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../ultils/api/axios';

export default function Breadcrumb() {
    const [systemInfo, setSystemInfo] = useState(null);

    useEffect(() => {
        const fetchSystemInfo = async () => {
            try {
                const response = await api.get('/api/system');
                setSystemInfo(response.data);
                console.log("system : "  , response.data);
            } catch (error) {
                console.error('Error fetching system info:', error);
            }
        };
        fetchSystemInfo();
    }, []);

    return (
        <>
            <section className="breadcrumb">
                <div className="container">
                    <div className="pq-breadcrumb pq-style-1">
                        <h2 className="pq-breadcrumb-title">Liên Hệ</h2>
                        <ol className="pq-breadcrumb-container">
                            <li className="pq-breadcrumb-item">
                                <Link to="/">
                                    <span>Trang chủ</span>
                                </Link>
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
                                <span className="pq-email">Website:</span>
                                <a href={systemInfo?.site_url} className="pq-email !text-blue-700"   target="_blank" rel="noopener noreferrer">
                                    {systemInfo?.site_url}
                                </a>
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
                                <span className="pq-email">Hotline:</span>
                                <a href={`tel:${systemInfo?.hotline}`} className="pq-email !text-blue-700">
                                    {systemInfo?.hotline || 'Loading...'}
                                </a>
                                <span className="pq-email">Hỗ trợ 24/7</span>
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
                                <span className="pq-email">{systemInfo?.address}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
  