import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { OrdersContext } from "../context/OrderContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const { orders } = useContext(OrdersContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-[#F5F5DC] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT: Mobile Menu Icon */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#3B2F2F] focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* CENTER: Logo */}
        <h1 className="text-3xl font-serif font-bold text-[#A0522D] tracking-wide">
          <Link to="/">Sellora</Link>
        </h1>

        {/* RIGHT: Cart & Desktop Nav */}
        <div className="flex items-center gap-4">

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 text-[#3B2F2F] font-medium">
            <Link to="/shop" className="hover:text-[#A0522D]">Shop</Link>
            <Link to="/collection" className="hover:text-[#A0522D]">Collection</Link>
            <Link to="/about" className="hover:text-[#A0522D]">About</Link>
            <Link to="/my-orders" className="hover:text-[#A0522D]">
              My Orders ({orders.length})
            </Link>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="px-4 py-2 rounded-lg bg-[#F4A460]/40 text-[#3B2F2F] hover:bg-[#F4A460]/70 transition"
              >
                Profile
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#F4A460]/40 overflow-hidden">
                  <div className="px-4 py-3 text-sm text-[#3B2F2F]">
                    <p className="font-semibold">{user?.name || "Guest"}</p>
                  </div>
                  <hr />
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-[#F5F5DC]">
                    My Account
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-[#E35336] hover:bg-[#E35336]/10"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </nav>

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
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#F5F5DC] px-6 pb-4 flex flex-col gap-3">
          <Link to="/shop" className="hover:text-[#A0522D]">Shop</Link>
          <Link to="/collection" className="hover:text-[#A0522D]">Collection</Link>
          <Link to="/about" className="hover:text-[#A0522D]">About</Link>
          <Link to="/my-orders" className="hover:text-[#A0522D]">
            My Orders 
          </Link>

          {/* Profile options */}
          <div className="border-t border-[#F4A460]/30 pt-2">
            <p className="text-sm text-[#3B2F2F] font-semibold">{user?.name || "Guest"}</p>
            <button className="w-full text-left px-2 py-1 text-sm hover:bg-[#F5F5DC]">
              My Account
            </button>
            <button
              className="w-full text-left px-2 py-1 text-sm text-[#E35336] hover:bg-[#E35336]/10"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
