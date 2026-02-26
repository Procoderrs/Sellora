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

  /* GROUP BY PARENT CATEGORY */
  const categories = {};

  products.forEach((prod) => {
    const parentName = prod?.category?.parent?.name;

    if (!parentName) return;

    if (!categories[parentName]) categories[parentName] = [];
    categories[parentName].push(prod);
  });

  return (
    <section className="bg-background py-24">
      <div className="max-w-7xl mx-auto px-6 space-y-24">

        {Object.entries(categories).map(([parentName, catProducts]) => {
          
          /* SORT BY SALES */
          const sorted = [...catProducts].sort(
            (a, b) => (b.totalSold || 0) - (a.totalSold || 0)
          );

          /* ONLY TOP 2 */
          const topTwo = sorted.slice(0, 2);

          return (
            <div
              key={parentName}
              className="relative overflow-hidden rounded-3xl shadow-lg"
            >
              {/* Background */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                  src="/blobbb.svg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Grid */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10 items-center p-8 md:p-12">

                {/* LEFT COLUMN */}
                <div>
                  <p className="text-accent font-semibold uppercase tracking-widest mb-2">
                    Best Selling
                  </p>

                  <h2 className="text-4xl md:text-5xl font-cookie text-primary font-bold mb-4">
                    {parentName}
                  </h2>

                  <p className="text-text-main font-body text-base md:text-lg mb-6 leading-relaxed">
                    Explore our most loved {parentName.toLowerCase()} crafted
                    with premium ingredients and irresistible flavors.
                  </p>

                  <button
                    onClick={() =>
                      navigate(`/category/${parentName.toLowerCase()}`)
                    }
                    className="px-8 py-4 bg-accent text-hero-text rounded-full font-semibold shadow-md hover:scale-105 transition"
                  >
                    Explore {parentName}
                  </button>
                </div>

                {/* PRODUCTS */}
                {topTwo.map((prod) => (
                  <div key={prod._id} className="flex flex-col items-center">
                    <img
                      src={prod.images?.[0] || "/placeholder.jpg"}
                      alt={prod.title}
                      onClick={() => navigate(`/product/${prod.slug}`)}
                      className="cursor-pointer rounded-2xl shadow-lg object-cover h-64 md:h-80 w-full max-w-sm hover:scale-105 transition"
                    />

                    <p className="mt-4 text-primary font-semibold text-lg text-center">
                      {prod.title}
                    </p>

                    <p className="text-sm text-text-muted">
                      Sold: {prod.totalSold || 0}
                    </p>
                  </div>
                ))}

              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
}