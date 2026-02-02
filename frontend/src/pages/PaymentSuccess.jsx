import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/api";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const orderId = params.get("orderId");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPayment = async () => {
      try {
        const res = await api.get(`/orders/${orderId}`);
        setOrder(res.data.order);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    checkPayment();
  }, [orderId]);

  if (loading) return <p>Loading payment status...</p>;

  if (!order) return <p>Order not found</p>;

  return (
    <div className="text-center mt-20">
      <h2 className="text-2xl font-bold mb-4">
        {order.paymentStatus === "paid" ? "Payment Successful!" : "Payment Pending..."}
      </h2>
      <p>Order #{order._id}</p>
      <p>Status: {order.status}</p>
    </div>
  );
}
