import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { user, loading: authLoading } = useContext(AuthContext);

  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  // ----------------------------
  // HELPER: Persist cart for guests
  // ----------------------------
  const saveGuestCart = (cartItems) => {
    localStorage.setItem("guestCart", JSON.stringify(cartItems));
  };

  const loadGuestCart = () => {
    const stored = localStorage.getItem("guestCart");
    return stored ? JSON.parse(stored) : [];
  };

  // ----------------------------
  // INITIAL LOAD (fix badge / refresh)
  // ----------------------------
  useEffect(() => {
    const guestCart = loadGuestCart();
    setCart(guestCart);
    setTotalPrice(
      guestCart.reduce((sum, i) => sum + i.price * i.quantity, 0)
    );
  }, []);

  // ----------------------------
  // FETCH CART
  // ----------------------------
  const fetchCart = async () => {
    if (user) {
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
    } else {
      const guestCart = loadGuestCart();
      setCart(guestCart);
      setTotalPrice(
        guestCart.reduce((acc, item) => acc + item.price * item.quantity, 0)
      );
    }
  };

  // ----------------------------
  // ADD TO CART
  // ----------------------------
  const addToCart = async (product, quantity = 1) => {
    if (user) {
      try {
        const { data } = await api.post("/cart/add", {
          productId: product._id,
          quantity
        });
        setCart(data.cart.items);
        setTotalPrice(data.cart.totalPrice);
      } catch (error) {
        console.error("Add to cart failed", error.response?.data);
      }
    } else {
      const existing = cart.find(
        (p) => p.product === product._id
      );

      let newCart;

      if (existing) {
        newCart = cart.map((p) =>
          p.product === product._id
            ? { ...p, quantity: p.quantity + quantity }
            : p
        );
      } else {
        newCart = [
          ...cart,
          {
            product: product._id,
            title: product.title,
            images: product.images,
            price: product.price,
            quantity
          }
        ];
      }

      setCart(newCart);
      setTotalPrice(
        newCart.reduce((acc, item) => acc + item.price * item.quantity, 0)
      );
      saveGuestCart(newCart);
    }
  };

  // ----------------------------
  // UPDATE QUANTITY
  // ----------------------------
  const updateQuantity = async (productId, quantity) => {
    if (user) {
      try {
        const { data } = await api.put(
          `/cart/update/${productId}`,
          { quantity }
        );
        setCart(data.cart.items);
        setTotalPrice(data.cart.totalPrice);
      } catch (error) {
        console.error("Update quantity failed", error.response?.data);
      }
    } else {
      const newCart = cart.map((p) =>
        p.product === productId ? { ...p, quantity } : p
      );

      setCart(newCart);
      setTotalPrice(
        newCart.reduce((acc, item) => acc + item.price * item.quantity, 0)
      );
      saveGuestCart(newCart);
    }
  };

  // ----------------------------
  // REMOVE ITEM
  // ----------------------------
  const removeFromCart = async (productId) => {
    if (user) {
      try {
        const { data } = await api.delete(
          `/cart/remove/${productId}`
        );
        setCart(data.cart.items);
        setTotalPrice(data.cart.totalPrice);
      } catch (error) {
        console.error("Remove item failed", error.response?.data);
      }
    } else {
      const newCart = cart.filter(
        (p) => p.product !== productId
      );

      setCart(newCart);
      setTotalPrice(
        newCart.reduce((acc, item) => acc + item.price * item.quantity, 0)
      );
      saveGuestCart(newCart);
    }
  };

  // ----------------------------
  // CLEAR CART
  // ----------------------------
  const clearCart = () => {
    setCart([]);
    setTotalPrice(0);
    if (!user) localStorage.removeItem("guestCart");
  };

  // ----------------------------
  // AUTO SYNC CART
  // ----------------------------
  useEffect(() => {
    if (authLoading) return;
    fetchCart();
  }, [user, authLoading]);

  const cartCount = cart.reduce(
  (sum, item) => sum + item.quantity,
  0
);
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
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
