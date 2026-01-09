import { useState } from "react";
import api from '../api/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', { email, password });
      login(res.data);
      console.log(res.data);
      navigate('/');
    } catch (error) {
      setError('Invalid credentials');
      console.log(error, 'msg from admin login');
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
          className="w-full bg-[#A0522D] hover:bg-[#8B4513] text-white font-semibold py-3 rounded-lg shadow-md transition-all"
        >
          Login
        </button>

        <p className="text-xs text-gray-500 mt-4 text-center">
          &copy; {new Date().getFullYear()} Admin Panel
        </p>
      </form>
    </div>
  );
}
