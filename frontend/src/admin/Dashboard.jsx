import React, { useEffect, useState } from 'react'
import api from '../api/api'
import {PieChart,Pie,Cell,Legend} from "recharts";
import {BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer,} from "recharts";


export default function Dashboard() {

  const COLORS = ["#A0522D", "#F4A460", "#E35336"];


  const [categoryStats, setCategoryStats] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [topCustomers,setTopCustomers]=useState([])
  const [recentOrders,setRecentOrders]=useState([])


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
const topProductsRes = await api.get("/admin/dashboard/top-products");
setTopProducts(topProductsRes.data);

const topCustomerRes=await api.get('/admin/dashboard/top-customer');
    setTopCustomers(topCustomerRes.data)
    console.log(dashboardStats);;

    const orders = ordersRes.data.orders;
    setRecentOrders(ordersRes.data.orders.slice(0,5))

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
{/* chart */}
<div className="bg-white rounded-2xl shadow-lg p-6 md:col-span-2">
  <h2 className="text-xl font-bold mb-4 text-[#3B2F2F]">
    Top Selling Products
  </h2>

  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={topProducts}>
      <XAxis dataKey="name" />
      <YAxis allowDecimals={false} />
      <Tooltip />
      <Bar dataKey="totalSold" fill="#A0522D" />
    </BarChart>
  </ResponsiveContainer>
</div>
{/* chart */}

<div className="bg-white rounded-2xl shadow-lg p-6 md:col-span-2">
  <h2 className="text-xl font-bold mb-4 text-[#3B2F2F]">
    Top Customers
  </h2>

  <div className="overflow-x-auto">
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
        {topCustomers.map((user, index) => (
          <tr
            key={index}
            className="border-b text-sm hover:bg-[#FAF8F2]"
          >
            <td className="p-3">{index + 1}</td>
            <td className="p-3 font-medium">{user.name}</td>
            <td className="p-3 text-gray-600">{user.email}</td>
            <td className="p-3 text-right font-semibold">
              ${user.totalSpent.toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

{/* recent orders */}
<div className="bg-white rounded-2xl shadow-lg p-6 md:col-span-3">
  <h2 className="text-xl font-bold mb-4 text-[#3B2F2F]">
    Recent Orders
  </h2>

  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-[#F5F5DC] text-sm text-[#3B2F2F]">
          <th className="p-3">Order ID</th>
          <th className="p-3">Customer</th>
          <th className="p-3">Amount</th>
          <th className="p-3">Payment</th>
          <th className="p-3">Status</th>
          <th className="p-3">Date</th>
        </tr>
      </thead>

      <tbody>
        {recentOrders.map(order => (
          <tr
            key={order._id}
            className="border-b text-sm hover:bg-[#FAF8F2]"
          >
            <td className="p-3 font-mono">
              {order._id.slice(-6)}
            </td>

            <td className="p-3">
              {order.user?.name || "Guest"}
            </td>

            <td className="p-3 font-semibold">
              ${order.totalAmount.toLocaleString()}
            </td>

            <td className="p-3">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${order.paymentStatus === "paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"}
                `}
              >
                {order.paymentStatus}
              </span>
            </td>

            <td className="p-3">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${order.status === "delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-blue-100 text-blue-700"}
                `}
              >
                {order.status}
              </span>
            </td>

            <td className="p-3 text-gray-500">
              {new Date(order.createdAt).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


      </div>
    </div>
  )
}
