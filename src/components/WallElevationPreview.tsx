import React from 'react';
import { CalculatorInputs, CalculationResults, formatIndianNumber, BRICK_CONSTANTS } from '../utils/calculator';
import { Eye, Layers, Ruler } from 'lucide-react';

interface WallElevationPreviewProps {
  inputs: CalculatorInputs;
  results: CalculationResults;
  isLengthChanging: boolean;
  isHeightChanging: boolean;
}

export const WallElevationPreview: React.FC<WallElevationPreviewProps> = ({
  inputs,
  results,
  isLengthChanging,
  isHeightChanging,
}) => {
  // SVG Viewport
  const svgWidth = 480;
  const svgHeight = 160;
  const groundY = 135; // Plinth / Ground level baseline

  // Independent Horizontal & Vertical scaling:
  // 1. Length (1 - 200 ft) scales the width horizontally
  const minW = 60;
  const maxW = 390;
  const lengthRatio = Math.max(0, Math.min(1, (inputs.lengthFt - 1) / (200 - 1)));
  // Non-linear power curve so small walls (5-20ft) have clear room and large walls (100-200ft) stretch wide
  const widthCurve = Math.pow(lengthRatio, 0.65);
  const wallDrawWidth = minW + widthCurve * (maxW - minW);

  // 2. Height (1 - 30 ft) scales the height vertically from ground baseline
  const minH = 20;
  const maxH = 100;
  const heightRatio = Math.max(0, Math.min(1, (inputs.heightFt - 1) / (30 - 1)));
  const heightCurve = Math.pow(heightRatio, 0.72);
  const wallDrawHeight = minH + heightCurve * (maxH - minH);

  // Position: sits exactly on the ground baseline and centered horizontally
  const startX = (svgWidth - wallDrawWidth) / 2;
  const startY = groundY - wallDrawHeight;

  const is9Inch = inputs.wallThickness === '9inch';
  const isTraditional = inputs.brickType === 'traditional';

  // Indian Masonry course approximation:
  // Traditional brick course (75mm + 10mm mortar ≈ 85mm ≈ 3.35 inches -> ~3.6 courses per ft)
  const approxCourses = Math.round(inputs.heightFt * 3.6);

  return (
    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 sm:p-4 space-y-3 relative overflow-hidden transition-all duration-300">
      {/* Top Header bar with live readouts */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 font-semibold text-slate-200">
          <Eye className="w-3.5 h-3.5 text-emerald-400" />
          <span>Interactive Wall Elevation & Courses</span>
          <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
            (~{approxCourses} Brick Courses)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Thickness Badge */}
          <span
            className={`transition-all duration-300 px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
              is9Inch
                ? 'bg-amber-950/80 text-amber-300 border border-amber-600/40 shadow-sm shadow-amber-950/50'
                : 'bg-slate-900 text-slate-300 border border-slate-700'
            }`}
          >
            {is9Inch ? '9" Outer Wall (Header-Stretcher Bond)' : '4.5" Partition (Stretcher Bond)'}
          </span>

          {/* Area & Volume summary */}
          <span className="text-[10px] text-emerald-400 font-mono font-semibold">
            {formatIndianNumber(results.wallAreaSqFt)} Sq. Ft • {results.wallVolumeCft} CFT
          </span>
        </div>
      </div>

      {/* SVG Canvas for Wall Elevation with realistic brown clay bricks and concrete footing */}
      <div className="w-full bg-slate-900/70 rounded-lg p-2 border border-slate-800/80 flex items-center justify-center relative overflow-hidden">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-32 sm:h-36 overflow-visible select-none transition-all duration-300"
        >
          <defs>
            {/* Traditional Indian Red-Clay Brown Brick Pattern */}
            <pattern
              id="traditionalBrownClayBricks"
              width="24"
              height="12"
              patternUnits="userSpaceOnUse"
            >
              {/* Cement mortar joint background (light grey mortar) */}
              <rect width="24" height="12" fill="#94a3b8" />

              {/* Course 1 Stretcher Bricks (Rich Terracotta Red-Brown) */}
              <rect x="0.8" y="0.8" width="10.8" height="4.8" fill="#a0391b" rx="0.5" />
              <rect x="12.4" y="0.8" width="10.8" height="4.8" fill="#8b3014" rx="0.5" />
              {/* Subtle clamp-burned clay variation / frog texture */}
              <rect x="2.5" y="2" width="7" height="2" fill="#75250d" opacity="0.4" rx="0.5" />
              <rect x="14" y="2" width="7" height="2" fill="#6a1f0a" opacity="0.4" rx="0.5" />

              {/* Course 2 Offset Bricks (Warm Burnt Sienna / Terracotta Brown) */}
              <rect x="0" y="6.4" width="5.2" height="4.8" fill="#b94a28" rx="0.5" />
              <rect x="6" y="6.4" width="11.2" height="4.8" fill="#9c3619" rx="0.5" />
              <rect x="18" y="6.4" width="5.6" height="4.8" fill="#a53e20" rx="0.5" />
              <rect x="8" y="7.6" width="7" height="2" fill="#7c2912" opacity="0.4" rx="0.5" />
            </pattern>

            {/* Standard Modular Wire-Cut Terracotta Brown Brick Pattern */}
            <pattern
              id="modularBrownBricks"
              width="20"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              {/* Cement mortar joint background */}
              <rect width="20" height="10" fill="#cbd5e1" />

              {/* Course 1: Smooth wire-cut modular terracotta brown */}
              <rect x="0.6" y="0.6" width="9" height="4" fill="#b45309" rx="0.3" />
              <rect x="10.2" y="0.6" width="9.2" height="4" fill="#9a3412" rx="0.3" />

              {/* Course 2: Staggered course */}
              <rect x="0" y="5.2" width="4.4" height="4.2" fill="#c2410c" rx="0.3" />
              <rect x="5" y="5.2" width="9.4" height="4.2" fill="#a03b14" rx="0.3" />
              <rect x="15" y="5.2" width="4.6" height="4.2" fill="#b45309" rx="0.3" />
            </pattern>

            {/* Concrete Footing / Plinth Bed Pattern */}
            <pattern id="concreteFooting" width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="8" height="8" fill="#334155" />
              <circle cx="2" cy="2" r="0.8" fill="#475569" />
              <circle cx="6" cy="5" r="0.6" fill="#1e293b" />
              <circle cx="3" cy="6" r="0.7" fill="#64748b" />
            </pattern>

            {/* Realistic Wall Depth Shadow */}
            <filter id="wallElevationShadow" x="-10%" y="-10%" width="125%" height="125%">
              <feDropShadow dx="3" dy="4" stdDeviation="3.5" floodColor="#000" floodOpacity="0.75" />
            </filter>
          </defs>

          {/* Plinth / Concrete Foundation Strip at the ground line */}
          <rect
            x={Math.max(10, startX - 20)}
            y={groundY}
            width={wallDrawWidth + 40}
            height="14"
            fill="url(#concreteFooting)"
            stroke="#475569"
            strokeWidth="0.8"
            rx="1"
          />
          {/* Ground Baseline text marker */}
          <line
            x1="10"
            y1={groundY}
            x2={svgWidth - 10}
            y2={groundY}
            stroke="#64748b"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <text
            x="16"
            y={groundY + 11}
            fill="#94a3b8"
            fontSize="8"
            fontFamily="monospace"
            fontWeight="bold"
          >
            PLINTH / FOUNDATION LEVEL (GL ±0.00)
          </text>

          {/* 3D Top Depth Extrusion (Visual Thickness: 9-inch outer vs 4.5-inch partition) */}
          <path
            d={`M ${startX} ${startY}
               L ${startX + (is9Inch ? 14 : 7)} ${startY - (is9Inch ? 8 : 4)}
               L ${startX + wallDrawWidth + (is9Inch ? 14 : 7)} ${startY - (is9Inch ? 8 : 4)}
               L ${startX + wallDrawWidth} ${startY} Z`}
            fill={isTraditional ? '#7c2d12' : '#78350f'}
            stroke="#94a3b8"
            strokeWidth="0.7"
            className="transition-all duration-300 ease-out"
          />

          {/* 3D Side Depth Extrusion */}
          <path
            d={`M ${startX + wallDrawWidth} ${startY}
               L ${startX + wallDrawWidth + (is9Inch ? 14 : 7)} ${startY - (is9Inch ? 8 : 4)}
               L ${startX + wallDrawWidth + (is9Inch ? 14 : 7)} ${groundY - (is9Inch ? 8 : 4)}
               L ${startX + wallDrawWidth} ${groundY} Z`}
            fill={isTraditional ? '#6c220d' : '#69260c'}
            stroke="#94a3b8"
            strokeWidth="0.7"
            className="transition-all duration-300 ease-out"
          />

          {/* Main Front Wall Elevation (Rich Terracotta Red-Brown Bricks) */}
          <rect
            x={startX}
            y={startY}
            width={wallDrawWidth}
            height={wallDrawHeight}
            fill={isTraditional ? 'url(#traditionalBrownClayBricks)' : 'url(#modularBrownBricks)'}
            stroke="#7c2d12"
            strokeWidth="1.2"
            rx="1.5"
            filter="url(#wallElevationShadow)"
            className="transition-all duration-300 ease-out"
          />

          {/* Wall Corner Reinforcement Outline */}
          <rect
            x={startX}
            y={startY}
            width={wallDrawWidth}
            height={wallDrawHeight}
            fill="none"
            stroke="#f97316"
            strokeWidth="0.5"
            opacity="0.3"
            pointerEvents="none"
          />

          {/* Top Dimension Arrow (Wall Length in Feet) */}
          <g className={`transition-all duration-200 ${isLengthChanging ? 'opacity-100' : 'opacity-85'}`}>
            <line
              x1={startX}
              y1={startY - (is9Inch ? 15 : 12)}
              x2={startX + wallDrawWidth}
              y2={startY - (is9Inch ? 15 : 12)}
              stroke="#10b981"
              strokeWidth="1.2"
              strokeDasharray="3 2"
            />
            {/* Left & Right boundary tics */}
            <line
              x1={startX}
              y1={startY - (is9Inch ? 19 : 16)}
              x2={startX}
              y2={startY - (is9Inch ? 11 : 8)}
              stroke="#10b981"
              strokeWidth="1.5"
            />
            <line
              x1={startX + wallDrawWidth}
              y1={startY - (is9Inch ? 19 : 16)}
              x2={startX + wallDrawWidth}
              y2={startY - (is9Inch ? 11 : 8)}
              stroke="#10b981"
              strokeWidth="1.5"
            />
            <circle cx={startX} cy={startY - (is9Inch ? 15 : 12)} r="2" fill="#10b981" />
            <circle cx={startX + wallDrawWidth} cy={startY - (is9Inch ? 15 : 12)} r="2" fill="#10b981" />

            {/* Length Label */}
            <rect
              x={startX + wallDrawWidth / 2 - 28}
              y={startY - (is9Inch ? 26 : 23)}
              width="56"
              height="14"
              fill="#090d16"
              rx="3"
              stroke="#10b981"
              strokeWidth="0.8"
            />
            <text
              x={startX + wallDrawWidth / 2}
              y={startY - (is9Inch ? 16 : 13)}
              fill={isLengthChanging ? '#6ee7b7' : '#10b981'}
              fontSize="9"
              fontFamily="monospace"
              fontWeight="bold"
              textAnchor="middle"
              className={isLengthChanging ? 'animate-pulse' : ''}
            >
              L: {inputs.lengthFt} ft
            </text>
          </g>

          {/* Left Vertical Dimension Arrow (Wall Height in Feet) */}
          <g className={`transition-all duration-200 ${isHeightChanging ? 'opacity-100' : 'opacity-85'}`}>
            <line
              x1={Math.max(16, startX - 16)}
              y1={startY}
              x2={Math.max(16, startX - 16)}
              y2={groundY}
              stroke="#10b981"
              strokeWidth="1.2"
              strokeDasharray="3 2"
            />
            {/* Top & Bottom boundary tics */}
            <line
              x1={Math.max(12, startX - 20)}
              y1={startY}
              x2={Math.max(20, startX - 12)}
              y2={startY}
              stroke="#10b981"
              strokeWidth="1.5"
            />
            <line
              x1={Math.max(12, startX - 20)}
              y1={groundY}
              x2={Math.max(20, startX - 12)}
              y2={groundY}
              stroke="#10b981"
              strokeWidth="1.5"
            />
            <circle cx={Math.max(16, startX - 16)} cy={startY} r="2" fill="#10b981" />
            <circle cx={Math.max(16, startX - 16)} cy={groundY} r="2" fill="#10b981" />

            {/* Height Label */}
            <rect
              x={Math.max(4, startX - 44)}
              y={startY + wallDrawHeight / 2 - 7}
              width="40"
              height="14"
              fill="#090d16"
              rx="3"
              stroke="#10b981"
              strokeWidth="0.8"
            />
            <text
              x={Math.max(24, startX - 24)}
              y={startY + wallDrawHeight / 2 + 3}
              fill={isHeightChanging ? '#6ee7b7' : '#10b981'}
              fontSize="9"
              fontFamily="monospace"
              fontWeight="bold"
              textAnchor="middle"
              className={isHeightChanging ? 'animate-pulse' : ''}
            >
              H: {inputs.heightFt} ft
            </text>
          </g>

          {/* Thickness Label Callout on the 3D top edge */}
          <g>
            <text
              x={startX + wallDrawWidth + (is9Inch ? 18 : 10)}
              y={startY + 15}
              fill="#f59e0b"
              fontSize="8"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {is9Inch ? 'T: 9"' : 'T: 4.5"'}
            </text>
          </g>
        </svg>
      </div>

      {/* Visual Brick Spec & Color Indicator Bar */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-2.5 rounded-sm bg-[#9a3412] border border-[#f97316]/50 shadow-sm inline-block" />
          <span className="text-slate-300 font-medium">
            {isTraditional ? 'Traditional Burnt Red-Clay Brick' : 'Standard Wire-Cut Modular Terracotta'}
          </span>
          <span className="text-slate-500 font-mono">
            ({BRICK_CONSTANTS[inputs.brickType].spec})
          </span>
        </div>

        <div className="flex items-center gap-1 font-mono text-[10px] text-slate-400">
          <span>Mortar:</span>
          <span className="text-emerald-400 font-semibold">1:6 Cement Paste</span>
        </div>
      </div>
    </div>
  );
};
