import { Link, useNavigate } from "react-router-dom";

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
                    <svg
                        className="w-10 h-10 sm:w-12 sm:h-12 text-[#b5dc11] animate-bounce"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.8"
                            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                        />
                    </svg>
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
