import React, { useEffect } from "react";
import crossIcon from "../assets/cross.png";

/**
 * Character detail modal dialog.
 * Displays deep character lore, location info, and list of episodes.
 *
 * @param {Object} props
 * @param {Object|null} props.character - The selected Rick & Morty character object
 * @param {Function} props.onClose - Callback triggered to close the modal
 */
export default function CharacterModal({ character, onClose }) {
  // Prevent rendering if no character is provided
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

  // Lock body scroll and handle Escape key for accessibility
  useEffect(() => {
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
  }, [onClose]);

  // Helper to determine status color
  const getStatusColor = (val) => {
    switch (val?.toLowerCase()) {
      case "alive":
        return "bg-emerald-500 shadow-emerald-500/50";
      case "dead":
        return "bg-rose-500 shadow-rose-500/50";
      default:
        return "bg-amber-400 shadow-amber-400/50";
    }
  };

  const stickerPrice = (episode.length * 0.4).toFixed(1);
  
  const formattedDate = created
    ? new Date(created).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Unknown";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-character-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
              #{id}
            </span>
            <h2
              id="modal-character-title"
              className="text-lg md:text-xl font-bold text-white tracking-wide truncate max-w-[280px] sm:max-w-md"
            >
              {name}
            </h2>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <img
              src={crossIcon}
              alt="Close"
              className="w-4 h-4 object-contain invert opacity-70 hover:opacity-100"
            />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Image & Badges */}
            <div className="flex flex-col items-center sm:items-start gap-4">
              <div className="w-full max-w-[260px] aspect-square rounded-xl overflow-hidden bg-slate-800 shadow-lg border border-slate-700/50">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700">
                  <span
                    className={`w-2 h-2 rounded-full ${getStatusColor(status)}`}
                  />
                  {status || "Unknown"}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  {gender || "Unknown"}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  ${stickerPrice}
                </span>
              </div>
            </div>

            {/* Right Column: Information */}
            <div className="flex flex-col justify-start space-y-3.5 text-sm">
              {/* Species & Type */}
              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-800">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                  Species & Type
                </span>
                <p className="text-slate-100 font-medium">
                  {species || "Unknown"}
                  {type ? (
                    <span className="text-slate-400 font-normal">
                      {" "}• ({type})
                    </span>
                  ) : null}
                </p>
              </div>

              {/* Origin */}
              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-800">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                  Origin
                </span>
                <p className="text-slate-100 font-medium flex items-center gap-1.5">
                  <span role="img" aria-label="origin">🌍</span>
                  {origin?.name || "Unknown"}
                </p>
              </div>

              {/* Last Known Location */}
              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-800">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                  Last Known Location
                </span>
                <p className="text-slate-100 font-medium flex items-center gap-1.5">
                  <span role="img" aria-label="location">📍</span>
                  {location?.name || "Unknown"}
                </p>
              </div>

              {/* First Registered */}
              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-800">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                  First Registered
                </span>
                <p className="text-slate-300 font-medium">
                  {formattedDate}
                </p>
              </div>
            </div>
          </div>

          {/* Episode List */}
          <div className="pt-2 border-t border-slate-800">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-3">
              Appeared In {episode.length} Episode{episode.length>1?'s':''}
            </h3>
            {episode.length > 0 ? (
              <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto pr-1">
                {episode.map((epUrl) => {
                  const epNumber = epUrl.split("/").filter(Boolean).pop();
                  return (
                    <span
                      key={epUrl}
                      className="w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full bg-slate-800 text-sky-400 border border-slate-700/60 hover:border-sky-500 hover:bg-slate-700 transition-colors"
                      title={`Episode ${epNumber}`}
                    >
                      {epNumber}
                    </span>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No episode data available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
