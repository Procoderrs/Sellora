import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export const useCart = () => {
  return useContext(CartContext);
};

export function CartProvider({ children }) {
  const { user, loading: authLoading } = useAuth();

  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const saveGuestCart = (items) =>
    localStorage.setItem("guestCart", JSON.stringify(items));

  const loadGuestCart = () =>
    JSON.parse(localStorage.getItem("guestCart") || "[]");

  useEffect(() => {
    const guestCart = loadGuestCart();
    setCart(guestCart);
    setTotalPrice(
      guestCart.reduce((sum, i) => sum + i.price * i.quantity, 0)
    );
  }, []);

  const fetchCart = async () => {
    if (user) {
      try {
        setLoading(true);
        const { data } = await api.get("/cart");
        setCart(data.items || []);
        setTotalPrice(data.totalPrice || 0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      const guestCart = loadGuestCart();
      setCart(guestCart);
      setTotalPrice(
        guestCart.reduce((sum, i) => sum + i.price * i.quantity, 0)
      );
    }
  };

  useEffect(() => {
    if (!authLoading) fetchCart();
  }, [user, authLoading]);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice,
        loading,
        fetchCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
