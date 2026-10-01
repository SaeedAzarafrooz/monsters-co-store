import { Link } from "react-router-dom";

function OrderConfirmation({ orderId }) {
  const trackingPath = orderId ? `/orders/${orderId}` : "/orders";

  return (
    <div className="w-[700px] h-full flex flex-col items-center justify-center text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-app-accent/10 border border-app-accent flex items-center justify-center text-app-accent">
        <svg
          className="w-8 h-8 stroke-[2.5]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-extrabold text-app-text">
        Order Confirmed!
      </h2>

      <p className="text-sm text-app-muted max-w-md mx-auto">
        Thank you for your order. We have received your purchase and are
        preparing it for delivery.
      </p>

      {orderId && (
        <p className="text-sm text-app-muted">
          Order ID: <span className="font-bold text-app-text">{orderId}</span>
        </p>
      )}

      <div className="pt-6 flex flex-wrap justify-center gap-3">
        <Link
          to={trackingPath}
          className="inline-block px-6 py-3 rounded-xl bg-app-accent text-app-bg font-extrabold hover:opacity-90 transition-opacity"
        >
          Track Order
        </Link>

        <Link
          to="/orders"
          className="inline-block px-6 py-3 rounded-xl bg-app-hover text-app-text font-bold border border-app-border hover:opacity-90 transition-opacity"
        >
          Order History
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmation;
