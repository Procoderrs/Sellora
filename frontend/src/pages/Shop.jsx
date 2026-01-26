import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(data.products || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="px-10 py-16 bg-[#F5F5DC] min-h-screen">
      <h1 className="text-4xl font-bold mb-10">Shop</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {products.map(prod => (
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
                  navigate(`/product/${prod.slug}`, {
                    state: { product: prod }
                  })
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
