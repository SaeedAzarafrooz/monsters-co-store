import { Link } from "react-router-dom";
import { useFavorites } from "../../../context/FavoritesContext";
import Card, { CardSkeleton } from "../../Card";

export default function Favorites() {
  const { favorites, favoriteIds, isHydrating, clearFavorites } = useFavorites();

  // If hydrating or we have IDs but full character objects aren't loaded yet
  const shouldShowSkeleton = isHydrating || (favoriteIds.length > 0 && favorites.length === 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-app-border pb-5">
        <div>
          <h1 className="text-2xl font-black text-app-text tracking-tight">
            My Favorites
          </h1>
          <p className="mt-1 text-sm text-app-muted">
            Manage your saved portal characters and stickers ({favoriteIds.length})
          </p>
        </div>

        {favoriteIds.length > 0 && !shouldShowSkeleton && (
          <button
            type="button"
            onClick={clearFavorites}
            className="px-3.5 py-1.5 text-xs font-bold text-rose-500 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Content */}
      {shouldShowSkeleton ? (
        <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
          {Array.from({ length: favoriteIds.length || 3 }).map((_, idx) => (
            <CardSkeleton key={idx} />
          ))}
        </div>
      ) : favorites.length === 0 ? (
        <div className="py-16 text-center bg-app-bg border border-app-border rounded-2xl p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-app-text">No favorites yet</h3>
          <p className="text-xs text-app-muted mt-1 max-w-sm mx-auto">
            Click the heart icon on any character card across the portal to keep them here for quick access.
          </p>
          <Link to="/products" className="mt-4 inline-block px-4 py-2 bg-app-accent text-app-bg text-xs font-bold rounded-xl hover:opacity-90 transition-opacity">
            Explore Characters
          </Link>
        </div>
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
