import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import TopCrousel from "./TopCrousel";
import { RiUser3Line, RiShoppingBagLine, RiArrowDownSLine } from "@remixicon/react";
import api from "../api/api";
import debounce from "lodash.debounce";

export default function PublicHeader() {
  const { customer, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // --- search ---
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCartClick = () => {
    if (!customer) navigate("/login");
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
    <header className="bg-background font-playfair shadow-md relative">
      <TopCrousel />

      <div className="sticky top-0 z-50 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center">

          {/* MOBILE HEADER */}
          <div className="flex w-full items-center justify-between md:hidden">
            <button onClick={() => setMenuOpen(true)} aria-label="Open navigation menu">
              <svg
                className="w-6 h-6 text-text-main"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <Link to="/" className="text-3xl font-logo font-black text-primary">
              Cake<span className="text-danger">🧁</span>let
            </Link>

            <button onClick={handleCartClick} className="relative" aria-label="Open shopping cart">
              <RiShoppingBagLine size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 flex items-center justify-center text-xs bg-danger text-white rounded-full px-1">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
          </div>

          {/* DESKTOP HEADER */}
          <div className="hidden md:grid grid-cols-3 items-center w-full">

            {/* LEFT NAV */}
            <nav className="flex gap-8 text-text-main font-medium relative">
              <Link to="/home" className="hover:text-primary transition">Home</Link>

              <div
                className="relative inline-block"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button className="flex items-center gap-1 hover:text-primary transition" aria-label="Toggle categories menu">
                  Menu <RiArrowDownSLine size={18} />
                </button>

                {dropdownOpen && (
                  <div className="absolute left-0 top-full mt-3 w-[520px] bg-background shadow-xl rounded-xl p-5 z-50">
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
                      {categories.map((cat) => (
                        <Link
                          key={cat._id}
                          to={`/category/${cat.slug}`}
                          className="flex flex-col items-center bg-white p-4 rounded-xl hover:shadow-lg transition"
                        >
                          <img src={cat.image} alt="" className="w-24 h-24 object-cover rounded-lg mb-2" />
                          <span className="font-semibold">{cat.name}</span>
                          <span className="text-xs opacity-60">{cat.productCount} products</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link to="/about" className="hover:text-primary transition">About</Link>

              

            </nav>

            {/* CENTER LOGO */}
            <div className="flex justify-center">
              <Link to="/" className="text-4xl font-logo font-bold text-primary">
                Cake<span className="text-danger">🧁</span>let
              </Link>
            </div>



            {/* RIGHT ACTIONS */}
            <div className="flex justify-end items-center gap-4">

{/* SEARCH INPUT */}
             

<div className="relative ml-4">
  <label htmlFor="product-search" className="sr-only">
    Search Products
  </label>

  <input
    id="product-search"   // ⭐ IMPORTANT FIX
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
          className="flex items-center justify-between p-2 hover:bg-gray-100 transition rounded-lg cursor-pointer"
          onClick={() => {
            navigate(`/product/${prod.slug || prod._id}`, {
              state: {
                product: prod,
                parentCategory:
                  prod.category?.parent?.name || prod.category?.name,
              },
            });
            setSearch("");
            setSearchOpen(false);
          }}
        >
          <div className="flex items-center gap-3">
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
        </div>
      ))}
    </div>
  )}
</div>



              {!customer ? (
                <Link to="/login" className="px-3 py-1 rounded-lg hover:bg-accent/40 transition text-sm">Login</Link>
              ) : (
                <div className="relative">
                  <button onClick={() => setProfileOpen(!profileOpen)} className="p-2" aria-label="Open user menu">
                    <RiUser3Line size={20} />
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg text-sm z-50">
                      <div className="px-3 py-2 font-semibold">{customer.name}</div>
                      <hr />
                      <button className="w-full text-left px-3 py-2 hover:bg-background" onClick={() => navigate("/my-orders")}>My Orders</button>
                      <button className="w-full text-left px-3 py-2 text-danger hover:bg-danger/10" onClick={handleLogout}>Logout</button>
                    </div>
                  )}
                </div>
              )}
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
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/40 md:hidden">
          <aside className="w-72 h-full bg-white shadow-xl p-5 overflow-y-auto" role="dialog" aria-label="Mobile Navigation">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button onClick={() => setMenuOpen(false)} aria-label="Close navigation menu" className="text-xl">✕</button>
            </div>
            <nav className="flex flex-col gap-4 text-sm">
              <Link to="/" onClick={() => setMenuOpen(false)} className="py-2 border-b">Home</Link>
              <Link to="/about" onClick={() => setMenuOpen(false)} className="py-2 border-b">About</Link>
              <div className="pt-2">
                <p className="font-semibold mb-2">Categories</p>
                <div className="flex flex-col gap-2">
                  {categories.map((cat) => (
                    <Link key={cat._id} to={`/category/${cat.slug}`} onClick={() => setMenuOpen(false)} className="flex items-center gap-3 py-2">
                      <img src={cat.image} alt="" className="w-8 h-8 object-cover rounded" />
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </aside>
        </div>
      )}
    </header>
  );
}
