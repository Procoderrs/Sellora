import React, { useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { DataContext } from "../context/DataContext";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function BestSelling() {
  const navigate = useNavigate();
  const { bestSelling } = useContext(DataContext);
  const { addToCart } = useContext(CartContext);

  const [modalProduct, setModalProduct] = useState(null);
  const [count, setCount] = useState(1);

  // Predefined category images
  const categoryImages = {
    Cakes: "/late.jpg",
    Coffee: "/cof.avif",
    Brownie: "/b.jpg",
    Cupcakes: "/cup.jpg",
    Sundae:'/sundae.jpg'
  };

  // 📝 Memoized categories grouped by parent name
  const categories = useMemo(() => {
    const map = {};
    bestSelling.forEach((prod) => {
      const parentName = prod?.category?.parent?.name;
      if (!parentName) return;
      if (!map[parentName]) map[parentName] = [];
      map[parentName].push(prod);
    });
    return map;
  }, [bestSelling]);

  if (!bestSelling.length) return null;

  const handleAddToCart = (product, qty) => {
    addToCart(product, qty);
  };

  return (
    <section className="bg-background relative overflow-hidden">
      {Object.entries(categories).map(([parentName, catProducts]) => {
        // Sort by totalSold descending and take top 2
        const topTwo = [...catProducts]
          .sort((a, b) => (b.totalSold || 0) - (a.totalSold || 0))
          .slice(0, 2);

        return (
          <div key={parentName} className="relative px-4 bg-gradient-to-br from-[#fffaf4] to-[#fff3e6] border-t-12 border-b-12 border-[#F4A460]/40">
            <div className="max-w-7xl mx-auto relative grid grid-cols-1 lg:grid-cols-2 gap-4 items-center   shadow-2xl md:p-5 rounded-3xl transition-all duration-500 hover:shadow-[0_25px_60px_rgba(160,82,45,0.25)]">
              

             
              {/* LEFT IMAGE */}
              <div className="w-full">
                <img
                  src={categoryImages[parentName] || "/placeholder.jpg"}
                  alt={parentName}
                  loading="lazy"
                  className="w-full h-[300px] sm:h-[400px] lg:min-h-[550px] object-cover  border border-[#f4a460]/30 shadow-xl"
                />
              </div>

              {/* RIGHT CONTENT */}
              <div className="flex flex-col items-center lg:items-center text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cookie text-primary font-bold mb-10">
                  Best Selling {parentName}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                  {topTwo.map((prod) => (
                    <div
                      key={prod._id}
                      className="group flex flex-col items-center bg-white/70 backdrop-blur border border-[#f4a460]/30 shadow-lg hover:shadow-2xl hover:-translate-y-2  transition-all duration-300 p-6"
                    >
                      <div className="relative w-full overflow-hidden rounded-2xl">
                        <img
                          src={prod.images?.[0] || "/placeholder.jpg"}
                          alt={prod.title}
                          loading="lazy"
                          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* VIEW BUTTON ON HOVER */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                          <button
                            onClick={() => {
                              setModalProduct({ ...prod, parentCategory: parentName });
                              setCount(1);
                              document.body.style.overflow = "hidden";
                            }}
                            className="px-6 py-2 bg-linear-to-r from-[#e6b65a] to-[#a0522d] text-white rounded-full font-semibold hover:scale-105 transition"
                          >
                            View
                          </button>
                        </div>
                      </div>

                      <p className="mt-5 text-primary font-cookie font-semibold text-2xl text-center">{prod.title}</p>
                      <p className="mt-2 text-gray-500 text-sm line-clamp-2 text-center">{prod.description}</p>
                      <p className="text-text-main font-bold text-xl mt-2 mb-4">${prod.price}</p>

                      <button
                        onClick={() => handleAddToCart(prod, 1)}
                        className="px-6 py-2 bg-accent text-white rounded-full font-semibold hover:scale-105 transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            
            </div>
          </div>
        );
      })}

      {/* MODAL */}
      {modalProduct && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black/60 px-4"
          onClick={() => {
            setModalProduct(null);
            document.body.style.overflow = "auto";
          }}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-5xl p-6 md:p-10 relative grid grid-cols-1 md:grid-cols-2 gap-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-6 text-2xl font-bold"
              onClick={() => {
                setModalProduct(null);
                document.body.style.overflow = "auto";
              }}
            >
              ×
            </button>

            {/* IMAGE */}
            <div>
              <img
                src={modalProduct.images?.[0] || "/placeholder.jpg"}
                alt={modalProduct.title}
                loading="lazy"
                className="w-full h-[350px] object-cover rounded-2xl"
              />
            </div>

            {/* INFO */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-4xl font-cookie font-bold text-primary mb-4">{modalProduct.title}</h2>
                <p className="text-2xl font-semibold text-accent mb-4">${modalProduct.price}</p>
                <p className="text-gray-600 mb-6">{modalProduct.description}</p>
                <p className="text-sm text-gray-400 italic">Category: {modalProduct.parentCategory}</p>
              </div>

              {/* QUANTITY */}
              <div className="mt-8">
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-semibold">Quantity:</span>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button onClick={() => count > 1 && setCount(count - 1)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200"><FaMinus /></button>
                    <span className="px-6">{count}</span>
                    <button onClick={() => setCount(count + 1)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200"><FaPlus /></button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleAddToCart(modalProduct, count);
                    setModalProduct(null);
                    document.body.style.overflow = "auto";
                  }}
                  className="w-full py-3 bg-gradient-to-r from-[#E6B65A] to-[#A0522D] text-white font-bold rounded-2xl shadow-lg hover:opacity-90 transition"
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