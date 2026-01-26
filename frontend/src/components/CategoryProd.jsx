import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

  export default function CategoryProducts() {
  const { slug } = useParams(); // 🔹 id → slug
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const prodRes = await api.get("/products");
        const catRes = await api.get("/categories");

        // 🔹 find category by slug (not _id)
        const subcategory = catRes.data.categories.find(
          (c) => c.slug === slug
        );

        setCategoryName(subcategory?.name || "");
        setCategoryDescription(subcategory?.description || "");

        // 🔹 filter products by category.slug
        const filtered = prodRes.data.products.filter(
          (p) => p.category?.slug === slug
        );

        setProducts(filtered);
        console.log(filtered);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [slug]);

  return (
    <section className="px-10 py-16 bg-[#F5F5DC] min-h-screen">
      <h2 className="text-4xl font-bold mb-2">{categoryName}</h2>
      {categoryDescription && (
        <p className="mb-10 text-[#3B2F2F]">{categoryDescription}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {products.map((prod) => (
          <div
            key={prod._id}
            className="relative group border rounded-xl shadow-md overflow-hidden bg-white"
          >
            {/* Image */}
            <img
              src={prod.images?.[0] || "/placeholder.jpg"}
              alt={prod.title}
              className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300" />

            {/* Quick View Button */}
            <button
              onClick={() =>
                navigate(`/product/${prod.slug}`, {
                  state: { product: prod, categoryName: categoryName },
                })
              }
              className="
                absolute left-1/2 bottom-6 -translate-x-1/2
                translate-y-10 group-hover:translate-y-0
                opacity-0 group-hover:opacity-100
                transition-all duration-300
                bg-[#A0522D] text-white px-6 py-2 rounded-full
                hover:bg-[#8B4513]
              "
            >
              Quick View
            </button>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{prod.title}</h3>
              <p className="text-sm text-[#3B2F2F] line-clamp-2">
                {prod.description}
              </p>
              <p className="mt-2 font-bold">${prod.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
