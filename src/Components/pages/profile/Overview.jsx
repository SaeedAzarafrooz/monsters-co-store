import { Link } from "react-router-dom";
import { getOrders } from "../../../utils/orders";

function formatDate(date) {
  if (!date) return "Date unavailable";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
  }).format(new Date(date));
}

export default function Overview() {
  const orders = getOrders();
  const latestOrder = orders[0] || null;
  const recentOrders = orders.slice(0, 3);

  const activeOrdersCount = orders.filter(
    (o) => o.status === "Processing" || o.status === "Packed" || o.status === "Shipped"
  ).length;

  const totalSpent = orders.reduce(
    (sum, o) => sum + (Number(o.total) || 0),
    0
  );

  const shipping = latestOrder?.shipping || {};

  return (
    <div className="space-y-8">
      {/* Header Greeting */}
      <div className="border-b border-app-border pb-5">
        <h1 className="text-2xl font-black text-app-text tracking-tight">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-sm text-app-muted">
          Welcome back! Here is a summary of your account activity.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-app-border bg-app-bg p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-app-muted">
            Total Orders
          </p>
          <p className="mt-2 text-3xl font-black text-app-text">
            {orders.length}
          </p>
        </div>

        <div className="rounded-2xl border border-app-border bg-app-bg p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-app-muted">
            Active Orders
          </p>
          <p className="mt-2 text-3xl font-black text-app-accent">
            {activeOrdersCount}
          </p>
        </div>

        <div className="rounded-2xl border border-app-border bg-app-bg p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-app-muted">
            Total Spent
          </p>
          <p className="mt-2 text-3xl font-black text-app-text">
            ${totalSpent.toFixed(2)}
          </p>
        </div>
      </div>

      {/* User Info & Default Shipping */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-app-border bg-app-bg p-5 space-y-3">
          <h2 className="text-base font-extrabold text-app-text">
            Profile Details
          </h2>
          <div className="text-sm space-y-1">
            <p className="text-app-muted text-xs">Customer Name</p>
            <p className="font-bold text-app-text">
              {shipping.fullName || "Guest Customer"}
            </p>
          </div>
          <div className="text-sm space-y-1">
            <p className="text-app-muted text-xs">Email</p>
            <p className="font-bold text-app-text">
              {shipping.email || "user@example.com"}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-app-border bg-app-bg p-5 space-y-3">
          <h2 className="text-base font-extrabold text-app-text">
            Default Delivery Address
          </h2>
          {shipping.addressLine1 ? (
            <div className="text-sm space-y-1 text-app-muted">
              <p className="text-app-text font-bold">{shipping.addressLine1}</p>
              <p>
                {[shipping.city, shipping.zipCode].filter(Boolean).join(" ")}
              </p>
              <p className="text-xs text-app-accent pt-1">
                From your latest order
              </p>
            </div>
          ) : (
            <p className="text-sm text-app-muted">
              No saved address yet. It will be recorded after your first checkout.
            </p>
          )}
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="rounded-2xl border border-app-border bg-app-bg p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-lg font-extrabold text-app-text">
              Recent Orders
            </h2>
            <p className="text-xs text-app-muted mt-0.5">
              Your latest purchases
            </p>
          </div>
          {orders.length > 0 && (
            <Link
              to="/profile/orders"
              className="text-xs font-bold text-app-accent hover:underline"
            >
              View All ({orders.length})
            </Link>
          )}
        </div>

        {recentOrders.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-sm text-app-muted">You have placed no orders yet.</p>
            <Link
              to="/products"
              className="mt-3 inline-block text-xs font-bold text-app-accent hover:underline"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-app-border bg-app-card p-4"
              >
                <div>
                  <p className="font-extrabold text-app-text text-sm">
                    {order.id}
                  </p>
                  <p className="text-xs text-app-muted mt-0.5">
                    {formatDate(order.createdAt)} • {order.items?.length || 0} item(s)
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-app-accent bg-app-accent/10 px-2.5 py-1 rounded-lg">
                    {order.status || "Processing"}
                  </span>
                  <span className="font-black text-app-text text-sm">
                    ${(Number(order.total) || 0).toFixed(2)}
                  </span>
                  <Link
                    to={`/profile/orders/${order.id}`}
                    className="text-xs font-bold text-app-accent hover:underline"
                  >
                    Track
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
