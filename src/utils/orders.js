const ORDERS_STORAGE_KEY = "monsters_orders";

export function getOrders() {
  if (typeof window === "undefined") return [];

  try {
    const orders = JSON.parse(
      window.localStorage.getItem(ORDERS_STORAGE_KEY) || "[]",
    );

    return Array.isArray(orders) ? orders : [];
  } catch {
    return [];
  }
}

export function getOrderById(orderId) {
  return getOrders().find((order) => order.id === orderId) || null;
}

export function saveOrder(order) {
  if (typeof window === "undefined") return order;

  const orders = getOrders();
  window.localStorage.setItem(
    ORDERS_STORAGE_KEY,
    JSON.stringify([order, ...orders]),
  );

  return order;
}
