import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api"; // your axios instance
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useContext(AuthContext);

  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  /**
   * FETCH CART FROM BACKEND
   */
  const fetchCart = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data } = await api.get("/cart");
      setCart(data.items || []);
      setTotalPrice(data.totalPrice || 0);
    } catch (error) {
      console.error("Fetch cart failed", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * ADD TO CART
   */
  const addToCart = async (productId, quantity = 1) => {
  try {
    const { data } = await api.post("/add", { productId, quantity }); // /api/cart/add
    setCart(data.cart.items);
    setTotalPrice(data.cart.totalPrice);
  } catch (error) {
    console.error("Add to cart failed", error.response?.data);
  }
};

const updateQuantity = async (productId, quantity) => {
  try {
    const { data } = await api.put(`/update/${productId}`, { quantity }); // /api/cart/update/:id
    setCart(data.cart.items);
    setTotalPrice(data.cart.totalPrice);
  } catch (error) {
    console.error("Update quantity failed", error.response?.data);
  }
};

const removeFromCart = async (productId) => {
  try {
    const { data } = await api.delete(`/remove/${productId}`); // /api/cart/remove/:id
    setCart(data.cart.items);
    setTotalPrice(data.cart.totalPrice);
  } catch (error) {
    console.error("Remove item failed", error.response?.data);
  }
};


  /**
   * CLEAR CART ON LOGOUT
   */
  const clearCart = () => {
    setCart([]);
    setTotalPrice(0);
  };

  /**
   * AUTO SYNC CART
   */
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      clearCart();
    }
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice,
        loading,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
