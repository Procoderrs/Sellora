import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const orderId = params.get("orderId");

  useEffect(() => {
    const markPaid = async () => {
      if (!orderId) {
        setError("Order ID missing in URL");
        setLoading(false);
        return;
      }

      try {
        await api.put(`/orders/${orderId}/mark-paid`);
        navigate(`/orders/${orderId}`); // go to order details
      } catch (err) {
        setError(err.response?.data?.message || "Failed to confirm payment");
        setLoading(false);
      }
    };

    markPaid();
  }, [orderId, navigate]);

  if (loading) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold mb-4">Processing Payment...</h2>
        <p>Please wait while we confirm your order.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Payment Failed</h2>
        <p>{error}</p>
      </div>
    );
  }

  return null; // you will never see this, it immediately redirects
}
