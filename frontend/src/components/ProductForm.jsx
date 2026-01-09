import { useEffect, useState } from "react";
import api from "../api/api";

export default function ProductForm({ selected, onClose, onSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState(0);
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("active");

  const [parents, setParents] = useState([]);
  const [selectedParent, setSelectedParent] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSub, setSelectedSub] = useState("");

  useEffect(() => {
    api.get("/categories/category-tree").then(res => {
      setParents(res.data.categories || []);
    });
  }, []);

  useEffect(() => {
    if (selected) {
      setTitle(selected.title);
      setDescription(selected.description);
      setPrice(selected.price);
      setDiscount(selected.discount || 0);
      setStock(selected.stock);
      setImages([]);
      setStatus(selected.status);

      if (selected.category?.parent) {
        setSelectedParent(selected.category.parent._id);
        const parent = parents.find(p => p._id === selected.category.parent._id);
        const preLoadidSubCategories=parent?.subcategories ||[];
        setSubcategories(parent?.subcategories || []);
        console.log('preloaded sub ctegories', preLoadidSubCategories);
        setSelectedSub(selected.category._id);
        
      }
    }
  }, [selected, parents]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSub) {
      alert("Please select a subcategory");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("stock", stock);
    formData.append("category", selectedSub);
    formData.append("status", status);
    images.forEach(file => formData.append("images", file));

    try {
      if (selected) {
        await api.put(`/products/${selected._id}`, formData);
      } else {
        await api.post("/products", formData);
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err.response?.data || err);
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
          {selected ? "Edit Product" : "Add Product"}
        </h2>

        {/* Title */}
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Product Title"
          className="w-full border border-[#F4A460]/60 rounded-lg px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-[#F4A460]"
        />

        {/* Description */}
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Product Description"
          rows={3}
          className="w-full border border-[#F4A460]/60 rounded-lg px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-[#F4A460]"
        />

        {/* Price & Discount */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder="Price"
            className="w-full border border-[#F4A460]/60 rounded-lg px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-[#F4A460]"
          />
          <input
            type="number"
            value={discount}
            onChange={e => setDiscount(e.target.value)}
            placeholder="Discount"
            className="w-full border border-[#F4A460]/60 rounded-lg px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-[#F4A460]"
          />
        </div>

        {/* Stock */}
        <input
          type="number"
          value={stock}
          onChange={e => setStock(e.target.value)}
          placeholder="Stock"
          className="w-full border border-[#F4A460]/60 rounded-lg px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-[#F4A460]"
        />

        {/* Parent Category */}
        <select
          value={selectedParent}
          onChange={e => {
            const parentId = e.target.value;
            setSelectedParent(parentId);
            const parent = parents.find(p => p._id === parentId);
            setSubcategories(parent?.subcategories || []);
                console.log("Subcategories updated:", newSubcategories); // ✅ console log

            setSelectedSub("");
          }}
          className="w-full border border-[#F4A460]/60 rounded-lg px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-[#F4A460]"
        >
          <option value="">Select Parent Category</option>
          {parents.map(p => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
        </select>

        {/* Subcategory */}
        <select
          value={selectedSub}
          onChange={e => setSelectedSub(e.target.value)}
          className="w-full border border-[#F4A460]/60 rounded-lg px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-[#F4A460]"
        >
          <option value="">
            {subcategories.length ? "Select Subcategory" : "No subcategories"}
          </option>
          {subcategories.map(sc => (
            <option key={sc._id} value={sc._id}>{sc.name}</option>
          ))}
        </select>

        {/* Images */}
        <input
          type="file"
          multiple
          placeholder="choose 5 images"
          onChange={e => setImages(Array.from(e.target.files))}
          className="w-full border border-[#F4A460]/60 rounded-lg px-3 py-2
                     file:mr-3 file:px-3 file:py-1 file:rounded
                     file:border-0 file:bg-[#F4A460]/30 file:text-[#3B2F2F]"
        />

        {/* Status */}
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="w-full border border-[#F4A460]/60 rounded-lg px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-[#F4A460]"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

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
