import { Link } from "react-router-dom";
import { Container, Badge, buttonVariants, Heading, Text, Span } from "../ui";

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
      badgeColor: "bg-primary/15 text-primary border-primary/30",
      desc: "Top iconic Rick transformations, portal guns, and garage experiment stickers.",
      price: "From $3.20",
      bundle: "rick",
    },
    {
      name: "Morty & Citadel Variants",
      tag: "Limited Edition",
      badgeColor:
        "bg-amber-500/15 text-amber-500 dark:text-amber-400 border-amber-500/30",
      desc: "Evil Morty, Pocket Mortys, and rare timeline alternate appearances.",
      price: "From $2.40",
      bundle: "morty",
    },
    {
      name: "Aliens, Cronenbergs & Monsters",
      tag: "Fan Favorite",
      badgeColor:
        "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
      desc: "Meeseeks, Birdperson, Squanchy and weird dimensional creature collectibles.",
      price: "From $1.60",
      bundle: "alien",
    },
  ];

  return (
    <Container className="py-8 md:py-14 text-foreground space-y-16 md:space-y-24">
      {/* 1. HERO SHOWCASE */}
      <section className="relative text-center space-y-6 pt-4">
        {/* Portal Glow Backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] h-[340px] sm:h-[520px] bg-gradient-to-tr from-primary/20 via-lime-400/10 to-cyan-500/15 blur-3xl rounded-full pointer-events-none -z-10" />

        {/* Portal Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-primary/40 text-xs text-foreground shadow-md">
          <Span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
          <Span className="font-bold text-primary">
            Dimension C-137 Official
          </Span>
          <Span className="text-muted-foreground/40">|</Span>
          <Span className="text-muted-foreground">
            Rick & Morty Vinyl Stickers
          </Span>
        </div>

        {/* Headline */}
        <Heading
          as="h1"
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight"
        >
          Stick The Multiverse{" "}
          <Span className="bg-gradient-to-r from-primary via-teal-400 to-cyan-400 bg-clip-text text-transparent font-extrabold">
            Everywhere
          </Span>
        </Heading>

        {/* Subtitle */}
        <Text
          as="p"
          className="max-w-2xl mx-auto text-muted-foreground text-sm sm:text-lg leading-relaxed font-normal"
        >
          Premium waterproof vinyl stickers featuring all your favorite Rick &
          Morty characters, weird creatures, and interdimensional gadgets.
        </Text>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
          <Link
            to="/products"
            className={buttonVariants({
              variant: "default",
              size: "lg",
              className:
                "rounded-xl font-bold gap-2 shadow-xl shadow-primary/20",
            })}
          >
            <Span>Browse All Stickers</Span>
            <Span>✨</Span>
          </Link>

          <Link
            to="/contact"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "rounded-xl font-semibold shadow-sm",
            })}
          >
            Custom Orders / Contact
          </Link>
        </div>
      </section>

      {/* 2. FEATURED PACKS / CATEGORIES */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 border-b border-border pb-4">
          <div>
            <Heading
              as="h2"
              className="text-2xl sm:text-3xl font-extrabold text-foreground"
            >
              Popular Multiverse Packs
            </Heading>
            <Text
              as="p"
              className="text-xs sm:text-sm text-muted-foreground font-normal"
            >
              Hand-picked die-cut sticker bundles trending across dimensions
            </Text>
          </div>
          <Link
            to="/products"
            className="text-xs sm:text-sm font-semibold text-primary hover:underline transition inline-flex items-center gap-1"
          >
            View All Cards &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPacks.map((pack, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300 flex flex-col justify-between space-y-4 group hover:-translate-y-1 shadow-md hover:shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className={`text-[11px] font-semibold px-2.5 py-1 ${pack.badgeColor}`}
                  >
                    {pack.tag}
                  </Badge>
                  <Span className="text-xs font-mono text-muted-foreground font-bold">
                    {pack.price}
                  </Span>
                </div>
                <Heading
                  as="h3"
                  className="text-lg font-bold text-foreground group-hover:text-primary transition-colors"
                >
                  {pack.name}
                </Heading>
                <Text
                  as="p"
                  className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal"
                >
                  {pack.desc}
                </Text>
              </div>

              <Link
                to={`/products?bundle=${pack.bundle}`}
                className={buttonVariants({
                  variant: "secondary",
                  size: "sm",
                  className:
                    "w-full border border-border hover:border-primary/50",
                })}
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
          <Heading
            as="h2"
            className="text-2xl sm:text-3xl font-extrabold text-foreground"
          >
            Why Our Stickers?
          </Heading>
          <Text
            as="p"
            className="text-muted-foreground text-xs sm:text-sm max-w-lg mx-auto font-normal"
          >
            Crafted for laptops, phones, skateboards, flasks, and portal gun
            cases.
          </Text>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {perks.map((perk, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl bg-card border border-border shadow-sm space-y-3 transition-all duration-300 ${perk.border} hover:-translate-y-0.5`}
            >
              <div className="text-3xl">{perk.icon}</div>
              <Heading as="h3" className="text-base font-bold text-foreground">
                {perk.title}
              </Heading>
              <Text
                as="p"
                className="text-xs text-muted-foreground leading-relaxed font-normal"
              >
                {perk.desc}
              </Text>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PROMO & CART CALLOUT BANNER */}
      <section className="relative overflow-hidden rounded-3xl p-8 sm:p-12 bg-card border border-primary/30 text-center space-y-4 shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <Badge
          variant="outline"
          className="inline-block px-3 py-1 bg-primary/15 border-primary/30 text-xs font-semibold text-primary"
        >
          🎁 Portal Special Offer
        </Badge>
        <Heading
          as="h2"
          className="text-2xl sm:text-4xl font-extrabold text-foreground"
        >
          Grab 3 Stickers, Get 1 Mystery Character Free!
        </Heading>
        <Text
          as="p"
          className="text-muted-foreground text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-normal"
        >
          Pick your favorite characters from the shop grid. Ready to decorate
          your gear with Citadel-grade vinyl quality.
        </Text>
        <div className="pt-2">
          <Link
            to="/products"
            className={buttonVariants({
              variant: "default",
              size: "lg",
              className:
                "rounded-xl font-bold gap-2 shadow-lg shadow-primary/25",
            })}
          >
            <Span>Open Multiverse Shop</Span>
            <Span>🛒</Span>
          </Link>
        </div>
      </section>
    </Container>
  );
}

export default Home;
