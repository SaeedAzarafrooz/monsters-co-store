import { Link, useNavigate } from "react-router-dom";
import shoppingBagIcon from "../../../assets/shopping-bag.svg";
import cross from "../../../assets/cross.png";

export default function CartDropdown({
  cartContainerRef,
  cartOpen,
  setCartOpen,
  setToggle,
  totalItemsCount,
  cartItems,
  totalPrice,
}) {
  const navigate = useNavigate();

  const handleCheckoutClick = (e) => {
    e.preventDefault();
    setCartOpen(false);
    navigate("/checkout");
  };

  return (
    <div className="relative shrink-0" ref={cartContainerRef}>
      {/* Shopping Cart Trigger Button */}
      <button
        type="button"
        onClick={() => {
          setCartOpen((prev) => !prev);
          setToggle(false);
        }}
        className="relative flex items-center justify-center w-10 h-10 lg:w-11 lg:h-11 rounded-2xl bg-app-bg hover:bg-app-hover border border-app-border transition-all cursor-pointer shadow-sm group"
        aria-label="Shopping Cart"
      >
        <img
          src={shoppingBagIcon}
          alt="Cart"
          className="w-5 h-5 lg:w-6 lg:h-6 object-contain group-hover:scale-110 transition-transform duration-200 dark:invert"
        />
        {totalItemsCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 bg-app-accent text-app-bg text-[11px] font-black font-mono rounded-full flex items-center justify-center shadow-md animate-in zoom-in-75 duration-200">
            {totalItemsCount}
          </span>
        )}
      </button>

      {/* Cart Dropdown Modal */}
      {cartOpen && (
        <div className="absolute right-0 top-12 sm:top-14 w-80 sm:w-88 bg-app-card border border-app-border rounded-2xl shadow-2xl shadow-black/20 dark:shadow-black/80 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150 flex flex-col">
          {/* Dropdown Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-app-border bg-app-bg/50">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-app-text">
                Cart Summary
              </span>
              <span className="px-2 py-0.5 text-[11px] font-mono rounded-full bg-app-accent/10 text-app-accent font-semibold border border-app-accent/20">
                {totalItemsCount} {totalItemsCount === 1 ? "item" : "items"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setCartOpen(false)}
              className="p-1 rounded-lg text-app-muted hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
              title="Close Cart"
            >
              <img
                src={cross}
                alt="close"
                className="w-3.5 h-3.5 opacity-70 dark:invert"
              />
            </button>
          </div>

          {/* Items List */}
          <div className="max-h-72 overflow-y-auto divide-y divide-app-border p-2 space-y-1">
            {cartItems.length === 0 ? (
              <div className="py-8 flex flex-col items-center justify-center text-center px-4">
                <img
                  src={shoppingBagIcon}
                  alt="Empty Cart"
                  className="w-12 h-12 opacity-30 mb-2 dark:invert"
                />
                <p className="text-sm font-semibold text-app-text">
                  Your cart is empty
                </p>
                <p className="text-xs text-app-muted mt-0.5">
                  Explore our portal stickers & add them here!
                </p>
              </div>
            ) : (
              cartItems.map((item) => {
                const unitPrice = Number(item.price || 0).toFixed(1);
                const lineTotal = (
                  Number(item.price || 0) * item.quantity
                ).toFixed(1);
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-app-hover transition-colors"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover border border-app-border shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4
                        className="text-xs font-bold text-app-text truncate"
                        title={item.name}
                      >
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-app-muted">
                        <span className="font-mono text-app-accent font-bold">
                          ${unitPrice}
                        </span>
                        <span>×</span>
                        <span className="font-mono font-semibold text-app-text">
                          {item.quantity}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-app-text">
                        ${lineTotal}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Dropdown Footer & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-3 border-t border-app-border bg-app-bg/60 flex flex-col gap-2.5">
              <div className="flex items-center justify-between px-1 text-sm font-semibold">
                <span className="text-app-muted">Estimated Total:</span>
                <span className="font-mono font-black text-base text-app-accent">
                  ${totalPrice.toFixed(1)}
                </span>
              </div>
              <Link
                to="/checkout"
                onClick={handleCheckoutClick}
                className="w-full py-2.5 px-4 bg-app-accent hover:opacity-90 text-app-bg font-bold text-sm rounded-xl transition-all duration-200 active:scale-[0.98] shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
