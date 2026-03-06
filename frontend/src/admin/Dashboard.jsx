import React, { useEffect, useState, useMemo } from 'react';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import api from '../api/api';
import {
  PieChart, Pie, Cell, Legend, Tooltip as PieTooltip,
  BarChart, Bar, XAxis, YAxis, Tooltip as BarTooltip, ResponsiveContainer,
} from "recharts";
import Newsletter from './NewsLetter';
// Memoized PieChart
const MemoPieChart = React.memo(({ data, colors }) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie data={data} dataKey="value" nameKey="name" outerRadius={110} label>
        {data.map((item, index) => (
          <Cell key={item.name||index} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <PieTooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
));

// Memoized BarChart
const MemoBarChart = React.memo(({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis allowDecimals={false} />
      <BarTooltip />
      <Bar dataKey="totalSold" fill="#A0522D" />
    </BarChart>
  </ResponsiveContainer>
));

const StatCard = React.memo(({ title, value, icon, fromColor, toColor }) => (
    <div
      className="relative rounded-2xl shadow-lg p-8 hover:shadow-2xl transition overflow-hidden text-white"
      style={{ background: `linear-gradient(135deg, ${fromColor} 0%, ${toColor} 100%)` }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-3xl font-extrabold mt-3">{value}</p>
        </div>
        <div className="bg-white/20 p-4 rounded-full shadow-md">
          <img src={icon} className="w-12 h-12" alt={title} />
        </div>
      </div>
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  ));
export default function Dashboard() {

    const { dashboardData, dashboardLoading,fetchDashboard } = useContext(DataContext);
const {
  stats = {},
  categoryStats = [],
  topProducts = [],
  topCustomers = [],
  recentOrders = []
} = dashboardData || {};

  const COLORS = ["#D2B48C", "#F5DEB3", "#F78F81"];
  const CARD_COLORS = {
    products: ["#D2B48C", "#F5DEB3"],
    categories: ["#F5DEB3", "#D2B48C"],
    orders: ["#F78F81", "#F5DEB3"],
    customers: ["#D2B48C", "#F78F81"],
    revenue: ["#F5DEB3", "#D2B48C"],
  };

  useEffect(()=>{
    fetchDashboard()
  },[])




  if (dashboardLoading) return <p className="text-center mt-8">Loading dashboard...</p>;


  

  return (
    <div className="min-h-screen bg-background font-Inter p-8">
      <h1 className="text-5xl md:text-6xl font-extrabold text-[#3B2F2F] mb-12 tracking-tight">
        Admin Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard title="Products" value={stats.products} icon="/order.png" fromColor={CARD_COLORS.products[0]} toColor={CARD_COLORS.products[1]} />
        <StatCard title="Categories" value={stats.categories} icon="/apps.png" fromColor={CARD_COLORS.categories[0]} toColor={CARD_COLORS.categories[1]} />
        <StatCard title="Orders" value={stats.orders} icon="/package.png" fromColor={CARD_COLORS.orders[0]} toColor={CARD_COLORS.orders[1]} />
        <StatCard title="Customers" value={stats.customers} icon="/users.png" fromColor={CARD_COLORS.customers[0]} toColor={CARD_COLORS.customers[1]} />
        <StatCard title="Revenue" value={`$ ${stats.revenue.toLocaleString()}`} icon="/money.png" fromColor={CARD_COLORS.revenue[0]} toColor={CARD_COLORS.revenue[1]} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-card rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-primary">Products by Category</h2>
          <MemoPieChart data={categoryStats} colors={COLORS} />
        </div>

        <div className="bg-card rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-primary">Top Selling Products</h2>
          <MemoBarChart data={topProducts} />
        </div>
      </div>

      {/* Top Customers */}
      <div className="bg-card rounded-2xl shadow-lg p-6 mb-8 overflow-x-auto">
        <h2 className="text-xl font-bold mb-4 text-primary">Top Customers</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#F5F5DC] text-left text-sm text-primary">
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3 text-right">Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {topCustomers.map((user, idx) => (
              <tr key={user._id || idx} className="border-b text-sm hover:bg-[#FAF8F2]">
                <td className="p-3">{idx + 1}</td>
                <td className="p-3 font-medium">{user.name}</td>
                <td className="p-3 text-gray-600">{user.email}</td>
                <td className="p-3 text-right font-semibold">${user.totalSpent.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Orders */}
      <div className="bg-card rounded-2xl shadow-lg p-6 overflow-x-auto">
        <h2 className="text-xl font-bold mb-4 text-primary">Recent Orders</h2>
        <table className="w-full border-collapse min-w-full table-fixed">
          <thead>
            <tr className="bg-[#F5F5DC] text-sm text-primary">
              <th className="p-3 w-[16%] text-left">Order ID</th>
              <th className="p-3 w-[32%] text-left">Customer</th>
              <th className="p-3 w-[12%] text-left">Amount</th>
              <th className="p-3 w-[12%] text-left">Payment</th>
              <th className="p-3 w-[14%] text-left">Status</th>
              <th className="p-3 w-[14%] text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order,idx) => (
              <tr key={order._id || idx} className="border-b text-sm hover:bg-[#FAF8F2]">
                <td className="p-3 font-mono">{order._id.slice(-6)}</td>
                <td className="p-3">{order.user?.name || "Guest"}</td>
                <td className="p-3 font-semibold">${order.totalAmount.toLocaleString()}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    order.paymentStatus === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    order.status === "delivered" ? "bg-green-100 text-green-700" :
                    order.status === "cancelled" ? "bg-red-100 text-red-700" :
                    "bg-blue-100 text-blue-700"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-3 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Newsletter/>
    </div>
  );
}
