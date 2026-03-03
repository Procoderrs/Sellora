import React, { useState } from "react";
import api from "../api/api";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Subscribe() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");


  const slides = [
  "Fresh Cakes Daily!",
  "100% Authentic",
  "Made With Love",
  "Premium Ingredients",
];
const images = ["/cake--1.png", "/cake---2.png"]; // your 2 images
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setMessage("Please enter a valid email.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      await api.post("/newsletter/subscribe", { email });
      setMessage("Successfully subscribed!");
      setEmail("");
    } catch (error) {
      if (error.response?.status === 409) {
        setMessage("You are already subscribed.");
      } else {
        setMessage("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-12 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto bg-card/70 backdrop-blur-md border border-muted rounded-3xl shadow-xl p-8 md:p-12 text-center">

        {/* Heading */}
        <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-4">
          Join Our Sweet Newsletter
        </h3>

        <p className="text-text-main/80 mb-8 max-w-xl mx-auto">
          Be the first to know about fresh bakes, exclusive discounts, and
          delightful seasonal treats straight from our oven.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center gap-4 justify-center"
        >
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-auto flex-1 px-5 py-5 rounded-2xl border border-muted bg-background focus:ring-2 focus:ring-accent outline-none transition-all shadow-sm"
          />

          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-accent text-white rounded-2xl font-semibold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
          >
            {loading ? "Sending..." : "Subscribe"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <p
            className={`mt-5 text-sm font-medium ${
              message.includes("Success")
                ? "text-green-600"
                : message.includes("already")
                ? "text-yellow-600"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
<div className="relative mt-20 overflow-hidden">

 <Swiper
  modules={[Autoplay]}
  loop
  slidesPerView="auto"
  spaceBetween={80}
  speed={4000}
  autoplay={{
    delay: 0,
    disableOnInteraction: false,
  }}
  allowTouchMove={false}
  className="mt-20"
>
  {slides.flatMap((text, index) => {
    const imageSrc = images[index % images.length];

    return [
      // Text Slide
      <SwiperSlide key={`text-${index}`} className="!w-auto">
        <h2 className="font-fraunce text-5xl md:text-6xl whitespace-nowrap text-primary">
          {text}
        </h2>
      </SwiperSlide>,

      // Alternating Image Slide
      <SwiperSlide key={`img-${index}`} className="!w-auto">
        <img
          src={imageSrc}
          alt="Cake"
          className="h-20 md:h-24 -mt-4 object-contain"
        />
      </SwiperSlide>,
    ];
  })}
</Swiper>

  {/* Optional Gradient Fade Edges */}
  <div className="pointer-events-none absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-background to-transparent" />
  <div className="pointer-events-none absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-background to-transparent" />
</div>
    </section>
  );
}