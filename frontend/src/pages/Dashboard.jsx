import React, { useEffect, useState } from 'react'
import api from '../api/api'

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    orders: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const products = await api.get('/products')
        const categories = await api.get('/categories')
        const orders = await api.get('/orders')

        setStats({
          products: products.data.products.length,
          categories: categories.data.categories.length,
          orders: orders.data.orders.length,
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchStats()
  }, [])

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

      </div>
    </div>
  )
}
