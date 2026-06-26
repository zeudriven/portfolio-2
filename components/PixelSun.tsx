/** Day-mode pixel sun, fixed in the top-right corner (hidden at night via CSS). */
export default function PixelSun() {
  return (
    <div aria-hidden className="day-only pointer-events-none fixed top-3 right-4 z-0">
      <div className="pixel-sun" />
    </div>
  );
}
