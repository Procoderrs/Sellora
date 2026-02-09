import React from "react";

const sections = [
  {
    title: "Freshly Baked Cakes",
    desc: "Our cakes are baked fresh every day with premium ingredients to give you rich taste and soft textures.",
    images: ["/cake.png", "/lotus.png"],
  },
  {
    title: "Delicious Cupcakes",
    desc: "Perfect cupcakes for birthdays, parties, or just to satisfy your sweet cravings.",
    images: ["/cupcake.png", "/vanilla.png"],
  },
  {
    title: "Coffee & Desserts",
    desc: "Pair your favorite cake with freshly brewed coffee for the perfect dessert experience.",
    images: ["/coffee.png", "/espresso.png"],
  },
];

export default function Shop_info() {
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
                  className="w-full h-[220px] md:h-[320px] object-cover rounded-3xl shadow-lg"
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

              <button className="mt-6 px-6 py-3 bg-accent text-text-main rounded-lg hover:bg-primary hover:text-white transition">
                Explore More
              </button>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
