import React, { useEffect, useState } from "react";
import Header from "../../components/guest/home/Header";
import Footer from "../../components/guest/home/Footer";
import { Route, Routes } from "react-router-dom";
import HomeMain from "../../components/guest/home/HomeMain";
import HomeMainContact from "../../components/guest/contact/HomeMainContact";
import AboutUsSection from "../../components/guest/Page/AboutUs";
import OurProcess from "../../components/guest/Page/Ourprocess";
import OutServices from "../../components/guest/Page/OutServices";
import AngioplastyServices from "../../components/guest/Page/Service/Angioplasty-services";
import DentalServices from "../../components/guest/Page/Service/DentalServices";
import CardiologyServices from "../../components/guest/Page/Service/CardiologyServices";
import EyecareServices from "../../components/guest/Page/Service/EyecareServices";
import NeurologyServices from "../../components/guest/Page/Service/NeurologyServices";
import EndocrinologyServices from "../../components/guest/Page/Service/EndocrinologyServices";
import PricingPlan from "../../components/guest/Page/PricingPlan";
import WorkingHours from "../../components/guest/Page/WorkingHours";
import Faq from "../../components/guest/Page/Faq";
import BlogRrid from "../../components/guest/Blog/BlogRrid";
import BlogList from "../../components/guest/Blog/BlogList";
import BlogRightSideBar from "../../components/guest/Blog/BlogRightSideBar";
import BlogLeftSideBar from "../../components/guest/Blog/BlogLeftSideBar";
import PoftFolio from "../../components/guest/PoftFolio/PoftFolio";
import Standard from "../../components/guest/PoftFolio/Standard";
import Masonry from "../../components/guest/PoftFolio/Masonry";
import Colum from "../../components/guest/PoftFolio/Colum";
import Colum2 from "../../components/guest/PoftFolio/Colum2";
import BlogSingle from "../../components/guest/Blog/BlogSingle";
import Register from "../../components/guest/auth/Register";
import Login from "../../components/guest/auth/Login";
import ForgotPassword from "../../components/guest/auth/Forgot-password";
import ResetPassword from "../../components/guest/auth/ResetPassword";
import PatientProfile from "../../components/guest/home/HoSoBenhNhan";
import ArticleList from "../../components/guest/home/BaiViet";
import TopSpecialties from "../../components/guest/home/TopChuyenKhoa";
import TopBookedServices from "../../components/guest/home/TopDichVu";
import ClinicDetail from "../../components/guest/home/GioiThieuPhongKham";
import Services from "../../components/guest/home/Service";
import ChiTietDatLich from "../../components/guest/home/ChiTietDatLich";
import DatLich from "../../components/guest/home/DatLich";
import ChiTietChuyenKhoa from "../../components/guest/home/ChiTietChuyenKhoa";
import ServiceDetail from "../../components/guest/home/ServiceDetail";
import ThongBao from "../../components/guest/home/ThongBao";

const ClientLayout = () => {
  useEffect(() => {
    const loadScript = (src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    };

    const loadCSS = (href) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    };

    const cssFiles = [
      "/css/bootstrap.min.css",
      "/css/owl.carousel.css",
      "/css/animations.min.css",
      "/css/fonts.css",
      "/css/style.css",
      "/css/responsive.css",
      "/font/font-awesome/css/all.min.css",
      "/font/themify-icons/themify-icons.css",
      "/font/flaticons/flaticon_medicen.css",
    ];
    cssFiles.forEach(loadCSS);

    const jsFiles = [
    
      "/js/splitting.js",
      "/js/aat.min.js",
      "/js/scroll-out.js",
      "/js/isotope.pkgd.min.js",
      "/js/load-more.js",
      "/js/gsap.min.js",
      "/js/ScrollTrigger.min.js",
      "/js/slick.js",
      "/js/wow.min.js",
      
    ];
    jsFiles.forEach(loadScript);

    return () => {
    };
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomeMain />} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/password-reset/:token" element={<ResetPassword />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="/booking/:serviceId" element={<DatLich />}  />
        <Route path="/chitietdatlich" element={<ChiTietDatLich/>} />
        <Route path="/patientProfile" element={<PatientProfile/>} />  {/* Trang hồ sơ bệnh nhân */}
        <Route path="/articles" element={<ArticleList/>} />
        <Route path="/specialties" element={<TopSpecialties/>}/> 
        <Route path="/topServices" element={<TopBookedServices/>}/>
        <Route path="/clinicDetail" element={<ClinicDetail/>}/>
        <Route path="/thongbao" element={<ThongBao/>}/>  {/* Thông báo đặt lịch thành công !}

        <Route path="/booking/:serviceId" element={<DatLich />} 
        <Route path="/services" element={<Services/>}/>  {/* Trang dịch vụ */}
        <Route path="/detail-service/:id" element={<ServiceDetail/>}/>  {/* Trang chi tiet dich vu  */}
        <Route path="/contact" element={<HomeMainContact />} />
        {/* Update the route path to match the navigation */}
        <Route path="/detail-specialty/:id" element={<ChiTietChuyenKhoa />} />
        <Route path="aboutus" element={<AboutUsSection />} />
        <Route path="ourprocess" element={<OurProcess />} />
        <Route path="ourservices" element={<OutServices />} />
        <Route path="angioplastyServices" element={<AngioplastyServices />} />
        <Route path="dentalServices" element={<DentalServices />} />
        <Route path="cardiologyServices" element={<CardiologyServices />} />
        <Route path="eyecareServices" element={<EyecareServices />} />
        <Route path="neurologyServices" element={<NeurologyServices />} />
        <Route
          path="endocrinologyServices"
          element={<EndocrinologyServices />}
        />
        <Route path="PricingPlan" element={<PricingPlan />} />
        <Route path="WorkingHours" element={<WorkingHours />} />
        <Route path="Faq" element={<Faq />} />
        <Route path="blogRrid" element={<BlogRrid />} />
        <Route path="blogList" element={<BlogList />} />
        <Route path="BlogRightSideBar" element={<BlogRightSideBar />} />
        <Route path="BlogLeftSideBar" element={<BlogLeftSideBar />} />
        <Route path="Portfolio" element={<PoftFolio />} />
        <Route path="Standard" element={<Standard />} />
        <Route path="Masonry" element={<Masonry />} />
        <Route path="Colum" element={<Colum />} />
        <Route path="Colum2" element={<Colum2 />} />
        <Route path="BlogSingle" element={<BlogSingle />} />
        
      </Routes>
      
      <Footer />
    
    </>
  );
};

export default ClientLayout;
