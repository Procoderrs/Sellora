import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function BestSelling() {
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

  /* GROUP PRODUCTS BY CATEGORY */
  const categories = {};

  products.forEach((prod) => {
    const catName = prod.category.name;
    if (!categories[catName]) categories[catName] = [];
    categories[catName].push(prod);
  });

  return (
    <section className="bg-background py-24">
      <div className="max-w-7xl mx-auto px-6 space-y-24">

        {Object.entries(categories).map(([catName, catProducts]) => {
          
          /* SORT BY SALES */
          const sorted = [...catProducts].sort(
            (a, b) => b.totalSold - a.totalSold
          );

          const best = sorted[0];
          const second = sorted[1];

          return (
            <div
              key={catName}
              className="relative overflow-hidden rounded-3xl"
            >
              {/* SAME BLOB BACKGROUND STYLE */}
              <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <img
                  src="/blobbb.svg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CONTENT GRID */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center p-8 md:p-12">

                {/* LEFT COLUMN */}
                <div className="flex flex-col justify-center">
                  <p className="text-accent font-semibold uppercase tracking-widest mb-2">
                    BEST SELLING
                  </p>

                  <h2 className="text-4xl md:text-5xl font-cookie text-primary font-bold mb-4">
                    {catName}
                  </h2>

                  <p className="text-text-main font-body text-base md:text-lg mb-6 leading-relaxed">
                    Discover our most loved {catName.toLowerCase()} crafted with
                    premium ingredients and irresistible flavors, baked fresh
                    to perfection.
                  </p>

                  <button
                    onClick={() => navigate(`/category/${catName.toLowerCase()}`)}
                    className="px-8 py-4 bg-accent text-hero-text rounded-full font-semibold shadow-md hover:scale-105 transition transform duration-300"
                  >
                    Explore {catName}
                  </button>
                </div>

                {/* MIDDLE COLUMN → BEST PRODUCT */}
                {best && (
                  <div className="w-full flex justify-center">
                    <img
                      src={best.images?.[0] || "/placeholder.jpg"}
                      alt={best.title}
                      className="rounded-2xl shadow-lg object-cover h-64 md:h-80 w-full max-w-sm transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                )}

                {/* RIGHT COLUMN → SECOND PRODUCT */}
                {second && (
                  <div className="w-full flex justify-center">
                    <img
                      src={second.images?.[0] || "/placeholder.jpg"}
                      alt={second.title}
                      className="rounded-2xl shadow-lg object-cover h-64 md:h-80 w-full max-w-sm transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                )}

              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
}