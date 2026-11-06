import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Calculator, Layers, ShieldCheck, Ruler, Scale } from 'lucide-react';

export const SeoAccordion: React.FC = () => {
  const [openSection, setOpenSection] = useState<number | null>(0); // first section open by default

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  const sections = [
    {
      title: 'How the Engineering Math Works: 1 Cubic Meter Brickwork Calculations & Formulas',
      icon: <Calculator className="w-5 h-5 text-emerald-400" />,
      content: (
        <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed">
          <p>
            In Indian civil engineering practice conforming to <strong>IS: 1077</strong> and the <strong>Central Public Works Department (CPWD) Delhi Schedule of Rates (DSR)</strong>, calculating raw quantities for masonry requires determining the geometric volume of the brickwork structure in cubic feet (CFT) or cubic meters (m³), followed by modular brick dimensions subtraction.
          </p>
          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 font-mono text-xs space-y-1.5 text-emerald-300">
            <div>1. Masonry Wall Volume (CFT) = Wall Length (ft) × Wall Height (ft) × Wall Thickness (ft)</div>
            <div>2. Metric Conversion: 1 m³ = 35.3147 CFT (or 1 CFT = 0.0283168 m³)</div>
            <div>3. Total Bricks = (Wall Volume in CFT × Bricks per CFT) + 10% Wastage Buffer</div>
          </div>
          <p>
            For traditional red clay bricks (nominal size 230 mm × 110 mm × 75 mm), standard Indian site practice establishes <strong>11.5 bricks per CFT</strong> (approximately 406 bricks per m³). For standard modular bricks (190 mm × 90 mm × 90 mm), the masonry consumption rate is <strong>13.2 bricks per CFT</strong> (or exactly 500 bricks per m³ when incorporating 10 mm mortar joints).
          </p>
        </div>
      ),
    },
    {
      title: 'Dry Mortar Ratio Mix Formulas: The 30% Wet Volume & 1.33 Expansion Factor',
      icon: <Layers className="w-5 h-5 text-emerald-400" />,
      content: (
        <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed">
          <p>
            When bricks are laid in courses with mortar joints, the mortar paste occupies the voids and frogs of the bricks. Standard Indian site specifications specify that <strong>wet mortar volume accounts for 30% of total masonry structure volume</strong>.
          </p>
          <p>
            Dry cement and sand contract substantially when mixed with water due to particle compaction. To account for this shrinkage and fill voids between sand grains, a <strong>dry expansion metric of 1.33</strong> is applied:
          </p>
          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 font-mono text-xs space-y-1 text-slate-200">
            <div>• Wet Mortar Volume (CFT) = Total Wall Volume (CFT) × 0.30</div>
            <div>• Dry Mortar Volume (CFT) = Wet Mortar Volume (CFT) × 1.33</div>
            <div>• In a 1:6 Mortar Mix Ratio (1 part Cement : 6 parts Sand = 7 Total Parts):</div>
            <div className="text-emerald-400 pl-4">Cement Volume (CFT) = Dry Mortar Volume × (1 / 7)</div>
            <div className="text-emerald-400 pl-4">Sand Volume (CFT) = Dry Mortar Volume × (6 / 7)</div>
          </div>
          <p>
            This 1.33 dry mortar ratio mix formula prevents material shortfalls on site and ensures structural integrity during curing.
          </p>
        </div>
      ),
    },
    {
      title: '50kg Cement Bag Calculations: Density (1440 kg/m³) & 1.226 CFT Volume Constant',
      icon: <Scale className="w-5 h-5 text-emerald-400" />,
      content: (
        <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed">
          <p>
            Standard Ordinary Portland Cement (OPC 43/53 grade) and Portland Pozzolana Cement (PPC) packaged in 50 kg bags have a standardized bulk density of <strong>1440 kg/m³</strong> under Indian Standards (IS 269 & IS 1489).
          </p>
          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 font-mono text-xs space-y-1 text-slate-300">
            <div>• Volume of 1 Cement Bag (50kg) = 50 kg ÷ 1440 kg/m³ = 0.03472 m³</div>
            <div>• Converting to Imperial: 0.03472 m³ × 35.3147 CFT/m³ = 1.226 CFT per 50kg bag</div>
            <div className="text-emerald-400 font-bold">• Total 50kg Cement Bags Required = Cement Volume (CFT) ÷ 1.226</div>
          </div>
          <p>
            Our calculation engine outputs both the exact fractional number of bags and the practical rounded-up integer bag count so contractors can place orders with cement stockists without partial-bag storage wastage.
          </p>
        </div>
      ),
    },
    {
      title: '9-Inch Outer Walls vs 4.5-Inch Partition Walls: Structural Thickness Layers',
      icon: <Ruler className="w-5 h-5 text-emerald-400" />,
      content: (
        <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed">
          <p>
            In residential and commercial building construction across India, walls are categorized into two primary structural thickness layers:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>9-Inch Outer Wall (0.75 ft / 230 mm thickness):</strong> A full-brick load-bearing or exterior envelope wall. Designed for compressive load bearing, thermal insulation, damp resistance, and security. Requires double the volume of materials per square foot of wall face.
            </li>
            <li>
              <strong>4.5-Inch Partition Wall (0.375 ft / 115 mm thickness):</strong> A half-brick (stretcher bond) non-load-bearing room divider. Typically reinforced with wire mesh or 2 Nos 6mm/8mm rebar every 3 to 4 courses. Consumes exactly 50% of the brick and mortar volume compared to a 9-inch wall.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Sand Volume Measurement: CFT to Brass Conversion in Bangalore & South India',
      icon: <BookOpen className="w-5 h-5 text-emerald-400" />,
      content: (
        <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed">
          <p>
            In Bangalore and Karnataka material depots, River Sand and Manufactured Sand (M-Sand Zone II) are commercially traded either in <strong>Cubic Feet (CFT)</strong> or <strong>Brass units</strong>:
          </p>
          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 font-mono text-xs space-y-1 text-slate-200">
            <div>• 1 Brass = 100 Cubic Feet (CFT) = 2.83168 m³</div>
            <div>• Average density of M-Sand / River Sand: 1550 to 1650 kg/m³ (~45 kg/CFT)</div>
            <div>• 1 Brass of sand weighs approximately 4.5 to 4.7 Metric Tonnes (MT)</div>
          </div>
          <p>
            A standard 6-wheeler tipper lorry delivers 3 to 4 Brass (300–400 CFT), while a 10-wheeler commercial tipper delivers 6 to 7 Brass (600–700 CFT).
          </p>
        </div>
      ),
    },
  ];

  return (
    <section
      aria-label="How the Engineering Math Works Documentation"
      className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-6 shadow-xl"
    >
      <div className="space-y-2 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-0.5 rounded uppercase tracking-wider">
            Technical Specification & IS 1077 Reference
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
          How the Engineering Math Works
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Transparent, peer-reviewed Indian civil engineering formulas for modular brick dimensions, dry mortar ratio mix formulas, and 1 cubic meter brickwork calculations.
        </p>
      </div>

      <div className="space-y-3">
        {sections.map((sec, idx) => {
          const isOpen = openSection === idx;
          return (
            <div
              key={sec.title}
              className="border border-slate-800 bg-slate-950/60 rounded-xl overflow-hidden transition-colors hover:border-slate-700"
            >
              <button
                type="button"
                onClick={() => toggleSection(idx)}
                aria-expanded={isOpen}
                className="w-full px-4 sm:px-5 py-4 flex items-center justify-between gap-4 text-left font-bold text-slate-200 text-sm sm:text-base hover:text-emerald-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
                    {sec.icon}
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-200 leading-snug">
                    {sec.title}
                  </h3>
                </div>
                <div className="text-slate-500 shrink-0">
                  {isOpen ? <ChevronUp className="w-5 h-5 text-emerald-400" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-800/80 bg-slate-900/30">
                  {sec.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
