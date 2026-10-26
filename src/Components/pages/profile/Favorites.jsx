import { Link } from "react-router-dom";
import { useFavorites } from "../../../context/FavoritesContext";
import Card from "../../Card";
import {
  Button,
  EmptyState,
  Icon,
  Skeleton,
} from "../../ui";

export default function Favorites() {
  const { favorites, favoriteIds, isHydrating, clearFavorites } = useFavorites();

  // If hydrating or we have IDs but full character objects aren't loaded yet
  const shouldShowSkeleton = isHydrating || (favoriteIds.length > 0 && favorites.length === 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-5">
        <div>
          <h1 className="text-2xl font-black text-foreground tracking-tight">
            My Favorites
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Manage your saved portal characters and stickers ({favoriteIds.length})
          </p>
        </div>

        {favoriteIds.length > 0 && !shouldShowSkeleton && (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={clearFavorites}
            className="text-xs"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Content */}
      {shouldShowSkeleton ? (
        <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
          {Array.from({ length: favoriteIds.length || 3 }).map((_, idx) => (
            <Skeleton key={idx} variant="card" className="w-[280px] h-[360px]" />
          ))}
        </div>
      ) : favorites.length === 0 ? (
        <EmptyState
          title="No favorites yet"
          description="Click the heart icon on any character card across the portal to keep them here for quick access."
          icon={<Icon name="heart" size="xl" />}
          action={
            <Button asChild>
              <Link to="/products">Explore Characters</Link>
            </Button>
          }
          className="border border-border rounded-2xl bg-card p-8 py-16"
        />
      ) : (
        <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
          {favorites.map((character) => (
            <Card key={character.id} props={character} />
          ))}
        </div>
      )}
    </div>
  );
}
