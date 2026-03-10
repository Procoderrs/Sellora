import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { DataContext } from "../context/DataContext";
import {
  RiUser3Line,
  RiShoppingBagLine,
  RiArrowDownSLine,
  RiPhoneLine
} from "@remixicon/react";
import debounce from "lodash.debounce";

export default function PublicHeader() {

  const { customer, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const { parentCategories, products } = useContext(DataContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout("customer");
    navigate("/login");
  };

  const handleCartClick = () => {
    if (!customer) navigate("/login");
    else navigate("/cart");
  };

  return (
    <header className="bg-background sticky top-0 z-50 shadow-sm font-body">

      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center">

          {/* ================= MOBILE HEADER ================= */}

          <div className="flex w-full items-center justify-between md:hidden">

            {/* hamburger */}
            <button onClick={() => setMenuOpen(true)}>
              <svg
                className="w-6 h-6 text-text-main"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* logo */}
            <Link to="/">
              <img src="/logoggg.png" className="w-32" />
            </Link>

            {/* cart */}
            <button onClick={handleCartClick} className="relative">
              <RiShoppingBagLine size={22} />

              {cartCount > 0 && (
                <span className="absolute -top-3 -right-1 text-xs bg-red-600 text-white rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </button>

          </div>


          {/* ================= DESKTOP HEADER ================= */}

          <div className="hidden md:grid grid-cols-[25%_50%_25%] justify-center w-full">

            {/* -------- LEFT : PHONE NUMBER -------- */}

            <div className="flex items-center gap-2 text-sm text-text-main font-medium">

              <RiPhoneLine size={18} />

              <span>+92 300 1234567</span>

            </div>


            {/* -------- CENTER : NAVIGATION -------- */}

            <div className="flex items-center justify-center gap-8">

              {/* Home */}
              <Link to="/home" className="hover:text-cakes transition">
                Home
              </Link>


              {/* Menu Dropdown */}

              <div
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >

                <button className="flex items-center gap-1 hover:text-cakes">

                  Menu

                  <RiArrowDownSLine size={18} />

                </button>


                {dropdownOpen && (

                  <div className="absolute top-full mt-3 w-[520px] bg-surface shadow-lg rounded-2xl p-5 border border-border">

                    <div className="grid grid-cols-4 gap-5">

                      {parentCategories.map((cat) => (

                        <Link
                          key={cat._id}
                          to={`/category/${cat.slug}`}
                          className="flex flex-col items-center p-3 rounded-xl hover:shadow-md"
                        >

                          <img
                            src={cat.image}
                            className="w-20 h-20 object-cover rounded-lg mb-2"
                          />

                          <span className="text-sm font-semibold">
                            {cat.name}
                          </span>

                        </Link>

                      ))}

                    </div>

                  </div>

                )}

              </div>


              {/* LOGO */}

              <Link to="/" className="text-4xl text-text-main font-logo">
               <img src="/logoggg.png" alt="" className="w-40 h-auto" /> </Link>


              {/* About */}

              <Link to="/about" className="hover:text-cakes transition">

                About

              </Link>


              {/* Contact */}

              <Link to="/contact" className="hover:text-cakes transition">

                Contact

              </Link>

            </div>


            {/* -------- RIGHT : ACCOUNT + CART -------- */}

            <div className="flex justify-end items-center gap-4">

              {/* account */}

              {!customer ? (

                <Link
                  to="/login"
                  className="flex items-center gap-2"
                >
                  <RiUser3Line size={20} />
                </Link>

              ) : (

                <div className="relative">

                  <button onClick={() => setProfileOpen(!profileOpen)}>

                    <RiUser3Line size={20} />

                  </button>

                  {profileOpen && (

                    <div className="absolute right-0 mt-4 w-44 bg-white shadow-lg rounded-xl text-sm border">

                      <div className="px-4 py-2 font-semibold">
                        {customer.name}
                      </div>

                      <button
                        onClick={() => navigate("/my-orders")}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        My Orders
                      </button>

                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                      >
                        Logout
                      </button>

                    </div>

                  )}

                </div>

              )}


              {/* cart */}

              <button onClick={handleCartClick} className="relative">

                <RiShoppingBagLine size={22} />

                {cartCount > 0 && (

                  <span className="absolute -top-3 -right-1 text-xs bg-red-600 text-white rounded-full px-1">

                    {cartCount}

                  </span>

                )}

              </button>

            </div>

          </div>

        </div>
      </div>


      {/* ================= MOBILE SIDEBAR ================= */}

      {menuOpen && (

        <div className="fixed inset-0 z-[100] bg-background md:hidden">

          <aside className="w-72 h-full bg-surface shadow-xl p-5">

            <div className="flex justify-between mb-6">

             

              <button onClick={() => setMenuOpen(false)}>✕</button>

            </div>

            <nav className="flex flex-col gap-4 text-sm font-semibold">

              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>

              <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>

              <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

            </nav>
             <div className="  ">
       <h4 className="mt-4 text-center font-extrabold text-lg">Menu</h4>

                     <div className="grid grid-cols-2 grid-rows-2 gap-3">
                       {parentCategories.map((cat) => (

                        <Link
                          key={cat._id}
                          to={`/category/${cat.slug}`}
                          className="flex flex-col items-center p-3 rounded-xl hover:shadow-md"
                        >

                          <img
                            src={cat.image}
                            className="w-20 h-20 object-cover rounded-lg mb-2"
                          />

                          <span className="text-sm font-semibold">
                            {cat.name}
                          </span>

                        </Link>

                      ))}
                     </div>

                    </div>

          </aside>
          
        </div>

      )}

    </header>
  );
}