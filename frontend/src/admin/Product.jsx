import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "./ConfirmDelete";

export default function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [deletingProduct, setDeletingProduct] = useState(null);

  // Fetch products
  const fetchData = async () => {
    try {
      const res = await api.get("/admin/products");
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    navigate("/admin/product");
  };

  const handleEdit = (product) => {
    navigate("/admin/product", { state: { product } });
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
      console.error(err);
      alert("Delete failed");
    }
  };

  // 🔹 GROUP PRODUCTS BY PARENT CATEGORY
  const groupedProducts = products.reduce((acc, product) => {
    const parent = product.category?.parent;
    if (!parent) return acc;

    if (!acc[parent._id]) {
      acc[parent._id] = {
        parent,
        items: [],
      };
    }

    acc[parent._id].items.push(product);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background p-8 font-lg font-smoooch">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-primary">
          Product Management
        </h2>
        <button
          onClick={handleAdd}
          className="bg-primary text-background px-5 py-2 rounded-lg shadow hover:bg-primary/90 transition"
        >
          + Add Product
        </button>
      </div>

      {/* DELETE CONFIRM */}
      {deletingProduct && (
        <ConfirmDelete
          categoryName={deletingProduct.title}
          onCancel={() => setDeletingProduct(null)}
          onConfirm={handleDeleteConfirmed}
        />
      )}

      {/* 🔹 PARENT WISE PRODUCT SHELVES */}
      <div className="space-y-8">
        {Object.values(groupedProducts).map((group) => (
          <div
            key={group.parent._id}
            className="bg-background border border-border rounded-2xl shadow-sm p-6"
          >
            {/* Parent Category Title */}
            <h3 className="text-2xl font-bold text-text-main mb-5">
              {group.parent.name}
              <span className="ml-2 text-sm text-gray-500">
                ({group.items.length})
              </span>
            </h3>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#F4A460]/40">
               <thead className="bg-[#F4A460]/30">
  <tr>
    <th className="px-4 py-3 text-left text-sm font-semibold text-text-main w-[10%]">Image</th>
    <th className="px-4 py-3 text-left text-sm font-semibold text-text-main w-[30%]">Title</th>
    <th className="px-4 py-3 text-left text-sm font-semibold text-text-main w-[15%]">Subcategory</th>
    <th className="px-4 py-3 text-left text-sm font-semibold text-text-main w-[10%]">Price</th>
    <th className="px-4 py-3 text-left text-sm font-semibold text-text-main w-[10%]">Stock</th>
    <th className="px-4 py-3 text-left text-sm font-semibold text-text-main w-[10%]">Status</th>
    <th className="px-4 py-3 text-center text-sm font-semibold text-text-main w-[15%]">Actions</th>
  </tr>
</thead>

                <tbody className="divide-y divide-[#F4A460]/20">
                  {group.items.map((p) => (
                    <tr
                      key={p._id}
                      className="hover:bg-[#F4A460]/10 transition"
                    >
                      <td className="px-4 py-3">
                        {p.images?.[0] ? (
                          <img
                            src={p.images[0]}
                            alt={p.title}
                            className="w-12 h-12 object-cover rounded-lg border border-[#F4A460]/40"
                          />
                        ) : (
                          <div className="w-12 h-12 flex items-center justify-center text-xs border rounded">
                            N/A
                          </div>
                        )}
                      </td>

                      <td className="px-4 py-3 text-text-main">
                        {p.title}
                      </td>

                      <td className="px-4 py-3 text-text-main">
                        {p.category?.name}
                      </td>

                      <td className="px-4 py-3 text-text-main">
                        {p.price}
                      </td>

                      <td className="px-4 py-3 text-text-main">
                        {p.stock}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            p.status === "active"
                              ? "bg-primary/20 text-primary"
                              : "bg-danger/20 text-danger"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-center space-x-2">
                        <button
                          onClick={() => handleEdit(p)}
                          className="px-3 py-1 text-sm border border-primary text-primary rounded hover:bg-primary/10 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p)}
                          className="px-3 py-1 text-sm border border-danger text-danger rounded hover:bg-danger/10 transition"
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
        ))}
      </div>
    </div>
  );
}
