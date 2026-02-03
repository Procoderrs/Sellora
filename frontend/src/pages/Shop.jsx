import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch all products once
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

  // Debounced filter
  const handleSearch = debounce((value) => {
    const filtered = products.filter((prod) =>
      prod.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, 300); // 300ms debounce

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    handleSearch(value);
  };

  return (
    <section className="px-10 py-16 bg-[#F5F5DC] min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Shop</h1>

      {/* SEARCH INPUT */}
      <input
        type="search"
        value={search}
        onChange={handleChange}
        placeholder="Search products..."
        className="mb-6 px-4 py-2 w-full md:w-1/3 rounded-lg border border-[#F4A460]
                   focus:outline-none focus:ring-2 focus:ring-[#F4A460] bg-white text-[#3B2F2F]"
      />

      {loading && <p className="text-[#A0522D] mb-4">Loading products...</p>}
      {filteredProducts.length === 0 && !loading && (
        <p className="text-gray-500">No products found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {filteredProducts.map((prod) => (
          <div
            key={prod._id}
            className="border rounded-xl bg-white shadow hover:shadow-lg transition"
          >
            <img
              src={prod.images?.[0] || "/placeholder.jpg"}
              alt={prod.title}
              className="w-full h-56 object-cover rounded-t-xl"
            />
            <div className="p-4">
              <h3 className="font-semibold">{prod.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {prod.description}
              </p>
              <p className="font-bold mt-2">${prod.price}</p>
              <button
                onClick={() =>
                  navigate(`/product/${prod.slug}`, { state: { product: prod } })
                }
                className="mt-3 w-full bg-[#A0522D] text-white py-2 rounded-lg"
              >
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
