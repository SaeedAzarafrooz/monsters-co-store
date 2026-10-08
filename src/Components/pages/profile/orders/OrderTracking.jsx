import { Link, useParams } from "react-router-dom";
import { getOrderById } from "../../../../utils/orders";

const TRACKING_STEPS = ["Processing", "Packed", "Shipped", "Delivered"];

function formatDate(date) {
  if (!date) return "Date unavailable";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function OrderTracking() {
  const { orderId } = useParams();
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className="w-full space-y-6">
        <div className="border-b border-app-border pb-5">
          <Link
            to="/profile/orders"
            className="inline-flex items-center gap-2 text-xs font-bold text-app-accent hover:underline mb-2"
          >
            ← Back to Orders
          </Link>
          <h1 className="text-2xl font-black text-app-text tracking-tight">
            Order Not Found
          </h1>
        </div>
        <div className="w-full rounded-2xl border border-app-border bg-app-bg py-12 text-center">
          <p className="text-sm text-app-muted">
            We could not find an order with this ID.
          </p>
          <Link
            to="/profile/orders"
            className="mt-4 inline-block text-xs font-bold text-app-accent hover:underline"
          >
            Return to Order History
          </Link>
        </div>
      </div>
    );
  }

  const currentStep = TRACKING_STEPS.indexOf(order.status);
  const activeStep = currentStep < 0 ? 0 : currentStep;
  const shipping = order.shipping || {};

  return (
    <div className="w-full space-y-6">
      {/* Header with Breadcrumb / Back button */}
      <div className="border-b border-app-border pb-5">
        <Link
          to="/profile/orders"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-app-accent hover:underline mb-3"
        >
          <span>←</span> Back to All Orders
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-app-text tracking-tight">
              Order {order.id}
            </h1>
            <p className="mt-1 text-xs text-app-muted">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>
          <span className="rounded-full border border-app-accent bg-app-accent/10 px-3.5 py-1 text-xs font-bold text-app-accent">
            {order.status || "Processing"}
          </span>
        </div>
      </div>

      {/* Main Grid: Stepper (Left) & Info (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Delivery Progress Stepper */}
        <section className="lg:col-span-7 rounded-2xl border border-app-border bg-app-bg p-5 sm:p-6">
          <h2 className="text-base font-extrabold text-app-text mb-6">
            Delivery Progress
          </h2>

          <ol className="space-y-6">
            {TRACKING_STEPS.map((step, index) => {
              const isComplete = index < activeStep;
              const isCurrent = index === activeStep;

              return (
                <li key={step} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={[
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-xs font-extrabold",
                        isComplete || isCurrent
                          ? "border-app-accent bg-app-accent text-app-bg"
                          : "border-app-border bg-app-hover text-app-muted",
                      ].join(" ")}
                    >
                      {isComplete ? (
                        <Icon name="check" size="sm" className="stroke-[2.5]" />
                      ) : (
                        index + 1
                      )}
                    </div>

                    {index < TRACKING_STEPS.length - 1 && (
                      <div
                        className={[
                          "mt-2 min-h-8 w-0.5",
                          isComplete ? "bg-app-accent" : "bg-app-border",
                        ].join(" ")}
                      />
                    )}
                  </div>

                  <div className="pt-1">
                    <p
                      className={[
                        "text-sm font-bold",
                        isCurrent || isComplete
                          ? "text-app-text"
                          : "text-app-muted",
                      ].join(" ")}
                    >
                      {step}
                    </p>
                    <p className="mt-0.5 text-xs text-app-muted">
                      {isCurrent
                        ? "Your package is currently in this phase."
                        : isComplete
                          ? "Completed"
                          : "Pending"}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        {/* Sidebar Info: Shipping & Summary */}
        <aside className="lg:col-span-5 space-y-6">
          {/* Shipping Address */}
          <section className="rounded-2xl border border-app-border bg-app-bg p-5">
            <h2 className="text-base font-extrabold text-app-text mb-3">
              Shipping Information
            </h2>
            <div className="space-y-1.5 text-xs text-app-muted">
              <p className="font-bold text-app-text text-sm">
                {shipping.fullName || "Guest Customer"}
              </p>
              <p>{shipping.addressLine1 || "No address provided"}</p>
              <p>
                {[shipping.city, shipping.zipCode].filter(Boolean).join(" ")}
              </p>
              {shipping.email && <p>{shipping.email}</p>}
              <div className="pt-2">
                <span className="inline-block rounded-md bg-app-card border border-app-border px-2.5 py-1 text-xs font-semibold capitalize text-app-text">
                  {shipping.method || "Standard"} Shipping
                </span>
              </div>
            </div>
          </section>

          {/* Items & Total Summary */}
          <section className="rounded-2xl border border-app-border bg-app-bg p-5">
            <h2 className="text-base font-extrabold text-app-text mb-3">
              Items Purchased
            </h2>
            <div className="space-y-2.5 text-xs">
              {(order.items || []).map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-3 text-app-muted"
                >
                  <span className="truncate">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="shrink-0 font-bold text-app-text">
                    $
                    {(
                      (Number(item.price) || 0) * (Number(item.quantity) || 0)
                    ).toFixed(2)}
                  </span>
                </div>
              ))}

              <div className="border-t border-app-border pt-3 mt-3 space-y-1.5">
                <div className="flex justify-between text-app-muted">
                  <span>Subtotal</span>
                  <span>${(Number(order.subtotal) || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-app-muted">
                  <span>Shipping</span>
                  <span>${(Number(order.shippingCost) || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-black text-sm pt-1 border-t border-app-border">
                  <span className="text-app-text">Total</span>
                  <span className="text-app-accent">
                    ${(Number(order.total) || 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

export default OrderTracking;
