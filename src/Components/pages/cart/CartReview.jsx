import { Link } from "react-router-dom";

function CartReview({ cartItems, addToCart, decreaseQuantity, removeItem }) {
  if (!cartItems.length) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p className="text-app-muted text-base">Your shopping cart is currently empty.</p>
        <Link
          to="/products"
          className="inline-block mt-4 text-sm font-bold text-app-accent hover:underline"
        >
          Explore products
        </Link>
      </div>
    );
  }

  return (
    <div className="w-[700px] h-full flex flex-col min-h-0">
      <div className="hidden sm:grid grid-cols-12 gap-4 px-4 pb-3 border-b border-app-border text-xs font-bold uppercase tracking-wider text-app-muted shrink-0">
        <span className="col-span-6">Product</span>
        <span className="col-span-3 text-center">Quantity</span>
        <span className="col-span-2 text-right">Price</span>
        <span className="col-span-1 text-center">Remove</span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pt-3 space-y-3">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center bg-app-hover p-4 rounded-xl border border-app-border"
          >
            <div className="col-span-6 flex items-center gap-4 w-full min-w-0">
              <img
                src={item.image}
                className="w-16 h-16 rounded-lg object-cover border border-app-border shrink-0"
                alt={item.name}
                loading="lazy"
              />
              <div className="min-w-0 flex-1">
                <p className="font-extrabold text-app-text truncate">{item.name}</p>
                <p className="text-xs text-app-muted mt-1">
                  ${Number(item.price || 0).toFixed(2)} each
                </p>
              </div>
            </div>

            <div className="col-span-3 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => decreaseQuantity(item.id)}
                disabled={item.quantity <= 1}
                className={`w-8 h-8 rounded-lg bg-app-card border border-app-border flex items-center justify-center font-bold transition-colors ${
                  item.quantity <= 1
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-app-hover"
                }`}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-8 text-center font-extrabold text-sm">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() => addToCart(item)}
                className="w-8 h-8 rounded-lg bg-app-card border border-app-border flex items-center justify-center font-bold hover:bg-app-hover transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <div className="col-span-2 text-right font-extrabold text-app-accent text-base">
              ${(Number(item.price || 0) * (Number(item.quantity) || 0)).toFixed(2)}
            </div>

            <div className="col-span-1 flex justify-center">
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="p-2 text-app-muted hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                aria-label="Remove item"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default CartReview