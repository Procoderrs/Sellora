import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${id}`);
        setOrder(res.data.order);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to load order");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <p className="text-center mt-8">Loading order...</p>;
  if (!order) return <p className="text-center mt-8">Order not found</p>;


  const handlePayNow = async () => {
  try {
    const res = await api.post(`/checkout/${order._id}`);
    window.location.href = res.data.url;
  } catch (err) {
    alert("Payment initiation failed");
  }
};

  return (
    <section className="px-10 py-16 bg-[#F5F5DC] min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold mb-4">Order #{order._id}</h2>
        <p>Status: {order.status}</p>
        <p>Payment Status: {order.paymentStatus}</p>
        <p>Total: ${order.totalAmount.toFixed(2)}</p>

        <h3 className="mt-6 text-xl font-semibold">Items:</h3>
        <ul className="mt-2 space-y-2">
          {order.items.map((item) => (
            <li key={item.product}>
              {item.title} - {item.quantity} × ${item.price}
            </li>
          ))}
        </ul>

        {order.paymentStatus === "unpaid" && (
  <button
    onClick={handlePayNow}
    className="mt-6 bg-[#A0522D] text-white px-6 py-3 rounded-lg"
  >
    Pay Now
  </button>
)}

      </div>
    </section>
  );
}
