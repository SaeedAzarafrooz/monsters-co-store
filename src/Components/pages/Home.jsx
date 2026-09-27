import { Link } from "react-router-dom";

function Home() {
  const perks = [
    {
      title: "100% Waterproof Vinyl",
      desc: "Die-cut stickers made with premium UV-resistant vinyl. Won't fade on laptops, bottles, or cars.",
      icon: "💧",
      border: "hover:border-emerald-500/50",
    },
    {
      title: "Interdimensional Delivery",
      desc: "Lightning fast dispatch straight through the green portal to your doorstep.",
      icon: "🚀",
      border: "hover:border-cyan-500/50",
    },
    {
      title: "Episode-Based Pricing",
      desc: "Dynamic, rare collectible pricing calculated straight from Multiverse lore and appearances.",
      icon: "🧪",
      border: "hover:border-amber-500/50",
    },
    {
      title: "Ready for Your Cart",
      desc: "User profiles, custom bundle discounts, and instant checkout coming right up!",
      icon: "🛒",
      border: "hover:border-purple-500/50",
    },
  ];

  const featuredPacks = [
    {
      name: "Pickle Rick & Mad Science",
      tag: "Best Seller",
      badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      desc: "Top iconic Rick transformations, portal guns, and garage experiment stickers.",
      price: "From $3.20",
      bundle: "rick",
    },
    {
      name: "Morty & Citadel Variants",
      tag: "Limited Edition",
      badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      desc: "Evil Morty, Pocket Mortys, and rare timeline alternate appearances.",
      price: "From $2.40",
      bundle: "morty",
    },
    {
      name: "Aliens, Cronenbergs & Monsters",
      tag: "Fan Favorite",
      badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      desc: "Meeseeks, Birdperson, Squanchy and weird dimensional creature collectibles.",
      price: "From $1.60",
      bundle: "alien",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-14 text-slate-100 space-y-16 md:space-y-24">
      {/* 1. HERO SHOWCASE */}
      <section className="relative text-center space-y-6 pt-4">
        {/* Portal Glow Backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] h-[340px] sm:h-[520px] bg-gradient-to-tr from-emerald-500/20 via-lime-400/15 to-cyan-500/20 blur-3xl rounded-full pointer-events-none -z-10" />

        {/* Portal Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/40 text-xs text-slate-200 backdrop-blur-md shadow-lg shadow-emerald-950/30">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold text-emerald-300">Dimension C-137 Official</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Rick & Morty Vinyl Stickers</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
          Stick The Multiverse{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Everywhere
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-lg leading-relaxed">
          Premium waterproof vinyl stickers featuring all your favorite Rick & Morty characters,
          weird creatures, and interdimensional gadgets.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
          <Link
            to="/products"
            className="px-7 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 active:scale-[0.98] transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-2"
          >
            <span>Browse All Stickers</span>
            <span>✨</span>
          </Link>

          <Link
            to="/contact"
            className="px-6 py-3.5 rounded-xl font-semibold text-slate-300 bg-slate-900/80 border border-slate-700/80 hover:bg-slate-800 hover:text-white transition-all backdrop-blur-sm"
          >
            Custom Orders / Contact
          </Link>
        </div>
      </section>

      {/* 2. FEATURED PACKS / CATEGORIES */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
              Popular Multiverse Packs
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Hand-picked die-cut sticker bundles trending across dimensions
            </p>
          </div>
          <Link
            to="/products"
            className="text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition inline-flex items-center gap-1"
          >
            View All Cards &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPacks.map((pack, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between space-y-4 backdrop-blur-sm group hover:-translate-y-1 shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${pack.badgeColor}`}
                  >
                    {pack.tag}
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-bold">
                    {pack.price}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                  {pack.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {pack.desc}
                </p>
              </div>

              <Link
                to={`/products?bundle=${pack.bundle}`}
                className="w-full py-2 text-center text-xs font-semibold rounded-lg bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white transition"
              >
                Explore Pack
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 3. STORE PERKS / VALUE PROPOSITIONS */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            Why Our Stickers?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto">
            Crafted for laptops, phones, skateboards, flasks, and portal gun cases.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {perks.map((perk, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm space-y-3 transition-all duration-300 ${perk.border} hover:-translate-y-0.5`}
            >
              <div className="text-3xl">{perk.icon}</div>
              <h3 className="text-base font-bold text-slate-200">{perk.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {perk.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PROMO & CART CALLOUT BANNER */}
      <section className="relative overflow-hidden rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/40 border border-emerald-500/30 text-center space-y-4 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <span className="inline-block px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-xs font-semibold text-emerald-300">
          🎁 Portal Special Offer
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100">
          Grab 3 Stickers, Get 1 Mystery Character Free!
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Pick your favorite characters from the shop grid. Ready to decorate your gear with Citadel-grade vinyl quality.
        </p>
        <div className="pt-2">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 active:scale-[0.98] transition-all shadow-lg shadow-emerald-500/25"
          >
            <span>Open Multiverse Shop</span>
            <span>🛒</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
