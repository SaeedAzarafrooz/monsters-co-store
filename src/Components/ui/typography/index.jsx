export { Heading, headingVariants } from "./Heading";
export { Text, textVariants } from "./Text";

// Dedicated semantic shortcuts for clean imports
import { Heading } from "./Heading";
import { Text } from "./Text";

export const H1 = (props) => <Heading as="h1" size="display" {...props} />;
export const H2 = (props) => <Heading as="h2" size="2xl" {...props} />;
export const H3 = (props) => <Heading as="h3" size="lg" {...props} />;
export const Paragraph = (props) => <Text as="p" size="base" variant="muted" {...props} />;
export const Caption = (props) => <Text as="span" size="xs" variant="muted" {...props} />;
export const Span = (props) => <Text as="span" size="inherit" {...props} />;
export const Label = (props) => <Text as="label" size="xs" weight="bold" className="uppercase tracking-wider text-muted-foreground select-none" {...props} />;
