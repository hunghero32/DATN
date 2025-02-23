import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomeMain from './components/guest/home/HomeMain';
import HomeMainContact from './components/guest/contact/HomeMainContact';
import PoftFolio from './components/guest/PoftFolio/PoftFolio';
import Standard from './components/guest/PoftFolio/Standard';
import Masonry from './components/guest/PoftFolio/Masonry';
import Colum from './components/guest/PoftFolio/Colum';
import Colum2 from './components/guest/PoftFolio/Colum2';
import BlogRrid from './components/guest/Blog/BlogRrid';
import BlogList from './components/guest/Blog/BlogList';
import BlogRightSideBar from './components/guest/Blog/BlogRightSideBar';
import BlogLeftSideBar from './components/guest/Blog/BlogLeftSideBar';
import AboutUsSection from './components/guest/Page/AboutUs';
import OurProcess from './components/guest/Page/Ourprocess';
import OutServices from './components/guest/Page/OutServices';
import AngioplastyServices from './components/guest/Page/Service/Angioplasty-services';
import DentalServices from './components/guest/Page/Service/DentalServices';
import CardiologyServices from './components/guest/Page/Service/CardiologyServices';
import EyecareServices from './components/guest/Page/Service/EyecareServices';
import NeurologyServices from './components/guest/Page/Service/NeurologyServices';
import EndocrinologyServices from './components/guest/Page/Service/EndocrinologyServices';
import PricingPlan from './components/guest/Page/PricingPlan';
import WorkingHours from './components/guest/Page/WorkingHours';
import Faq from './components/guest/Page/Faq';
import BlogSingle from './components/guest/Blog/BlogSingle';
import Header from './components/guest/home/Header';
import Footer from './components/guest/home/Footer';
function App() {
  return (
    <div>
    <Header/>
    <Routes>
      <Route path='/' element={<HomeMain/>} />
      <Route path='/contact' element={<HomeMainContact/>} />
      <Route path='aboutus' element={<AboutUsSection/>} />
      <Route path='ourprocess' element={<OurProcess/>}/>
      <Route path='ourservices' element={<OutServices/>}/>
      <Route path='angioplastyServices' element={<AngioplastyServices/>} />
      <Route path='dentalServices'  element={<DentalServices/>} />
      <Route path='cardiologyServices' element={<CardiologyServices/>} />
      <Route path='eyecareServices' element={<EyecareServices/>}/>
      <Route path='neurologyServices'  element={<NeurologyServices/>} />
      <Route path='endocrinologyServices' element={<EndocrinologyServices/>}/>
      <Route path='PricingPlan' element={<PricingPlan/>}  />
      <Route path='WorkingHours' element={<WorkingHours/>} />
      <Route path='Faq' element={<Faq/>}/>
      <Route path='blogRrid'element={<BlogRrid/>}/>
      <Route path='blogList' element={<BlogList/>}/>
      <Route path='BlogRightSideBar' element={<BlogRightSideBar/>}/>
      <Route path='BlogLeftSideBar' element={<BlogLeftSideBar/>}/>
      <Route path='Portfolio' element={<PoftFolio/>}/>
      <Route path='Standard' element={<Standard/>}/>
      <Route path='Masonry' element={<Masonry/>}/>
      <Route path='Colum' element={<Colum/>}/>
      <Route path='Colum2' element={<Colum2/>}/>
      <Route path='BlogSingle' element={<BlogSingle/>}/>
    </Routes>
    <Footer/>
    </div>
  );
}

export default App;
