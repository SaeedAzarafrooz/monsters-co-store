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
  Paragraph,
  Caption,
  QuantityStepper,
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
        {cartItems.map((item) => {
          const qty = Number(item.quantity) || 1;
          const price = Number(item.Number || item.price) || 0;

          return (
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
                  <Paragraph className="font-extrabold text-foreground truncate">
                    {item.name}
                  </Paragraph>
                  <Caption className="text-xs text-muted-foreground mt-1 block">
                    ${price.toFixed(2)} each
                  </Caption>
                </div>
              </DataListCell>

              {/* Quantity controls */}
              <DataListCell span={3} align="center">
                <QuantityStepper
                  quantity={qty}
                  onIncrease={() => addToCart(item)}
                  onDecrease={() => decreaseQuantity(item.id)}
                />
              </DataListCell>

              {/* Line total price */}
              <DataListCell
                span={2}
                align="right"
                className="font-extrabold text-primary text-base"
              >
                ${(price * qty).toFixed(2)}
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
          );
        })}
      </DataListContent>
    </DataList>
  );
}

export default CartReview;
