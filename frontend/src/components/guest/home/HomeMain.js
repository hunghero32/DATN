import About from "./About";
import Appointment from "./Appointment";
import Categori from "./Categori";
import Banner from "./HomeBanner";
import Service from "./Service";
import ServiceDetail from "./ServiceDetail";
import ServiceOut from "./ServiceOut";
import Team from "./Team";

export default function HomeMain(){
    return (
        <>
          <Banner/>
          <ServiceDetail/>
          <About/>
          <Service/>
          <Categori/>
          <ServiceOut/>
          <Appointment/>
          <Team/>
        </>
      
    )
}