import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";
import _ from "lodash";

export default function PublicHeader() {
  const { user, logout, cart } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCartClick = () => {
    if (!user) navigate("/login");
    else navigate("/cart");
  };

  // ---------------- Debounced Search ----------------
  const fetchSearchResults = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    try {
      const { data } = await api.get(`/products?search=${query}`);
      setSearchResults(data.products || []);
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  const debouncedSearch = useCallback(_.debounce(fetchSearchResults, 500), []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.slug}`, { state: { product } });
    setSearchTerm("");
    setSearchResults([]);
  };

  return (
    <header className="bg-[#F5F5DC] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14 relative px-4 md:px-6">

        {/* LEFT: Desktop Nav or Hamburger */}
        <div className="flex items-center gap-4">
          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 text-[#3B2F2F] font-medium">
            {["Shop", "Collection", "About"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="hover:text-[#A0522D] transition"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Hamburger for Mobile */}
          <button
            className="md:hidden text-[#3B2F2F] focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* CENTER: Logo */}
        <h1 className="text-3xl font-serif font-bold text-[#A0522D] tracking-wide absolute left-1/2 transform -translate-x-1/2 md:static">
          <Link to="/">Sellora</Link>
        </h1>

        {/* RIGHT: Profile/Login & Cart */}
        <div className="flex items-center gap-3">
          {!user ? (
            <Link
              to="/login"
              className="px-3 py-1 rounded-lg bg-[#F4A460]/40 text-[#3B2F2F] hover:bg-[#F4A460]/70 transition text-sm"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="px-3 py-1 rounded-lg bg-[#F4A460]/40 text-[#3B2F2F] hover:bg-[#F4A460]/70 transition text-sm"
              >
                Profile
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-[#F4A460]/40 overflow-hidden text-sm">
                  <div className="px-3 py-2 text-[#3B2F2F]">
                    <p className="font-semibold">{user.name}</p>
                  </div>
                  <hr />
                  <button
                    className="w-full text-left px-3 py-1 hover:bg-[#F5F5DC]"
                    onClick={() => navigate("/my-orders")}
                  >
                    My Orders
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-1 text-[#E35336] hover:bg-[#E35336]/10"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Cart */}
          <div
            onClick={handleCartClick}
            className="relative cursor-pointer"
          >
            <span className="px-3 py-1 rounded-lg bg-[#A0522D] text-[#F5F5DC] hover:bg-[#8B4513] transition text-sm">
              Cart
            </span>
            <span className="absolute -top-2 -right-2 text-xs bg-[#E35336] text-white px-1 py-0.5 rounded-full">
              {cart?.length || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden fixed inset-y-0 left-0 w-64 bg-[#F5F5DC] shadow-lg z-50 flex flex-col pt-4 px-4">
          {["Shop", "Collection", "About"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="py-2 text-[#3B2F2F] font-medium hover:text-[#A0522D] transition"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          ))}

          {/* Profile Section */}
          {user && (
            <div className="mt-4 border-t border-[#F4A460]/30 pt-2 flex flex-col gap-1">
              <p className="text-sm text-[#3B2F2F] font-semibold">{user.name}</p>
              <button
                className="w-full text-left py-1 text-sm hover:bg-[#F5F5DC]"
                onClick={() => navigate("/my-orders")}
              >
                My Orders
              </button>
              <button
                className="w-full text-left py-1 text-sm text-[#E35336] hover:bg-[#E35336]/10"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
