import { Link,useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { user,logout} = useContext(AuthContext);
  const {cart,cartCount}=useContext(CartContext)
  console.log(cart);
  console.log(cartCount);
  


  const [click, setClick] = useState(false);
  const navigate=useNavigate()
  
  function HandleLogout(){
    logout();
    navigate('/login')
  }

  return (
    <header className="bg-[#F5F5DC] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT NAV */}
        <nav className="flex gap-6 text-[#3B2F2F] font-medium">
  <Link to="/shop" className="hover:text-[#A0522D]">Shop</Link>
  <Link to="/collection" className="hover:text-[#A0522D]">Collection</Link>
  <Link to="/about" className="hover:text-[#A0522D]">About</Link>
  <Link to="/features" className="hover:text-[#A0522D]">Features</Link>
</nav>

        {/* LOGO */}
        <h1 className="text-3xl font-serif font-bold text-[#A0522D] tracking-wide">
          <Link to='/'>Sellora</Link>
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

          {/* PROFILE */}
          <div className="relative">
            <button
              onClick={() => setClick(!click)}
              className="px-4 py-2 rounded-lg bg-[#F4A460]/40
                         text-[#3B2F2F] hover:bg-[#F4A460]/70 transition"
            >
              Profile
            </button>

            {click && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl
                              shadow-lg border border-[#F4A460]/40 overflow-hidden">
                <div className="px-4 py-3 text-sm text-[#3B2F2F]">
                  <p className="font-semibold">{user?.name || "Guest"}</p>
                </div>
                <hr />
                <button
                  className="w-full text-left px-4 py-2 text-sm
                             hover:bg-[#F5F5DC]"
                >
                  My Account
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm
                             text-[#E35336] hover:bg-[#E35336]/10"
                            onClick={HandleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

<Link to="/my-orders" className="px-4 py-2 hover:bg-[#F5F5DC]">
  My Orders
</Link>

          {/* CART */}
          <div className="relative cursor-pointer">
            <span className="px-4 py-2 rounded-lg bg-[#A0522D]
                             text-[#F5F5DC] hover:bg-[#8B4513] transition">
              Cart
            </span>

            {/* Badge */}
            <span className="absolute -top-2 -right-2 text-xs
                             bg-[#E35336] text-white px-2 py-0.5
                             rounded-full">
             {cartCount}
            </span>
          </div>

        </div>
      </div>
    </header>
  );
}
