"use client";

interface GridBackgroundProps {
  className?: string;
  gridSize?: number;
  opacity?: number;
  color?: string;
}

export function GridBackground({
  className = "",
  gridSize = 40,
  opacity = 0.25,
  color = "#06b6d4"
}: GridBackgroundProps) {
  return (
    <>
      {/* Background gradient effects */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-cyan-950/30"></div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.15),transparent_60%)]"></div>

      {/* Animated mesh grid */}
      <div className={`absolute inset-0 z-0 ${className}`} style={{ opacity }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, ${color}25 1px, transparent 1px), linear-gradient(to bottom, ${color}25 1px, transparent 1px)`,
            backgroundSize: `${gridSize}px ${gridSize}px`
          }}
        ></div>
      </div>
    </>
  );
}
