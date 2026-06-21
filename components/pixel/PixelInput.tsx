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
  return (
    <label className="block">
      <span className="block font-pixel text-[10px] text-muted mb-2 tracking-wide">
        {label}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full bg-[#0f0a22] border-[4px] border-ink px-3 py-3 text-[18px] text-text placeholder:text-muted/60 outline-none transition-colors focus:border-green/60"
      />
    </label>
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
  return (
    <label className="block">
      <span className="block font-pixel text-[10px] text-muted mb-2 tracking-wide">
        {label}
      </span>
      <textarea
        rows={rows}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full resize-none bg-[#0f0a22] border-[4px] border-ink px-3 py-3 text-[18px] text-text placeholder:text-muted/60 outline-none transition-colors focus:border-green/60"
      />
    </label>
  );
}
