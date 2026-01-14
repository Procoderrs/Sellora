import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function CategoriesWithSubproducts() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedParent, setSelectedParent] = useState(null);

  const slides_1 = ["/img-4.webp", "/img-6.webp", "/img-5.webp"];

  useEffect(() => {
    api.get("/admin/categories").then(res =>

      setCategories(res.data.categories || [])
      
      
    );
    api.get("/admin/products").then(res =>
      setProducts(res.data.products || [])
      
    );
  }, []);

  const parentCategories = categories.filter((c) => !c.parent);
  const getSubcategories = (parentId) =>
    categories.filter((c) => c.parent?._id === parentId);
//console.log("SUBCATEGORIES FOR:", parentId, subs);


  const getFirstProduct = (subCatId) =>
    products.find((p) => p.category?._id === subCatId);

  return (
    <section className="bg-[#F5F5DC] px-10 py-16">
      <h2 className="text-4xl font-serif font-bold text-[#3B2F2F] mb-12">
        Shop by Category
      </h2>

      {/* =========================
          Parent Categories
      ========================= */}
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
                className="w-full h-64 object-cover object-top
                           transition-transform duration-700
                           hover:scale-105"
              />

              <div
                className={`absolute inset-0 bg-gradient-to-t
                from-[#3B2F2F]/70 via-[#3B2F2F]/30 to-transparent
                flex items-end justify-center pb-8
                transition-opacity duration-300
                ${isActive ? "opacity-100" : "opacity-90 hover:opacity-100"}`}
              >
                <h3 className="text-2xl font-serif font-bold text-[#F5F5DC]">
                  {parent.name}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================
          Subcategories (HIGHLIGHTED)
      ========================= */}
      {selectedParent && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {getSubcategories(selectedParent).map((subcat) => {
            const firstProd = getFirstProduct(subcat._id);

            return (
              <div
                key={subcat._id}
                className=" rounded-xl 
                  border-2 border-[#F4A460]
                  shadow-md hover:shadow-xl p-1 bg-white
                  transform hover:-translate-y-1
                  transition-all duration-300"
              >
                {/* IMAGE */}
                <div className="relative h-72 w-full  rounded-lg overflow-hidden group">
                  <img
                    src={firstProd?.images?.[0] || "/placeholder.jpg"}
                    alt={subcat.name}
                    className="w-full h-full object-cover
                               transition duration-500
                               group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/25
                                  opacity-0 group-hover:opacity-100
                                  transition flex items-center justify-center">
                    <span className="text-[#F5F5DC] font-semibold tracking-wide">
                      View Collection
                    </span>
                  </div>
                </div>

                {/* TEXT */}
                <h4 className="mt-4 text-lg font-semibold text-[#3B2F2F]">
                  {subcat.name}
                </h4>

                {firstProd && (
                  <p className="mt-1 text-sm text-[#A0522D]">
                    {firstProd.title}
                  </p>
                )}

                {firstProd && (
                  <p className="mt-2 text-lg font-bold text-[#A0522D]">
                    ${firstProd.price}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
