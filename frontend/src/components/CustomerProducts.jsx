import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { CartContext } from "../context/CartContext";

export default function CategoryPreview() {
  const [categories, setCategories] = useState([]);
  const [productQuantities, setProductQuantities] = useState({});
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await api.get("/categories");
        const prodRes = await api.get("/products");

        const allCategories = catRes.data.categories || [];
        const allProducts = prodRes.data.products || [];

        const parents = allCategories.filter((c) => !c.parent);

        const categoriesWithProducts = parents.map((parent) => {
          const parentProducts = allProducts.filter(
            (p) =>
              p.category?._id === parent._id ||
              p.category?.parent?._id === parent._id
          );

          return {
            ...parent,
            products: shuffleArray(parentProducts).slice(4, 6),
          };
        });

        setCategories(categoriesWithProducts);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const increaseQty = (id) =>
    setProductQuantities((p) => ({ ...p, [id]: (p[id] || 1) + 1 }));
  const decreaseQty = (id) =>
    setProductQuantities((p) => ({ ...p, [id]: Math.max((p[id] || 1) - 1, 1) }));

  const handleAddToCart = (id, product) => {
    addToCart(product, productQuantities[id] || 1);
  };

  if (!categories.length) return null;

  return (
    <section className="bg-[#FAF7F2] py-20">
      <div className="max-w-7xl mx-auto px-6 space-y-20">

        {/* SECTION TITLE */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-[#6B3E2E]">
            Our Picks
          </h1>
          <p className="mt-3 text-sm text-[#8B6F63] tracking-wide">
            Hand-picked delights from every category
          </p>
        </div>

        {categories.map((cat) => (
          <div key={cat._id}>

            {/* CATEGORY TITLE */}
            <div className="flex items-center justify-between mb-6">
              <h2
                onClick={() => navigate(`/category/${cat.slug}`)}
                className="text-2xl font-playfair font-semibold text-[#5A3828] cursor-pointer hover:text-[#A0522D] transition"
              >
                {cat.name}
              </h2>
              <span
                onClick={() => navigate(`/category/${cat.slug}`)}
                className="text-sm text-[#A0522D] cursor-pointer hover:underline"
              >
                View all →
              </span>
            </div>

            {/* PRODUCTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cat.products.map((prod) => {
                const qty = productQuantities[prod._id] || 1;

                return (
                  <div
                    key={prod._id}
                    className="bg-white rounded-xl border border-[#EFE6DC] hover:shadow-lg transition p-4 flex gap-4"
                  >
                    {/* IMAGE (SMALL & CLEAN) */}
                    <img
                      src={prod.images?.[0] || "/placeholder.jpg"}
                      alt={prod.title}
                      className="w-28 h-28 rounded-lg object-cover flex-shrink-0"
                    />

                    {/* INFO */}
                    <div className="flex flex-col flex-1">
                      <h3 className="font-playfair text-lg font-semibold text-[#4A2C20] leading-tight">
                        {prod.title}
                      </h3>

                      <p className="text-[#8B4513] font-bold mt-1">
                        ${prod.price.toFixed(2)}
                      </p>

                      {/* ACTIONS */}
                      <div className="mt-auto flex items-center gap-2">
                        <div className="flex items-center border rounded-md overflow-hidden">
                          <button
                            onClick={() => decreaseQty(prod._id)}
                            className="px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200"
                          >
                            −
                          </button>
                          <span className="px-3 text-sm">{qty}</span>
                          <button
                            onClick={() => increaseQty(prod._id)}
                            className="px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => handleAddToCart(prod._id, prod)}
                          className="ml-auto text-sm bg-[#A0522D] text-white px-4 py-2 rounded-md hover:bg-[#8B4513] transition"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
