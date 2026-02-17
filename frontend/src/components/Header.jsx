import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import TopCrousel from "./TopCrousel";
import { RiUser3Line, RiShoppingBagLine, RiArrowDownSLine } from "@remixicon/react";
import api from "../api/api";
import debounce from "lodash.debounce";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // --- search ---
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);

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
        setProducts(allProducts); // for search

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

  // --- search handlers ---
  const handleSearchChange = debounce((value) => {
    if (!value) {
      setSearchResults([]);
      return;
    }
    const filtered = products.filter((prod) =>
      prod.title.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filtered.slice(0, 5)); // show max 5 results
  }, 300);

  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setSearchOpen(!!value);
    handleSearchChange(value);
  };

  return (
    <header className="bg-background shadow-md sticky top-0 z-50 font-playfair relative">
      <TopCrousel />

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">

        {/* LEFT NAV */}
        <nav className="flex gap-6 text-text-main font-medium relative">
          <Link to="/" className="hover:text-primary transition">Home</Link>

          {/* Categories Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1"
              aria-label="Toggle categories menu"
            >
              Menu <RiArrowDownSLine size={18} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full mt-2 w-64 bg-white shadow-lg rounded-xl p-4 z-50">
                {categories.map((cat) => (
                  <Link
                    key={cat._id}
                    to={`/category/${cat.slug}`}
                    className="flex flex-col items-center p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <img src={cat.image} alt={cat.name} className="w-16 h-16 object-cover rounded mb-1" />
                    <span className="text-sm font-semibold">{cat.name}</span>
                    <span className="text-xs text-gray-500">{cat.productCount} products</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/about" className="hover:text-primary transition">About</Link>
        </nav>

        {/* CENTER LOGO */}
        <div className="flex justify-center flex-1">
          <Link className="text-3xl font-logo text-primary" to="/">
            Cake<span className="text-danger">🧁</span>let
          </Link>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex justify-end items-center gap-4 flex-1">

          {/* SEARCH INPUT */}
          <div className="relative">
            <input
              type="search"
              value={search}
              onChange={onSearchChange}
              placeholder="Search products..."
              className="px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary w-64"
            />
            {searchOpen && searchResults.length > 0 && (
              <div className="absolute top-full mt-1 w-full bg-white shadow-lg rounded-lg z-50">
                {searchResults.map((prod) => (
                  <div
                    key={prod._id}
                    className="flex items-center gap-3 p-2 hover:bg-gray-100 transition rounded-lg cursor-pointer"
                    onClick={() => {
                      navigate(`/product/${prod.slug || prod._id}`, {
                        state: {
                          product: prod,
                          parentCategory: prod.category?.parent?.name || prod.category?.name,
                        },
                      });
                      setSearch("");
                      setSearchOpen(false);
                    }}
                  >
                    <img
                      src={prod.images?.[0] || "/placeholder.jpg"}
                      alt={prod.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="text-sm font-semibold">{prod.title}</p>
                      <p className="text-xs text-gray-500">${prod.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* USER PROFILE */}
          {!user ? (
            <Link to="/login" className="px-3 py-1 rounded-lg hover:bg-accent/40 transition text-sm">Login</Link>
          ) : (
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)} aria-label="Open user menu">
                <RiUser3Line size={20} />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg text-sm z-50">
                  <div className="px-3 py-2 font-semibold">{user.name}</div>
                  <hr />
                  <button className="w-full text-left px-3 py-2 hover:bg-background" onClick={() => navigate("/my-orders")}>My Orders</button>
                  <button className="w-full text-left px-3 py-2 text-danger hover:bg-danger/10" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          )}

          {/* CART */}
          <button onClick={handleCartClick} className="relative" aria-label="Open shopping cart">
            <RiShoppingBagLine size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 flex items-center justify-center text-xs bg-danger text-white rounded-full px-1">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
}
