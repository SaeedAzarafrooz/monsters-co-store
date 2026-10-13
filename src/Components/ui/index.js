/**
 * UI KIT - Barrel Export
 * Central entry point for all reusable UI components and design system elements.
 */

/* ==========================================================================
   1. Typography & Primitives
   - Typography components for consistent text hierarchies across the app.
   ========================================================================== */
export * from "./typography";

/* ==========================================================================
   2. Layout & Containers
   - Container: Viewport constraints & auto-centered page shells.
   - Stack: Vertical layout primitive (flex-col) with spacing presets.
   - Group: Horizontal layout primitive (flex-row) with alignment presets.
   - Separator: Visual dividers (horizontal/vertical lines).
   ========================================================================== */
export * from "./layout/Container";
export * from "./layout/Stack"; // exports: Stack, Group
export * from "./layout/Separator";

/* ==========================================================================
   3. Buttons & Actions
   - Button: Interactive CTA with variants (default, secondary, outline, ghost).
   ========================================================================== */
export * from "./common/Button";

/* ==========================================================================
   4. Form & Input Controls
   - Input: Text input field with states.
   - Select: Native/custom dropdown selector.
   - FormInput: Combined label + input + error control.
   - FormField: Accessible form wrapper with error messaging.
   - FormGrid: Multi-column responsive form layouts.
   - OptionCard: Selectable card for options/shipping methods.
   - QuantityStepper: Interactive counter with slide transitions (+ / - / delete).
   ========================================================================== */
export * from "./form/Input";
export * from "./form/Select";
export * from "./form/FormInput";
export * from "./form/FormField";
export * from "./form/FormGrid";
export * from "./form/OptionCard";
export * from "./form/QuantityStepper";

/* ==========================================================================
   5. Data Display & Media
   - Card: Surface container with subcomponents (CardHeader, CardTitle, CardBody, CardFooter).
   - DataList: Key-value metadata listings.
   - Icon: Standardized SVG icon system.
   ========================================================================== */
export * from "./data-display/Card";
export * from "./data-display/DataList";
export * from "./data-display/Icon";

/* ==========================================================================
   6. Feedback & Indicators
   - Badge: Status pills and indicators.
   - Skeleton: Loading placeholder with shimmer effect.
   - Tooltip: Hover bubble with directional positioning (top, bottom, left, right).
   - EmptyState: Zero-data display with message and actions.
   ========================================================================== */
export * from "./feedback/Badge";
export * from "./feedback/Skeleton";
export * from "./feedback/Tooltip";
export * from "./feedback/EmptyState";

/* ==========================================================================
   7. Navigation & Flow
   - Stepper: Process indicators supporting both horizontal & vertical orientations.
   - Pagination: Multi-page navigation control.
   ========================================================================== */
export * from "./navigation/Stepper";
export * from "./navigation/Pagination";

/* ==========================================================================
   8. Overlays & Modals
   - Modal: Accessible dialog with subcomponents (ModalContent, ModalHeader, 
     ModalTitle, ModalBody, ModalFooter, ModalCloseButton).
   ========================================================================== */
export * from "./overlay/Modal";
