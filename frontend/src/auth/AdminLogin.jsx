import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const { login } = useContext(AuthContext);

  const validate = () => {
    const temp = {};
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
      const { data } = await api.post("/authentication/login", form);
      login(data);
      navigate(from);

      // Redirect based on role
      if (data.user.role === "admin") navigate("/admin/dashboard");
      else navigate("/");
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
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
    form.email && form.password && Object.keys(errors).length === 0;

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#F5F5DC" }}
    >
      <div className="w-full md:w-1/2 p-8">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl shadow-2xl p-10 w-full max-w-md space-y-6"
          style={{ backgroundColor: "#fff" }}
        >
          <h1
            className="text-3xl font-extrabold text-center mb-6"
            style={{ color: "#3B2F2F" }}
          >
            Login
          </h1>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => onChangeField("email", e.target.value)}
            className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all ${
              errors.email
                ? "border-[#E35336] ring-[#E35336]"
                : "border-[#A0522D] ring-[#A0522D]"
            }`}
          />
          {errors.email && (
            <p className="text-sm font-medium" style={{ color: "#E35336" }}>
              {errors.email}
            </p>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => onChangeField("password", e.target.value)}
            className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all ${
              errors.password
                ? "border-[#E35336] ring-[#E35336]"
                : "border-[#A0522D] ring-[#A0522D]"
            }`}
          />
          {errors.password && (
            <p className="text-sm font-medium" style={{ color: "#E35336" }}>
              {errors.password}
            </p>
          )}

          {/* Submit */}
          <button
            disabled={!isFormValid}
            className={`w-full py-3 rounded-xl font-bold text-white text-lg transition-all ${
              isFormValid
                ? "bg-[#A0522D] hover:bg-[#F4A460] shadow-md hover:shadow-lg"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Login
          </button>

          {/* Footer */}
          <p
            className="text-center text-sm mt-4"
            style={{ color: "#3B2F2F" }}
          >
            New user?{" "}
            <a
              href="/signup"
              className="font-semibold hover:underline"
              style={{ color: "#F4A460" }}
            >
              Signup
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
