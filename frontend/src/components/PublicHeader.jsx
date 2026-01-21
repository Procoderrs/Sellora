import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function PublicHeader() {
  const { user, logout, cart } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCartClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/cart");
    }
  };

  return (
    <header className="bg-[#F5F5DC] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT NAV */}
        <nav className="flex gap-6 text-[#3B2F2F] font-medium">
          {["Shop", "Collection", "About", "Features"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="relative hover:text-[#A0522D] transition
                after:content-[''] after:absolute after:left-0 after:-bottom-1
                after:w-0 after:h-[2px] after:bg-[#A0522D]
                hover:after:w-full after:transition-all"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* LOGO */}
        <h1 className="text-3xl font-serif font-bold text-[#A0522D] tracking-wide">
          <Link to="/home">Sellora</Link>
        </h1>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-6">

          {/* SEARCH */}
          <input
            type="search"
            placeholder="Search products..."
            className="px-4 py-2 rounded-lg border border-[#F4A460]
              focus:outline-none focus:ring-2 focus:ring-[#F4A460]
              bg-white text-[#3B2F2F]"
          />

          {/* AUTH / PROFILE */}
          {!user ? (
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-[#F4A460]/40
                text-[#3B2F2F] hover:bg-[#F4A460]/70 transition"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="px-4 py-2 rounded-lg bg-[#F4A460]/40
                  text-[#3B2F2F] hover:bg-[#F4A460]/70 transition"
              >
                Profile
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl
                  shadow-lg border border-[#F4A460]/40 overflow-hidden">
                  <div className="px-4 py-3 text-sm text-[#3B2F2F]">
                    <p className="font-semibold">{user.name}</p>
                  </div>
                  <hr />
                  <button
                    className="w-full text-left px-4 py-2 text-sm
                      hover:bg-[#F5F5DC]"
                  >
                    My Account
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm
                      text-[#E35336] hover:bg-[#E35336]/10"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* CART */}
          <div
            onClick={handleCartClick}
            className="relative cursor-pointer"
          >
            <span className="px-4 py-2 rounded-lg bg-[#A0522D]
              text-[#F5F5DC] hover:bg-[#8B4513] transition">
              Cart
            </span>

            
          </div>

        </div>
      </div>
    </header>
  );
}
