import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from 'axios';
export default function HomeBanner() {
  const [banners, setBanners] = useState([]);
  const fallbackImages = [
    'https://picsum.photos/1920/500?random=1',
    'https://picsum.photos/1920/500?random=2',
    'https://picsum.photos/1920/500?random=3',
    'https://picsum.photos/1920/500?random=4',
  ];

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/system');
        const bannerData = response.data.data?.banner || [];
        setBanners(bannerData.length > 0 ? bannerData : fallbackImages);
      } catch (error) {
        console.error('Error fetching banners:', error);
        setBanners(fallbackImages);
      }
    };
    fetchBanners();
  }, []);

  const handleImageError = (index) => {
    setBanners(prev => {
      const newBanners = [...prev];
      newBanners[index] = fallbackImages[index % fallbackImages.length];
      return newBanners;
    });
  };

  return (
    <>
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-[500px]"
      >
        {Array.isArray(banners) && banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <img
              src={banner.startsWith('http') ? banner : `http://localhost:8000/storage/${banner}`}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
              onError={() => handleImageError(index)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
    