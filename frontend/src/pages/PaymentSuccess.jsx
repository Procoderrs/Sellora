// pages/PaymentSuccess.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/api";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let interval;

    const fetchOrderStatus = async () => {
      try {
        const res = await api.get(`/orders/payment-status/${orderId}`);
        setOrder(res.data.order);
        console.log(res)
        setLoading(false);

        // Stop polling if payment is confirmed
        if (res.data.order.paymentStatus === "paid") {
          clearInterval(interval);
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    // Initial fetch
    fetchOrderStatus();

    // Poll every 3s until paid
    interval = setInterval(fetchOrderStatus, 3000);

    // Cleanup
    return () => clearInterval(interval);
  }, [orderId]);

  if (loading) return <p className="text-center mt-8">Checking payment status...</p>;
  if (!order) return <p className="text-center mt-8">Order not found</p>;

  return (
    <section className="px-10 py-16 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Order #{order._id}</h2>
        <p>Status: {order.status}</p>
        <p>Payment Status: {order.paymentStatus}</p>

        {order.paymentStatus === "paid" ? (
          <p className="mt-4 text-green-600 font-semibold">Payment Successful! 🎉</p>
        ) : (
          <p className="mt-4 text-orange-500 font-semibold">
            Payment Pending... Please wait.
          </p>
        )}
      </div>
    </section>
  );
}
