import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import crossIcon from "../assets/cross.png";
import DNAIcon from "../assets/DNA-Icon.png";
import GenderIcon from "../assets/Gender2-Icon.png";
import TVShowIcon from "../assets/TV-show-Icon.png";
import { Icon } from "./ui";

// ==========================================
// Loading Skeleton for Initial Page Load & Image Loading
// ==========================================
export function CardSkeleton() {
  const Shimmer = ({ className }) => (
    <div
      className={`relative overflow-hidden bg-foreground/10 rounded-md ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
    </div>
  );

  return (
    <div className="flex flex-col bg-card border border-border w-64 h-[435px] rounded-2xl overflow-hidden shadow-card">
      {/* Header Skeleton */}
      <div className="p-3 flex justify-center items-center gap-2 border-b border-border/40 shrink-0">
        <Shimmer className="w-4 h-4 rounded-full" />
        <Shimmer className="w-28 h-5" />
      </div>

      {/* Image Skeleton */}
      <div className="w-full h-52 bg-foreground/5 shrink-0 relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
        <Icon
          name="imageLoading"
          className="w-10 h-10 text-foreground/20"
          strokeWidth={1.5}
        />
      </div>

      {/* Content & Footer Skeleton */}
      <div className="p-3.5 flex flex-col justify-between flex-1">
        <div className="flex flex-col gap-1.5">
          <Shimmer className="w-24 h-5 rounded-md" />
          <Shimmer className="w-20 h-5 rounded-md" />
          <Shimmer className="w-16 h-5 rounded-md" />
        </div>
        <div className="pt-2 border-t border-border/40 flex items-center justify-between">
          <Shimmer className="w-14 h-6" />
          <Shimmer className="w-16 h-8 rounded-xl" />
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

  // Status badge config with semantic badge variants & dots
  const statusConfig = {
    Alive: {
      variant: "success",
      dot: "bg-success shadow-[0_0_8px_hsl(var(--success)/0.8)]",
    },
    Dead: {
      variant: "destructive",
      dot: "bg-destructive shadow-[0_0_8px_hsl(var(--destructive)/0.8)]",
    },
    unknown: {
      variant: "warning",
      dot: "bg-warning shadow-[0_0_8px_hsl(var(--warning)/0.8)]",
    },
  }[status] || {
    variant: "outline",
    dot: "bg-muted-foreground",
  };

  const calculatedPrice = (parseInt(episode?.length || 1, 10) * 0.4).toFixed(1);

  // Render skeleton while image is still downloading in background
  if (!imageLoaded) {
    return (
      <>
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
        group relative flex flex-col w-64 min-h-[435px] rounded-2xl cursor-pointer overflow-hidden
        bg-card border border-border hover:border-primary/50
        shadow-card hover:shadow-card-hover
        transition-all duration-300 ease-out hover:-translate-y-1.5 [backface-visibility:hidden] will-change-transform backdrop-blur-sm
      "
    >
      {/* 1. Header: Star & Name */}
      <div className="p-2.5 flex justify-center items-center gap-1.5 shrink-0 border-b border-border/30">
        <span className={`text-[17px] leading-none ${starRating.color}`}>
          ★
        </span>
        <div className="min-w-0">
          <h3
            title={name}
            className="text-center text-base font-bold text-foreground truncate w-full"
          >
            {name}
          </h3>
        </div>
      </div>

      {/* 2. Image Container (No hover transition on image) */}
      <div className="relative w-full h-52 bg-muted/60 shrink-0 overflow-hidden flex items-center justify-center">
        <img
          className="w-full h-full object-cover"
          src={image}
          alt={name}
          loading="lazy"
        />

        {/* Floating Badges: Status */}
        <div className="absolute top-3 left-3">
          <Badge
            variant={statusConfig.variant}
            className="gap-1.5 px-2.5 py-0.5 text-[10px] backdrop-blur-md bg-card/90 shadow-sm"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusConfig.dot}`}
            />
            {status}
          </Badge>
        </div>

        {/* Favorite Button */}
        <div className="absolute top-3 right-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(props);
            }}
            className="w-7 h-7 rounded-full bg-card/90 border-border backdrop-blur-md hover:scale-110 active:scale-90 transition-transform shadow-sm p-0"
            aria-label={
              favorited ? "Remove from favorites" : "Add to favorites"
            }
            title={favorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Icon
              name="heart"
              size="md"
              className={`w-4 h-4 transition-colors ${
                favorited
                  ? "fill-destructive text-destructive"
                  : "fill-none text-muted-foreground hover:text-destructive"
              }`}
            />
          </Button>
        </div>
      </div>

      {/* 3. Details & Footer */}
      <div className="p-3.5 flex flex-col justify-between flex-1 gap-2.5">
        {/* Compact Stacked Tags with Instant Tooltips */}
        <div className="flex flex-col items-start gap-2.5">
          {/* Species Tag */}
          <div className="group/tip relative inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-muted/40 border border-border/50 text-[11px] text-foreground hover:bg-muted/70 transition-colors">
            <img
              src={DNAIcon}
              alt="Remove"
              className="absolute drop-shadow-[0_0_6px_rgba(56,189,248,0.6)] w-6 h-6 object-contain opacity-70 group-hover/dec:opacity-100 transition-opacity"
            />
            <span className="ml-10 font-medium truncate max-w-[170px]">
              {species}
            </span>

            {/* Instant Tooltip */}
            <span className="pointer-events-none absolute left-full ml-1.5 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover/tip:opacity-100 transition-opacity duration-150 rounded bg-popover text-popover-foreground border border-border px-1.5 py-0.5 text-[10px] font-medium shadow-md whitespace-nowrap">
              Character Species
            </span>
          </div>

          {/* Gender Tag */}
          <div className="group/tip relative inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-muted/40 border border-border/50 text-[11px] text-foreground hover:bg-muted/70 transition-colors">
            <img
              src={GenderIcon}
              alt="Remove"
              className="absolute drop-shadow-[0_0_6px_rgba(56,189,248,0.6)] w-6 h-6 object-contain opacity-70 group-hover/dec:opacity-100 transition-opacity"
            />
            <span className="ml-10 font-medium truncate max-w-[170px]">
              {gender}
            </span>

            {/* Instant Tooltip */}
            <span className="pointer-events-none absolute left-full ml-1.5 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover/tip:opacity-100 transition-opacity duration-150 rounded bg-popover text-popover-foreground border border-border px-1.5 py-0.5 text-[10px] font-medium shadow-md whitespace-nowrap">
              Character Gender
            </span>
          </div>

          {/* Episodes Tag */}
          <div className="group/tip relative inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-muted/40 border border-border/50 text-[11px] text-foreground hover:bg-muted/70 transition-colors">
            <img
              src={TVShowIcon}
              alt="Remove"
              className="absolute drop-shadow-[0_0_6px_rgba(56,189,248,0.6)] w-6 h-6 object-contain opacity-70 group-hover/dec:opacity-100 transition-opacity"
            />
            <span className="ml-10 font-mono font-medium">
              {episode?.length || 0} {episode?.length === 1 ? "Ep" : "Eps"}
            </span>

            {/* Instant Tooltip */}
            <span className="pointer-events-none absolute left-full ml-1.5 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover/tip:opacity-100 transition-opacity duration-150 rounded bg-popover text-popover-foreground border border-border px-1.5 py-0.5 text-[10px] font-medium shadow-md whitespace-nowrap">
              Total Episodes Appeared In
            </span>
          </div>
        </div>

        {/* Footer: Price & Cart Action */}
        <div className="pt-2 border-t border-border flex items-center justify-between">
          {/* Price Section */}
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
              Price
            </span>
            <span className="text-sm font-bold font-mono text-primary">
              ${calculatedPrice}
            </span>
          </div>

          {/* Cart Action Container (Seamless fixed size with slide transition) */}
          <div className="relative w-[82px] h-8 overflow-hidden rounded-xl">
            {/* 1. Add to Cart Button */}
            <Button
              type="button"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(props);
              }}
              className={`
                absolute inset-0 w-full h-full rounded-xl gap-1.5 text-xs font-semibold shadow-sm p-0 justify-center
                transition-all duration-300 ease-out
                ${
                  currentQuantity === 0
                    ? "translate-x-0 opacity-100 pointer-events-auto"
                    : "translate-x-full opacity-0 pointer-events-none"
                }
              `}
              title="Add to cart"
            >
              <Icon name="cart" size="md" />
              <span>Add</span>
            </Button>

            {/* 2. Quantity Controls Capsule */}
            <div
              onClick={(e) => e.stopPropagation()}
              className={`
                absolute inset-0 flex items-center h-full w-full bg-muted/60 border border-border rounded-xl shadow-inner
                transition-all duration-300 ease-out
                ${
                  currentQuantity > 0
                    ? "translate-x-0 opacity-100 pointer-events-auto"
                    : "-translate-x-full opacity-0 pointer-events-none"
                }
              `}
            >
              {/* Decrease / Remove Button */}
              <Button
                type="button"
                variant="ghost"
                onClick={() => decreaseQuantity(id)}
                className="
                  group/dec h-full w-7 p-0 flex items-center justify-center
                  text-muted-foreground hover:text-destructive hover:bg-destructive/15
                  rounded-l-xl rounded-r-none transition-colors shrink-0
                "
                title={currentQuantity === 1 ? "Remove" : "Decrease"}
              >
                {currentQuantity === 1 ? (
                  <img
                    src={crossIcon}
                    alt="Remove"
                    className="w-3 h-3 object-contain opacity-70 group-hover/dec:opacity-100 transition-opacity"
                  />
                ) : (
                  <Icon name="minus" size="xs" />
                )}
              </Button>

              {/* Quantity */}
              <span className="text-xs font-bold font-mono text-foreground px-1 select-none min-w-[24px] text-center leading-none">
                {currentQuantity}
              </span>

              {/* Increase Button */}
              <Button
                type="button"
                variant="ghost"
                onClick={() => addToCart(props)}
                className="
                  group/inc h-full w-7 p-0 flex items-center justify-center
                  text-muted-foreground hover:text-primary hover:bg-primary/15
                  rounded-r-xl rounded-l-none transition-colors shrink-0
                "
                title="Increase"
              >
                <Icon name="plus" size="xs" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Card };
export default Card;
