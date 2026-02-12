import { useEffect, useState } from "react";
import api from "../api/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchOrders = async () => {
    try {
      const res = await api.get("/admin/orders");
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/admin/orders/${orderId}/status`, { status: newStatus });
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Status update failed");
    }
  };

  if (loading) return <p className="p-6 text-text-main">Loading orders...</p>;

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
    <div className="min-h-screen bg-background p-8 font-lg font-smoooch">
      <h1 className="text-3xl font-bold text-primary mb-6">All Orders</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Order ID or Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-border rounded-lg px-4 py-2 bg-background text-text-main focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-1/2"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-border rounded-lg px-4 py-2 bg-background text-text-main focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-1/4"
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
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed divide-y  divide-[#F4A460]/40 bg-background rounded-2xl shadow-sm">
       <thead className="bg-[#F4A460]/30">
  <tr>
    <th className="px-4 py-3 text-left text-sm font-semibold text-text-main w-[12%]">
      Order ID
    </th>

    <th className="px-4 py-3 text-left text-sm font-semibold text-text-main w-[28%]">
      Customer
    </th>

    <th className="px-4 py-3 text-left text-sm font-semibold text-text-main w-[12%]">
      Total
    </th>

    <th className="px-4 py-3 text-left text-sm font-semibold text-text-main w-[10%]">
      Payment
    </th>

    <th className="px-4 py-3 text-left text-sm font-semibold text-text-main w-[14%]">
      Status
    </th>

    <th className="px-4 py-3 text-left text-sm font-semibold text-text-main w-[5%]">
      Items
    </th>

    <th className="px-4 py-3 text-center text-sm font-semibold text-text-main w-[5%]">
      Date
    </th>

    <th className="px-4 py-3 text-left text-sm font-semibold text-text-main w-[6%]">
      Details
    </th>
  </tr>
</thead>




          

          <tbody className="divide-y divide-[#F4A460]/20">
            {filteredOrders.map((order) => (
              <tr key={order._id} className="hover:bg-[#F4A460]/10 transition">
                <td className="px-4 py-3 text-text-main">{order._id.slice(-6)}</td>
                <td className="px-4 py-3 text-text-main">
                  <div className="font-medium">{order.user?.name}</div>
                  <div className="text-xs text-gray-500">{order.user?.email}</div>
                </td>
                <td className="px-4 py-3 font-semibold text-primary">${order.totalAmount.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      order.paymentStatus === "paid"
                        ? "bg-primary/20 text-primary"
                        : "bg-danger/20 text-danger"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="border border-border rounded-lg px-2 py-1 bg-background text-text-main focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  >
                    <option value="pending">Order Placed</option>
                    <option value="packing">Packing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-center text-text-main">{order.items.length}</td>
                <td className="px-4 py-3 text-text-main">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="px-3 py-1 text-sm border border-primary text-primary rounded hover:bg-primary/10 transition"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {!filteredOrders.length && (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
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
          <div className="bg-background w-full max-w-3xl rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-xl font-bold text-text-main">Order Details</h2>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-black text-xl">✕</button>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Customer</h3>
              <p>{selectedOrder.user?.name}</p>
              <p className="text-sm text-gray-500">{selectedOrder.user?.email}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Shipping Address</h3>
              <p>{selectedOrder.shippingAddress?.fullName}</p>
              <p>{selectedOrder.shippingAddress?.phone}</p>
              <p>
                {selectedOrder.shippingAddress?.address},{" "}
                {selectedOrder.shippingAddress?.city},{" "}
                {selectedOrder.shippingAddress?.state}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Items</h3>
              <div className="space-y-4">
                {selectedOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 border border-border rounded-xl p-3"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-text-main">{item.title}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-semibold text-text-main">
                      $ {(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4 flex justify-between items-center">
              <div>
                <p className="text-sm">
                  Payment: <span className="font-semibold">{selectedOrder.paymentStatus}</span>
                </p>
                <p className="text-sm">
                  Status: <span className="font-semibold">{selectedOrder.status}</span>
                </p>
              </div>
              <div className="text-2xl font-extrabold text-primary">
                $ {selectedOrder.totalAmount.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
