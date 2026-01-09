import { useState } from "react";
import api from '../api/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // ✅ loading state
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // start "logging in" state

    try {
      console.log("Sending login request..."); // ✅ log request start
      const res = await api.post('/login', { email, password });
      
      console.log("Login response received:", res.data); // ✅ log response
      login(res.data);
      
      setLoading(false); // stop loading
      navigate('/');
    } catch (error) {
      setLoading(false); // stop loading
      setError('Invalid credentials');
      console.error("Login error:", error.response?.data || error); // ✅ detailed log
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

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center font-medium">{error}</p>
        )}

        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#F4A460] transition"
        />

        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-[#F4A460] transition"
        />

        <button 
          type="submit"
          disabled={loading} // ✅ disable button while loading
          className={`w-full text-white font-semibold py-3 rounded-lg shadow-md transition-all
            ${loading ? 'bg-[#F4A460] cursor-not-allowed' : 'bg-[#A0522D] hover:bg-[#8B4513]'}`}
        >
          {loading ? "Logging in..." : "Login"} {/* ✅ show "Logging in..." */}
        </button>

        <p className="text-xs text-gray-500 mt-4 text-center">
          &copy; {new Date().getFullYear()} Admin Panel
        </p>
      </form>
    </div>
  );
}
