import React, { useState,useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function ProductDetail() {
  const { state } = useLocation();
  const product = state?.product;
  const categoryName = state?.categoryName;


  const {user}=useContext(AuthContext);
  const {addToCart}=useContext(CartContext)
  console.log(addToCart);
  const navigate=useNavigate();
  const [selectedImage, setSelectedImage] = useState(
    product?.images?.[0] || ""
  );
  const [count, setCount] = useState(1);

const handleAddToCart = () => {
  if (!user) {
    navigate("/"); // or "/login"
    return;
  }
  addToCart(product._id, 1);
  navigate("/cart");
};

  if (!product) return <p>Product not found</p>;

  return (
    <section className="px-10 py-16 bg-[#F5F5DC] min-h-screen">
      <div className="border rounded-2xl bg-white shadow-md p-8">

        <div className="grid md:grid-cols-[10%_40%_40%] gap-10 items-start">

          {/* LEFT: Thumbnails */}
          <div className="flex flex-col gap-4">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setSelectedImage(img)}
                className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 transition
                  ${
                    selectedImage === img
                      ? "border-[#A0522D]"
                      : "border-gray-200 hover:border-[#A0522D]"
                  }
                `}
              />
            ))}
          </div>

          {/* CENTER: Main Image */}
          <div className="border rounded-xl p-4">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-[420px] object-cover rounded-lg"
            />
          </div>

          {/* RIGHT: Product Info */}
          <div className="border rounded-xl p-6 space-y-5">

            {/* Category */}
            <p className="text-sm text-gray-500 uppercase tracking-wide">
              {categoryName}
            </p>

            {/* Title */}
            <h1 className="text-3xl font-bold">{product.title}</h1>

            {/* Price */}
            <p className="text-2xl font-semibold text-[#A0522D]">
              ${product.price}
            </p>

            {/* Divider */}
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
            <button onClick={handleAddToCart}
              className="w-full bg-[#A0522D] text-white py-3 rounded-lg font-semibold hover:bg-[#8B4513] transition"
            >
              Add to Cart
            </button>

            {/* Optional Info */}
            {/* <p className="text-sm text-gray-500">
              Free delivery on orders above $50
            </p> */}
            
            <p className="text-gray-600 inline p-2 rounded text-xs bg-[#F5F5DC]"> {product.stock} items in Stock</p>
          </div>
        </div>
      </div>
    </section>
  );
}
