import { useEffect, useState } from "react";
import Header from './Header'

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


     
    <header className="h-[90vh] bg-[#F5F5DC]">
      {/* RELATIVE WRAPPER */}
      <div className="relative h-full max-w-7xl mx-auto px-12 overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 flex items-center transition-opacity duration-700
              ${i === index ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >

            {/* LEFT — TEXT */}
            <div
              className={`w-1/2 pr-12 transform transition-all duration-700
                ${i === index ? "translate-x-0 opacity-100" : "-translate-x-24 opacity-0"}`}
            >
              <h1 className="text-5xl font-serif font-bold text-[#3B2F2F] leading-tight">
                {slide.title}
              </h1>

              <p className="mt-6 text-lg text-[#3B2F2F]/80 max-w-md">
                {slide.desc}
              </p>

              <button
                className="mt-8 px-8 py-3 rounded-lg
                           bg-[#A0522D] text-[#F5F5DC]
                           hover:bg-[#8B4513] transition"
              >
                Shop Collection
              </button>
            </div>

            {/* RIGHT — IMAGE */}
            <div
              className={`w-1/2 h-[75vh] transform transition-all duration-700
                ${i === index ? "translate-x-0 opacity-100" : "translate-x-24 opacity-0"}`}
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
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
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
