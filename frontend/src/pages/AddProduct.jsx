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

  const [images, setImages] = useState(Array(5).fill(null));
  const [previews, setPreviews] = useState(Array(5).fill(null));

  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.get("/admin/categories/category-tree").then(res => {
      setParents(res.data.categories || []);
    });
  }, []);

  useEffect(() => {
    if (editingProduct && parents.length) {
      setTitle(editingProduct.title);
      setDescription(editingProduct.description);
      setPrice(editingProduct.price);
      setDiscount(editingProduct.discount || 0);
      setStock(editingProduct.stock);
      setStatus(editingProduct.status || "active");

      if (editingProduct.category?.parent) {
        setParentId(editingProduct.category.parent._id);
        const parent = parents.find(p => p._id === editingProduct.category.parent._id);
        setSubcategories(parent?.subcategories || []);
        setSubcategoryId(editingProduct.category._id);
      } else if (editingProduct.category) {
        setSubcategoryId(editingProduct.category._id);
      }

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

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!price || Number(price) <= 0) newErrors.price = "Price must be greater than 0";
    if (!stock || Number(stock) < 0) newErrors.stock = "Stock must be 0 or more";
    if (!subcategoryId) newErrors.subcategoryId = "Please select a subcategory";

    if (!editingProduct && images.some(img => !img)) {
      newErrors.images = "All 5 images are required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("stock", stock);
    formData.append("status", status);
    formData.append("category", subcategoryId);

    images.forEach(img => img && formData.append("images", img));

    try {
      setLoading(true);
      if (editingProduct) {
        await api.put(`/admin/products/${editingProduct._id}`, formData);
      } else {
        await api.post("/admin/products", formData);
      }
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] p-10">
      <h1 className="text-3xl font-bold text-[#A0522D] mb-8 text-center">
        {editingProduct ? "Edit Product" : "Add New Product"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-6xl mx-auto space-y-6"
      >
        {/* SMALL FIELDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#3B2F2F] mb-1">Title</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Product Title"
              className={`border rounded-lg px-4 py-2 w-full focus:ring-2 ${
                errors.title ? "border-red-500 focus:ring-red-400" : "focus:ring-[#F4A460]"
              }`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3B2F2F] mb-1">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={e => setStock(e.target.value)}
              placeholder="Stock"
              className={`border rounded-lg px-4 py-2 w-full focus:ring-2 ${
                errors.stock ? "border-red-500 focus:ring-red-400" : "focus:ring-[#F4A460]"
              }`}
            />
            {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3B2F2F] mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="Price"
              className={`border rounded-lg px-4 py-2 w-full focus:ring-2 ${
                errors.price ? "border-red-500 focus:ring-red-400" : "focus:ring-[#F4A460]"
              }`}
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3B2F2F] mb-1">Discount</label>
            <input
              type="number"
              value={discount}
              onChange={e => setDiscount(e.target.value)}
              placeholder="Discount"
              className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-[#F4A460]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3B2F2F] mb-1">Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-[#F4A460]"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* CATEGORY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#3B2F2F] mb-1">Parent Category</label>
            <select
              value={parentId}
              onChange={e => handleParentChange(e.target.value)}
              className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-[#F4A460]"
            >
              <option value="">Select Parent Category</option>
              {parents.map(p => (
                <option key={p._id} value={p._id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3B2F2F] mb-1">Subcategory</label>
            <select
              value={subcategoryId}
              onChange={e => setSubcategoryId(e.target.value)}
              className={`border rounded-lg px-4 py-2 w-full focus:ring-2 ${
                errors.subcategoryId ? "border-red-500 focus:ring-red-400" : "focus:ring-[#F4A460]"
              }`}
            >
              <option value="">Select Subcategory</option>
              {subcategories.map(sc => (
                <option key={sc._id} value={sc._id}>{sc.name}</option>
              ))}
            </select>
            {errors.subcategoryId && <p className="text-red-500 text-sm mt-1">{errors.subcategoryId}</p>}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium text-[#3B2F2F] mb-1">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Product Description"
            rows={5}
            className={`w-full border rounded-lg px-4 py-3 focus:ring-2 ${
              errors.description ? "border-red-500 focus:ring-red-400" : "focus:ring-[#F4A460]"
            }`}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* IMAGES */}
        <div>
          <label className="block text-sm font-medium text-[#3B2F2F] mb-2">Product Images (Exactly 5)</label>
          {errors.images && <p className="text-red-500 text-sm mb-2">{errors.images}</p>}
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

        {/* ACTION BUTTONS */}
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
