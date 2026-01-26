import { useEffect, useState } from "react";
import api from "../api/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin/users");
        console.log(res);
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
    return (
      <p className="text-center mt-10 text-[#3B2F2F]">
        Loading users...
      </p>
    );
  }

  return (
    <section
      className="min-h-screen px-10 py-12"
      style={{ backgroundColor: "#F5F5DC" }}
    >
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: "#3B2F2F" }}
        >
          Users Management
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ backgroundColor: "#A0522D", color: "white" }}>
                <th className="text-left px-4 py-3">Name</th>
                <th className="text-left px-4 py-3">Email</th>
                <th className="text-left px-4 py-3">Role</th>
                <th className="text-left px-4 py-3">User ID</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-b"
                  style={{
                    backgroundColor:
                      index % 2 === 0 ? "#F5F5DC" : "white",
                    color: "#3B2F2F",
                  }}
                >
                  <td className="px-4 py-3 font-medium">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className="px-3 py-1 rounded-full text-sm font-semibold"
                      style={{
                        backgroundColor:
                          user.role === "admin"
                            ? "#F4A460"
                            : "#A0522D",
                        color: "white",
                      }}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm opacity-70">
                    {user._id}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <p className="text-center mt-6 text-[#3B2F2F]">
              No users found
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
