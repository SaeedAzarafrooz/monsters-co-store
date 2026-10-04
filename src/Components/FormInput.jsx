export default function FormInput({ label, id, error, ...otherProps }) {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-bold uppercase tracking-wider text-app-muted"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className="w-full rounded-xl border border-app-border bg-app-card px-3.5 py-2.5 text-sm font-medium text-app-text outline-none transition-colors placeholder:text-app-muted focus:border-app-accent"
        {...otherProps}
      />
      {error && <p className="text-xs font-semibold text-rose-500">{error}</p>}
    </div>
  );
}
