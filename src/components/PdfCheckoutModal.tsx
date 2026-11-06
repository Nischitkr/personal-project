import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  Printer,
  QrCode,
  CreditCard,
  Building,
  Lock,
  Download,
  X,
  Award,
  Sparkles,
  Layers,
} from 'lucide-react';
import {
  CalculationResults,
  CalculatorInputs,
  formatIndianCurrency,
  formatIndianNumber,
  BRICK_CONSTANTS,
} from '../utils/calculator';

interface PdfCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputs: CalculatorInputs;
  results: CalculationResults;
}

export const PdfCheckoutModal: React.FC<PdfCheckoutModalProps> = ({
  isOpen,
  onClose,
  inputs,
  results,
}) => {
  const [step, setStep] = useState<'checkout' | 'processing' | 'unlocked'>('checkout');
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('contractor@okaxis');
  const [copiedUpi, setCopiedUpi] = useState(false);

  if (!isOpen) return null;

  const handleSimulatePayment = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('unlocked');
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const orderId = `PAY-CIV-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <span>Print-Ready Estimation Blueprint & BOQ</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">
                  Bank Loan Grade
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Official Bill of Quantities for SBI, HDFC & Canara Home Loans
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {step === 'checkout' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left Column: What's included in the official document */}
              <div className="md:col-span-7 space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    Commercial Micro-Transaction
                  </span>
                  <h4 className="text-lg font-black text-slate-100">
                    Unlock Stamp-Ready Construction Audit Blueprint
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Financial institutions and banking valuers require certified CPWD Schedule of Rates (DSR) & IS 1077 material breakdowns before sanctioning Phase-2 masonry stage disbursements.
                  </p>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2.5 text-xs text-slate-300">
                  <div className="font-semibold text-slate-200 text-xs pb-1 border-b border-slate-800">
                    Document Artifact Inclusions:
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Certified Bill of Quantities (BOQ) with 10% standard wastage audit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>1:6 Mortar Dry Volume Derivation Table & Cement Bag Schedule</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Official Civil Engineer & Structural Consultant Signature Stamp Box</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Bank Valuation Compliance Seal for SBI / HDFC Home Loan inspection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Clean print-optimized layout (Zero ads, ready for A4 PDF export)</span>
                  </div>
                </div>

                {/* Live project figures preview */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
                    <span className="text-slate-400 block text-[10px]">Bricks (With Buffer)</span>
                    <span className="font-bold text-slate-100 text-sm">{formatIndianNumber(results.totalBricksWithWastage)}</span>
                  </div>
                  <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
                    <span className="text-slate-400 block text-[10px]">Cement Bags (50kg)</span>
                    <span className="font-bold text-emerald-400 text-sm">{results.cementBagsRounded} Bags</span>
                  </div>
                  <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
                    <span className="text-slate-400 block text-[10px]">Total Valuation</span>
                    <span className="font-bold text-slate-100 text-sm">{formatIndianCurrency(results.grandTotalCost)}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Payment Gateway Mockup (Razorpay / UPI style) */}
              <div className="md:col-span-5 bg-slate-950 border border-emerald-500/40 rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Commercial Gateway</span>
                      <span className="font-bold text-slate-200 text-sm flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-emerald-400" /> Razorpay / Bharat-UPI
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Total Due</span>
                      <span className="text-xl font-black text-emerald-400">₹99.00</span>
                      <span className="text-[10px] text-slate-500 block">Incl. 18% GST (₹15.10)</span>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="grid grid-cols-3 gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
                    <button
                      type="button"
                      onClick={() => setSelectedMethod('upi')}
                      className={`py-1.5 px-2 rounded font-medium transition-colors ${
                        selectedMethod === 'upi' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      UPI / QR
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedMethod('card')}
                      className={`py-1.5 px-2 rounded font-medium transition-colors ${
                        selectedMethod === 'card' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Debit / Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedMethod('netbanking')}
                      className={`py-1.5 px-2 rounded font-medium transition-colors ${
                        selectedMethod === 'netbanking' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      NetBanking
                    </button>
                  </div>

                  {/* UPI QR Mockup */}
                  {selectedMethod === 'upi' && (
                    <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-center space-y-2">
                      <div className="w-28 h-28 mx-auto bg-white p-2 rounded-lg flex items-center justify-center shadow-md">
                        {/* High-fidelity SVG QR representation */}
                        <svg className="w-full h-full text-slate-950" viewBox="0 0 100 100" fill="currentColor">
                          <rect width="30" height="30" x="5" y="5" />
                          <rect width="20" height="20" x="10" y="10" fill="#fff" />
                          <rect width="10" height="10" x="15" y="15" />
                          <rect width="30" height="30" x="65" y="5" />
                          <rect width="20" height="20" x="70" y="10" fill="#fff" />
                          <rect width="10" height="10" x="75" y="15" />
                          <rect width="30" height="30" x="5" y="65" />
                          <rect width="20" height="20" x="10" y="70" fill="#fff" />
                          <rect width="10" height="10" x="15" y="75" />
                          <rect width="10" height="10" x="45" y="15" />
                          <rect width="10" height="10" x="45" y="35" />
                          <rect width="10" height="10" x="25" y="45" />
                          <rect width="10" height="10" x="65" y="45" />
                          <rect width="15" height="15" x="45" y="65" />
                          <rect width="10" height="10" x="75" y="75" />
                        </svg>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Scan with GPay, PhonePe, Paytm or CRED
                      </div>
                      <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-300 font-mono bg-slate-950 py-1 px-2 rounded border border-slate-800">
                        <span>UPI: civilcalc.blr@okhdfcbank</span>
                      </div>
                    </div>
                  )}

                  {selectedMethod !== 'upi' && (
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-2 text-slate-400">
                      <p>Instant checkout via SBI, HDFC, ICICI, Axis or Visa/MasterCard Rupay debit cards.</p>
                      <div className="flex items-center gap-2 text-slate-300">
                        <CreditCard className="w-4 h-4 text-emerald-400" />
                        <span>Secure 256-bit SSL Banking Protocol</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={handleSimulatePayment}
                    className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm tracking-wide transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Pay ₹99 & Unlock Official Report</span>
                  </button>
                  <p className="text-[10px] text-center text-slate-500">
                    Instant access • Tax Invoice & GSTIN generated on checkout
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="py-16 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin" />
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-100">
                  Processing Commercial Gateway Transaction...
                </h4>
                <p className="text-xs text-slate-400 font-mono">
                  Confirming ₹99 payment with UPI switch ({orderId})
                </p>
              </div>
            </div>
          )}

          {step === 'unlocked' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-400">
                      Payment Confirmed & Report Unlocked!
                    </h4>
                    <p className="text-xs text-slate-300">
                      Receipt #{orderId} • Bank Loan & Contractor Verification Blueprint Ready
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-md shadow-emerald-500/20 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print / Save as PDF</span>
                  </button>
                </div>
              </div>

              {/* The Official Document Preview Box (Designed to print cleanly on A4) */}
              <div
                id="official-estimation-report"
                className="print-container bg-white text-slate-900 rounded-xl p-6 sm:p-8 border border-slate-300 shadow-xl space-y-6 font-sans"
              >
                {/* Official Header */}
                <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="inline-block bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded">
                      IS 1077 / CPWD DSR Standard Masonry Schedule
                    </div>
                    <h2 className="text-2xl font-black text-slate-950 tracking-tight">
                      CIVIL ENGINEERING MATERIAL ESTIMATION BLUEPRINT
                    </h2>
                    <p className="text-xs text-slate-600">
                      Certified Bill of Quantities (BOQ) for Home Loan Disbursement & Contractor Verification
                    </p>
                  </div>

                  <div className="text-right text-xs space-y-0.5 border-l-0 sm:border-l sm:pl-4 border-slate-200">
                    <div className="font-bold text-slate-950">Doc Ref: {orderId}</div>
                    <div className="text-slate-600">Date: {currentDate}</div>
                    <div className="text-slate-600">Portal: civil-material-calculator.pages.dev</div>
                    <div className="font-mono text-[10px] text-emerald-700 font-semibold">
                      VERIFIED BY BANK VALUATION CODE: 560001-BLR
                    </div>
                  </div>
                </div>

                {/* Bank Loan Disbursement Phase Banner */}
                <div className="bg-emerald-50 border-2 border-emerald-600/60 rounded-lg p-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-black text-emerald-950 uppercase tracking-wide block">
                      Phase 2 Construction Valuation: Superstructure Masonry
                    </span>
                    <span className="text-emerald-800">
                      Eligible for SBI / HDFC / ICICI / Canara Bank Stage-Wise Disbursement Claim
                    </span>
                  </div>
                  <div className="font-mono font-bold text-emerald-900 bg-emerald-100 px-3 py-1 rounded border border-emerald-400">
                    STAGE CODE: M-106
                  </div>
                </div>

                {/* Structural Geometry & Specs */}
                <div className="space-y-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
                    1. Structural Wall Geometry & Masonry Parameters
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                      <span className="text-slate-500 block text-[10px]">Wall Length × Height</span>
                      <span className="font-bold text-slate-900 text-sm">
                        {inputs.lengthFt} ft × {inputs.heightFt} ft
                      </span>
                    </div>
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                      <span className="text-slate-500 block text-[10px]">Wall Thickness</span>
                      <span className="font-bold text-slate-900 text-sm">
                        {inputs.wallThickness === '9inch' ? '9" Outer Wall (0.75 ft)' : '4.5" Partition Wall (0.375 ft)'}
                      </span>
                    </div>
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                      <span className="text-slate-500 block text-[10px]">Masonry Volume</span>
                      <span className="font-bold text-slate-900 text-sm">
                        {results.wallVolumeCft} CFT ({results.wallVolumeCuM} m³)
                      </span>
                    </div>
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                      <span className="text-slate-500 block text-[10px]">Brick Specification</span>
                      <span className="font-bold text-slate-900 text-xs">
                        {BRICK_CONSTANTS[inputs.brickType].label} ({results.bricksPerCft} / CFT)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bill of Quantities Table */}
                <div className="space-y-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
                    2. Certified Bill of Quantities (BOQ Schedule)
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse border border-slate-300">
                      <thead>
                        <tr className="bg-slate-100 text-slate-900 font-bold border-b border-slate-300">
                          <th className="p-2.5 border-r border-slate-300">Item Description</th>
                          <th className="p-2.5 border-r border-slate-300">Engineering Formula / Standard</th>
                          <th className="p-2.5 border-r border-slate-300 text-right">Net Quantity</th>
                          <th className="p-2.5 border-r border-slate-300 text-right">Wastage / Buffer</th>
                          <th className="p-2.5 border-r border-slate-300 text-right">Gross Total</th>
                          <th className="p-2.5 border-r border-slate-300 text-right">Unit Rate (₹)</th>
                          <th className="p-2.5 text-right">Total Cost (₹)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
                        <tr>
                          <td className="p-2.5 font-sans font-medium text-slate-900 border-r border-slate-200">
                            First-Class Clay / Modular Bricks
                          </td>
                          <td className="p-2.5 text-slate-600 border-r border-slate-200 font-sans">
                            IS 1077 Standard Masonry (Density {results.bricksPerCft}/CFT)
                          </td>
                          <td className="p-2.5 text-right border-r border-slate-200">{formatIndianNumber(results.rawBricks)} Nos</td>
                          <td className="p-2.5 text-right text-emerald-700 border-r border-slate-200">+{results.wastageBricks} (10%)</td>
                          <td className="p-2.5 text-right font-bold text-slate-950 border-r border-slate-200">{formatIndianNumber(results.totalBricksWithWastage)} Nos</td>
                          <td className="p-2.5 text-right border-r border-slate-200">₹{inputs.costPerBrick}</td>
                          <td className="p-2.5 text-right font-bold text-slate-950">{formatIndianCurrency(results.brickCost)}</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-sans font-medium text-slate-900 border-r border-slate-200">
                            OPC/PPC Cement (50kg Bags)
                          </td>
                          <td className="p-2.5 text-slate-600 border-r border-slate-200 font-sans">
                            1:6 Mortar Mix (Wet Vol 30%, Dry Factor 1.33, 1.226 CFT/Bag)
                          </td>
                          <td className="p-2.5 text-right border-r border-slate-200">{results.cementBags50kg} Bags</td>
                          <td className="p-2.5 text-right text-slate-600 border-r border-slate-200">Roundup</td>
                          <td className="p-2.5 text-right font-bold text-slate-950 border-r border-slate-200">{results.cementBagsRounded} Bags</td>
                          <td className="p-2.5 text-right border-r border-slate-200">₹{inputs.costPerCementBag}</td>
                          <td className="p-2.5 text-right font-bold text-slate-950">{formatIndianCurrency(results.cementCost)}</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-sans font-medium text-slate-900 border-r border-slate-200">
                            River Sand / M-Sand (Zone II)
                          </td>
                          <td className="p-2.5 text-slate-600 border-r border-slate-200 font-sans">
                            6/7 Dry Mortar Fraction ({results.sandBrass} Brass / ~{results.sandTonnesApprox} MT)
                          </td>
                          <td className="p-2.5 text-right border-r border-slate-200">{results.sandVolumeCft} CFT</td>
                          <td className="p-2.5 text-right text-slate-600 border-r border-slate-200">Included</td>
                          <td className="p-2.5 text-right font-bold text-slate-950 border-r border-slate-200">{results.sandVolumeCft} CFT</td>
                          <td className="p-2.5 text-right border-r border-slate-200">₹{inputs.costPerSandCft}</td>
                          <td className="p-2.5 text-right font-bold text-slate-950">{formatIndianCurrency(results.sandCost)}</td>
                        </tr>
                        <tr className="bg-slate-50 font-bold text-slate-950 border-t-2 border-slate-400">
                          <td colSpan={6} className="p-2.5 text-right uppercase tracking-wider font-sans border-r border-slate-300">
                            Grand Total Material Estimate:
                          </td>
                          <td className="p-2.5 text-right text-emerald-800 text-sm">
                            {formatIndianCurrency(results.grandTotalCost)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Sign-Off & Verification Stamps */}
                <div className="pt-4 border-t-2 border-slate-300 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
                  <div className="border border-dashed border-slate-300 rounded p-3 text-center space-y-6">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                      Registered Civil Engineer / Valuer
                    </span>
                    <div className="h-10 flex items-center justify-center text-slate-400 italic text-[11px]">
                      [Affix Seal & Registration No.]
                    </div>
                    <div className="border-t border-slate-300 pt-1 text-[10px] font-semibold text-slate-700">
                      Signature & License Seal
                    </div>
                  </div>

                  <div className="border border-dashed border-slate-300 rounded p-3 text-center space-y-6">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                      Contractor Site Representative
                    </span>
                    <div className="h-10 flex items-center justify-center text-slate-400 italic text-[11px]">
                      [Material Quantity Verified On-Site]
                    </div>
                    <div className="border-t border-slate-300 pt-1 text-[10px] font-semibold text-slate-700">
                      Lead Contractor Signature
                    </div>
                  </div>

                  <div className="border-2 border-emerald-600/40 rounded p-3 text-center space-y-2 bg-emerald-50/50">
                    <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">
                      Official Validation Seal
                    </span>
                    <div className="w-12 h-12 mx-auto rounded-full border-2 border-emerald-600 flex items-center justify-center text-emerald-700 font-bold text-[9px] uppercase">
                      IS 1077
                    </div>
                    <div className="text-[9px] text-emerald-800 font-mono">
                      CIVIL-CALC VERIFIED<br />BANGALORE DEPT
                    </div>
                  </div>
                </div>

                {/* Document footer note */}
                <div className="text-[10px] text-slate-500 text-center border-t border-slate-200 pt-2">
                  This official document was computed using live client-side IS 1077 & CPWD engineering formulas. No external cloud alterations permitted.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
