/**
 * Form fields built on NES.css `.nes-input` / `.nes-textarea`, recolored to
 * the V2 palette in globals.css. Same API as before so call sites are stable.
 */
export function PixelField({
  label,
  placeholder,
  type = "text",
  name,
  required = false,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  name?: string;
  required?: boolean;
}) {
  const id = name || label.toLowerCase();
  return (
    <div className="nes-field">
      <label
        htmlFor={id}
        className="block font-pixel text-[10px] text-muted mb-2 tracking-wide"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="nes-input font-body text-[18px]"
      />
    </div>
  );
}

export function PixelTextarea({
  label,
  placeholder,
  rows = 4,
  name,
  required = false,
}: {
  label: string;
  placeholder?: string;
  rows?: number;
  name?: string;
  required?: boolean;
}) {
  const id = name || label.toLowerCase();
  return (
    <div className="nes-field">
      <label
        htmlFor={id}
        className="block font-pixel text-[10px] text-muted mb-2 tracking-wide"
      >
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        name={name}
        required={required}
        placeholder={placeholder}
        className="nes-textarea font-body text-[18px] resize-none"
      />
    </div>
  );
}
