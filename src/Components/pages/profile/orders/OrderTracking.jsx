import { Link, useParams } from "react-router-dom";
import { getOrderById } from "../../../../utils/orders";
import { Button, Icon, Stepper } from "../../../ui";

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
        <div className="border-b border-border pb-5">
          <Link
            to="/profile/orders"
            className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline mb-2"
          >
            ← Back to Orders
          </Link>
          <h1 className="text-2xl font-black text-foreground tracking-tight">
            Order Not Found
          </h1>
        </div>
        <div className="w-full rounded-2xl border border-border bg-card py-12 text-center">
          <p className="text-sm text-muted-foreground">
            We could not find an order with this ID.
          </p>
          <Button asChild variant="outline" size="sm" className="mt-4">
            <Link to="/profile/orders">Return to Order History</Link>
          </Button>
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
      <div className="border-b border-border pb-5">
        <Link
          to="/profile/orders"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline mb-3"
        >
          <span>←</span> Back to All Orders
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-foreground tracking-tight">
              Order {order.id}
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
            {order.status || "Processing"}
          </span>
        </div>
      </div>

      {/* Main Grid: Stepper (Left) & Info (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Delivery Progress Stepper */}
        <section className="lg:col-span-7 rounded-2xl border border-border bg-card p-5 sm:p-6">
          <h2 className="text-base font-extrabold text-foreground mb-6">
            Delivery Progress
          </h2>

          <Stepper
            steps={TRACKING_STEPS.map((step, idx) => ({
              title: step,
              description:
                idx === activeStep
                  ? "Your package is currently in this phase."
                  : idx < activeStep
                  ? "Completed"
                  : "Pending",
            }))}
            currentStep={activeStep}
            orientation="vertical"
            showLabels
          />
        </section>

        {/* Sidebar Info: Shipping & Summary */}
        <aside className="lg:col-span-5 space-y-6">
          {/* Shipping Address */}
          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-base font-extrabold text-foreground mb-3">
              Shipping Information
            </h2>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <p className="font-bold text-foreground text-sm">
                {shipping.fullName || "Guest Customer"}
              </p>
              <p>{shipping.addressLine1 || "No address provided"}</p>
              <p>
                {[shipping.city, shipping.zipCode].filter(Boolean).join(" ")}
              </p>
              {shipping.email && <p>{shipping.email}</p>}
              <div className="pt-2">
                <span className="inline-block rounded-md bg-background border border-border px-2.5 py-1 text-xs font-semibold capitalize text-foreground">
                  {shipping.method || "Standard"} Shipping
                </span>
              </div>
            </div>
          </section>

          {/* Items & Total Summary */}
          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-base font-extrabold text-foreground mb-3">
              Items Purchased
            </h2>
            <div className="space-y-2.5 text-xs">
              {(order.items || []).map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-3 text-muted-foreground"
                >
                  <span className="truncate">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="shrink-0 font-bold text-foreground">
                    $
                    {(
                      (Number(item.price) || 0) * (Number(item.quantity) || 0)
                    ).toFixed(2)}
                  </span>
                </div>
              ))}

              <div className="border-t border-border pt-3 mt-3 space-y-1.5">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${(Number(order.subtotal) || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>${(Number(order.shippingCost) || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-black text-sm pt-1 border-t border-border">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">
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
