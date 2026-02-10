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

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-500 font-Inter">
        Loading order details…
      </p>
    );

  if (!order)
    return (
      <p className="text-center mt-20 text-gray-500 font-Inter">
        Order not found
      </p>
    );

  const handlePayNow = async () => {
    try {
      const res = await api.post(`/checkout/${order._id}`);
      window.location.href = res.data.url;
    } catch (err) {
      alert("Payment initiation failed");
    }
  };

  const isPaid = order.paymentStatus === "paid";

  return (
    <section className="min-h-screen bg-background px-4 sm:px-10 py-16 font-Inter">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8 sm:p-12">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h2 className="text-3xl font-playfair text-text-main">
            Order Details
          </h2>

          <span
            className={`mt-3 sm:mt-0 inline-flex items-center px-4 py-1.5
              rounded-full text-sm font-semibold
              ${isPaid
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"}`}
          >
            {isPaid ? "Paid" : "Payment Pending"}
          </span>
        </div>

        {/* ORDER META */}
        <div className="grid sm:grid-cols-2 gap-6 text-sm mb-10">
          <div>
            <p className="text-gray-500">Order ID</p>
            <p className="font-medium text-text-main break-all">
              #{order._id}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Order Status</p>
            <p className="font-medium text-text-main capitalize">
              {order.status}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Payment Status</p>
            <p className="font-medium capitalize">
              {order.paymentStatus}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Total Amount</p>
            <p className="font-semibold text-primary text-lg">
              ${order.totalAmount.toFixed(2)}
            </p>
          </div>
        </div>

        {/* ITEMS */}
        <div>
          <h3 className="text-xl font-playfair text-text-main mb-4">
            Items in this Order
          </h3>

          <ul className="space-y-4">
            {order.items.map((item) => (
              <li
                key={item.product}
                className="flex justify-between items-center border rounded-xl p-4 bg-sidebar"
              >
                <div>
                  <p className="font-medium text-text-main">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold text-primary">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* PAY NOW */}
        {!isPaid && (
          <div className="mt-10">
            <button
              onClick={handlePayNow}
              className="w-full sm:w-auto bg-primary text-white px-10 py-4
                         rounded-xl font-semibold hover:bg-[#8B4513] transition"
            >
              Pay Now
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
