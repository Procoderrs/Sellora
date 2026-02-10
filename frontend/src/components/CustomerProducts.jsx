import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { CartContext } from "../context/CartContext";

export default function CategoryPreview() {
  const [categories, setCategories] = useState([]);
  const [productQuantities, setProductQuantities] = useState({});
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  // Shuffle helper for 2 random products
  const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await api.get("/categories");
        const prodRes = await api.get("/products");

        const allCategories = catRes.data.categories || [];
        const allProducts = prodRes.data.products || [];

        // Only parent categories
        const parents = allCategories.filter((c) => !c.parent);

        // Map each parent category to 2 random products
        const categoriesWithProducts = parents.map((parent) => {
          const parentProducts = allProducts.filter(
            (p) =>
              p.category?._id === parent._id ||
              p.category?.parent?._id === parent._id
          );

          const randomProducts = shuffleArray(parentProducts).slice(4, 6);

          return {
            ...parent,
            products: randomProducts,
          };
        });

        setCategories(categoriesWithProducts);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // Quantity handlers
  const increaseQty = (productId) => {
    setProductQuantities(prev => ({ ...prev, [productId]: (prev[productId] || 1) + 1 }));
  };
  const decreaseQty = (productId) => {
    setProductQuantities(prev => ({ ...prev, [productId]: Math.max((prev[productId] || 1) - 1, 1) }));
  };

  const handleAddToCart = (productId, product) => {
    const quantity = productQuantities[productId] || 1;
    addToCart(product, quantity);
  };

  if (!categories.length) return null;

  return (
    <section className="bg-[#F5F5DC] py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-[#8B4513] mb-12 text-center">
          Our Picks
        </h1>

        {/* Categories */}
        {categories.map((cat) => (
          <div key={cat._id} className="mb-16">

            {/* Category Title */}
            <h2
              className="text-2xl md:text-3xl font-playfair font-bold text-[#5C4033] mb-6 cursor-pointer hover:text-[#A0522D] transition"
              onClick={() => navigate(`/category/${cat.slug}`)}
            >
              {cat.name}
            </h2>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {cat.products.map((prod) => {
                const qty = productQuantities[prod._id] || 1;
                return (
                  <div
                    key={prod._id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-transform transform hover:-translate-y-1"
                  >
                    {/* Product Image */}
                    <img
                      src={prod.images?.[0] || "/placeholder.jpg"}
                      alt={prod.title}
                      className="w-full h-64 object-cover"
                    />

                    {/* Title, Price & Add to Cart */}
                    <div className="p-4 flex flex-col gap-2">
                      <h3 className="font-playfair font-semibold text-xl text-[#5C4033]">
                        {prod.title}
                      </h3>
                      <p className="text-lg text-[#8B4513] font-bold">${prod.price.toFixed(2)}</p>

                      {/* Quantity + Add to Cart */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => decreaseQty(prod._id)}
                          className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                        >−</button>
                        <span>{qty}</span>
                        <button
                          onClick={() => increaseQty(prod._id)}
                          className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                        >+</button>
                        <button
                          onClick={() => handleAddToCart(prod._id, prod)}
                          className="ml-auto bg-[#A0522D] text-white px-4 py-2 rounded-md hover:bg-[#8B4513] transition"
                        >
                          Add to Cart
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
