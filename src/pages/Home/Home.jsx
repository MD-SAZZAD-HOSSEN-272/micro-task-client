import React, { useEffect } from 'react';
import SliderComponent from '../../Components/Banner';
import TopWorker from '../../Components/TopWorker';
import TestimonialSlider from '../../Components/TestimonialSlider';
import HowItWorks from '../../Components/HowItWorks';
import FAQSection from '../../Components/FAQSection';
import WhyChooseUs from '../../Components/WhyChooseUs';
import Aos from 'aos';
import "aos/dist/aos.css";

const Home = () => {

    useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 100,
    });
  }, [])
    return (
        <div>
        <SliderComponent></SliderComponent>
        <TopWorker></TopWorker>
        <TestimonialSlider></TestimonialSlider>
        <HowItWorks></HowItWorks>
        <FAQSection></FAQSection>
        <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default Home;