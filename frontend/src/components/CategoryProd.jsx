import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { Icon } from "@iconify/react";
import { CartContext } from "../context/CartContext";

export default function CategoryProducts() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [heroCategories, setHeroCategories] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [productQuantities, setProductQuantities] = useState({});

  // Total cart count
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodRes = await api.get("/products");
        const catRes = await api.get("/categories");

        const allProducts = prodRes.data.products || [];
        const allCategories = catRes.data.categories || [];

        // Hero categories with counts
        const heroWithCounts = [
          { name: "All", slug: "all", icon: "mdi:view-grid" },
          { name: "Cakes", slug: "cakes", icon: "mdi:cake" },
          { name: "Cupcakes", slug: "cupcakes", icon: "mdi:cupcake" },
          { name: "Coffee", slug: "coffee", icon: "mdi:coffee" },
          { name: "Brownie", slug: "brownie", icon: "mdi:cookie" },
        ].map(item => {
          if (item.slug === "all") return { ...item, count: allProducts.length };
          const parent = allCategories.find(c => c.slug === item.slug);
          if (!parent) return { ...item, count: 0 };
          const children = allCategories.filter(c => c.parent?._id === parent._id);
          const ids = [parent._id, ...children.map(c => c._id)];
          const count = allProducts.filter(p => ids.includes(p.category?._id)).length;
          return { ...item, count };
        });

        setHeroCategories(heroWithCounts);

        // All products
        if (slug === "all") {
          setCategoryName("All Products");
          setCategoryDescription("Browse all our delicious items");
          setProducts(allProducts);
          return;
        }

        // Filter by category
        const parentCategory = allCategories.find(c => c.slug === slug);
        if (!parentCategory) return;

        setCategoryName(parentCategory.name);
        setCategoryDescription(parentCategory.description || "");

        const childCategories = allCategories.filter(c => c.parent?._id === parentCategory._id);
        const categoryIds = [parentCategory._id, ...childCategories.map(c => c._id)];

        const filteredProducts = allProducts.filter(p => categoryIds.includes(p.category?._id));
        setProducts(filteredProducts);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [slug]);

  // Sorting products
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "low-high") return a.price - b.price;
    if (sortBy === "high-low") return b.price - a.price;
    return 0;
  });

  // Quantity handlers
  const increaseQty = (productId) => {
    setProductQuantities(prev => ({ ...prev, [productId]: (prev[productId] || 1) + 1 }));
  };
  const decreaseQty = (productId) => {
    setProductQuantities(prev => ({ ...prev, [productId]: Math.max((prev[productId] || 1) - 1, 1) }));
  };

  // Add to cart handler
  const handleAddToCart = (productId, product) => {
    const quantity = productQuantities[productId] || 1;
    addToCart(product, quantity);
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* CART COUNT (TOP RIGHT) */}
      <div className="fixed top-4 right-4 z-50 bg-[#A0522D] text-white px-4 py-2 rounded-full font-bold shadow-md">
        Cart: {cartCount}
      </div>

      {/* HERO SECTION */}
      <section
        className="relative w-full h-120 bg-cover bg-center flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: "url('/img-cake.png')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <h1 className="relative font-lobster text-5xl font-bold mb-4">{categoryName}</h1>
        {categoryDescription && (
          <p className="relative text-lg mb-6 text-center max-w-2xl px-4">{categoryDescription}</p>
        )}

        {/* HERO CATEGORIES */}
        <div className="relative flex gap-8 bg-white/10 px-6 py-3 rounded-xl backdrop-blur-md z-10">
          {heroCategories.map(cat => (
            <button
              key={cat.slug}
              onClick={() => navigate(`/category/${cat.slug}`)}
              className={`flex flex-col items-center transition
                ${slug === cat.slug ? "text-yellow-300" : "text-white hover:text-yellow-300"}
              `}
            >
              <Icon icon={cat.icon} width="28" />
              <span className="text-sm">{cat.name}</span>
              <span className="text-xs opacity-80">({cat.count})</span>
            </button>
          ))}
        </div>
      </section>

      {/* SORTING */}
      <section className="px-10 pt-10 flex justify-end">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border px-4 py-2 rounded-md text-sm"
        >
          <option value="default">Sort by</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </section>

      {/* PRODUCTS GRID */}
      <section className="px-10 py-10">
        {sortedProducts.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {sortedProducts.map(prod => {
              const qty = productQuantities[prod._id] || 1;
              return (
                <div key={prod._id} className="relative rounded-xl shadow-md overflow-hidden bg-white group">

                  <img
                    src={prod.images?.[0] || "/placeholder.jpg"}
                    alt={prod.title}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Quick View overlay removed from blocking */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-0 pointer-events-none" />

                  <div className="p-4 flex flex-col gap-2">
                    <h3 className="text-lg font-semibold">{prod.title}</h3>
                    <p className="text-sm text-[#3B2F2F] line-clamp-2">{prod.description}</p>
                    <p className="mt-1 font-bold">${prod.price}</p>

                    {/* Quantity + Add to Cart */}
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => decreaseQty(prod._id)} className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300">−</button>
                      <span>{qty}</span>
                      <button onClick={() => increaseQty(prod._id)} className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300">+</button>
                      <button onClick={() => handleAddToCart(prod._id, prod)} className="ml-auto bg-[#A0522D] text-white px-4 py-2 rounded-md hover:bg-[#8B4513]">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
