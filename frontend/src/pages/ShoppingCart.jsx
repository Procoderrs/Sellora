import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function ShoppingCart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!user) {
      navigate("/login", {
        state: { from: "/checkout/shipping" }
      });
    } else {
      navigate("/checkout/shipping");
    }
  };

  /* ================= EMPTY CART ================= */
  if (!cart.length) {
    return (
      <section className="px-4 sm:px-10 py-16 bg-[#F5F5DC] min-h-screen">
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

  /* ================= CART ================= */
  return (
    <section className="px-4 sm:px-10 py-16 pb-28 bg-[#F5F5DC] min-h-screen">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[70%_30%] gap-10">

        {/* LEFT — CART ITEMS */}
        <div className="bg-white border rounded-2xl shadow-sm p-6 space-y-6">
          <h2 className="text-2xl font-bold border-b pb-4">
            Shopping Cart
          </h2>

          {cart.map(item => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row md:grid
                         md:grid-cols-[120px_1fr_150px]
                         gap-6 border-b pb-6"
            >
              {/* IMAGE */}
              <img
                src={item.images?.[0] || "/placeholder.jpg"}
                alt={item.title}
                className="w-full sm:w-32 h-40 sm:h-32 object-cover rounded-lg border"
              />

              {/* INFO */}
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    ${item.price} each
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.product)}
                  className="text-sm text-red-600 hover:underline self-start"
                >
                  Remove
                </button>
              </div>

              {/* QUANTITY + PRICE */}
              <div className="flex flex-row sm:flex-col justify-between sm:items-end gap-4">
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button
                    onClick={() =>
                      item.quantity > 1 &&
                      updateQuantity(item.product, item.quantity - 1)
                    }
                    className="px-3 py-1 border-r hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product, item.quantity + 1)
                    }
                    className="px-3 py-1 border-l hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <p className="font-semibold text-[#A0522D] text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT — ORDER SUMMARY (DESKTOP) */}
        <div className="bg-white border rounded-2xl shadow-sm p-6 h-fit md:sticky md:top-24">
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

          {/* DESKTOP CHECKOUT */}
          <button
            onClick={handleCheckout}
            className="hidden md:block w-full bg-[#A0522D]
                       text-white py-3 rounded-lg font-semibold
                       hover:bg-[#8B4513] transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* MOBILE FIXED CHECKOUT BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">
        <button
          onClick={handleCheckout}
          className="w-full bg-[#A0522D] text-white py-3 rounded-lg font-semibold"
        >
          Checkout · ${subtotal.toFixed(2)}
        </button>
      </div>
    </section>
  );
}
