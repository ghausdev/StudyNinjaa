// Home.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from "../../assets/slide1.jpg";
import slide2 from "../../assets/slide2.jpg";
import slide3 from "../../assets/slide3.jpg";
import slide4 from "../../assets/slide4.jpg";
import slide5 from "../../assets/slide5.jpg";
import slide6 from "../../assets/slide6.jpg";
import slide7 from "../../assets/slide7.jpg";

// Import animation libraries
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Home = () => {
  // Refs for animation elements
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);

  // 3D animation effect for parallax scrolling
  useEffect(() => {
    // Hero section animations
    gsap.fromTo(
      heroRef.current.querySelector(".hero-content"),
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" }
    );

    // Stats counter animation
    const statElements = statsRef.current.querySelectorAll(".stat-value");
    statElements.forEach((stat) => {
      const value = stat.getAttribute("data-value");
      ScrollTrigger.create({
        trigger: stat,
        start: "top 80%",
        onEnter: () => {
          if (value.includes("+") || value.includes("%")) {
            const numValue = parseInt(value);
            gsap.fromTo(
              stat,
              { innerText: "0" },
              {
                innerText: numValue,
                duration: 2,
                snap: { innerText: 1 },
                onComplete: () => {
                  stat.innerText = value;
                },
              }
            );
          }
        },
        once: true,
      });
    });

    // Features animation
    const features = featuresRef.current.querySelectorAll(".feature-card");
    gsap.fromTo(
      features,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 70%",
        },
      }
    );

    // 3D parallax effect for hero section
    const heroImages = heroRef.current.querySelectorAll(".slider-image");
    heroImages.forEach((img) => {
      gsap.to(img, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // CTA section animation
    ScrollTrigger.create({
      trigger: ctaRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.8 }
        );
      },
      once: true,
    });

    return () => {
      // Clean up ScrollTriggers on component unmount
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const features = [
    {
      title: "Expert Essay Reviews",
      description:
        "Get comprehensive feedback on your essays from experienced tutors and admissions experts.",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      title: "Tutoring",
      description:
        "Practice with realistic tutoring scenarios and receive detailed feedback to improve your performance.",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Personalized Feedback",
      description:
        "Receive tailored advice and suggestions to improve your application materials.",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
  ];

  const statistics = [
    { value: "1000+", label: "Students Helped" },
    { value: "95%", label: "Success Rate" },
    { value: "50+", label: "Expert Tutors" },
    { value: "24/7", label: "Support" },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    arrows: false,
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section - Redesigned with left-aligned text */}
      <section
        ref={heroRef}
        className="relative h-screen bg-black overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Slider {...sliderSettings} className="h-full">
            {[slide1, slide2, slide3, slide4, slide5, slide6, slide7].map(
              (slide, index) => (
                <div key={index} className="relative h-screen">
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"></div>
                  <img
                    src={slide || "/placeholder.svg"}
                    alt={`Slide ${index + 1}`}
                    className="slider-image w-full h-full object-cover"
                  />
                </div>
              )
            )}
          </Slider>
        </div>

        <div className="relative z-20 h-full container mx-auto px-6 flex items-center">
          <div className="hero-content max-w-2xl text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
              Your Journey to
              <span className="block text-red-500 mt-2">Academic Success</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-xl">
              Get expert guidance on your university applications, essays, and
              interviews. Join thousands of successful students who achieved
              their academic goals with StudyNINJAA.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="transform transition-all duration-300 hover:scale-105 inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-lg text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-red-500/30"
              >
                Get Started
                <svg
                  className="ml-2 h-5 w-5 animate-pulse"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
          <div className="animate-bounce flex flex-col items-center">
            <span className="text-white text-sm mb-2">Scroll Down</span>
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              ></path>
            </svg>
          </div>
        </div>
      </section>

      {/* 3D Perspective Divider */}
      <div className="relative h-24 bg-gradient-to-b from-black to-red-700 transform -skew-y-3 -mt-12 z-10"></div>

      {/* Stats Section - Enhanced with animations */}
      <section ref={statsRef} className="bg-red-600 py-16 relative z-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {statistics.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 transform transition-transform hover:scale-105"
              >
                <p
                  className="stat-value text-4xl font-bold text-white mb-2"
                  data-value={stat.value}
                >
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-red-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/20"
              style={{
                width: `${Math.random() * 20 + 5}px`,
                height: `${Math.random() * 20 + 5}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              }}
            ></div>
          ))}
        </div>
      </section>

      {/* Features Section - With card hover effects and animations */}
      <section ref={featuresRef} className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose StudyNINJAA?
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Comprehensive support for your university applications with
              cutting-edge tools and expert guidance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="feature-card relative group perspective-1000"
              >
                <div className="relative rounded-xl overflow-hidden transition-all duration-500 transform group-hover:rotate-y-10 group-hover:scale-105 shadow-xl">
                  {/* Card background with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 group-hover:from-red-50 group-hover:to-white transition-colors duration-500"></div>

                  {/* Card content */}
                  <div className="relative p-8 z-10">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-6 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      {feature.description}
                    </p>

                    {/* Hidden learn more link that appears on hover */}
                    <div className="mt-6 overflow-hidden h-0 group-hover:h-8 transition-all duration-300"></div>
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-10 -translate-y-10 rotate-45 bg-red-500/10 group-hover:bg-red-500/20 transition-all duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section - New section with 3D card effect */}
      <section className="bg-gray-50 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What Our Students Say
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Real success stories from students who achieved their academic
              goals
            </p>
          </motion.div>

          <div className="relative">
            {/* 3D rotating testimonial cards */}
            <div className="flex overflow-x-auto pb-12 space-x-6 snap-x scrollbar-hide">
              {[
                {
                  name: "Alex Johnson",
                  university: "Harvard University",
                  quote:
                    "StudyNINJAA's essay review service was instrumental in helping me craft a compelling personal statement that got me into my dream school.",
                  image: "https://randomuser.me/api/portraits/men/32.jpg",
                },
                {
                  name: "Sarah Williams",
                  university: "Stanford University",
                  quote:
                    "The tutoring sessions boosted my confidence and helped me ace my interviews. I couldn't have done it without their support!",
                  image: "https://randomuser.me/api/portraits/women/44.jpg",
                },
                {
                  name: "Michael Chen",
                  university: "MIT",
                  quote:
                    "The personalized feedback I received on my application materials made all the difference. Highly recommend their services!",
                  image: "https://randomuser.me/api/portraits/men/67.jpg",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="snap-center flex-shrink-0 w-full sm:w-96 perspective-1000 transform transition-all duration-500 hover:scale-105"
                >
                  <div className="bg-white rounded-2xl shadow-xl p-8 h-full transform transition-transform duration-700 hover:rotate-y-10 border border-gray-100">
                    <div className="flex items-center mb-6">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-red-500"
                      />
                      <div className="ml-4">
                        <h4 className="text-lg font-bold text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-red-600">{testimonial.university}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="mt-6 flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced with gradient and animation */}
      <section ref={ctaRef} className="relative py-20 overflow-hidden">
        {/* Background with 3D perspective */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800 transform -skew-y-6 origin-top-right"></div>

        <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 shadow-2xl">
            <div className="lg:flex lg:items-center lg:justify-between">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  <span className="block">Ready to start your journey?</span>
                  <span className="block text-red-200">
                    Join StudyNINJAA today.
                  </span>
                </h2>
                <p className="mt-4 text-lg text-white/80 max-w-lg">
                  Take the first step toward your academic success. Our team of
                  experts is ready to guide you through every step of your
                  application process.
                </p>
              </motion.div>

              <motion.div
                className="mt-8 flex flex-col sm:flex-row sm:space-x-4 lg:mt-0 lg:flex-shrink-0"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-red-600 bg-white hover:bg-gray-50 shadow-lg hover:shadow-white/20 transition-all duration-300 transform hover:scale-105"
                >
                  Get Started
                  <svg
                    className="ml-2 -mr-1 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Floating 3D elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/5 backdrop-blur-sm rounded-full"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 20 + 10}s linear infinite`,
                transform: `translateZ(${Math.random() * 100}px)`,
              }}
            ></div>
          ))}
        </div>
      </section>

      {/* Add this CSS for animations */}
      <style>
        {`
          @keyframes float {
            0% {
              transform: translate(0, 0) rotate(0deg);
            }
            50% {
              transform: translate(100px, 50px) rotate(180deg);
            }
            100% {
              transform: translate(0, 0) rotate(360deg);
            }
          }

          .perspective-1000 {
            perspective: 1000px;
          }

          .rotate-y-10:hover {
            transform: rotateY(10deg);
          }

          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }

          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
