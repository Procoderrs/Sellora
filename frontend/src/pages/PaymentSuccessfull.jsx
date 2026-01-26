import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const orderId = params.get("orderId");

  useEffect(() => {
    const markPaid = async () => {
      if (!orderId) return;
      try {
        await api.put(`/orders/${orderId}/mark-paid`);
        navigate(`/orders/${orderId}`);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to confirm payment");
      }
    };

    markPaid();
  }, [orderId]);

  return (
    <div className="text-center mt-20">
      <h2 className="text-2xl font-bold mb-4">Processing Payment...</h2>
      <p>Please wait while we confirm your order.</p>
    </div>
  );
}
