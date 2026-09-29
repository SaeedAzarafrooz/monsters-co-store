import { useEffect, useState, useCallback } from "react";
import Arrowup from "../assets/ArrowUp.png";

// A floating button with smooth entry animation and auto-adjusting footer boundary
function BackToTop({ threshold = 500 }) {
  const [isVisible, setIsVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(20);

  // Core positioning calculation
  const updatePosition = useCallback(() => {
    // Visibility threshold
    setIsVisible(window.scrollY > threshold);

    // Keep button strictly above footer
    const footer = document.querySelector("footer");
    const basePadding = 20;

    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (footerRect.top < windowHeight) {
        const overlapHeight = windowHeight - footerRect.top;
        setBottomOffset(overlapHeight + basePadding);
      } else {
        setBottomOffset(basePadding);
      }
    }
  }, [threshold]);

  useEffect(() => {
    let ticking = false;

    // Throttled scroll listener using requestAnimationFrame
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updatePosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    updatePosition();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updatePosition);

    // Observe document body resize (triggers automatically when new cards are loaded)
    const resizeObserver = new ResizeObserver(() => {
      updatePosition();
    });

    if (document.body) {
      resizeObserver.observe(document.body);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updatePosition);
      resizeObserver.disconnect();
    };
  }, [updatePosition]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      style={{ bottom: `${bottomOffset}px` }}
      className={`
        group fixed right-5 z-50
        flex justify-center items-center
        w-12 h-12 rounded-full
        bg-app-card border border-app-border text-app-text font-bold
        shadow-lg shadow-black/20 hover:border-emerald-500/50
        hover:brightness-95 active:scale-95
        transition-[transform,opacity,bottom] duration-300 ease-out
        ${
          isVisible
            ? "opacity-100 translate-x-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-x-12 scale-75 pointer-events-none"
        }
      `}
      title="Back to top"
    >
      <img
        src={Arrowup}
        alt="arrow-up"
        className="
          w-7 h-7 object-contain opacity-80 group-hover:opacity-100
          transition-all duration-200 ease-in-out
          group-hover:drop-shadow-[0_4px_4px_rgba(0,0,0,0.35)]
          group-hover:-translate-y-0.5
        "
      />
    </button>
  );
}

export default BackToTop;
