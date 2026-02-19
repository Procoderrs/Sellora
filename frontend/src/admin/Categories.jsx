import { useEffect, useState } from "react";
import api from "../api/api";
import CategoryForm from "./CategoryForm";
import ConfirmDelete from "./ConfirmDelete";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);

  const fetchCategories = async () => {
    const res = await api.get("/admin/categories");
    const all = res.data.categories;

    // Parent categories
    setParentCategories(all.filter((c) => c.parent === null));
setCategories(all.filter((c) => c.parent !== null));

  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (cat) => {
    setEditingCategory(cat);
    setShowForm(true);
  };

  const handleDelete = (cat) => {
    setDeletingCategory(cat);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingCategory(null);
    fetchCategories();
  };

  const handleDeleteConfirmed = async () => {
    if (!deletingCategory) return;
    await api.delete(`/admin/categories/${deletingCategory._id}`);
    setDeletingCategory(null);
    fetchCategories();
  };

  // Group categories by parent
  const shelves = parentCategories.map((parent) => ({
    parent,
    children: categories.filter((c) => c.parent?._id === parent._id),
  }));

  return (
    <div className="min-h-screen font-smoooch bg-background p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-primary">
          Category Management
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-accent text-lg  text-text-main px-5 py-2 rounded-lg shadow hover:bg-accent/90 transition"
        >
          + Add Category
        </button>
      </div>

      {/* CATEGORY FORM */}
      {showForm && (
        <CategoryForm
          topCategories={parentCategories}
          selected={editingCategory}
          onClose={() => {
            setShowForm(false);
            setEditingCategory(null);
          }}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* DELETE CONFIRM */}
      {deletingCategory && (
        <ConfirmDelete
          categoryName={deletingCategory.name}
          onCancel={() => setDeletingCategory(null)}
          onConfirm={handleDeleteConfirmed}
        />
      )}

      {/* Shelves */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {shelves.map((shelf) => (
          <div
  key={shelf.parent._id}
  className="bg-background rounded-2xl border border-border
  shadow-sm hover:shadow-md transition p-6"
>
            <h3 className="text-xl font-bold text-text-main mb-4">
              {shelf.parent.name}
            </h3>
            {shelf.children.length === 0 ? (
              <p className="text-gray-500">No subcategories</p>
            ) : (
              <div className="space-y-3">
                {shelf.children.map((child,i) => (
                  <div
                    key={child._id}
                    className="flex justify-between items-center p-3 bg-[#F4A460]/20 rounded-lg hover:bg-[#F4A460]/30 transition"
                  >
                    <span className="text-[#3B2F2F] font-medium"><span className="text-gray-300">{i+1}</span> {child.name}</span>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEdit(child)}
                        className="px-2 py-1 text-sm text-[#A0522D] border border-[#A0522D] rounded hover:bg-[#A0522D]/10 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(child)}
                        className="px-2 py-1 text-sm text-[#E35336] border border-[#E35336] rounded hover:bg-[#E35336]/10 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
