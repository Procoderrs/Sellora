import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const location = useLocation();

  const editingProduct = location.state?.product || null;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState(0);
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("active");
  const [loading, setLoading] = useState(false);

  const [parents, setParents] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [parentId, setParentId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");

  // exactly 5 images
  const [images, setImages] = useState(Array(5).fill(null));
  const [previews, setPreviews] = useState(Array(5).fill(null));

  // Load categories
  useEffect(() => {
    api.get("/categories/category-tree").then(res => {
      setParents(res.data.categories || []);
    });
  }, []);

  // Preload product data after categories are loaded
  useEffect(() => {
    if (editingProduct && parents.length) {
      setTitle(editingProduct.title);
      setDescription(editingProduct.description);
      setPrice(editingProduct.price);
      setDiscount(editingProduct.discount || 0);
      setStock(editingProduct.stock);
      setStatus(editingProduct.status || "active");

      // Category & subcategory
      if (editingProduct.category?.parent) {
        setParentId(editingProduct.category.parent._id);
        const parent = parents.find(p => p._id === editingProduct.category.parent._id);
        setSubcategories(parent?.subcategories || []);
        setSubcategoryId(editingProduct.category._id);
      } else if (editingProduct.category) {
        setSubcategoryId(editingProduct.category._id);
      }

      // Images previews
      const newPreviews = Array(5).fill(null);
      editingProduct.images?.forEach((img, idx) => {
        if (idx < 5) newPreviews[idx] = img;
      });
      setPreviews(newPreviews);
    }
  }, [editingProduct, parents]);

  const handleParentChange = (id) => {
    setParentId(id);
    const parent = parents.find(p => p._id === id);
    setSubcategories(parent?.subcategories || []);
    setSubcategoryId("");
  };

  const handleImageChange = (index, file) => {
    const updatedImages = [...images];
    updatedImages[index] = file;
    setImages(updatedImages);

    const updatedPreviews = [...previews];
    updatedPreviews[index] = file ? URL.createObjectURL(file) : null;
    setPreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subcategoryId) {
      alert("Please select a subcategory");
      return;
    }

    if (!editingProduct && images.some(img => !img)) {
      alert("Please upload all 5 product images");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("stock", stock);
    formData.append("status", status);
    formData.append("category", subcategoryId);

    images.forEach(img => {
      if (img) formData.append("images", img);
    });

    try {
      setLoading(true);
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, formData);
      } else {
        await api.post("/products", formData);
      }
      navigate("/products");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] p-10">
      <h1 className="text-3xl font-bold text-[#A0522D] mb-8">
        {editingProduct ? "Edit Product" : "Add New Product"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-6xl mx-auto space-y-8"
      >
        {/* BASIC INFO */}
        <div className="grid grid-cols-2 gap-6">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Product Title"
            required
            className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#F4A460]"
          />
          <input
            type="number"
            value={stock}
            onChange={e => setStock(e.target.value)}
            placeholder="Stock"
            required
            className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#F4A460]"
          />
        </div>

        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Product Description"
          rows={4}
          className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#F4A460]"
        />

        {/* PRICE */}
        <div className="grid grid-cols-2 gap-6">
          <input
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder="Price"
            required
            className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#F4A460]"
          />
          <input
            type="number"
            value={discount}
            onChange={e => setDiscount(e.target.value)}
            placeholder="Discount"
            className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#F4A460]"
          />
        </div>

        {/* CATEGORY */}
        <div className="grid grid-cols-2 gap-6">
          <select
            value={parentId}
            onChange={e => handleParentChange(e.target.value)}
            className="border rounded-lg px-4 py-3"
          >
            <option value="">Select Parent Category</option>
            {parents.map(p => (
              <option key={p._id} value={p._id}>{p.name}</option>
            ))}
          </select>

          <select
            value={subcategoryId}
            onChange={e => setSubcategoryId(e.target.value)}
            className="border rounded-lg px-4 py-3"
          >
            <option value="">Select Subcategory</option>
            {subcategories.map(sc => (
              <option key={sc._id} value={sc._id}>{sc.name}</option>
            ))}
          </select>
        </div>

        {/* IMAGES */}
        <div>
          <h3 className="text-lg font-semibold text-[#3B2F2F] mb-3">
            Product Images (Exactly 5)
          </h3>
          <div className="grid grid-cols-5 gap-4">
            {images.map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <label className="w-full h-32 flex items-center justify-center border-2 border-dashed border-[#F4A460] rounded-lg cursor-pointer bg-[#F5F5DC] hover:bg-[#F4A460]/20 transition">
                  {previews[i] ? (
                    <img
                      src={previews[i]}
                      alt={`Preview ${i + 1}`}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <span className="text-[#3B2F2F] text-center px-2">
                      Click to select image {i + 1}
                    </span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    required={!editingProduct}
                    onChange={e => handleImageChange(i, e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* STATUS */}
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="border rounded-lg px-4 py-3 w-64"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        {/* ACTIONS */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="px-6 py-3 rounded-lg border border-[#A0522D]
                       text-[#A0522D] hover:bg-[#A0522D]/10"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-[#A0522D]
                       text-[#F5F5DC] hover:bg-[#8B4513]"
          >
            {loading ? "Saving..." : editingProduct ? "Update Product" : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
