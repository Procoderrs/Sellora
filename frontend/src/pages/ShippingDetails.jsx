import { useState } from "react";

export default function ShippingDetails({ onSubmit }) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Pakistan",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const temp = {};
    if (!form.fullName) temp.fullName = "Full name is required";
    if (!form.phone) temp.phone = "Phone number is required";
    if (!form.address) temp.address = "Address is required";
    if (!form.city) temp.city = "City is required";
    if (!form.postalCode) temp.postalCode = "Postal code is required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit(form); // parent will handle next step
  };

  return (
    <section className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-[#3B2F2F] mb-6">
        Shipping Details
      </h2>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Full Name
          </label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#A0522D]"
            placeholder="John Doe"
          />
          {errors.fullName && (
            <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Phone Number
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#A0522D]"
            placeholder="+92 3XX XXXXXXX"
          />
          {errors.phone && (
            <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Street Address
          </label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            rows="3"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#A0522D]"
            placeholder="House #, Street, Area"
          />
          {errors.address && (
            <p className="text-sm text-red-600 mt-1">{errors.address}</p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium mb-1">
            City
          </label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#A0522D]"
            placeholder="Lahore"
          />
          {errors.city && (
            <p className="text-sm text-red-600 mt-1">{errors.city}</p>
          )}
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium mb-1">
            State / Province
          </label>
          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#A0522D]"
            placeholder="Punjab"
          />
        </div>

        {/* Postal Code */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Postal Code
          </label>
          <input
            name="postalCode"
            value={form.postalCode}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#A0522D]"
            placeholder="54000"
          />
          {errors.postalCode && (
            <p className="text-sm text-red-600 mt-1">{errors.postalCode}</p>
          )}
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Country
          </label>
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#A0522D]"
          >
            <option>Pakistan</option>
            <option>India</option>
            <option>UAE</option>
          </select>
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-[#A0522D] text-white py-3 rounded-lg
              font-semibold hover:bg-[#8B4513] transition"
          >
            Continue to Payment
          </button>
        </div>
      </form>
    </section>
  );
}
