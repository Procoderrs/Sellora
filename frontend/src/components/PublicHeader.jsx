import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

import TopCrousel from "./TopCrousel";
import {
  RiUser3Line,
  RiShoppingBagLine,
  RiArrowDownSLine,
} from "@remixicon/react";

import api from "../api/api";

export default function PublicHeader() {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [categories, setCategories] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await api.get("/categories");
        const prodRes = await api.get("/products");

        const allCategories = catRes.data.categories || [];
        const allProducts = prodRes.data.products || [];

        const parents = allCategories.filter((c) => !c.parent);

        const categoriesWithInfo = parents.map((parent) => {
          const parentProducts = allProducts.filter(
            (p) =>
              p.category?._id === parent._id ||
              p.category?.parent?._id === parent._id
          );

          return {
            ...parent,
            productCount: parentProducts.length,
            image:
              parentProducts[0]?.images?.[0] || "/placeholder.jpg",
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

          {/* MOBILE HEADER */}
          <div className="flex w-full items-center justify-between md:hidden">
            <button onClick={() => setMenuOpen(true)}>
              <svg
                className="w-6 h-6 text-text-main"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <Link
              to="/"
              className="text-3xl font-logo font-black text-primary"
            >
              Cake<span className="text-danger">🧁</span>let
            </Link>

            <div
              onClick={handleCartClick}
              className="relative cursor-pointer text-text-main"
            >
              <RiShoppingBagLine size={22} />

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 flex items-center justify-center text-xs bg-danger text-white rounded-full px-1">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </div>
          </div>

          {/* DESKTOP HEADER */}
          <div className="hidden md:grid grid-cols-3 items-center w-full">

            <nav className="flex gap-8 text-text-main font-medium relative">
              <Link to="/" className="hover:text-primary transition">
                Home
              </Link>

              <div className="relative">
                <button
                  className="flex items-center gap-1 hover:text-primary transition"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  Menu <RiArrowDownSLine size={18} />
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full lg:-left-16 md:-left-32 mt-2 bg-background shadow-lg rounded-xl w-[50rem] p-4 z-50">
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
                      {categories.map((cat) => (
                        <Link
                          key={cat._id}
                          to={`/category/${cat.slug}`}
                          className="flex flex-col items-center bg-white p-4 rounded-xl hover:shadow-lg transition"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-24 h-24 object-cover rounded-lg mb-2"
                          />
                          <p className="font-semibold">{cat.name}</p>
                          <p className="text-xs opacity-60">
                            {cat.productCount} products
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link to="/about" className="hover:text-primary transition">
                About
              </Link>
            </nav>

            <div className="flex justify-center">
              <Link
                to="/"
                className="text-4xl font-logo font-bold text-primary"
              >
                Cake<span className="text-danger">🧁</span>let
              </Link>
            </div>

            <div className="flex justify-end items-center gap-4">
              {!user ? (
                <Link
                  to="/login"
                  className="px-3 py-1 rounded-lg hover:bg-accent/40 transition text-sm"
                >
                  Login
                </Link>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="p-2"
                  >
                    <RiUser3Line size={20} />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg text-sm overflow-hidden">
                      <div className="px-3 py-2 font-semibold text-text-main">
                        {user.name}
                      </div>
                      <hr />
                      {/* <button
                        className="w-full text-left px-3 py-2 hover:bg-background"
                        onClick={() => navigate("/profile")}
                      >
                        Profile Setup
                      </button> */}
                      <button
                        className="w-full text-left px-3 py-2 hover:bg-background"
                        onClick={() => navigate("/my-orders")}
                      >
                        My Orders
                      </button>
                      <button
                        className="w-full text-left px-3 py-2 text-danger hover:bg-danger/10"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div
                onClick={handleCartClick}
                className="relative cursor-pointer"
              >
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

      {/* MOBILE SIDEBAR */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/40 md:hidden">
          <div className="w-72 h-full bg-white shadow-xl p-5">

            <div className="flex justify-between mb-6">
              <h2 className="text-lg font-semibold text-text-main">
                Menu
              </h2>
              <button onClick={() => setMenuOpen(false)}>✕</button>
            </div>

            <nav className="flex flex-col gap-4 text-text-main">
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>

              <div className="border-t pt-3">
                <p className="text-sm font-semibold mb-2">Categories</p>
                {categories.map((cat) => (
                  <Link
                    key={cat._id}
                    to={`/category/${cat.slug}`}
                    onClick={() => setMenuOpen(false)}
                    className="block text-sm py-1 opacity-80 hover:opacity-100"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>

              {/* ✅ FIXED MOBILE PROFILE PANEL */}
              <div className="border-t pt-4 mt-2">
                {!user ? (
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block text-sm py-2"
                  >
                    Login
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className="flex items-center gap-2 py-2 text-sm w-full"
                    >
                      <RiUser3Line size={18} />
                      {user.name}
                    </button>

                    {profileOpen && (
                      <div className="ml-6 mt-2 flex flex-col text-sm">
                        {/* <button
                          className="text-left py-1 opacity-80 hover:opacity-100"
                          onClick={() => {
                            navigate("/profile");
                            setMenuOpen(false);
                          }}
                        >
                          Profile Setup
                        </button> */}

                        <button
                          className="text-left py-1 opacity-80 hover:opacity-100"
                          onClick={() => {
                            navigate("/my-orders");
                            setMenuOpen(false);
                          }}
                        >
                          My Orders
                        </button>

                        <button
                          className="text-left py-1 text-danger"
                          onClick={() => {
                            handleLogout();
                            setMenuOpen(false);
                          }}
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
