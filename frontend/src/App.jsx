import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/AdminLogin.jsx";
import Signup from "./auth/CustomerSignup.jsx";

import RequireAdmin from "./auth/RequireAdmin.jsx";
import RequireCustomer from "./auth/RequireCustomer.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";
import Categories from "./pages/Categories.jsx";
import Product from "./pages/Product.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import CustomerDashboard from "./pages/CustomerDashboard.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Protected Routes */}
        <Route element={<RequireAdmin />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/admin/products" element={<Product />} />
            <Route path="/admin/product" element={<AddProduct />} />
          </Route>
        </Route>

        {/* Customer Protected Routes */}
        <Route element={<RequireCustomer />}>
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
