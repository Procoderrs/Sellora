import { useEffect, useState } from "react";
import api from "../api/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin/users");
        setUsers(res.data.users);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p className="p-6 text-text-main">Loading users...</p>;
  }

  return (
    <div className="min-h-screen p-8 bg-background font-lg font-smoooch">
      <div className="max-w-6xl mx-auto bg-background border border-border rounded-2xl shadow-sm p-8">
        <h2 className="text-3xl font-bold text-primary mb-6">
          Users Management
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#F4A460]/20 bg-background rounded-2xl">
            <thead className="bg-[#F4A460]/30">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-text-main">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-text-main">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-text-main">Role</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-text-main">User ID</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#F4A460]/20">
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`hover:bg-[#F4A460]/10 transition`}
                >
                  <td className="px-4 py-3 font-medium text-text-main">{user.name}</td>
                  <td className="px-4 py-3 text-text-main">{user.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        user.role === "admin"
                          ? "bg-accent text-primary"
                          : "bg-[#A0522D]/20 text-[#A0522D]"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-main opacity-70">{user._id}</td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
