import { Link, useNavigate } from "react-router-dom";
import { Icon } from "./ui";

function UnderConstruction({
  title = "Under Construction",
  description = "This feature is currently being developed and will be available soon!",
  showBackButton = true,
}) {
  const navigate = useNavigate();

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4 py-12">
      {/* Animated / Glowing Icon */}
      <div className="relative mb-6">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-app-card border border-app-border flex items-center justify-center shadow-lg relative z-10">
          <Icon
            name="flask"
            className="w-10 h-10 sm:w-12 sm:h-12 text-accent animate-bounce"
            strokeWidth={1.8}
          />
        </div>
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-[#b5dc11]/20 blur-xl pointer-events-none" />
      </div>

      {/* Badge */}
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#b5dc11]/15 text-[#b5dc11] border border-[#b5dc11]/30 mb-4">
        🚧 Work in Progress
      </span>

      {/* Title & Description */}
      <h2 className="text-2xl sm:text-3xl font-black text-app-text tracking-tight mb-2">
        {title}
      </h2>
      <p className="text-sm sm:text-base text-app-muted max-w-md mx-auto mb-8">
        {description}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {showBackButton && (
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-app-card hover:bg-app-hover border border-app-border text-app-text transition-all cursor-pointer shadow-sm"
          >
            Go Back
          </button>
        )}
        <Link
          to="/"
          className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#b5dc11] hover:bg-[#a3c70f] text-black transition-all cursor-pointer shadow-md shadow-[#b5dc11]/20"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default UnderConstruction;
