import { useContext } from "react";
import { createContext } from "react";
import { AuthContext } from "./AuthContext";
import api from "../api/api";
import { useState } from "react";
import { useEffect } from "react";
export const OrdersContext = createContext();

export function OrdersProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders/my"); // your API endpoint
      setOrders(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <OrdersContext.Provider value={{ orders, fetchOrders }}>
      {children}
    </OrdersContext.Provider>
  );
}
