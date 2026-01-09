import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const location = useLocation()

  const linkClass = (path) =>
    `block px-4 py-3 rounded-lg transition font-medium
     ${
       location.pathname === path
         ? 'bg-[#F4A460] text-[#3B2F2F]'
         : 'text-[#F5F5DC] hover:bg-[#F4A460]/80 hover:text-[#3B2F2F]'
     }`

  return (
    <div className="w-64 h-screen bg-[#A0522D] p-6 shadow-lg">
      {/* Logo / Title */}
      <h1 className="text-2xl font-bold text-[#F5F5DC] mb-10 tracking-wide">
        Admin Panel
      </h1>

      {/* Navigation */}
      <ul className="space-y-3">
        <li>
          <Link to="/" className={linkClass('/')}>
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/categories" className={linkClass('/categories')}>
            Categories
          </Link>
        </li>

        <li>
          <Link to="/products" className={linkClass('/products')}>
            Products
          </Link>
        </li>

        <li>
          <Link to="/orders" className={linkClass('/orders')}>
            Orders
          </Link>
        </li>
      </ul>
    </div>
  )
}
