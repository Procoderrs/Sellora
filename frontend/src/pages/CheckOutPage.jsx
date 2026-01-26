import ShippingDetails from './ShippingDetails';
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CheckoutShipping() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleShippingSubmit = async (shippingData) => {
    try {
      setLoading(true);

      const res = await api.post("/orders", {
        shippingAddress: shippingData
      });

      // Order created successfully
      navigate(`/orders/${res.data.order._id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ShippingDetails onSubmit={handleShippingSubmit} />
      {loading && (
        <p className="text-center mt-4 font-medium">
          Creating your order...
        </p>
      )}
    </>
  );
}
