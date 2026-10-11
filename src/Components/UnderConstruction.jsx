import { Link, useNavigate } from "react-router-dom";
import { Icon, Badge } from "./ui";
import { Heading, Text } from "./ui/typography";

function UnderConstruction({
  title = "Under Construction",
  description = "This feature is currently being developed and will be available soon!",
  showBackButton = true,
}) {
  const navigate = useNavigate();

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4 py-12">
      {/* Visual illustration container */}
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

      {/* Badge tag */}
      <Badge
        variant="outline"
        className="px-3 py-1 bg-[#b5dc11]/15 text-[#b5dc11] border-[#b5dc11]/30 mb-4"
      >
        🚧 Work in Progress
      </Badge>

      {/* Headings and descriptive copy */}
      <Heading as="h2" size="2xl" className="text-app-text mb-2">
        {title}
      </Heading>
      <Text as="p" size="base" className="text-app-muted max-w-md mx-auto mb-8">
        {description}
      </Text>

      {/* Action buttons */}
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
