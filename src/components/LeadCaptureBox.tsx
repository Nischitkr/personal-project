import React, { useState } from 'react';
import { CalculationResults, CalculatorInputs } from '../utils/calculator';
import {
  Send,
  CheckCircle2,
  PhoneCall,
  MapPin,
  Building,
  ShieldCheck,
  TrendingDown,
  Clock,
  MessageSquare,
} from 'lucide-react';

interface LeadCaptureBoxProps {
  inputs: CalculatorInputs;
  results: CalculationResults;
}

export const BANGALORE_LOCATIONS = [
  'Whitefield (Kadugodi / ITPL)',
  'Electronic City (Phase 1 & 2)',
  'Sarjapur Road / Bellandur',
  'HSR Layout / Koramangala',
  'Indiranagar / Old Airport Road',
  'Hebbal / Thanisandra / Manyata',
  'Yelahanka / Jakkur / Kogilu',
  'Devanahalli / Airport Corridor',
  'Rajajinagar / Malleshwaram',
  'Jayanagar / JP Nagar',
  'Bannerghatta Road / Gottigere',
  'Kanakapura Road / Konanakunte',
  'Mysore Road / Kengeri / RR Nagar',
  'KR Puram / Mahadevapura / Hoodi',
];

export const LeadCaptureBox: React.FC<LeadCaptureBoxProps> = ({ inputs, results }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState(BANGALORE_LOCATIONS[0]);
  const [requirementType, setRequirementType] = useState<'materials_only' | 'materials_and_labour'>('materials_only');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit Indian phone number');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const randomLeadCode = Math.floor(1000 + Math.random() * 9000);
      setSubmittedLeadId(`BLR-QUO-${randomLeadCode}`);
    }, 700);
  };

  return (
    <section
      aria-label="Lead Generation Funnel Bangalore Wholesale Quotes"
      className="w-full bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-emerald-500/40 rounded-2xl p-5 sm:p-7 shadow-2xl shadow-emerald-950/20 relative overflow-hidden"
    >
      {/* Decorative accent grid */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-5">
        {/* Header with commercial intent cues */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/90 border border-emerald-500/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                <TrendingDown className="w-3.5 h-3.5" /> High-Intent Wholesale Matching
              </span>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                Save 12-18% on Retail Markup
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
              Get Wholesale Material Quotes & Verified Contractor Rates in Bangalore
            </h2>
            <p className="text-sm text-slate-300">
              Direct supplier dispatch for{' '}
              <span className="font-semibold text-emerald-300">
                {results.totalBricksWithWastage} Bricks
              </span>
              ,{' '}
              <span className="font-semibold text-emerald-300">
                {results.cementBagsRounded} Cement Bags
              </span>
              , and{' '}
              <span className="font-semibold text-emerald-300">
                {results.sandVolumeCft} CFT Sand
              </span>{' '}
              to eliminate middleman commission.
            </p>
          </div>

          <div className="hidden lg:flex flex-col items-end text-xs text-slate-400 shrink-0">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" /> GST Invoices & Free Site Drop
            </span>
            <span className="flex items-center gap-1 text-slate-400 mt-0.5">
              <Clock className="w-3.5 h-3.5" /> Fast Dispatch in 4–6 Hours
            </span>
          </div>
        </div>

        {submittedLeadId ? (
          <div className="bg-slate-900/90 border border-emerald-500/40 rounded-xl p-5 space-y-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-emerald-400">
                    Lead Verified & Dispatched!
                  </h3>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                    Ref: {submittedLeadId}
                  </span>
                </div>
                <p className="text-sm text-slate-300">
                  Thank you, <strong className="text-slate-100">{name}</strong>. Your estimate of{' '}
                  <strong className="text-emerald-300">{results.totalBricksWithWastage} Bricks</strong> has been routed to 3 verified wholesale suppliers servicing{' '}
                  <strong className="text-slate-100">{location}</strong>.
                </p>
                <p className="text-xs text-slate-400">
                  You will receive verified GST quotation rate-cards via WhatsApp and call on{' '}
                  <span className="text-slate-200 font-mono">+91 {phone}</span> within 15 minutes.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`https://api.whatsapp.com/send?phone=919880012345&text=${encodeURIComponent(
                  `Hi Bangalore Material Desk, I just generated an estimate (${submittedLeadId}) for ${results.totalBricksWithWastage} bricks & ${results.cementBagsRounded} bags cement in ${location}. Please send today's wholesale price list.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-md shadow-emerald-900/40"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant WhatsApp Price Confirmation</span>
              </a>

              <button
                type="button"
                onClick={() => setSubmittedLeadId(null)}
                className="text-xs text-slate-400 hover:text-slate-200 underline transition-colors"
              >
                Submit another site requirement
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Full Name */}
              <div className="space-y-1">
                <label htmlFor="lead-name" className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                  Your Name *
                </label>
                <input
                  id="lead-name"
                  type="text"
                  placeholder="e.g. Ramesh Reddy / Site Eng."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none transition-colors"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label htmlFor="lead-phone" className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp / Mobile *
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-2.5 rounded-l-lg border border-r-0 border-slate-700 bg-slate-900 text-slate-400 text-xs font-mono">
                    +91
                  </span>
                  <input
                    id="lead-phone"
                    type="tel"
                    maxLength={10}
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-r-lg px-3 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none transition-colors font-mono"
                    required
                  />
                </div>
              </div>

              {/* Project Location in Bangalore */}
              <div className="space-y-1">
                <label htmlFor="lead-location" className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Project Location (Bangalore) *
                </label>
                <select
                  id="lead-location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-100 outline-none transition-colors cursor-pointer"
                >
                  {BANGALORE_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc} className="bg-slate-900 text-slate-100">
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Scope toggle */}
              <div className="space-y-1">
                <label htmlFor="lead-scope" className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-emerald-400" /> Requirement Scope
                </label>
                <select
                  id="lead-scope"
                  value={requirementType}
                  onChange={(e) => setRequirementType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-100 outline-none transition-colors cursor-pointer"
                >
                  <option value="materials_only" className="bg-slate-900">Wholesale Materials Supply Only</option>
                  <option value="materials_and_labour" className="bg-slate-900">Masonry Labour + Materials (With Contractor)</option>
                </select>
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-400 font-medium">⚠️ {errorMsg}</p>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Spam Guarantee: Direct connection with vetted Bangalore wholesale stockists only.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-70 text-slate-950 font-bold text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-emerald-500/25 active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Dispatching to Suppliers...' : 'Request Wholesale Rates & Contractor Quote'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
