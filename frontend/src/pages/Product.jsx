import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "../components/ConfirmDelete";

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [deletingProduct, setDeletingProduct] = useState(null);

  const fetchData = async () => {
    try {
      const prodRes = await api.get("/admin/products");
      setProducts(prodRes.data.products || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
  navigate("/admin/product"); // no state needed
};

const handleEdit = (product) => {
  navigate("/admin/product", { state: { product } }); // pass product for editing
};

  const handleDelete = (product) => {
    setDeletingProduct(product);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await api.delete(`/admin/products/${deletingProduct._id}`);
      setDeletingProduct(null);
      fetchData();
    } catch (err) {
      console.error("Delete failed:", err);
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-[#A0522D]">
          Product Management
        </h2>
        <button
  onClick={handleAdd}
  className="bg-[#A0522D] text-[#F5F5DC] px-5 py-2 rounded-lg shadow hover:bg-[#8B4513] transition"
>
  + Add Product
</button>

      </div>

      {deletingProduct && (
        <ConfirmDelete
          categoryName={deletingProduct.title}
          onCancel={() => setDeletingProduct(null)}
          onConfirm={handleDeleteConfirmed}
        />
      )}

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-[#F4A460]/40">
          <thead className="bg-[#F4A460]/30">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#3B2F2F]">
                Image
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#3B2F2F]">
                Title
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#3B2F2F]">
                Parent Category
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#3B2F2F]">
                Subcategory
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-[#3B2F2F]">
                Price
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-[#3B2F2F]">
                Stock
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-[#3B2F2F]">
                Status
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-[#3B2F2F]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#F4A460]/20">
            {products.map((p) => (
              <tr key={p._id} className="hover:bg-[#F4A460]/10 transition">
                <td className="px-6 py-4">
                  {p.images?.length > 0 ? (
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-12 h-12 object-cover rounded-lg border border-[#F4A460]/40"
                    />
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center text-xs text-[#3B2F2F]/60 border rounded">
                      N/A
                    </div>
                  )}
                </td>

                <td className="px-6 py-4 text-[#3B2F2F]">{p.title}</td>

                <td className="px-6 py-4 text-[#3B2F2F]">
                  {p.category?.parent?.name || "—"}
                </td>

                <td className="px-6 py-4 text-[#3B2F2F]">
                  {p.category?.name || "—"}
                </td>

                <td className="px-6 py-4 text-[#3B2F2F]">{p.price}</td>
                <td className="px-6 py-4 text-[#3B2F2F]">{p.stock}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      p.status === "active"
                        ? "text-[#A0522D] bg-[#F4A460]/30"
                        : "text-[#E35336] bg-[#E35336]/20"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-center space-x-3">
                  <button
                    onClick={() => handleEdit(p)}
                    className="px-3 py-1 text-sm text-[#A0522D] border border-[#A0522D] rounded hover:bg-[#A0522D]/10 transition cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p)}
                    className="px-3 py-1 text-sm text-[#E35336] border border-[#E35336] rounded hover:bg-[#E35336]/10 transition cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
