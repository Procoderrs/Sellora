import React from "react";

import { useNavigate } from "react-router-dom";
const sections = [
  {
    title: "Freshly Baked Cakes",
    slug:"cakes",
    desc: "Our cakes are baked fresh every day with premium ingredients to give you rich taste and soft textures.",
    images: ["/cake.png", "/lotus.png"],
  },
  {
    title: "Delicious Cupcakes",
    slug:"cupcakes",
    desc: "Perfect cupcakes for birthdays, parties, or just to satisfy your sweet cravings.",
    images: ["/cupcake.png", "/vanilla.png"],
  },
  {
    title: "Coffee & Desserts",
    slug:"coffee",
    desc: "Pair your favorite cake with freshly brewed coffee for the perfect dessert experience.",
    images: ["/coffee.png", "/espresso.png"],
  },
  {
    title: "Joyful Brownie",
    slug:"brownie",
    desc: "Pair your favorite cake with freshly brewed coffee for the perfect dessert experience.",
    images: ["/browniw-1.png", "/brownie-2.png"],
  },
];

export default function Shop_info() {

  const navigate=useNavigate()
  return (
    <section className="bg-background py-20">
      <div className="max-w-7xl mx-auto px-6 space-y-24">

        {sections.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-12 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* IMAGES (2 IMAGES) */}
            <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
              {item.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={item.title}
                  className="w-full h-55 md:h-80 object-cover rounded-3xl shadow-lg"
                />
              ))}
            </div>

            {/* TEXT */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-text-main">
                {item.title}
              </h2>

              <p className="mt-4 text-text-main/80 leading-relaxed">
                {item.desc}
              </p>

              <button
  onClick={() => navigate(`/category/${item.slug}`)}
  className="mt-6 px-6 py-3 bg-accent text-text-main rounded-lg
             hover:bg-primary hover:text-white transition"
>
  Explore Now
</button>

            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
