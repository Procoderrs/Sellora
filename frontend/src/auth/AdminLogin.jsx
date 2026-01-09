import { useState } from "react";
import api from "../api/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const isValidEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

 const handleSubmit = async (e) => {
  e.preventDefault();

  // Reset errors
  setEmailError("");
  setPasswordError("");

  // Frontend validation
  if (!email.trim()) {
    setEmailError("Email is required");
    return;
  }

  if (!isValidEmail(email)) {
    setEmailError("Please enter a valid email address");
    return;
  }

  if (!password.trim()) {
    setPasswordError("Password is required");
    return;
  }

  if (password.length < 6) {
    setPasswordError("Password must be at least 6 characters");
    return;
  }

  setLoading(true);

  try {
  console.log("Sending login:", { email: email.trim(), password: password.trim() });
  const res = await api.post("/login", { email: email.trim(), password: password.trim() });
  console.log("Login response:", res.data);
  login(res.data);
  navigate("/");
} 
 catch (err) {
    const message =
      err.response?.data?.message || "Login failed";

    // Backend-driven error handling
    if (message.toLowerCase().includes("email")) {
      setEmailError(message);
    } else if (message.toLowerCase().includes("password")) {
      setPasswordError(message);
    } else {
      setPasswordError("Invalid email or password");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f5dc] to-[#e0cda9]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-96 flex flex-col"
      >
        <h2 className="text-3xl font-bold mb-6 text-[#A0522D] text-center">
          Admin Login
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2
            ${
              emailError
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-[#F4A460]"
            }`}
        />
        {emailError && (
          <p className="text-red-500 text-sm mt-1">{emailError}</p>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full mt-4 border rounded-lg p-3 focus:outline-none focus:ring-2
            ${
              passwordError
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-[#F4A460]"
            }`}
        />
        {passwordError && (
          <p className="text-red-500 text-sm mt-1">{passwordError}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`mt-6 w-full text-white font-semibold py-3 rounded-lg shadow-md transition-all
            ${
              loading
                ? "bg-[#F4A460] cursor-not-allowed"
                : "bg-[#A0522D] hover:bg-[#8B4513]"
            }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-xs text-gray-500 mt-4 text-center">
          &copy; {new Date().getFullYear()} Admin Panel
        </p>
      </form>
    </div>
  );
}
