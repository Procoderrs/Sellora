import React, { useEffect, useState } from 'react'
import api from '../api/api'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {

  const COLORS = ["#A0522D", "#F4A460", "#E35336"];


  const [categoryStats, setCategoryStats] = useState([]);

  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    orders: 0,
    customers:0,
    revenue: 0,
  })

  useEffect(() => {
   const fetchStats = async () => {
  try {
    const products = await api.get("/admin/products");
    const categories = await api.get("/admin/categories");
    const ordersRes = await api.get("/admin/orders");
    const customers = await api.get("/admin/users");
    const dashboardStats = await api.get("/admin/dashboard/stats")
    console.log(dashboardStats);;

    const orders = ordersRes.data.orders;

    const totalRevenue = orders
      .filter(order => order.paymentStatus === "paid")
      .reduce((sum, order) => sum + order.totalAmount, 0);

    setStats({
      products: products.data.products.length,
      categories: categories.data.categories.length,
      orders: orders.length,
      customers: customers.data.users.length,
      revenue: totalRevenue,
    });

   setCategoryStats([
  { name: "Women", value: dashboardStats.data.women },
  { name: "Men", value: dashboardStats.data.men },
  { name: "Kids", value: dashboardStats.data.kids },
]);
  } catch (error) {
    console.log(error);
  }
};

    fetchStats()
  }, [])


 if (!categoryStats.length) {
  return <p>Loading chart...</p>;
} 


  return (
    <div className="min-h-screen bg-[#F5F5DC] p-8">
      <h1 className="text-5xl md:text-6xl font-extrabold text-[#3B2F2F] mb-12 tracking-tight">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Products Card */}
        <div className="relative rounded-2xl shadow-lg p-8 hover:shadow-2xl transition overflow-hidden
                        bg-gradient-to-br from-[#F4A460]/80 to-[#F4A460]/50 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Products</h2>
              <p className="text-6xl font-extrabold mt-3">{stats.products}</p>
            </div>
            <div className="bg-white/20 p-4 rounded-full shadow-md">
              <img src="/order.png" className="w-12 h-12" alt="products" />
            </div>
          </div>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        {/* Categories Card */}
        <div className="relative rounded-2xl shadow-lg p-8 hover:shadow-2xl transition overflow-hidden
                        bg-gradient-to-br from-[#A0522D]/80 to-[#A0522D]/50 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Categories</h2>
              <p className="text-6xl font-extrabold mt-3">{stats.categories}</p>
            </div>
            <div className="bg-white/20 p-4 rounded-full shadow-md">
              <img src="/apps.png" className="w-12 h-12" alt="categories" />
            </div>
          </div>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        {/* Orders Card */}
        <div className="relative rounded-2xl shadow-lg p-8 hover:shadow-2xl transition overflow-hidden
                        bg-gradient-to-br from-[#E35336]/80 to-[#E35336]/50 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Orders</h2>
              <p className="text-6xl font-extrabold mt-3">{stats.orders}</p>
            </div>
            <div className="bg-white/20 p-4 rounded-full shadow-md">
              <img src="/package.png" className="w-12 h-12" alt="orders" />
            </div>
          </div>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>
{/* Customers */}
  <div className="relative rounded-2xl shadow-lg p-8 hover:shadow-2xl transition overflow-hidden
                        bg-gradient-to-br from-[#3b2f2f]/80 to-[#3b2f2f] text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Customers</h2>
              <p className="text-6xl font-extrabold mt-3">{stats.customers}</p>
            </div>
            <div className="bg-white/20 p-4 rounded-full shadow-md">
              <img src="/package.png" className="w-12 h-12" alt="orders" />
            </div>
          </div>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>
{/* Revenue Card */}
<div
  className="relative rounded-2xl shadow-lg p-8 hover:shadow-2xl transition overflow-hidden
             bg-gradient-to-br from-[#A0522D]/90 to-[#F4A460]/70 text-white"
>
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-xl font-semibold">Total Revenue</h2>
      <p className="text-5xl font-extrabold mt-3">
  $ {(stats.revenue || 0).toLocaleString()}
</p>
    </div>
    <div className="bg-white/20 p-4 rounded-full shadow-md">
      <img src="/money.png" className="w-12 h-12" alt="revenue" />
    </div>
  </div>

  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
</div>

{/* chart */}

{/* Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:col-span-2">
          <h2 className="text-xl font-bold mb-4 text-[#3B2F2F]">
            Products by Category
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryStats}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {categoryStats.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>


      </div>
    </div>
  )
}
