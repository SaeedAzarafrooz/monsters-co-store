import { Link } from "react-router-dom";
import { getOrders } from "../../../../utils/orders";
import { Container, Button, EmptyState, Icon, Skeleton } from "../../../ui";

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
      <div className="border-b border-border pb-5">
        <h1 className="text-2xl font-black text-foreground tracking-tight">
          Order History
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Review and track all your previous purchases.
        </p>
      </div>

      {orders.length === 0 ? (
        <EmptyState
          title="No orders found"
          description="Your completed orders will appear here."
          icon={<Icon name="orders" size="xl" />}
          action={
            <Button asChild variant="outline" size="sm">
              <Link to="/products">Explore Products</Link>
            </Button>
          }
          className="w-full rounded-2xl border border-border bg-card py-16 text-center"
        />
      ) : (
        <div className="w-full rounded-2xl border border-border bg-card p-5 sm:p-6">
          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-12 gap-4 px-4 pb-3 border-b border-border text-xs font-bold uppercase tracking-wider text-muted-foreground">
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
                className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center rounded-xl border border-border bg-background p-4 transition-colors hover:bg-muted/50"
              >
                <div className="col-span-1 sm:col-span-5">
                  <p className="font-extrabold text-foreground text-sm truncate">
                    {order.id}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDate(order.createdAt)} • {order.items?.length || 0} item(s)
                  </p>
                </div>

                <div className="col-span-1 sm:col-span-3 text-left sm:text-center">
                  <span className="inline-flex items-center text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
                    {order.status || "Processing"}
                  </span>
                </div>

                <div className="col-span-1 sm:col-span-2 text-left sm:text-right font-black text-foreground text-sm">
                  ${(Number(order.total) || 0).toFixed(2)}
                </div>

                <div className="col-span-1 sm:col-span-2 flex justify-start sm:justify-center">
                  <Button asChild variant="link" size="sm" className="h-auto p-0 text-xs font-bold text-primary">
                    <Link to={`/profile/orders/${order.id}`}>
                      View Details
                    </Link>
                  </Button>
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
