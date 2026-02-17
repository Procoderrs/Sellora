import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function TopProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const res = await api.get("/products/top-selling");
        console.log("TOP PRODUCTS:", res.data);
        // Set products array
        setProducts(res.data.products || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTopProducts();
  }, []);

  if (!products.length) return null;

  return (
    <section className="bg-[#FFF8ED] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between">

          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#A0522D]">
              Top Selling Products
            </h2>
            <p className="mt-3 text-text-main/70 tracking-wide">
              Our most loved & best performing delights
            </p>
          </div>

          {/* SHOW ALL BUTTON */}
          <div className="text-center mt-10">
            <button
              onClick={() => navigate("/category/all")}
              className="px-10 py-3 bg-[#E6B65A] hover:bg-[#A0522D] hover:text-white 
                         rounded-lg font-semibold shadow-md transition-all duration-300"
            >
              Show All Products
            </button>
          </div>
        </div>

        {/* PREMIUM HORIZONTAL CAROUSEL */}
        <div className="flex gap-6 overflow-x-auto scrollbar-hide py-4">
          {products.map((prod) => (
            <div
              key={prod._id}
              className="relative min-w-[260px] flex-shrink-0 rounded-3xl 
                         overflow-hidden bg-white shadow-xl group transition-all duration-300"
            >
              {/* DIAGONAL ACCENT */}
              <div
                className="absolute inset-0 bg-[#E6B65A]/20"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)" }}
              />

              {/* IMAGE */}
              <div className="relative w-full h-52 flex justify-center items-center pt-4">
                <img
                  src={prod.images?.[0] || "/placeholder.jpg"}
                  alt={prod.title}
                  className="w-36 h-36 object-cover rounded-2xl shadow-md 
                             group-hover:scale-105 transition-transform duration-500"
                />

                {/* TOP SELLER BADGE */}
                {prod.totalSold > 2 && (
                  <div className="absolute top-4 left-4 bg-[#A0522D] text-white 
                                  px-3 py-1 rounded-full text-xs font-semibold shadow">
                    🔥 Top Seller
                  </div>
                )}
              </div>

              {/* INFO */}
              <div className="p-4 flex flex-col">
                <h3 className="font-playfair text-sm font-semibold text-[#3B2F2F] line-clamp-2">
                  {prod.title}
                </h3>

                <p className="mt-1 text-primary font-bold text-sm">
                  ${prod.price}
                </p>

                

                {/* CTA BUTTON */}
                <button
                  onClick={() =>
                    navigate(`/product/${prod.slug || prod._id}`, {
                      state: {
                        product: prod,
                        parentCategory:
                          prod.category.parent?.name || prod.category.name,
                      },
                    })
                  }
                  className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg 
                             bg-gradient-to-t from-[#E6B65A] to-[#A0522D] 
                             text-white font-semibold shadow-md"
                >
                  <FaShoppingCart className="text-sm" /> View Product
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
