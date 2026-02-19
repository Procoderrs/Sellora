import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { customer, loading: authLoading } = useContext(AuthContext);

  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMerged, setHasMerged] = useState(false);

  /* ---------------- GUEST HELPERS ---------------- */
  const saveGuestCart = (cartItems) => {
    localStorage.setItem("guestCart", JSON.stringify(cartItems));
  };

  const loadGuestCart = () => {
    const stored = localStorage.getItem("guestCart");
    return stored ? JSON.parse(stored) : [];
  };

  /* ---------------- FETCH CART ---------------- */
  const fetchCart = async () => {
    if (!customer) {
      const guestCart = loadGuestCart();
      setCart(guestCart);
      setTotalPrice(
        guestCart.reduce((sum, item) => sum + item.price * item.quantity, 0)
      );
      return;
    }

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

  /* ---------------- MERGE GUEST CART ---------------- */
  const mergeGuestCart = async () => {
    const guestCart = loadGuestCart();
    if (!guestCart.length) return;

    try {
      const { data } = await api.post("/cart/merge", {
        items: guestCart,
      });

      localStorage.removeItem("guestCart"); // clear guest cart
      setCart(data.cart.items); // update UI instantly
      setTotalPrice(data.cart.totalPrice);
    } catch (err) {
      console.error("Cart merge failed", err);
    }
  };

  /* ---------------- ADD TO CART ---------------- */
  const addToCart = async (product, quantity = 1) => {
    if (customer) {
      try {
        const { data } = await api.post("/cart/add", {
          productId: product._id,
          quantity,
        });
        setCart(data.cart.items);
        setTotalPrice(data.cart.totalPrice);
      } catch (err) {
        console.error("Add to cart failed", err);
      }
    } else {
      const existing = cart.find((p) => p.product === product._id);
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
            quantity,
          },
        ];
      }
      saveGuestCart(newCart);
      setCart(newCart);
      setTotalPrice(newCart.reduce((sum, item) => sum + item.price * item.quantity, 0));
    }
  };

  /* ---------------- UPDATE QUANTITY ---------------- */
  const updateQuantity = async (productId, quantity) => {
    if (customer) {
      const { data } = await api.put(`/cart/update/${productId}`, { quantity });
      setCart(data.cart.items);
      setTotalPrice(data.cart.totalPrice);
    } else {
      const newCart = cart.map((p) =>
        p.product === productId ? { ...p, quantity } : p
      );
      saveGuestCart(newCart);
      setCart(newCart);
      setTotalPrice(newCart.reduce((sum, item) => sum + item.price * item.quantity, 0));
    }
  };

  /* ---------------- REMOVE ITEM ---------------- */
  const removeFromCart = async (productId) => {
    if (customer) {
      const { data } = await api.delete(`/cart/remove/${productId}`);
      setCart(data.cart.items);
      setTotalPrice(data.cart.totalPrice);
    } else {
      const newCart = cart.filter((p) => p.product !== productId);
      saveGuestCart(newCart);
      setCart(newCart);
      setTotalPrice(newCart.reduce((sum, item) => sum + item.price * item.quantity, 0));
    }
  };

  /* ---------------- AUTH SYNC ---------------- */
  useEffect(() => {
    if (authLoading) return;

    const syncCart = async () => {
      if (customer && !hasMerged) {
        await mergeGuestCart(); // merge guest cart into user cart once
        setHasMerged(true);
      }
      await fetchCart(); // fetch latest cart from server
    };

    syncCart();
  }, [customer, authLoading]);

  /* ---------------- DERIVED STATE ---------------- */
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        fetchCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
