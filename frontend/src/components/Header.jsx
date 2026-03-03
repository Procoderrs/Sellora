import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { DataContext } from "../context/DataContext";
import TopCrousel from "./TopCrousel";
import { RiUser3Line, RiShoppingBagLine, RiArrowDownSLine } from "@remixicon/react";
import api from "../api/api";
import debounce from "lodash.debounce";

export default function PublicHeader() {
  const { customer, logout } = useContext(AuthContext);
    const { cartCount } = useContext(CartContext);
    const {parentCategories,products}=useContext(DataContext)
  
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
  
    const [search, setSearch] = useState("");
  /*   const [products, setProducts] = useState([]);
   */  const [searchResults, setSearchResults] = useState([]);
    const [searchOpen, setSearchOpen] = useState(false);
  
    const navigate = useNavigate();
  
    const handleLogout = () => {
      logout("customer");
      navigate("/login");
    };
  
    const handleCartClick = () => {
      if (!customer) navigate("/login");
      else navigate("/cart");
    };
  
    /* useEffect(() => {
      const fetchData = async () => {
        try {
          const catRes = await api.get("/categories");
          const prodRes = await api.get("/products");
  
          const allCategories = catRes.data.categories || [];
          const allProducts = prodRes.data.products || [];
  
          setProducts(allProducts);
  
          const parents = allCategories.filter((c) => !c.parent);
          console.log(parents);
  
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
    }, []); */
  
    const handleSearchChange = debounce((value) => {
      if (!value) {
        setSearchResults([]);
        return;
      }
  
      const filtered = products.filter((prod) =>
        prod.title.toLowerCase().includes(value.toLowerCase())
      );
  
      setSearchResults(filtered.slice(0, 5));
    }, 300);
  
    const onSearchChange = (e) => {
      const value = e.target.value;
      setSearch(value);
      setSearchOpen(!!value);
      handleSearchChange(value);
    };
  
    return (
      <header
        className="bg-background  sticky top-0 z-50 shadow-sm  font-body"
        
      >
        {/* <TopCrousel /> */}
  
        <div className=" bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center">
  
            {/* MOBILE HEADER */}
            <div className="flex w-full items-center justify-between md:hidden">
              <button onClick={() => setMenuOpen(true)}>
                <svg
                  className="w-6 h-6 text-text-main"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
  
              {/* CENTER LOGO */}
              <div className="flex justify-center">
                <Link
                  to="/"
                  className="text-4xl text-text-main font-logo"
                  
                >
                 <img src="/logoggg.png" alt="" className="w-36" />
                </Link>
              </div>
              <button onClick={handleCartClick} className="relative">
                <RiShoppingBagLine size={22} />
                {cartCount > 0 && (
                   <span className="absolute -top-3 bg-red-600  -right-1  h-4 flex items-center justify-center text-xs bg-danger text-white rounded-full px-1">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>
            </div>
  
            {/* DESKTOP HEADER */}
            <div className="hidden md:grid grid-cols-3 items-center w-full">
  
              {/* LEFT NAV */}
              <nav className="flex gap-8 font-body text-text-main font-medium relative">
                <Link to="/home" className="hover:text-cakes transition">Home</Link>
  
                <div
    className="relative inline-block"
    onMouseEnter={() => setDropdownOpen(true)}
    onMouseLeave={(e) => {
      // Check if mouse actually left the whole container
      if (!e.currentTarget.contains(e.relatedTarget)) {
        setDropdownOpen(false);
      }
    }}
  >
                  <button className="flex items-center gap-1 hover:text-cakes transition">
                    Menu <RiArrowDownSLine size={18} />
                  </button>
  
                  {dropdownOpen && (
                    <div className="absolute bg-background  left-0 top-full mt-3 w-[520px] bg-surface shadow-lg rounded-2xl p-5 border border-border">
                      <div className="grid lg:grid-cols-4  md:grid-cols-2 gap-5">
                       {parentCategories.map((cat) => (
    <Link
      key={cat._id}
      to={`/category/${cat.slug}`}
      className="flex flex-col items-center bg-background p-4 rounded-xl hover:shadow-md transition"
    >
      <img
        src={cat.image}
        alt=""
        className="w-24 h-24 lg:w-56 object-cover rounded-lg mb-2"
      />
      <span className="font-semibold text-sm">{cat.name}</span>
      <span className="text-xs text-text-soft">{cat.productCount} products</span>
    </Link>
  ))}
                      </div>
                    </div>
                  )}
                </div>
  
                <Link to="/about" className="hover:text-cakes transition">About</Link>
              </nav>
  
              {/* CENTER LOGO */}
              <div className="flex justify-center">
                <Link
                  to="/"
                  className="text-4xl text-text-main font-logo"
                  
                >
                 <img src="/logoggg.png" alt="" className="w-36" />
                </Link>
              </div>
  
              {/* RIGHT ACTIONS */}
              <div className="flex justify-end items-center text-text-main gap-4">
  
                {/* SEARCH */}
                <div className="relative">
                  <input
                    type="search"
                    value={search}
                    onChange={onSearchChange}
                    placeholder="Search products..."
                    className="px-4 py-2 rounded-xl border bg-background border-border bg-surface 
                               focus:outline-none focus:ring-2 focus:ring-cakes w-64 text-sm"
                  />
  
                  {searchOpen && searchResults.length > 0 && (
                    <div className="absolute bg-background top-full mt-2 w-full bg-surface shadow-lg rounded-xl border border-border z-50">
                      {searchResults.map((prod) => (
                        <div
                          key={prod._id}
                          className="flex items-center gap-3 p-3 font-body hover:bg-background transition cursor-pointer"
                          onClick={() => {
                            navigate(`/product/${prod.slug || prod._id}`, {
                              state: {
                                product: prod,
                                parentCategory:
                                  prod.category?.parent?.name ||
                                  prod.category?.name,
                              },
                            });
                            setSearch("");
                            setSearchOpen(false);
                          }}
                        >
                          <img
                            src={prod.images?.[0] || "/placeholder.jpg"}
                            alt=""
                            className="w-10 h-10 object-cover rounded-lg"
                          />
                          <div>
                            <p className="text-sm font-medium">{prod.title}</p>
                            <p className="text-xs text-text-soft">${prod.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
  
                {!customer ? (
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-xl bg-cupcakes text-text-main text-sm hover:scale-105 transition"
                  >
                    Login
                  </Link>
                ) : (
                  <div className="relative flex">
                    <button onClick={() => setProfileOpen(!profileOpen)} className="p-2">
                      <RiUser3Line size={20} />
                    </button>
   <button
                          className="w-full text-left text-nowrap px-3 py-2 hover:bg-background"
                          onClick={() => navigate("/my-orders")}
                        >
                          My Orders
                        </button>
                    {profileOpen && (
                      <div className="absolute font-body  bg-background right-0 mt-15 w-48 bg-surface rounded-xl shadow-lg text-sm border border-border">
                        <div className="px-3 py-2 font-semibold">{customer.name}</div>
                        <hr />
                        
                        <button
                          className="w-full text-left px-3 py-2 text-danger hover:bg-danger/10"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                )}
  
                <button onClick={handleCartClick} className="relative">
                  <RiShoppingBagLine size={22} />
                  {cartCount > 0 && (
                    <span className="absolute -top-3 bg-red-600  -right-1  h-4 flex items-center justify-center text-xs bg-danger text-white rounded-full px-1">
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
          <div className="fixed inset-0 z-[100] bg-background md:hidden">
            <aside className="w-72 h-full bg-surface shadow-xl p-5">
              <div className="flex justify-between mb-6">
                <h2 className="font-semibold">Menu</h2>
                <button onClick={() => setMenuOpen(false)}>✕</button>
              </div>
  
              <nav className="flex flex-col gap-4 text-sm">
                <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
  
                <div>
                  <p className="font-semibold mb-2">Categories</p>
                  {categories.map((cat) => (
                    <Link
                      key={cat._id}
                      to={`/category/${cat.slug}`}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 py-2"
                    >
                      <img src={cat.image} alt="" className="w-7 h-7 rounded" />
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </nav>
            </aside>
          </div>
        )}
      </header>
    );
  }