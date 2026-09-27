import reactIcon from "../../assets/react.svg";
import tailwindCssIcon from "../../assets/Tailwind_CSS_Logo.png";
import reactRouterIcon from "../../assets/react-router-logo.png";
import viteIcon from "../../assets/vite-icon.webp";
import rick_mortyApiIcon from "../../assets/Rick&MortyAPI.png";
import Intersection_Observer_ApiIcon from "../../assets/Intersection_Observer_Api.png";

function AboutUs() {
  const techStack = [
    {
      name: "React 18",
      desc: "Component Architecture & Hooks",
      color: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400",
      image: reactIcon,
      glow: "drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]", // Cyan Glow
    },
    {
      name: "Tailwind CSS",
      desc: "Responsive & Modern Dark UI",
      color: "from-sky-500/20 to-teal-500/10 border-sky-500/30 text-sky-400",
      image: tailwindCssIcon,
      glow: "drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]", // Sky Glow
    },
    {
      name: "React Router v6",
      desc: "SPA Navigation & Dynamic Transitions",
      color: "from-red-500/20 to-orange-500/10 border-red-500/30 text-red-400",
      image: reactRouterIcon,
      glow: "drop-shadow-[0_0_12px_rgba(248,113,113,0.5)]", // Red Glow
    },
    {
      name: "Vite",
      desc: "Next-gen Fast Frontend Tooling",
      color:
        "from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-400",
      image: viteIcon,
      glow: "drop-shadow-[0_0_12px_rgba(192,132,252,0.5)]", // Purple Glow
    },
    {
      name: "Rick & Morty API",
      desc: "RESTful Endpoints & Data Ingestion",
      color:
        "from-emerald-500/20 to-green-500/10 border-emerald-500/30 text-emerald-400",
      image: rick_mortyApiIcon,
      glow: "drop-shadow-[0_0_12px_rgba(52,211,153,0.5)]", // Emerald Glow
    },
    {
      name: "Intersection Observer",
      desc: "Infinite Scroll & Viewport Triggers",
      color:
        "from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-400",
      image: Intersection_Observer_ApiIcon,
      glow: "drop-shadow-[0_0_12px_rgba(251,191,36,0.5)]", // Amber Glow
    },
  ];

  const highlights = [
    {
      title: "Infinite Scroll Engine",
      desc: "Custom hook with IntersectionObserver for non-blocking pagination.",
    },
    {
      title: "Dynamic Sliding Indicator",
      desc: "DOM ref-driven fluid active indicators for top-level navigation.",
    },
    {
      title: "Interactive Portal Modal",
      desc: "Detailed character breakdown with dynamic episode tagging and status badges.",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-140px)] py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-slate-200">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 rounded-full border border-emerald-500/20">
          The Universe Explorer Project
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
          Exploring dimensions with modern{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Frontend Engineering
          </span>
          .
        </h1>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          This project was engineered to deliver a fast, reactive, and visually
          refined portal interface for exploring characters across the
          multiverse using the Rick and Morty API.
        </p>
      </div>

      {/* Highlights / Features Grid */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-700/60 pb-3">
          Key Technical Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition duration-300"
            >
              <div className="text-emerald-400 font-mono text-xs mb-2">
                0{idx + 1}. FEATURE
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Grid */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-700/60 pb-3">
          Tech Stack & Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className={`group relative p-5 rounded-2xl border bg-gradient-to-br ${tech.color} flex flex-col justify-between backdrop-blur-sm`}
            >
              <div className="font-bold text-base tracking-wide">
                {tech.name}
              </div>
              <div className="text-xs text-slate-300 mt-2">{tech.desc}</div>
              <img
                src={tech.image}
                alt={`${tech.name}-icon`}
                className={`absolute -top-2 -right-2 w-16 h-16 object-contain shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${tech.glow}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Developer Card (For Portfolio) */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/70 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold text-white">
            Crafted by Saeed Azarafrooz
          </h3>
          <p className="text-slate-400 text-sm mt-2 max-w-md">
            Frontend Developer focused on building clean, high-performance web
            applications with React, Next.js, and modern CSS tooling.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Saeedazarafrooz"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-sm font-medium rounded-xl bg-slate-700/80 hover:bg-slate-700 text-white transition border border-slate-600/80"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/saeed-azarafrooz-92a52a268/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BLyAHMv8NSni66VoQjzOA0g%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-sm rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold transition shadow-lg shadow-emerald-500/20"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
