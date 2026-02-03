import React, { useState,useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function ProductDetail() {
  const { state } = useLocation();
  const product = state?.product;
  const categoryName = state?.categoryName;


  const {addToCart}=useContext(CartContext)
  console.log(addToCart);
  const navigate=useNavigate();
  const [selectedImage, setSelectedImage] = useState(
    product?.images?.[0] || ""
  );
  const [count, setCount] = useState(1);

const handleAddToCart = () => {
  addToCart(product, count);
  navigate("/cart");
};

  if (!product) return <p>Product not found</p>;

  return (
   <section className="px-4 md:px-10 py-16 bg-[#F5F5DC] min-h-screen">
  <div className="border rounded-2xl bg-white shadow-md p-4 md:p-8">

    <div className="flex flex-col md:grid md:grid-cols-[10%_40%_40%] gap-6 md:gap-10 items-start">

      {/* LEFT: Thumbnails */}
      {/* MOBILE: horizontal scroll above main image */}
      <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible mb-4 md:mb-0">
        {product.images?.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setSelectedImage(img)}
            className={`w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg cursor-pointer border-2 flex-shrink-0
              ${
                selectedImage === img
                  ? "border-[#A0522D]"
                  : "border-gray-200 hover:border-[#A0522D]"
              }`}
          />
        ))}
      </div>

      {/* CENTER: Main Image */}
      <div className="border rounded-xl p-2 md:p-4 w-full">
        <img
          src={selectedImage}
          alt={product.title}
          className="w-full h-[300px] sm:h-[400px] md:h-[420px] object-cover rounded-lg"
        />
      </div>

      {/* RIGHT: Product Info */}
      <div className="border rounded-xl p-4 md:p-6 w-full md:w-auto flex-1 space-y-5">
        <p className="text-sm text-gray-500 uppercase tracking-wide">
          {categoryName}
        </p>

        <h1 className="text-2xl sm:text-3xl font-bold">{product.title}</h1>

        <p className="text-xl sm:text-2xl font-semibold text-[#A0522D]">
          ${product.price}
        </p>

        <hr />

        {/* Quantity Selector */}
        <div className="flex items-center gap-4">
          <span className="font-medium">Quantity</span>
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              onClick={() => count > 1 && setCount(count - 1)}
              className="px-4 py-2 border-r hover:bg-gray-100"
            >
              −
            </button>
            <span className="px-6">{count}</span>
            <button
              onClick={() => setCount(count + 1)}
              className="px-4 py-2 border-l hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#A0522D] text-white py-3 rounded-lg font-semibold hover:bg-[#8B4513] transition"
        >
          Add to Cart
        </button>

        {/* Stock Info */}
        <p className="text-gray-600 inline p-2 rounded text-xs bg-[#F5F5DC]">
          {product.stock} items in Stock
        </p>
      </div>
    </div>
  </div>
</section>

  );
}
