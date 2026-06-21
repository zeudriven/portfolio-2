/* eslint-disable @next/next/no-img-element */
type Props = {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  corners?: boolean;
};

/** Replaceable pixel-art slot with corner ticks. Swap `src` for new art anytime. */
export default function ArtSlot({
  src,
  alt,
  size = 128,
  className = "",
  corners = true,
}: Props) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {corners && (
        <>
          <span className="absolute top-1 left-1 w-3 h-3 border-t-[3px] border-l-[3px] border-green/70" />
          <span className="absolute top-1 right-1 w-3 h-3 border-t-[3px] border-r-[3px] border-green/70" />
          <span className="absolute bottom-1 left-1 w-3 h-3 border-b-[3px] border-l-[3px] border-green/70" />
          <span className="absolute bottom-1 right-1 w-3 h-3 border-b-[3px] border-r-[3px] border-green/70" />
        </>
      )}
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className="object-contain drop-shadow-[0_6px_0_rgba(0,0,0,0.35)]"
      />
    </div>
  );
}
