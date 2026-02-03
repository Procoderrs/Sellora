import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Discover a Curated Collection of Timeless Classics",
    desc: "We bridge old and new, bringing garments that resonate with style, elegance and heritage.",
    img: "/img-1.webp",
  },
  {
    title: "Explore Collections to Create a Wardrobe You Love",
    desc: "From casual comforts to gala-ready glam, our attire promises not just a fit, but a statement.",
    img: "/img-2.webp",
  },
  {
    title: "Turn Everyday into a Runway with Eclectic Clothing",
    desc: "Crafted with care, designed for distinction – find your next wardrobe wonder here.",
    img: "/img-3.webp",
  },
];

export default function HeaderHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
   <header className="h-[90vh] bg-[#F5F5DC] px-4 md:px-12">
  <div className="relative h-full max-w-7xl mx-auto overflow-hidden">
    {slides.map((slide, i) => (
      <div
        key={i}
        className={`absolute inset-0 flex flex-col-reverse md:flex-row 
          items-center md:items-start md:pt-20 transition-opacity duration-700
          ${i === index ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        {/* TEXT — LEFT ON DESKTOP */}
        <div
          className={`w-full md:w-1/2 md:pr-12 text-center md:text-left transform transition-all duration-700
            ${i === index ? "translate-x-0 opacity-100" : "translate-y-4 md:-translate-x-24 opacity-0"}`}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#3B2F2F] leading-tight">
            {slide.title}
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-[#3B2F2F]/80 max-w-md mx-auto md:mx-0">
            {slide.desc}
          </p>

          <Link
            to="/shop"
            className="mt-6 sm:mt-8 inline-block px-6 sm:px-8 py-2 sm:py-3 rounded-lg
              bg-[#A0522D] text-[#F5F5DC]
              hover:bg-[#8B4513] transition"
          >
            Shop Collection
          </Link>
        </div>

        {/* IMAGE — FIRST ON MOBILE, RIGHT ON DESKTOP */}
        <div
          className={`w-full md:w-1/2 h-64 sm:h-72 md:h-[75vh] mb-6 md:mb-0 transform transition-all duration-700
            ${i === index ? "translate-x-0 opacity-100" : "-translate-y-4 md:translate-x-24 opacity-0"}`}
        >
          <img
            src={slide.img}
            alt=""
            className="w-full h-full object-cover rounded-xl shadow-lg"
          />
        </div>
      </div>
    ))}

    {/* DOT NAVIGATION */}
    <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
      {slides.map((_, i) => (
        <button
          key={i}
          onClick={() => setIndex(i)}
          className={`w-3 h-3 rounded-full transition
            ${i === index ? "bg-[#A0522D]" : "bg-[#F4A460]"}`}
        />
      ))}
    </div>
  </div>
</header>


  );
}
