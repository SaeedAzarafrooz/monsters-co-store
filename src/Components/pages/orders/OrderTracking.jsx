import { Link, useParams } from "react-router-dom";
import { getOrderById } from "../../../utils/orders";

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
      <main className="min-h-screen bg-app-bg text-app-text px-4 py-10 sm:px-6">
        <section className="mx-auto w-[700px] rounded-2xl border border-app-border bg-app-card p-8 text-center">
          <h1 className="text-2xl font-extrabold">Order Not Found</h1>
          <p className="mt-3 text-sm text-app-muted">
            We could not find an order with this ID.
          </p>
          <Link
            to="/orders"
            className="mt-6 inline-block rounded-xl bg-app-accent px-5 py-3 font-extrabold text-app-bg hover:opacity-90 transition-opacity"
          >
            View Order History
          </Link>
        </section>
      </main>
    );
  }

  const currentStep = TRACKING_STEPS.indexOf(order.status);
  const activeStep = currentStep < 0 ? 0 : currentStep;
  const shipping = order.shipping || {};

  return (
    <main className="min-h-screen bg-app-bg text-app-text px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-[700px]">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-app-border pb-5">
          <div>
            <p className="text-sm font-bold text-app-muted">Order Tracking</p>
            <h1 className="mt-1 text-2xl font-extrabold">{order.id}</h1>
            <p className="mt-2 text-sm text-app-muted">
              Placed {formatDate(order.createdAt)}
            </p>
          </div>

          <Link
            to="/orders"
            className="rounded-xl bg-app-hover px-4 py-2.5 text-sm font-bold text-app-text border border-app-border hover:opacity-90 transition-opacity"
          >
            Order History
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
          <section className="rounded-2xl border border-app-border bg-app-card p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-extrabold">Delivery Progress</h2>
              <span className="rounded-full border border-app-accent bg-app-accent/10 px-3 py-1 text-sm font-bold text-app-accent">
                {order.status || "Processing"}
              </span>
            </div>

            <ol className="mt-7 space-y-6">
              {TRACKING_STEPS.map((step, index) => {
                const isComplete = index < activeStep;
                const isCurrent = index === activeStep;

                return (
                  <li key={step} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={[
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2",
                          isComplete || isCurrent
                            ? "border-app-accent bg-app-accent text-app-bg"
                            : "border-app-border bg-app-hover text-app-muted",
                        ].join(" ")}
                      >
                        {isComplete ? (
                          <svg
                            className="h-5 w-5 stroke-[2.5]"
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
                        ) : (
                          <span className="text-sm font-extrabold">
                            {index + 1}
                          </span>
                        )}
                      </div>

                      {index < TRACKING_STEPS.length - 1 && (
                        <div
                          className={[
                            "mt-1 min-h-8 w-0.5",
                            isComplete ? "bg-app-accent" : "bg-app-border",
                          ].join(" ")}
                        />
                      )}
                    </div>

                    <div className="pt-1">
                      <p
                        className={[
                          "font-bold",
                          isCurrent || isComplete
                            ? "text-app-text"
                            : "text-app-muted",
                        ].join(" ")}
                      >
                        {step}
                      </p>
                      <p className="mt-1 text-sm text-app-muted">
                        {isCurrent
                          ? "Your order is at this stage."
                          : isComplete
                            ? "Completed"
                            : "Upcoming"}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-app-border bg-app-card p-5">
              <h2 className="text-lg font-extrabold">Shipping Details</h2>
              <div className="mt-4 space-y-2 text-sm">
                <p className="font-bold">{shipping.fullName || "Guest Customer"}</p>
                <p className="text-app-muted">
                  {shipping.addressLine1 || "Address unavailable"}
                </p>
                <p className="text-app-muted">
                  {[shipping.city, shipping.zipCode].filter(Boolean).join(" ") ||
                    "Location unavailable"}
                </p>
                {shipping.email && (
                  <p className="text-app-muted">{shipping.email}</p>
                )}
                <p className="pt-2 font-semibold capitalize text-app-accent">
                  {shipping.method || "Standard"} delivery
                </p>
              </div>
            </section>

            <section className="rounded-2xl border border-app-border bg-app-card p-5">
              <h2 className="text-lg font-extrabold">Order Summary</h2>

              <div className="mt-4 space-y-3 text-sm">
                {(order.items || []).map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-3 text-app-muted"
                  >
                    <span className="truncate max-w-[140px]">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="shrink-0 text-app-text">
                      $
                      {(
                        (Number(item.price) || 0) *
                        (Number(item.quantity) || 0)
                      ).toFixed(2)}
                    </span>
                  </div>
                ))}

                <div className="border-t border-app-border pt-3">
                  <div className="flex justify-between text-app-muted">
                    <span>Subtotal</span>
                    <span>${(Number(order.subtotal) || 0).toFixed(2)}</span>
                  </div>
                  <div className="mt-2 flex justify-between text-app-muted">
                    <span>Shipping</span>
                    <span>${(Number(order.shippingCost) || 0).toFixed(2)}</span>
                  </div>
                  <div className="mt-3 flex justify-between font-extrabold">
                    <span>Total</span>
                    <span className="text-app-accent">
                      ${(Number(order.total) || 0).toFixed(2)}
                    </span>
                  </div>
                </div>

                <p className="pt-2 text-xs text-app-muted">
                  Payment:{" "}
                  {order.paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : "Credit / Debit Card"}
                </p>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default OrderTracking;
