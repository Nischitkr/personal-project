import React from 'react';
import { Truck, BadgeCheck, Phone, ArrowUpRight, ShieldAlert } from 'lucide-react';

interface SidebarAdProps {
  onInquire?: () => void;
}

export const SidebarAd: React.FC<SidebarAdProps> = ({ onInquire }) => {
  return (
    <div
      aria-label="High-CPC Sidebar Ad Placement"
      className="bg-slate-900/90 border border-emerald-500/30 rounded-xl p-4 shadow-lg shadow-black/30 relative overflow-hidden space-y-3"
    >
      {/* High-CPC Sidebar Ad Placeholder */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-500/20 px-2 py-0.5 rounded">
          Sponsored Trade Estimates
        </span>
        <span className="text-[10px] text-slate-500 font-mono">AD-CPC-BLR</span>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
          <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Kamdhenu PAS 10k Rebars & RMC</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Bangalore wholesale truckload dispatch. Standard 500D/550D TMT, M-Sand (Zone II) & ready-mix delivery within 6 hrs.
        </p>
      </div>

      <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-2.5 flex items-center justify-between text-xs font-mono">
        <div>
          <span className="text-slate-500 block text-[10px]">Depot Wholesale Rate</span>
          <span className="text-emerald-400 font-bold">₹315 / 50kg Bag (Cement)</span>
        </div>
        <div className="text-right">
          <span className="text-slate-500 block text-[10px]">M-Sand</span>
          <span className="text-slate-300 font-bold">₹52 / CFT</span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={onInquire}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-sm active:scale-95"
        >
          <span>Claim Trade Discount</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={onInquire}
          aria-label="Call Depot Support"
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
          title="Direct Depot Callback"
        >
          <Phone className="w-4 h-4 text-emerald-400" />
        </button>
      </div>

      <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-800/80 pt-2">
        <span className="flex items-center gap-1">
          <BadgeCheck className="w-3 h-3 text-emerald-400" /> GST Invoice & Test Cert Included
        </span>
        <span>Verified Depot</span>
      </div>
    </div>
  );
};
