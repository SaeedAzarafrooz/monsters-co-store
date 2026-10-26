import { Link } from "react-router-dom";
import { getOrders } from "../../../utils/orders";
import { useFavorites } from "../../../context/FavoritesContext";
import {
  Button,
  Icon,
} from "../../ui";

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
  const { favorites, totalFavoritesCount } = useFavorites();
  const previewFavorites = favorites.slice(0, 4);

  // Find active orders
  const activeOrders = orders.filter(
    (o) =>
      o.status === "Processing" ||
      o.status === "Packed" ||
      o.status === "Shipped",
  );
  const activeOrdersCount = activeOrders.length;
  const currentActiveOrder = activeOrders[0] || null;

  const totalSpent = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

  const shipping = latestOrder?.shipping || {};

  return (
    <div className="space-y-8">
      {/* Header Greeting */}
      <div className="border-b border-border pb-5">
        <h1 className="text-2xl font-black text-foreground tracking-tight">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back! Here is a summary of your account activity.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Orders Tile (clickable -> all orders) */}
        <Link
          to="/profile/orders"
          className="group relative rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary hover:bg-muted/50"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
              Total Orders
            </span>
            <span className="text-xs font-bold text-primary opacity-0 transition-opacity group-hover:opacity-100">
              View All &rarr;
            </span>
          </div>
          <p className="mt-2 text-3xl font-black text-foreground">
            {orders.length}
          </p>
        </Link>

        {/* Active Orders Tile (clickable -> active order tracking or orders list) */}
        <Link
          to={
            currentActiveOrder
              ? `/profile/orders/${currentActiveOrder.id}`
              : "/profile/orders"
          }
          className="group relative rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary hover:bg-muted/50"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
              Active Orders
            </span>
            {activeOrdersCount > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-primary/15 text-primary">
                In Transit
              </span>
            )}
          </div>
          <p className="mt-2 text-3xl font-black text-primary">
            {activeOrdersCount}
          </p>
        </Link>

        {/* Total Spent Tile */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Total Spent
          </span>
          <p className="mt-2 text-3xl font-black text-foreground">
            ${totalSpent.toFixed(2)}
          </p>
        </div>

        {/* Saved Favorites Tile (clickable -> favorites page with badge) */}
        <Link
          to="/profile/favorites"
          className="group relative rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary hover:bg-muted/50"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
              Saved Favorites
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500/10 text-rose-500 border border-rose-500/20">
              <Icon name="heart" size="sm" className="fill-current" />
              Favorites
            </span>
          </div>
          <p className="mt-2 text-3xl font-black text-rose-500">
            {totalFavoritesCount}
          </p>
        </Link>
      </div>

      {/* User Info & Default Shipping */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
          <h2 className="text-base font-extrabold text-foreground">
            Profile Details
          </h2>
          <div className="text-sm space-y-1">
            <span className="text-muted-foreground text-xs block">Customer Name</span>
            <p className="font-bold text-foreground">
              {shipping.fullName || "Guest Customer"}
            </p>
          </div>
          <div className="text-sm space-y-1">
            <span className="text-muted-foreground text-xs block">Email</span>
            <p className="font-bold text-foreground">
              {shipping.email || "user@example.com"}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
          <h2 className="text-base font-extrabold text-foreground">
            Default Delivery Address
          </h2>
          {shipping.addressLine1 ? (
            <div className="text-sm space-y-1 text-muted-foreground">
              <p className="text-foreground font-bold">{shipping.addressLine1}</p>
              <p className="text-xs">
                {[shipping.city, shipping.zipCode].filter(Boolean).join(" ")}
              </p>
              <span className="text-xs text-primary pt-1 block">
                From your latest order
              </span>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No saved address yet. It will be recorded after your first
              checkout.
            </p>
          )}
        </div>
      </div>

      {/* Recent Favorites Preview Section */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-lg font-extrabold text-foreground">
              Favorites Preview
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Characters you have saved to your wishlist
            </p>
          </div>
          {totalFavoritesCount > 0 && (
            <Link
              to="/profile/favorites"
              className="text-xs font-bold text-primary hover:underline"
            >
              View All ({totalFavoritesCount})
            </Link>
          )}
        </div>

        {totalFavoritesCount === 0 ? (
          <div className="py-6 text-center">
            <p className="text-sm text-muted-foreground">
              You have not saved any favorites yet.
            </p>
            <Link
              to="/products"
              className="mt-2 inline-block text-xs font-bold text-primary hover:underline"
            >
              Explore Characters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {previewFavorites.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-2.5 rounded-xl border border-border bg-background"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover border border-border shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-sm text-foreground truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {item.species}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Orders Section */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-lg font-extrabold text-foreground">
              Recent Orders
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Your latest purchases
            </p>
          </div>
          {orders.length > 0 && (
            <Link
              to="/profile/orders"
              className="text-xs font-bold text-primary hover:underline"
            >
              View All ({orders.length})
            </Link>
          )}
        </div>

        {recentOrders.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-sm text-muted-foreground">
              You have placed no orders yet.
            </p>
            <Link
              to="/products"
              className="mt-3 inline-block text-xs font-bold text-primary hover:underline"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-background p-4"
              >
                <div>
                  <p className="font-extrabold text-foreground text-sm">
                    {order.id}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatDate(order.createdAt)} • {order.items?.length || 0}{" "}
                    item(s)
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
                    {order.status || "Processing"}
                  </span>
                  <span className="font-black text-foreground text-sm">
                    ${(Number(order.total) || 0).toFixed(2)}
                  </span>
                  <Link
                    to={`/profile/orders/${order.id}`}
                    className="text-xs font-bold text-primary hover:underline"
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
