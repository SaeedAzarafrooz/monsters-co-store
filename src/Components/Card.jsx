import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

// ==========================================
// Loading Skeleton for Initial Page Load & Image Loading
// ==========================================
export function CardSkeleton() {
  // Reusable shimmer block with visible contrast in both light & dark themes
  const Shimmer = ({ className }) => (
    <div className={`relative overflow-hidden bg-foreground/10 rounded-md ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
    </div>
  );

  return (
    <div className="flex flex-col bg-card border border-border w-64 h-[410px] rounded-2xl overflow-hidden shadow-card">
      {/* Header Skeleton */}
      <div className="p-3 flex justify-center items-center gap-2 border-b border-border/40 shrink-0">
        <Shimmer className="w-4 h-4 rounded-full" />
        <Shimmer className="w-28 h-5" />
      </div>

      {/* Image Skeleton */}
      <div className="w-full h-56 bg-foreground/5 shrink-0 relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
        <svg
          className="w-10 h-10 text-foreground/20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* Content & Footer Skeleton */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div className="flex gap-2">
          <Shimmer className="w-14 h-5" />
          <Shimmer className="w-12 h-5" />
        </div>
        <div className="pt-2 border-t border-border/40 flex items-center justify-between">
          <Shimmer className="w-16 h-4" />
          <Shimmer className="w-14 h-7 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Main Character Card Component
// ==========================================
function Card({ props, onClick }) {
  const { image, name, id, episode, gender, status, species } = props;
  const [imageLoaded, setImageLoaded] = useState(false);

  // Cart context integration
  const { cartItems, addToCart, decreaseQuantity } = useCart();
  const currentItemInCart = cartItems.find((item) => item.id === id);
  const currentQuantity = currentItemInCart ? currentItemInCart.quantity : 0;

  // Favorites context integration
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(id);

  // Logic for Star Rating
  const epCount = episode?.length || 0;
  const starRating =
    epCount > 50
      ? { color: "text-amber-400" }
      : epCount > 30
      ? { color: "text-muted-foreground" }
      : { color: "text-amber-700" };

  // Status badge styling
  const statusConfig =
    {
      Alive: {
        dot: "bg-success shadow-[0_0_8px_hsl(var(--success)/0.8)]",
        badge: "text-success border-success/40",
      },
      Dead: {
        dot: "bg-destructive shadow-[0_0_8px_hsl(var(--destructive)/0.8)]",
        badge: "text-destructive border-destructive/40",
      },
      unknown: {
        dot: "bg-warning shadow-[0_0_8px_hsl(var(--warning)/0.8)]",
        badge: "text-warning border-warning/40",
      },
    }[status] || {
      dot: "bg-muted-foreground",
      badge: "text-muted-foreground border-border",
    };

  const calculatedPrice = (parseInt(episode?.length || 1, 10) * 0.4).toFixed(1);

  // Render skeleton while image is still downloading in background
  if (!imageLoaded) {
    return (
      <>
        {/* Preload image in background to trigger onLoad */}
        <img
          src={image}
          alt={name}
          className="hidden"
          onLoad={() => setImageLoaded(true)}
        />
        <CardSkeleton />
      </>
    );
  }

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className="
        group relative flex flex-col w-64 h-[410px] rounded-2xl cursor-pointer overflow-hidden
        bg-card border border-border hover:border-primary/50
        shadow-card hover:shadow-card-hover
        transition-all duration-300 ease-out hover:-translate-y-1.5 backdrop-blur-sm
      "
    >
      {/* 1. Header: Star & Name (Centered) */}
      <div className="p-2 flex justify-center items-center gap-1 shrink-0">
        <span className={`text-[18px] ${starRating.color}`}>★</span>
        <div className="min-w-0">
          <h3
            title={name}
            className="text-center text-lg font-bold text-foreground truncate w-full"
          >
            {name}
          </h3>
        </div>
      </div>

      {/* 2. Image Container */}
      <div className="relative w-full h-56 bg-muted/60 shrink-0 overflow-hidden flex items-center justify-center">
        <img
          className="w-full h-full object-cover transition-opacity duration-300 opacity-100"
          src={image}
          alt={name}
          loading="lazy"
        />

        {/* Floating Badges: Status (Solid backdrop, crisp borders and text) */}
        <div
          className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border backdrop-blur-md bg-card/90 shadow-sm ${statusConfig.badge}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusConfig.dot}`} />
          {status}
        </div>

        {/* Favorite Heart Button & Price Tag */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(props);
            }}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-card/90 border border-border backdrop-blur-md hover:scale-110 active:scale-90 transition-transform shadow-sm"
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
            title={favorited ? "Remove from favorites" : "Add to favorites"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4 transition-colors ${
                favorited
                  ? "fill-destructive text-destructive"
                  : "fill-none text-muted-foreground hover:text-destructive"
              }`}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>

          <div className="px-2 py-0.5 rounded-full text-xs font-bold font-mono text-primary bg-card/90 border border-primary/30 backdrop-blur-md shadow-sm">
            ${calculatedPrice}
          </div>
        </div>
      </div>

      {/* 3. Details & Footer */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div className="flex wrap items-center gap-1.5 text-[11px] text-muted-foreground">
          <span className="px-2 py-0.5 rounded-md bg-muted/60 border border-border text-foreground">
            {species}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-muted/60 border border-border text-muted-foreground">
            {gender}
          </span>
        </div>

        {/* Footer: Episodes & Cart Actions */}
        <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
          <div className="text-muted-foreground text-[11px] flex items-center gap-1">
            <span>📺</span>
            <span>
              {episode?.length || 0} {episode?.length === 1 ? "Ep" : "Eps"}
            </span>
          </div>

          {/* Cart Action Button / Controls */}
          {currentQuantity === 0 ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(props);
              }}
              className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-primary/15 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/30 transition-all duration-200 active:scale-95 flex items-center gap-1"
            >
              <span>+</span>
              <span>Add</span>
            </button>
          ) : (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 bg-muted/60 border border-border px-1 py-0.5 rounded-lg"
            >
              <button
                type="button"
                onClick={() => decreaseQuantity(id)}
                className="w-5 h-5 flex items-center justify-center rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors font-bold text-xs"
                title={currentQuantity === 1 ? "Remove" : "Decrease"}
              >
                {currentQuantity === 1 ? "✕" : "−"}
              </button>

              <span className="text-[11px] font-bold font-mono text-foreground px-1">
                {currentQuantity}
              </span>

              <button
                type="button"
                onClick={() => addToCart(props)}
                className="w-5 h-5 flex items-center justify-center rounded text-primary hover:bg-primary/20 transition-colors font-bold text-xs"
                title="Increase"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
