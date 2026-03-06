import { useEffect, useState } from "react";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

export default function AdminUsers() {
  const {users,usersLoading,fetchUsers}=useContext(DataContext)

  useEffect(()=>{
    fetchUsers();
  },[])
  
  if (usersLoading) {
    return <p className="p-6 text-text-main">Loading users...</p>;
  }

  return (
  <div className="min-h-screen bg-background p-10">

    {/* Header */}
    <div className="mb-10">
      <h2 className="text-4xl font-bold text-primary tracking-tight">
        Users Management
      </h2>
      <p className="text-sm text-muted mt-1">
        Manage customer and admin accounts
      </p>
    </div>

    {/* Table Container */}
    <div className="
      max-w-6xl
      mx-auto
      border border-muted
      rounded-3xl
      bg-white
      shadow-sm
      overflow-hidden
    ">

      <table className="min-w-full">

        {/* Table Head */}
        <thead className="bg-accent/10 border-b border-muted">
          <tr className="text-sm text-primary">
            <th className="px-6 py-4 text-left">User</th>
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-left">Role</th>
            <th className="px-6 py-4 text-left">User ID</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-muted/60">

          {users.map((user) => (

            <tr
              key={user._id}
              className="hover:bg-accent/10 transition"
            >

              {/* User */}
              <td className="px-6 py-4 flex items-center gap-3">

                {/* Avatar */}
                <div className="
                  w-10 h-10
                  rounded-full
                  bg-accent/30
                  flex
                  items-center
                  justify-center
                  font-semibold
                  text-primary
                ">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <span className="font-medium text-text-main">
                  {user.name}
                </span>

              </td>

              {/* Email */}
              <td className="px-6 py-4 text-text-main">
                {user.email}
              </td>

              {/* Role */}
              <td className="px-6 py-4">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    user.role === "admin"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-accent/20 text-primary"
                  }`}
                >
                  {user.role}
                </span>

              </td>

              {/* User ID */}
              <td className="px-6 py-4 text-sm text-muted">
                {user._id}
              </td>

            </tr>

          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-10 text-muted">
                No users found
              </td>
            </tr>
          )}

        </tbody>
      </table>

    </div>

  </div>
);
}
