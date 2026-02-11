import { useEffect, useState, useContext } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import { CartContext } from "../context/CartContext";
import { Icon } from "@iconify/react";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [productQuantities, setProductQuantities] = useState({});

  const navigate = useNavigate();
  const { addToCart, cart } = useContext(CartContext);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/products");
        setProducts(data.products || []);
        setFilteredProducts(data.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = debounce((value) => {
    const filtered = products.filter((prod) =>
      prod.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, 300);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    handleSearch(value);
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "low-high") return a.price - b.price;
    if (sortBy === "high-low") return b.price - a.price;
    return 0;
  });

  const increaseQty = (id) =>
    setProductQuantities((p) => ({ ...p, [id]: (p[id] || 1) + 1 }));
  const decreaseQty = (id) =>
    setProductQuantities((p) => ({ ...p, [id]: Math.max((p[id] || 1) - 1, 1) }));
  const handleAdd = (product) => addToCart(product, productQuantities[product._id] || 1);

  return (
    <section className="px-6 md:px-16 py-16 bg-[var(--color-background)] min-h-screen font-[var(--font-Inter)]">
      
      {/* CART BADGE */}
      <div className="fixed top-5 right-5 z-50 bg-[var(--color-primary)] text-white px-5 py-2 rounded-full shadow-lg font-semibold">
        Cart: {cartCount}
      </div>

      {/* PAGE HEADING */}
      <h1 className="text-5xl md:text-6xl font-[var(--font-playfair)] text-[var(--color-primary)] mb-8 text-center md:text-left">
        Our Shop
      </h1>

      {/* SEARCH & SORT */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
        <input
          type="search"
          value={search}
          onChange={handleChange}
          placeholder="Search products..."
          className="px-5 py-3 w-full md:w-1/3 rounded-xl border border-[var(--color-accent)]
                     focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]
                     bg-white text-[var(--color-text-main)] placeholder-gray-400 shadow-sm"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-[var(--color-primary)]"
        >
          <option value="default">Sort by</option>
          <option value="low-high">Price: Low → High</option>
          <option value="high-low">Price: High → Low</option>
        </select>
      </div>

      {/* LOADING / EMPTY */}
      {loading && <p className="text-[var(--color-primary)] text-center mb-4">Loading products...</p>}
      {sortedProducts.length === 0 && !loading && (
        <p className="text-gray-500 text-center">No products found.</p>
      )}

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {sortedProducts.map((prod) => {
          const qty = productQuantities[prod._id] || 1;
          return (
            <div
              key={prod._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Product Image */}
              <img
                src={prod.images?.[0] || "/placeholder.jpg"}
                alt={prod.title}
                className="w-full h-64 object-cover"
              />

              {/* Product Info */}
              <div className="p-5 flex flex-col justify-between h-64">
                <div>
                  <h3 className="font-[var(--font-playfair)] text-lg text-[var(--color-text-main)] mb-2">
                    {prod.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-main)]/80 line-clamp-3 mb-3">
                    {prod.description}
                  </p>
                </div>

                <div>
                  <p className="font-bold text-[var(--color-primary)] text-xl mb-3">${prod.price}</p>

                  {/* Qty + Icon Add to Cart */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decreaseQty(prod._id)}
                      className="px-3 py-1 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-primary)] transition"
                    >
                      −
                    </button>
                    <span>{qty}</span>
                    <button
                      onClick={() => increaseQty(prod._id)}
                      className="px-3 py-1 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-primary)] transition"
                    >
                      +
                    </button>

                    <button
                      onClick={() => handleAdd(prod)}
                      className="ml-auto bg-[var(--color-primary)] text-white p-3 rounded-full hover:bg-[var(--color-accent)] transition flex items-center justify-center"
                    >
                      <Icon icon="mdi:cart-plus" width="20" height="20" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
