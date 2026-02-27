import React, { useEffect, useState, useContext } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function BestSelling() {
  const [products, setProducts] = useState([]);
  const [modalProduct, setModalProduct] = useState(null);
  const [productQuantities, setProductQuantities] = useState({});
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const categoryImages = {
    Cakes: "/late.jpg",
    Coffee: "/cof.avif",
    Brownie: "/b.jpg",
    Cupcakes: "/cup.jpg",
  };

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

  // Group by parent category
  const categories = {};
  products.forEach((prod) => {
    const parentName = prod?.category?.parent?.name;
    if (!parentName) return;
    if (!categories[parentName]) categories[parentName] = [];
    categories[parentName].push(prod);
  });

  // Quantity handlers
  const increaseQty = (id) =>
    setProductQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  const decreaseQty = (id) =>
    setProductQuantities((prev) => ({ ...prev, [id]: Math.max((prev[id] || 1) - 1, 1) }));

  const handleAddToCart = (product, qty) => {
    addToCart(product, qty);
  };

  return (
    <section className="bg-background relative">
      {Object.entries(categories).map(([parentName, catProducts]) => {
        const sorted = [...catProducts].sort(
          (a, b) => (b.totalSold || 0) - (a.totalSold || 0)
        );
        const topTwo = sorted.slice(0, 2);

        return (
          <div key={parentName} className="relative px-4">
            {/* Decorative background */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <img
                src="/blobbb.svg"
                alt="decorative background"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-2 min-h-screen gap-8">
              {/* LEFT: Category Image */}
              <div className="h-screen">
                <img
                  src={categoryImages[parentName] || "/placeholder.jpg"}
                  alt={parentName}
                  className="w-full py-3 h-full object-cover rounded-2xl shadow-lg"
                />
              </div>

              {/* RIGHT: Product Cards */}
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-4xl md:text-5xl font-cookie text-primary font-bold mb-4">
                  Best Selling {parentName}
                </h2>

                <div className="flex w-full gap-6">
                  {topTwo.map((prod) => {
                    const qty = productQuantities[prod._id] || 1;

                    return (
                      <div
                        key={prod._id}
                        className="relative group flex flex-col items-center bg-white rounded-2xl shadow-lg p-4"
                      >
                        <img
                          src={prod.images?.[0] || "/placeholder.jpg"}
                          alt={prod.title}
                          className="rounded-2xl shadow-md object-cover w-full h-64 cursor-pointer transition-transform duration-300 group-hover:scale-105"
                        />

                        <p className="mt-4 text-primary font-semibold text-lg text-center">
                          {prod.title}
                        </p>
                        <p className="mt-2 text-gray-500 text-sm text-center">
                          {prod.description}
                        </p>
                        <p className="text-text-main font-body text-sm text-center mb-2">
                          ${prod.price}
                        </p>

                        {/* Quantity + Add to Cart */}
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            className="px-3 py-1 bg-gray-200 rounded-full"
                            onClick={() => decreaseQty(prod._id)}
                          >
                            <FaMinus />
                          </button>
                          <span>{qty}</span>
                          <button
                            className="px-3 py-1 bg-gray-200 rounded-full"
                            onClick={() => increaseQty(prod._id)}
                          >
                            <FaPlus />
                          </button>

                          <button
                            onClick={() => handleAddToCart(prod, qty)}
                            className="px-6 py-2 bg-accent text-hero-text rounded-full font-semibold hover:scale-105 transition"
                          >
                            Add to Cart
                          </button>
                        </div>

                        {/* Hover View button */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition">
                          <button
                            onClick={() => {
                              setModalProduct({ ...prod, parentCategory: parentName });
                              setProductQuantities((prev) => ({
                                ...prev,
                                [prod._id]: 1,
                              }));
                              document.body.style.overflow = "hidden";
                            }}
                            className="px-6 py-3 bg-primary text-hero-text rounded-full font-semibold hover:scale-105 transition"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Modal */}
      {modalProduct && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 overflow-hidden"
          onClick={() => {
            setModalProduct(null);
            document.body.style.overflow = "auto";
          }}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-4xl w-full relative flex flex-col md:flex-row gap-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-xl font-bold"
              onClick={() => {
                setModalProduct(null);
                document.body.style.overflow = "auto";
              }}
            >
              ×
            </button>

            {/* Left: Main Image */}
            <div className="flex-1 border rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-shadow">
              <img
                src={modalProduct.images?.[0] || "/placeholder.jpg"}
                alt={modalProduct.title}
                className="w-full h-[350px] sm:h-[400px] object-cover object-center rounded-2xl transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Right: Product Info */}
            <div className="flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-cookie font-bold text-[#3B2F2F]">
                  {modalProduct.title}
                </h2>
                <p className="text-2xl font-semibold text-[#A0522D]">
                  ${modalProduct.price}
                </p>
                <p className="text-lg font-semibold text-gray-400">
                  {modalProduct.description}
                </p>
                <p className="text-sm text-gray-400 italic">
                  Category: {modalProduct.parentCategory}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-gray-700">Quantity:</span>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      onClick={() => count > 1 && setCount(count - 1)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <FaMinus className="text-sm" />
                    </button>
                    <span className="px-6 font-medium">{count}</span>
                    <button
                      onClick={() => setCount(count + 1)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <FaPlus className="text-sm" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleAddToCart(modalProduct, count);
                    setModalProduct(null);
                    document.body.style.overflow = "auto";
                  }}
                  className="w-full py-4 bg-gradient-to-r from-[#E6B65A] to-[#A0522D] text-white font-bold rounded-2xl shadow-lg hover:from-[#A0522D] hover:to-[#E6B65A] transition-all duration-500"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}