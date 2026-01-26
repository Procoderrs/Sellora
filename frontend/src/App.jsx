import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/AdminLogin.jsx";
import Signup from "./auth/CustomerSignup.jsx";
import PublicLayout from "./layout/PublicLayout.jsx";

import RequireAdmin from "./auth/RequireAdmin.jsx";
import RequireCustomer from "./auth/RequireCustomer.jsx";

import Dashboard from "./admin/Dashboard.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";
import Categories from "./admin/Categories.jsx";
import Product from "./admin/Product.jsx";
import AddProduct from "./admin/AddProduct.jsx";
import CustomerDashboard from "./pages/CustomerDashboard.jsx";
import Header from "./components/Header.jsx";
import CategoryProd from './components/CategoryProd.jsx'
import CustomerLayout from "./layout/CustomerLayout.jsx";
import ProductDetail from "./pages/ProductDetails.jsx";
import ShoppingCart from "./pages/ShoppingCart.jsx";
import ShippingDetails from "./pages/ShippingDetails.jsx";
import CheckoutShipping from "./pages/CheckOutPage.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import Orders from "./admin/Orders.jsx";
import PaymentSuccess from "./pages/PaymentSuccessfull.jsx";
import PaymentCancel from "./pages/PaymentCancel.jsx";
import Users from "./admin/Users.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import Shop from "./pages/Shop.jsx";
import Collection from "./pages/Collection.jsx";

export default function App() {
  return (
    <BrowserRouter>
  <Routes>
 <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    {/* PUBLIC */}
    <Route element={<PublicLayout />}>
      <Route path="/" element={<CustomerDashboard />} />
      <Route path="/category/:slug" element={<CategoryProd />} />
      <Route path="/product/:slug" element={<ProductDetail />} />
      <Route path="/cart" element={<ShoppingCart />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/collection" element={<Collection/>}/>
    </Route>

    {/* CUSTOMER */}
    <Route element={<RequireCustomer />}>
      <Route element={<CustomerLayout />}>
<Route path="/checkout/shipping" element={<CheckoutShipping />} />
<Route path="/orders/:id" element={<OrderDetails />} />
<Route path="/payment-success" element={<PaymentSuccess />} />
<Route path="/payment-cancel" element={<PaymentCancel />} />
<Route path="/my-orders" element={<MyOrders/>} />



      </Route>
    </Route>

    {/* ADMIN */}
    <Route element={<RequireAdmin />}>
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/products" element={<Product />} />
        <Route path="/admin/product" element={<AddProduct />} />
        <Route path="/admin/Orders" element={<Orders />} />
                <Route path="/admin/Users" element={<Users />} />


      </Route>
    </Route>

  </Routes>
</BrowserRouter>

  );
}
