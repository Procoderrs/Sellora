import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FaPlus, FaMinus, FaFire } from "react-icons/fa";

export default function ProductDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  // Grab product and parentCategory from location.state
  const { product, parentCategory } = location.state || {};
  console.log(product);
  const imagesArray = product ? product.images || [product.image] : [];

  const [selectedImage, setSelectedImage] = useState(imagesArray[0] || "");
  const [count, setCount] = useState(1);

  if (!product) {
    return (
      <p className="text-center mt-20 text-gray-500">
        Product not found.
      </p>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, count);
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-[#FDF6F0]">

      {/* ----- Hero Header ----- */}
      <section
        className="relative h-[220px] flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: "url('/img-cake.png')", backgroundSize: "cover" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative text-white px-4">
          <p className="text-5xl  font-cookie">{product.title}</p>
          
          
          
        </div>
      </section>

      {/* ----- Product Details ----- */}
      <section className="max-w-6xl mx-auto mt-10 pb-5 px-4 md:px-16 flex flex-col md:flex-row gap-10">
        
        {/* Left: Thumbnails */}
       {/*  <div className="flex flex-col gap-4 md:w-1/6">
          {imagesArray.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${product.name} ${idx + 1}`}
              onClick={() => setSelectedImage(img)}
              className={`w-full h-20 object-cover rounded-lg cursor-pointer border-2 transition-all
                ${selectedImage === img ? "border-[#A0522D]" : "border-gray-200 hover:border-[#A0522D]"}
              `}
            />
          ))}
        </div>
 */}
        {/* Center: Main Image */}
        <div className="flex-1 border rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-shadow">
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-[350px] sm:h-[350px] object-cover object-center rounded-2xl transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Right: Product Info */}
        <div className="flex-1 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-cookie font-bold text-[#3B2F2F]">{product.title}</h2>
            <p className="text-2xl font-semibold text-[#A0522D]">${product.price}</p>
            <p className="text-lg font-semibold text-gray-400">{product.description}</p>

            {parentCategory && (
              <p className="text-sm text-gray-400 italic">Category: {parentCategory}</p>
            )}
            
          </div>

          {/* Quantity & Add to Cart */}
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
              onClick={handleAddToCart}
              className="w-full py-4 bg-gradient-to-r from-[#E6B65A] to-[#A0522D] text-white font-bold rounded-2xl shadow-lg hover:from-[#A0522D] hover:to-[#E6B65A] transition-all duration-500"
            >
              Add to Cart
            </button>
          </div>
        </div>

      </section>
    </div>
  );
}
