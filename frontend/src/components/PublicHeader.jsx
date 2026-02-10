import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

import TopCrousel from "./TopCrousel";
import { RiUser3Line, RiShoppingBagLine, RiArrowDownSLine } from "@remixicon/react";
import api from "../api/api";
/* import { RiCake2Line, RiCoffeeLine, RiCookieLine, RiCupLine } from "@remixicon/react"; // Remix icons
 */
export default function PublicHeader() {
  const { user, logout,  } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCartClick = () => {
    if (!user) navigate("/login");
    else navigate("/cart");
  };

  // Fetch categories and products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await api.get("/categories");
        const prodRes = await api.get("/products");

        const allCategories = catRes.data.categories || [];
        const allProducts = prodRes.data.products || [];

        setProducts(allProducts);

        // Only parent categories
        const parents = allCategories.filter((c) => !c.parent);

        // Map each parent category to first product + total count
        const categoriesWithInfo = parents.map((parent) => {
          // Filter products belonging to this category or its children
          const parentProducts = allProducts.filter(
            (p) => p.category?._id === parent._id || p.category?.parent?._id === parent._id
          );

          return {
            ...parent,
            productCount: parentProducts.length,
            image: parentProducts[0]?.images?.[0] || "/placeholder.jpg",
          };
        });

        setCategories(categoriesWithInfo);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <header className="bg-background font-playfair shadow-md">
      <TopCrousel />

      <div className="sticky top-0 z-50 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center">

          {/* MOBILE */}
          <div className="flex w-full items-center justify-between md:hidden">
            <button onClick={() => setMenuOpen(true)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <Link to="/" className="text-3xl font-logo font-black text-primary">Cake<span className="text-danger">🧁</span>let</Link>

            <div onClick={handleCartClick} className="relative cursor-pointer">
              <RiShoppingBagLine size={22} />
              {cartCount?.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 flex items-center justify-center text-xs bg-danger text-white rounded-full px-1">
                  {cart.length > 99 ? "99+" : cart.length}
                </span>
              )}
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden md:grid grid-cols-3 items-center w-full">

            {/* LEFT MENU */}
            <nav className="flex gap-8 text-text-main font-medium relative">
              <Link to="/" className="hover:text-primary transition">
    Home
  </Link>


              {["Menu", "About"].map((item) => (
                <div key={item} className="relative">
                  {item === "Menu" ? (
                    <>
                      <button
                        className="flex items-center gap-1 hover:text-primary transition"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                      >
                        {item} <RiArrowDownSLine size={18} />
                      </button>

                      {dropdownOpen && (
  <div className="absolute top-full -left-16 mt-2 bg-background shadow-lg rounded-xl w-[50rem] p-4 z-50">
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((cat) => (
        <Link
          key={cat._id}
          to={`/category/${cat.slug}`}
          className="flex flex-col items-center bg-gray-50 p-4 rounded-xl hover:shadow-lg transition cursor-pointer"
          onClick={() => setDropdownOpen(false)}
        >
          {/* IMAGE */}
          <img
            src={cat.image}
            alt={cat.name}
            className="w-36 h-36 object-cover rounded-lg mb-3"
          />

          {/* CATEGORY NAME */}
          <p className="font-semibold text-text-main text-center">{cat.name}</p>

          {/* PRODUCT COUNT */}
          <p className="text-xs text-gray-500">{cat.productCount} products</p>
        </Link>
      ))}
    </div>
  </div>
)}

                    </>
                  ) : (
                    <Link to={`/${item.toLowerCase()}`} className="hover:text-primary transition">{item}</Link>
                  )}
                </div>
              ))}
            </nav>

            {/* CENTER LOGO */}
            <div className="flex justify-center">
              <Link to="/" className="text-4xl font-logo font-bold text-primary tracking-wide">Cake<span className="text-danger">🧁</span>let</Link>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex justify-end items-center gap-4">
              {!user ? (
                <Link to="/login" className="px-3 py-1 rounded-lg hover:bg-accent/40 transition text-sm">Login</Link>
              ) : (
                <div className="relative">
                  <button onClick={() => setProfileOpen(!profileOpen)} className="p-2 rounded-lg">
                    <RiUser3Line size={20} />
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg overflow-hidden text-sm">
                      <div className="px-3 py-2 font-semibold text-text-main">{user.name}</div>
                      <hr />
                      <button className="w-full text-left px-3 py-2 hover:bg-background" onClick={() => navigate("/my-orders")}>My Orders</button>
                      <button className="w-full text-left px-3 py-2 text-danger hover:bg-danger/10" onClick={handleLogout}>Logout</button>
                    </div>
                  )}
                </div>
              )}

              <div onClick={handleCartClick} className="relative cursor-pointer">
  <RiShoppingBagLine size={22} />
  {cartCount > 0 && (
    <span className="absolute -top-1 -right-1 min-w-[16px] h-4 flex items-center justify-center text-xs bg-danger text-white rounded-full px-1">
      {cartCount > 99 ? "99+" : cartCount}
    </span>
  )}
</div>

            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
