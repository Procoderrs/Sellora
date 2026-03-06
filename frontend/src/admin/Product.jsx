import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import ConfirmDelete from "./ConfirmDelete";

export default function Products() {
  const navigate = useNavigate();
  const { products, deleteProduct } = useContext(DataContext); // ✅ context
  const [deletingProduct, setDeletingProduct] = useState(null);

  const handleAdd = () => navigate("/admin/product");
  const handleEdit = (product) => navigate("/admin/product", { state: { product } });
  const handleDelete = (product) => setDeletingProduct(product);

  const handleDeleteConfirmed = async () => {
    try {
      if (!deletingProduct) return;
      await deleteProduct(deletingProduct._id);
      setDeletingProduct(null); // hide modal
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // Group by parent category
  const groupedProducts = products.reduce((acc, product) => {
    const parent = product.category?.parent;
    if (!parent) return acc;

    if (!acc[parent._id]) acc[parent._id] = { parent, items: [] };
    acc[parent._id].items.push(product);
    return acc;
  }, {});

  return (
  <div className="min-h-screen bg-background p-10">
    
    {/* Header */}
    <div className="flex justify-between items-center mb-12">
      <div>
        <h2 className="text-4xl font-bold text-primary tracking-tight">
          Product Management
        </h2>
        <p className="text-sm text-muted mt-1">
          Manage all bakery products and inventory
        </p>
      </div>

      <button
        onClick={handleAdd}
        className="bg-accent text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.03] transition font-semibold"
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

    <div className="space-y-10">
      {Object.values(groupedProducts).map(group => (
        <div
          key={group.parent._id}
          className="bg-white/60 border border-muted rounded-3xl shadow-md p-8"
        >
          {/* Category Title */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-text-main">
              {group.parent.name}
            </h3>

            <span className="bg-accent/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {group.items.length} Products
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              
              <thead>
                <tr className="border-b border-muted text-sm text-primary">
                  <th className="py-3">Product</th>
                  <th>Subcategory</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-muted">
                {group.items.map(p => (
                  <tr
                    key={p._id}
                    className="hover:bg-accent/10 transition"
                  >

                    {/* Product */}
                    <td className="py-4 flex items-center gap-4">
                      {p.images?.[0] ? (
                        <img
                          src={p.images[0]}
                          className="w-14 h-14 rounded-xl object-cover shadow-sm"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center text-xs">
                          N/A
                        </div>
                      )}

                      <div>
                        <p className="font-semibold text-text-main">
                          {p.title}
                        </p>
                        {/* <p className="text-xs text-muted">
                          ID: {p._id.slice(-6)}
                        </p> */}
                      </div>
                    </td>

                    {/* Subcategory */}
                    <td className="text-sm text-primary">
                      {p.category?.name}
                    </td>

                    {/* Price */}
                    <td className="font-medium text-text-main">
                      ${p.price}
                    </td>

                    {/* Stock */}
                    <td>
                      <span className="bg-muted px-3 py-1 rounded-full text-sm">
                        {p.stock}
                      </span>
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium
                        ${
                          p.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="text-right space-x-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="px-3 py-1 rounded-lg text-sm bg-accent/20 text-primary hover:bg-accent/30 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(p)}
                        className="px-3 py-1 rounded-lg text-sm bg-red-100 text-red-600 hover:bg-red-200 transition"
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