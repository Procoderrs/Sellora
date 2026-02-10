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
    onSubmit(form);
  };

  return (
    <section className="min-h-screen bg-background flex items-center justify-center px-4 py-12 font-Inter">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-lg overflow-hidden grid md:grid-cols-2">

        {/* LEFT IMAGE */}
        <div className="hidden md:flex items-center justify-center bg-sidebar p-10">
          <img
            src="/box-3.png"
            alt="Shipping illustration"
            className="max-w-sm w-full object-contain"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="p-8 sm:p-12">
          <h2 className="text-3xl font-playfair text-text-main mb-2">
            Shipping Details
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Please enter your delivery information
          </p>

          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-6">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full p-3 rounded-xl border border-border
                           focus:ring-2 focus:ring-primary focus:border-primary"
              />
              {errors.fullName && (
                <p className="text-xs text-danger mt-1">{errors.fullName}</p>
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
                placeholder="+92 3XX XXXXXXX"
                className="w-full p-3 rounded-xl border border-border
                           focus:ring-2 focus:ring-primary focus:border-primary"
              />
              {errors.phone && (
                <p className="text-xs text-danger mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Street Address
              </label>
              <textarea
                name="address"
                rows="3"
                value={form.address}
                onChange={handleChange}
                placeholder="House #, Street, Area"
                className="w-full p-3 rounded-xl border border-border
                           focus:ring-2 focus:ring-primary focus:border-primary"
              />
              {errors.address && (
                <p className="text-xs text-danger mt-1">{errors.address}</p>
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
                placeholder="Lahore"
                className="w-full p-3 rounded-xl border border-border
                           focus:ring-2 focus:ring-primary focus:border-primary"
              />
              {errors.city && (
                <p className="text-xs text-danger mt-1">{errors.city}</p>
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
                placeholder="Punjab"
                className="w-full p-3 rounded-xl border border-border
                           focus:ring-2 focus:ring-primary focus:border-primary"
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
                placeholder="54000"
                className="w-full p-3 rounded-xl border border-border
                           focus:ring-2 focus:ring-primary focus:border-primary"
              />
              {errors.postalCode && (
                <p className="text-xs text-danger mt-1">{errors.postalCode}</p>
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
                className="w-full p-3 rounded-xl border border-border
                           focus:ring-2 focus:ring-primary focus:border-primary bg-white"
              >
                <option>Pakistan</option>
                <option>India</option>
                <option>UAE</option>
              </select>
            </div>

            {/* Submit */}
            <div className="sm:col-span-2 pt-4">
              <button
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-xl
                           font-semibold hover:bg-[#8B4513] transition"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
