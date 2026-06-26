/** Day-mode pixel beach — a static wave + sand strip along the bottom. Hidden at night via CSS. */
const seaSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='40' shape-rendering='crispEdges'>
  <rect width='64' height='40' fill='#79c6ec'/>
  <rect x='0' y='32' width='64' height='8' fill='#5fb3df'/>
  <rect x='0' y='0' width='64' height='5' fill='#bfe6f7'/>
  <rect x='4' y='5' width='10' height='3' fill='#bfe6f7'/>
  <rect x='28' y='5' width='12' height='3' fill='#bfe6f7'/>
  <rect x='50' y='5' width='9' height='3' fill='#bfe6f7'/>
</svg>`;
const sandSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' shape-rendering='crispEdges'>
  <rect width='32' height='32' fill='#ecd9a0'/>
  <rect x='0' y='0' width='32' height='3' fill='#e0c987'/>
  <rect x='5' y='9' width='2' height='2' fill='#dcc587'/>
  <rect x='20' y='15' width='2' height='2' fill='#dcc587'/>
  <rect x='12' y='23' width='2' height='2' fill='#dcc587'/>
  <rect x='27' y='27' width='2' height='2' fill='#dcc587'/>
</svg>`;

const SEA = `data:image/svg+xml,${encodeURIComponent(seaSvg)}`;
const SAND = `data:image/svg+xml,${encodeURIComponent(sandSvg)}`;

export default function DayBeach() {
  return (
    <div aria-hidden className="day-only pointer-events-none fixed inset-x-0 bottom-0 z-0 h-[112px]">
      <div
        className="absolute inset-x-0 bottom-[58px] h-[40px]"
        style={{ backgroundImage: `url("${SEA}")`, backgroundRepeat: "repeat-x", backgroundSize: "64px 40px", imageRendering: "pixelated" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[62px]"
        style={{ backgroundImage: `url("${SAND}")`, backgroundRepeat: "repeat", backgroundSize: "32px 32px", imageRendering: "pixelated" }}
      />
    </div>
  );
}
