import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { user, logout, loading } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-[#F5F5DC] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-3xl font-serif font-bold text-[#A0522D] tracking-wide">
          <Link to="/">Sellora</Link>
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-[#3B2F2F] font-medium">
          <Link to="/shop" className="hover:text-[#A0522D]">Shop</Link>
          <Link to="/collection" className="hover:text-[#A0522D]">Collection</Link>
          <Link to="/about" className="hover:text-[#A0522D]">About</Link>

          {/* ✅ My Orders visible only if user logged in */}
          {!loading && user && (
            <Link to="/my-orders" className="hover:text-[#A0522D]">
              My Orders
            </Link>
          )}

          {/* Profile */}
          {!loading && (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="px-4 py-2 rounded-lg bg-[#F4A460]/40 hover:bg-[#F4A460]/70 transition"
              >
                Profile
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#F4A460]/40 overflow-hidden">
                  <div className="px-4 py-3 text-sm">
                    <p className="font-semibold">{user?.name || "Guest"}</p>
                  </div>
                  <hr />
                  <button
      className="w-full text-left px-4 py-2 text-sm hover:bg-[#F5F5DC]"
      onClick={() => navigate("/my-orders")}
    >
      My Account
    </button>
                  {user && (
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-[#E35336] hover:bg-[#E35336]/10"
                    >
                      Logout
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Cart */}
          <div
            className="relative cursor-pointer ml-2"
            onClick={() => navigate("/cart")}
          >
            <span className="px-4 py-2 rounded-lg bg-[#A0522D] text-[#F5F5DC] hover:bg-[#8B4513] transition">
              Cart
            </span>
            <span className="absolute -top-2 -right-2 text-xs bg-[#E35336] text-white px-2 py-0.5 rounded-full">
              {cartCount || 0}
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
}
