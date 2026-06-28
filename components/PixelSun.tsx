/** Day-mode hand-built pixel-art sun (crisp blocks, rotating rays + pulse). Hidden at night via CSS. */
export default function PixelSun() {
  return (
    <div aria-hidden className="day-only pointer-events-none fixed top-1 right-3 z-0 opacity-85">
      <svg
        className="pixel-sun-svg"
        viewBox="0 0 18 18"
        width="96"
        height="96"
        shapeRendering="crispEdges"
        style={{ imageRendering: "pixelated" }}
      >
        {/* rotating ray pixels */}
        <g className="sun-rays" fill="#ffcf4d">
          <rect x="8" y="0" width="2" height="2" />
          <rect x="8" y="16" width="2" height="2" />
          <rect x="0" y="8" width="2" height="2" />
          <rect x="16" y="8" width="2" height="2" />
          <rect x="3" y="3" width="2" height="2" />
          <rect x="13" y="3" width="2" height="2" />
          <rect x="3" y="13" width="2" height="2" />
          <rect x="13" y="13" width="2" height="2" />
        </g>
        {/* core body */}
        <g fill="#ffd45e">
          <rect x="7" y="4" width="4" height="1" />
          <rect x="6" y="5" width="6" height="1" />
          <rect x="5" y="6" width="8" height="1" />
          <rect x="4" y="7" width="10" height="1" />
          <rect x="4" y="8" width="10" height="1" />
          <rect x="4" y="9" width="10" height="1" />
          <rect x="4" y="10" width="10" height="1" />
          <rect x="5" y="11" width="8" height="1" />
          <rect x="6" y="12" width="6" height="1" />
          <rect x="7" y="13" width="4" height="1" />
        </g>
        {/* top-left highlight */}
        <g fill="#fff2b0">
          <rect x="7" y="5" width="3" height="1" />
          <rect x="6" y="6" width="3" height="1" />
          <rect x="5" y="7" width="2" height="1" />
        </g>
        {/* bottom shadow */}
        <g fill="#eaa72e">
          <rect x="7" y="12" width="5" height="1" />
          <rect x="8" y="13" width="3" height="1" />
        </g>
      </svg>
    </div>
  );
}
