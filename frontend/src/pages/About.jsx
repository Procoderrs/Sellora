import React from "react";

export default function About() {
  return (
    <section className="px-4 md:px-12 py-12 font-Oswald bg-background text-text-main">

      {/* =====================================================
         HERO SECTION
         -----------------------------------------------------
         - Hero image above-the-fold hoti hai
         - Isliye lazy loading remove ki
         - decoding="async" browser ko faster decode karne deta hai
         - aspect ratio + fixed height CLS (layout shift) prevent karta hai
      ===================================================== */}

      <div className="relative w-full h-[70vh] md:h-screen rounded-xl overflow-hidden">

        <img
          src="/about-img-3.jpg"
          alt="About Cakelet Bakery"
          decoding="async"
          className="w-full h-full object-cover object-center"
        />

        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-black/40 flex items-end">

          {/* Main heading of page */}
          <h1 className="text-2xl md:text-4xl max-w-2xl font-cookie text-background px-6 md:px-10 pb-6 md:pb-10">
            Freshly Baked Happiness, Crafted with Love & Passion
          </h1>

        </div>
      </div>


      {/* =====================================================
         SECTION 1
         -----------------------------------------------------
         - Image lazy loaded because it is below fold
         - decoding async for faster image decoding
      ===================================================== */}

      <div className="mt-16 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">

        {/* Image */}
        <div className="flex-1">
          <img
            src="/cake-clr.png"
            alt="Cakelet Bakery"
            loading="lazy"
            decoding="async"
            className="w-full h-[18rem] md:h-[24rem] object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Text Content */}
        <div className="flex-1 flex flex-col gap-4">

          <h2 className="text-2xl font-cookie text-primary">
            Welcome to Cakelet
          </h2>

          <p className="text-text-main leading-relaxed font-Inter">
            Cakelet is more than just a bakery — it’s a place where sweetness,
            creativity, and passion come together. Every cake we craft is
            designed to turn ordinary moments into unforgettable memories.
          </p>

          <p className="text-text-main leading-relaxed font-Inter">
            From birthdays to celebrations, our desserts are baked with care,
            premium ingredients, and a commitment to exceptional taste.
          </p>

        </div>
      </div>


      {/* =====================================================
         SECTION 2
         -----------------------------------------------------
         - Reverse layout for visual balance
         - Lazy load image because below fold
      ===================================================== */}

      <div className="mt-20 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">

        {/* Text Content */}
        <div className="flex-1 flex flex-col gap-4">

          <h2 className="text-2xl font-cookie text-primary">
            Crafted With Love & Quality
          </h2>

          <p className="text-text-main leading-relaxed font-Inter">
            We believe great desserts begin with great ingredients. That’s why
            every Cakelet creation is made using carefully selected components,
            ensuring freshness, flavor, and perfection.
          </p>

          <p className="text-text-main leading-relaxed font-Inter">
            Our goal is simple — deliver happiness through beautifully baked
            cakes that taste as good as they look.
          </p>

        </div>

        {/* Image */}
        <div className="flex-1">
          <img
            src="/cake-choc.png"
            alt="Fresh Desserts"
            loading="lazy"
            decoding="async"
            className="w-full h-[18rem] md:h-[24rem] object-cover rounded-xl shadow-md"
          />
        </div>
      </div>


      {/* =====================================================
         CONTACT GRID SECTION
         -----------------------------------------------------
         - 3 column responsive layout
         - Images lazy loaded
      ===================================================== */}

      <div className="mt-24 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">

        {/* LEFT IMAGE */}
        <img
          src="/browniw-img.png"
          alt="Cakelet Showcase"
          loading="lazy"
          decoding="async"
          className="w-full h-[16rem] object-cover rounded-xl shadow-md"
        />


        {/* CENTER TEXT */}
        <div className="text-center px-4">

          <h2 className="text-xl font-cookie text-primary mb-3">
            Have Questions?
          </h2>

          <p className="text-text-main mb-2 font-Inter">
            If you have any questions, feel free to contact us.
          </p>

          <p className="text-sm text-text-main leading-relaxed font-Inter">
            Our team is always happy to assist you with orders, custom cakes,
            and special requests. We’re here to make your experience delightful
            and stress-free.
          </p>

        </div>


        {/* RIGHT IMAGE */}
        <img
          src="/coffee-img.png"
          alt="Cakelet Creations"
          loading="lazy"
          decoding="async"
          className="w-full h-[16rem] object-cover rounded-xl shadow-md"
        />

      </div>

    </section>
  );
}