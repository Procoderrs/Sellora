import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Variety() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const res = await api.get("/products/top-selling");
        setProducts(res.data.products || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTopProducts();
  }, []);

  if (!products.length) return null;
  const [firstProd, secondProd] = products;

  return (
    <section className="relative bg-background py-24 overflow-hidden">

      {/* RELIABLE SVG/BLOB BACKGROUND */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <img
          src="/blobbb.svg"
          alt="Decorative background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

        {/* LEFT: Intro & Description */}
        <div className="flex flex-col justify-center">
          <p className="text-accent font-semibold uppercase tracking-widest mb-2">
            INTRODUCING OUR
          </p>
          <h2 className="text-4xl md:text-6xl font-cookie text-primary font-bold mb-4">
            Wide Variety of Delicious Cakes
          </h2>
          <p className="text-text-main font-body text-base md:text-lg mb-3 leading-relaxed">
            Being the quintessential representation of aesthetics and taste, a Layers dessert is consumed by the eyes well before delighting the tastebuds!
          </p>
          <p className="text-text-main font-body text-base md:text-lg mb-6 leading-relaxed">
            A Layers dessert sweeps you away into a sweet fantasy, where your wildest dessert dreams are realized. Infused with decadent magic, every flavor dances on the palette to a sweet symphony.
          </p>
          <button
            onClick={() => navigate("/category/all")}
            className="px-8 py-4 bg-accent text-hero-text rounded-full font-semibold shadow-md hover:scale-105 transition transform duration-300"
          >
            CAKELET MENU
          </button>
        </div>

      {/* MIDDLE: First Product Image */}
<div className="w-full flex justify-center">
  <img
    src="/choc-1.jpg"
    alt="Chocolate Cake 1"
    className="rounded-2xl shadow-lg object-cover h-64 md:h-80 w-full max-w-sm transition-transform duration-500 hover:scale-105"
  />
</div>

{/* RIGHT: Second Product Image */}
<div className="w-full flex justify-center">
  <img
    src="/choc-2.jpg"
    alt="Chocolate Cake 2"
    className="rounded-2xl shadow-lg object-cover h-64 md:h-80 w-full max-w-sm transition-transform duration-500 hover:scale-105"
  />
</div>
      </div>
    </section>
  );
}