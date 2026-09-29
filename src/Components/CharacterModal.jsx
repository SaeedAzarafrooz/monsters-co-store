import { useEffect } from "react";
import { createPortal } from "react-dom";
import crossIcon from "../assets/cross.png";

/**
 * Character detail modal dialog.
 * Rendered directly into the #modal DOM node via React Portal.
 *
 * @param {Object} props
 * @param {Object|null} props.character - The selected Rick & Morty character object
 * @param {Function} props.onClose - Callback triggered to close the modal
 */
export default function CharacterModal({ character, onClose }) {
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
  const starRating = epCount > 50 ? { color: "text-yellow-400" } : 
                     epCount > 30 ? { color: "text-slate-400 dark:text-slate-300" } : 
                                   { color: "text-amber-700" };

  // Status configuration matching the Card component
  const statusConfig = {
    alive: {
      dot: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]",
      badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/30",
    },
    dead: {
      dot: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]",
      badge: "bg-rose-500/10 text-rose-600 dark:text-rose-300 border-rose-500/30",
    },
    unknown: {
      dot: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]",
      badge: "bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/30",
    },
  }[status?.toLowerCase()] || {
    dot: "bg-slate-400",
    badge: "bg-app-card text-app-text-muted border-app-border",
  };

  const stickerPrice = (episode.length * 0.4).toFixed(1);

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
      className="fixed inset-0 z-[1000] flex justify-center items-start pt-20 sm:items-center sm:pt-0 p-3 sm:p-4 bg-black/60 backdrop-blur-md transition-all duration-300"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-app-card border border-app-border hover:border-emerald-500/40 rounded-3xl shadow-2xl shadow-emerald-950/20 text-app-text overflow-hidden backdrop-blur-xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient background effect */}
        <div className="absolute top-0 right-1/4 w-72 h-36 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-60 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-app-border bg-app-card/70 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2 flex justify-center items-baseline gap-1.5 shrink-0">
              <span className={`text-[24px] ${starRating.color}`}>★</span>
              <h2
                id="modal-character-title"
                className="text-lg md:text-xl font-bold text-app-text tracking-wide truncate max-w-[240px] sm:max-w-md"
              >
                {name}
              </h2>
            </div>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-xl text-app-text-muted bg-app-bg border border-app-border hover:text-app-text hover:border-rose-500/50 hover:bg-rose-500/10 transition-all duration-200 cursor-pointer group"
          >
            <img
              src={crossIcon}
              alt="Close"
              className="w-3.5 h-3.5 object-contain opacity-70 group-hover:opacity-100 dark:invert"
            />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="relative z-10 overflow-y-auto p-5 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Image & Badges */}
            <div className="flex flex-col items-center sm:items-start gap-4">
              <div className="relative w-full max-w-[260px] aspect-square rounded-2xl overflow-hidden bg-app-bg shadow-xl border border-app-border group">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Status & Price Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${statusConfig.badge}`}
                >
                  <span className={`w-2 h-2 rounded-full ${statusConfig.dot}`} />
                  {status || "Unknown"}
                </span>

                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-app-border/40 text-app-text-muted border border-app-border">
                  {gender || "Unknown"}
                </span>

                <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30">
                  ${stickerPrice}
                </span>
              </div>
            </div>

            {/* Right Column: Metadata Cards */}
            <div className="flex flex-col justify-start space-y-3 text-sm">
              {/* Species & Type */}
              <div className="p-3.5 rounded-xl bg-app-bg/60 border border-app-border hover:border-emerald-500/30 transition-colors">
                <span className="text-[11px] uppercase tracking-wider text-app-text-muted font-semibold block mb-1">
                  Species & Type
                </span>
                <p className="text-app-text font-medium">
                  {species || "Unknown"}
                  {type ? (
                    <span className="text-cyan-500 dark:text-cyan-300 font-normal">
                      {" "}• ({type})
                    </span>
                  ) : null}
                </p>
              </div>

              {/* Origin */}
              <div className="p-3.5 rounded-xl bg-app-bg/60 border border-app-border hover:border-emerald-500/30 transition-colors">
                <span className="text-[11px] uppercase tracking-wider text-app-text-muted font-semibold block mb-1">
                  Origin Dimension / Planet
                </span>
                <p className="text-app-text font-medium flex items-center gap-1.5">
                  <span role="img" aria-label="origin">🌍</span>
                  <span className="truncate">{origin?.name || "Unknown"}</span>
                </p>
              </div>

              {/* Last Known Location */}
              <div className="p-3.5 rounded-xl bg-app-bg/60 border border-app-border hover:border-emerald-500/30 transition-colors">
                <span className="text-[11px] uppercase tracking-wider text-app-text-muted font-semibold block mb-1">
                  Last Known Location
                </span>
                <p className="text-app-text font-medium flex items-center gap-1.5">
                  <span role="img" aria-label="location">📍</span>
                  <span className="truncate">{location?.name || "Unknown"}</span>
                </p>
              </div>

              {/* First Registered */}
              <div className="p-3.5 rounded-xl bg-app-bg/60 border border-app-border hover:border-emerald-500/30 transition-colors">
                <span className="text-[11px] uppercase tracking-wider text-app-text-muted font-semibold block mb-1">
                  Database Entry
                </span>
                <p className="text-app-text-muted font-medium font-mono text-xs">
                  {formattedDate}
                </p>
              </div>
            </div>
          </div>

          {/* Episode List */}
          <div className="pt-4 border-t border-app-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-app-text-muted">
                Appeared In {episode.length} Episode{episode.length > 1 ? "s" : ""}
              </h3>
            </div>

            {episode.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                {episode.map((epUrl) => {
                  const epNumber = epUrl.split("/").filter(Boolean).pop();
                  return (
                    <span
                      key={epUrl}
                      className="w-[1.35rem] h-[1.35rem] flex items-center justify-center text-[11px] font-mono font-bold rounded-lg bg-app-bg text-app-text-muted border border-app-border hover:border-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 hover:bg-emerald-500/10 transition-all duration-150"
                      title={`Episode ${epNumber}`}
                    >
                      {epNumber}
                    </span>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-app-text-muted italic">No episode data available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, modalRoot);
}
