import React, { useEffect, useState, useMemo } from 'react';
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
        {data.map((_, index) => (
          <Cell key={index} fill={colors[index % colors.length]} />
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

export default function Dashboard() {
  const COLORS = ["#A0522D", "#F4A460", "#E35336"];
  const CARD_COLORS = {
    products: ["#A0522D", "#F4A460"],
    categories: ["#F4A460", "#A0522D"],
    orders: ["#E35336", "#F4A460"],
    customers: ["#A0522D", "#E35336"],
    revenue: ["#F4A460", "#A0522D"],
  };

  const [dashboardData, setDashboardData] = useState({
    stats: { products: 0, categories: 0, orders: 0, customers: 0, revenue: 0 },
    categoryStats: [],
    topProducts: [],
    topCustomers: [],
    recentOrders: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [
          productsRes,
          categoriesRes,
          ordersRes,
          customersRes,
          dashboardStatsRes,
          topProductsRes,
          topCustomerRes
        ] = await Promise.all([
          api.get("/admin/products"),
          api.get("/admin/categories"),
          api.get("/admin/orders"),
          api.get("/admin/users"),
          api.get("/admin/dashboard/stats"),
          api.get("/admin/dashboard/top-products"),
          api.get("/admin/dashboard/top-customer")
        ]);

        const totalRevenue = ordersRes.data.orders
          .filter(order => order.paymentStatus === "paid")
          .reduce((sum, order) => sum + order.totalAmount, 0);

        setDashboardData({
          stats: {
            products: productsRes.data.products.length,
            categories: categoriesRes.data.categories.length,
            orders: ordersRes.data.orders.length,
            customers: customersRes.data.users.length,
            revenue: totalRevenue,
          },
          categoryStats: [
            { name: "Coffee", value: dashboardStatsRes.data.coffee },
            { name: "Cupcake", value: dashboardStatsRes.data.cupcake },
            { name: "Cake", value: dashboardStatsRes.data.cake },
            { name: "Brownie", value: dashboardStatsRes.data.brownie },
          ],
          topProducts: topProductsRes.data.slice(0, 10), // limit top 10
          topCustomers: topCustomerRes.data.slice(0, 10),
          recentOrders: ordersRes.data.orders.slice(0, 5),
        });

        setLoading(false);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading dashboard...</p>;

  const { stats, categoryStats, topProducts, topCustomers, recentOrders } = dashboardData;

  const StatCard = React.memo(({ title, value, icon, fromColor, toColor }) => (
    <div
      className="relative rounded-2xl shadow-lg p-8 hover:shadow-2xl transition overflow-hidden text-white"
      style={{ background: `linear-gradient(135deg, ${fromColor} 0%, ${toColor} 100%)` }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-5xl font-extrabold mt-3">{value}</p>
        </div>
        <div className="bg-white/20 p-4 rounded-full shadow-md">
          <img src={icon} className="w-12 h-12" alt={title} />
        </div>
      </div>
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  ));

  return (
    <div className="min-h-screen bg-[#F5F5DC] font-Inter p-8">
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
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-[#3B2F2F]">Products by Category</h2>
          <MemoPieChart data={categoryStats} colors={COLORS} />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-[#3B2F2F]">Top Selling Products</h2>
          <MemoBarChart data={topProducts} />
        </div>
      </div>

      {/* Top Customers */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 overflow-x-auto">
        <h2 className="text-xl font-bold mb-4 text-[#3B2F2F]">Top Customers</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#F5F5DC] text-left text-sm text-[#3B2F2F]">
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3 text-right">Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {topCustomers.map((user, idx) => (
              <tr key={user._id} className="border-b text-sm hover:bg-[#FAF8F2]">
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
      <div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto">
        <h2 className="text-xl font-bold mb-4 text-[#3B2F2F]">Recent Orders</h2>
        <table className="w-full border-collapse min-w-full table-fixed">
          <thead>
            <tr className="bg-[#F5F5DC] text-sm text-[#3B2F2F]">
              <th className="p-3 w-[16%] text-left">Order ID</th>
              <th className="p-3 w-[32%] text-left">Customer</th>
              <th className="p-3 w-[12%] text-left">Amount</th>
              <th className="p-3 w-[12%] text-left">Payment</th>
              <th className="p-3 w-[14%] text-left">Status</th>
              <th className="p-3 w-[14%] text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map(order => (
              <tr key={order._id} className="border-b text-sm hover:bg-[#FAF8F2]">
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
