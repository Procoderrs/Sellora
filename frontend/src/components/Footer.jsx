import { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../api/api";
export default function Footer() {

  const [email,setEmail]=useState("");
  const [loading,setLoading]=useState(false);
  const [message,setMessage] =useState("");

  const handleSubscribe=async(e)=>{
    e.preventDefault();
    if(!email.trim()){
      setMessage('please enter an email');
      return;
    }
    try {
      setLoading(true);
      setMessage("");
      const res=await api.post('/newsletter/subscribe',{email});
      setMessage("✅ Subscribed successfully!");
    setEmail('')
      } 
      catch (error) {
      if(error.response?.status===409){
        setMessage("⚠️ You are already subscribed");
      }
      else if(error.response?.status===400){
        setMessage("❌ Invalid email");
      }
      else {
        setMessage("❌ Server error. Try again");
      }
      
    }
    finally{
        setLoading(false)
      }
  }
  return (
    <footer className="bg-[#4A2C20] text-[#FAF7F2] font-Inter">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo / Company */}
        <div className="space-y-4">
          <div className="flex justify-center md:justify-start font-logo">
            <h2  className="text-3xl font-logo font-black text-[#FAF7F2]">
              Cake<span className="text-[#FFD966]">🧁</span>let
            </h2>
          </div>

          <p className="text-sm text-[#FAF7F2]/90">
            Freshly baked delights made with love, quality ingredients, and a passion for sweetness.
          </p>

          <div className="flex space-x-4 pt-2 text-[#FAF7F2]/90">
            <a href="#" aria-label="Facebook" className="hover:text-[#FFD966] transition">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-[#FFD966] transition">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-[#FFD966] transition">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-[#FFD966] transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-Oswald font-bold text-[#FFD966] mb-4 tracking-wide">
            Quick Links
          </h2>

          <ul className="space-y-2 text-sm text-[#FAF7F2]/90">
{/*             <li><Link to="/shop" className="hover:text-[#FFD966] transition">Shop</Link></li>
 */}            <li><Link to="/about" className="hover:text-[#FFD966] transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-[#FFD966] transition">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h2 className="text-lg font-Oswald font-bold text-[#FFD966] mb-4 tracking-wide">
            Support
          </h2>

          <ul className="space-y-2 text-sm text-[#FAF7F2]/90">
            <li><Link to="/faq" className="hover:text-[#FFD966] transition">FAQ</Link></li>
            <li><Link to="/returns" className="hover:text-[#FFD966] transition">Returns</Link></li>
            <li><Link to="/shipping" className="hover:text-[#FFD966] transition">Shipping</Link></li>
            <li><Link to="/privacy" className="hover:text-[#FFD966] transition">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-lg font-Oswald font-bold text-[#FFD966] mb-4 tracking-wide">
            Subscribe
          </h2>

          <p className="text-sm text-[#FAF7F2]/90 mb-4">
            Get updates on new cakes & special offers.
          </p>

          <form className="flex flex-col sm:flex-row gap-2" onSubmit={handleSubscribe}>
            <label htmlFor="newsletter-email" className="sr-only">
              Enter your email
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md text-[#4A2C20] flex-1 
                         border border-[#FAF7F2]/50 bg-[#FAF7F2] 
                         focus:outline-none focus:ring-2 focus:ring-[#FFD966]"
            />

            <button
              type="submit"
              className="px-4 py-2 bg-[#FFD966] text-[#4A2C20] font-semibold 
                         rounded-md hover:bg-[#E6B65A] transition"
            >
             {loading ? 'Sending...' : 'Subscribe'}
             
            </button>
          </form>
          {message &&(
            <p className="text-sm mt-2">{message}</p>
          )}
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#FAF7F2]/30 mt-6 py-4 text-center text-sm text-[#FAF7F2]/70">
        © {new Date().getFullYear()} Cakelet. All rights reserved.
      </div>
    </footer>
  );
}
