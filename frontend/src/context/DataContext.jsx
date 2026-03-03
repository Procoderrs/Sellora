// context/DataContext.jsx
import { createContext, useEffect, useState } from "react";
import api from "../api/api";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          api.get("/categories"),
          api.get("/products"),
        ]);

        const allCategories = catRes.data.categories || [];
        const allProducts = prodRes.data.products || [];

        setCategories(allCategories);
        setProducts(allProducts);

        // Compute parent categories with productCount & image
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
      } catch (err) {
        console.error(err);
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
        parentCategories, // ✅ expose parent categories
        loading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}