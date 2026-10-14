import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalCloseButton,
  Badge,
  Button,
  Icon,
  Stack,
  Group,
  Separator,
  QuantityStepper,
  InfoCard,
  InfoRow,
  Heading,
  Text,
} from "./ui";
import DNAIcon from "../assets/DNA-Icon.png";
import GenderIcon from "../assets/Gender2-Icon.png";
import TVShowIcon from "../assets/TV-show-Icon.png";

export default function CharacterModal({ character, onClose }) {
  const { cartItems, addToCart, decreaseQuantity } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!character) return null;

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

  const currentItemInCart = cartItems.find((item) => item.id === id);
  const currentQuantity = currentItemInCart ? currentItemInCart.quantity : 0;
  const favorited = isFavorite(id);

  const epCount = episode?.length || 0;
  const starRatingColor =
    epCount > 50
      ? "text-amber-400"
      : epCount > 30
      ? "text-muted-foreground"
      : "text-amber-700";

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

  const calculatedPrice = (parseInt(epCount || 1, 10) * 0.4).toFixed(1);
  const formattedDate = created
    ? new Date(created).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Unknown";

  return (
    <Modal isOpen={Boolean(character)} onClose={onClose} position="top" backdrop="blur">
      <ModalContent size="4xl" className="max-h-[90vh] rounded-3xl backdrop-blur-xl overflow-hidden">
        {/* Glow Ambient Effects */}
        <div className="absolute top-0 right-1/4 w-72 h-36 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-60 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <ModalHeader className="relative z-10">
          <Stack gap="xs" className="min-w-0">
            <Group align="center" gap="sm">
              <span
                className={`text-[22px] leading-none shrink-0 select-none ${starRatingColor}`}
                title={`${epCount} episodes appearance tier`}
              >
                ★
              </span>
              <ModalTitle id="modal-character-title" className="truncate max-w-[200px] sm:max-w-md">
                {name}
              </ModalTitle>
            </Group>

            <div className="pl-0.5">
              <Badge
                variant={statusConfig.variant}
                className="gap-1.5 px-2.5 py-0.5 text-[11px] backdrop-blur-md shadow-sm"
              >
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusConfig.dot}`} />
                {status}
              </Badge>
            </div>
          </Stack>

          <Group align="center" gap="sm" className="pt-0.5">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => toggleFavorite(character)}
              className="w-8 h-8 rounded-xl bg-card border-border hover:border-destructive/40 hover:bg-destructive/10 active:scale-95 transition-all p-0 text-destructive"
              aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
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
            <ModalCloseButton onClick={onClose} />
          </Group>
        </ModalHeader>

        {/* Modal Body */}
        <ModalBody className="relative z-10 p-5 sm:p-6">
          <Stack gap="xl">
            {/* Top Grid: Image + Info */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Character Image */}
              <div className="md:col-span-5 flex justify-center sm:justify-start">
                <div className="relative w-full max-w-[280px] aspect-square rounded-2xl overflow-hidden bg-muted/40 shadow-xl border border-border">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Character Specs & Rows */}
              <Stack gap="md" className="md:col-span-7">
                {/* 3 Quick Spec Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
                  <InfoCard iconSrc={DNAIcon} label="Species" iconSize="lg" value={species} />
                  <InfoCard iconSrc={GenderIcon} label="Gender" iconSize="lg" value={gender} />
                  <InfoCard
                    iconSrc={TVShowIcon}
                    label="Episodes"
                    iconSize="lg"
                    value={`${epCount} ${epCount === 1 ? "Ep" : "Eps"}`}
                  />
                </div>

                {/* Extended Details */}
                <Stack gap="xs">
                  {type && <InfoRow label="Type / Subtype" value={type} />}
                  <InfoRow
                    label="Origin Dimension / Planet"
                    value={
                      <span className="flex items-center gap-1.5 truncate">
                        <span role="img" aria-label="origin">🌍</span>
                        <span className="truncate">{origin?.name || "Unknown"}</span>
                      </span>
                    }
                  />
                  <InfoRow
                    label="Last Known Location"
                    value={
                      <span className="flex items-center gap-1.5 truncate">
                        <span role="img" aria-label="location">📍</span>
                        <span className="truncate">{location?.name || "Unknown"}</span>
                      </span>
                    }
                  />
                </Stack>
              </Stack>
            </div>

            {/* Pricing Bar */}
            <Group
              justify="between"
              align="center"
              className="p-4 rounded-2xl bg-muted/40 border border-border/80"
            >
              <Stack gap="none">
                <Text as="span" size="micro" variant="muted" className="font-mono uppercase tracking-wider font-semibold">
                  Collector's Value
                </Text>
                <Text as="span" size="xl" weight="bold" variant="primary" className="font-mono">
                  ${calculatedPrice}
                </Text>
              </Stack>

              <QuantityStepper
                quantity={currentQuantity}
                onIncrease={() => addToCart(character)}
                onDecrease={() => decreaseQuantity(id)}
              />
            </Group>

            <Separator />

            {/* Episode List Section */}
            <Stack gap="sm">
              <Heading as="h3" size="sm" variant="muted" className="text-xs uppercase tracking-wider font-semibold font-mono">
                Appeared In {epCount} Episode{epCount === 1 ? "" : "s"}
              </Heading>

              {epCount > 0 ? (
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                  {episode.map((epUrl) => {
                    const epNumber = epUrl.split("/").filter(Boolean).pop();
                    return (
                      <span
                        key={epUrl}
                        className="w-[1.4rem] h-[1.4rem] flex items-center justify-center text-[11px] font-mono font-bold rounded-lg bg-muted/40 text-muted-foreground border border-border hover:border-primary/50 hover:text-primary hover:bg-primary/10 transition-colors cursor-default"
                        title={`Episode ${epNumber}`}
                      >
                        {epNumber}
                      </span>
                    );
                  })}
                </div>
              ) : (
                <Text size="xs" variant="muted" className="italic">
                  No episode data available.
                </Text>
              )}

              {/* Footer Metadata */}
              <Separator className="mt-2" />
              <Group justify="between" align="center" className="text-xs text-muted-foreground/60 font-mono">
                <span>Database Entry</span>
                <span>{formattedDate}</span>
              </Group>
            </Stack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
