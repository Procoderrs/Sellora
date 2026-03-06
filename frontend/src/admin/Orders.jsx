import { useEffect, useState, useContext } from "react";
import { DataContext } from "../context/DataContext";

export default function Orders() {
  const { orders, fetchOrders, updateOrderStatus,ordersLoading, } = useContext(DataContext);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // ✅ Fetch orders on mount
  useEffect(() => {
    fetchOrders()
    
  }, []);

  if (ordersLoading) return <p className="p-6 text-text-main">Loading orders...</p>;

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order._id.toLowerCase().includes(search.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "paid"
        ? order.paymentStatus === "paid"
        : order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
  <div className="min-h-screen bg-background p-10">

    {/* Page Header */}
    <div className="flex justify-between items-center mb-10">
      <div>
        <h1 className="text-4xl font-bold text-primary tracking-tight">
          Orders
        </h1>
        <p className="text-sm text-muted mt-1">
          Monitor and manage bakery orders
        </p>
      </div>
    </div>

    {/* Filters */}
    <div className="flex flex-col md:flex-row gap-4 mb-8">

      <input
        type="text"
        placeholder="Search by Order ID or Email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
        border border-muted
        rounded-xl
        px-4 py-3
        bg-white
        text-text-main
        focus:outline-none
        focus:ring-2
        focus:ring-accent
        w-full md:w-1/2
        "
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="
        border border-muted
        rounded-xl
        px-4 py-3
        bg-white
        text-text-main
        focus:outline-none
        focus:ring-2
        focus:ring-accent
        w-full md:w-1/4
        "
      >
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="paid">Paid</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>

    </div>

    {/* Orders Table */}
    <div className="overflow-x-auto rounded-3xl border border-muted bg-white shadow-sm">

      <table className="min-w-full">

        <thead className="border-b border-muted bg-accent/10">
          <tr className="text-sm text-primary">
            <th className="px-5 py-4 text-left">Order</th>
            <th className="px-5 py-4 text-left">Customer</th>
            <th className="px-5 py-4 text-left">Total</th>
            <th className="px-5 py-4 text-left">Payment</th>
            <th className="px-5 py-4 text-left">Status</th>
            <th className="px-5 py-4 text-center">Items</th>
            <th className="px-5 py-4 text-center">Date</th>
            <th className="px-5 py-4 text-center">Details</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-muted/60">

          {filteredOrders.map((order) => (

            <tr
              key={order._id}
              className="hover:bg-accent/10 transition"
            >

              <td className="px-5 py-4 font-medium text-text-main">
                #{order._id.slice(-6)}
              </td>

              <td className="px-5 py-4">
                <div className="font-semibold text-text-main">
                  {order.user?.name}
                </div>
                <div className="text-xs text-muted">
                  {order.user?.email}
                </div>
              </td>

              <td className="px-5 py-4 font-semibold text-primary">
                ${order.totalAmount.toLocaleString()}
              </td>

              {/* Payment */}
              <td className="px-5 py-4">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full
                  ${
                    order.paymentStatus === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </td>

              {/* Status */}
              <td className="px-5 py-4">

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateOrderStatus(order._id, e.target.value)
                  }
                  className="
                  border border-muted
                  rounded-lg
                  px-2 py-1
                  bg-white
                  text-text-main
                  focus:outline-none
                  focus:ring-2
                  focus:ring-accent
                  text-sm
                  "
                >
                  <option value="pending">Order Placed</option>
                  <option value="packing">Packing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>

              </td>

              <td className="px-5 py-4 text-center text-text-main">
                {order.items.length}
              </td>

              <td className="px-5 py-4 text-center text-text-main text-sm">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>

              <td className="px-5 py-4 text-center">

                <button
                  onClick={() => setSelectedOrder(order)}
                  className="
                  px-3 py-1
                  text-sm
                  rounded-lg
                  bg-accent/20
                  text-primary
                  hover:bg-accent/40
                  transition
                  "
                >
                  View
                </button>

              </td>

            </tr>

          ))}

          {!filteredOrders.length && (
            <tr>
              <td colSpan="8" className="text-center py-8 text-muted">
                No orders found
              </td>
            </tr>
          )}

        </tbody>
      </table>
    </div>

    {/* Modal */}
    {selectedOrder && (

      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

        <div className="
        bg-white
        w-full
        max-w-3xl
        rounded-3xl
        shadow-2xl
        p-8
        max-h-[90vh]
        overflow-y-auto
        ">

          <div className="flex justify-between items-center border-b pb-4 mb-6">

            <h2 className="text-2xl font-bold text-text-main">
              Order Details
            </h2>

            <button
              onClick={() => setSelectedOrder(null)}
              className="text-muted hover:text-black text-xl"
            >
              ✕
            </button>

          </div>

          {/* Customer */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2 text-primary">Customer</h3>
            <p className="text-text-main">{selectedOrder.user?.name}</p>
            <p className="text-sm text-muted">{selectedOrder.user?.email}</p>
          </div>

          {/* Address */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2 text-primary">Shipping Address</h3>
            <p>{selectedOrder.shippingAddress?.fullName}</p>
            <p>{selectedOrder.shippingAddress?.phone}</p>
            <p>
              {selectedOrder.shippingAddress?.address},{" "}
              {selectedOrder.shippingAddress?.city},{" "}
              {selectedOrder.shippingAddress?.state}
            </p>
          </div>

          {/* Items */}
          <div className="mb-6">

            <h3 className="font-semibold mb-3 text-primary">Items</h3>

            <div className="space-y-3">

              {selectedOrder.items.map((item, index) => (

                <div
                  key={index}
                  className="
                  flex justify-between
                  items-center
                  border border-muted
                  rounded-xl
                  px-4 py-3
                  "
                >

                  <div>
                    <p className="font-semibold text-text-main">
                      {item.title}
                    </p>
                    <p className="text-sm text-muted">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <div className="font-semibold text-text-main">
                    ${ (item.price * item.quantity).toFixed(2) }
                  </div>

                </div>

              ))}

            </div>
          </div>

          {/* Footer */}
          <div className="border-t pt-4 flex justify-between items-center">

            <div className="text-sm">
              <p>
                Payment:
                <span className="font-semibold ml-1">
                  {selectedOrder.paymentStatus}
                </span>
              </p>

              <p>
                Status:
                <span className="font-semibold ml-1">
                  {selectedOrder.status}
                </span>
              </p>
            </div>

            <div className="text-3xl font-extrabold text-primary">
              ${selectedOrder.totalAmount.toLocaleString()}
            </div>

          </div>

        </div>
      </div>

    )}

  </div>
);
}