import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import DNAIcon from "../assets/DNA-Icon.png";
import GenderIcon from "../assets/Gender2-Icon.png";
import TVShowIcon from "../assets/TV-show-Icon.png";
import { Icon } from "./ui";

/**
 * Character detail modal dialog.
 * Rendered directly into the #modal DOM node via React Portal.
 *
 * @param {Object} props
 * @param {Object|null} props.character - The selected Rick & Morty character object
 * @param {Function} props.onClose - Callback triggered to close the modal
 */
export default function CharacterModal({ character, onClose }) {
  // Cart & Favorites integration
  const { cartItems, addToCart, decreaseQuantity } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const currentItemInCart = character
    ? cartItems.find((item) => item.id === character.id)
    : null;
  const currentQuantity = currentItemInCart ? currentItemInCart.quantity : 0;
  const favorited = character ? isFavorite(character.id) : false;

  // Lock body scroll and handle Escape key for accessibility
  useEffect(() => {
    if (!character) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [character, onClose]);

  // Prevent rendering if no character is provided
  if (!character) return null;

  // Find the portal root DOM node
  const modalRoot = document.getElementById("modal");
  if (!modalRoot) return null;

  const {
    id,
    name,
    image,
    status,
    species,
    type,
    gender,
    origin,
    location,
    episode = [],
    created,
  } = character;

  // Logic for Star Rating
  const epCount = episode?.length || 0;
  const starRating =
    epCount > 50
      ? { color: "text-amber-400" }
      : epCount > 30
        ? { color: "text-muted-foreground" }
        : { color: "text-amber-700" };

  // Status configuration matching the Card component
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

  const formattedDate = created
    ? new Date(created).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Unknown";

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-character-title"
      className="fixed inset-0 z-[1000] flex justify-center items-start pt-16 sm:items-center sm:pt-0 p-3 sm:p-4 bg-black/70 backdrop-blur-md transition-all duration-300"
      onClick={onClose}
    >
      {/* Modal Container: max-w-4xl for a wider, modern aspect ratio */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-card border border-border rounded-3xl shadow-2xl text-foreground overflow-hidden backdrop-blur-xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient background effect */}
        <div className="absolute top-0 right-1/4 w-72 h-36 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-60 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header: Title + Status Badge underneath */}
        <div className="relative z-10 flex items-start justify-between px-6 py-4 border-b border-border/40 bg-card/70 backdrop-blur-md">
          <div className="flex flex-col gap-1.5 min-w-0">
            <div className="flex items-center gap-2">
              <span
                className={`text-[22px] leading-none shrink-0 ${starRating.color}`}
              >
                ★
              </span>
              <h2
                id="modal-character-title"
                className="text-lg md:text-xl font-bold text-foreground tracking-wide truncate max-w-[200px] sm:max-w-md"
              >
                {name}
              </h2>
            </div>

            {/* Status Badge moved directly below character name */}
            <div className="pl-0.5">
              <Badge
                variant={statusConfig.variant}
                className="gap-1.5 px-2.5 py-0.5 text-[11px] backdrop-blur-md shadow-sm"
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusConfig.dot}`}
                />
                {status}
              </Badge>
            </div>
          </div>

          {/* Action Buttons: Favorite + Close */}
          <div className="flex items-center gap-2 pt-0.5">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => toggleFavorite(character)}
              className="w-8 h-8 rounded-xl bg-card border-border hover:border-destructive/40 hover:bg-destructive/10 active:scale-95 transition-all p-0"
              aria-label={
                favorited ? "Remove from favorites" : "Add to favorites"
              }
              title={favorited ? "Remove from favorites" : "Add to favorites"}
            >
              <Icon
                name="heart"
                size="sm"
                fill={favorited ? "currentColor" : "none"}
                className={`transition-colors ${
                  favorited
                    ? "text-destructive"
                    : "text-muted-foreground hover:text-destructive"
                }`}
              />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={onClose}
              aria-label="Close modal"
              className="w-8 h-8 rounded-xl bg-card border-border hover:border-destructive/40 hover:bg-destructive/10 active:scale-95 transition-all p-0 group/close"
            >
              <Icon name="close" size="xs" className="opacity-70 group-hover/close:opacity-100 transition-opacity" />
            </Button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="relative z-10 overflow-y-auto p-5 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left Column: Image (clean with no badge on top) */}
            <div className="md:col-span-5 flex justify-center sm:justify-start">
              <div className="relative w-full max-w-[280px] aspect-square rounded-2xl overflow-hidden bg-muted/40 shadow-xl border border-border">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Column: Species, Gender, Episodes, Origin, and Locations */}
            <div className="md:col-span-7 flex flex-col space-y-3.5">
              {/* Top Trait Badges: Species, Gender, Episodes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
                {/* Species */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/40 border border-border/60 text-xs text-foreground">
                  <img
                    src={DNAIcon}
                    alt="Species"
                    className="w-5 h-5 object-contain drop-shadow-[0_0_6px_rgba(56,189,248,0.6)] shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] text-muted-foreground block leading-tight">
                      Species
                    </span>
                    <span className="font-semibold truncate block">
                      {species}
                    </span>
                  </div>
                </div>

                {/* Gender */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/40 border border-border/60 text-xs text-foreground">
                  <img
                    src={GenderIcon}
                    alt="Gender"
                    className="w-5 h-5 object-contain drop-shadow-[0_0_6px_rgba(56,189,248,0.6)] shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] text-muted-foreground block leading-tight">
                      Gender
                    </span>
                    <span className="font-semibold truncate block">
                      {gender}
                    </span>
                  </div>
                </div>

                {/* Episodes count */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/40 border border-border/60 text-xs text-foreground">
                  <img
                    src={TVShowIcon}
                    alt="Episodes"
                    className="w-5 h-5 object-contain drop-shadow-[0_0_6px_rgba(56,189,248,0.6)] shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] text-muted-foreground block leading-tight">
                      Episodes
                    </span>
                    <span className="font-semibold font-mono truncate block">
                      {epCount} {epCount === 1 ? "Ep" : "Eps"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Lower Details: Type, Origin, Last Known Location */}
              <div className="space-y-2.5 text-sm">
                {type && (
                  <div className="p-3 rounded-xl bg-muted/30 border border-border">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block mb-0.5">
                      Type / Subtype
                    </span>
                    <p className="text-foreground font-medium">{type}</p>
                  </div>
                )}

                {/* Origin */}
                <div className="p-3 rounded-xl bg-muted/30 border border-border">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block mb-0.5">
                    Origin Dimension / Planet
                  </span>
                  <p className="text-foreground font-medium flex items-center gap-1.5">
                    <span role="img" aria-label="origin">
                      🌍
                    </span>
                    <span className="truncate">
                      {origin?.name || "Unknown"}
                    </span>
                  </p>
                </div>

                {/* Last Known Location */}
                <div className="p-3 rounded-xl bg-muted/30 border border-border">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block mb-0.5">
                    Last Known Location
                  </span>
                  <p className="text-foreground font-medium flex items-center gap-1.5">
                    <span role="img" aria-label="location">
                      📍
                    </span>
                    <span className="truncate">
                      {location?.name || "Unknown"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width Section: Price & Cart Actions */}
          <div className="p-4 rounded-2xl bg-muted/40 border border-border/80 flex items-center justify-between w-full">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                Price
              </span>
              <span className="text-xl font-bold font-mono text-primary">
                ${calculatedPrice}
              </span>
            </div>

            {/* Cart Action Container (Identical to Card with Smooth Slide Transition) */}
            <div className="relative w-[82px] h-8 overflow-hidden rounded-xl">
              {/* 1. Add to Cart Button */}
              <Button
                type="button"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(character);
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
                <Icon name="cart" size="xs" strokeWidth={2} />
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
                    <Icon
                      name="close"
                      className="w-3 h-3 opacity-70 group-hover/dec:opacity-100 transition-opacity"
                    />
                  ) : (
                    <Icon name="minus" className="w-3 h-3" strokeWidth={2.5} />
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
                  onClick={() => addToCart(character)}
                  className="
                    group/inc h-full w-7 p-0 flex items-center justify-center
                    text-muted-foreground hover:text-primary hover:bg-primary/15
                    rounded-r-xl rounded-l-none transition-colors shrink-0
                  "
                  title="Increase"
                >
                  <Icon name="plus" className="w-3 h-3" strokeWidth={2.5} />
                </Button>
              </div>
            </div>
          </div>

          {/* Episode List */}
          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                Appeared In {episode.length} Episode
                {episode.length > 1 ? "s" : ""}
              </h3>
            </div>

            {episode.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                {episode.map((epUrl) => {
                  const epNumber = epUrl.split("/").filter(Boolean).pop();
                  return (
                    <span
                      key={epUrl}
                      className="w-[1.4rem] h-[1.4rem] flex items-center justify-center text-[11px] font-mono font-bold rounded-lg bg-muted/40 text-muted-foreground border border-border hover:border-primary/50 hover:text-primary hover:bg-primary/10 transition-colors"
                      title={`Episode ${epNumber}`}
                    >
                      {epNumber}
                    </span>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic">
                No episode data available.
              </p>
            )}

            {/* Database Entry (Full-Width, Muted, Right Under Episodes) */}
            <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground/60 font-mono">
              <span>Database Entry</span>
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, modalRoot);
}
