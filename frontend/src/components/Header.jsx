import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import TopCrousel from "./TopCrousel";
import { RiUser3Line, RiShoppingBagLine, RiArrowDownSLine } from "@remixicon/react";
import api from "../api/api";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
        const catRes = await api.get("/admin/categories");
        const prodRes = await api.get("/admin/products");

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
    <header className="bg-white shadow-md sticky top-0 z-50 font-playfair">
      <TopCrousel />

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">

        {/* LEFT: Navigation Links */}
        <nav className="flex gap-8 text-text-main font-medium relative">
              {["Home", "Menu", "About"].map((item) => (
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
  <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-xl w-[80rem] p-4 z-50">
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

        {/* CENTER: Logo */}
        <div className="flex justify-center font-logo flex-1">
          <Link to="/" className="text-3xl font-logo font-bold text-primary">Cake<span className="text-danger">🧁</span>let</Link>
        </div>

        {/* RIGHT: Profile + Cart */}
        <div className="flex justify-end items-center gap-4 flex-1">
          {!user ? (
            <Link
              to="/login"
              className="px-3 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 transition text-sm"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <RiUser3Line size={20} />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg overflow-hidden text-sm">
                  <div className="px-4 py-2 font-semibold">{user.name}</div>
                  <hr />
                  <button
                    onClick={() => navigate("/my-orders")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    My Orders
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-danger hover:bg-danger/10"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <div
            className="relative cursor-pointer"
            onClick={handleCartClick}
          >
            <RiShoppingBagLine size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-danger text-white px-2 py-0.5 rounded-full">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4 ml-auto">
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
        </div>

      </div>
    </header>
  );
}
