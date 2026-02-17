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

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();

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
    <header className="bg-background shadow-md sticky top-0 z-50 font-playfair">
      <TopCrousel />

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">

        <nav className="flex gap-8 text-text-main font-medium relative">
          {/* <Link to="/">Home</Link> */}

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1"
              aria-label="Toggle categories menu"
            >
              Menu <RiArrowDownSLine size={18} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full mt-2 w-screen bg-white shadow-lg rounded-xl p-6">
                {categories.map((cat) => (
                  <Link key={cat._id} to={`/category/${cat.slug}`}>
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/about">About</Link>
        </nav>

        <div className="flex justify-center flex-1">
          <Link className="text-3xl font-logo text-primary" to="/">
            Cake<span className="text-danger">🧁</span>let
          </Link>
        </div>

        <div className="flex justify-end items-center gap-4 flex-1">
          {!user ? (
            <Link to="/login">Login</Link>
          ) : (
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              aria-label="Open user menu"
            >
              <RiUser3Line size={20} />
            </button>
          )}

          <button
            onClick={handleCartClick}
            aria-label="Open shopping cart"
          >
            <RiShoppingBagLine size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
