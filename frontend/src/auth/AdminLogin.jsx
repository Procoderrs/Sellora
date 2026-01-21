import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
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
      const { data } = await api.post("/authentication/login", form); // backend login endpoint
      login(data);
      console.log(data);

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
    <div className="min-h-screen flex bg-gray-100">
      <div className="flex w-full md:w-1/2 justify-center items-center p-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-10 w-full max-w-md space-y-6"
        >
          <h1 className="text-2xl font-bold text-center">Login</h1>

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => onChangeField("email", e.target.value)}
            className={`w-full p-3 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => onChangeField("password", e.target.value)}
            className={`w-full p-3 border rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}

          <button
            disabled={!isFormValid}
            className={`w-full py-2 text-white rounded ${
              isFormValid ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-500 cursor-not-allowed"
            }`}
          >
            Login
          </button>

          <p className="text-center text-sm">
            New user? <a href="/signup" className="text-blue-600">Signup</a>
          </p>
        </form>
      </div>
    </div>
  );
}
