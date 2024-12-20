import Section from "./Section";
import Button from "./Button";
import { curve, heroBackground, edusticker } from "../assets";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import { heroIcons, videoSlides } from "../constants";
import { ScrollParallax } from "react-just-parallax";
import { useRef, useEffect } from "react";
import Notification from "./Notification";
import CompanyLogos from "./CompanyLogos";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./Header";
import { Modal } from "./design/Detail";
import { ContactMe } from "./design/Contact";

const videosSlides = [
  { src: videoSlides[0], alt: "Video 1" },
  { src: videoSlides[1], alt: "Video 2" },
  { src: videoSlides[2], alt: "Video 3" },
];

const Hero = ({ isModalOpen, onCloseModal, onOpenModal }) => {
  const parallaxRef = useRef(null);
  const videoRefs = useRef([]);

  const handleHeaderButtonClick = () => {
    onOpenModal();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (video instanceof HTMLVideoElement) {
            if (entry.isIntersecting && video.paused) {
              video.play().catch((err) => console.error("Play error:", err));
            } else if (!entry.isIntersecting && !video.paused) {
              video.pause();
              video.currentTime = 0;
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    videoRefs.current.forEach((video) => {
      if (video instanceof HTMLVideoElement) {
        observer.observe(video);
      }
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video instanceof HTMLVideoElement) {
          observer.unobserve(video);
        }
      });
      observer.disconnect();
    };
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    pauseOnHover: false,
    afterChange: (currentSlide) => {
      videoRefs.current.forEach((video, index) => {
        if (video instanceof HTMLVideoElement) {
          if (index === currentSlide) {
            video.play().catch((err) => console.error("Autoplay error:", err));
          } else {
            video.pause();
            video.currentTime = 0;
          }
        }
      });
    },
  };

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        <div className="relative z-1 max-w-auto mx-auto text-center mb-[4rem] md:mb-20 lg:mb:[6rem]">
          <h1 className="h1 mb-6">
            Hello! I’m&nbsp;
            <span className="inline-block relative">
              Eduardo
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
            {` `}
          </h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
            A multidisciplinary developer specializing in creating
            <br />
            exceptional&nbsp;
            <span className="font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
              &nbsp;iOS experiences&nbsp;
            </span>{" "}
            passionate about crafting intuitive and elegant mobile applications.
          </p>
          <Button white onClick={handleHeaderButtonClick}>
            Get in touch
          </Button>
        </div>
        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl sm:mb-24 xl:mb-24">
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="aspect-[33/40] rounded-b-[0.9rem] rounded-t-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                {/* Video carousel */}
                <Slider {...sliderSettings}>
                  {videosSlides.map((video, index) => (
                    <div key={index}>
                      <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      >
                        <source src={video.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ))}
                </Slider>

                <ScrollParallax isAbsolutelyPositioned>
                  <ul className="hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex">
                    {heroIcons.map((icon, index) => (
                      <li className="p-5" key={index}>
                        <img src={icon} width={24} height={25} alt={icon} />
                      </li>
                    ))}
                  </ul>
                </ScrollParallax>

                <ScrollParallax isAbsolutelyPositioned>
                  <Notification
                    className="hidden absolute -right-[5.5rem] bottom-[11rem] w-[18rem] xl:flex"
                    title="Testimonials"
                  />
                </ScrollParallax>
              </div>
            </div>
            <Gradient />
          </div>
          <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
            <img
              src={heroBackground}
              className="w-full"
              width={1440}
              height={1800}
              alt="hero"
            />
          </div>
        </div>

        <div
          id="about"
          className="relative z-1 max-w-[62rem] mx-auto text-center mb-[1rem] md:mb-0 lg:mb-[1rem]"
        >
          <div className="flex flex-col md:flex-row items-center justify-center">
            <h1 className="h1 mb-6">
              A little about
              <span className="font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
                &nbsp;me&nbsp;
              </span>
            </h1>
            <div className="image-container my-6">
              <img
                src={edusticker}
                width={534}
                height={534}
                alt="eduSticker"
                className="w-full max-w-[534px] h-auto m-0 p-0"
              />
            </div>
          </div>
        </div>
        <BackgroundCircles />
        <CompanyLogos />
        <Modal id="contact" isOpen={isModalOpen} onClose={onCloseModal}>
          <ContactMe />
        </Modal>
      </div>
      <BottomLine />
    </Section>
  );
};

export default Hero;
