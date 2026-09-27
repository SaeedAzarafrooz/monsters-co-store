import { useState, useEffect } from "react";

const BUNDLE_PRESETS = [
  { id: "all", label: "🌟 All Stickers", filters: { name: "", status: "", species: "", gender: "" } },
  { id: "rick", label: "🧪 Rick & Science", filters: { name: "Rick", status: "", species: "", gender: "" } },
  { id: "morty", label: "⚡ Morty Variants", filters: { name: "Morty", status: "", species: "", gender: "" } },
  { id: "alien", label: "👽 Alien & Monsters", filters: { name: "", status: "", species: "Alien", gender: "" } },
  { id: "human", label: "🧑 Human Survivors", filters: { name: "", status: "Alive", species: "Human", gender: "" } },
];

function ProductFilter({ activeFilters, onApplyFilters, onResetFilters }) {
  const [localFilters, setLocalFilters] = useState(activeFilters);
  const [activeBundle, setActiveBundle] = useState(() => {
    // English comment: Determine initial active bundle based on incoming activeFilters
    const matched = BUNDLE_PRESETS.find(
      (b) =>
        b.filters.name === activeFilters.name &&
        b.filters.status === activeFilters.status &&
        b.filters.species === activeFilters.species &&
        b.filters.gender === activeFilters.gender
    );
    return matched ? matched.id : "all";
  });
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  useEffect(() => {
    setLocalFilters(activeFilters);
    // English comment: Keep active bundle button highlighted when activeFilters changes
    const matched = BUNDLE_PRESETS.find(
      (b) =>
        b.filters.name === activeFilters.name &&
        b.filters.status === activeFilters.status &&
        b.filters.species === activeFilters.species &&
        b.filters.gender === activeFilters.gender
    );
    setActiveBundle(matched ? matched.id : "");
  }, [activeFilters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
    setActiveBundle("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyFilters(localFilters);
    setIsOpenMobile(false);
  };

  const handleBundleClick = (bundle) => {
    setActiveBundle(bundle.id);
    setLocalFilters(bundle.filters);
    onApplyFilters(bundle.filters);
    setIsOpenMobile(false);
  };

  const handleReset = () => {
    const emptyFilters = { name: "", status: "", species: "", gender: "" };
    setActiveBundle("all");
    setLocalFilters(emptyFilters);
    onResetFilters();
    setIsOpenMobile(false);
  };

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-6 lg:self-start z-10">
      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-4">
        <button
          type="button"
          onClick={() => setIsOpenMobile((prev) => !prev)}
          className="w-full flex items-center justify-between px-4 py-3 bg-slate-800 text-slate-200 border border-slate-700 rounded-xl font-medium text-sm shadow-md"
        >
          <span className="flex items-center gap-2">
            <span>⚙️</span> Filter & Bundles
          </span>
          <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
            {isOpenMobile ? "Hide" : "Show"}
          </span>
        </button>
      </div>

      {/* Filter panel container: Unified card on mobile, separated clean cards on desktop */}
      <div
        className={`bg-slate-800/95 border border-slate-700/80 rounded-2xl p-5 shadow-2xl backdrop-blur-md space-y-6 max-h-[calc(100vh-3rem)] overflow-y-auto lg:bg-transparent lg:border-none lg:p-0 lg:shadow-none lg:backdrop-blur-none lg:space-y-4 lg:max-h-none lg:overflow-visible ${
          isOpenMobile ? "block" : "hidden lg:block"
        }`}
      >
        {/* Section 1: Sticker Bundles Card */}
        <div className="space-y-3 lg:bg-slate-800/95 lg:border lg:border-slate-700/80 lg:rounded-2xl lg:p-5 lg:shadow-2xl lg:backdrop-blur-md">
          <div className="border-b border-slate-700 pb-3">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-100 flex items-center justify-center lg:justify-start gap-2">
              <span>📦</span> Sticker Bundles
            </h3>
          </div>

          <div className="flex flex-col gap-1.5 pt-1">
            {BUNDLE_PRESETS.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => handleBundleClick(b)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                  activeBundle === b.id
                    ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20 translate-x-1"
                    : "bg-slate-900/60 text-slate-300 border-slate-700 hover:bg-slate-700/70 hover:text-white"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: Custom Parameters Filter Card */}
        <div className="pt-2 border-t border-slate-700 lg:border-t-0 lg:pt-4 lg:bg-slate-800/95 lg:border lg:border-slate-700/80 lg:rounded-2xl lg:p-5 lg:shadow-2xl lg:backdrop-blur-md space-y-4">
          <div className="border-b border-slate-700 pb-3">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-100 flex items-center justify-center lg:justify-start gap-2">
              <span>🌌</span> Multiverse Filter
            </h3>
          </div>

          {/* Query parameters form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Search by Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Rick, Morty, Bird..."
                value={localFilters.name}
                onChange={handleChange}
                className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Status
              </label>
              <select
                name="status"
                value={localFilters.status}
                onChange={handleChange}
                className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-400 transition"
              >
                <option value="">All Statuses</option>
                <option value="alive">Alive</option>
                <option value="dead">Dead</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Species
              </label>
              <input
                type="text"
                name="species"
                placeholder="e.g. Human, Alien, Robot..."
                value={localFilters.species}
                onChange={handleChange}
                className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={localFilters.gender}
                onChange={handleChange}
                className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-400 transition"
              >
                <option value="">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="genderless">Genderless</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2 rounded-lg text-xs transition shadow-md shadow-emerald-500/20 active:scale-[0.98]"
              >
                Apply Filter
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold rounded-lg text-xs transition"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </aside>
  );
}

export default ProductFilter;
