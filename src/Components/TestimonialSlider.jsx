import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Sarah Ahmed",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "This platform helped me earn money while learning new skills. Highly recommended!",
  },
  {
    name: "Tanvir Hossain",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "Very reliable and supportive team. I enjoy working here every day!",
  },
  {
    name: "Nusrat Jahan",
    image: "https://randomuser.me/api/portraits/women/25.jpg",
    quote: "I found so many tasks that fit my schedule. Super flexible!",
  },
  {
    name: "Raihan Kabir",
    image: "https://randomuser.me/api/portraits/men/18.jpg",
    quote: "Their payment system is fast and smooth. Love the experience!",
  },
  {
    name: "Maliha Akter",
    image: "https://randomuser.me/api/portraits/women/35.jpg",
    quote: "Very user-friendly website with excellent support. 10/10!",
  },
  {
    name: "Asif Rahman",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    quote: "Best place for freelancers to get quick and small tasks. Loved it!",
  },
];

const TestimonialSlider = () => {
  return (
    <div
      data-aos="fade-down"
      data-aos-easing="linear"
      data-aos-duration="1500"
      className="max-w-6xl mx-auto px-4 py-16 "
    >
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        What Our Users Say
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        navigation
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl  max-w-7xl mx-auto shadow-md flex flex-col items-center text-center h-full">
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 rounded-full object-cover mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-700">{t.name}</h4>
              <p className="text-sm text-gray-600 mt-2 italic">"{t.quote}"</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialSlider;
