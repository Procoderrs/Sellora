import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";
import { AuthContext } from "./AuthContext";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const {customer}=useContext(AuthContext)
 const [users, setUsers] = useState([]);
   const [usersLoading, setUsersLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
   const [bestSelling, setBestSelling] = useState([]);   // ⭐ NEW
  const [loading, setLoading] = useState(true);
  const [orders,setOrders]=useState([])
  const [ordersLoading,setOrdersLoading]=useState(false)
  const [myOrders,setMyOrders]=useState([])
  const [dashboardLoading,setDashboardLoading]=useState(false)


  const [dashboardData, setDashboardData] = useState({
    stats: { products: 0, categories: 0, orders: 0, customers: 0, revenue: 0 },
    categoryStats: [],
    topProducts: [],
    topCustomers: [],
    recentOrders: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {

        const [
          catRes,
          prodRes,
          bestSellingRes
        ] = await Promise.all([
          api.get("/categories"),
          api.get("/products?fields=_id,title,price,images,category,totalSold"),
          api.get("/products/top-selling?fields=_id,title,price,images,category,totalSold"), // Best selling top products
        ]);

        const allCategories = catRes.data.categories || [];
        const allProducts = prodRes.data.products || [];
        const bestProducts = bestSellingRes.data.products || [];

        setCategories(allCategories);
        setProducts(allProducts);
        setBestSelling(bestProducts); // ⭐ SAVE

        // Parent categories
        /* const parents = allCategories.filter((c) => !c.parent);

        const parentsWithInfo = parents.map((parent) => {
          const parentProducts = allProducts.filter(
            (p) =>
              p.category?._id === parent._id ||
              p.category?.parent?._id === parent._id
          );

          return {
            ...parent,
            productCount: parentProducts.length,
            image: parentProducts[0]?.images?.[0] || "/placeholder.jpg",
          };
        });

        setParentCategories(parentsWithInfo); */

/* new useeffect  */


// ✅ Parent categories auto update when categories/products change


      } catch (err) {
        console.error("DataProvider fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

useEffect(() => {

  const parents = categories.filter(c => !c.parent);

  const parentsWithInfo = parents.map(parent => {

    const parentProducts = products.filter(
      p =>
        p.category?._id === parent._id ||
        p.category?.parent?._id === parent._id
    );

    return {
      ...parent,
      productCount: parentProducts.length,
      image: parentProducts[0]?.images?.[0] || "/placeholder.jpg"
    };

  });

  setParentCategories(parentsWithInfo);

}, [categories, products]);



// ✅ Fetch all users (admin)
  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data.users || []);
    } catch (err) {
      console.error("Fetch users error:", err.response?.data || err.message);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(()=>{
    if(!customer) return;
    const fetchMyOrders=async()=>{
      try {
        const {data}=await api.get('/orders/my-orders');
        setMyOrders(data.orders || []);
      } catch (error) {
        console.error('orders fetch errror',error);
      }
    }
    fetchMyOrders();
  },[customer])


const  fetchDashboard=async()=>{
  if(dashboardData?.stats?.products)return;
  setDashboardLoading(true);
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
          topProducts: topProductsRes.data.slice(0, 10),
          topCustomers: topCustomerRes.data.slice(0, 10),
          recentOrders: ordersRes.data.orders.slice(0, 5),
        });

  } catch (error) {
    console.error('Dashboard fetch error',error)
  }
  finally{
    setDashboardLoading(false)
  }
}



  // ⭐ ADMIN PRODUCT APIs (added by you)

// ⭐ ADMIN PRODUCT APIs (with state update)

const createProduct = async (formData) => {
  try {
    const res = await api.post("/admin/products", formData);

    let newProduct = res.data.product;
    console.log("NEW PRODUCT:", newProduct);
    console.log(newProduct.category.parent);

    // ✅ FIX: ensure parent exists
    if (newProduct.category && typeof newProduct.category.parent === "string") {
      const parentObj = categories.find(
        c => c._id === newProduct.category.parent
      );

      newProduct = {
        ...newProduct,
        category: {
          ...newProduct.category,
          parent: parentObj || { _id: newProduct.category.parent }
        }
      };
    }

    setProducts(prev => [newProduct, ...prev]);

    return newProduct;

  } catch (error) {
    console.error("Create product error", error);
    throw error;
  }
};

const updateProduct = async (id, formData) => {
  try {
    const res = await api.put(`/admin/products/${id}`, formData);

    const updatedProduct = res.data.product;

    // update state
    setProducts(prev =>
      prev.map(p => (p._id === id ? updatedProduct : p))
    );

    return updatedProduct;

  } catch (error) {
    console.error("Update product error", error);
    throw error;
  }
};



const deleteProduct = async (id) => {
  try {
    await api.delete(`/admin/products/${id}`);

    // remove from state
    setProducts(prev => prev.filter(p => p._id !== id));

  } catch (error) {
    console.error("Delete product error", error);
    throw error;
  }
};



// ⭐ ADMIN CATEGORY APIs (added by you)

const createCategory = async (payload) => {
  try {
    const res = await api.post("/admin/categories", payload);

    const newCategory = res.data.category;

    // ⭐ Update categories state instantly
setCategories(prev => {
  const normalized = {
    ...newCategory,
    parent: newCategory.parent
      ? prev.find(c => c._id === newCategory.parent) || { _id: newCategory.parent }
      : null
  };

  return [normalized, ...prev];
});
    return newCategory;

  } catch (error) {
    console.error("Create category error", error);
    throw error;
  }
};

const updateCategory = async (id, payload) => {

  const res = await api.put(`/admin/categories/${id}`, payload);

  const updated = res.data.category;

  setCategories(prev =>
    prev.map(c => {
      if (c._id !== id) return c;

      const normalized = {
        ...updated,
        parent: updated.parent
          ? prev.find(p => p._id === updated.parent) || { _id: updated.parent }
          : null
      };

      return normalized;
    })
  );

  return updated;
};
const deleteCategory = async (id) => {

  await api.delete(`/admin/categories/${id}`);

  // ✅ remove instantly from UI
  setCategories(prev => prev.filter(c => c._id !== id))

};


// ⭐ ADMIN ORDER APIs (added by you)

const fetchOrders = async () => {
  setOrdersLoading(true)
  try {
    const { data } = await api.get("/admin/orders");
    setOrders(data.orders || []);
  } catch (err) {
    console.error("Fetch orders error:", err);
  }
  finally{
    setOrdersLoading(false)
  }
};

const updateOrderStatus = async (orderId, status) => {
  try {
    await api.put(`/admin/orders/${orderId}/status`, { status });

    // update local orders state
    setOrders(prev =>
      prev.map(o => (o._id === orderId ? { ...o, status } : o))
    );
  } catch (error) {
    console.error("Update order status error:", error);
    throw error;
  }
};

// ⭐ NEWSLETTER APIs (added by you)

const getNewsletterSubscribers = async () => {
  return await api.get("/newsletter/count");
};

const sendNewsletter = async (payload) => {
  return await api.post("/newsletter/send", payload);
};

  return (
    <DataContext.Provider
      value={{
        categories,
        products,
        parentCategories,
        bestSelling, // ⭐ EXPORT
        myOrders,
        dashboardData,
        loading,

        //admin calls
        createProduct,
        updateProduct,
        deleteProduct,

        createCategory,
        updateCategory,
        deleteCategory,

        orders,
        fetchOrders,
        updateOrderStatus,
        ordersLoading,

        getNewsletterSubscribers,
        sendNewsletter,

        users,
        usersLoading,
       fetchUsers,
       fetchDashboard,
       dashboardLoading,
       dashboardData,
      }}
    >

      {children}
    </DataContext.Provider>
  );
}