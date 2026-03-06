import { useContext, useState, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import CategoryForm from "./CategoryForm";
import ConfirmDelete from "./ConfirmDelete";
import api from "../api/api";

  export default function Categories() {
  const { categories: allCategories, parentCategories, loading } = useContext(DataContext);

  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);

  // Local state for categories grouped by parent
  const [childCategories, setChildCategories] = useState([]);

  // Update child categories whenever allCategories from context change
  useEffect(() => {
    if (!loading && allCategories.length) {
      setChildCategories(allCategories.filter((c) => c.parent !== null));
    }
  }, [allCategories, loading]);

  const handleEdit = (cat) => {
    setEditingCategory(cat);
    setShowForm(true);
  };

  const handleDelete = (cat) => {
    setDeletingCategory(cat);
  };

  const handleFormSuccess = async () => {
    setShowForm(false);
    setEditingCategory(null);
    // Optionally refetch categories from API or refresh context
  };

  const handleDeleteConfirmed = async () => {
    if (!deletingCategory) return;
    await api.delete(`/admin/categories/${deletingCategory._id}`);
    setDeletingCategory(null);
    // Optionally refresh context data
  };

  // Group categories by parent
  const shelves = parentCategories.map((parent) => ({
    parent,
    children: childCategories.filter((c) => c.parent?._id === parent._id),
  }));
   return (
  <div className="min-h-screen bg-background p-10">

    {/* Header */}
    <div className="flex justify-between items-center mb-12">
      <div>
        <h2 className="text-4xl font-bold text-primary tracking-tight">
          Category Management
        </h2>
        <p className="text-sm text-muted mt-1">
          Organize bakery products by shelves and subcategories
        </p>
      </div>

      <button
        onClick={() => setShowForm(true)}
        className="bg-accent text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.03] transition font-semibold"
      >
        + Add Category
      </button>
    </div>

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

    {deletingCategory && (
      <ConfirmDelete
        categoryName={deletingCategory.name}
        onCancel={() => setDeletingCategory(null)}
        onConfirm={handleDeleteConfirmed}
      />
    )}

    {/* Shelves Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">

      {shelves.map((shelf) => (
        <div
          key={shelf.parent._id}
          className="
          rounded-3xl
          border border-muted
          bg-white/60
          backdrop-blur-sm
          p-7
          shadow-sm
          hover:shadow-md
          transition
          "
        >

          {/* Parent Category */}
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl font-bold text-text-main">
              {shelf.parent.name}
            </h3>

            <span className="text-xs px-3 py-1 rounded-full bg-accent/20 text-primary font-medium">
              {shelf.children.length} items
            </span>
          </div>

          {shelf.children.length === 0 ? (
            <p className="text-sm text-muted italic">
              No subcategories yet
            </p>
          ) : (
            <div className="space-y-3">

              {shelf.children.map((child, i) => (
                <div
                  key={child._id}
                  className="
                  flex justify-between items-center
                  px-4 py-3
                  rounded-xl
                  border border-muted/50
                  bg-white
                  hover:border-accent
                  hover:shadow-sm
                  transition
                  "
                >

                  {/* Name */}
                  <div className="flex items-center gap-3">

                    <span className="text-xs text-muted w-5">
                      {i + 1}
                    </span>

                    <span className="font-medium text-text-main">
                      {child.name}
                    </span>

                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">

                    <button
                      onClick={() => handleEdit(child)}
                      className="
                      text-sm
                      px-3 py-1
                      rounded-lg
                      bg-accent/15
                      text-primary
                      hover:bg-accent/30
                      transition
                      "
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(child)}
                      className="
                      text-sm
                      px-3 py-1
                      rounded-lg
                      bg-red-100
                      text-red-600
                      hover:bg-red-200
                      transition
                      "
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
