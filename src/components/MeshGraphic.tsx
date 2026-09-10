const nodes = [
  { x: 40, y: 60 },
  { x: 150, y: 30 },
  { x: 250, y: 90 },
  { x: 95, y: 150 },
  { x: 205, y: 175 },
  { x: 300, y: 210 },
  { x: 55, y: 250 },
  { x: 165, y: 265 },
  { x: 265, y: 300 },
  { x: 120, y: 330 },
];

const edges: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 3],
  [1, 3],
  [3, 4],
  [2, 4],
  [4, 5],
  [3, 6],
  [4, 7],
  [6, 7],
  [7, 8],
  [5, 8],
  [7, 9],
  [6, 9],
];

const highlighted = new Set([3, 4, 7]);

export default function MeshGraphic() {
  return (
    <svg
      viewBox="0 0 340 360"
      className="h-full w-full"
      role="img"
      aria-label="An abstract network of connected nodes"
    >
      <circle
        cx="170"
        cy="185"
        r="150"
        fill="none"
        stroke="color-mix(in oklab, var(--teal) 35%, transparent)"
        strokeWidth="1"
        strokeDasharray="2 10"
        className="spin-slow"
      />
      <g className="mesh-float">
        <g stroke="color-mix(in oklab, var(--violet) 50%, transparent)" strokeWidth="1">
          {edges.map(([a, b], i) => (
            <line
              key={i}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              className="mesh-line"
              pathLength={1}
              style={{ animationDelay: `${0.3 + i * 0.05}s` }}
            />
          ))}
        </g>
        <g>
          {nodes.map((n, i) => (
            <circle
              key={i}
              cx={n.x}
              cy={n.y}
              r={highlighted.has(i) ? 5 : 3}
              fill={highlighted.has(i) ? "var(--green)" : "var(--violet)"}
              className={highlighted.has(i) ? "mesh-node--pulse" : "mesh-node"}
              style={{ animationDelay: `${0.2 + i * 0.06}s` }}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}
