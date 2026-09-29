import { Link, useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    return (
        <main className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-16">
            
            {/* Wrapper for Icon & 404 */}
            <div className="flex flex-col items-center mb-8">
                {/* Pure Icon without background container or border */}
                <div className="mb-4">
                    <svg
                        className="w-20 h-20 sm:w-24 sm:h-24 text-app-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.8"
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>

                {/* 404 Text - Animated with Semantic Accent Gradient */}
                <h1 className="text-[120px] sm:text-[160px] font-black tracking-tighter select-none leading-none animate-pulse text-transparent bg-clip-text bg-gradient-to-b from-app-accent to-app-accent/20">
                    404
                </h1>
            </div>

            {/* Error Message */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-rose-500/10 text-rose-500 border border-rose-500/20 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                Dimension Lost • Error 404
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-app-text tracking-tight mb-3">
                Lost in the Multiverse?
            </h2>
            <p className="text-sm sm:text-base text-app-muted max-w-md mx-auto mb-8 leading-relaxed">
                The dimension or page you are looking for has been destroyed, relocated, or never existed in this timeline.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-app-card hover:bg-app-hover border border-app-border text-app-text transition-all cursor-pointer shadow-sm"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Go Back</span>
                </button>

                <Link
                    to="/"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-app-accent hover:opacity-90 text-black transition-all cursor-pointer shadow-md shadow-app-accent/20 font-bold"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>Return to Home</span>
                </Link>
            </div>
        </main>
    );
}

export default NotFound;
