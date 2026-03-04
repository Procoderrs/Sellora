import { createContext, useEffect, useState } from "react";
import api from "../api/api";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Admin dashboard data
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
        // Fetch categories & products for site-wide context
        const [catRes, prodRes] = await Promise.all([
          api.get("/categories"),
          api.get("/products"),
        ]);

        const allCategories = catRes.data.categories || [];
        const allProducts = prodRes.data.products || [];

        setCategories(allCategories);
        setProducts(allProducts);

        // Parent categories info
        const parents = allCategories.filter((c) => !c.parent);
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
        setParentCategories(parentsWithInfo);

        // --- Fetch admin dashboard data ---
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

      } catch (err) {
        console.error("DataProvider fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        categories,
        products,
        parentCategories,
        dashboardData,
        loading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}