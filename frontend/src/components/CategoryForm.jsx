import { useState, useEffect } from "react";
import api from "../api/api";

export default function CategoryForm({ topCategories = [], selected = null, onClose, onSuccess }) {
  const [name, setName] = useState(selected?.name || "");
  const [parent, setParent] = useState(selected?.parent?._id || "");
  const [status, setStatus] = useState(selected?.status || "active");
  const [description, setDescription] = useState(selected?.description || "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (selected) {
      setName(selected.name);
      setParent(selected.parent?._id || "");
      setStatus(selected.status);
      setDescription(selected.description || "");
    }
  }, [selected]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!parent) {
      setError("parent category not selected");
      return;
    }
    if (!name.trim()) return alert("Category name is required");

    try {
      const payload = { name, parent: parent || null, status, description };
      if (selected) await api.put(`/admin/categories/${selected._id}`, payload);
      else await api.post("/admin/categories", payload);
      setError("");
      onSuccess();
      onClose();
    } catch (err) {
      console.log(err.response?.data || err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-96 p-6 rounded-xl shadow-xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-[#A0522D]">
          {selected ? "Edit Category" : "Add Category"}
        </h2>

        {error && (
          <p className="text-sm text-[#E35336] bg-[#E35336]/10 px-3 py-2 rounded">
            {error}
          </p>
        )}

        {/* Parent Category */}
        <div>
          <label className="block mb-1 font-medium text-[#3B2F2F]">
            Parent Category
          </label>
          <select
            value={parent}
            onChange={(e) => setParent(e.target.value)}
            className="w-full border border-[#F4A460]/60 rounded-lg px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-[#F4A460]"
          >
            <option value="">— Main Category —</option>
            {topCategories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-[#3B2F2F]/70 mt-1">
            Leave empty if this is a main category
          </p>
        </div>

        {/* Category Name */}
        <div>
          <label className="block mb-1 font-medium text-[#3B2F2F]">
            Category Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-[#F4A460]/60 rounded-lg px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-[#F4A460]"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium text-[#3B2F2F]">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-[#F4A460]/60 rounded-lg px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-[#F4A460]"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1 font-medium text-[#3B2F2F]">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-[#F4A460]/60 rounded-lg px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-[#F4A460]"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[#A0522D]/40
                       text-[#A0522D] hover:bg-[#A0522D]/10 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#A0522D]
                       text-[#F5F5DC] hover:bg-[#8B4513] transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
