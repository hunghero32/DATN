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
        let bannerData = [];
        if (response.data.banner) {
          // Parse the JSON string to get the banner array
          const parsedBanners = JSON.parse(response.data.banner);
          bannerData = parsedBanners.map(banner => banner.image_url);
        }
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
      <div className="relative">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          effect="fade"
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="w-full h-[500px] group"
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
          <div className="swiper-button-prev !text-white !hidden group-hover:!flex after:!text-2xl md:after:!text-4xl !w-[30px] !h-[30px] md:!w-[44px] md:!h-[44px] !left-2 md:!left-4 !top-1/2 !-translate-y-1/2"></div>
          <div className="swiper-button-next !text-white !hidden group-hover:!flex after:!text-2xl md:after:!text-4xl !w-[30px] !h-[30px] md:!w-[44px] md:!h-[44px] !right-2 md:!right-4 !top-1/2 !-translate-y-1/2"></div>
        </Swiper>
      </div>
    </>
  );
}
    