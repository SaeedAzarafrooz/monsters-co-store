import { useState } from "react";

export function CardSkeleton() {
  return (
    <div className="flex flex-col bg-app-card border border-app-border w-64 h-[410px] rounded-2xl overflow-hidden animate-pulse">
      {/* Header Skeleton */}
      <div className="p-4 flex flex-col items-center gap-2">
        <div className="w-16 h-4 bg-app-border rounded-md" />
        <div className="w-32 h-5 bg-app-border rounded-md" />
      </div>
      {/* Image Skeleton */}
      <div className="w-full h-56 bg-app-border shrink-0" />
      {/* Content Skeleton */}
      <div className="p-4 flex-1 space-y-4">
        <div className="w-full h-8 bg-app-border rounded-md" />
        <div className="w-24 h-4 bg-app-border rounded-md" />
      </div>
    </div>
  );
}

function Card({ props, onClick }) {
  const { image, name, id, episode, gender, status, species, type } = props;
  const [imageLoaded, setImageLoaded] = useState(false);

  // Logic for Star Rating
  const epCount = episode?.length || 0;
  const starRating = epCount > 50 ? { color: "text-yellow-400" } : 
                     epCount > 30 ? { color: "text-slate-400 dark:text-slate-300" } : 
                                   { color: "text-amber-700" };

  const statusConfig = {
    Alive: { dot: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]", badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/20" },
    Dead: { dot: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]", badge: "bg-rose-500/10 text-rose-600 dark:text-rose-300 border-rose-500/20" },
    unknown: { dot: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]", badge: "bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/20" },
  }[status] || { dot: "bg-slate-400", badge: "bg-app-card text-app-text-muted border-app-border" };

  const calculatedPrice = (parseInt(episode?.length || 1, 10) * 0.4).toFixed(1);

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick?.(); } }}
      className="
        group relative flex flex-col w-64 h-[410px] rounded-2xl cursor-pointer overflow-hidden
        bg-app-card border border-app-border hover:border-emerald-500/50
        shadow-lg hover:shadow-2xl hover:shadow-emerald-950/20
        transition-all duration-300 ease-out hover:-translate-y-1.5 backdrop-blur-sm
      "
    >
      {/* 1. Header: ID, Star, Name (Centered) */}
      <div className="p-2 flex justify-center items-center gap-1 shrink-0">
          <span className={`text-[18px] ${starRating.color}`}>★</span>
       <div>
         <h3 title={name} className="text-center text-lg font-bold text-app-text truncate w-full">
          {name}
        </h3>
        </div>
      </div>

      {/* 2. Image Container */}
      <div className="relative w-full h-56 bg-app-bg shrink-0 overflow-hidden">
        {!imageLoaded && <div className="absolute inset-0 bg-app-border animate-pulse" />}
        <img
          className={`w-full h-full object-cover transition-all duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          src={image}
          alt={name}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />

        {/* Floating Badges */}
        <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border backdrop-blur-md bg-app-card/80 ${statusConfig.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
          {status}
        </div>
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-bold font-mono text-emerald-600 dark:text-emerald-300 bg-app-card/90 border border-emerald-500/30 backdrop-blur-md">
          ${calculatedPrice}
        </div>
      </div>

      {/* 3. Details & Footer */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-app-text-muted">
           <span className="px-2 py-0.5 rounded-md bg-app-border/40 border border-app-border text-app-text">{species}</span>
           <span className="px-2 py-0.5 rounded-md bg-app-border/40 border border-app-border text-app-text-muted">{gender}</span>
        </div>

        {/* Footer: Episodes */}
        <div className="pt-2 border-t border-app-border flex items-center justify-between text-xs">
          <div className="text-app-text-muted text-[11px] flex items-center gap-1">
            <span>📺</span>
            <span>{episode?.length || 0} {episode?.length === 1 ? "Ep" : "Eps"}</span>
          </div>
          {/* Space reserved for future Add to Cart button */}
        </div>
      </div>
    </div>
  );
}

export default Card;
