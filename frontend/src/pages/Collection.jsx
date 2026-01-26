import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Collection() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedParent, setSelectedParent] = useState(null);
  const navigate = useNavigate();

  const slides_1 = ["/img-4.webp", "/img-6.webp", "/img-5.webp"];

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          api.get("/categories"),
          api.get("/products"),
        ]);

        setCategories(catRes.data.categories || []);
        setProducts(prodRes.data.products || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  /* ================= HELPERS ================= */
  const parentCategories = categories.filter(c => !c.parent);

  const getSubcategories = parentId =>
    categories.filter(c => c.parent?._id === parentId);

  // 🔴 FIX: match by category _id, NOT slug
  const getFirstProduct = subCatId =>
    products.find(p => p.category?._id === subCatId);

  /* ================= RENDER ================= */
  return (
    <section className="bg-[#F5F5DC] px-10 py-16">
      <h2 className="text-4xl font-serif font-bold text-[#3B2F2F] mb-12">
        Shop by Category
      </h2>

      {/* PARENT CATEGORIES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-16">
        {parentCategories.map((parent, index) => {
          const image = slides_1[index] || "/placeholder.jpg";
          const isActive = selectedParent === parent._id;

          return (
            <div
              key={parent._id}
              onClick={() =>
                setSelectedParent(isActive ? null : parent._id)
              }
              className={`relative cursor-pointer rounded-2xl overflow-hidden
                shadow-lg transition-all duration-300
                ${isActive ? "ring-4 ring-[#A0522D]" : "hover:shadow-2xl"}
              `}
            >
              <img
                src={image}
                alt={parent.name}
                className="w-full h-64 object-cover transition-transform duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-8">
                <h3 className="text-2xl font-serif font-bold text-[#F5F5DC]">
                  {parent.name}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* SUBCATEGORIES */}
      {selectedParent && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {getSubcategories(selectedParent).map(subcat => {
            const firstProd = getFirstProduct(subcat._id);

            return (
              <div
                key={subcat._id}
                onClick={() => navigate(`/category/${subcat.slug}`)}
                className="rounded-xl border-2 border-[#F4A460] shadow-md hover:shadow-xl transition"
              >
                <div className="relative h-64 w-full overflow-hidden rounded-lg group">
                  <img
                    src={firstProd?.images?.[0] || "/placeholder.jpg"}
                    alt={subcat.name}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-[#F5F5DC] text-xl font-semibold text-center">
                      {subcat.name}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
