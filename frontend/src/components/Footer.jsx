import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#3B2F2F] text-[#F5F5DC] py-16 px-10 font-serif">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* 1️⃣ Store Name & Tagline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:pr-6 md:border-r md:border-[#F4A460]/40">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-wider">
              Sellora
            </h1>
          </div>
          <div>
            <p className="text-[#EDE6D7] text-sm md:text-base max-w-sm">
              “Where style meets soul – explore fashion that defines you.”
            </p>
          </div>
        </div>

        {/* 2️⃣ Pages */}
        <div className="grid grid-cols-2 gap-6 md:px-6 md:border-r md:border-[#F4A460]/40">
          <div>
            <h3 className="font-semibold mb-4 text-lg">Products</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shop" className="hover:text-[#F4A460] transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/collection" className="hover:text-[#F4A460] transition">
                  Collections
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-lg">Pages</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-[#F4A460] transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F4A460] transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 3️⃣ Address */}
        <div className="flex flex-col gap-4 md:pl-6">
          <h3 className="font-semibold mb-4 text-lg">Address</h3>
          <p className="text-sm md:text-base">
            123 Fashion Avenue, <br />
            Style City, SC 45678 <br />
            United States
          </p>
          <p className="text-sm md:text-base mt-2">
            Email:{" "}
            <a href="mailto:support@sellora.com" className="hover:text-[#F4A460]">
              support@sellora.com
            </a>
            <br />
            Phone:{" "}
            <a href="tel:+1234567890" className="hover:text-[#F4A460]">
              +1 234 567 890
            </a>
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#F4A460]/30 pt-6 mt-12 text-center text-sm text-[#EDE6D7]">
        © {new Date().getFullYear()} Sellora. All rights reserved. <br />
        Crafted with love for your unique style.
      </div>
    </footer>
  );
}
 