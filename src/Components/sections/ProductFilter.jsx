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
          className="w-full flex items-center justify-between px-4 py-3 bg-app-card text-app-text border border-app-border rounded-xl font-medium text-sm shadow-md"
        >
          <span className="flex items-center gap-2">
            <span>⚙️</span> Filter & Bundles
          </span>
          <span className="text-xs bg-app-accent/20 text-app-accent px-2.5 py-0.5 rounded-full font-bold">
            {isOpenMobile ? "Hide" : "Show"}
          </span>
        </button>
      </div>

      {/* Filter panel container */}
      <div
        className={`space-y-4 max-h-[calc(100vh-3rem)] overflow-y-auto lg:max-h-none lg:overflow-visible ${
          isOpenMobile ? "block" : "hidden lg:block"
        }`}
      >
        {/* Section 1: Sticker Bundles Card */}
        <div className="bg-app-card border border-app-border rounded-2xl p-5 shadow-lg space-y-3">
          <div className="border-b border-app-border pb-3">
            <h3 className="font-extrabold text-sm sm:text-base text-app-text flex items-center justify-center lg:justify-start gap-2">
              <span>📦</span> Sticker Bundles
            </h3>
          </div>

          <div className="flex flex-col gap-1.5 pt-1">
            {BUNDLE_PRESETS.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => handleBundleClick(b)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border cursor-pointer ${
                  activeBundle === b.id
                    ? "!bg-app-accent !text-black border-app-accent shadow-md shadow-app-accent/20 translate-x-1 font-bold"
                    : "bg-app-hover text-app-text border-app-border hover:border-app-accent/50 hover:brightness-105"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: Custom Parameters Filter Card */}
        <div className="bg-app-card border border-app-border rounded-2xl p-5 shadow-lg space-y-4">
          <div className="border-b border-app-border pb-3">
            <h3 className="font-extrabold text-sm sm:text-base text-app-text flex items-center justify-center lg:justify-start gap-2">
              <span>🌌</span> Multiverse Filter
            </h3>
          </div>

          {/* Query parameters form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold text-app-muted mb-1">
                Search by Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Rick, Morty, Bird..."
                value={localFilters.name}
                onChange={handleChange}
                className="w-full bg-app-hover border border-app-border rounded-lg px-3 py-2 text-xs text-app-text placeholder:text-app-muted/70 focus:outline-none focus:border-app-accent transition"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-app-muted mb-1">
                Status
              </label>
              <select
                name="status"
                value={localFilters.status}
                onChange={handleChange}
                className="w-full bg-app-hover border border-app-border rounded-lg px-3 py-2 text-xs text-app-text focus:outline-none focus:border-app-accent transition cursor-pointer"
              >
                <option value="" className="bg-app-card text-app-text">All Statuses</option>
                <option value="alive" className="bg-app-card text-app-text">Alive</option>
                <option value="dead" className="bg-app-card text-app-text">Dead</option>
                <option value="unknown" className="bg-app-card text-app-text">Unknown</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-app-muted mb-1">
                Species
              </label>
              <input
                type="text"
                name="species"
                placeholder="e.g. Human, Alien, Robot..."
                value={localFilters.species}
                onChange={handleChange}
                className="w-full bg-app-hover border border-app-border rounded-lg px-3 py-2 text-xs text-app-text placeholder:text-app-muted/70 focus:outline-none focus:border-app-accent transition"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-app-muted mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={localFilters.gender}
                onChange={handleChange}
                className="w-full bg-app-hover border border-app-border rounded-lg px-3 py-2 text-xs text-app-text focus:outline-none focus:border-app-accent transition cursor-pointer"
              >
                <option value="" className="bg-app-card text-app-text">All Genders</option>
                <option value="male" className="bg-app-card text-app-text">Male</option>
                <option value="female" className="bg-app-card text-app-text">Female</option>
                <option value="genderless" className="bg-app-card text-app-text">Genderless</option>
                <option value="unknown" className="bg-app-card text-app-text">Unknown</option>
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 bg-app-accent hover:brightness-105 text-black font-bold py-2 rounded-lg text-xs transition shadow-md shadow-app-accent/20 active:scale-[0.98] cursor-pointer"
              >
                Apply Filter
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-2 bg-app-hover hover:brightness-95 text-app-text border border-app-border font-semibold rounded-lg text-xs transition cursor-pointer"
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
