import React, { useState } from 'react';
import { ExternalLink, ShieldCheck, Sparkles, PhoneCall, Building2 } from 'lucide-react';

interface HeaderBannerAdProps {
  onClaimQuote?: () => void;
}

export const HeaderBannerAd: React.FC<HeaderBannerAdProps> = ({ onClaimQuote }) => {
  const [activeAdIndex, setActiveAdIndex] = useState(0);

  const ads = [
    {
      brand: 'UltraTech Super Cement',
      badge: 'CPWD Approved Depot',
      highlight: 'Direct Plant Dispatch @ ₹320/Bag',
      details: 'Bangalore Metro Hubs • Min. 100 Bags • Same-Day Unloading at Whitefield, Electronic City & North BLR',
      cta: 'Check Bulk Stock',
      cpcRate: '₹320/bag',
    },
    {
      brand: 'JSW NeoSteel Fe 550D & RMC',
      badge: 'Primary Steel Tier-1',
      highlight: 'Wholesale TMT & M-Sand Bundles',
      details: 'Direct from JSW Yard Bangalore • Zero Transit Breakage Guarantee • Test Certificate Included',
      cta: 'Get Contractor Rate',
      cpcRate: '₹62.5/kg',
    },
  ];

  const currentAd = ads[activeAdIndex];

  return (
    <aside
      aria-label="Sponsored Trade Estimates Header"
      className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/60 rounded-xl p-3 sm:p-4 shadow-xl shadow-black/40 relative overflow-hidden"
    >
      {/* Top Premium Ad Banner Placeholder */}
      {/* Background ambient accent */}
      <div className="absolute top-0 right-0 w-72 h-full bg-emerald-500/5 blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-start gap-3 min-w-0">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
            <Building2 className="w-5 h-5" />
          </div>

          <div className="space-y-1 min-w-0">
            <div className="flex items-center flex-wrap gap-2 text-xs">
              <span className="font-semibold tracking-wider text-emerald-400 uppercase text-[10px] bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded">
                Sponsored Trade Estimates
              </span>
              <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {currentAd.badge}
              </span>
              <button
                type="button"
                onClick={() => setActiveAdIndex((prev) => (prev === 0 ? 1 : 0))}
                className="text-[11px] text-slate-500 hover:text-slate-300 underline transition-colors ml-auto sm:ml-0"
              >
                Switch sponsor ({activeAdIndex + 1}/2)
              </button>
            </div>

            <div className="flex items-baseline flex-wrap gap-2">
              <span className="font-bold text-slate-100 text-sm sm:text-base">
                {currentAd.brand}:
              </span>
              <span className="font-semibold text-emerald-300 text-sm">
                {currentAd.highlight}
              </span>
            </div>

            <p className="text-xs text-slate-400 truncate max-w-xl">
              {currentAd.details}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 pt-1 sm:pt-0">
          <button
            type="button"
            onClick={onClaimQuote}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md shadow-emerald-500/20 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{currentAd.cta}</span>
            <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
          </button>
        </div>
      </div>
    </aside>
  );
};
