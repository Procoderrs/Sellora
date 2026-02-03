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
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT: Hamburger Menu */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#3B2F2F] focus:outline-none"
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
        <h1 className="text-3xl font-serif font-bold text-[#A0522D] tracking-wide">
          <Link to="/">Sellora</Link>
        </h1>

        {/* RIGHT Section */}
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

          {/* Search */}
          <div className="relative hidden md:block">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="px-4 py-2 rounded-lg border border-[#F4A460] focus:outline-none focus:ring-2 focus:ring-[#F4A460]"
            />
            {searchResults.length > 0 && (
              <div className="absolute mt-1 bg-white border border-gray-300 w-full max-h-64 overflow-auto rounded-lg shadow-lg z-50">
                {searchResults.map((prod) => (
                  <div
                    key={prod._id}
                    onClick={() => handleProductClick(prod)}
                    className="px-4 py-2 hover:bg-[#F5F5DC] cursor-pointer"
                  >
                    {prod.title}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile / Auth */}
          {!user ? (
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-[#F4A460]/40 text-[#3B2F2F] hover:bg-[#F4A460]/70 transition"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="px-4 py-2 rounded-lg bg-[#F4A460]/40 text-[#3B2F2F] hover:bg-[#F4A460]/70 transition"
              >
                Profile
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-[#F4A460]/40 overflow-hidden">
                  <div className="px-4 py-3 text-sm text-[#3B2F2F]">
                    <p className="font-semibold">{user.name}</p>
                  </div>
                  <hr />
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-[#F5F5DC]">
                    My Account
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-[#E35336] hover:bg-[#E35336]/10"
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
            className="relative cursor-pointer ml-2"
          >
            <span className="px-4 py-2 rounded-lg bg-[#A0522D] text-[#F5F5DC] hover:bg-[#8B4513] transition">
              Cart
            </span>
            <span className="absolute -top-2 -right-2 text-xs bg-[#E35336] text-white px-2 py-0.5 rounded-full">
              {cart?.length || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#F5F5DC] px-6 pb-4 flex flex-col gap-3">
          {["Shop", "Collection", "About"].map((item) => (
            <Link key={item} to={`/${item.toLowerCase()}`} className="hover:text-[#A0522D]">
              {item}
            </Link>
          ))}

          {/* Profile Section */}
          {user && (
            <div className="border-t border-[#F4A460]/30 pt-2 flex flex-col gap-1">
              <p className="text-sm text-[#3B2F2F] font-semibold">{user.name}</p>
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
          )}
        </div>
      )}
    </header>
  );
}
