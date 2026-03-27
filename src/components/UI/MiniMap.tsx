"use client";

interface MiniMapProps {
  cameraAzimuth: number;
}

export function MiniMap({ cameraAzimuth }: MiniMapProps) {
  return (
    <div className="absolute bottom-6 right-6 w-[120px] h-[120px] bg-gray-900/60 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden shadow-xl">
      <svg className="w-full h-full" viewBox="0 0 120 120">
        {/* Globe outline */}
        <circle
          cx="60"
          cy="60"
          r="45"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
        />
        {/* Equator */}
        <ellipse
          cx="60"
          cy="60"
          rx="45"
          ry="15"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="0.5"
        />
        {/* Prime meridian */}
        <ellipse
          cx="60"
          cy="60"
          rx="15"
          ry="45"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="0.5"
        />
        {/* Camera direction indicator */}
        <g transform={`rotate(${cameraAzimuth} 60 60)`}>
          <polygon
            points="60,20 54,35 66,35"
            fill="#3b82f6"
            opacity="0.8"
          />
          <line
            x1="60"
            y1="35"
            x2="60"
            y2="60"
            stroke="#3b82f6"
            strokeWidth="1"
            opacity="0.4"
          />
        </g>
        {/* Center dot */}
        <circle cx="60" cy="60" r="2" fill="rgba(255,255,255,0.3)" />
      </svg>
      <p className="absolute bottom-1 left-0 right-0 text-center text-[9px] text-gray-500">
        Orientation
      </p>
    </div>
  );
}
