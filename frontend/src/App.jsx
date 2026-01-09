import {BrowserRouter,Routes,Route} from 'react-router-dom';
import RequireAdmin from './auth/RequireAdmin';
import AdminLogin from './auth/AdminLogin';
import Dashboard from './pages/Dashboard';
import './App.css'
import AdminLayout from './layout/AdminLayout';
import Categories from './pages/Categories';
import Product from './pages/Product'
import ProductPage from './pages/ProductPage';


function App() {
  

  return (
   <BrowserRouter>
    <Routes>
      <Route path='/login' element={<AdminLogin />}/>
      <Route element={<RequireAdmin> <AdminLayout/></RequireAdmin>} >
            <Route path='/'element={<Dashboard/>}/>

      <Route path='/categories'element={<Categories/>}/>
      <Route path='/products'element={<Product/>}/>
      <Route path='/products/add'element={<ProductPage/>}/>




      </Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
