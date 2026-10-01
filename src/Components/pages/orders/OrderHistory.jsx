import { Link } from "react-router-dom";
import { getOrders } from "../../../utils/orders";

function formatDate(date) {
  if (!date) return "Date unavailable";
  return new Intl.DateTimeFormat("en", { dateStyle: "short", timeStyle: "short" }).format(new Date(date));
}

function OrderHistory() {
  const orders = getOrders();

  return (
    <div className="min-h-screen bg-app-bg text-app-text p-8">
      <div className="w-[700px] mx-auto">
        <h1 className="text-2xl font-extrabold mb-6">Order History</h1>
        
        {orders.length === 0 ? (
          <div className="w-[700px] h-[300px] flex flex-col items-center justify-center bg-app-card rounded-xl border border-app-border">
            <p className="text-app-muted">No orders found.</p>
            <Link to="/products" className="mt-4 text-app-accent font-bold hover:underline">Explore Products</Link>
          </div>
        ) : (
          <div className="w-[700px] h-full flex flex-col min-h-0">
            <div className="hidden sm:grid grid-cols-12 gap-4 px-4 pb-3 border-b border-app-border text-xs font-bold uppercase tracking-wider text-app-muted shrink-0">
              <span className="col-span-5">Order ID</span>
              <span className="col-span-3 text-center">Status</span>
              <span className="col-span-2 text-right">Total</span>
              <span className="col-span-2 text-center">Action</span>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 pt-3 space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="grid grid-cols-12 gap-4 items-center bg-app-hover p-4 rounded-xl border border-app-border"
                >
                  <div className="col-span-5">
                    <p className="font-extrabold text-app-text truncate">{order.id}</p>
                    <p className="text-xs text-app-muted mt-1">{formatDate(order.createdAt)}</p>
                  </div>

                  <div className="col-span-3 text-center">
                    <span className="text-xs font-bold text-app-accent bg-app-accent/10 px-2 py-1 rounded-lg">
                      {order.status}
                    </span>
                  </div>

                  <div className="col-span-2 text-right font-extrabold text-app-text text-base">
                    ${Number(order.total || 0).toFixed(2)}
                  </div>

                  <div className="col-span-2 flex justify-center">
                    <Link
                      to={`/orders/${order.id}`}
                      className="text-xs font-bold text-app-accent hover:underline"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;
