import About from "./About";
import Appointment from "./Appointment";
import ArticleList from "./BaiViet";
import Categori from "./Categori";
import ClinicDetail from "./GioiThieuPhongKham";
import Banner from "./HomeBanner";
import Service from "./Service";
import ServiceDetail from "./ServiceDetail";
import ServiceOut from "./ServiceOut";
import Team from "./Team";
import TopSpecialties from "./TopChuyenKhoa";
import TopBookedServices from "./TopDichVu";

export default function HomeMain(){
    return (
        <>
          <Banner/>
          {/* <ServiceDetail/> */}
          <About/>
          {/* <Service/> */}
          <TopSpecialties/>
          <TopBookedServices/>
          <Categori/>
          <ServiceOut/>
          <Appointment/>
          <ClinicDetail/>
          <ArticleList/>
          {/* <Team/> */}
        </>
      
    )
}