/**
 * Civil Material Calculator
 * Indian Civil Engineering Masonry Computation Micro-SaaS
 * IS 1077 / CPWD DSR Standards
 */

import React, { useState, useMemo } from 'react';
import {
  CalculatorInputs,
  calculateCivilMaterials,
  formatIndianCurrency,
  formatIndianNumber,
  BRICK_CONSTANTS,
  WallThicknessType,
  BrickType,
} from './utils/calculator';
import { HeaderBannerAd } from './components/HeaderBannerAd';
import { SidebarAd } from './components/SidebarAd';
import { LeadCaptureBox } from './components/LeadCaptureBox';
import { PdfCheckoutModal } from './components/PdfCheckoutModal';
import { WhatsAppShareModal } from './components/WhatsAppShareModal';
import { SeoAccordion } from './components/SeoAccordion';
import { WallElevationPreview } from './components/WallElevationPreview';
import { useValueBounce } from './hooks/useValueBounce';
import {
  Calculator,
  Share2,
  FileDown,
  Layers,
  Ruler,
  TrendingUp,
  Percent,
  Check,
  RotateCcw,
  Building,
  Info,
  DollarSign,
  Package,
  Boxes,
  Compass,
  Sparkles,
} from 'lucide-react';

export default function App() {
  // Input state
  const [lengthFt, setLengthFt] = useState<number>(30);
  const [heightFt, setHeightFt] = useState<number>(10);
  const [wallThickness, setWallThickness] = useState<WallThicknessType>('9inch');
  const [brickType, setBrickType] = useState<BrickType>('traditional');
  const [wastagePercent, setWastagePercent] = useState<number>(10);
  const [costPerBrick, setCostPerBrick] = useState<number>(8);
  const [costPerCementBag, setCostPerCementBag] = useState<number>(380);
  const [costPerSandCft, setCostPerSandCft] = useState<number>(55);

  // Modals state
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  // Live calculation
  const currentInputs: CalculatorInputs = useMemo(
    () => ({
      lengthFt: Math.max(1, Math.min(200, lengthFt || 1)),
      heightFt: Math.max(1, Math.min(30, heightFt || 1)),
      wallThickness,
      brickType,
      wastagePercent: Math.max(0, Math.min(25, wastagePercent || 0)),
      costPerBrick: Math.max(1, costPerBrick || 1),
      costPerCementBag: Math.max(1, costPerCementBag || 1),
      costPerSandCft: Math.max(1, costPerSandCft || 1),
    }),
    [
      lengthFt,
      heightFt,
      wallThickness,
      brickType,
      wastagePercent,
      costPerBrick,
      costPerCementBag,
      costPerSandCft,
    ]
  );

  const results = useMemo(() => calculateCivilMaterials(currentInputs), [currentInputs]);

  // Reactive Value Bounces (Visual Micro-Interactions)
  const isGrandTotalBouncing = useValueBounce(results.grandTotalCost, 350);
  const isBricksBouncing = useValueBounce(results.totalBricksWithWastage, 350);
  const isCementBouncing = useValueBounce(results.cementBagsRounded, 350);
  const isSandBouncing = useValueBounce(results.sandVolumeCft, 350);
  const isLengthChanging = useValueBounce(lengthFt, 350);
  const isHeightChanging = useValueBounce(heightFt, 350);
  const isBrickCostBouncing = useValueBounce(results.brickCost, 350);
  const isCementCostBouncing = useValueBounce(results.cementCost, 350);
  const isSandCostBouncing = useValueBounce(results.sandCost, 350);
  const isUnitRateBouncing = useValueBounce(results.costPerSqFt, 350);

  // Presets
  const applyPreset = (presetName: 'bedroom' | 'boundary' | 'compound') => {
    if (presetName === 'bedroom') {
      setLengthFt(12);
      setHeightFt(10);
      setWallThickness('4.5inch');
      setBrickType('traditional');
    } else if (presetName === 'boundary') {
      setLengthFt(40);
      setHeightFt(6);
      setWallThickness('9inch');
      setBrickType('traditional');
    } else if (presetName === 'compound') {
      setLengthFt(100);
      setHeightFt(8);
      setWallThickness('9inch');
      setBrickType('modular');
    }
  };

  const resetDefaults = () => {
    setLengthFt(30);
    setHeightFt(10);
    setWallThickness('9inch');
    setBrickType('traditional');
    setWastagePercent(10);
    setCostPerBrick(8);
    setCostPerCementBag(380);
    setCostPerSandCft(55);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-100 text-base sm:text-lg tracking-tight">
                  Civil Material Calculator
                </span>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-semibold">
                  IS 1077
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Brickwork, Cement (1:6) & Sand Quantity Estimator • Bangalore Rates
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsWhatsAppModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-all duration-200 active:scale-95 cursor-pointer shadow-sm hover:shadow-emerald-500/10"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp Share</span>
            </button>

            <button
              type="button"
              onClick={() => setIsPdfModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all duration-200 shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Get BOQ PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 flex-1 w-full no-print">
        {/* Top Premium Ad Placement */}
        <HeaderBannerAd onClaimQuote={() => {
          const el = document.getElementById('lead-funnel-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }} />

        {/* Dashboard Title & Presets Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/20">
                100% Client-Side Real-Time Math
              </span>
              <span className="text-xs text-slate-400 font-mono">
                IS 1077 & CPWD DSR Compliant
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
              Masonry Wall Material & Billing Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Instant calculation for outer & partition brickwork with 1:6 mortar mix, 50kg cement bags, and sand CFT.
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            <span className="text-xs text-slate-400 font-medium">Quick Presets:</span>
            <button
              type="button"
              onClick={() => applyPreset('bedroom')}
              className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all duration-200 active:scale-95"
            >
              Partition (12×10 ft)
            </button>
            <button
              type="button"
              onClick={() => applyPreset('boundary')}
              className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all duration-200 active:scale-95"
            >
              Boundary (40×6 ft)
            </button>
            <button
              type="button"
              onClick={() => applyPreset('compound')}
              className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all duration-200 active:scale-95"
            >
              Compound (100×8 ft)
            </button>
            <button
              type="button"
              onClick={resetDefaults}
              aria-label="Reset all inputs to default"
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all duration-200 active:scale-90"
              title="Reset to Defaults"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Core Calculation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Computation Controls & Input Parameters */}
          <section
            aria-label="Civil Engineering Input Parameters"
            className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-400" />
                <h2 className="text-base font-bold text-slate-100">
                  Wall Geometry & Material Specifications
                </h2>
              </div>
              <span className="text-xs text-emerald-400 font-mono font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Instant Reactivity</span>
              </span>
            </div>

            {/* Live Visual Wall Elevation Cross-Section */}
            <WallElevationPreview
              inputs={currentInputs}
              results={results}
              isLengthChanging={isLengthChanging}
              isHeightChanging={isHeightChanging}
            />

            {/* Slider 1: Wall Length with Dynamic Slider Value Pop */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="wall-length-range"
                  className="text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-1.5"
                >
                  <Ruler className="w-4 h-4 text-emerald-400" />
                  <span>Wall Length (Feet)</span>
                </label>

                {/* Animated Value Tracker Badge */}
                <div className="flex items-center gap-1.5">
                  <div
                    className={`inline-flex items-center transition-all duration-300 ease-out transform ${
                      isLengthChanging
                        ? 'animate-pulse scale-105 text-emerald-300'
                        : 'scale-100 text-emerald-400'
                    }`}
                  >
                    <input
                      id="wall-length-number"
                      type="number"
                      min={1}
                      max={200}
                      value={lengthFt}
                      onChange={(e) => setLengthFt(Number(e.target.value))}
                      className="w-20 bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-lg px-2.5 py-1 text-right text-sm font-mono font-bold outline-none transition-all duration-300"
                    />
                    <span className="text-xs text-slate-400 font-mono ml-1.5">ft</span>
                  </div>
                </div>
              </div>

              <input
                id="wall-length-range"
                type="range"
                min={1}
                max={200}
                step={1}
                value={lengthFt}
                onChange={(e) => setLengthFt(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-500 transition-all"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1 ft (Min)</span>
                <span>50 ft</span>
                <span>100 ft</span>
                <span>150 ft</span>
                <span>200 ft (Max)</span>
              </div>
            </div>

            {/* Slider 2: Wall Height with Dynamic Slider Value Pop */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="wall-height-range"
                  className="text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-1.5"
                >
                  <Ruler className="w-4 h-4 text-emerald-400" />
                  <span>Wall Height (Feet)</span>
                </label>

                {/* Animated Value Tracker Badge */}
                <div className="flex items-center gap-1.5">
                  <div
                    className={`inline-flex items-center transition-all duration-300 ease-out transform ${
                      isHeightChanging
                        ? 'animate-pulse scale-105 text-emerald-300'
                        : 'scale-100 text-emerald-400'
                    }`}
                  >
                    <input
                      id="wall-height-number"
                      type="number"
                      min={1}
                      max={30}
                      value={heightFt}
                      onChange={(e) => setHeightFt(Number(e.target.value))}
                      className="w-20 bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-lg px-2.5 py-1 text-right text-sm font-mono font-bold outline-none transition-all duration-300"
                    />
                    <span className="text-xs text-slate-400 font-mono ml-1.5">ft</span>
                  </div>
                </div>
              </div>

              <input
                id="wall-height-range"
                type="range"
                min={1}
                max={30}
                step={0.5}
                value={heightFt}
                onChange={(e) => setHeightFt(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-500 transition-all"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1 ft</span>
                <span>10 ft (Standard Ceiling)</span>
                <span>20 ft</span>
                <span>30 ft (High Span)</span>
              </div>
            </div>

            {/* Wall Thickness Selector with Active Toggle Easing & Scaling */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-semibold text-slate-200 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>Wall Thickness Layer</span>
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {wallThickness === '9inch' ? '0.75 ft (Full Brick)' : '0.375 ft (Half Brick)'}
                </span>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setWallThickness('9inch')}
                  className={`p-3 rounded-xl border text-left relative overflow-hidden transition-all duration-200 ease-in-out cursor-pointer ${
                    wallThickness === '9inch'
                      ? 'bg-slate-950 border-emerald-500 ring-1 ring-emerald-500/50 shadow-md shadow-emerald-500/10 scale-[1.02]'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:scale-[1.01] text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-slate-100">9-Inch Outer Wall</span>
                    {wallThickness === '9inch' && (
                      <span className="p-0.5 rounded-full bg-emerald-500 text-slate-950 animate-in fade-in zoom-in-75 duration-200">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Structural perimeter & load-bearing masonry (230 mm / 0.75 ft).
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setWallThickness('4.5inch')}
                  className={`p-3 rounded-xl border text-left relative overflow-hidden transition-all duration-200 ease-in-out cursor-pointer ${
                    wallThickness === '4.5inch'
                      ? 'bg-slate-950 border-emerald-500 ring-1 ring-emerald-500/50 shadow-md shadow-emerald-500/10 scale-[1.02]'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:scale-[1.01] text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-slate-100">4.5-Inch Partition Wall</span>
                    {wallThickness === '4.5inch' && (
                      <span className="p-0.5 rounded-full bg-emerald-500 text-slate-950 animate-in fade-in zoom-in-75 duration-200">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Half-brick room divider & non-load partition (115 mm / 0.375 ft).
                  </p>
                </button>
              </div>
            </div>

            {/* Bricks Specification Toggle with Active Toggle Easing */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-semibold text-slate-200 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Boxes className="w-4 h-4 text-emerald-400" />
                  <span>Bricks Specification Standard</span>
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {brickType === 'traditional' ? '~11.5 bricks/CFT' : '~13.2 bricks/CFT'}
                </span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setBrickType('traditional')}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 ease-in-out cursor-pointer ${
                    brickType === 'traditional'
                      ? 'bg-slate-950 border-emerald-500 ring-1 ring-emerald-500/50 shadow-md shadow-emerald-500/10 scale-[1.02]'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:scale-[1.01] text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3.5 h-2.5 rounded-xs bg-gradient-to-r from-[#8b3014] to-[#a0391b] border border-orange-500/50 shadow-xs inline-block shrink-0" />
                      <span className="font-bold text-xs sm:text-sm text-slate-100">
                        Traditional Red Clay Brick
                      </span>
                    </div>
                    {brickType === 'traditional' && (
                      <span className="p-0.5 rounded-full bg-emerald-500 text-slate-950 animate-in fade-in zoom-in-75 duration-200">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">
                    230 × 110 × 75 mm • 11.5 Bricks/CFT
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setBrickType('modular')}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 ease-in-out cursor-pointer ${
                    brickType === 'modular'
                      ? 'bg-slate-950 border-emerald-500 ring-1 ring-emerald-500/50 shadow-md shadow-emerald-500/10 scale-[1.02]'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:scale-[1.01] text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3.5 h-2.5 rounded-xs bg-gradient-to-r from-[#9a3412] to-[#b45309] border border-amber-500/50 shadow-xs inline-block shrink-0" />
                      <span className="font-bold text-xs sm:text-sm text-slate-100">
                        Standard Modular Brick
                      </span>
                    </div>
                    {brickType === 'modular' && (
                      <span className="p-0.5 rounded-full bg-emerald-500 text-slate-950 animate-in fade-in zoom-in-75 duration-200">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">
                    190 × 90 × 90 mm • 13.2 Bricks/CFT
                  </p>
                </button>
              </div>
            </div>

            {/* Dynamic Wastage Buffer (10%) & Mortar Ratio Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-1.5 transition-all duration-300">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300 flex items-center gap-1">
                    <Percent className="w-3.5 h-3.5 text-emerald-400" />
                    Wastage Buffer
                  </span>
                  <span className="font-mono font-bold text-emerald-400">{wastagePercent}%</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Adds{' '}
                  <span
                    className={`inline-block font-mono font-bold transition-all duration-300 ease-out transform ${
                      isBricksBouncing ? 'scale-105 text-emerald-300' : 'text-slate-300'
                    }`}
                  >
                    +{formatIndianNumber(results.wastageBricks)}
                  </span>{' '}
                  bricks to absorb site cuts & transit breakage.
                </p>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-1.5 transition-all duration-300">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-emerald-400" />
                    Mortar Mix Standard
                  </span>
                  <span className="font-mono font-bold text-slate-200">1:6 Ratio</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  30% Wet Volume factor with 1.33 dry expansion metric (CPWD).
                </p>
              </div>
            </div>

            {/* Commercial Cost Engine Input Fields */}
            <div className="bg-slate-950 border border-emerald-500/30 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4" />
                  Commercial Cost Engine (Bangalore Market Rates)
                </h3>
                <span className="text-[10px] text-slate-500 font-mono">Editable Unit Prices</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label htmlFor="cost-brick" className="text-[11px] font-medium text-slate-300 block">
                    Estimated Cost per Brick (₹) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs font-mono text-slate-500">₹</span>
                    <input
                      id="cost-brick"
                      type="number"
                      min={1}
                      max={50}
                      step={0.5}
                      value={costPerBrick}
                      onChange={(e) => setCostPerBrick(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-lg pl-7 pr-3 py-1.5 text-xs sm:text-sm font-mono font-bold text-slate-100 outline-none transition-colors"
                    />
                  </div>
                  <div className="flex gap-1 text-[10px] text-slate-400">
                    <span>Quick:</span>
                    <button type="button" onClick={() => setCostPerBrick(7)} className="underline hover:text-slate-200 transition-colors">₹7</button>
                    <button type="button" onClick={() => setCostPerBrick(8)} className="underline hover:text-slate-200 font-bold text-emerald-400 transition-colors">₹8</button>
                    <button type="button" onClick={() => setCostPerBrick(9)} className="underline hover:text-slate-200 transition-colors">₹9</button>
                    <button type="button" onClick={() => setCostPerBrick(10)} className="underline hover:text-slate-200 transition-colors">₹10</button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="cost-cement" className="text-[11px] font-medium text-slate-300 block">
                    Cement / 50kg Bag (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs font-mono text-slate-500">₹</span>
                    <input
                      id="cost-cement"
                      type="number"
                      min={100}
                      max={800}
                      value={costPerCementBag}
                      onChange={(e) => setCostPerCementBag(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-lg pl-7 pr-3 py-1.5 text-xs sm:text-sm font-mono font-bold text-slate-100 outline-none transition-colors"
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 block">UltraTech/Birla avg</span>
                </div>

                <div className="space-y-1">
                  <label htmlFor="cost-sand" className="text-[11px] font-medium text-slate-300 block">
                    Sand / CFT Rate (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs font-mono text-slate-500">₹</span>
                    <input
                      id="cost-sand"
                      type="number"
                      min={10}
                      max={150}
                      value={costPerSandCft}
                      onChange={(e) => setCostPerSandCft(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-lg pl-7 pr-3 py-1.5 text-xs sm:text-sm font-mono font-bold text-slate-100 outline-none transition-colors"
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 block">M-Sand Zone II</span>
                </div>
              </div>
            </div>
          </section>

          {/* Right Column: Material Breakdown Sidebar & Macro-Billing */}
          <section
            aria-label="Material Breakdown and Macro-Billing"
            className="lg:col-span-5 space-y-6 flex flex-col"
          >
            {/* Macro-Billing Summary Card (High Contrast Emerald details & Dynamic Counter Bounce) */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-2 border-emerald-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl shadow-emerald-950/30 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Macro-Billing Sum Total
                </span>
                <span
                  className={`text-[11px] font-mono transition-all duration-300 ease-out transform ${
                    isUnitRateBouncing ? 'scale-105 text-emerald-300' : 'text-slate-400'
                  }`}
                >
                  ₹{results.costPerSqFt}/Sq. Ft
                </span>
              </div>

              {/* Grand Total Value with Dynamic Counter Scaling */}
              <div>
                <div
                  className={`text-3xl sm:text-4xl font-black font-mono tracking-tight transition-all duration-300 ease-out transform origin-left ${
                    isGrandTotalBouncing
                      ? 'scale-105 text-emerald-300 drop-shadow-[0_0_12px_rgba(52,211,153,0.6)]'
                      : 'scale-100 text-emerald-400'
                  }`}
                >
                  {formatIndianCurrency(results.grandTotalCost)}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Estimated material expenditure for {formatIndianNumber(results.wallAreaSqFt)} Sq. Ft ({results.wallVolumeCft} CFT) wall.
                </p>
              </div>

              {/* Three Primary Material Metrics with Dynamic Counter Bounce */}
              <div className="grid grid-cols-3 gap-2.5 pt-1">
                {/* Bricks Output Field */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-center space-y-1 transition-all duration-200 hover:border-slate-700">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Bricks</span>
                  <div
                    className={`text-base sm:text-lg font-black font-mono transition-all duration-300 ease-out transform ${
                      isBricksBouncing
                        ? 'scale-105 text-emerald-300'
                        : 'scale-100 text-slate-100'
                    }`}
                  >
                    {formatIndianNumber(results.totalBricksWithWastage)}
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono block">
                    Inc. 10% Wastage
                  </span>
                </div>

                {/* Cement Bags Output Field */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-center space-y-1 transition-all duration-200 hover:border-slate-700">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Cement (50kg)</span>
                  <div
                    className={`text-base sm:text-lg font-black font-mono transition-all duration-300 ease-out transform ${
                      isCementBouncing
                        ? 'scale-105 text-emerald-300'
                        : 'scale-100 text-emerald-400'
                    }`}
                  >
                    {results.cementBagsRounded} Bags
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    {results.cementBags50kg} exact
                  </span>
                </div>

                {/* Sand CFT Output Field */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-center space-y-1 transition-all duration-200 hover:border-slate-700">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Sand Volume</span>
                  <div
                    className={`text-base sm:text-lg font-black font-mono transition-all duration-300 ease-out transform ${
                      isSandBouncing
                        ? 'scale-105 text-emerald-300'
                        : 'scale-100 text-slate-100'
                    }`}
                  >
                    {results.sandVolumeCft}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    CFT ({results.sandBrass} Brass)
                  </span>
                </div>
              </div>

              {/* Detailed Cost Line Items with Dynamic Transitions */}
              <div className="space-y-2 bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-xs font-mono">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="font-sans">
                    Bricks ({formatIndianNumber(results.totalBricksWithWastage)} × ₹{currentInputs.costPerBrick}):
                  </span>
                  <span
                    className={`font-bold transition-all duration-300 ease-out transform ${
                      isBrickCostBouncing ? 'scale-105 text-emerald-300' : 'text-slate-100'
                    }`}
                  >
                    {formatIndianCurrency(results.brickCost)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="font-sans">
                    Cement ({results.cementBagsRounded} bags × ₹{currentInputs.costPerCementBag}):
                  </span>
                  <span
                    className={`font-bold transition-all duration-300 ease-out transform ${
                      isCementCostBouncing ? 'scale-105 text-emerald-300' : 'text-slate-100'
                    }`}
                  >
                    {formatIndianCurrency(results.cementCost)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="font-sans">
                    Sand ({results.sandVolumeCft} CFT × ₹{currentInputs.costPerSandCft}):
                  </span>
                  <span
                    className={`font-bold transition-all duration-300 ease-out transform ${
                      isSandCostBouncing ? 'scale-105 text-emerald-300' : 'text-slate-100'
                    }`}
                  >
                    {formatIndianCurrency(results.sandCost)}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Micro-Transaction PDF & WhatsApp */}
              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setIsPdfModalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-lg shadow-emerald-500/25 active:scale-95 cursor-pointer"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Print-Ready Estimation PDF for Bank Loan / Contractor</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsWhatsAppModalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-emerald-500/40 text-emerald-400 font-bold text-xs transition-all duration-200 active:scale-95 cursor-pointer shadow-sm hover:shadow-emerald-500/10"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Send Estimate to WhatsApp (Clean Markdown)</span>
                </button>
              </div>
            </div>

            {/* High-CPC Sidebar Ad Placeholder */}
            <SidebarAd onInquire={() => {
              const el = document.getElementById('lead-funnel-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }} />
          </section>
        </div>

        {/* Lead-Generation Funnel Section (Anchored below calculation results) */}
        <div id="lead-funnel-section">
          <LeadCaptureBox inputs={currentInputs} results={results} />
        </div>

        {/* Semantic SEO Accordion: How the Engineering Math Works */}
        <SeoAccordion />
      </main>

      {/* Footer with Semantic Micro-SaaS Links & SEO Compliance */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950 py-8 px-4 sm:px-6 text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-bold text-slate-300">
              Civil Material Calculator (civil-material-calculator.pages.dev)
            </div>
            <p>
              High-Precision Indian Masonry Estimator • IS 1077 Red Clay & Standard Modular Bricks • 1:6 Mortar Dry Volume Formulas
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-emerald-500">100/100 PageSpeed Ready</span>
            <span>•</span>
            <span>Bangalore CPWD Standards</span>
          </div>
        </div>
      </footer>

      {/* Micro-Transaction Commercial Payment Gateway & Print Report Modal */}
      <PdfCheckoutModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        inputs={currentInputs}
        results={results}
      />

      {/* WhatsApp Share Markdown Engine Modal */}
      <WhatsAppShareModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        inputs={currentInputs}
        results={results}
      />
    </div>
  );
}
