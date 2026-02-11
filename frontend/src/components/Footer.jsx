import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-primary text-text-main font-Inter">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo / Company */}
        <div className="space-y-4">
          <div className="flex justify-center font-logo flex-1">
          <Link to="/" className="text-3xl font-logo font-bold text-text-main">Cake<span className="text-danger">🧁</span>let</Link>
        </div>
          <p className="text-text-main text-sm">
            Your one-stop shop for all your needs. Quality products, fast delivery.
          </p>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-accent"><FaFacebookF /></a>
            <a href="#" className="hover:text-accent"><FaTwitter /></a>
            <a href="#" className="hover:text-accent"><FaInstagram /></a>
            <a href="#" className="hover:text-accent"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-Oswald text-accent mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-accent">Home</a></li>
            <li><a href="/shop" className="hover:text-accent">Shop</a></li>
            <li><a href="/about" className="hover:text-accent">About Us</a></li>
            <li><a href="/contact" className="hover:text-accent">Contact</a></li>
          </ul>
        </div>

        {/* Resources / Support */}
        <div>
          <h2 className="text-xl font-Oswald text-accent mb-4">Support</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/faq" className="hover:hover:text-accent">FAQ</a></li>
            <li><a href="/returns" className="hover:hover:text-accent">Returns</a></li>
            <li><a href="/shipping" className="hover:hover:text-accent">Shipping</a></li>
            <li><a href="/privacy" className="hover:hover:text-accent">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-xl font-Oswald hover:text-accent mb-4">Subscribe</h2>
          <p className="text-text-main text-sm mb-4">
            Get the latest updates and offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md text-text-main flex-1 border border-border focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-accent text-primary font-semibold rounded-md hover:bg-text-main hover:text-accent transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-border mt-8 py-4 text-center text-sm text-text-main">
        &copy; {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
}
