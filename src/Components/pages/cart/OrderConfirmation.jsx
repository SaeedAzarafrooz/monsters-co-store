import { Link } from "react-router-dom";
import { Button, EmptyState, Icon } from "../../ui";

function OrderConfirmation({ orderId }) {
  const trackingPath = orderId
    ? `/profile/orders/${orderId}`
    : "/profile/orders";

  return (
    <EmptyState
      icon={<Icon name="check" size="xl" strokeWidth={2.5} />}
      title="Order Confirmed!"
      description={
        orderId
          ? `Thank you for your order! Your ID is: ${orderId}`
          : "Thank you! Your order has been placed and is being prepared."
      }
      action={
        <div className="flex justify-center gap-3">
          <Button asChild size="lg">
            <Link to={trackingPath}>Track Order</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link to="/profile/orders">Order History</Link>
          </Button>
        </div>
      }
    />
  );
}

export default OrderConfirmation;
