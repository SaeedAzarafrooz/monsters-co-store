import { Link } from "react-router-dom";
import { getOrders } from "../../../../utils/orders";

function formatDate(date) {
  if (!date) return "Date unavailable";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function OrderHistory() {
  const orders = getOrders();

  return (
    <div className="w-full space-y-6">
      {/* Header matching Overview */}
      <div className="border-b border-app-border pb-5">
        <h1 className="text-2xl font-black text-app-text tracking-tight">
          Order History
        </h1>
        <p className="mt-1 text-sm text-app-muted">
          Review and track all your previous purchases.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="w-full rounded-2xl border border-app-border bg-app-bg py-16 text-center">
          <p className="text-sm text-app-muted">No orders found.</p>
          <Link
            to="/products"
            className="mt-4 inline-block text-xs font-bold text-app-accent hover:underline"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="w-full rounded-2xl border border-app-border bg-app-bg p-5 sm:p-6">
          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-12 gap-4 px-4 pb-3 border-b border-app-border text-xs font-bold uppercase tracking-wider text-app-muted">
            <span className="col-span-5">Order ID</span>
            <span className="col-span-3 text-center">Status</span>
            <span className="col-span-2 text-right">Total</span>
            <span className="col-span-2 text-center">Action</span>
          </div>

          {/* Orders List */}
          <div className="pt-3 space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center rounded-xl border border-app-border bg-app-card p-4 transition-colors hover:bg-app-hover"
              >
                <div className="col-span-1 sm:col-span-5">
                  <p className="font-extrabold text-app-text text-sm truncate">
                    {order.id}
                  </p>
                  <p className="text-xs text-app-muted mt-1">
                    {formatDate(order.createdAt)} • {order.items?.length || 0} item(s)
                  </p>
                </div>

                <div className="col-span-1 sm:col-span-3 text-left sm:text-center">
                  <span className="text-xs font-bold text-app-accent bg-app-accent/10 px-2.5 py-1 rounded-lg">
                    {order.status || "Processing"}
                  </span>
                </div>

                <div className="col-span-1 sm:col-span-2 text-left sm:text-right font-black text-app-text text-sm">
                  ${(Number(order.total) || 0).toFixed(2)}
                </div>

                <div className="col-span-1 sm:col-span-2 flex justify-start sm:justify-center">
                  <Link
                    to={`/profile/orders/${order.id}`}
                    className="text-xs font-bold text-app-accent hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
