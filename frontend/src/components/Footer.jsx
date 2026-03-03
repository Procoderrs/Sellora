import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


import api from "../api/api";

export default function Footer() {
  const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

  
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

 

  return (
   <footer className="bg-card border-t border-muted text-text-main font-body">
  <div className="max-w-7xl mx-auto px-6 py-16">

    {/* TOP GRID */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

      {/* Brand */}
      <div className="-mt-14 ">
       {/* CENTER LOGO */}
            <div className="flex justify-center ">
              <Link
                to="/"
                className="text-4xl text-text-main font-logo"
                
              >
               <img src="/logoggg.png" alt="" className="w-56" />
              </Link>
            </div>

        {/* <p className="text-sm leading-relaxed -mt-8 text-text-main/80 max-w-xs">
          Freshly baked delights crafted daily with premium ingredients and passion.
        </p> */}

        <div className="flex gap-3 pt-2">
          {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map((Icon, i) => (
            <div
              key={i}
              className="w-9 h-9 flex items-center justify-center 
                         bg-background rounded-full 
                         hover:bg-accent hover:text-white 
                         transition-all duration-300 cursor-pointer shadow-sm"
            >
              <Icon size={14} />
            </div>
          ))}
        </div>
      </div>

      {/* Shop Categories */}
      <div>
        <h3 className="font-heading text-base font-semibold uppercase tracking-wider mb-5 text-text-main border-b border-muted pb-2">
          Shop
        </h3>

       {/*  <ul className="space-y-3 text-sm">
          {categories.map((cat) => (
            <li key={cat._id}>
              <Link
                to={`/category/${cat.slug}`}
                className="relative inline-block group"
              >
                <span className="group-hover:text-accent transition-colors duration-300">
                  {cat.name}
                </span>

               
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul> */}

        <button onClick={() => navigate("/category/all")}     
               className="inline-flex items-center gap-3 
                   
                   
                   transition-all duration-300 text-sm"
                  >
                    Explore Products <FaArrowRight className="animate-bounce" />
                  </button>
      </div>

      {/* Customer Support */}
      <div>
        <h3 className="font-heading text-base font-semibold uppercase tracking-wider mb-5 text-text-main border-b border-muted pb-2">
          Customer Support
        </h3>

        <ul className="space-y-3 text-sm">
          {["FAQ", "Shipping Policy", "Returns"].map((item, i) => (
            <li key={i}>
              <Link
                to={`/${item.toLowerCase().replace(" ", "-")}`}
                className="relative inline-block group"
              >
                <span className="group-hover:text-accent transition-colors duration-300">
                  {item}
                </span>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h3 className="font-heading text-base font-semibold uppercase tracking-wider mb-5 text-text-main border-b border-muted pb-2">
          Contact
        </h3>

        <ul className="space-y-4 text-sm text-text-main/80">
          <li className="flex items-start gap-3">
            <FiPhone size={16} className="text-accent mt-1" />
            +92 300 1234567
          </li>
          <li className="flex items-start gap-3">
            <FiMail size={16} className="text-accent mt-1" />
            support@cakelet.com
          </li>
          <li className="flex items-start gap-3">
            <FiMapPin size={16} className="text-accent mt-1" />
            Faisalabad, Pakistan
          </li>
        </ul>
      </div>

      
    </div>

    {/* Divider */}
    <div className="mt-14 border-t border-muted"></div>

    {/* Bottom Strip */}
    <div className="py-6 flex flex-col md:flex-row justify-between items-center text-xs text-text-main/70 gap-3">
      <p>
        © {new Date().getFullYear()} Cakelet. All Rights Reserved.
      </p>

      <div className="flex gap-6">
        <Link to="/privacy" className="hover:text-accent transition">Privacy</Link>
        <Link to="/terms" className="hover:text-accent transition">Terms</Link>
      </div>
    </div>
  </div>
</footer>
  );
}