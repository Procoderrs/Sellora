import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function ShoppingCart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  console.log(cart);
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!cart.length) {
    return (
      <section className="px-10 py-16 bg-[#F5F5DC] min-h-screen">
        <div className="max-w-4xl mx-auto bg-white border rounded-xl p-10 text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-[#A0522D] text-white px-6 py-3 rounded-lg"
          >
            Continue Shopping
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="px-10 py-16 bg-[#F5F5DC] min-h-screen">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[70%_30%] gap-10">

        {/* LEFT: CART ITEMS */}
        <div className="bg-white border rounded-2xl shadow-sm p-6 space-y-6">
          <h2 className="text-2xl font-bold border-b pb-4">
            Shopping Cart
          </h2>

          {cart.map(item => (
            <div
              key={item._id}
              className="grid grid-cols-[120px_1fr_150px] gap-6 border-b pb-6"
            >
              {/* IMAGE */}
              <img
  src={item.images?.[0] || "/placeholder.jpg"} // first image
  alt={item.title}
  className="w-full h-32 object-cover rounded-lg border"
/>

              {/* INFO */}
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  ${item.price} each
                </p>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>

              {/* QUANTITY + PRICE */}
              <div className="flex flex-col items-end justify-between">
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button
                    onClick={() =>
                      item.quantity > 1 &&
                      updateQuantity(item._id, item.quantity - 1)
                    }
                    className="px-3 py-1 border-r hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item._id, item.quantity + 1)
                    }
                    className="px-3 py-1 border-l hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <p className="font-semibold text-[#A0522D]">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: SUMMARY */}
        <div className="bg-white border rounded-2xl shadow-sm p-6 h-fit">
          <h3 className="text-xl font-bold mb-4 border-b pb-3">
            Order Summary
          </h3>

          <div className="flex justify-between mb-3">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-lg font-bold mb-6">
            <span>Total</span>
            <span className="text-[#A0522D]">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <button onClick={()=>navigate('/checkout/shipping')} className="w-full bg-[#A0522D] text-white py-3 rounded-lg font-semibold hover:bg-[#8B4513] transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
}
