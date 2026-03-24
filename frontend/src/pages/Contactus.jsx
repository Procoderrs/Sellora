import React, { useState } from "react";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

export default function Contact() {

  

  
  

  return (
    <section className="bg-background text-text-main font-body">

      {/* =================================
         HERO SECTION
      ================================= */}

      <div className="relative h-[50vh] flex items-center justify-center text-center">

        <img
          src="/im.avif"
          alt="Contact Cakelet Bakery"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-5xl font-heading text-hero-text mb-4">
            Contact Cakelet
          </h1>

          <p className="text-hero-text/90 max-w-xl mx-auto">
            We'd love to hear from you. Whether it's a custom cake request,
            a question, or feedback — our team is here to help.
          </p>
        </div>

      </div>


      {/* =================================
         CONTACT INFO CARDS
      ================================= */}

      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">

        {/* Phone */}
        <div className="bg-card p-8 rounded-xl shadow-md text-center">
          <FiPhone className="mx-auto text-accent mb-4" size={28} />

          <h3 className="font-heading text-lg mb-2">
            Call Us
          </h3>

          <p className="text-sm">
            +92 300 1234567
          </p>
        </div>

        {/* Email */}
        <div className="bg-card p-8 rounded-xl shadow-md text-center">
          <FiMail className="mx-auto text-accent mb-4" size={28} />

          <h3 className="font-heading text-lg mb-2">
            Email
          </h3>

          <p className="text-sm">
            support@cakelet.com
          </p>
        </div>

        {/* Location */}
        <div className="bg-card p-8 rounded-xl shadow-md text-center">
          <FiMapPin className="mx-auto text-accent mb-4" size={28} />

          <h3 className="font-heading text-lg mb-2">
            Visit Us
          </h3>

          <p className="text-sm">
            Faisalabad, Pakistan
          </p>
        </div>

      </div>


      


      {/* =================================
         GOOGLE MAP SECTION
      ================================= */}

      <div className="h-[400px] w-full">

        <iframe
          title="Cakelet Bakery Location"
          src="https://maps.google.com/maps?q=faisalabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
        ></iframe>

      </div>

    </section>
  );
}