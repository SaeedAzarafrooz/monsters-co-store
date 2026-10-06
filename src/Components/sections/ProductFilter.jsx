import { useState, useEffect } from "react";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { FormField } from "../ui/FormField";
import { Button } from "../ui/Button";

// English comment: Presets for quick multiverse sticker filtering
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
      {/* Mobile filter toggle trigger */}
      <div className="lg:hidden mb-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsOpenMobile((prev) => !prev)}
          className="w-full justify-between px-4 py-3 h-auto rounded-xl font-medium text-sm shadow-sm hover:bg-muted/50"
        >
          <span className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
            Filter & Bundles
          </span>
          <span className="text-xs bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-bold">
            {isOpenMobile ? "Hide" : "Show"}
          </span>
        </Button>
      </div>

      {/* Filter panel container */}
      <div
        className={`space-y-4 max-h-[calc(100vh-3rem)] overflow-y-auto lg:max-h-none lg:overflow-visible ${
          isOpenMobile ? "block" : "hidden lg:block"
        }`}
      >
        {/* Section 1: Sticker Bundles Card */}
        <div className="bg-card text-card-foreground border border-border rounded-2xl p-5 shadow-sm space-y-3 transition-colors">
          <div className="border-b border-border pb-3">
            <h3 className="font-extrabold text-sm sm:text-base text-foreground flex items-center justify-center lg:justify-start gap-2">
              <span>📦</span> Sticker Bundles
            </h3>
          </div>

          <div className="flex flex-col gap-1.5 pt-1">
            {BUNDLE_PRESETS.map((b) => {
              const isSelected = activeBundle === b.id;
              return (
                <Button
                  key={b.id}
                  type="button"
                  variant={isSelected ? "default" : "secondary"}
                  onClick={() => handleBundleClick(b)}
                  className={`w-full justify-start text-xs font-semibold rounded-xl h-auto py-2 px-3 border transition-all duration-200 ${
                    isSelected
                      ? "border-primary shadow-sm font-bold translate-x-1"
                      : "bg-muted/40 text-foreground border-border hover:border-primary/50 hover:bg-muted/70"
                  }`}
                >
                  {b.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Custom Parameters Filter Card */}
        <div className="bg-card text-card-foreground border border-border rounded-2xl p-5 shadow-sm space-y-4 transition-colors">
          <div className="border-b border-border pb-3">
            <h3 className="font-extrabold text-sm sm:text-base text-foreground flex items-center justify-center lg:justify-start gap-2">
              <span>🌌</span> Multiverse Filter
            </h3>
          </div>

          {/* Query parameters form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <FormField label="Search by Name" id="filter-name">
              <Input
                id="filter-name"
                name="name"
                placeholder="e.g. Rick, Morty, Bird..."
                value={localFilters.name}
                onChange={handleChange}
              />
            </FormField>

            <FormField label="Status" id="filter-status">
              <Select
                id="filter-status"
                name="status"
                value={localFilters.status}
                onChange={handleChange}
              >
                <option value="" className="bg-card text-card-foreground">All Statuses</option>
                <option value="alive" className="bg-card text-card-foreground">Alive</option>
                <option value="dead" className="bg-card text-card-foreground">Dead</option>
                <option value="unknown" className="bg-card text-card-foreground">Unknown</option>
              </Select>
            </FormField>

            <FormField label="Species" id="filter-species">
              <Input
                id="filter-species"
                name="species"
                placeholder="e.g. Human, Alien, Robot..."
                value={localFilters.species}
                onChange={handleChange}
              />
            </FormField>

            <FormField label="Gender" id="filter-gender">
              <Select
                id="filter-gender"
                name="gender"
                value={localFilters.gender}
                onChange={handleChange}
              >
                <option value="" className="bg-card text-card-foreground">All Genders</option>
                <option value="male" className="bg-card text-card-foreground">Male</option>
                <option value="female" className="bg-card text-card-foreground">Female</option>
                <option value="genderless" className="bg-card text-card-foreground">Genderless</option>
                <option value="unknown" className="bg-card text-card-foreground">Unknown</option>
              </Select>
            </FormField>

            <div className="flex gap-2 pt-2">
              <Button
                type="submit"
                variant="default"
                size="sm"
                className="flex-1 font-bold shadow-sm"
              >
                Apply Filter
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="px-3"
              >
                Reset
              </Button>
            </div>
          </form>
        </div>
      </div>
    </aside>
  );
}

export { ProductFilter };
export default ProductFilter;
