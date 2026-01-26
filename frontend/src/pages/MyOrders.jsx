import { useEffect, useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function MyOrders() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders/my-orders");
        setOrders(data.orders);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return <p className="p-10">Loading orders...</p>;
  }

  if (!orders.length) {
    return (
      <section className="p-10 text-center">
        <h2 className="text-2xl font-bold mb-4">No orders found</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-[#A0522D] text-white px-6 py-3 rounded-lg"
        >
          Start Shopping
        </button>
      </section>
    );
  }

  return (
    <section className="px-10 py-16 bg-[#F5F5DC] min-h-screen">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map(order => (
          <div
            key={order._id}
            className="bg-white border rounded-xl p-6 shadow-sm"
          >
            <div className="flex justify-between mb-4">
              <span className="font-semibold">
                Order #{order._id.slice(-6)}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>

            <p className="text-sm mb-2">
              Status:
              <span className="ml-2 font-medium text-[#A0522D]">
                {order.status}
              </span>
            </p>

            <p className="font-semibold mb-4">
              Total: ${order.totalAmount}
            </p>

            <button
              onClick={() => navigate(`/orders/${order._id}`)}
              className="text-sm text-[#A0522D] underline"
            >
              View Order Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
