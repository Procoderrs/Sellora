import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const validate = () => {
    const temp = {};
    if (!form.name) temp.name = "Name is required.";
    if (!form.email) temp.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      temp.email = "Enter a valid email address.";
    if (!form.password) temp.password = "Password is required.";
    else if (form.password.length < 6)
      temp.password = "Password must be at least 6 characters.";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const { data } = await api.post("/authentication/register", form);
      login(data);
      navigate("/");
    } catch (err) {
      alert(err?.response?.data?.message || "Signup failed");
    }
  };

  const onChangeField = (key, value) => {
    setForm({ ...form, [key]: value });
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (value.trim() !== "") delete newErrors[key];
      return newErrors;
    });
  };

  const isFormValid =
    form.name && form.email && form.password && Object.keys(errors).length === 0;

  return (
    <div className="relative min-h-screen flex items-center justify-center">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

      {/* SIGNUP FORM */}
      <div className="relative z-10 w-full px-4 sm:px-0 sm:w-[440px]">
        <form
          onSubmit={handleSubmit}
          className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8 sm:p-10 space-y-6"
        >
          <h1 className="text-3xl font-extrabold text-center text-[#3B2F2F]">
            Customer Signup
          </h1>

          {/* NAME */}
          <div>
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => onChangeField("name", e.target.value)}
              className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 transition
                ${
                  errors.name
                    ? "border-[#E35336] ring-[#E35336]"
                    : "border-[#A0522D] ring-[#A0522D]"
                }`}
            />
            {errors.name && (
              <p className="text-sm mt-1 text-[#E35336]">
                {errors.name}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => onChangeField("email", e.target.value)}
              className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 transition
                ${
                  errors.email
                    ? "border-[#E35336] ring-[#E35336]"
                    : "border-[#A0522D] ring-[#A0522D]"
                }`}
            />
            {errors.email && (
              <p className="text-sm mt-1 text-[#E35336]">
                {errors.email}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => onChangeField("password", e.target.value)}
              className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 transition
                ${
                  errors.password
                    ? "border-[#E35336] ring-[#E35336]"
                    : "border-[#A0522D] ring-[#A0522D]"
                }`}
            />
            {errors.password && (
              <p className="text-sm mt-1 text-[#E35336]">
                {errors.password}
              </p>
            )}
          </div>

          {/* SUBMIT */}
          <button
            disabled={!isFormValid}
            className={`w-full py-3 rounded-xl font-bold text-lg text-white transition
              ${
                isFormValid
                  ? "bg-[#A0522D] hover:bg-[#F4A460]"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            Signup
          </button>

          {/* FOOTER */}
          <p className="text-center text-sm text-[#3B2F2F]">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-[#F4A460] hover:underline"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
