import { Link } from "react-router-dom";
import {
  Button,
  EmptyState,
  DataList,
  DataListHeader,
  DataListContent,
  DataListRow,
  DataListCell,
  Icon,
} from "../../ui";

const CART_COLUMNS = [
  { label: "Product", span: 6, align: "left" },
  { label: "Quantity", span: 3, align: "center" },
  { label: "Price", span: 2, align: "right" },
  { label: "Remove", span: 1, align: "center" },
];

function CartReview({ cartItems, addToCart, decreaseQuantity, removeItem }) {
  if (!cartItems.length) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Looks like you haven't added any Rick & Morty merchandise yet."
        action={
          <Button asChild>
            <Link to="/products">Explore catalog</Link>
          </Button>
        }
      />
    );
  }

  return (
    <DataList>
      {/* Header with predefined column layout */}
      <DataListHeader columns={CART_COLUMNS} />

      {/* Scrollable list items */}
      <DataListContent>
        {cartItems.map((item) => (
          <DataListRow key={item.id}>
            {/* Product info: name, thumbnail, base price */}
            <DataListCell span={6} className="gap-4 min-w-0">
              <img
                src={item.image}
                className="w-16 h-16 rounded-xl object-cover border border-border shrink-0 bg-card"
                alt={item.name}
                loading="lazy"
              />
              <div className="min-w-0 flex-1">
                <p className="font-extrabold text-foreground truncate">
                  {item.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  ${Number(item.price || 0).toFixed(2)} each
                </p>
              </div>
            </DataListCell>

            {/* Quantity controls */}
            <DataListCell span={3} align="center" className="gap-1.5">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => decreaseQuantity(item.id)}
                disabled={item.quantity <= 1}
                className="h-8 w-8"
                aria-label="Decrease quantity"
              >
                -
              </Button>
              <span className="w-8 text-center font-extrabold text-sm select-none">
                {item.quantity}
              </span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => addToCart(item)}
                className="h-8 w-8"
                aria-label="Increase quantity"
              >
                +
              </Button>
            </DataListCell>

            {/* Line total price */}
            <DataListCell
              span={2}
              align="right"
              className="font-extrabold text-primary text-base"
            >
              $
              {(Number(item.price || 0) * (Number(item.quantity) || 0)).toFixed(
                2,
              )}
            </DataListCell>

            {/* Remove item button */}
            <DataListCell span={1} align="center">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.id)}
                className="text-muted-foreground hover:text-destructive"
                aria-label="Remove item"
              >
                <Icon name="trash" size="md" strokeWidth={1.8} />
              </Button>
            </DataListCell>
          </DataListRow>
        ))}
      </DataListContent>
    </DataList>
  );
}

export default CartReview;
