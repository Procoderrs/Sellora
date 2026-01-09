import { useEffect, useState } from "react";
import api from "../api/api";

export default function ProductPage({ selectedProductId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState(0);
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([null, null, null, null, null]); // 5 slots
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
    if (selectedProductId) {
      api.get(`/products/${selectedProductId}`).then(res => {
        const p = res.data;
        setTitle(p.title);
        setDescription(p.description);
        setPrice(p.price);
        setDiscount(p.discount || 0);
        setStock(p.stock);
        setStatus(p.status);
        setSelectedParent(p.category?.parent?._id || "");
        setSelectedSub(p.category?._id || "");

        // Preload images array
        const imgArr = Array(5).fill(null);
        p.images?.forEach((img, i) => { if (i < 5) imgArr[i] = img; });
        setImages(imgArr);

        // set subcategories
        const parent = parents.find(p => p._id === p.category?.parent?._id);
        setSubcategories(parent?.subcategories || []);
      });
    }
  }, [selectedProductId, parents]);

  const handleImageChange = (e, index) => {
    const files = Array.from(e.target.files);
    setImages(prev => {
      const updated = [...prev];
      updated[index] = files[0] || null; // only one file per input
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSub) return alert("Please select a subcategory");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("stock", stock);
    formData.append("category", selectedSub);
    formData.append("status", status);

    images.forEach(img => img && formData.append("images", img));

    try {
      if (selectedProductId) {
        await api.put(`/products/${selectedProductId}`, formData);
      } else {
        await api.post("/products", formData);
      }
      alert("Product saved successfully");
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] p-8">
      <h1 className="text-3xl font-bold text-[#A0522D] mb-6">
        {selectedProductId ? "Edit Product" : "Add Product"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto space-y-4"
      >
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full border rounded px-3 py-2"
        />

        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
          rows={4}
          className="w-full border rounded px-3 py-2"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder="Price"
            className="border rounded px-3 py-2"
          />
          <input
            type="number"
            value={discount}
            onChange={e => setDiscount(e.target.value)}
            placeholder="Discount"
            className="border rounded px-3 py-2"
          />
        </div>

        <input
          type="number"
          value={stock}
          onChange={e => setStock(e.target.value)}
          placeholder="Stock"
          className="w-full border rounded px-3 py-2"
        />

        <select
          value={selectedParent}
          onChange={e => {
            const parentId = e.target.value;
            setSelectedParent(parentId);
            const parent = parents.find(p => p._id === parentId);
            setSubcategories(parent?.subcategories || []);
            setSelectedSub("");
          }}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select Parent</option>
          {parents.map(p => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
        </select>

        <select
          value={selectedSub}
          onChange={e => setSelectedSub(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select Subcategory</option>
          {subcategories.map(sc => (
            <option key={sc._id} value={sc._id}>{sc.name}</option>
          ))}
        </select>

        <div className="grid grid-cols-5 gap-4">
          {images.map((img, i) => (
            <div key={i}>
              <input
                type="file"
                onChange={e => handleImageChange(e, i)}
                className="w-full"
              />
              {typeof img === "string" && (
                <img src={img} alt={`preview-${i}`} className="w-full h-24 object-cover mt-2 rounded" />
              )}
            </div>
          ))}
        </div>

        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button
          type="submit"
          className="bg-[#A0522D] text-white px-6 py-2 rounded-lg"
        >
          Save Product
        </button>
      </form>
    </div>
  );
}
