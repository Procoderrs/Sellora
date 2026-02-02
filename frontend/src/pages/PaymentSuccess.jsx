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
  // just redirect after few seconds
  setTimeout(() => {
    navigate(`/orders/${orderId}`);
  }, 2000);
}, [orderId]);

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
