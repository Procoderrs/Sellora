import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
export default function Topbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="h-16 bg-gray-100 flex items-center justify-between px-6 shadow">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <button
        className="bg-red-500 text-white px-4 py-1 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
