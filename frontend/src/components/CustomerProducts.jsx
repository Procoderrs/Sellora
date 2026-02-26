import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { FaShoppingCart } from "react-icons/fa";

export default function CategoryPreview() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await api.get("/categories");
        const prodRes = await api.get("/products");

        const parents = (catRes.data.categories || []).filter((c) => !c.parent);
        const allProducts = prodRes.data.products || [];

        const categoriesWithProducts = parents.map((parent) => {
          const parentProducts = allProducts.filter(
            (p) =>
              p.category?._id === parent._id ||
              p.category?.parent?._id === parent._id
          );
          return {
            ...parent,
            products: parentProducts.slice(0, 3),
          };
        });

        setCategories(categoriesWithProducts);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!categories.length) return null;

  const allProducts = categories.flatMap((cat) => cat.products);

  return (
    <section className="bg-background py-24">
      <div className="max-w-7xl mx-auto px-6 space-y-12">

        {/* SECTION TITLE */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h1
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-text-main)" }}
            >
              Our Picks
            </h1>
            <p className="mt-3 text-text-soft tracking-wide">
              Hand-picked delights from every category
            </p>
          </div>
          <div>
            <button
              onClick={() => navigate("/category/all")}
              className="px-8 py-3 bg-cakes hover:bg-coffee hover:text-white 
                         rounded-lg font-semibold shadow-md transition-all duration-300"
            >
              Show All Products
            </button>
          </div>
        </div>

        {/* PRODUCTS CAROUSEL */}
        <div className="flex gap-6 overflow-x-auto scrollbar-hide py-4">
          {allProducts.map((prod) => (
            <div
              key={prod._id}
              className="relative min-w-[260px] flex-shrink-0 rounded-3xl overflow-hidden 
                         bg-surface shadow-md group transition-all duration-300 hover:scale-105"
            >
              {/* DIAGONAL ACCENT */}
              <div
                className="absolute inset-0 bg-cupcakes/20"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)" }}
              />

              {/* IMAGE */}
              <div className="relative w-full h-52 flex justify-center items-center pt-4">
                <img
                  src={prod.images?.[0] || prod.image || "/placeholder.jpg"}
                  alt=""
                  className="w-36 h-36 object-cover rounded-2xl shadow-md 
                             group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* PRODUCT INFO */}
              <div className="p-4 flex flex-col justify-between h-[150px]">
                <div className="space-y-1">
                  <h2
                    className="text-base font-semibold line-clamp-2"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--color-text-main)" }}
                  >
                    {prod.title}
                  </h2>
                  <p
                    className="text-sm font-bold"
                    style={{ color: "var(--color-cakes)" }}
                  >
                    ${prod.price}
                  </p>
                </div>

                {/* VIEW PRODUCT BUTTON */}
                <button
                  onClick={() =>
                    navigate(`/product/${prod.slug || prod._id}`, {
                      state: {
                        product: prod,
                        parentCategory: prod.category.parent?.name || prod.category.name,
                      },
                    })
                  }
                  className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg 
                             bg-gradient-to-t from-cakes to-coffee 
                             text-text-main font-semibold shadow-md hover:from-coffee hover:to-cakes
                             transition-all duration-300"
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