import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    title: "Watch How It Works",
    description:
      "Get a quick overview of how buyers and workers collaborate on our platform.",
    image:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    isVideo: true,
  },
  {
    title: "Post Tasks Effortlessly",
    description:
      "Create tasks, set your budget, and connect with skilled workers in minutes.",
    image:
      "https://img.freepik.com/free-photo/freelancer-working-laptop-her-home_1303-22059.jpg?w=740",
  },
  {
    title: "Earn While You Work",
    description:
      "Join as a worker, complete simple tasks, and earn coins instantly.",
    image:
      "https://img.freepik.com/free-photo/young-african-american-man-working-home-using-laptop_273609-13606.jpg?w=740",
  },
  {
    title: "Trusted by Thousands",
    description:
      "Our platform is trusted by a growing community of satisfied users worldwide.",
    image:
      "https://img.freepik.com/free-photo/group-happy-friends-together_23-2147982401.jpg?w=740",
  },
  {
    title: "Real-Time Transparency",
    description:
      "Track your progress, see your earnings, and get updates in real-time.",
    image:
      "https://img.freepik.com/free-photo/dashboard-interface_1098-18625.jpg?w=740",
  },
  
];

const SliderComponent = () => {
  return (
    <div className="pb-10 mt-10">
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={true}
        autoplay={{ delay: 3000 }}
        loop={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              {slide.isVideo ? (
                <video
                  src={slide.image}
                  autoPlay
                  loop
                  muted
                   className="w-full h-[60vh] object-cover shadow-md transition-all duration-300 ease-in-out"
                />
              ) : (
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-[60vh] object-cover shadow-md transition-all duration-300 ease-in-out"
                />
              )}

              <div className="absolute inset-0 bg-black/70"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:p-6 text-white rounded-b-2xl">
                <h2 className="text-3xl font-bold">{slide.title}</h2>
                <p className="text-sm mt-1">{slide.description}</p>
                <button className="mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow">
                  View More
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderComponent;
