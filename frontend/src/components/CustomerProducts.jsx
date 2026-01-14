import { useEffect, useState } from "react";
import api from "../api/api";

export default function CustomerProducts() {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const res = await api.get("/admin/products");
      setProducts(res.data.products || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const latestProducts = getFirstProductPerCategory(products, 4);

  return (
    <section className="bg-[#F5F5DC] px-10 py-16">
      <h2 className="text-4xl font-serif font-bold text-[#3B2F2F] mb-12">
        Latest Arrival
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {latestProducts.map((product) => (
          <div
            key={product._id}
            className="group bg-white rounded-2xl p-4
                       shadow-md hover:shadow-2xl
                       hover:-translate-y-1
                       transition-all duration-300 ease-out"
          >
            {/* IMAGE WRAPPER */}
            <div className="relative w-full h-64 overflow-hidden rounded-xl">

              {/* BADGE */}
              <span className="absolute top-3 left-3 z-10
                               bg-[#E35336] text-white
                               text-xs px-3 py-1 rounded-full tracking-wide">
                New
              </span>

              {/* IMAGE 1 */}
              <img
                src={product.images?.[0] || "/placeholder.jpg"}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover
                           transition-all duration-700 ease-out
                           group-hover:opacity-0 group-hover:scale-105"
              />

              {/* IMAGE 2 */}
              <img
                src={product.images?.[1] || product.images?.[0] || "/placeholder.jpg"}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover
                           opacity-0 transition-all duration-700 ease-out
                           group-hover:opacity-100 group-hover:scale-105"
              />

              {/* OVERLAY */}
              <div
                className="absolute inset-0
                           bg-gradient-to-t
                           from-[#3B2F2F]/60 via-[#3B2F2F]/20 to-transparent
                           opacity-0 group-hover:opacity-100
                           transition duration-300
                           flex items-end justify-center pb-6"
              >
                <button
                  className="px-6 py-2 rounded-full
                             bg-[#A0522D] text-[#F5F5DC]
                             text-sm font-medium tracking-wide
                             shadow-md
                             translate-y-4 group-hover:translate-y-0
                             hover:bg-[#F4A460]
                             transition-all duration-300"
                >
                  Quick View
                </button>
              </div>
            </div>

            {/* TITLE */}
            <h3
              className="mt-5 text-lg font-semibold text-[#3B2F2F]
                         line-clamp-2
                         group-hover:text-[#A0522D]
                         transition"
            >
              {product.title}
            </h3>

            {/* PRICE */}
            <p className="mt-2 text-lg font-bold text-[#A0522D]">
              ${product.price}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================
   Helper Function
========================= */
function getFirstProductPerCategory(products, limit = 4) {
  const map = new Map();

  for (const product of products) {
    const categoryId = product.category?._id;

    if (categoryId && !map.has(categoryId)) {
      map.set(categoryId, product);
    }

    if (map.size === limit) break;
  }

  return Array.from(map.values());
}
