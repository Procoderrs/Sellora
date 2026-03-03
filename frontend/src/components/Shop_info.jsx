import React from "react";
import { useNavigate } from "react-router-dom";

const sections = [
  {
    title: "Freshly Baked Cakes",
    slug: "cakes",
    desc: "Our cakes are handcrafted daily by expert bakers using premium ingredients, farm-fresh eggs, and rich dairy cream. Each slice delivers a soft, moist texture with perfectly balanced sweetness — making every celebration extra special. From classic chocolate indulgence to luxurious lotus creations, we bake happiness into every bite.",
    images: ["/cake.png", "/lotus.png"],
  },
  {
    title: "Delicious Cupcakes",
    slug: "cupcakes",
    desc: "Our cupcakes are tiny bundles of joy topped with smooth, creamy frosting and delightful flavors. Whether it's a birthday, anniversary, or a simple self-treat moment, these perfectly portioned delights bring color, charm, and irresistible sweetness to your day.",
    images: ["/cupcake.png", "/vanilla.png"],
  },
  {
    title: "Coffee & Desserts",
    slug: "coffee",
    desc: "Experience the perfect pairing of freshly brewed coffee and handcrafted desserts. From bold espresso shots to creamy cappuccinos, every sip complements our rich cakes and brownies. It’s more than just coffee — it’s a cozy, comforting moment made to relax and indulge.",
    images: ["/coffee.png", "/espresso.png"],
  },
  {
    title: "Joyful Brownie",
    slug: "brownie",
    desc: "Our brownies are baked to perfection with a fudgy center and slightly crisp edges. Loaded with premium cocoa and optional nutty crunch, each bite melts in your mouth. Perfect with coffee or on its own, it’s a chocolate lover’s ultimate comfort dessert.",
    images: ["/browniw-1.png", "/brownie-2.png"],
  },
];

export default function Shop_info() {
  const navigate = useNavigate();

  return (
    <section className="bg-background relative py-24 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-10 -left-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">

        {/* ✅ SECTION HEADING */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-primary">
            Crafted With Love
          </h1>
          <p className="mt-3 text-text-main/70 tracking-wide">
            Fresh ingredients, delightful flavors, unforgettable moments
          </p>
        </div>

        <div className="space-y-32">
          {sections.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-12 relative group ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* IMAGES */}
              <div className="w-full md:w-1/2 grid grid-cols-2 gap-6 relative">
                {item.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="w-full h-56 md:h-80 object-cover rounded-3xl shadow-2xl transform transition-transform duration-500 group-hover:scale-105"
                  />
                ))}

                <div className="absolute -top-4 -left-4 w-12 h-12 bg-accent/30 rounded-full animate-bounce pointer-events-none"></div>
              </div>

              {/* TEXT */}
              <div className="w-full md:w-1/2 text-center md:text-left relative z-10">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-text-main relative inline-block">
                  {item.title}
                  <span className="absolute -bottom-2 left-0 w-16 h-1 bg-accent rounded-full"></span>
                </h2>

                <p className="mt-4 text-text-main/80 leading-relaxed">
                  {item.desc}
                </p>

                <button
  onClick={() => navigate(`/category/${item.slug}`)}
  className="mt-6 relative px-8 py-3 font-medium rounded-lg overflow-hidden
             text-text-main transition-all group"
>
  {/* Animated Background */}
  <span
    className="absolute inset-0 bg-gradient-to-b from-accent to-primary
               translate-y-full transition-transform duration-300
               group-hover:translate-y-0 z-0"
  ></span>

  {/* Button Text */}
  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
    Explore Now
  </span>
</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

