import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const slides = [
  {
    type: "image",
    title: "Freshly baked happiness, every single day",
    desc: "Don't miss today's featured delights — fresh from our oven!",
    src: "/choccoo.jpg",
    captions: "/video-3-captions.vtt",
  },
];

export default function HeaderHero() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <header className="relative  min-h-[calc(100vh-80px)]  overflow-hidden">

      {/* BACKGROUND MEDIA */}
      <div className="absolute inset-0">
        {slide.type === "video" ? (
          <video
            key={slide.src}
            src={slide.src}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            {slide.captions && (
              <track kind="captions" src={slide.captions} srcLang="en" label="English" />
            )}
          </video>
        ) : (
          <img src={slide.src} alt="" className="w-full h-full object-center object-cover"
          loading="lazy" />
        )}
        {/* DARK OVERLAY FOR PREMIUM FEEL */}
        <div className="absolute inset-0 bg-black/50 " />
      </div>

      {/* SCREEN READER TEXT */}
      <div className="sr-only" aria-live="polite">
        {slide.title}. {slide.desc}.
      </div>

      {/* TEXT CONTENT */}
      <div className="relative z-10 min-h-[calc(100vh-50px)] flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-3xl ">
          <h1 className="text-4xl md:text-6xl font-heading  font-bold leading-tight text-hero-text drop-shadow-lg">
            {slide.title}
          </h1>

        

          {/* PREMIUM CTA BUTTON */}
          <button onClick={() => navigate("/category/all")}     
       className="mt-8 inline-flex items-center gap-3 
           px-8 py-4 
           bg-accent text-hero-text
           font-medium text-lg
            shadow-lg
           hover:scale-105 hover:bg-cakes
           transition-all duration-300"
          >
            Explore Products <FaArrowRight className="animate-bounce" />
          </button>
        </div>
      </div>

      
    </header>
  );
}
