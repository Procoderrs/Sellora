import React from "react";

export default function About() {
  return (
    <section className="px-12 py-12 font-serif bg-[#F4A460]/50">
      
      {/* HERO SECTION */}
      <div className="relative w-full h-[22rem] rounded-xl overflow-hidden">
        <img
          src="/about.jpg"
          alt="About our store"
          className="w-full h-full object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-end justify-start">
          <h2 className="text-3xl md:text-4xl max-w-2xl font-serif font-bold text-[#F5F5DC] text-left px-10 pb-10">
            Empower Individuals to Embrace Their Style and Feel Confident
          </h2>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="mt-14 max-w-5xl mx-auto flex flex-col gap-6">
        
        <h3 className="text-2xl font-semibold text-[#3B2F2F]">
          Welcome to Our Store
        </h3>

        <p className="text-[#4A3F3F] text-lg  leading-6">
          We understand that clothing is a powerful form of self-expression.
          Our mission is to empower you with a diverse range of clothing options
          that allow you to define and refine your personal style. We proudly
          uphold the values of inclusivity, sustainability, and staying ahead of
          the latest fashion trends.
        </p>

        <p className="text-[#4A3F3F] text-lg  leading-6">
          Our clothing embodies quality, comfort, and affordability — ensuring
          that you not only look good but also feel great in what you wear.
          We are here to support you on your fashion journey, helping you
          discover pieces that resonate with your individuality and boost
          your confidence.
        </p>

        <p className="text-[#4A3F3F] text-lg  leading-6 font-medium">
          Thank you for choosing us to be a part of your style evolution.
        </p>
      </div>
      <div className="mt-12 flex  gap-6 justify-center">
  <img
    src="/333.jpg"
    alt="Brand story"
    className=" w-[40%] object-cover rounded-lg shadow-sm"
  />

  <img
    src="/4905176.jpg"
    alt="Fashion inspiration"
    className=" w-[40%]  object-cover rounded-lg shadow-sm"
  />
</div>
{/* INFO + IMAGE SECTION */}
<div className="mt-20 max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-start px-4">

  {/* LEFT CONTENT */}
  <div className="flex-1 flex flex-col gap-8">

    <p className="text-xl font-semibold text-[#3B2F2F] leading-relaxed">
      Shop with us and wear not just a piece of clothing, but a promise of
      equality, responsibility & care.
    </p>

    {/* FEATURES GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

      {/* FEATURE 1 */}
      <div className="flex gap-4 items-start">
        <img
          src="/recycle_2.avif"
          alt="Sustainable fashion"
          className="w-12 h-12 object-contain"
        />
        <p className="text-[#4A3F3F] text-sm leading-relaxed">
          Step into the future of fashion with our garments crafted from high-quality recycled materials.
        </p>
      </div>

      {/* FEATURE 2 */}
      <div className="flex gap-4 items-start">
        <img
          src="/recycle_2.avif"
          alt="Eco-friendly production"
          className="w-12 h-12 object-contain"
        />
        <p className="text-[#4A3F3F] text-sm leading-relaxed">
          We use eco-friendly production methods to reduce environmental impact.
        </p>
      </div>

      {/* FEATURE 3 */}
      <div className="flex gap-4 items-start">
        <img
          src="/recycle_2.avif"
          alt="Quality materials"
          className="w-12 h-12 object-contain"
        />
        <p className="text-[#4A3F3F] text-sm leading-relaxed">
          Our garments are made from high-quality fabrics for comfort and durability.
        </p>
      </div>

      {/* FEATURE 4 */}
      <div className="flex gap-4 items-start">
        <img
          src="/recycle_2.avif"
          alt="Inclusive fashion"
          className="w-12 h-12 object-contain"
        />
        <p className="text-[#4A3F3F] text-sm leading-relaxed">
          We celebrate inclusivity, offering styles that fit all shapes and sizes.
        </p>
      </div>

    </div>
  </div>

  {/* RIGHT IMAGE */}
  <div className="flex-1 flex justify-center">
    <img
      src="/img-4.webp"
      alt="Our values"
      className="w-full max-w-sm h-[22rem] object-cover rounded-xl shadow-md"
    />
  </div>

</div>



    </section>
  );
}
