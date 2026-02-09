import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import TopCrousel from "./TopCrousel";
import { RiUser3Line, RiShoppingBagLine, RiArrowDownSLine } from "@remixicon/react";
import api from "../api/api";

export default function Navbar() {
  const { user, logout, loading } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  // Fetch categories for dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/admin/categories");
        const allCategories = res.data.categories || [];
        const parents = allCategories.filter(c => !c.parent);
        setCategories(parents);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <header className="bg-[#F5F5DC] shadow-md sticky top-0 z-50">
      <TopCrousel />

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-3xl font-serif font-bold text-[#A0522D] tracking-wide">
          <Link to="/">Sellora</Link>
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-[#3B2F2F] font-medium relative">
          <Link to="/shop" className="hover:text-[#A0522D]">Shop</Link>
          <Link to="/collection" className="hover:text-[#A0522D]">Collection</Link>
          <Link to="/about" className="hover:text-[#A0522D]">About</Link>

          {/* Categories Dropdown */}
          {categories.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 hover:text-[#A0522D] transition"
              >
                Categories <RiArrowDownSLine size={18} />
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-xl w-64 p-4 z-50">
                  {categories.map(cat => (
                    <Link
                      key={cat._id}
                      to={`/category/${cat.slug}`}
                      className="block px-2 py-1 hover:bg-[#F4A460]/20 rounded"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Profile */}
          {!loading && (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="px-3 py-1 rounded-lg bg-[#F4A460]/40 hover:bg-[#F4A460]/70 transition"
              >
                <RiUser3Line size={20} />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#F4A460]/40 overflow-hidden text-sm">
                  <div className="px-4 py-3 text-sm">
                    <p className="font-semibold">{user?.name || "Guest"}</p>
                  </div>
                  <hr />
                  {user && (
                    <>
                      <button
                        className="w-full text-left px-4 py-2 text-sm hover:bg-[#F5F5DC]"
                        onClick={() => navigate("/my-orders")}
                      >
                        My Orders
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-[#E35336] hover:bg-[#E35336]/10"
                      >
                        Logout
                      </button>
                    </>
                  )}
                  {!user && (
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm hover:bg-[#F5F5DC]"
                    >
                      Login
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Cart */}
          <div
            className="relative cursor-pointer ml-4"
            onClick={handleCartClick}
          >
            <RiShoppingBagLine size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-[#E35336] text-white px-2 py-0.5 rounded-full">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </div>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setMenuOpen(true)}>
            <svg
              className="w-6 h-6"
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
          <div
            className="relative cursor-pointer"
            onClick={handleCartClick}
          >
            <RiShoppingBagLine size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-[#E35336] text-white px-2 py-0.5 rounded-full">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
