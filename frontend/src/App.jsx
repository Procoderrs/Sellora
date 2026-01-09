import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RequireAdmin from './auth/RequireAdmin';
import AdminLogin from './auth/AdminLogin';
import Dashboard from './pages/Dashboard';
import AdminLayout from './layout/AdminLayout';
import Categories from './pages/Categories';
import Product from './pages/Product';
import AddProduct from './pages/AddProduct'; // same page for add/edit

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<AdminLogin />} />
        <Route element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/products' element={<Product />} />
          {/* unified route for add/edit */}
          <Route path='/product' element={<AddProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
